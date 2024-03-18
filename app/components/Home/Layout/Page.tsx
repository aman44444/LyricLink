import React, { useState } from 'react';

import Search from '../Search/page';
import Footer from '../Footer/Footer';

const Layout = () => {
  const [currentPage, setCurrentPage] = useState('home'); 

  return (
    <div className="flex h-screen">
      <div className="w-30">
        
        <NavigationBar setCurrentPage={setCurrentPage} />
      </div>
      <div className="w-70 bg-gray-100 p-4 overflow-y-auto">
        {currentPage === 'home' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Home</h1>
            
            <Search/>
            <FeaturedPlaylists />
          </div>
        )}
        {currentPage === 'search' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Search</h1>
          
          </div>
        )}

        {currentPage === 'recentlyPlayed' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Recently Played Tracks</h1>
            {/* comp */}
          </div>
        )}
        {currentPage === 'recommendedArtists' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Recommended Artists</h1>
            {/* compoenent */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
