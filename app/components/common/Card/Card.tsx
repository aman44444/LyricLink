import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
    onPlay: () => void;
  }
  
  const Card: React.FC<CardProps> = ({ imageUrl, title, onPlay }) => {
    return (
      <div className="h-48 w-40 m-3 rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full" src={imageUrl} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xs mb-2 text-black">{title}</div>
          
        </div>
      </div>
    );
  };

export default Card;