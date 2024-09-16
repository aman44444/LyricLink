export const getRecommendedSongs = async (topTracks: any[], topArtists: any[]): Promise<any[]> => {
  try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
          throw new Error("Access token not found");
      }

      const trackIds = topTracks.map(track => track.id).slice(0, 2); 
      const artistIds = topArtists.map(artist => artist.id).slice(0, 2); 

     
      const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=6&seed_artists=${artistIds.join(',')}&seed_tracks=${trackIds.join(',')}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      });

      if (!response.ok) {
          throw new Error("Failed to fetch recommended songs");
      }

      const data = await response.json();
      return data.tracks;
  } catch (error) {
      console.error("Error fetching recommended songs:", error);
      throw error;
  }
};



export const fetchUserData = async (): Promise<any> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await response.json();

    
    if (!userData.id) {
      throw new Error("User ID not found in user data");
    }

    const { display_name, images } = userData;

    return {
      id: userData.id,
      display_name,
      images
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};



export const fetchUserPlaylists = async (): Promise<any> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user playlists");
    }

    const playlistsData = await response.json();
    return playlistsData.items;
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw error;
  }
};

export const fetchPlaylistTracks = async (playlistId: string): Promise<any[]> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch playlist tracks");
    }

    const data = await response.json();
    return data.items.map((item: any) => item.track);
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    throw error;
  }
};

export const fetchTopTracks = async (): Promise<any[]> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=6", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top tracks");
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw error;
  }
};

export const fetchTopArtists = async (): Promise<any[]> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=6", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top artists");
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching top artists:", error);
    throw error;
  }
};


