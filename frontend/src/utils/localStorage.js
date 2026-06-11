// Simple helpers for storing auth data in browser localStorage.
// Must export the named functions used across AuthContext.

const TOKEN_KEY = "smartlaphub_token";
const USER_KEY = "smartlaphub_user";

export const setToken = (token) => {
  if (token === undefined || token === null) return;
  localStorage.setItem(TOKEN_KEY, String(token));
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUser = (user) => {
  if (user === undefined || user === null) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

