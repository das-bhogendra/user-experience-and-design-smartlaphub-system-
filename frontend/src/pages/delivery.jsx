import React from "react";
import { useShop } from "../contexts/ShopContext";

const Delivery = () => {
  const { cart, navigate } = useShop();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Delivery Details</h1>

      <p className="mt-4">Your items will be delivered within 2-5 days.</p>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-5 bg-gray-200 px-4 py-2"
      >
        Back
      </button>

      <button
        onClick={() => navigate("/confirm")}
        className="mt-5 ml-3 bg-black text-white px-4 py-2"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Delivery;

