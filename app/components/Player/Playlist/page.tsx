import React, { useEffect, useState } from 'react';
import { fetchUserPlaylists, fetchPlaylistTracks } from '@/app/utils/spotifyAPI';

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
    <div>
      <h2>User Playlists</h2>
      <div className="playlist-container">
        {selectedPlaylist ? (
          <div>
            <h3>{selectedPlaylist.name}</h3>
            <button onClick={() => setSelectedPlaylist(null)}>Back to Playlists</button>
            <ul>
              {playlistTracks.map((track) => (
                <li key={track.id}>{track.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.id} onClick={() => handlePlaylistClick(playlist)} className="playlist">
              <img src={playlist.imageUrl} alt={playlist.name} />
              <h3>{playlist.name}</h3>
              <p>{playlist.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPlaylists;
