"use client";

import React, { useEffect, useState, Suspense } from "react";
import { FaSpotify } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import Layout from "../components/Home/Layout/Layout";
import { buildSpotifyLoginUrl, exchangeCodeForToken } from "../lib/spotifyAuth";

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
    const token = localStorage.getItem("spotify_access_token");

    if (token && !user) {
      loadUser(token);
    }

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
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-10">
            <FiLink className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black">
              LyricLink
            </h2>
          </div>

          <button
            className="w-40 h-8 text-xs sm:w-52 sm:h-12 flex border-none items-center sm:text-sm
            justify-center bg-black text-white rounded-full 
            mx-auto mb-10  disabled:opacity-50 gap-2 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
            onClick={login}
          >
            {loading ? "Redirecting..." : "SIGN IN WITH SPOTIFY"}
            <FaSpotify className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
