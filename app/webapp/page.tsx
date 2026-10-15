"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import Layout from "../components/Home/Layout/Layout";
import { buildSpotifyLoginUrl, exchangeCodeForToken } from "../lib/spotifyAuth";
import WaitlistModal from "../components/Waitlist/Waitlist";
import { useWaitlistModal } from "../components/Waitlist/useWaitlist";

interface SpotifyUser {
  id: string;
  display_name: string;
  images?: { url: string }[];
}

export default function WebApp() {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, closeModal } = useWaitlistModal();
  const exchangedRef = useRef(false);

  async function loadUser(token: string) {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(await res.json());
  }

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
    <>
      <WaitlistModal isOpen={isOpen} onClose={closeModal} />

      {/* bg color shows instantly; change it to match your image's main tone */}
      <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#1a1a2e]">
        <Image
          src="/images/bgimg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="relative z-10 flex w-full flex-col rounded-xl md:w-1/2 lg:w-1/3">
          <div className="my-5 flex items-center justify-center gap-2 sm:my-10 sm:gap-4">
            <FiLink className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
            <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-6xl">
              LyricLink
            </h2>
          </div>

          <button
            className="mx-auto mb-10 flex h-8 w-36 transform items-center justify-center gap-1 rounded-full border-none bg-black p-1 text-[10px] text-white transition duration-300 ease-in-out hover:scale-105 disabled:opacity-50 sm:h-12 sm:w-52 sm:gap-2 sm:p-0 sm:text-sm"
            disabled={loading}
            onClick={login}
          >
            {loading ? "Redirecting..." : "SIGN IN WITH SPOTIFY"}
            <FaSpotify className="h-4 w-4 sm:h-7 sm:w-7 md:h-9 md:w-9" />
          </button>
        </div>
      </div>
    </>
  );
}
