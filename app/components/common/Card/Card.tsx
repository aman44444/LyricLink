import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
  }
  
  const Card: React.FC<CardProps> = ({ imageUrl, title }) => {
  return (
    <div className="group relative flex-shrink-0 h-30 w-28 m-2 sm:h-48 sm:w-40 sm:m-3 sm:p-2 
                    rounded shadow-lg bg-white overflow-hidden
                    transition-transform duration-300 hover:scale-105">
      <img className="w-full h-4/5 object-cover" src={imageUrl} alt={title} />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 
                      backdrop-blur-[1px] transition-all duration-300" />

      <div className="absolute bottom-0 w-full p-2">
        <div className="font-bold text-xs text-black truncate">{title}</div>
      </div>
    </div>
  );
};

export default Card;