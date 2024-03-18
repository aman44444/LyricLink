import React from "react";
interface Song {
  imageUrl: string;
  name: string;
  artists: string;
}

interface CardProps {
  item: Song;
}

const Card: React.FC<CardProps> = ({item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.artists}</p>
    </div>
  );
};

export default Card;