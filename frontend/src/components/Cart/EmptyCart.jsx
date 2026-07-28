import React from "react";

const EmptyCart = () => {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-6">🛒</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mt-1 max-w-sm mx-auto">
        Looks like you haven't added anything yet. Browse our collection to find your perfect laptop.
      </p>
    </div>
  );
};

export default EmptyCart;
