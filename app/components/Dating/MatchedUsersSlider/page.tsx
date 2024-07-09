import React, { useState } from "react";
import { UserData } from "@/app/interface/types";

interface MatchedUsersSliderProps {
  matchedUsers: UserData[];
}

const MatchedUsersSlider: React.FC<MatchedUsersSliderProps> = ({ matchedUsers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? matchedUsers.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === matchedUsers.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex justify-center items-center">
      {matchedUsers.length > 0 && (
        <div className="relative w-full max-w-md flex items-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 bg-gray-800 text-white px-2 py-1 rounded-full z-10"
          >
            &lt;
          </button>
          <div className="flex justify-center items-center w-full">
            <div className="w-full h-full flex flex-col mx-4 mb-4 bg-white/10 shadow-lg rounded-lg overflow-hidden p-4 backdrop-filter backdrop-blur-sm">
              <div className="border-2 border-green-900 w-full h-3/4 flex justify-center items-center rounded-lg">
                {matchedUsers[currentIndex].images && matchedUsers[currentIndex].images.length > 0 && (
                  <img
                    className="w-32 h-32 rounded-full object-cover mt-4"
                    src={matchedUsers[currentIndex].images[0]?.url}
                    alt="Profile"
                  />
                )}
              </div>
              <div className="mt-6 w-1/2 h-10 bg-green-300 rounded-full flex justify-center items-center mx-auto">
                <h2 className="text-xl font-semibold mb-2 text-green-950">{matchedUsers[currentIndex].display_name}</h2>
              </div>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 bg-gray-800 text-white px-2 py-1 rounded-full z-10"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchedUsersSlider;

