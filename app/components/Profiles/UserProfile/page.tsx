// import React, { useEffect, useState } from "react";
// import { fetchUserData } from "@/app/utils/spotifyAPI";



// const UserProfile: React.FC = () => {
//   const [userData, setUserData] = useState<any>(null);
//   useEffect(() => {

//     fetchUserData()
//         .then(data => setUserData(data))
//         .catch(error => console.error('Error fetching user data:', error));
   
    
// }, []);

//   return (
//     <div>
//       <h2>Welcome, {userData?.display_name}</h2>
//       <p>Email: {userData?.email}</p>
      
//     </div>
//   );
// };

// export default UserProfile;
// UserProfile.tsx
import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/app/utils/spotifyAPI";
import { firestore } from "@/app/utils/firebase.config";

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
      const usersRef = firestore.collection('users');
      await usersRef.add(userData);
      console.log('User data saved to Firebase:', userData);
    } catch (error) {
      console.error('Error saving user data to Firebase:', error);
    }
  };

  return (
    <div>
      {userData ? (
        <>
          <h2>Welcome, {userData.display_name}</h2>
          <p>Email: {userData.email}</p>
          {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" />}
          {userData.age && <p>Age: {userData.age}</p>}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;