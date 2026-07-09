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

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === "cod"
                      ? "border-black bg-black/5 text-black ring-1 ring-black"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-lg mb-1">💵</span>
                  Cash on Delivery
                </button>

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
                  Debit/Credit Card (Stripe)
                </button>
              </div>

              {paymentMethod === "card" ? (
                <div className="border-t border-slate-100 pt-6 text-center py-4 text-sm text-slate-700">
                  Your payment will be securely processed by Stripe.
                </div>
              ) : (
                <div className="border-t border-slate-100 pt-6 text-center py-4 text-sm text-slate-500">
                  Pay with cash when your order arrives.
                </div>
              )}
            </div>

            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex gap-3 text-xs text-blue-700">
              <span className="text-sm mt-0.5">🛡️</span>
              <p>Your payment information is processed securely with 256-bit SSL encryption. We never store your full card details.</p>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold">Order Summary</h2>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">

              {cartItemsArray.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              ) : (
                cartItemsArray.map(({ productId, quantity }) => {
                  const item = allProducts?.find((p) => p._id === productId);

                  if (!item) return null;

                  const qty = quantity;
                  const itemTotal = item.price * qty;

                  return (
                    <div
                      key={item._id}
                      className="border rounded-xl p-3 bg-gray-50"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image?.[0]}
                          alt={item.name}
                          className="w-24 h-24 rounded-lg object-cover border"
                        />

                        <div className="flex-1">
                          <h3 className="font-bold text-sm">{item.name}</h3>

                          <p className="text-xs text-gray-500">Brand: {item.brand}</p>
                          <p className="text-xs text-gray-500">Category: {item.category}</p>
                          <p className="text-xs text-gray-500">Processor: {item.processor}</p>
                          <p className="text-xs text-gray-500">RAM: {item.ram}</p>
                          <p className="text-xs text-gray-500">Storage: {item.storage}</p>

                          {item.graphics && (
                            <p className="text-xs text-gray-500">
                              Graphics: {item.graphics}
                            </p>
                          )}

                          <p className="text-xs text-gray-500">Screen: {item.screenSize}</p>

                          <hr className="my-2" />

                          <div className="flex justify-between text-sm">
                            <span>Unit Price</span>
                            <span>NPR {item.price.toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span>Quantity</span>
                            <span>{qty}</span>
                          </div>

                          <div className="flex justify-between font-bold text-blue-600 mt-2">
                            <span>Item Total</span>
                            <span>NPR {itemTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
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

            {/* Action Buttons */}
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
                {loading ? "Processing..." : paymentMethod === "card" ? "Pay Now with Stripe" : "Place Order (COD)"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="w-full bg-white text-blue-600 border border-blue-200 py-2.5 rounded-xl font-bold text-sm transition hover:bg-slate-50"
              >
                Return to Cart
              </button>
            </div>

            <div className="flex justify-center items-center gap-4 text-slate-400 text-xs pt-2">
              <span>🛡️ Secure</span>
              <span>•</span>
              <span>🔒 Verified</span>
              <span>•</span>
              <span>⚙️ Encrypted</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;



