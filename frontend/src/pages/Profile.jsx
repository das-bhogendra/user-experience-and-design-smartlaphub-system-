import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import { useShop } from "../contexts/ShopContext";
import Navbar from "../components/Navbar/Navbar";

const Profile = () => {
  const { backendUrl, token } = useShop();

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/profile`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setOrders(response.data.orders);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Calculate stats from orders
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const lastOrderDate = orders.length > 0
    ? new Date(orders[0].createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading Profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!token) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please login to view your profile.
          </h2>
          <p className="text-gray-500">Sign in to access your dashboard and order history.</p>
        </div>
      </>
    );
  }

  const getStatusColor = (status) => {
    const statusMap = {
      "Order Placed": "bg-blue-50 text-blue-700 border-blue-200",
      "Packing": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "Shipped": "bg-purple-50 text-purple-700 border-purple-200",
      "Out For Delivery": "bg-orange-50 text-orange-700 border-orange-200",
      "Delivered": "bg-green-50 text-green-700 border-green-200",
      "Cancelled": "bg-red-50 text-red-700 border-red-200",
    };
    return statusMap[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Profile
            </h1>
            <p className="text-gray-500 mt-2">Manage your account and view your order history.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Side - Profile Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProfileCard user={user} />
              </div>
            </div>

            {/* Right Side */}
            <div className="lg:col-span-2 space-y-6">

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
                      📦
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
                      💰
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Spent</p>
                      <p className="text-2xl font-bold text-gray-900">NPR {totalSpent.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
                      📅
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Last Order</p>
                      <p className="text-lg font-bold text-gray-900 truncate">{lastOrderDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6 border-b border-gray-50">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-base">📋</span>
                    Order History
                  </h2>
                </div>

                <div className="p-6">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">📦</div>
                      <p className="text-gray-500 font-medium">No orders found</p>
                      <p className="text-gray-400 text-sm mt-1">Start shopping to see your orders here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="border border-gray-50 rounded-xl p-5 hover:border-gray-200 transition-colors duration-200"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                            <div>
                              <p className="font-semibold text-gray-900">
                                Order #{order._id.slice(-8).toUpperCase()}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>

                          {/* Order Details */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-xs text-gray-400">Total</p>
                              <p className="font-semibold text-gray-800">NPR {order.amount?.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Payment</p>
                              <p className="font-semibold text-gray-800 capitalize">{order.paymentStatus || "Pending"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Method</p>
                              <p className="font-semibold text-gray-800">{order.paymentMethod || "COD"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Items</p>
                              <p className="font-semibold text-gray-800">{order.items?.length || 0}</p>
                            </div>
                          </div>

                          {/* Items List */}
                          {order.items?.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-50">
                              <div className="flex flex-wrap gap-2">
                                {order.items.map((item, index) => (
                                  <span key={index} className="inline-flex items-center gap-1 bg-gray-50 text-xs text-gray-600 px-2.5 py-1 rounded-lg border border-gray-50">
                                    {item.name?.split(" ").slice(0, 2).join(" ") || item.name}
                                    <span className="text-gray-400">×{item.quantity}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
