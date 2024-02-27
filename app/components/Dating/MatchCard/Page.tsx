import React from 'react';

interface Match {
  id: string;
  name: string;
  age: number;
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div>
      <h3>{match.name}</h3>
      <p>Age: {match.age}</p>
     
    </div>
  );
};

export default MatchCard;