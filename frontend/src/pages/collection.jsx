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
        <div className="text-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading Products...</p>
          </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Collection</span>
            {selectedCategory && (
              <>
                <span className="text-gray-300">/</span>
                <span className="text-xs text-gray-600 uppercase tracking-wider">{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {selectedCategory
              ? `${selectedCategory} Laptops`
              : "All Laptops"}
          </h1>

          <p className="text-gray-500 mt-2 max-w-2xl">
            Browse our premium selection of laptops. Filter by brand, specifications, and budget to find your perfect match.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
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
          <div className="flex-1 min-w-0">

            <div className="flex justify-between items-center mb-6 bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800">
                Products
              </h2>

              <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="bg-white border border-gray-100 rounded-xl p-12 text-center shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  product is not available for the selected filters
                </h3>

                <p className="text-gray-500">
                  No laptops match your current filters. Try adjusting your criteria.
                </p>

                <button
                  onClick={() => {
                    setSelectedBrand("");
                    setSelectedRam("");
                    setSelectedPrice("");
                  }}
                  className="mt-6 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-all duration-200"
                >
                  Clear All Filters
                </button>
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

