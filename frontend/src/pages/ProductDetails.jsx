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
        <div className="text-center py-20 text-xl">
          Loading Product...
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
          <h2 className="text-3xl font-bold mb-4">
            Product Not Found
          </h2>

          <p className="text-gray-600 mb-6">
            The requested laptop does not exist.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Back to Collection
          </button>
        </div>

        <Footer />
      </>
    );
  }

  const imageUrl =
    Array.isArray(product.image) &&
    product.image.length > 0
      ? product.image[0]
      : "https://via.placeholder.com/500x400?text=No+Image";

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 border px-4 py-2 rounded hover:bg-gray-100"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div>
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full rounded-xl border shadow-sm"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-3">
              {product.name}
            </h1>

            <p className="text-lg text-gray-600 mb-4">
              {product.brand}
            </p>

            <p className="text-3xl font-bold text-green-600 mb-6">
              NPR {Number(product.price).toLocaleString()}
            </p>

            <div className="bg-gray-50 border rounded-lg p-5 space-y-3">
              <p>
                <strong>Processor:</strong>{" "}
                {product.processor || "N/A"}
              </p>

              <p>
                <strong>RAM:</strong>{" "}
                {product.ram || "N/A"}
              </p>

              <p>
                <strong>Storage:</strong>{" "}
                {product.storage || "N/A"}
              </p>

              <p>
                <strong>Graphics:</strong>{" "}
                {product.graphics || "N/A"}
              </p>

              <p>
                <strong>Screen Size:</strong>{" "}
                {product.screenSize || "N/A"}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {product.stock || 0}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-lg mb-2">
                Description
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => addToCart(product._id)}
                className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                Add To Cart
              </button>

              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="flex-1 border border-black py-3 rounded-lg hover:bg-gray-100"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
