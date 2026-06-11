import api from "./api";

// Expected named exports by AuthContext.jsx
export const loginUser = async (data) => {
  // Backend: POST /api/user/login
  const res = await api.post("/user/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  // Backend: POST /api/user/register
  const res = await api.post("/user/register", data);
  return res.data;
};

