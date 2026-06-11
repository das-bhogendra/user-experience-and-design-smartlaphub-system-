import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";
import { setToken, setUser, getUser, removeToken, removeUser } from "../utils/localStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) setUserState(storedUser);
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    setToken(res.token);
    setUser(res.user);
    setUserState(res.user);
    return res;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    return res;
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};