import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { MdPlaylistPlay } from "react-icons/md";

interface NavbarProps {
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onPlaylistClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick, onSettingsClick, onPlaylistClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className="flex justify-end">
      <div className="bg- text-white p-4">
        <div className="flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={handleProfileIconClick}
          >
            <CiSettings />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div>
          <div >
            <div >
              <div>
                <button
                 
                  onClick={handleCloseModal}
                >
                  <span >
                    ×
                  </span>
                </button>
              </div>
              <button
              
                onClick={onProfileClick}
              >
                Profile
              </button>
              <button
                
                onClick={onSettingsClick}
              >
                Setting
              </button>
              <button>Log Out</button>
              <div >
                <button
                 
                  type="button"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}
     <div className="bg- text-white p-4">
        <div className="flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={onPlaylistClick}
          >
            <MdPlaylistPlay />
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Navbar;

