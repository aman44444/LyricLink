import React, { useState } from "react";
import HomePage from "../HomePage/HomePage";
import Search from "../Search/page";
import Navbar from "../Navigation/page";
import UserProfile from "../../Profiles/UserProfile/page";

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
    <div className="flex w-screen">
      
        <div className="h-screen w-1/5">
          <button onClick={handleHomeClick}>Home</button>
          <button onClick={handleSearchClick}>Search</button>
        </div>
        <div className="h- w-4/5 ">
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
