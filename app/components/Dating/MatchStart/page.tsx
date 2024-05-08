import React, { useState } from "react";
import { fetchTopTracks, fetchTopArtists, fetchUserData } from "@/app/utils/spotifyAPI";
import { firestore } from "@/app/utils/firebase.config";
import { doc, setDoc, collection } from "firebase/firestore";
import MatchingAlgorithm from "../algorithm/page";

const StartMatchingButton: React.FC = () => {
  const [matchingStarted, setMatchingStarted] = useState(false);

  const handleStartMatching = async () => {
    try {
      
      const [userData, topArtists, topTracks] = await Promise.all([fetchUserData(), fetchTopArtists(), fetchTopTracks()]);
      const userRef = doc(collection(firestore, "users"), userData.id);
     
      await setDoc(userRef, {
        userData,
        topArtists,
        topTracks,
      });

      
      setMatchingStarted(true);
    } catch (error) {
      console.error("Error starting matching process:", error);
    }
  };

  return (
    <div>
      {!matchingStarted ? (
        <button onClick={handleStartMatching}>Start Matching</button>
      ) : (
        <MatchingAlgorithm />
      )}
    </div>
  );
};

export default StartMatchingButton;

