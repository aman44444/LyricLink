"use client"
import React, { useState } from "react";
import { searchSpotify } from "@/app/utils/spotifyAPI";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); 

  const handleSearch = async () => {
    try {
      const results = await searchSpotify(searchQuery); 
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for music..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

     
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default Search;

