import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // User / items
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    items: { type: Array, required: true },

    // Keep existing field name `address` for backward compatibility.
    // Also expose the spec-friendly `shippingAddress`.
    shippingAddress: { type: Object, required: false },
    address: { type: Object, required: true },


    // Pricing
    subtotal: { type: Number, required: false },
    deliveryCharge: { type: Number, required: false },
    tax: { type: Number, required: false },
    totalAmount: { type: Number, required: false },

    // Existing field (used across current code)
    amount: { type: Number, required: true },

    status: { type: String, required: true, default: "Order Placed" },

    // Payment
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },

    paymentStatus: {
      type: String,
      required: false,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    stripeSessionId: { type: String },
    transactionId: { type: String },

    paymentDate: { type: Date },
    amountPaid: { type: Number },
    currency: { type: String, default: "usd" },

    // Legacy date field (used in current queries/UI)
    date: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
