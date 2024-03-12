"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios"
import firebase from 'firebase/compat/app';
import 'firebase/auth'; 
import 'firebase/firestore'; 


const CallbackPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const { code, state } = router.query;
    if (code && state) {
        exchangeCodeForToken(code as string);
      console.log('Authorization Code:', code);
      console.log('State:', state);

    } else {
      console.error('Invalid callback parameters');
    }
  }, [router.query]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      
      const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000/callback',
        client_id: '51ab00be48604869a24fa74a4be50ddb',
        client_secret: '6ec69986d2ea4b38b4dee59f44002257'
      });
  
      
      const { access_token, refresh_token } = response.data;
  
     
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
        await userRef.set({ accessToken: access_token }, { merge: true });
        console.log('Access token stored in Firestore');
      } else {
        console.error('No user authenticated');
      }
  
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  return <div>Handling Spotify authentication callback...</div>;
};

export default CallbackPage; 