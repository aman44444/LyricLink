"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "@/app/utils/firebase.config";
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  setDoc,
} from "firebase/firestore";
import { UserData } from "@/app/interface/types";
import {
  fetchUserData,
  fetchTopArtists,
  fetchTopTracks,
} from "@/app/utils/spotifyAPI";
import MatchedUsersSlider from "../MatchedUsersSlider/MatchedUsersSlider";

const jaccardSimilarity = (set1: Set<string>, set2: Set<string>): number => {
  if (set1.size === 0 && set2.size === 0) return 0;
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
};

const MatchedUsers: React.FC<{ currentUserId: string }> = ({
  currentUserId,
}) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<UserData[]>([]);
  const [matchingStarted, setMatchingStarted] = useState(false);
  const [noMatchFound, setNoMatchFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData: UserData[] = usersSnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          display_name: data.userData.display_name || "Unknown",
          images: data.userData.images,
          topArtists: data.topArtists,
          topTracks: data.topTracks,
        };
      });
      console.log("Fetched users data:", usersData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStartMatching = async () => {
    setIsLoading(true);
    try {
      const [userData, topArtists, topTracks] = await Promise.all([
        fetchUserData(),
        fetchTopArtists(),
        fetchTopTracks(),
      ]);
      const userRef = doc(collection(firestore, "users"), userData.id);
      await setDoc(userRef, {
        userData,
        topArtists,
        topTracks,
      });
      setMatchingStarted(true);
      await fetchUsers();
    } catch (error) {
      console.error("Error starting matching process:", error);
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
  if (!matchingStarted) return;

  const currentUser = users.find(u => u.id === currentUserId);
  if (!currentUser) return;


  const myArtists = new Set(currentUser.topArtists.map(a => a.name));
  const myTracks = new Set(currentUser.topTracks.map(t => t.name));

  const matches: UserData[] = [];
    users.forEach((user) => {
      if (user.id === currentUserId) return;

      const theirArtists = new Set(user.topArtists.map((a) => a.name));
      const theirTracks = new Set(user.topTracks.map((t) => t.name));

      const artistSim = jaccardSimilarity(myArtists, theirArtists);
      const trackSim = jaccardSimilarity(myTracks, theirTracks);

      if (artistSim >= 0.1 || trackSim >= 0.1) {
        matches.push(user);
      }
    });

    
    console.log("Matches calculated:", matches);
  
  setMatchedUsers(matches);
  setNoMatchFound(matches.length === 0);
}, [matchingStarted, users, currentUserId]);


  return (
    <div
      className=" relative h-screen flex justify-center items-center w-full border-2 border-neutral-800  bg-black rounded-md sm:h-full"
      style={{
        backgroundImage: "url('/images/datingBg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
        {isLoading ? (
          <p>Loading...</p>
        ) : !matchingStarted && matchedUsers.length === 0 ? (
          
            <button
              onClick={handleStartMatching}
              className="text-lime-50 w-32 h-8 flex border-none items-center 
                       justify-center bg-green-900 rounded-full
                       hover:bg-emerald-950 hover:border
                      hover:border-zinc-700"
            >
              Find Frineds
            </button>
        
        ) : matchedUsers.length ? (
          <MatchedUsersSlider matchedUsers={matchedUsers} />
        ) : noMatchFound ? (
          <p className="text-white text-center text-sm mt-4">No matches found</p>
        ) : null}
      </div>
    
  );
};

export default MatchedUsers;

