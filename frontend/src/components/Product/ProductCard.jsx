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
      className="group border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-white overflow-hidden"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={
            Array.isArray(product.image)
              ? product.image[0]
              : product.image
          }
          alt={product.name}
          className="w-full h-52 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-lg" />
      </div>

      {/* ================= BRAND BADGE ================= */}
      {product.brand && (
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          {product.brand}
        </span>
      )}

      {/* ================= NAME ================= */}
      <h2 className="font-semibold text-gray-800 leading-snug line-clamp-2 mb-1">
        {product.name}
      </h2>

      {/* ================= SPECS SUMMARY ================= */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {product.processor && (
          <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
            {product.processor.split(" ").slice(0, 2).join(" ")}
          </span>
        )}
        {product.ram && (
          <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
            {product.ram}
          </span>
        )}
        {product.storage && (
          <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
            {product.storage}
          </span>
        )}
      </div>

      {/* ================= PRICE ================= */}
      <p className="font-bold text-lg text-gray-900 mt-auto mb-3">
        NPR {Number(product.price).toLocaleString()}
      </p>

      {/* ================= ADD TO CART BUTTON ================= */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-2.5 rounded-lg font-medium text-sm tracking-wide hover:bg-gray-800 transition-all duration-200 active:scale-[0.98]"
      >
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
