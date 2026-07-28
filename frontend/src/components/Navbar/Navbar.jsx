import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../contexts/ShopContext";
import SearchBar from "./SearchBar";
import ProfileDrop from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useShop();

  // Calculate total quantity from cart object { productId: quantity }
  const cartCount = Object.values(cart || {}).reduce(
    (total, qty) => total + qty,
    0
  );

  const navLinks = [
    {
      name: "Gaming",
      onClick: () => navigate("/collection?category=Gaming"),
    },
    {
      name: "Business",
      onClick: () => navigate("/collection?category=Business"),
    },
    {
      name: "Student",
      onClick: () => navigate("/collection?category=Student"),
    },
    {
      name: "Creator",
      onClick: () => navigate("/collection?category=Creator"),
    },
    {
      name: "All Laptops",
      onClick: () => navigate("/collection"),
    },
    {
      name: "Contact",
      onClick: () => navigate("/contact"),
    },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          className="cursor-pointer text-xl font-extrabold tracking-tight text-black"
        >
          SmartLap Hub
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 h-full">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={link.onClick}
              className="text-sm font-medium text-gray-500 hover:text-black transition"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <SearchBar />

          <button className="p-2 text-gray-700 hover:text-blue-600">
            <Heart className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 leading-none shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <ProfileDrop />

          <MobileMenu navLinks={navLinks} />
        </div>

      </div>
    </nav>
  );
}
