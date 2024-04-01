import React, { useEffect, useState } from 'react';
import { getRecommendedSongs, getNewReleases } from '../../../utils/spotifyAPI'; 
import Card from '../../common/Card/Card';

const HomePage: React.FC = () => {
    const [recommendedSongs, setRecommendedSongs] = useState<any[]>([]);
    const [newReleases, setNewReleases] = useState<any[]>([]);

    useEffect(() => {
       
        getRecommendedSongs()
            .then(data => setRecommendedSongs(data))
            .catch(error => console.error('Error fetching recommended songs:', error));

       
        getNewReleases()
            .then(data => setNewReleases(data))
            .catch(error => console.error('Error fetching new releases:', error));
    }, []);

    return (
        
        <div className="overflow-hidden">
        <h2>Recommended Songs</h2>
        <div className="card-container flex ">
            {recommendedSongs.map((song: any) => (
                <Card
                    key={song.id}
                    imageUrl={song.album.images[0].url}
                    title={song.name}
                    // subtitle={song.artists.map((artist: any) => artist.name).join(', ')}
                />
            ))}
        </div>

        {/* <h2>New Releases</h2>
        <div className="card-container flex ">
            {newReleases.map((album: any) => (
                <Card
                    key={album.id}
                    imageUrl={album.images[0].url}
                    title={album.name}
                    // subtitle={album.artists.map((artist: any) => artist.name).join(', ')}
                />
            ))}
        </div> */}
    </div>
   
);
};

export default HomePage;