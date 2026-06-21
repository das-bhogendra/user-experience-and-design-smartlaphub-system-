import React, { useState } from "react";
import { useShop } from "../contexts/ShopContext";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar"; // Capitalized component name
import Footer from "../components/Footer/Footer";

const Checkout = () => {
  const { cart, backendUrl, token, navigate, setCart } = useShop();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const authToken = token || localStorage.getItem("smartlaphub_token");


  // Form Fields State

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    streetAddress: "123 Tech Lane, Silicon Suburb",
    city: "Kathmandu",
    phone: "+977-9800000000",
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card', 'esewa', 'khalti'
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Calculate Subtotal, Tax, and Grand Total
  const subtotal = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 185000; // Fallback fallback to image value for illustration if cart is empty

  const shippingFee = 500;
  const taxRate = 0.13; // VAT 13%
  const tax = Math.round(subtotal * taxRate);
  const grandTotal = subtotal + shippingFee + tax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const orderData = {
        items: cart,
        amount: grandTotal,
        address: formData,
        paymentMethod,
        cardDetails: paymentMethod === "card" ? cardDetails : null,
      };


      if (!authToken) {
        setErrorMessage("Please login to place your order.");
        return;
      }


      const res = await axios.post(

        `${backendUrl}/api/order/place`,
        {
          items: cart,
          amount: grandTotal,
          address: formData,
        },
        { headers: { token: authToken } }
      );





      if (res?.data?.success) {
        alert("Order processed successfully!");
        setCart({});
        localStorage.removeItem("cart");
        navigate("/delivery");

      } else {
        setErrorMessage(res?.data?.message || "Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Order submission failed. Please check console/network and try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto w-full px-4 py-8 flex-grow">

        {/* Progress Tracker Steps */}
        <div className="flex items-center justify-center max-w-xl mx-auto mb-10 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-blue-100 -z-10" />
          
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shadow">1</div>
            <span className="text-xs font-bold mt-1 text-black">Shipping</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-400 flex items-center justify-center font-bold text-sm">2</div>
            <span className="text-xs font-medium mt-1 text-slate-400">Delivery</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-400 flex items-center justify-center font-bold text-sm">3</div>
            <span className="text-xs font-medium mt-1 text-slate-400">Payment</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-400 flex items-center justify-center font-bold text-sm">4</div>
            <span className="text-xs font-medium mt-1 text-slate-400">Review</span>
          </div>
        </div>

        {/* Main Grid Checkout content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Columns - Address & Payment Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shipping Address Container */}
            <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="text-sm">🚚</span> Shipping Address
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:outline-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:outline-blue-500 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-slate-500 block mb-1">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:outline-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:outline-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:outline-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Container */}
            <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="text-sm">💳</span> Payment Method
              </h2>

              {/* Tabs Container */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === "card"
                      ? "border-blue-600 bg-blue-50/50 text-blue-600 ring-1 ring-blue-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-lg mb-1">💳</span>
                  Credit/Debit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("esewa")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === "esewa"
                      ? "border-green-600 bg-green-50/50 text-green-700 ring-1 ring-green-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center font-bold mb-1">e</span>
                  eSewa Wallet
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("khalti")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === "khalti"
                      ? "border-purple-800 bg-purple-50/50 text-purple-900 ring-1 ring-purple-800"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-purple-800 text-white text-[10px] flex items-center justify-center font-bold mb-1">K</span>
                  Khalti Digital
                </button>
              </div>

              {/* Card Inputs Conditionally Rendered or Grayed Out */}
              {paymentMethod === "card" ? (
                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div className="relative">
                    <label className="text-xs font-medium text-slate-500 block mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange}
                        className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:outline-blue-500 text-sm pr-10"
                      />
                      <span className="absolute right-3 top-3 text-slate-400">🔒</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleCardChange}
                        className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:outline-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 block mb-1">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="***"
                        maxLength={3}
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:outline-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t border-slate-100 pt-6 text-center py-4 text-sm text-slate-500">
                  You will be redirected to securely complete your payment via your selected gateway.
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex gap-3 text-xs text-blue-700">
              <span className="text-sm mt-0.5">🛡️</span>
              <p>Your payment information is processed securely with 256-bit SSL encryption. We never store your full card details.</p>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold">Order Summary</h2>

            {/* Product Mapping List */}
            <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
              {Array.isArray(cart) && cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border border-slate-100 bg-slate-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{item.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">Qty: {item.quantity}</p>
                      <p className="text-xs font-bold text-slate-700 mt-0.5">NPR {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                /* Static item template matching placeholder mock image */
                <div className="flex gap-3 items-center">
                  <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs p-1">💻</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">ProBook Ultra X1</h4>
                    <p className="text-xs text-slate-500 font-medium">Qty: 1</p>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">NPR 185,000</p>
                  </div>
                </div>
              )}
            </div>

            {/* Price Line Breakdown */}
            <div className="border-t border-slate-100 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal</span>
                <span className="text-slate-800 font-semibold">NPR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Shipping Fee</span>
                <span className="text-slate-800 font-semibold">NPR {shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Tax (VAT 13%)</span>
                <span className="text-slate-800 font-semibold">NPR {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-100 items-baseline">
                <span className="text-base font-bold text-slate-800">Total</span>
                <span className="text-xl font-extrabold text-slate-900">NPR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Interactive Flow Action Controls */}
            <div className="space-y-3 pt-2">
              {errorMessage ? (
                <div className="w-full bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="button"
                onClick={placeOrder}
                disabled={loading}
                className={`w-full bg-black text-white py-3 rounded-xl font-bold text-sm tracking-wide transition shadow-sm ${
                  loading ? "opacity-60 cursor-not-allowed hover:bg-black" : "hover:bg-slate-800"
                }`}
              >
                {loading ? "Processing..." : "Proceed to Delivery"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="w-full bg-white text-blue-600 border border-blue-200 py-2.5 rounded-xl font-bold text-sm transition hover:bg-slate-50"
              >
                Return to Cart
              </button>
            </div>

            {/* Trust Marks icons footer */}
            <div className="flex justify-center items-center gap-4 text-slate-400 text-xs pt-2">
              <span title="Secure Checkout">🛡️ Secure</span>
              <span>•</span>
              <span title="Buyer Protection">🔒 Verified</span>
              <span>•</span>
              <span title="Privacy Certified">⚙️ Encrypted</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;