import React, { useEffect, useState } from "react";

interface Track {
  id: string;
  name: string;
  artist: string;
  duration: number; 
  preview_url: string; 
}

interface MusicPlayerProps {
  track: Track ;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (track) {
      const audioElement = new Audio(track.preview_url);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
      audioElement.addEventListener("error", handleError);
      setAudio(audioElement);
    } else {
      setAudio(null);
    }
    
  }, [track]);

  const handleError = () => {
    setError("Error loading audio. Please try again later.");
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(handleError);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      {track ? (
        <div>
          <button onClick={togglePlayback}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          {error ? (
            <p>{error}</p>
          ) : (
            <audio controls>
              <source src={track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default MusicPlayer;
