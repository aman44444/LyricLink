import React from "react";

interface UserProfileProps {
  userData: any; 
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  return (
    <div>
      <h2>Welcome, {userData?.display_name}</h2>
      <p>Email: {userData?.email}</p>
      
    </div>
  );
};

export default UserProfile;