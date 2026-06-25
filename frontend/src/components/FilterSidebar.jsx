import React from "react";

const FilterSidebar = ({
  brand,
  setBrand,
  ram,
  setRam,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div className="w-full md:w-64 bg-white border rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-bold mb-5">Filters</h2>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Brand</h3>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">All Brands</option>
          <option value="Dell">Dell</option>
          <option value="HP">HP</option>
          <option value="Lenovo">Lenovo</option>
          <option value="Asus">Asus</option>
          <option value="Acer">Acer</option>
          <option value="MSI">MSI</option>
          <option value="Apple">Apple</option>
        </select>
      </div>

      {/* RAM Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">RAM</h3>

        <select
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">All RAM</option>
          <option value="4GB">4GB</option>
          <option value="8GB">8GB</option>
          <option value="16GB">16GB</option>
          <option value="32GB">32GB</option>
          <option value="64GB">64GB</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">All Prices</option>
          <option value="0-50000">Under NPR 50,000</option>
          <option value="50000-100000">NPR 50,000 - 100,000</option>
          <option value="100000-200000">NPR 100,000 - 200,000</option>
          <option value="200000+">Above NPR 200,000</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setBrand("");
          setRam("");
          setPriceRange("");
        }}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSidebar;