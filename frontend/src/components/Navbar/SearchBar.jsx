import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative flex items-center">
      <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors" aria-label="Search">
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}