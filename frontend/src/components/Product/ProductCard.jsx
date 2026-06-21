import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../contexts/ShopContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useShop();

  // ======================
  // ADD TO CART HANDLER
  // ======================
  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent Link navigation
    e.stopPropagation(); // stop event bubbling

    addToCart(product._id);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col bg-white"
    >
      {/* ================= IMAGE ================= */}
      <img
        src={
          Array.isArray(product.image)
            ? product.image[0]
            : product.image
        }
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      {/* ================= NAME ================= */}
      <h2 className="font-semibold mt-2 text-lg">
        {product.name}
      </h2>

      {/* ================= BRAND ================= */}
      <p className="text-gray-600 text-sm">
        {product.brand}
      </p>

      {/* ================= PRICE ================= */}
      <p className="font-bold text-black mt-1">
        Rs. {product.price}
      </p>

      {/* ================= ADD TO CART BUTTON ================= */}
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
