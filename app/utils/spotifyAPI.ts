export const searchSpotify = async (query: string): Promise<any[]> => {
    try {
      const accessToken = localStorage.getItem("accessToken"); 
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
  
      const data = await response.json();
      return data.tracks.items; 
    } catch (error) {
      console.error("Error searching Spotify:", error);
      throw error;
    }
  };

 


