import React from "react";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-100 last:border-0">
      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{item.brand}</p>
        <p className="font-bold text-gray-900 mt-1">Rs. {item.price}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => onQuantityChange(item._id, item.quantity - 1)}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium"
          >
            −
          </button>

          <span className="w-8 text-center font-semibold text-gray-900 text-sm">
            {item.quantity}
          </span>

          <button
            onClick={() => onQuantityChange(item._id, item.quantity + 1)}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => onRemove(item._id)}
        className="text-red-400 hover:text-red-600 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
