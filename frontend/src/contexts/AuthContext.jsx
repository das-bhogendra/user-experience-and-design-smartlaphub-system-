import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";
import {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
} from "../utils/localStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);

  // ================= LOAD FROM STORAGE =================
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();

    if (storedToken) setTokenState(storedToken);
    if (storedUser) setUserState(storedUser);
  }, []);

  // ================= LOGIN =================
  const login = async (data) => {
    const res = await loginUser(data);

    if (res?.token) {
      setToken(res.token);
      setTokenState(res.token);
    }

    if (res?.user) {
      setUser(res.user);
      setUserState(res.user);
    }

    return res;
  };

  // ================= REGISTER =================
  const register = async (data) => {
    const res = await registerUser(data);
    return res;
  };

  // ================= LOGOUT =================
  const logout = () => {
    removeToken();
    removeUser();
    setTokenState(null);
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};