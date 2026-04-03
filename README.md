#  LyricLink – Connect Friends Through Music Taste

MusicMate is a web application that connects music lovers by         analyzing their Spotify listening habits. Users can discover friends     with similar tastes.

#  Features
Spotify Integration: Authenticate with Spotify to fetch your top   tracks, artists, and playlists.
Friend Matching: Find friends with similar music taste based on listening patterns.
Responsive Design: Fully responsive UI for both desktop and mobile users.
Real-time Updates: Firebase backend allows instant updates and friend connections.

# Tech Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS
Backend: Firebase (Authentication & Firestore for user data)
APIs: Spotify Web API for music data and user playlists

# UI / UX
Clean, modern interface built with Tailwind CSS
Dynamic dashboards showing top tracks, top artists, and friend suggestions
Responsive layouts optimized for mobile and desktop

# Getting Started
Prerequisites
Node.js ≥ 18
npm or yarn
Spotify Developer account to get Client ID & Secret
Firebase project setup with Authentication & Firestore
Installation
Clone the repository:
git clone https://github.com/yourusername/musicmate.git
cd musicmate
Install dependencies:
npm install
# or
yarn
Configure environment variables:

Create a .env.local file in the root:

NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
Run the development server:
npm run dev
# or
yarn dev

Open http://localhost:3000
 to view the app.

# Future Enhancements
Friend chat functionality
Collaborative playlists based on combined tastes
Personalized music recommendations
Dark mode toggle

# Screenshots



