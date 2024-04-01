import React from "react";
import { UserData } from "@/app/interface/types";

interface CardProps {
  user: UserData;
}

const MatchCard: React.FC<CardProps> = ({ user }) => {
  return (
    // <div className="card">
    //   {user.images && <img src={user.images[0]?.url} alt="Profile" />}
    //   <div className="card-body">
    //     <h5 className="card-title">{user.display_name}</h5>
        
    //   </div>
    // </div>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    { user.images && <img className="w-full h-64 object-cover" src={user.images[0]?.url} alt="Profile"  />}
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">{user.display_name}</h2>
      
      
    </div>
  </div>
  );
};

export default MatchCard;