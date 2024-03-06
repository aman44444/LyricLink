import React from 'react';

const MusicPlayer: React.FC = () => {

  
  const handlePlay = () => {
    
  };

  const handlePause = () => {
   
  };

  const handleSkipForward = () => {
    
  };

  const handleSkipBackward = () => {
    
  };

  const handleVolumeChange = () => {
    
  };

  return (
    <div>
     
      <div>
        <button onClick={handleSkipBackward}>Skip Backward</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleSkipForward}>Skip Forward</button>
      </div>
      
      <input type="range" min="0" max="100" onChange={handleVolumeChange} />
    </div>
  );
};

export default MusicPlayer;