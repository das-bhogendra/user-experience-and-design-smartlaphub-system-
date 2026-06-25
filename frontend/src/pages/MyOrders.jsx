import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShop } from "../contexts/ShopContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { backendUrl, token } = useShop();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Fetch user orders
  const fetchOrders = async () => {
    try {
      console.log("[MyOrders] token exists:", !!token);
      const res = await axios.post(
        `${backendUrl}/api/order/user`,
        {},
        { headers: { token } }
      );

      console.log("[MyOrders] response:", {
        success: res?.data?.success,
        ordersCount: res?.data?.orders?.length,
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded mb-4 shadow-sm"
          >
            <p className="font-semibold">
              Order ID: {order._id}
            </p>

            <p>Total: NPR {order.amount}</p>

            <p>
              Status:{" "}
              <span className="font-bold text-blue-600">
                {order.status}
              </span>
            </p>

            <button
              onClick={() => navigate(`/order/${order._id}`)}
              className="mt-3 bg-black text-white px-4 py-2 rounded"
            >
              Track Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
