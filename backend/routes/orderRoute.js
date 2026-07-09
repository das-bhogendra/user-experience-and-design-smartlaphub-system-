import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  stripeWebhook,
} from "../controllers/orderController.js";

import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// User Features
// Keep both endpoints for backward compatibility with existing frontend calls
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/user", authUser, userOrders);


// verify payment (legacy return-flow)
orderRouter.post("/verifyStripe", authUser, verifyStripe);

// Stripe webhook (official flow)
orderRouter.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);


export default orderRouter;

