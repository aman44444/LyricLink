"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "../components/Profiles/UserProfile/page";
import Layout from "../components/Home/Layout/Page";

const CLIENT_ID = "51ab00be48604869a24fa74a4be50ddb"; 
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash: string) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {} as { [key: string]: string });

  return paramsSplitUp;
};

const WebApp: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null); 

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(
        window.location.hash
      );

      window.localStorage.clear();
      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("tokenType", token_type);
      window.localStorage.setItem("expiresIn", expires_in);
      
      setIsLoggedIn(true);
      fetchUserData(access_token); 
      router.push("/webapp");
    }
  }, [router]);

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await response.json();
      setUserData(userData); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogin = () => {
    window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="container">
      <h1>Spotify Web App</h1>
      {isLoggedIn ? (
        <><UserProfile userData={userData} />
         <Layout/>
        
        </>
      ) : (
        <button onClick={handleLogin}>Login to Spotify</button>
      )}
    </div>
  );
};

export default WebApp;