import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
  }
  
  const Card: React.FC<CardProps> = ({ imageUrl, title }) => {
    return (
      <div className="flex-shrink-0 h-30 w-28 m-2 sm:h-48 sm:w-40 sm:m-3 sm:p-2 rounded  shadow-lg bg-white transform transition-transform duration-200 hover:scale-105">
        <div className='w-full h-full'>
          <img className="w-full h-4/5" src={imageUrl} alt={title} />
          <div>
            <div className="font-bold text-xs pl-2 text-black inline-block truncate w-full">{title}</div>
          </div>
        </div>
      </div>
    );
  };

export default Card;