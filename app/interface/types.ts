interface ImageData {
  url: string;
}

interface Artist {
  name: string;
}

interface Track {
  name: string;
}

export interface UserData {
  id: string;
  display_name: string;
  topArtists: Artist[];
  topTracks: Track[];
  images: ImageData[];
}

export interface MatchedUser extends UserData {
  similarity: number; 
}