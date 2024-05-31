import React, { useState } from "react";
import HomePage from "../HomePage/HomePage";
import UserProfile from "../../Profiles/UserProfile/page";
import UserPlaylists from "../../Player/Playlist/page";
import MatchedUsers from "../../Dating/MatchedUsers/page";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa6";
import { RiPlayList2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import Settings from "../Setting/page";

interface LayoutProps {
  currentUserId: string; 
} 

const Layout: React.FC<LayoutProps> = ({ currentUserId }) => {
  const [currentPage, setCurrentPage] =  useState<"Home"  | "Profile" | "Settings" | "Playlist">("Home");

  const handleHomeClick = () => {
    setCurrentPage("Home");
  };

  const handleProfileClick = () => {
    setCurrentPage("Profile"); 
    
  };

  const handleSettingsClick = () => {
    setCurrentPage("Settings"); 
   
  };

  const handlePlaylistClick = () => {
    setCurrentPage("Playlist"); 
   
  };

  return (
    <div className="w-full h-full flex bg-black text-white p-2 ">
      <div className="h-full w-1/6 pr-2">
        <div className="h-2/6 w-full border-black bg-neutral-800 rounded-md border-2 flex flex-col justify-center pl-4" >
          <ul>
            <li onClick={handleHomeClick} className="flex m-3 cursor-pointer">
              <GoHomeFill size={30}/>
              <p className="ml-2 text-xl">Home</p>
            </li>
            <li onClick={handleProfileClick} className="flex m-3 cursor-pointer">
             <FaUser size={30}/>
              <p className="ml-2 text-xl">Profile</p>
            </li>
            <li onClick={handlePlaylistClick} className="flex m-3 cursor-pointer">
              <RiPlayList2Fill size={30}/>
              <p className="ml-2 text-xl">Playlist</p>
            </li>
            <li onClick={handleSettingsClick} className="flex m-3 cursor-pointer">
              <IoSettingsSharp size={30}/>
              <p className="ml-2 text-xl">Settings</p>
            </li>
          </ul>
         
        </div>
        <div className=" border-black h-4/6 w-full border-2 bg-neutral-800 rounded-md " style={{ backgroundImage: "url('match3.jpg')" ,backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
       
          <MatchedUsers currentUserId={currentUserId} />
       
        </div>
      </div>
        <div className="h-full w-5/6 mb-3 bg-neutral-800 pt-5 rounded-md overflow:hidden;">
       
          {currentPage === "Home" ? <HomePage /> :
         currentPage === "Profile" ? <UserProfile /> : 
         currentPage === "Playlist" ? <UserPlaylists/>:
         currentPage === "Settings" ? <Settings/>:null}
        
     </div>
     
      
    </div>
  );
};

export default Layout;







