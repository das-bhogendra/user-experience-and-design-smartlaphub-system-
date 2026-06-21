import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopContext = createContext(null);

export const useShop = () => useContext(ShopContext);

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // =====================
  // AUTH STATE
  // =====================
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  // =====================
  // BACKEND URL
  // =====================
  const backendUrl = "http://localhost:5000";

  // =====================
  // CART STATE (IMPORTANT FIXED)
  // cart = { productId: quantity }
  // =====================
  const [cart, setCart] = useState({});

  // =====================
  // ADD TO CART
  // =====================
  const addToCart = (productId) => {
    setCart((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[productId]) {
        updatedCart[productId] += 1;
      } else {
        updatedCart[productId] = 1;
      }

      return updatedCart;
    });
  };

  // =====================
  // REMOVE FROM CART (OPTIONAL BUT USEFUL)
  // =====================
  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updatedCart = { ...prev };

      if (!updatedCart[productId]) return updatedCart;

      updatedCart[productId] -= 1;

      if (updatedCart[productId] <= 0) {
        delete updatedCart[productId];
      }

      return updatedCart;
    });
  };

  // =====================
  // CLEAR CART (OPTIONAL)
  // =====================
  const clearCart = () => {
    setCart({});
  };

  // =====================
  // LOGOUT
  // =====================
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // =====================
  // CONTEXT VALUE
  // =====================
  const value = {
    // auth
    token,
    setToken,
    logout,

    // backend
    backendUrl,

    // navigation
    navigate,

    // cart
    cart,
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;