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
    <div className="w-full md:w-64 bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </h2>

      {/* Brand Filter */}
      <div className="mb-7 pb-7 border-b border-gray-50">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Brand</h3>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-300 outline-none transition-all duration-200 cursor-pointer"
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
      <div className="mb-7 pb-7 border-b border-gray-50">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">RAM</h3>
        <select
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-300 outline-none transition-all duration-200 cursor-pointer"
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
      <div className="mb-7 pb-7 border-b border-gray-50">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Price Range</h3>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-1 focus:ring-gray-300 outline-none transition-all duration-200 cursor-pointer"
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
        className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium tracking-wide hover:bg-black transition-all duration-200 active:scale-[0.98]"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
