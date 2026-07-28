import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Delivery from "./pages/delivery";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderTracking from "./pages/OrderTracking";
import ProductDetails from "./pages/ProductDetails";
import VerifyStripe from "./pages/VerifyStripe";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/delivery" element={<Delivery />} />

      {/* Stripe return URL */}
      <Route path="/verify" element={<VerifyStripe />} />

      <Route path="/confirm" element={<OrderSuccess />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order/:id" element={<OrderTracking />} />
    </Routes>
  );
};

export default App;










