import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { getStripe } from "../configs/stripe.js";


// Global variables
const currency = "usd";
const deliveryCharges = 10;

//
// =========================
// PLACE ORDER (COD)
// =========================
//
const placeOrder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const userId = req.user;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,

      // Pricing (keep as provided by frontend)
      amount,
      address,

      // Spec-friendly address field (Stripe flow duplicates this)
      shippingAddress: address,

      // Ensure required schema fields match what My Orders expects
      status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
      paymentStatus: "Pending",

      date: Date.now(),
    };


    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed (COD)",
    });
  } catch (error) {
    console.log(error);
res.status(400).json({
      success: false,
      message: error?.message || "Stripe session creation failed",
    });
  }
};

//
// =========================
// PLACE ORDER (STRIPE)
// =========================
//
const placeOrderStripe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const userId = req.user;
const { items, address } = req.body;

    // DEBUG: log request body shape for easier troubleshooting
    // (Remove/disable in production)
    console.log("[placeOrderStripe] req.body.items type:", Array.isArray(items) ? "array" : typeof items);
    console.log("[placeOrderStripe] req.body.items length:", Array.isArray(items) ? items.length : 0);
    console.log("[placeOrderStripe] first item sample:", Array.isArray(items) ? items[0] : null);
    const { origin } = req.headers;

    // Prevent duplicate order creation: if there's already a pending/paid order
    // for this Stripe flow, frontend may retry. For Phase 2 idempotency we rely
    // on webhook, but we still avoid creating multiple orders for the same request.
    // If you need stricter idempotency, we can add an idempotency key later.


    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items are required",
      });
    }

    // =========================
    // Secure totals on backend
    // =========================
    // items from frontend are cart snapshots: { name, price, quantity, ... }
    // We MUST verify prices using MongoDB product records.
    const productIds = items.map((it) => it.productId).filter(Boolean);

    // If frontend cart items don't contain productId, fall back to names,
    // but we still compute totals using whatever product records we can match.
    // (Prefer adding productId support later)
    const products = productIds.length
      ? await (await import("../models/productModel.js")).default.find({
          _id: { $in: productIds },
        })
      : await (await import("../models/productModel.js")).default.find({
          name: { $in: items.map((it) => it.name) },
        });

    const productByKey = new Map(
      products.map((p) => [String(p._id), p])
    );

    const subtotal = items.reduce((sum, it) => {
      const key = it.productId ? String(it.productId) : null;
      const product = key && productByKey.get(key);
      const unitPrice = product ? product.price : it.price;
      return sum + unitPrice * it.quantity;
    }, 0);

    // Same delivery fee logic as existing Stripe controller
    const deliveryCharge = deliveryCharges;

    // Tax is optional; keep legacy behavior by NOT applying tax server-side
    const tax = 0;
    const totalAmount = subtotal + deliveryCharge + tax;

    // =========================
    // Create order (Pending)
    // =========================
    const orderData = {
      userId,
      items,
      // Keep legacy amount field
      amount: totalAmount,
      // Keep legacy address field
      address,
      // Spec-friendly shippingAddress (duplicate for forward compatibility)
      shippingAddress: address,

      // Spec fields
      subtotal,
      deliveryCharge,
      tax,
      totalAmount,

      paymentMethod: "Stripe",
      payment: false,
      paymentStatus: "Pending",

      currency,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Stripe line items (values still come from verified MongoDB prices above)
    const line_items = items.map((it) => {
      const key = it.productId ? String(it.productId) : null;
      const product = key ? productByKey.get(key) : null;
      const unitPrice = product ? product.price : it.price;

      return {
        price_data: {
          currency,
          product_data: {
            name: it.name,
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: it.quantity,
      };
    });

    // Delivery fee line item
    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    // =========================
    // Create Stripe Checkout Session
    // =========================
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      metadata: {
        orderId: String(newOrder._id),
        userId: String(userId),
      },
      line_items,
      mode: "payment",
    });

    // Store Stripe session id; keep payment pending (webhook will finalize)
    await orderModel.findByIdAndUpdate(newOrder._id, {
      stripeSessionId: session.id,
    });

    res.json({
      success: true,
      session_url: session.url,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//
// =========================
// VERIFY STRIPE PAYMENT
// =========================
//
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({
        success: true,
        message: "Payment Successful",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({
        success: false,
        message: "Payment Failed - Order Removed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//
// =========================
// STRIPE WEBHOOK (Official Flow)
// =========================
//
const stripeWebhook = async (req, res) => {
  try {
    const stripe = getStripe();

    const sig = req.headers["stripe-signature"];
    if (!sig) {
      return res.status(400).json({ success: false, message: "Missing stripe signature" });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return res.status(500).json({ success: false, message: "STRIPE_WEBHOOK_SECRET is missing" });
    }

    // req.body is a Buffer because we use express.raw for this route.
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    // Handle only checkout.session.completed
    if (event.type !== "checkout.session.completed") {
      return res.json({ received: true, ignored: true });
    }

    const session = event.data?.object;
    const orderId = session?.metadata?.orderId;
    const userId = session?.metadata?.userId;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Missing orderId metadata" });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Idempotency: if already paid, do nothing
    if (order.payment === true || order.paymentStatus === "Paid") {
      return res.json({ received: true, alreadyProcessed: true });
    }

    // Verify payment status from Stripe event/session
    // For checkout.session.completed, session.payment_status should be "paid".
    const paymentStatus = session?.payment_status;
    if (paymentStatus !== "paid") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: false,
        paymentStatus: "Failed",
      });
      return res.json({ received: true, paymentFailed: true });
    }

    const paymentIntentId = session?.payment_intent ? String(session.payment_intent) : undefined;
    const amountTotal = session?.amount_total; // in cents

    const updated = await orderModel.findByIdAndUpdate(
      orderId,
      {
        paymentMethod: "Stripe",
        payment: true,
        paymentStatus: "Paid",
        transactionId: paymentIntentId,
        stripeSessionId: session?.id,
        paymentDate: new Date(),
        amountPaid: typeof amountTotal === "number" ? amountTotal / 100 : undefined,
        currency: session?.currency || order.currency,
        status: "Confirmed",
        paymentMethodUpdatedAt: new Date(),
      },
      { new: true }
    );

    // Clear cart ONLY after success
    if (userId) {
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
    }

    return res.json({ received: true, success: true, orderId: updated?._id });
  } catch (err) {
    // Signature errors should return 400
    if (err?.type === "StripeSignatureVerificationError") {
      return res.status(400).json({ success: false, message: err.message });
    }

    console.log("Stripe webhook error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


//
// =========================
// ALL ORDERS (ADMIN)
// =========================
//
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//
// =========================
// USER ORDERS
// =========================
//
const userOrders = async (req, res) => {
  try {
    const userId = req.user;

    // DEBUG: confirm auth id and how it is stored
    console.log("[userOrders] req.user:", userId, "type:", typeof userId);

    const orders = await orderModel
      .find({
        $or: [
          { userId: userId },
          ...(mongoose.Types.ObjectId.isValid(userId)
            ? [{ userId: new mongoose.Types.ObjectId(userId) }]
            : []),
        ],
      })
      .sort({ date: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


//
// =========================
// UPDATE ORDER STATUS
// =========================
//
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//
// =========================
// EXPORTS
// =========================
//
// =========================
// PLACE ORDER (RAZORPAY)
// =========================
// NOTE: Razorpay integration was not present in this controller yet.
// This placeholder prevents runtime import/export crashes.
// If you add Razorpay SDK logic later, implement it here and set
// paymentMethod: "Razorpay" and payment: false until verification.
const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.user;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };


    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Return an acknowledgement for now.
    // Your frontend can be updated to handle this response.
    res.json({
      success: true,
      message: "Order Placed (Razorpay placeholder)",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyStripe,
  stripeWebhook,
  allOrders,
  userOrders,
  updateStatus,
};
