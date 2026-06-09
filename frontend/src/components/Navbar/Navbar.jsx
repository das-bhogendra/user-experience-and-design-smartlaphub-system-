import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import SearchBar from './SearchBar';
import ProfileDrop from "./ProfileDropdown";
import MobileMenu from './MobileMenu';

export default function Navbar() {
  // Navigation items matching your layout
  const navLinks = [
    { name: 'Laptops', href: '#laptops', active: false }, // Active state with underline in image
    { name: 'Accessories', href: '#accessories', active: false },
    { name: 'Gaming', href: '#gaming', active: false },
    { name: 'Deals', href: '#deals', active: false },
    { name: 'Support', href: '#support', active: false },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <a href="/" className="text-xl font-extrabold tracking-tight text-black">
            SmartLap Hub
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 h-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative flex items-center h-full text-sm font-medium transition-colors ${
                link.active ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-black'
              }`}
            >
              {link.name}
              {/* Blue active line indicator matching image_3137e3.png */}
              {link.active && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full" />
              )}
            </a>
          ))}
        </div>

        {/* Right: Action Utilities */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <SearchBar />
          
          <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors" aria-label="Favorites">
            <Heart className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
          </button>
          
          <ProfileDrop />

          {/* Mobile responsive trigger */}
          <MobileMenu navLinks={navLinks} />
        </div>

      </div>
    </nav>
  );
}