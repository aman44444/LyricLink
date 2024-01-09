"use client"
import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Implement your search logic here when using the API
    console.log(`Search for: ${query}`);
  };

  return (
    <div className="mt-1 flex items-center flex-wrap ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a track..."
        className="p-2 border border-gray-300 rounded-l  w-4/5 h-6"
      />
      <button onClick={handleSearch} className="bg-black-500 text-white p-2 rounded-r">
        <RiSearchLine />
      </button>
    </div>
  );
};

export default Search;
