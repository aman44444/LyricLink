"use client"
import React, { useState } from "react";
import { searchSpotify } from "@/app/utils/spotifyAPI";
import MusicPlayer from "../../Player/MusicPlayer/page";


const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); 
  const [selectedTrack, setSelectedTrack] = useState<any | null>(null);


  const handleSearch = async () => {
    try {
      const results = await searchSpotify(searchQuery); 
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handlePlayTrack = (track: any) => {
    console.log("Selected track:", track);
    setSelectedTrack(track);
  };

  console.log("Selected track:", selectedTrack); 

  return (
  
    <div>
      <input
       className="rounded-xl w-1/2 mx-6 p-1"
        type="text"
        placeholder="Search for music..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="border-2 rounded-xl p-1" onClick={handleSearch}>Search</button>

     
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            {result.name} -{" "}
            {result.artists.map((artist: any) => artist.name).join(", ")}
            <button onClick={() => handlePlayTrack(result)}>Play</button>
          </li> 
        ))}
      </ul>

      {selectedTrack && (
        <div>
          <h3>Now Playing</h3>
          <p>{selectedTrack.name} - {selectedTrack.artists.map((artist: any) => artist.name).join(", ")}</p>
         
          <MusicPlayer track={selectedTrack}  />
        </div>
      )}
    </div>
    
  );
};

export default Search;

