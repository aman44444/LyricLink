"use client"
import React, { useEffect, useState , Suspense} from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Home/Layout/Layout";
import { FaSpotify } from "react-icons/fa";

const CLIENT_ID = "51ab00be48604869a24fa74a4be50ddb"; 
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-top-read",
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
    if (window.location.hash && !isLoggedIn) {
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
  }, [router, isLoggedIn]);

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
    <div className="w-full h-screen">
      {isLoggedIn ? (
        <>
        <Layout currentUserId={userData?.id}/>
        </>
      ) : (
        <div className="flex justify-center items-center w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('bgimg.jpg')" }}>
          <div className="w-full md:w-1/2 lg:w-1/3 border-2 flex flex-col rounded-xl border-none ">
          <div className="flex m-10 items-center justify-center ">
          <Suspense fallback={<div>Loading...</div>}>
          <LazyFaLink size={50} />
          </Suspense>
          <h2 className="text-black m-3 text-6xl font-bold">LyricLink</h2>
          </div>
           <button className="w-52 h-12 flex border-none items-center justify-center bg-black text-white rounded-full mx-auto mb-10" onClick={handleLogin}>SIGN IN WITH SPOTIFY <FaSpotify className="ml-2"/></button>
         </div>
         </div>
      )}
    </div>
  );
};

const LazyFaLink = React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaLink })));

export default WebApp;
