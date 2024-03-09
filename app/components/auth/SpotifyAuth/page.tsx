import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const SpotifyAuth: React.FC = () => {
***REMOVED***
  const redirectUri = 'http://localhost:3001/callback';
  const scopes = ['user-read-private', 'playlist-read-private'];
  const state = 'SOME_STATE';

  const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    redirectUri: redirectUri
  });

  const handleLogin = () => {
    const authorizeUrl = spotifyApi.createAuthorizeURL(scopes, state);
    window.location.href = authorizeUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default SpotifyAuth;