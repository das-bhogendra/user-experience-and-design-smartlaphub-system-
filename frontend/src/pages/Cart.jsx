import React, { useEffect, useState } from "react";
import { useShop } from "../contexts/ShopContext";
import axios from "axios";

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

  // ================= EMPTY CART =================
  if (!cartItems.length) {
    return (
      <div className="text-center py-20 text-gray-600">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* ================= CART ITEMS ================= */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border p-4 rounded"
          >
            {/* IMAGE */}
            <img
              src={item.image?.[0]}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            {/* DETAILS */}
            <div className="flex-1 ml-4">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">Rs. {item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                {/* DECREASE */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="px-2 bg-gray-200"
                >
                  -
                </button>

                {/* QTY */}
                <span>{cart[item._id]}</span>

                {/* INCREASE */}
                <button
                  onClick={() => addToCart(item._id)}
                  className="px-2 bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* SUBTOTAL */}
            <div className="font-bold">
              Rs. {item.price * cart[item._id]}
            </div>
          </div>
        ))}
      </div>

      {/* ================= TOTAL ================= */}
      <div className="mt-6 text-right text-xl font-bold">
        Total: Rs. {total}
      </div>

      {/* CHECKOUT BUTTON */}
      <div className="text-right mt-4">
        <button
       onClick={() => navigate("/checkout")}
       className="bg-green-600 text-white px-6 py-2 mt-4"
        >
         Checkout
       </button>
      </div>
    </div>
  );
};

export default Cart;

