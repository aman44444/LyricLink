import React, { useState } from "react";
import HomePage from "../HomePage/HomePage";
import Navbar from "../Navigation/page";
import UserProfile from "../../Profiles/UserProfile/page";
import { GoHome } from "react-icons/go";
import UserPlaylists from "../../Player/Playlist/page";
import MatchedUsers from "../../Dating/MatchedUsers/page";

interface LayoutProps {
  onLogout: () => void;
}


const Layout: React.FC = () => {
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
        <div className="h-2/6 w-full bg-neutral-800 rounded-md flex flex-col justify-center" >
          <ul>
            <li onClick={handleHomeClick} className="flex m-3">
              <GoHome size={30}/>
              <p className="ml-2 text-xl">Home</p>
            </li>
            <li className="flex m-3 ">
            <Navbar
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onPlaylistClick={handlePlaylistClick}
        />
            </li>
          </ul>
         
        </div>
        <div className=" border-black h-4/6 w-full border-2 bg-neutral-800 rounded-md  ">
           <MatchedUsers/>
        </div>
      </div>
        <div className="h-full w-5/6 mb-3 bg-neutral-800 rounded-md overflow:hidden;">
       
          {currentPage === "Home" ? <HomePage /> :
         currentPage === "Profile" ? <UserProfile /> : 
         currentPage === "Playlist" ? <UserPlaylists/>:null}
        {/* //  currentPage === "Settings" ? <Settings />  */}
     </div>
     
      
    </div>
  );
};

export default Layout;
