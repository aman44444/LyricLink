import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";

interface NavbarProps {
  onProfileClick: () => void;
  onSettingsClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick, onSettingsClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="relative flex flex-col bg-white border-2 border-gray-300 rounded-md shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <button
                className="text-white focus:outline-none"
                onClick={onProfileClick}
              >
                Profile
              </button>
              <button
                className="text-white focus:outline-none ml-4"
                onClick={onSettingsClick}
              >
                Setting
              </button>
              <button>Log Out</button>
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black opacity-25"></div>
        </div>
      )}
    </>
  );
};

export default Navbar;

