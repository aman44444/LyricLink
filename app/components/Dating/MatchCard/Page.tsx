import React from "react";
import { UserData } from "@/app/interface/types";

interface CardProps {
  user: UserData;
}

const MatchCard: React.FC<CardProps> = ({ user }) => {
  return (
    <div className="card">
      {user.images && <img src={user.images[0]?.url} alt="Profile" />}
      <div className="card-body">
        <h5 className="card-title">{user.display_name}</h5>
        
      </div>
    </div>
  );
};

export default MatchCard;