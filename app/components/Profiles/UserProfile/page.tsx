import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/app/utils/spotifyAPI";
import { firestore } from "@/app/utils/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !userData) { // Check if userData is not already fetched
      fetchUserData()
        .then((data) => {
          setUserData(data);
          saveUserDataToFirestore(data); // Save user data to Firestore
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userData]); // Include userData in the dependency array

  const saveUserDataToFirestore = async (userData: any) => {
    try {
      if (userData && userData.id) {
        const userId = userData.id;
        const userDocRef = doc(firestore, "users", userId);
        await setDoc(userDocRef, userData);
        console.log("User data saved to Firestore");
      } else {
        console.warn("User data is empty or does not contain an ID. Skipping saving to Firebase. UserData:", userData);
      }
    } catch (error) {
      console.error("Error saving user data to Firebase:", error);
    }
  };

  return (
    <div>
      {userData ? (
        <>
          <h2>Welcome, {userData.display_name}</h2>
          {userData.images && (
            <img src={userData.images[0]?.url} alt="Profile" />
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;

