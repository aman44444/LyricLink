import React, { useEffect, useState } from 'react';
import Card from '../../common/Card/Card';


interface Song {
    imageUrl: string;
    name: string;
    artists: string;
 }
  

const HomePage: React.FC = () => {
   
const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-4">New Release</h2>
        <h2 className="text-3xl font-semibold my-8">Recommended Songs</h2>
      <div className="grid grid-cols-3 gap-4">
        {recommendedSongs.map((song, index) => (
          <Card key={index} item={song} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;