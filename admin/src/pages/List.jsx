import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  

  // ================= REMOVE PRODUCT =================
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All Laptop Products</p>

      <div className="flex flex-col gap-2">

        {/* ================= HEADER ================= */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Specs</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ================= LIST ================= */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm"
          >
            {/* IMAGE */}
            <img
              className="w-12 h-12 object-cover"
              src={item.image[0]}
              alt="product"
            />

            {/* NAME */}
            <p className="font-medium">{item.name}</p>

            {/* SPECS (Laptop Info) */}
            <div className="text-xs text-gray-600">
              <p><b>Brand:</b> {item.brand}</p>
              <p><b>CPU:</b> {item.processor}</p>
              <p><b>RAM:</b> {item.ram}</p>
              <p><b>Storage:</b> {item.storage}</p>
            </div>

            {/* PRICE */}
            <p>
              {currency}{item.price}
            </p>

            {/* ACTION */}
            <p
              onClick={() => removeProduct(item._id)}
              className="text-center cursor-pointer text-red-500 font-bold hover:scale-110 transition"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
