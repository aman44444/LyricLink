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
import Settings from "../Setting/Setting";

interface LayoutProps {
  currentUserId: string; 
} 

const Layout: React.FC<LayoutProps> = ({ currentUserId }) => {
  const [currentPage, setCurrentPage] =  useState<"Home"  | "Profile" | "Settings" | "Playlist">("Home");

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

  return (
    <div className="w-full snap-y snap-mandatory flex flex-col-reverse bg-neutral-800 text-white sm:h-screen sm:flex sm:flex-row sm:p-2">
      <div className="w-full h-screen snap-start sm:h-full sm:w-1/6 sm:pr-2">
        <div className="fixed bottom-0 w-full bg-black rounded-full sm:h-2/6 sm:w-full sm:border-neutral-800 sm:bg-black sm:rounded-md sm:border-2 sm:flex sm:flex-col sm:justify-center sm:pl-4 sm:static" >
          <ul className="flex justify-between sm:inline-block">
            <li onClick={handleHomeClick} className="flex lg:m-3 cursor-pointer">
              <GoHomeFill size={30}/>
              <p className="ml-2 text-xl hidden sm:inline-block">Home</p>
            </li>
            <li onClick={handleProfileClick} className="flex lg:m-3 cursor-pointer">
             <FaUser size={30}/>
              <p className="ml-2 text-xl hidden sm:inline-block">Profile</p>
            </li>
            <li onClick={handlePlaylistClick} className="flex lg:m-3 cursor-pointer">
              <RiPlayList2Fill size={30}/>
              <p className="ml-2 text-xl hidden sm:inline-block">Playlist</p>
            </li>
            <li onClick={handleSettingsClick} className="flex lg:m-3 cursor-pointer">
              <IoSettingsSharp size={30}/>
              <p className="ml-2 text-xl hidden sm:inline-block">Settings</p>
            </li>
          </ul>
         
        </div>
        <div className="border-neutral-800 h-screen w-full border-2 bg-black rounded-md sm:h-4/6" style={{ backgroundImage: "url('match3.jpg')" ,backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
       
          <MatchedUsers currentUserId={currentUserId} />
       
        </div>
      </div>
        <div className="h-screen w-full overflow:hidden bg-black pt-5 rounded-md  snap-start sm:h-full sm:w-5/6">
       
          {currentPage === "Home" ? <HomePage /> :
         currentPage === "Profile" ? <UserProfile /> : 
         currentPage === "Playlist" ? <UserPlaylists/>:
         currentPage === "Settings" ? <Settings/>:null}
        
     </div>
     
      
    </div>
  );
};

export default Layout;







