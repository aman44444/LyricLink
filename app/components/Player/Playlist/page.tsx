import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

interface PlaylistProps {
  accessToken: string;
}

interface PlaylistData {
  id: string;
  name: string;
}

const Playlist: React.FC<PlaylistProps> = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPlaylists(response.data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    if (accessToken) {
      fetchPlaylists();
    }
  }, [accessToken]);

  return (
    <div>
      <h3>Playlists</h3>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;