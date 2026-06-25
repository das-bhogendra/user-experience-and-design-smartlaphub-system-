import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useShop } from "../contexts/ShopContext";

const OrderTracking = () => {
  const { id } = useParams();
  const { backendUrl, token } = useShop();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      // backend currently supports fetching user orders via POST /api/order/user
      // so we reuse that API and pick the order by id.
      const res = await axios.post(
        `${backendUrl}/api/order/user`,
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        const found = res.data.orders?.find((o) => o._id === id);
        if (found) setOrder(found);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const steps = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Order Tracking
      </h1>

      {!order ? (
        <p>Loading...</p>
      ) : (
        <div className="border p-6 rounded shadow">
          
          {/* Order Info */}
          <p className="font-semibold mb-2">
            Order ID: {order._id}
          </p>

          <p className="mb-4">
            Total: NPR {order.amount}
          </p>

          {/* Timeline */}
          <div className="space-y-3 mb-6">
            {steps.map((step, index) => {
              const isActive =
                steps.indexOf(order.status) >= index;

              return (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      isActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>

                  <p
                    className={
                      isActive
                        ? "text-green-600 font-semibold"
                        : "text-gray-400"
                    }
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Items */}
          <h2 className="font-bold mb-2">Items</h2>

          {order.items.map((item, i) => (
            <div key={i} className="border-b py-2">
              <p>{item.name}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
