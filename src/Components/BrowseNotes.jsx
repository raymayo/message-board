/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from './NoteCard.jsx';
import SelectButton from './SelectButton.jsx';
import { Link } from 'react-router-dom';

const BrowseNotes = () => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [filters, setFilters] = useState({
		recipient: '',
		department: '',
		yearLevel: '',
	});

	const fetchFilteredNotes = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/notes`,
				{
					params: filters,
				}
			);
			setNotes(response.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFilteredNotes();
	}, []);

	if (loading) return <p>Loading notes...</p>;
	if (error) return <p className="text-red-500">Error: {error}</p>;

	console.log(notes);

	return (
		<div
			className="pt-16 w-full mx-auto flex flex-col justify-center min-h-full gap-6 p-6 sm:grid sm:grid-cols-2  md:grid md:grid-cols-2  lg:w-4/5  2xl:w-2/5 2xl:grid 2xl:grid-cols-2">
			<div className="flex flex-col gap-4 w-full col-span-2 mb-4">
				<div className="flex gap-4 text-left">
					<label className="flex flex-col gap-2 w-full">
						<h1 className="text-sm font-medium">Recipient</h1>
						<input
							type="text"
							placeholder="Enter recipient's name"
							className="border border-zinc-300 shadow-2xs text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:border focus:border-black transition-all duration-300"
							onChange={(e) =>
								setFilters({ ...filters, recipient: e.target.value })
							}
							name="recipient"
							value={filters.recipient}
							required
						/>
					</label>
					<label className="w-full flex flex-col gap-2">
						<h1 className="text-sm font-medium">Department</h1>
						<SelectButton
							options={['CSD', 'HM', 'EXEC', 'EDUC']}
							value={filters.department}
							onChange={(selectedOption) => setFilters({ ...filters, department: selectedOption })}
							placeholder="Select Department"
						/>
					</label>
					<label className="flex flex-col gap-2 w-full">
						<h1 className="text-sm font-medium">Year Level</h1>
						<SelectButton
							options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
							value={filters.yearLevel}
							onChange={(selectedOption) => setFilters({ ...filters, yearLevel: selectedOption })}
							placeholder="Select Year Level"
						/>
					</label>
				</div>
				<button
					onClick={fetchFilteredNotes}
					className="text-sm w-full bg-zinc-900 px-3 py-2 text-white rounded-md hover:bg-zinc-800 cursor-pointer transition-all duration-300">
					Search
				</button>
			</div>
			{notes.length > 0 ? (
				notes.map((note) => (
					<Link to={`/notes/${note._id}`} key={note._id}>
						<NoteCard {...note} />
					</Link>
				))
			) : (
				<p className='text-center col-span-2'>No notes found.</p>
			)}
		</div>
	);
};

export default BrowseNotes;
