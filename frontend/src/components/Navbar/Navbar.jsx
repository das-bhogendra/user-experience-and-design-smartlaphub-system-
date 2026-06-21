import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileDrop from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Laptops", href: "#laptops", active: false },
    { name: "Accessories", href: "#accessories", active: false },
    { name: "Gaming", href: "#gaming", active: false },
    { name: "Deals", href: "#deals", active: false },
    { name: "Support", href: "#support", active: false },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <a
            href="/"
            className="text-xl font-extrabold tracking-tight text-black"
          >
            SmartLap Hub
          </a>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 h-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-500 hover:text-black"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <SearchBar />

          <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <Heart className="w-5 h-5" />
          </button>

          {/* ✅ CART FIX HERE */}
          <button
            onClick={() => navigate("/cart")}
            className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>

          <ProfileDrop />

          <MobileMenu navLinks={navLinks} />
        </div>

      </div>
    </nav>
  );
}