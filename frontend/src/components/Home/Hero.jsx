import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome to SmartLapHub
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Discover premium laptops, accessories, and tech products .
        </p>

        <button className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
          Shop Now
        </button>

      </div>
    </section>
  );
};

export default Hero;