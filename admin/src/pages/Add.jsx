import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Add = ({ token }) => {
  // ================= IMAGES =================
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // ================= BASIC INFO =================
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Gaming");

  // ================= LAPTOP SPECS =================
  const [brand, setBrand] = useState("Dell");
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [graphics, setGraphics] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [stock, setStock] = useState("");

  const [bestseller, setBestseller] = useState(false);




  // ================= SUBMIT =================
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("processor", processor);
      formData.append("ram", ram);
      formData.append("storage", storage);
      formData.append("graphics", graphics);
      formData.append("screenSize", screenSize);
      formData.append("stock", stock);

      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setPrice("");
        setCategory("Gaming");

        setBrand("Dell");
        setProcessor("");
        setRam("");
        setStorage("");
        setGraphics("");
        setScreenSize("");
        setStock("");

        setBestseller(false);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* ================= IMAGES ================= */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => {
            const setImg = [setImage1, setImage2, setImage3, setImage4][index];
            const id = `image${index + 1}`;

            return (
              <label key={id} htmlFor={id} className="cursor-pointer">
                <img
                  className="w-20"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
                <input
                  type="file"
                  hidden
                  id={id}
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* ================= NAME ================= */}
      <div className="w-full">
        <p className="mb-2">Laptop Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2 border"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dell XPS 15"
          required
        />
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2 border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="High performance laptop..."
          required
        />
      </div>

      {/* ================= PRICE ================= */}
      <div className="w-full">
        <p className="mb-2">Price (NPR)</p>
        <input
          className="w-full max-w-[200px] px-3 py-2 border"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      {/* ================= CATEGORY ================= */}
      {/* ================= CATEGORY ================= */}
     <div>
       <p className="mb-2">Category</p>

       <select
        className="px-3 py-2 border"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
       <option value="Gaming">Gaming</option>
       <option value="Business">Business</option>
       <option value="Student">Student</option>
       <option value="Creator">Creator</option>
       </select>
     </div>

      {/* ================= BRAND ================= */}
      <div>
        <p className="mb-2">Brand</p>
        <select
          className="px-3 py-2 border"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option>Dell</option>
          <option>HP</option>
          <option>Lenovo</option>
          <option>Asus</option>
          <option>Acer</option>
          <option>Apple</option>
          <option>MSI</option>
        </select>
      </div>

      {/* ================= SPECS ================= */}
      <div className="flex flex-col gap-2 w-full max-w-[500px]">

        <input
          placeholder="Processor (e.g. Intel i7 13th Gen)"
          className="px-3 py-2 border"
          value={processor}
          onChange={(e) => setProcessor(e.target.value)}
          required
        />

        <input
          placeholder="RAM (e.g. 16GB)"
          className="px-3 py-2 border"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          required
        />

        <input
          placeholder="Storage (e.g. 512GB SSD)"
          className="px-3 py-2 border"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          required
        />

        <input
          placeholder="Graphics (e.g. RTX 4060)"
          className="px-3 py-2 border"
          value={graphics}
          onChange={(e) => setGraphics(e.target.value)}
        />

        <input
          placeholder="Screen Size (e.g. 15.6 inch)"
          className="px-3 py-2 border"
          value={screenSize}
          onChange={(e) => setScreenSize(e.target.value)}
          required
        />

        <input
          placeholder="Stock Quantity"
          type="number"
          className="px-3 py-2 border"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>

      {/* ================= BESTSELLER ================= */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label>Add to Bestseller</label>
      </div>

      {/* ================= BUTTON ================= */}
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 mt-4"
      >
        ADD LAPTOP
      </button>
    </form>
  );
};

export default Add;

