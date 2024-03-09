import React from 'react';
import Profile from '@/app/components/Profiles/Profile/page';
import ProfilePictureUpload from '@/app/components/Profiles/ProfilePicture/page';

const ProfilePage: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div>
      <h1>Profile Page</h1>
      <Profile user={user} />
      <ProfilePictureUpload user={user} />
    </div>
  );
};

export default ProfilePage;