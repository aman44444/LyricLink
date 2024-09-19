"use client"
import React, { useEffect, useState } from 'react';
import { getRecommendedSongs,  fetchTopTracks, fetchTopArtists } from '../../../utils/spotifyAPI'; 
import Card from '../../common/Card/Card';

const HomePage: React.FC = () => {
    const [recommendedSongs, setRecommendedSongs] = useState<any[]>([]);
    const [topTracks, setTopTracks] = useState<any[]>([]);
    const [topArtists, setTopArtists] = useState<any[]>([]);

  
    useEffect(() => {
        Promise.all([fetchTopTracks(), fetchTopArtists()])
            .then(([tracksData, artistsData]) => {
                setTopTracks(tracksData);
                setTopArtists(artistsData);

                return getRecommendedSongs(tracksData, artistsData);
            })
            .then(recommendations => {
                setRecommendedSongs(recommendations);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
     <div className="overflow-hidden p-5 h-screen sm:h-full">
        <h2 className='ml-3'>Recommended Songs</h2>
        <div className=" overflow-x-auto overflow-y-hidden flex no-scrollbar">
            {recommendedSongs.map((song: any) => (
                <Card
                   key={song.id}
                   imageUrl={song.album.images[0].url}
                   title={song.name}
                 />
            ))}
        </div>

        <h2 className='ml-3'>Top Tracks</h2>
        <div className="overflow-x-auto sm:overflow-hidden overflow-y-hidden flex">
                {topTracks.map((track: any) => (
                    <Card
                        key={track.id}
                        imageUrl={track.album.images[0].url}
                        title={track.name}   
                    />
                ))}
         </div>

        <h2 className='ml-3'>Top Artists</h2>
        <div className="overflow-x-auto sm:overflow-hidden flex">
                {topArtists.map((artist: any) => (
                   <Card
                       key={artist.id}
                       imageUrl={artist.images[0].url}
                       title={artist.name}
                    />

                ))}
        </div>
    </div>
   
);
};

export default HomePage;