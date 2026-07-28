import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShop } from "../contexts/ShopContext";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  "Order Placed": "bg-blue-50 text-blue-600",
  "Packing": "bg-amber-50 text-amber-600",
  "Shipped": "bg-indigo-50 text-indigo-600",
  "Out For Delivery": "bg-purple-50 text-purple-600",
  "Delivered": "bg-green-50 text-green-600",
};

const MyOrders = () => {
  const { backendUrl, token } = useShop();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders
  const fetchOrders = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-xl p-5 shadow-sm animate-pulse"
            >
              <div className="h-4 w-56 bg-gray-100 rounded mb-3" />
              <div className="h-3 w-32 bg-gray-100 rounded mb-3" />
              <div className="h-3 w-24 bg-gray-100 rounded mb-4" />
              <div className="h-9 w-28 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="border border-gray-100 rounded-xl p-10 text-center shadow-sm">
          <p className="text-gray-500">No orders found.</p>
          <p className="text-sm text-gray-400 mt-1">
            Your orders will show up here once you place one.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                    Order ID
                  </p>
                  <p className="font-semibold text-gray-800 text-sm">
                    {order._id}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                    statusStyles[order.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-700 font-medium mb-4">
                NPR {order.amount}
              </p>

              <button
                onClick={() => navigate(`/order/${order._id}`)}
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Track Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
