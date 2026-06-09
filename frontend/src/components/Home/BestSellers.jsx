import React from "react";

const bestSellerProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
  },
  {
    id: 4,
    name: "Sneakers",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
];

const BestSellers = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Best Sellers
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {bestSellerProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  ${item.price}
                </p>

                <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default BestSellers;