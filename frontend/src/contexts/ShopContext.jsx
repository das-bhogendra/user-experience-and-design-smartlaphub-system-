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
  // BACKEND URL (IMPORTANT FIX)
  // =====================
  const backendUrl = "http://localhost:5000";

  // =====================
  // CART STATE
  // =====================
  const [cart, setCart] = useState([]);

  // =====================
  // LOGOUT
  // =====================
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // =====================
  // ADD TO CART
  // =====================
  const addToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === item?.id);

      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: (updated[idx].quantity || 1) + 1,
        };
        return updated;
      }

      return [...prev, { ...item, quantity: 1 }];
    });
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
    backendUrl, // ✅ FIX ADDED

    // navigation
    navigate,

    // cart
    cart,
    setCart,
    addToCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;