import React from "react";
import { useNavigate } from "react-router-dom";
import laptopImage from "../../assets/images/products/laptop.jpg"; // Adjust path if needed

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[80vh] bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${laptopImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Welcome to SmartLapHub
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
          Discover premium laptops, accessories, and tech products.
        </p>

        <button
          onClick={() => navigate("/collection")}
          className="mt-8 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;