import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import axios from 'axios';

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
          const doc = await userRef.get();
          const accessToken = doc.data()?.accessToken;

         
          const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          setUserProfile(response.data);
        } else {
          console.error('No user authenticated');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      {userProfile ? (
        <div>
          <h2>User Profile</h2>
          <p>Display user profile information here</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;