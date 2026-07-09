import React from "react";
import laptop2 from "../../assets/images/products/laptop2.png";
import laptop7 from "../../assets/images/products/laptop7.avif";
import laptop9 from "../../assets/images/products/laptop9.avif";
import laptop8 from "../../assets/images/products/laptop8.avif";
import gaming from "../../assets/images/products/laptopgaming.png";
const FeatureProducts = () => {
  const products = [
    {
      id: 1,
      name: "Dell XPS 13 Laptop",
      price: "Rs 1200",
      image:laptop7
    },
    {
      id: 2,
      name: "Dell Inspiron 15 Laptop",
      price: "Rs 1099",
      image:laptop2
    },
    {
      id: 3,
      name: "Apple MacBook Pro 16-inch",
      price: "Rs 1689",
      image:laptop9
    },
    {
      id: 4,
      name: "Asus ROG Zephyrus G14 Gaming Laptop",
      price: "RS 1499",
      image:laptop8
    },
  ];


  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Hand-picked products chosen for quality and popularity.
        </p>
        {/* Gaming Series Banner */}
      

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-semibold text-lg">
                  {product.name}
                </h3>

                <p className="text-indigo-600 font-bold mt-2">
                  {product.price}
                </p>

                <button className="w-full bg-slate-900 text-white py-3 rounded-xl mt-4">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

        </div>
        <div className="relative rounded-3xl overflow-hidden mb-20">
        <img
          src={gaming}
          alt="Gaming Series"
          className="w-full h-[450px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-12">
          <h2 className="text-5xl font-bold text-white">
            Gaming Series
          </h2>

          <p className="text-white text-xl mt-4 max-w-xl">
            Experience next-level gaming performance with RTX-powered laptops.
          </p>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
            Explore Now
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default FeatureProducts;

