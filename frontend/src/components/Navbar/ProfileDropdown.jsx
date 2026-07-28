import React, { useState } from "react";
import { User } from "lucide-react";
import { useShop } from "../../contexts/ShopContext";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const { token, logout, navigate } = useShop();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* ICON BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-blue-600 transition"
      >
        <User className="w-5 h-5" />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <>
          {/* overlay (click outside to close) */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
            
            {/* NOT LOGGED IN */}
            {!Boolean(token) ? (
              <div className="flex flex-col">
                <button
                  onClick={() => handleNavigate("/login")}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavigate("/login?mode=register")}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              /* LOGGED IN */
              <div className="flex flex-col">
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  My Profile
                </button>

                <button
                  onClick={() => handleNavigate("/my-orders")}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                 My Orders
                </button>

                <hr className="my-1" />

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
