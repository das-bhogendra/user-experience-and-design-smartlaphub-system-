import React from "react";
import { useShop } from "../contexts/ShopContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const OrderSuccess = () => {
  const { navigate } = useShop();


  return (

    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">

          {/* Success Icon */}
          <div className="text-7xl mb-4">🎉</div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-green-600 mb-3">
            ✓ Payment Successful
          </h1>


          {/* Order details (minimal, existing frontend flow) */}
          <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-left text-sm text-gray-700">
            <div className="font-semibold mb-2">Payment Details</div>
            <p><span className="font-semibold">Payment Method:</span> Stripe</p>
            <p><span className="font-semibold">Payment Status:</span> Paid</p>
            <p className="mt-2 text-gray-500">
              Order number and amount are populated by the backend via webhook.
              This page focuses on confirming payment success.
            </p>
          </div>


          {/* Delivery Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Estimated Delivery Time
            </p>
            <p className="text-lg font-semibold text-green-700">
              2 - 5 Business Days
            </p>
          </div>

          {/* Order Status */}
          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <p className="font-medium text-gray-700">Order Status</p>
            <p className="text-blue-600 font-bold">Processing</p>
          </div>

          {/* Buttons (FIXED ORDER FLOW) */}
          <div className="flex flex-col gap-3">

            <button
              onClick={() => navigate("/my-orders")}

              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Track My Order
            </button>

            <button
              onClick={() => navigate("/collection")}
              className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/home")}
              className="w-full text-gray-600 text-sm hover:text-black transition"
            >
              Go to Home
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
