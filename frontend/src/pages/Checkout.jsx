import React, { useEffect, useMemo, useState } from "react";
import { useShop } from "../contexts/ShopContext";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar"; 
import Footer from "../components/Footer/Footer";


const Checkout = () => {
  const { cart, backendUrl, token, navigate, setCart } = useShop();

  // Fetch products here so Order Summary always has correct product details.
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/list`);
        if (res?.data?.success) setAllProducts(res.data.products || []);
      } catch (e) {
        console.error("Failed to fetch products:", e);
      }
    };
    fetchProducts();
  }, [backendUrl]);

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
  // 'cod' for Cash on Delivery, 'card' for Stripe Debit/Credit
  // 'esewa' for eSewa, 'khalti' for Khalti (UI-only, coming soon)
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Card details UI is intentionally not implemented here because Stripe is handled
  // by redirecting to a Checkout Session created on the backend.
  // (Keeping this state previously caused confusion with “hardcoded” order summary.)
  // const [cardDetails, setCardDetails] = useState({
  //   cardNumber: "",
  //   expiryDate: "",
  //   cvv: "",
  // });

  // Helpers to handle both cart shapes:
  // 1) Array: [{ productId, price, quantity, ... }]
  // 2) Object map: { [productId]: quantity }
  const cartItemsArray = Array.isArray(cart)
    ? cart
    : Object.keys(cart || {}).map((itemId) => ({
        productId: itemId,
        quantity: cart[itemId],
      }));

  // Calculate Subtotal, Tax, and Grand Total (always from current cart state)
  // If `products` isn't loaded yet, use a safe numeric fallback from cart payload.
  const subtotal = cartItemsArray.reduce((sum, item) => {
    const product = allProducts?.find((p) => p._id === item.productId);

    // Priority:
    // 1) item.price (if present and numeric)
    // 2) product.price (from fetched allProducts)
    // 3) 0
    const unitPrice =
      typeof item.price === "number" && !Number.isNaN(item.price)
        ? item.price
        : typeof product?.price === "number" && !Number.isNaN(product.price)
          ? product.price
          : 0;

    return sum + unitPrice * Number(item.quantity || 0);
  }, 0);


  // Recompute grand total from the subtotal we actually show.
  // (Prevents UI mismatch when subtotal can't be computed yet.)




  const shippingFee = 500;
  const taxRate = 0.13; // VAT 13%
  const tax = Math.round(subtotal * taxRate);
  const grandTotal = subtotal + shippingFee + tax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      if (!authToken) {
        setErrorMessage("Please login to place your order.");
        return;
      }

      // ==========================================
      // १. CASH ON DELIVERY (COD) FLOW
      // ==========================================
      if (paymentMethod === "cod") {
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
          setErrorMessage(
            res?.data?.message || "Order failed. Please try again."
          );
        }
        return;
      }

      // ==========================================
      // २. STRIPE DEBIT/CREDIT CARD FLOW (FIXED)
      // ==========================================
      if (paymentMethod === "card") {
        // Convert cart object map => items array (backend expects array)
        const stripeItemsArray = cartItemsArray.map((it) => {
            const productData = allProducts?.find((p) => p._id === it.productId);
            return {
              productId: it.productId,
              quantity: it.quantity,
              name: productData ? productData.name : "Electronic Product",
              price: productData ? productData.price : it.price,
            };
          });

        const res = await axios.post(
          `${backendUrl}/api/order/stripe`,
          {
            items: stripeItemsArray, // यहाँ अब शुद्ध Array पठाइएको छ
            amount: grandTotal,
            address: formData,
          },
          { headers: { token: authToken } }
        );

        if (res?.data?.success && res?.data?.session_url) {
          // Stripe को सुरक्षित पेमेन्ट गेटवे पेजमा रिडाइरेक्ट गर्ने
          window.location.href = res.data.session_url;
        } else {
          setErrorMessage(
            res?.data?.message ||
              "Stripe session creation failed. Check backend console for details."
          );
        }
        return;
      }

      setErrorMessage("Please select a valid payment method.");
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Progress Tracker Steps */}
        <div className="flex items-center justify-center max-w-2xl mx-auto mb-10 relative">
          <div className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200" />
          {[
            { num: "1", label: "Shipping", active: true },
            { num: "2", label: "Delivery", active: false },
            { num: "3", label: "Payment", active: false },
            { num: "4", label: "Review", active: false },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-200 ${
                step.active
                  ? "bg-gray-900 text-white ring-4 ring-gray-100"
                  : "bg-white text-gray-400 border-2 border-gray-200"
              }`}>
                {step.num}
              </div>
              <span className={`text-xs font-medium mt-1.5 ${
                step.active ? "text-gray-900 font-semibold" : "text-gray-400"
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Grid Checkout content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Columns - Address & Payment Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Container */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-base">🚚</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none text-sm transition-all duration-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase tracking-wider">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none text-sm transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Container */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-base">💳</span>
                Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 text-sm font-semibold transition-all duration-200 ${
                    paymentMethod === "cod"
                      ? "border-gray-900 bg-gray-50 text-gray-900 shadow-sm"
                      : "border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mb-2">💵</span>
                  Cash on Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 text-sm font-semibold transition-all duration-200 ${
                    paymentMethod === "card"
                      ? "border-gray-900 bg-gray-50 text-gray-900 shadow-sm"
                      : "border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mb-2">💳</span>
                  Debit/Credit Card (Stripe)
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("esewa")}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 text-sm font-semibold transition-all duration-200 ${
                    paymentMethod === "esewa"
                      ? "border-gray-900 bg-gray-50 text-gray-900 shadow-sm"
                      : "border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mb-2 font-bold text-green-600">eSewa</span>
                  <span className="text-[10px] text-gray-400 font-normal mt-0.5">Coming Soon</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("khalti")}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 text-sm font-semibold transition-all duration-200 ${
                    paymentMethod === "khalti"
                      ? "border-gray-900 bg-gray-50 text-gray-900 shadow-sm"
                      : "border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mb-2 font-bold text-purple-600">Khalti</span>
                  <span className="text-[10px] text-gray-400 font-normal mt-0.5">Coming Soon</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4">
                  <span className="text-lg">
                    {paymentMethod === "card" ? "🔒" : 
                     paymentMethod === "esewa" ? "⏳" :
                     paymentMethod === "khalti" ? "⏳" : "💵"}
                  </span>
                  <p className="text-sm text-gray-600">
                    {paymentMethod === "card"
                      ? "Your payment will be securely processed by Stripe. No card details are stored on our servers."
                      : paymentMethod === "esewa"
                        ? "eSewa integration will be available soon."
                        : paymentMethod === "khalti"
                          ? "Khalti integration will be available soon."
                          : "Pay with cash when your order arrives. No online payment needed."}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex gap-4 text-sm text-gray-600">
              <span className="text-xl flex-shrink-0">🛡️</span>
              <p>Your payment information is processed securely with 256-bit SSL encryption. We never store your full card details.</p>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-base">📋</span>
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                {cartItemsArray.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-lg mb-1">🛒</p>
                    <p className="text-sm font-medium">Your cart is empty</p>
                  </div>
                ) : (
                  cartItemsArray.map(({ productId, quantity }) => {
                    const item = allProducts?.find((p) => p._id === productId);

                    if (!item) return null;

                    const qty = quantity;
                    const itemTotal = item.price * qty;

                    return (
                      <div
                        key={item._id}
                        className="border border-gray-100 rounded-xl p-4 bg-gray-50 hover:bg-white transition-colors duration-200"
                      >
                        <div className="flex gap-3">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                            <img
                              src={item.image?.[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{item.brand}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">Qty: {qty}</span>
                              <span className="font-bold text-sm text-gray-900">NPR {itemTotal.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Price Line Breakdown */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-medium">NPR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Fee</span>
                  <span className="text-gray-900 font-medium">NPR {shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (VAT 13%)</span>
                  <span className="text-gray-900 font-medium">NPR {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-xl font-extrabold text-gray-900">NPR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {errorMessage && (
                  <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={loading}
                  className={`w-full bg-gray-900 text-white py-3.5 rounded-2xl font-bold text-sm tracking-wide shadow-sm transition-all duration-200 ${
                    loading
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-black hover:shadow-md active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    paymentMethod === "card" ? "Pay Now with Stripe" : "Place Order (COD)"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98]"
                >
                  Return to Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">🛡️ Secure</span>
                  <span className="text-gray-200">•</span>
                  <span className="flex items-center gap-1">🔒 Verified</span>
                  <span className="text-gray-200">•</span>
                  <span className="flex items-center gap-1">⚙️ Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;



