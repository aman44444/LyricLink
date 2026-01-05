"use client"
import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/app/utils/spotifyAPI";
import { firestore } from "@/app/utils/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("spotify_access_token");
    if (accessToken && !userData) { 
      fetchUserData()
        .then((data) => {
          setUserData(data);
          saveUserDataToFirestore(data); 
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userData]);

  const saveUserDataToFirestore = async (userData: any) => {
    try {
      if (userData && userData.id) {
        const userId = userData.id;
        const userDocRef = doc(firestore, "users", userId);
        await setDoc(userDocRef, userData,{merge: true});
        console.log("User data saved to Firestore");
      } else {
        console.warn("User data is empty or does not contain an ID. Skipping saving to Firebase. UserData:", userData);
      }
    } catch (error) {
      console.error("Error saving user data to Firebase:", error);
    }
  };

  return (
    <div className="p-7 h-full w-full flex justify-center md:block" >
      {userData ? (
        <>
        <div className="md:h-full h-4/5 md:w-2/4 w-full p-5 border border-zinc-600 bg-black rounded-xl">
         <div className=" w-full flex p-4 items-center ">
            {userData.images && (
            <img src={userData.images[0]?.url} alt="Profile" className="w-36 h-36 rounded-lg"  />
          )}
      
            <h5 className="text-2xl ml-3">{userData.display_name}</h5>
         </div>
         <hr className=" w-full mt-6 my-4 border-t border-zinc-600"></hr>
         <div className="p-4 ">
           <h4 className="text-lg ">Add Favorite Songs</h4>
         </div>
        </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
     
    </div>
  );
};

export default UserProfile;

