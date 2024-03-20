import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/app/utils/spotifyAPI";



const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {

    fetchUserData()
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
   
    
}, []);

  return (
    <div>
      <h2>Welcome, {userData?.display_name}</h2>
      <p>Email: {userData?.email}</p>
      
    </div>
  );
};

export default UserProfile;