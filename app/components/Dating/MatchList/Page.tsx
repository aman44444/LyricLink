import React from 'react';
import MatchCard from '../MatchCard/Page';

interface Match {
  id: string;
  name: string;
  age: number;
  
}

interface MatchListProps {
  matches: Match[];
}

const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <div>
      <h2>Matches</h2>
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchList;