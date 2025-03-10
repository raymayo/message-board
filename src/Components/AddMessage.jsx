import React, { useState } from 'react';
import axios from 'axios';

const AddMessage = () => {
	const [query, setQuery] = useState('');
	const [track, setTrack] = useState(null);

	const [message, setMessage] = useState({
		recipient: '',
		department: '',
		yearLevel: '',
		message: '',
		track: {},
	});

	const onChange = (e) => {
		setMessage({
			...message,
			[e.target.name]: e.target.value,
		});
	};

	const sendNote = async (e) => {
		e.preventDefault(); // Prevent form from reloading
	  
		try {
		  const res = await axios.post('http://localhost:5000/notes', message);
		  console.log('✅ Message Sent:', res.data);
		} catch (error) {
		  console.error('❌ Error Sending Message:', error);
		}
	  };
	  
	//SPOTIFY SEARCH

	const getAccessToken = async () => {
		const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
		const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
			},
			body: 'grant_type=client_credentials',
		});

		const data = await response.json();
		return data.access_token;
	};

	const searchSpotify = async (e) => {

		e.preventDefault();
		if (!query) return;

		const token = await getAccessToken();

		const response = await fetch(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(
				query
			)}&type=track&limit=1`,
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
				artist: trackData.artists.map((a) => a.name).join(', '),
				album: trackData.album.name,
				image: trackData.album.images[0]?.url || '',
				url: trackData.external_urls.spotify, // Spotify URL
			});

			setMessage((prevMessage) => ({
				...prevMessage,
				track: {
					id: trackData.id,
					name: trackData.name,
					artist: trackData.artists.map((a) => a.name).join(', '),
					album: trackData.album.name,
					image: trackData.album.images[0]?.url || '',
					url: trackData.external_urls.spotify, // Spotify URL
				},
			}));
		}
	};

	return (
		<form onSubmit={sendNote} className="flex flex-col justify-center items-center text-left p-4 transition-all duration-300 w-full border border-red-500 h-full">
			<div className='flex flex-col justify-between items-center w-2/5 gap-6'>
			<label className="flex flex-col gap-2 w-full">
				<h1 className="text-sm font-medium">Recipient</h1>
				<input
					type="text"
					placeholder="Enter recipient's name"
					className="border border-zinc-300 shadow-2xs text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:border focus:border-black transition-all duration-300"
					onChange={onChange}
					name="recipient"
					value={message.recipient}
					required
				/>
			</label>
			<div className="flex gap-4 w-full">
				<label className="w-full flex flex-col gap-2">
					<h1 className="text-sm font-medium">Department</h1>
					<div className="cursor-pointer border border-zinc-300 shadow-2xs text-sm rounded-md w-full focus:border focus-within:border-black transition-all duration-300 pr-2">
					<select
						name="department"
						className="cursor-pointer text-sm rounded-md px-3 py-2 w-full focus:outline-none"
						onChange={onChange}
						value={message.department}
						required>
						<option value="" disabled>
							Select Department
						</option>
						<option value="CSD">CSD</option>
						<option value="HM">HM</option>
						<option value="EXEC">EXEC</option>
						<option value="EDUC">EDUC</option>
					</select>
					</div>
				</label>
				<label className="flex flex-col gap-2 w-full">
					<h1 className="text-sm font-medium">Year Level</h1>
					<div className="cursor-pointer border border-zinc-300 shadow-2xs text-sm rounded-md w-full focus:border focus-within:border-black transition-all duration-300 pr-2">
					<select
						name="yearLevel"
						className="cursor-pointer text-sm rounded-md px-3 py-2 w-full focus:outline-none"
						onChange={onChange}
						value={message.yearLevel}
						required>
						<option value="" disabled>
							Select Department
						</option>
						<option value="1st Year">1st Year</option>
						<option value="2nd Year">2nd Year</option>
						<option value="3rd Year">3rd Year</option>
						<option value="4th Year">4th Year</option>
					</select>
					</div>
				</label>
			</div>
			<label className="w-full flex flex-col gap-2">
				<h1 className="text-sm font-medium">Message</h1>
				<textarea
					name="message"
					className="border border-zinc-300 shadow-2xs text-sm rounded-md px-3 py-2 w-full h-36 focus:outline-none focus:border focus:border-black transition-all duration-300"
					onChange={onChange}
					value={message.message}
					placeholder="Write your message here"
					required></textarea>
			</label>
			<div className="flex flex-col gap-4 w-full">
				<label className="w-full flex flex-col gap-2">
					<h1 className="text-sm font-medium">Song</h1>
					<div className="flex items-center border border-zinc-300 shadow-2xs text-sm rounded w-full focus-within:border-black transition-all duration-300">
						<input
							type="text"
							placeholder="Search and select your song"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="w-full p-2 focus:outline-none"
							required
						/>
						<button
							onClick={searchSpotify}
							className="p-2 cursor-pointer border-l border-zinc-300 rounded-r hover:bg-zinc-100 transition-all duration-300">
							Select
						</button>
					</div>
				</label>

				{track && (
					<div className="flex flex-col items-center gap-4 w-full">
						<div className="flex justify-between items-center border border-zinc-200 rounded-md gap-2 px-3 py-2 w-full">
							<div className="flex gap-2">
								<img
									src={track.image}
									alt={track.name}
									className="w-14 h-14 rounded"
								/>
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
								className=" flex justify-center items-center h-fit">
								<img
									src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png"
									alt="Spotify"
									className="w-6 h-6"
								/>
							</a>
						</div>
						{/* <iframe
							src={`https://open.spotify.com/embed/track/${track.id}`}
							width="100%"
							height="200"
							allow="encrypted-media"
							 className=''></iframe> */}
					</div>
				)}
			</div>
			<button
			type='submit'
				className="w-full bg-zinc-900 px-3 py-3 text-white rounded-md hover:bg-zinc-800 cursor-pointer transition-all duration-300">
				Submit
			</button>
			</div>
		</form>
	);
};

export default AddMessage;
