interface ImageData {
  url: string;
  // Add other properties if necessary
}

export interface UserData {
    id: string;
    display_name: string;
    topArtists: Artist[];
    topTracks: Track[];
    images: ImageData[]; 
  }


  interface Artist {
    name: string;
    
  }
  
  interface Track {
    name: string;
    
  }