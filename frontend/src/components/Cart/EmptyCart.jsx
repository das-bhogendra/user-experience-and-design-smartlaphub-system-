import React from "react";

const EmptyCart = () => {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      <p className="text-gray-500 mt-2">
        Add some laptops to your cart.
      </p>
    </div>
  );
};

export default EmptyCart;