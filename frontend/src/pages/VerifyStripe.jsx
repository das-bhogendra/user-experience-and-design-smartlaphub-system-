import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { useShop } from "../contexts/ShopContext";

const VerifyStripe = () => {
  const { navigate } = useShop();
  const location = useLocation();
  const routerNavigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("success");

    const orderId = params.get("orderId");

    if (success === "true") {
      setResult({ ok: true, orderId });
      setLoading(false);
      // Navigate to Order Success page (keeps frontend logic simple)
      setTimeout(() => {
        // keep the orderId in query so OrderSuccess can render it if needed
        routerNavigate(`/confirm?orderId=${encodeURIComponent(orderId || "")}`);
      }, 600);
    } else {
      setResult({ ok: false, orderId });
      setLoading(false);
      setTimeout(() => {
        routerNavigate("/checkout");
      }, 1200);
    }
  }, [location.search, routerNavigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
          <div className="text-7xl mb-4">💳</div>

          {loading ? (
            <p className="text-gray-600">Verifying payment...</p>
          ) : result?.ok ? (
            <>
              <h1 className="text-2xl font-bold text-green-600 mb-3">
                Payment Successful
              </h1>
              <p className="text-gray-600">
                Redirecting to order confirmation...
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-red-600 mb-3">
                Payment Failed
              </h1>
              <p className="text-gray-600">
                Redirecting back to checkout...
              </p>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VerifyStripe;

