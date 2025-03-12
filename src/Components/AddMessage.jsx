import React, { useState } from 'react';
import axios from 'axios';
import SelectButton from './SelectButton.jsx';
import { useNavigate } from "react-router-dom";

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

	const navigate = useNavigate();


	const onChange = (e) => {
		setMessage({
			...message,
			[e.target.name]: e.target.value,
		});
	};

	const onSelectChange = (name, value) => {
		setMessage((prevMessage) => ({
			...prevMessage,
			[name]: value,
		}));
	};

	const sendNote = async (e) => {
		e.preventDefault(); // Prevent form from reloading

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/notes`,
				message
			);
			console.log('✅ Message Sent:', res.data);

			setMessage({
				recipient: '',
				department: '',
				yearLevel: '',
				message: '',
				track: {},
			});

			setQuery('');
			setTrack(null);
			navigate("/browse");
			

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
		<form
			onSubmit={sendNote}
			className="flex flex-col justify-center items-center text-left p-4 transition-all duration-300 w-full h-full">
			<div className="flex flex-col justify-between items-center w-full max-w-[725px] gap-6">
				{/* Recipient Field */}
				<label className="flex flex-col gap-2 w-full">
					<h1 className="text-sm font-medium">Recipient</h1>
					<input
						type="text"
						placeholder="Enter recipient's name"
						className="border border-zinc-300 shadow-sm text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:border focus:border-zinc-500 transition-all duration-300"
						onChange={onChange}
						name="recipient"
						value={message.recipient}
						required
					/>
				</label>

				{/* Department & Year Level - Stack on small screens */}
				<div className="flex flex-col sm:flex-row gap-4 w-full">
					{/* Department */}
					<label className="w-full flex flex-col gap-2">
						<h1 className="text-sm font-medium">Department</h1>
						<SelectButton
							options={['CSD', 'HM', 'EXEC', 'EDUC']}
							value={message.department}
							onChange={(value) => onSelectChange('department', value)}
							placeholder="Select Department"
						/>
					</label>

					{/* Year Level */}
					<label className="flex flex-col gap-2 w-full">
						<h1 className="text-sm font-medium">Year Level</h1>
						<SelectButton
							options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
							value={message.yearLevel}
							onChange={(value) => onSelectChange('yearLevel', value)}
							placeholder="Select Year Level"
						/>
					</label>
				</div>

				{/* Message Field */}
				<label className="w-full flex flex-col gap-2">
					<h1 className="text-sm font-medium">Message</h1>
					<textarea
						name="message"
						className="border border-zinc-300 shadow-sm text-sm rounded-md px-3 py-2 w-full h-36 focus:outline-none focus:border focus:border-zinc-500 transition-all duration-300"
						onChange={onChange}
						value={message.message}
						placeholder="Write your message here"
						required></textarea>
				</label>

				{/* Song Selection */}
				<div className="flex flex-col gap-4 w-full">
					<label className="w-full flex flex-col gap-2">
						<h1 className="text-sm font-medium">Song</h1>
						<div className="flex items-center border border-zinc-300 shadow-sm text-sm rounded w-full focus-within:border-zinc-500 transition-all duration-300">
							<input
								type="text"
								placeholder="Type the song for this note"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className="w-full p-2 focus:outline-none "
								required
							/>
							<button
								onClick={searchSpotify}
								className="w-32 p-2 cursor-pointer border-l border-zinc-300 rounded-r text-sm hover:bg-zinc-200 transition-all duration-300">
								Add Song
							</button>
						</div>
					</label>

					{/* Selected Song Display */}
					{track && (
						<div className="flex flex-col items-center gap-4 w-full">
							<div className="flex flex-row justify-between items-center border border-zinc-200 rounded-md gap-2 px-3 py-2 w-full">
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
								<a
									href={track.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex justify-center items-center">
									<img
										src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png"
										alt="Spotify"
										className="w-6 h-6"
									/>
								</a>
							</div>
						</div>
					)}
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className={`w-full px-3 py-3 text-sm text-white rounded-md transition-all duration-300 ${
						message.recipient &&
						message.department &&
						message.yearLevel &&
						message.message &&
						Object.keys(message.track).length > 0
							? 'bg-zinc-900 hover:bg-zinc-800 cursor-pointer'
							: 'bg-zinc-400 cursor-not-allowed'
					}`}
					disabled={
						!message.recipient ||
						!message.department ||
						!message.yearLevel ||
						!message.message ||
						Object.keys(message.track).length === 0
					}>
					Submit
				</button>
			</div>
		</form>
	);
};

export default AddMessage;
