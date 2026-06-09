import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenu({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-gray-700 focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-40 py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-base font-medium transition-colors py-2 ${
                link.active ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-black'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}