import React, { useEffect, useState } from "react";
import { useShop } from "../contexts/ShopContext";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import {
  FaLock,
  FaShippingFast,
  FaShieldAlt,
} from "react-icons/fa";

const Cart = () => {
  const { cart, backendUrl, addToCart, removeFromCart, navigate } = useShop();

  const [products, setProducts] = useState([]);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);

      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= CALCULATE TOTAL =================
  let total = 0;

  const cartItems = products.filter((p) => cart[p._id]);

  cartItems.forEach((item) => {
    total += item.price * cart[item._id];
  });

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-2">
              Review your items before proceeding to checkout.
            </p>
          </div>

          {/* Empty Cart */}
          {!cartItems.length ? (
            <div className="bg-white rounded-xl shadow-md py-20 text-center">
              <h2 className="text-3xl mb-4">🛒</h2>
              <h3 className="text-2xl font-semibold text-gray-700">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mt-2">
                Looks like you haven't added anything yet.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition"
                  >
                    {/* Image */}
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-lg"
                    />

                    {/* Details */}
                    <div className="flex-1 md:ml-6 mt-4 md:mt-0">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {item.name}
                      </h2>

                      <p className="text-green-600 font-bold mt-1">
                        Rs. {item.price}
                      </p>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="w-9 h-9 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition text-lg"
                        >
                          −
                        </button>

                        <span className="text-lg font-semibold">
                          {cart[item._id]}
                        </span>

                        <button
                          onClick={() => addToCart(item._id)}
                          className="w-9 h-9 rounded-full bg-gray-200 hover:bg-green-600 hover:text-white transition text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-gray-500">Subtotal</p>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Rs. {item.price * cart[item._id]}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shop Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <FaLock size={28} />
                  </div>

                  <h3 className="text-xl font-semibold mt-5">
                    Secure Checkout
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Shop confidently with encrypted payment processing and
                    industry-standard security for every purchase.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaShippingFast size={28} />
                  </div>

                  <h3 className="text-xl font-semibold mt-5">
                    Precision Delivery
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Fast, reliable and carefully handled delivery with
                    real-time order tracking until it reaches your doorstep.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <FaShieldAlt size={28} />
                  </div>

                  <h3 className="text-xl font-semibold mt-5">
                    2-Year Warranty
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Every product is protected by our comprehensive
                    2-year warranty for complete peace of mind.
                  </p>
                </div>

              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-lg p-8 mt-10">
                <h2 className="text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-between text-lg mb-3">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="flex justify-between text-lg mb-3">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">
                    FREE
                  </span>
                </div>

                <div className="border-t pt-5 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Proceed to Secure Checkout →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;