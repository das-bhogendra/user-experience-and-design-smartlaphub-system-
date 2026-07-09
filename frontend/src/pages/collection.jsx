import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductGrid from "../components/Product/ProductGrid";
import FilterSidebar from "../components/FilterSidebar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Collection = () => {
  const { products, loading } = useProducts();

  const [searchParams] = useSearchParams();

  // Category from URL
  const selectedCategory =
    searchParams.get("category") || "";

  // Filter States
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-lg font-medium">
          Loading Products...
        </div>
        <Footer />
      </>
    );
  }

  const filteredProducts = products.filter((product) => {
    const brandMatch =
      !selectedBrand ||
      product.brand === selectedBrand;

    const ramMatch =
      !selectedRam ||
      product.ram === selectedRam;

    let priceMatch = true;

    if (selectedPrice === "0-50000") {
      priceMatch = product.price < 50000;
    } else if (selectedPrice === "50000-100000") {
      priceMatch =
        product.price >= 50000 &&
        product.price <= 100000;
    } else if (selectedPrice === "100000-200000") {
      priceMatch =
        product.price >= 100000 &&
        product.price <= 200000;
    } else if (selectedPrice === "200000+") {
      priceMatch = product.price > 200000;
    }

    const categoryMatch =
      !selectedCategory ||
      product.category === selectedCategory;

    return (
      brandMatch &&
      ramMatch &&
      priceMatch &&
      categoryMatch
    );
  });

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {selectedCategory
              ? `${selectedCategory} Laptops`
              : "All Laptops"}
          </h1>

          <p className="text-gray-500 mt-2">
            Browse laptops based on category,
            brand, specifications and budget.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <div className="lg:w-64">
            <FilterSidebar
              brand={selectedBrand}
              setBrand={setSelectedBrand}
              ram={selectedRam}
              setRam={setSelectedRam}
              priceRange={selectedPrice}
              setPriceRange={setSelectedPrice}
            />
          </div>

          {/* Products */}
          <div className="flex-1">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                Products
              </h2>

              <span className="text-gray-500">
                {filteredProducts.length} item(s)
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="bg-white border rounded-lg p-10 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  No Products Found
                </h3>

                <p className="text-gray-500">
                  No laptops found in this category.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Collection;

