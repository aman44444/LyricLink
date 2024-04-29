import React, { useEffect, useState } from 'react';
import { getRecommendedSongs, getNewReleases, fetchTopTracks, fetchTopArtists } from '../../../utils/spotifyAPI'; 
import Card from '../../common/Card/Card';

const HomePage: React.FC = () => {
    const [recommendedSongs, setRecommendedSongs] = useState<any[]>([]);
    const [newReleases, setNewReleases] = useState<any[]>([]);
    const [topTracks, setTopTracks] = useState<any[]>([]);
    const [topArtists, setTopArtists] = useState<any[]>([]);

    useEffect(() => {
       
        getRecommendedSongs()
            .then(data => setRecommendedSongs(data))
            .catch(error => console.error('Error fetching recommended songs:', error));

       
        getNewReleases()
            .then(data => setNewReleases(data))
            .catch(error => console.error('Error fetching new releases:', error));
           
           
         fetchTopTracks()
            .then(data => setTopTracks(data))
            .catch(error => console.error('Error fetching top tracks:', error));

        // Fetch top artists
        fetchTopArtists()
            .then(data => setTopArtists(data))
            .catch(error => console.error('Error fetching top artists:', error));
    
        }, []);

    const handlePlay = () => {
        // Handle play/resume action
    };

    return (
        
     <div className="overflow-hidden ">
        <h2 className='ml-3'>Recommended Songs</h2>
        <div className="card-container flex ">
            {recommendedSongs.map((song: any) => (
                <Card
                key={song.id}
                imageUrl={song.album.images[0].url}
                title={song.name}
                onPlay={handlePlay}
            />
            ))}
        </div>

        <h2 className='ml-3'>Top Tracks</h2>
            <div className="card-container flex">
                {topTracks.map((track: any) => (
                    <Card
                        key={track.id}
                        imageUrl={track.album.images[0].url}
                        title={track.name}
                        onPlay={handlePlay}
                    />
                ))}
            </div>

            <h2 className='ml-3'>Top Artists</h2>
            <div className="card-container flex">
                {topArtists.map((artist: any) => (
                   <Card
                   key={artist.id}
                   imageUrl={artist.images[0].url}
                   title={artist.name}
                   onPlay={handlePlay}
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