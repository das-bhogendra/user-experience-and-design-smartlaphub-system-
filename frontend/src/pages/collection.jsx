import useProducts from "../hooks/useProducts";
import ProductGrid from "../components/Product/ProductGrid";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Collection = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Products...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-10 py-8">
        <h1 className="text-3xl font-bold mb-8">All Laptops</h1>

        <ProductGrid products={products} />
      </div>
      <Footer />
    </>
  );
};

export default Collection;
