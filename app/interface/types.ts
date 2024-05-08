export interface UserData {
    id: string;
    display_name: string;
    images: string;
    topArtists: Artist[];
    topTracks: Track[];
  }

  interface Artist {
    name: string;
    
  }
  
  interface Track {
    name: string;
    
  }