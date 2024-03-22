import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
    // subtitle: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, }) => {
    return (
        <div className="h-30 w-30 m-2">
            <img className="object-cover h-30 w-30 " src={imageUrl} alt={title} />
            <div className="flex overflow-hidden">
                <p>{title}</p>
                {/* <p>{subtitle}</p> */}
            </div>
        </div>
    );
};

export default Card;