import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // ================= TOKEN =================
  // AuthContext stores token under smartlaphub_token.
  // Keep backward compatibility with older key "token".
  const [token, setToken] = useState(
    () =>
      localStorage.getItem("smartlaphub_token") ||
      localStorage.getItem("token") ||
      ""
  );

  useEffect(() => {
    const storedToken =
      localStorage.getItem("smartlaphub_token") ||
      localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);


  // ================= BACKEND =================
  const backendUrl = "http://localhost:5000";

  // ================= CART (IMPORTANT) =================
  // FORMAT: { productId: quantity }
  const [cart, setCart] = useState({});

  // ================= ADD TO CART =================
  const addToCart = (productId) => {
    setCart((prev) => {
      const updated = { ...prev };
      updated[productId] = (updated[productId] || 0) + 1;
      return updated;
    });
  };

  // ================= REMOVE =================
  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[productId]) return updated;

      updated[productId] -= 1;
      if (updated[productId] <= 0) delete updated[productId];

      return updated;
    });
  };

  // ================= CLEAR =================
  const clearCart = () => setCart({});

  // ================= LOGOUT =================
  const logout = () => {
    // remove both possible keys
    localStorage.removeItem("smartlaphub_token");
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };


  return (
    <ShopContext.Provider
      value={{
        backendUrl,
        token,
        setToken,
        navigate,

        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,

        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
