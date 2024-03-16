import React, { useEffect, useState } from "react";

interface Track {
  id: string;
  name: string;
  artist: string;
  duration: number; 
  previewUrl: string; 
}

interface MusicPlayerProps {
  track: Track | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (track && track.previewUrl) {
      const audioElement = new Audio(track.previewUrl);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
      setAudio(audioElement);
    } else {
      setAudio(null);
    }
    
  }, [track]);


  const togglePlayback = () => {
    if (audio) {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
   }
  };

  useEffect(() => {
    console.log("Track changed:", track);
  }, [track]);

  return (
    <div>
     {track && track.previewUrl ? (
        <div>
        <button onClick={togglePlayback}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <audio controls>
          <source src={track.previewUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ) : (
      <p>No track selected</p>
      )}
    </div>
  );
};

export default MusicPlayer;