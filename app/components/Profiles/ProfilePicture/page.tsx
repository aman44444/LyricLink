import React, { useState, ChangeEvent } from "react";

interface Props {
  user: { profilePicture: string };
}

const ProfilePictureUpload: React.FC<Props> = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    
  };

  return (
    <div>
      <h2>Profile Picture</h2>
      <img src={profilePicture} alt="Profile" />
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
};

export default ProfilePictureUpload;