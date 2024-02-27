import React from 'react';

interface ProfileProps {
  name: string;
  age: number;
  bio: string;
}

const ViewProfile: React.FC<ProfileProps> = ({ name, age, bio }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Bio: {bio}</p>
    </div>
  );
};

export default ViewProfile;