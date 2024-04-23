import { useState, useEffect } from 'react';

import { SiSpotify } from 'react-icons/si';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Player = () => {
  const { data, error, mutate } = useSWR('/api/spotify', fetcher);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (data) {
      setIsPlaying(data.isPlaying);
    }
  }, [data]);

  const handlePlayPause = async () => {
    const response = await fetch('/api/spotify/playpause', { method: 'POST' });
    if (response.ok) {
      mutate(); 
    }
  };

  const handleNext = async () => {
    const response = await fetch('/api/spotify/next', { method: 'POST' });
    if (response.ok) {
      mutate(); 
    }
  };

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='flex items-center justify-center space-x-4'>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={handleNext}>Next</button>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={isPlaying ? data.songUrl : 'https://open.spotify.com/user/erence21?si=yTsrZT5JSHOp7tn3ist7Ig'}
        className='relative flex w-72 items-center space-x-4 rounded-md border p-5 transition-shadow hover:shadow-md'
      >
        <div className='w-16'>
          {isPlaying ? (
            <img className='w-16 shadow-sm' src={data.albumImageUrl} alt={data.album} />
          ) : (
            <SiSpotify size={64} color={'#1ED760'} />
          )}
        </div>

        <div className='flex-1'>
          <p className='component font-bold'>{isPlaying ? data.title : 'Not Listening'}</p>
          <p className='font-dark text-xs'>{isPlaying ? data.artist : 'Spotify'}</p>
        </div>

        <div className='absolute bottom-1.5 right-1.5'>
          <SiSpotify size={20} color={'#1ED760'} />
        </div>
      </a>
    </div>
  );
};

export default Player;
