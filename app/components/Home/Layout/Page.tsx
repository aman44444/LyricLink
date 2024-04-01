import React, { useState } from "react";
import HomePage from "../HomePage/HomePage";
import Search from "../Search/page";
import Navbar from "../Navigation/page";
import UserProfile from "../../Profiles/UserProfile/page";
import { GoHome } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import UserPlaylists from "../../Player/Playlist/page";
import MatchedUsers from "../../Dating/MatchedUsers/page";

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] =  useState<"Home" | "Search" | "Profile" | "Settings" | "Playlist">("Home");

  const handleHomeClick = () => {
    setCurrentPage("Home");
  };

  const handleSearchClick = () => {
    setCurrentPage("Search");
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
    <div className="w-screen h-screen flex bg-black text-white p-2 ">
      <div className="h-screen w-1/5 pr-2">
        <div className="h-1/5 w-full bg-neutral-800 rounded-md flex flex-col justify-center " >
          <ul>
            <li onClick={handleHomeClick} className="flex m-3">
              <GoHome size={30}/>
              <p className="ml-2 text-xl">Home</p>
            </li>
            <li onClick={handleSearchClick} className="flex m-3 ">
              <GoSearch size={30}/>
            <p className="ml-2 text-xl">Search</p>
            </li>
          </ul>
        </div>
        <div className=" border-black h-3/4 w-full border-2 bg-neutral-800 rounded-md mt-2 ">
           <MatchedUsers/>
        </div>
      </div>
        <div className="h-full w-4/5  bg-neutral-800 rounded-md overflow:hidden;">
        <Navbar
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onPlaylistClick={handlePlaylistClick}
        />
          {currentPage === "Home" ? <HomePage /> : 
           currentPage === "Search" ? <Search/>:
         currentPage === "Profile" ? <UserProfile /> : 
         currentPage === "Playlist" ? <UserPlaylists/>:null}
        {/* //  currentPage === "Settings" ? <Settings />  */}
     </div>
     
      
    </div>
  );
};

export default Layout;
