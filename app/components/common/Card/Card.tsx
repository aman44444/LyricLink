import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
    // subtitle: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, }) => {
    return (
        <div className="h-55 w-55">
            <img className="object-fill h-55 w-55 " src={imageUrl} alt={title} />
            <div className="flex overflow-hidden">
                <p>{title}</p>
                {/* <p>{subtitle}</p> */}
            </div>
        </div>
    );
};

export default Card;