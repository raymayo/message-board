import React, { useState } from "react";

const SpotifySearch = () => {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState(null);

  const getAccessToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
  };

  const searchSpotify = async () => {
    if (!query) return;

    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (data.tracks.items.length > 0) {
      const trackData = data.tracks.items[0];
      setTrack({
        id: trackData.id,
        name: trackData.name,
        artist: trackData.artists.map((a) => a.name).join(", "),
        album: trackData.album.name,
        image: trackData.album.images[0]?.url || "",
        url: trackData.external_urls.spotify, // Spotify URL
      });
    }
    console.log(track)
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Spotify Track Search</h2>
      <input
        type="text"
        placeholder="Enter song name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={searchSpotify}
        className="mt-2 bg-green-500 text-white p-2 rounded"
      >
        Select
      </button>

      {track && (
        <div className="mt-4 p-4 border rounded shadow flex flex-col items-center">
          <div className="flex border justify-between items-between gap-2 p-4 w-90">
            <div className="flex gap-2">
          <img src={track.image} alt={track.name} className="w-14 h-14 rounded" />
          <div className="flex flex-col items-start">
            <h3 className="text-base font-semibold">{track.name}</h3>
            <p className="text-gray-600">{track.artist}</p>
          </div>
          </div>
      
          {/* <p className="text-sm text-gray-500">Album: {track.album}</p> */}
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center space-x-2"
          >
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png"
              alt="Spotify"
              className="w-6 h-6"
            />
          </a>
          </div>
         

          {/* Spotify Embed */}
          <iframe
            src={`https://open.spotify.com/embed/track/${track.id}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            className="mt-2"
          ></iframe>

          {/* Spotify Logo with Link */}

        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
