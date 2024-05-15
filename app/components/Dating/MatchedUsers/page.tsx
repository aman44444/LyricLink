import React, { useEffect, useState } from "react";
import { firestore } from "@/app/utils/firebase.config";
import { collection, getDocs, DocumentData, doc, setDoc } from "firebase/firestore";
import { UserData } from "@/app/interface/types";
import { fetchUserData, fetchTopArtists, fetchTopTracks } from "@/app/utils/spotifyAPI";

// Function to calculate Jaccard similarity
const jaccardSimilarity = (set1: Set<string>, set2: Set<string>): number => {
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}

const MatchedUsers: React.FC = () => {
  // State variables
  const [users, setUsers] = useState<UserData[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<UserData[]>([]);
  const [matchingStarted, setMatchingStarted] = useState(false);
  const [noMatchFound, setNoMatchFound] = useState(false);

  useEffect(() => {
    // Function to fetch users from Firestore
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData: UserData[] = usersSnapshot.docs.map(doc => {
          const data = doc.data() as DocumentData;
          // Access display_name and images fields properly
          return {
            id: doc.id,
            display_name: data.userData.display_name , // Provide a default value if display_name is undefined
            images: data.userData.images , // Provide an empty array if images is undefined
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
  
    fetchUsers();
  }, []);

  // Function to start the matching process
  const handleStartMatching = async () => {
    try {
      // Send user data to Firebase
      const [userData, topArtists, topTracks] = await Promise.all([fetchUserData(), fetchTopArtists(), fetchTopTracks()]);
      const userRef = doc(collection(firestore, "users"), userData.id);
      await setDoc(userRef, {
        userData,
        topArtists,
        topTracks,
      });

      // Start the matching process
      setMatchingStarted(true);
    } catch (error) {
      console.error("Error starting matching process:", error);
    }
  };

  useEffect(() => {
    // Function to match users
   // Function to match users
const matchUsers = () => {
  if (!matchingStarted || users.length === 0) return;

  const threshold = 0.1; // Define your threshold here
  const matches: UserData[] = [];
  
  // Assuming you have the current user's ID available
  const currentUserID = "your_current_user_id_here"; 

  for (let i = 0; i < users.length; i++) {
    const user1 = users[i];
    const user1Artists = new Set(user1.topArtists.map((artist: any) => artist.name)); // Using name instead of id
    const user1Tracks = new Set(user1.topTracks.map((track: any) => track.name)); // Using name instead of id

    let matched = false;

    for (let j = 0; j < users.length; j++) {
      if (i === j) continue;

      const user2 = users[j];
      const user2Artists = new Set(user2.topArtists.map((artist: any) => artist.name)); // Using name instead of id
      const user2Tracks = new Set(user2.topTracks.map((track: any) => track.name)); // Using name instead of id

      // Check for any matching artist or track
      const artistSimilarity = jaccardSimilarity(user1Artists, user2Artists);
      const trackSimilarity = jaccardSimilarity(user1Tracks, user2Tracks);

      if (artistSimilarity >= threshold || trackSimilarity >= threshold) {
        matched = true;
        console.log("Match found:");
        console.log("User 1:", user1);
        console.log("User 2:", user2);
        break;
      }
    }

    if (matched && user1.id !== currentUserID) {
      matches.push(user1);
    }
  }

  if (matches.length === 0) {
    setNoMatchFound(true);
  } else {
    setNoMatchFound(false);
  }

  setMatchedUsers(matches);
};

  
    matchUsers();
  }, [matchingStarted, users]);



  return (
    <div>
      <h1>Profiles</h1>
      {!matchingStarted && !matchedUsers.length ? (
        <button onClick={handleStartMatching}>Start Matching</button>
      ) : matchedUsers.length ? (
        <div className="card-container">
  {matchedUsers.map(user => (
    <div key={user.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
      {user.images && user.images.length > 0 && (
        <img className="w-full h-64 object-cover" src={user.images[0]?.url} alt="Profile" />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-black">{user.display_name}</h2>
      </div>
    </div>
  ))}
</div>

      ) : noMatchFound ? (
        <p>No matches found</p>
      ) : null}
    </div>
  );
};

export default MatchedUsers;
