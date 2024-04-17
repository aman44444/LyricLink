import React, { useState } from "react";
import { fetchTopTracks, fetchTopArtists } from "@/app/utils/spotifyAPI";
import { firestore } from "@/app/utils/firebase.config";
import { doc, setDoc, collection } from "firebase/firestore";

interface SpotifyResponse {
    ok: boolean;
    json: () => Promise<any>;
  }

const SaveTopItems: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSaveTopItems = async () => {
      try {
        setIsLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
    
        const [topTracksResponse, topArtistsResponse] = await Promise.all([
            fetchTopTracks() as unknown as Promise<SpotifyResponse>, // Type assertion here
            fetchTopArtists() as unknown as Promise<SpotifyResponse>,
        ]);
    
        if (!topTracksResponse.ok || !topArtistsResponse.ok) {
          throw new Error("Failed to fetch top tracks or top artists");
        }
    
        const topTracksData = await topTracksResponse.json();
        const topArtistsData = await topArtistsResponse.json();
    
        const userId = topTracksData.id; // Assuming the user ID is in the topTracksData
    
        const userDocRef = doc(collection(firestore, "users"), userId);
        await setDoc(userDocRef, {
          topTracks: topTracksData.items,
          topArtists: topArtistsData.items,
        });
    
        console.log("Top items saved to Firestore:", {
          topTracks: topTracksData.items,
          topArtists: topArtistsData.items,
        });
      } catch (error) {
        console.error("Error saving top items to Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        <button onClick={handleSaveTopItems} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Top Items to Firestore"}
        </button>
      </div>
    );
  };
  

export default SaveTopItems;
