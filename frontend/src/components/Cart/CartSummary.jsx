import React from "react";

const CartSummary = ({ total }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        Order Summary
      </h2>

      <div className="flex justify-between mb-2">
        <span>Total</span>
        <span>Rs. {total}</span>
      </div>

      <button className="w-full bg-black text-white py-2 mt-4 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;