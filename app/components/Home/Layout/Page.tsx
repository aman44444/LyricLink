import React, { useState } from "react";
import HomePage from "../HomePage/HomePage";
import Search from "../Search/page";
import Navbar from "../Navigation/page";
import UserProfile from "../../Profiles/UserProfile/page";
import { GoHome } from "react-icons/go";
import { GoSearch } from "react-icons/go";

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] =  useState<"Home" | "Search" | "Profile" | "Settings">("Home");

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

  return (
    <div className="w-screen h-screen flex bg-black text-white p-3 ">
      <div className="h-screen w-1/5 pr-3">
        <div className="h-1/5 w-full bg-neutral-800 rounded-md " >
          <ul>
            <li onClick={handleHomeClick} className="flex">
              <GoHome/>
              Home
            </li>
            <li onClick={handleSearchClick} className="flex">
              <GoSearch/>
              Search
            </li>
          </ul>
        </div>
        <div className=" border-black h-4/5 w-full border-2 bg-neutral-800 rounded-md ">

        </div>
      </div>
        <div className="h-full w-4/5  bg-neutral-800 rounded-md overflow:hidden;">
        <Navbar
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
        />
          {currentPage === "Home" ? <HomePage /> : 
           currentPage === "Search" ? <Search/>:
         currentPage === "Profile" ? <UserProfile /> : null}
        {/* //  currentPage === "Settings" ? <Settings />  */}
     </div>
     
      
    </div>
  );
};

export default Layout;
