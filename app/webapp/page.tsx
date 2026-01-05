"use client";

import React, { useEffect, useState,  Suspense } from "react";
import { FaSpotify } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import Layout from "../components/Home/Layout/Layout";
import {
  buildSpotifyLoginUrl,
  exchangeCodeForToken,
} from "../lib/spotifyAuth";


interface SpotifyUser {
  id: string;
  display_name: string;
  images?: { url: string }[];
}

export default function WebApp() {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadUser(token: string) {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(await res.json());
  }


const exchangedRef = React.useRef(false);

useEffect(() => {
  if (exchangedRef.current) return;

  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) return;

  exchangedRef.current = true;

  exchangeCodeForToken(code)
    .then((data) => {
      localStorage.setItem("spotify_access_token", data.access_token);
      window.history.replaceState({}, "", "/webapp");
      loadUser(data.access_token);
    })
    .catch(console.error);
}, []);


  const login = async () => {
    setLoading(true);
    const url = await buildSpotifyLoginUrl();
    window.location.href = url;
  };

  if (user) return <Layout currentUserId={user.id} />;

  return (
   <div className="w-full h-screen">    
        <div
          className="flex justify-center items-center w-screen h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bgimg.jpg')" }}
        >
          <div className="w-full md:w-1/2 lg:w-1/3 border-2 flex flex-col rounded-xl border-none ">
            <div className="flex m-10 items-center justify-center ">
              <FiLink  size={70}/>
              <h2 className="text-black m-3 text-6xl font-bold">LyricLink</h2>
            </div>
            <button
              className="w-52 h-12 flex border-none items-center
            justify-center bg-black text-white rounded-full 
            mx-auto mb-10  disabled:opacity-50 gap-2"
              disabled={loading}
              onClick={login}
            >
              {loading ? "Redirecting..." : <p className="text-sm">SIGN IN WITH SPOTIFY</p>}
               <FaSpotify size={30}/>
            </button>
          </div>
        </div>
      
    </div>
  );
}
