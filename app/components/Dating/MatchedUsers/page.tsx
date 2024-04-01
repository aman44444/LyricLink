import React, { useEffect, useState } from "react";
import { firestore } from "@/app/utils/firebase.config";
import { collection, getDocs, DocumentData } from "@firebase/firestore";
import MatchCard from "../MatchCard/Page";
import { UserData } from "@/app/interface/types";

const MatchedUsers: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData: UserData[] = usersSnapshot.docs.map(doc => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            display_name: data.display_name,
            images: data.images,
          };
        });
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1> Profiles</h1>
      <div className="card-container">
        {users.map(user => (
          <MatchCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MatchedUsers;