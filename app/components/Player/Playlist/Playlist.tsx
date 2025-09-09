"use client"
import React, { useEffect, useState } from 'react';
import { fetchUserPlaylists, fetchPlaylistTracks } from '@/app/utils/spotifyAPI';
import { IoMdArrowBack } from "react-icons/io";

interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const UserPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<any[]>([]);

  useEffect(() => {
    const getUserPlaylists = async () => {
      try {
        const playlistsData = await fetchUserPlaylists();
        const formattedPlaylists = playlistsData.map((playlist: any) => ({
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          imageUrl: playlist.images[0].url, 
        }));
        setPlaylists(formattedPlaylists);
      } catch (error) {
        console.error('Error fetching user playlists:', error);
      }
    };

    getUserPlaylists();
  }, []);

  const handlePlaylistClick = async (playlist: Playlist) => {
    try {
      const tracks = await fetchPlaylistTracks(playlist.id);
      setPlaylistTracks(tracks);
      setSelectedPlaylist(playlist);
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
    }
  };

  return (
    <div className='p-7 h-full w-full flex justify-center md:block'>
      <div className=' h-4/5 w-full md:h-full md:w-2/5 p-5 border border-zinc-600 bg-black rounded-xl'>
      <h2 className="text-2xl font-semibold mb-4">Playlists</h2>
      <div className="grid grid-cols-2 gap-4">
        {selectedPlaylist ? (
          <div>
             <div className='flex gap-3'>
              
                <button className="border border-zinc-700 hover:border-zinc-400 text-white font-semibold py-2 px-4 rounded" onClick={() => setSelectedPlaylist(null)}>
                    {<IoMdArrowBack />}
                </button>
                  <h3 className="text-xl font-semibold mb-2">{selectedPlaylist.name}</h3>
             </div>
            <div className='mt-5'>
               <ul>            
                {playlistTracks.map((track) => (
                <li key={track.id} className="text-gray-400">{track.name}</li>
               ))}
             </ul>
           </div>
          </div>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.id} onClick={() => handlePlaylistClick(playlist)} className="pl-2">
              <img className="w-24 h-24 object-cover rounded-md mb-2 " src={playlist.imageUrl} alt={playlist.name} />
              <h3 className="text-lg font-semibold mb-1">{playlist.name}</h3>
              <p className="text-gray-500">{playlist.description}</p>
            </div>  
          ))
        )}
      </div>
      </div>
    </div>
  );
};

export default UserPlaylists;