import React, { useState } from "react";
import { fetchTopTracks, fetchTopArtists } from "@/app/utils/spotifyAPI";
import { firestore } from "@/app/utils/firebase.config";
import { doc, setDoc, collection } from "firebase/firestore";

interface SpotifyResponse {
    ok: boolean;
    json: () => Promise<any>;
  }

const StartMatchingButton: React.FC = () => {
  const [matchingStarted, setMatchingStarted] = useState(false);
  

  const handleStartMatching = async () => {
    try{
       
      setMatchingStarted(true);
    } catch (error) {
      console.error("Error starting matching process:", error);
    }
  };

  if (matchingStarted) {
    return null;
  }

  return (
    <button onClick={handleStartMatching}>
      Start Matching
    </button>
  );
};

export default StartMatchingButton;
