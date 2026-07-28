import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useShop } from "../contexts/ShopContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    backendUrl,
    addToCart,
    navigate,
  } = useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const fetchProduct = async () => {
    try {
      console.log("Product ID:", id);

      const url = `${backendUrl}/api/product/single/${id}`;

      console.log("Calling:", url);

      const response = await axios.get(url);

      console.log("API Response:", response.data);

      if (
        response.data.success &&
        response.data.product
      ) {
        setProduct(response.data.product);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.log("Product Fetch Error:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading Product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <>
        <Navbar />

        <div className="max-w-4xl mx-auto py-20 text-center">
          <div className="text-6xl mb-6">📦</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>

          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            The requested laptop does not exist or may have been removed.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-black transition-all duration-200"
          >
            Browse Collection
          </button>
        </div>

        <Footer />
      </>
    );
  }

  const images =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image
      : ["https://via.placeholder.com/500x400?text=No+Image"];

  const specs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    { label: "Graphics", value: product.graphics },
    { label: "Screen Size", value: product.screenSize },
    { label: "Stock", value: product.stock != null ? `${product.stock} units` : "N/A" },
  ].filter((s) => s.value);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate("/collection")} className="hover:text-gray-600 transition-colors">
            Collection
          </button>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-contain p-8 transition-all duration-500 hover:scale-105"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                      idx === selectedImage
                        ? "border-gray-900 ring-1 ring-gray-900"
                        : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Brand & Name */}
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {product.brand || "Brand"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="mt-4 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  NPR {Number(product.price).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    NPR {Number(product.originalPrice).toLocaleString()}
                  </span>
                )}
              </div>
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 mt-2 text-sm text-green-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 mt-2 text-sm text-red-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Specifications Table */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Key Specifications
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%]">{spec.value || "N/A"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product._id)}
                className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl font-medium text-sm tracking-wide hover:bg-black transition-all duration-200 active:scale-[0.98]"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="flex-1 border-2 border-gray-200 text-gray-800 py-3.5 rounded-xl font-medium text-sm tracking-wide hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-around text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Payment
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Free Delivery
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  2-Year Warranty
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
