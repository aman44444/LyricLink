import { useEffect, useState } from "react";
import { firestore } from "@/app/utils/firebase.config";
import { collection, getDocs, DocumentData, doc, getDoc } from "@firebase/firestore";
import { UserData } from "@/app/interface/types";

const MatchingAlgorithm: React.FC = () => {
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [matchedUsers, setMatchedUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
       
        const currentUserDoc = await getUserDocument();
        const currentUserData = currentUserDoc.data() as UserData;
        setCurrentUserData(currentUserData);
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    const fetchOtherUsers = async () => {
      try {
        if (!currentUserData) return; 
      
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const otherUsersData: UserData[] = usersSnapshot.docs
          .filter((doc) => doc.id !== currentUserData?.id) 
          .map((doc) => {
            const data = doc.data() as DocumentData;
            return {
              id: doc.id,
              topArtists: data.topArtists,
              topTracks: data.topTracks,
            } as UserData;
          });
        

        const matchedUsers = matchUsers(currentUserData, otherUsersData);
        setMatchedUsers(matchedUsers);
      } catch (error) {
        console.error("Error fetching other users data:", error);
      }
    };

    fetchCurrentUser();
    fetchOtherUsers();
  }, [currentUserData]);

  const matchUsers = (currentUser: UserData, otherUsers: UserData[]): UserData[] => {
    
    const matchedUsers = otherUsers.filter((user) => {
      const sharedArtists = currentUser.topArtists.filter((artist) =>
        user.topArtists.some((otherArtist) => otherArtist.name === artist.name)
      );
      return sharedArtists.length > 0; 
    });

    return matchedUsers;
  };

  const getUserDocument = async () => {
   
    const userId = "current_user_id"; 
    const userDocRef = doc(firestore, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot;
  };

  return (
    <div>
     
      {matchedUsers.map((user) => (
        <div key={user.id}>
          <p>Matched user ID: {user.id}</p>
          
        </div>
      ))}
    </div>
  );
};

export default MatchingAlgorithm;


