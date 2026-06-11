import api from "./api";

export const getAllProducts = async () => {
  const response = await api.get("/product/list");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};