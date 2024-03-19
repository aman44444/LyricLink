import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
    subtitle: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, subtitle }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt={title} />
            <div className="card-info">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
        </div>
    );
};

export default Card;