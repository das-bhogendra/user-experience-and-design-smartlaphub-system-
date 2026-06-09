import React from "react";

const FeatureProducts = () => {
  const products = [
    {
      id: 1,
      name: "Premium Headphones",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 3,
      name: "Sneakers",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: 4,
      name: "Backpack",
      price: "$65",
      image:
        "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
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
      </div>
    </section>
  );
};

export default FeatureProducts;