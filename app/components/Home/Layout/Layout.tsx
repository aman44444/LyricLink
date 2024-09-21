"use client"
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
  const [currentPage, setCurrentPage] =  useState<"Home"  | "Profile" | "Settings" | "Playlist" | "MatchedUsers">("Home");

  const handleHomeClick = () => {
    setCurrentPage("Home");
  };

  const handleProfileClick = () => {
    setCurrentPage("Profile")
    
  };

  const handleSettingsClick = () => {
    setCurrentPage("Settings"); 
   
  };

  const handlePlaylistClick = () => {
    setCurrentPage("Playlist"); 
   
  };

  const handleMatchClick = () => setCurrentPage("MatchedUsers"); 

  return (
    <div className="w-full overflow-hidden flex flex-col-reverse bg-neutral-800 text-white sm:h-screen sm:flex sm:flex-row sm:p-2">
      <div className="w-full overflow-hidden  sm:h-full sm:w-1/6 sm:pr-2">
        <div className="p-3 sm:pr-2 fixed bottom-0 w-full bg-black rounded-full sm:h-2/6 sm:w-full sm:border-neutral-800 sm:bg-black sm:rounded-md sm:border-2 sm:flex sm:flex-col sm:justify-center sm:pl-4 sm:static" >
          <ul className="flex justify-between sm:inline-block ">
            <li onClick={handleHomeClick} className="flex lg:m-3 cursor-pointer">
              <GoHomeFill size={30}/>
              <p className="ml-2 text-lg hidden sm:inline-block">Home</p>
            </li>
            <li onClick={handleProfileClick} className="flex lg:m-3 cursor-pointer">
             <FaUser size={30}/>
              <p className="ml-2 text-lg hidden sm:inline-block">Profile</p>
            </li>
            <li onClick={handlePlaylistClick} className="flex lg:m-3 cursor-pointer">
              <RiPlayList2Fill size={30}/>
              <p className="ml-2 text-lg hidden sm:inline-block">Playlist</p>
            </li>
            <li onClick={handleMatchClick} className="lg:m-3 cursor-pointer sm:hidden block">
              <FaHeart size={30} />
              <p className="ml-2 text-lg hidden sm:inline-block">Match</p>
            </li>
            <li onClick={handleSettingsClick} className="flex lg:m-3 cursor-pointer">
              <IoSettingsSharp size={30}/>
              <p className="ml-2 text-lg hidden sm:inline-block">Settings</p>
            </li>
          </ul>
         
        </div>
        <div className=" border-neutral-800 h-screen  w-full border-2 bg-black rounded-md sm:h-4/6 hidden sm:block" >
          <MatchedUsers currentUserId={currentUserId} />
        </div>
      </div>
      <div className="h-screen w-full overflow-hidden bg-black rounded-md  snap-start sm:h-full sm:w-5/6">
      {currentPage === "Home" && <HomePage />}
        {currentPage === "Profile" && <UserProfile />}
        {currentPage === "Playlist" && <UserPlaylists />}
        {currentPage === "MatchedUsers" && <MatchedUsers currentUserId={currentUserId} />}
        {currentPage === "Settings" && <Settings />}
      </div> 
    </div>
  );
};

export default Layout;