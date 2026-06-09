import React from "react";
import { Link } from "react-router-dom"; // 1. Import Link

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Welcome to SmartLapHub
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Discover the best laptops and accessories at unbeatable prices.
        </p>

        {/* 2. Wrap your button inside the Link component pointing to /home */}
        <Link to="/home">
          <button className="mt-8 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Shop Now
          </button>
        </Link>

      </div>
    </section>
  );
};

export default Hero;