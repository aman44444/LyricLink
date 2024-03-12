import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const SpotifyAuth: React.FC = () => {
***REMOVED***
  const redirectUri = 'http://localhost:3000/callback';
  const scopes = ['user-read-private', 'playlist-read-private'];
  const state = 'SOME_STATE';

  const handleLogin = () => {
    const authorizeUrl = getAuthorizeURL(clientId, redirectUri, scopes, state);
    window.location.href = authorizeUrl;
  };

  const getAuthorizeURL = (clientId: string, redirectUri: string, scopes: any[], state: string) => {
    const baseAuthorizeUrl = 'https://accounts.spotify.com/authorize';
    const queryParams = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      state: state
    });
    return `${baseAuthorizeUrl}?${queryParams.toString()}`;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default SpotifyAuth;