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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-lg">
          Loading Profile...
        </div>
      </>
    );
  }

  if (!token) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            Please login to view your profile.
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side */}
          <ProfileCard user={user} />

          {/* Right Side */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-6">
              Order History
            </h2>

            {orders.length === 0 ? (
              <p className="text-gray-500">
                No orders found.
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-xl p-5 mb-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      Order #{order._id.slice(-6)}
                    </h3>

                    <span className="text-blue-600 font-medium">
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-2">
                    <strong>Total:</strong> ${order.amount}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.paymentStatus || "Pending"}
                  </p>

                  <p>
                    <strong>Method:</strong>{" "}
                    {order.paymentMethod || "COD"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-3">
                    <strong>Items:</strong>

                    <ul className="list-disc ml-6 mt-2">
                      {order.items?.map((item, index) => (
                        <li key={index}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;