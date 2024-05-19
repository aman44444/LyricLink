// import React, { useEffect, useState } from 'react';
// import { fetchUserPlaylists, fetchPlaylistTracks } from '@/app/utils/spotifyAPI';

// interface Playlist {
//   id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
// }

// const UserPlaylists: React.FC = () => {
//   const [playlists, setPlaylists] = useState<Playlist[]>([]);
//   const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
//   const [playlistTracks, setPlaylistTracks] = useState<any[]>([]);

//   useEffect(() => {
//     const getUserPlaylists = async () => {
//       try {
//         const playlistsData = await fetchUserPlaylists();
//         const formattedPlaylists = playlistsData.map((playlist: any) => ({
//           id: playlist.id,
//           name: playlist.name,
//           description: playlist.description,
//           imageUrl: playlist.images[0].url, 
//         }));
//         setPlaylists(formattedPlaylists);
//       } catch (error) {
//         console.error('Error fetching user playlists:', error);
//       }
//     };

//     getUserPlaylists();
//   }, []);

//   const handlePlaylistClick = async (playlist: Playlist) => {
//     try {
//       const tracks = await fetchPlaylistTracks(playlist.id);
//       setPlaylistTracks(tracks);
//       setSelectedPlaylist(playlist);
//     } catch (error) {
//       console.error('Error fetching playlist tracks:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>User Playlists</h2>
//       <div className="playlist-container">
//         {selectedPlaylist ? (
//           <div>
//             <h3>{selectedPlaylist.name}</h3>
//             <button onClick={() => setSelectedPlaylist(null)}>Back to Playlists</button>
//             <ul>
//               {playlistTracks.map((track) => (
//                 <li key={track.id}>{track.name}</li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           playlists.map((playlist) => (
//             <div key={playlist.id} onClick={() => handlePlaylistClick(playlist)} className="playlist">
//               <img src={playlist.imageUrl} alt={playlist.name} />
//               <h3>{playlist.name}</h3>
//               <p>{playlist.description}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserPlaylists;
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
      <h2 className="text-2xl font-semibold mb-4">Playlists</h2>
      <div className="grid grid-cols-2 gap-4">
        {selectedPlaylist ? (
          <div>
            <h3 className="text-xl font-semibold mb-2">{selectedPlaylist.name}</h3>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded" onClick={() => setSelectedPlaylist(null)}>Back to Playlists</button>
            <ul>
              {playlistTracks.map((track) => (
                <li key={track.id} className="text-gray-800">{track.name}</li>
              ))}
            </ul>
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
  );
};

export default UserPlaylists;