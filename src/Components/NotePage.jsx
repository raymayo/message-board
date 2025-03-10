import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const NotePage = () => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { id } = useParams(); // Get ID from URL

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long', // "March"
			day: 'numeric',
		});
	};

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await axios.get('http://localhost:5000/notes');
				setNotes(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchNotes();
	}, []);

	if (loading) return <p>Loading notes...</p>;
	if (error) return <p className="text-red-500">Error: {error}</p>;

	console.log(notes);

	const note = notes.find((n) => n._id === id);

	if (!note) {
		return <p className="text-center text-red-500">Note not found!</p>;
	}

	return (
		<div className="flex flex-col justify-center items-center w-full h-full border border-red-500">
			<div className="max-w-md flex flex-col items-center gap-4">
				<h1 className="text-xl">
					Hello, <span className="handwritten text-3xl">{note.recipient}</span>
				</h1>
				<h2 className="text-lg text-zinc-500">
					There's someone sending you a song, they want you to hear this song
					that maybe you'll like :)
				</h2>
				<iframe
					src={`https://open.spotify.com/embed/track/${note.track.id}`}
					width="100%"
					height="300"
					allow="encrypted-media"
					className="pt-2"></iframe>
			</div>
			<div className="text-center flex flex-col items-center -m-10 w-5/8 gap-4">
				<h1 className="text-lg text-zinc-700">
					Also, here's a message from the sender:
				</h1>
				<p className="handwritten text-4xl text-zinc-500">{note.message}</p>
				<p className="text-sm text-zinc-500">Sent on {formatDate(note.date)}</p>
				<div className='flex flex-col gap-4 justify-center items-center mt-4'>
					<p>Want to send a song to someone?</p>
					<Link
						to="/"
						className="inline-block w-fit bg-zinc-900 px-4 py-2 rounded-md text-white text-sm">
						Send a note
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotePage;
