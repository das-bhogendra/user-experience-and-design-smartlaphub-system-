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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Order Tracking
      </h1>

      {!order ? (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          <p>Loading order details...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">

          {/* Order Info */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                Order ID
              </p>
              <p className="font-semibold text-gray-800 text-sm">
                {order._id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                Total
              </p>
              <p className="font-bold text-gray-800">NPR {order.amount}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            {steps.map((step, index) => {
              const isActive = steps.indexOf(order.status) >= index;
              const isLast = index === steps.length - 1;
              const isCurrent = steps.indexOf(order.status) === index;

              return (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-green-500"
                          : "bg-gray-200"
                      } ${isCurrent ? "ring-4 ring-green-100" : ""}`}
                    >
                      {isActive && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 flex-1 min-h-[24px] ${
                          steps.indexOf(order.status) > index
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>

                  <p
                    className={`text-sm pb-6 ${
                      isActive
                        ? "text-gray-800 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Items */}
          <h2 className="font-semibold text-gray-800 mb-3">Items</h2>
          <div className="divide-y divide-gray-100">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <p className="text-gray-700">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
