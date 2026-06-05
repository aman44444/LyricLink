import pkceChallenge from "pkce-challenge";

const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN = "https://accounts.spotify.com/api/token";

export const REDIRECT_URI = "https://lyriclink.vercel.app/webapp";

export const SCOPES =
  "user-top-read user-read-currently-playing user-read-playback-state playlist-read-private";

export async function buildSpotifyLoginUrl() {
  let verifier = localStorage.getItem("spotify_code_verifier");

  if (!verifier) {
    const pkce = await pkceChallenge();
    verifier = pkce.code_verifier;
    localStorage.setItem("spotify_code_verifier", verifier);
    localStorage.setItem("spotify_code_challenge", pkce.code_challenge);
  }

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: localStorage.getItem("spotify_code_challenge")!,
  });

  return `${SPOTIFY_AUTH}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const verifier = localStorage.getItem("spotify_code_verifier")!;
  if (!verifier) throw new Error("PKCE verifier missing");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    code_verifier: verifier,
  });

  const res = await fetch(SPOTIFY_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Spotify token error:", data);
    throw new Error("Spotify token exchange failed");
  }

  localStorage.removeItem("spotify_code_verifier");
  localStorage.removeItem("spotify_code_challenge");

  localStorage.setItem("spotify_access_token", data.access_token);
  return data;
}
