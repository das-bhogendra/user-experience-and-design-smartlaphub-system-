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
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
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
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//
// =========================
// PLACE ORDER (STRIPE)
// =========================
//
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Delivery fee
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    // ✅ IMPORTANT: initialize Stripe here
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
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
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

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
export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
};