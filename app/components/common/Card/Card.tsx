import React, { CSSProperties, ReactNode } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    style?: CSSProperties  ;
    children?: ReactNode;
  }

const Card: React.FC<CardProps> = ({ style, children }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md" style={style}>
      {children}
    </div>
  );
};

export default Card;