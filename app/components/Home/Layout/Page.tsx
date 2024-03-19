import React, { useState } from "react";
import HomePage from "../HomePage/HomePage";
import Search from "../Search/page";
import Navbar from "../Navigation/page";

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"Home" | "Search">("Home");

  const handleHomeClick = () => {
    setCurrentPage("Home");
  };

  const handleSearchClick = () => {
    setCurrentPage("Search");
  };

  return (
    <div className="flex w-screen">
      
        <div className="h-screen w-1/5">
          <button onClick={handleHomeClick}>Home</button>
          <button onClick={handleSearchClick}>Search</button>
        </div>
        <div className="h- w-4/5 ">
          <Navbar/>
          {currentPage === "Home" ? <HomePage /> : <Search/>}
        </div>
     
      
    </div>
  );
};

export default Layout;
