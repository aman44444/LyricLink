import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/app/utils/spotifyAPI";
import { firestore } from "@/app/utils/firebase.config";
import { collection, doc, setDoc } from "@firebase/firestore";

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetchUserData()
      .then(data => {
        setUserData(data);
        saveUserDataToFirebase(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const saveUserDataToFirebase = async (userData: any) => {
    try {
      if (userData ) {
        const usersCollectionRef = collection(firestore, 'users');
        const userDocRef = doc(usersCollectionRef, 'userId'); 
        await setDoc(userDocRef, userData);
        
      } else {
        console.warn('User data does not contain a valid email. Skipping saving to Firebase.');
      }
    } catch (error) {
      console.error('Error saving user data to Firebase:', error);
    }
  };

  return (
    <div>
      {userData ? (
        <>
          <h2>Welcome, {userData.display_name}</h2>
          {/* <p> {userData.email}</p> */}
          {userData.images && <img src={userData.images[0]?.url} alt="Profile" />}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;