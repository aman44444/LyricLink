import React, { useEffect, useState } from "react";
import { firestore } from "@/app/utils/firebase.config";
import { collection, getDocs, DocumentData, doc, setDoc } from "firebase/firestore";
import { UserData } from "@/app/interface/types";
import { fetchUserData, fetchTopArtists, fetchTopTracks } from "@/app/utils/spotifyAPI";
import MatchedUsersSlider from "../MatchedUsersSlider/page";

const jaccardSimilarity = (set1: Set<string>, set2: Set<string>): number => {
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
};

const MatchedUsers: React.FC<{ currentUserId: string }> = ({ currentUserId }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [matchedUsers, setMatchedUsers] = useState<UserData[]>([]);
    const [matchingStarted, setMatchingStarted] = useState(false);
    const [noMatchFound, setNoMatchFound] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(firestore, "users");
                const usersSnapshot = await getDocs(usersCollection);
                const usersData: UserData[] = usersSnapshot.docs.map(doc => {
                    const data = doc.data() as DocumentData;
                    return {
                        id: doc.id,
                        display_name: data.userData.display_name,
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
        fetchUsers();
    }, []);

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

    useEffect(() => {
        const matchUsers = () => {
            if (!matchingStarted || users.length === 0) return;
        
            const threshold = 0.1;
            const matches: UserData[] = [];
        
            for (let i = 0; i < users.length; i++) {
               if (users[i].id === currentUserId) continue;
                const user1 = users[i];
                const user1Artists = new Set(user1.topArtists.map((artist: any) => artist.name));
                const user1Tracks = new Set(user1.topTracks.map((track: any) => track.name));
        
                let matched = false;
        
                for (let j = 0; j < users.length; j++) {
                    if (i === j) continue;
        
                    const user2 = users[j];
                    const user2Artists = new Set(user2.topArtists.map((artist: any) => artist.name));
                    const user2Tracks = new Set(user2.topTracks.map((track: any) => track.name));
        
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
        
                if (matched && !matches.some(match => match.id === user1.id)) {
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
    }, [matchingStarted, users,currentUserId]);

    return (
        <div className="h-5/6 flex justify-center items-center">
            
            {!matchingStarted && !matchedUsers.length ? (
                <button onClick={handleStartMatching} className="text-lime-50 w-32 h-8 flex border-none items-center justify-center bg-green-900 rounded-full">Start Matching</button>
            ) : matchedUsers.length ? (
                <MatchedUsersSlider matchedUsers={matchedUsers} />
        
            ) : noMatchFound ? (
                <p>No matches found</p>
            ) : null}
        </div>
    );
};

export default MatchedUsers;
