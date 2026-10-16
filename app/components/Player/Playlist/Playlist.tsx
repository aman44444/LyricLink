"use client";

import React, { useEffect, useState } from "react";
import {
  fetchUserPlaylists,
  fetchPlaylistTracks,
} from "@/app/utils/spotifyAPI";
import { IoMdArrowBack } from "react-icons/io";

interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const UserPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<Playlist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<any[]>([]);

  useEffect(() => {
    const getUserPlaylists = async () => {
      try {
        const playlistsData = await fetchUserPlaylists();

        const formattedPlaylists = playlistsData.map((playlist: any) => ({
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          imageUrl: playlist.images?.[0]?.url ?? "",
        }));

        setPlaylists(formattedPlaylists);
      } catch (error) {
        console.error("Error fetching user playlists:", error);
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
      console.error("Error fetching playlist tracks:", error);
    }
  };

  return (
    <div className="h-full w-full p-6">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-black p-6">
        <h2 className="mb-6 text-2xl font-semibold">Playlists</h2>

        {selectedPlaylist ? (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlaylist(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 text-white transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                <IoMdArrowBack size={20} />
              </button>

              <h3 className="truncate text-xl font-semibold">
                {selectedPlaylist.name}
              </h3>
            </div>

            <ul className="mt-6 space-y-2">
              {playlistTracks.map((track) => (
                <li
                  key={track.id}
                  className="rounded-lg px-3 py-2 text-gray-400 transition hover:bg-zinc-900 hover:text-white"
                >
                  {track.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  type="button"
                  onClick={() => handlePlaylistClick(playlist)}
                  className="group w-full min-w-0 text-left"
                >
                  <div className="rounded-xl border border-transparent p-2 transition hover:border-zinc-700 hover:bg-zinc-900">
                    <img
                      src={playlist.imageUrl}
                      alt={playlist.name}
                      className="aspect-square w-full rounded-lg object-cover"
                    />

                    <h3 className="mt-3 truncate text-sm font-semibold text-white">
                      {playlist.name}
                    </h3>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {playlist.description || "No description"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPlaylists;

