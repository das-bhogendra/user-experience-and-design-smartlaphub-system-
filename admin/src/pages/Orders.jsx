import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // ================= FETCH ORDERS =================
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ================= STATUS UPDATE =================
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Orders Management
      </h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border p-5 my-3 text-sm"
        >
          {/* ICON */}
          <img className="w-12" src={assets.parcel_icon} alt="parcel" />

          {/* ORDER ITEMS + ADDRESS */}
          <div>
            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="py-0.5">
                  <b>{item.name}</b> × {item.quantity}
                </p>
              ))}
            </div>

            <p className="mt-3 font-medium">
              {order.address?.firstName} {order.address?.lastName}
            </p>

            <div>
              <p>{order.address?.street}</p>
              <p>
                {order.address?.city}, {order.address?.state},{" "}
                {order.address?.country} - {order.address?.zipcode}
              </p>
            </div>

            <p>{order.address?.phone}</p>
          </div>

          {/* ORDER INFO */}
          <div>
            <p>Items: {order.items.length}</p>
            <p className="mt-2">Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? "Done" : "Pending"}</p>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
          </div>

          {/* AMOUNT */}
          <p className="font-medium">
            {currency}
            {order.amount}
          </p>

          {/* STATUS */}
          <select
            onChange={(e) => statusHandler(e, order._id)}
            value={order.status}
            className="p-2 border font-medium"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;
