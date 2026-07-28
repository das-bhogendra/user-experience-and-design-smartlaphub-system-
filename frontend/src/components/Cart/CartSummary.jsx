import React from "react";

const CartSummary = ({ total }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-sm">📋</span>
        Order Summary
      </h2>

      <div className="space-y-3 pb-5 border-b border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold text-gray-900">Rs. {total}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="font-semibold text-green-600">FREE</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 mb-6">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-2xl font-extrabold text-gray-900">Rs. {total}</span>
      </div>

      <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
