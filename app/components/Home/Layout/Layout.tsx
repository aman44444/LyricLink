"use client";
import React, { useState } from "react";
import HomePage from "../HomePage/HomePage";
import UserProfile from "../../Profiles/UserProfile/UserProfile";
import UserPlaylists from "../../Player/Playlist/Playlist";
import MatchedUsers from "../../Dating/MatchedUsers/MatchedUsers";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa6";
import { RiPlayList2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import Settings from "../Setting/Setting";

interface LayoutProps {
  currentUserId: string;
}

const Layout: React.FC<LayoutProps> = ({ currentUserId }) => {
  const [currentPage, setCurrentPage] = useState<
    "Home" | "Profile" | "Settings" | "Playlist" | "MatchedUsers"
  >("Home");

  return (
    <div className="w-full overflow-hidden flex flex-col-reverse bg-neutral-800 text-white sm:h-screen sm:flex sm:flex-row sm:p-2">
      <div className="w-full overflow-hidden sm:h-full sm:w-1/6 sm:pr-2">
        <div className="p-3 fixed bottom-0 w-full bg-black rounded-full sm:static sm:bg-black sm:border-2 sm:border-neutral-800 sm:h-2/6 sm:rounded-md sm:flex sm:flex-col sm:justify-center sm:pl-4">
          <ul className="flex justify-between sm:flex sm:flex-col sm:gap-3">
            <li
              onClick={() => setCurrentPage("Home")}
              className={`border border-transparent hover:border-zinc-600 rounded-2xl p-2 cursor-pointer flex items-center
              ${currentPage === "Home" ? "border-zinc-500" : ""}`}
            >
              <GoHomeFill size={24} />
              <p className="ml-2 hidden sm:inline text-base">Home</p>
            </li>

            <li
              onClick={() => setCurrentPage("Profile")}
              className={`border border-transparent hover:border-zinc-600 rounded-2xl p-2 cursor-pointer flex items-center
              ${currentPage === "Profile" ? "border-zinc-500" : ""}`}
            >
              <FaUser size={24} />
              <p className="ml-2 hidden sm:inline text-base">Profile</p>
            </li>
            <li
              onClick={() => setCurrentPage("Playlist")}
              className={`border border-transparent hover:border-zinc-600 rounded-2xl p-2 cursor-pointer flex items-center
              ${currentPage === "Playlist" ? "border-zinc-500" : ""}`}
            >
              <RiPlayList2Fill size={24} />
              <p className="ml-2 hidden sm:inline text-base">Playlist</p>
            </li>
            <li
              onClick={() => setCurrentPage("MatchedUsers")}
              className={`border border-transparent hover:border-zinc-600 rounded-2xl p-2 cursor-pointer flex items-center sm:hidden
              ${currentPage === "MatchedUsers" ? "border-zinc-500" : ""}`}
            >
              <FaHeart size={24} />
              <p className="ml-2 hidden sm:inline text-base">Match</p>
            </li>
            <li
              onClick={() => setCurrentPage("Settings")}
              className={`border border-transparent hover:border-zinc-600 rounded-2xl p-2 cursor-pointer flex items-center
              ${currentPage === "Settings" ? "border-zinc-500" : ""}`}
            >
              <IoSettingsSharp size={24} />
              <p className="ml-2 hidden sm:inline text-base">Settings</p>
            </li>
          </ul>
        </div>
        <div className="hidden sm:block border-neutral-800 h-screen w-full border-2 bg-black rounded-md sm:h-4/6">
          <MatchedUsers currentUserId={currentUserId} />
        </div>
      </div>
      <div className="h-screen w-full overflow-hidden bg-black rounded-md sm:h-full sm:w-5/6">
        {currentPage === "Home" && <HomePage />}
        {currentPage === "Profile" && <UserProfile />}
        {currentPage === "Playlist" && <UserPlaylists />}
        {currentPage === "MatchedUsers" && (
          <MatchedUsers currentUserId={currentUserId} />
        )}
        {currentPage === "Settings" && <Settings />}
      </div>
    </div>
  );
};

export default Layout;
