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
        <div className="relative w-full max-w-4xl flex items-center">
          <button
            onClick={handlePrev}
            className="absolute right-40 mr-2 md:right-16 lg:right-40 bg-emerald-950 text-white px-4 py-2 rounded-full z-10"
          >
            &lt;
          </button>
          <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl h-5/6 flex flex-col mx-4 mb-4 bg-white/10 shadow-lg rounded-lg overflow-hidden p-4 backdrop-filter backdrop-blur-sm">
              <div className="border-2 border-green-900 w-full h-60 md:h-66 lg:h-112 flex justify-center items-center rounded-lg">
                {matchedUsers[currentIndex].images && matchedUsers[currentIndex].images.length > 0 && (
                  <img
                    className="w-32 h-32 md:w-28 md:h-28 lg:w-46 lg:h-46 rounded-full object-cover mt-4"
                    src={matchedUsers[currentIndex].images[0]?.url}
                    alt="Profile"
                  />
                )}
              </div>
              <div className="mt-6 w-3/4 md:w-full md:p-2 lg:w-3/4 h-12 md:h-10 bg-green-300 rounded-full flex justify-center items-center mx-auto p-2">
                <h2 className="text-xl md:text-xl lg:text-2xl font-semibold mb-2 text-green-950">{matchedUsers[currentIndex].display_name}</h2>
              </div>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="absolute left-40 ml-2 md:left-16 lg:left-40 bg-emerald-950 text-white px-4 py-2 rounded-full z-10"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchedUsersSlider;
