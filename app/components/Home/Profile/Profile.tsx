import React from 'react';

interface TinderProfileCardProps {
  name: string;
  age: number;
  imageUrl: string;
}

const ProfileCard: React.FC<TinderProfileCardProps> = ({
  name,
  age,
  imageUrl,
}) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-md w-4/5 h-4/5">
      <img
        src={imageUrl}
        alt={`${name}'s profile`}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <div>
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-500">{age} years old</p>
      </div>
    </div>
  );
};

export default ProfileCard;