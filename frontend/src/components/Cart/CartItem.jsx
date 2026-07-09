import React from "react";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">{item.brand}</p>
        <p className="font-medium">Rs. {item.price}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onQuantityChange(item._id, item.quantity - 1)}
            className="px-2 border"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => onQuantityChange(item._id, item.quantity + 1)}
            className="px-2 border"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => onRemove(item._id)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;