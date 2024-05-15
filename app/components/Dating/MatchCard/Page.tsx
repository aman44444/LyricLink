import React from "react";
import Image from 'next/image'; // Import Image from next/image
import { UserData } from "@/app/interface/types";

interface CardProps {
  user: UserData;
}

const MatchCard: React.FC<CardProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {user.images && user.images.length > 0 ? (
        <img className="w-full h-64 object-cover" src={user.images[0]?.url} alt="Profile" />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">No Image</div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-black">{user.display_name || 'No Name'}</h2>
      </div>
    </div>
  );
};



export default MatchCard;
