"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Home/Layout/Layout";
import { FaSpotify } from "react-icons/fa";

const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
// const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp";
const REDIRECT_URL_AFTER_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://lyriclink.vercel.app/webapp" // Production URL
    : "http://localhost:3000/webapp"; // Development URL

const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const parseSpotifyHash = (hash: string) => {
  return hash
    .substring(1)
    .split("&")
    .reduce((acc, pair) => {
      const [key, value] = pair.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
};

const WebApp: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async (accessToken: string) => {
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    if (window.location.hash.startsWith("#access_token")) {
      const { access_token, token_type, expires_in } = parseSpotifyHash(
        window.location.hash
      );

      if (access_token) {
        window.location.hash = "";
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);

        setIsLoggedIn(true);
        fetchUserData(access_token);
      }
      return;
    } else {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        setIsLoggedIn(true);
        fetchUserData(storedToken);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

    window.location.href =
      `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientId}` +
      `&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}` +
      `&scope=${SCOPES_URL_PARAM}` +
      `&response_type=token&show_dialog=true`;
  };

  return (
    <div className="w-full h-screen">
      {isLoggedIn ? (
        <>
          <Layout currentUserId={userData?.id} />
        </>
      ) : (
        <div
          className="flex justify-center items-center w-screen h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bgimg.jpg')" }}
        >
          <div className="w-full md:w-1/2 lg:w-1/3 border-2 flex flex-col rounded-xl border-none ">
            <div className="flex m-10 items-center justify-center ">
              <Suspense fallback={<div>Loading...</div>}>
                <LazyFaLink size={50} />
              </Suspense>
              <h2 className="text-black m-3 text-6xl font-bold">LyricLink</h2>
            </div>
            <button
              className="w-52 h-12 flex border-none items-center
            justify-center bg-black text-white rounded-full 
            mx-auto mb-10  disabled:opacity-50 gap-2"
              disabled={isLoading}
              onClick={handleLogin}
            >
              {isLoading ? "Redirecting..." : <p className="text-sm">SIGN IN WITH SPOTIFY</p>}
              {!isLoading && <FaSpotify size={30}/>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const LazyFaLink = React.lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaLink }))
);


export default WebApp;
