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


	return (
		<div
			className="flex flex-col justify-start  text-left p-4 transition-all duration-300 w-full h-full">
				<div className="grid w-full max-w-[725px] gap-6 md:grid-cols-2 items-center mx-auto">
			<div className="flex flex-col gap-2 w-full mb-4 md:col-span-2">
						<h1 className="text-sm font-medium text-left">Filter</h1>
				<div className="flex gap-2 text-left flex-col md:flex-row">
					<label className="flex flex-col gap-2 w-full">
						<input
							type="text"
							placeholder="Enter recipient's name"
							className="border border-zinc-300 shadow-2xs text-sm rounded-md h-full px-3 py-2 w-full focus:outline-none focus:border focus:border-black transition-all duration-300"
							onChange={(e) =>
								setFilters({ ...filters, recipient: e.target.value })
							}
							name="recipient"
							value={filters.recipient}
							required
						/>
					</label>
					<div className='flex w-full items-center gap-2'>
					<label className="w-full flex flex-col gap-2">
						<SelectButton
							options={['CSD', 'HM', 'EXEC', 'EDUC']}
							value={filters.department}
							onChange={(selectedOption) => setFilters({ ...filters, department: selectedOption })}
							placeholder="Select Department"
						/>
					</label>
					<label className="flex flex-col gap-2 w-full">
						<SelectButton
							options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
							value={filters.yearLevel}
							onChange={(selectedOption) => setFilters({ ...filters, yearLevel: selectedOption })}
							placeholder="Select Year Level"
						/>
					</label>
					</div>
				</div>
				<button
					onClick={fetchFilteredNotes}
					className="text-sm w-full bg-zinc-900 px-3 py-2 text-white rounded-md hover:bg-zinc-800 cursor-pointer transition-all duration-300">
					Search
				</button>
			</div>
			{notes.length > 0 ? (
				notes.map((note) => (
					<Link to={`/notes/${note._id}`} key={note._id} className='w-full'>
						<NoteCard {...note} />
					</Link>
				))
			) : (
				<p className='text-center col-span-2'>No notes found.</p>
			)}
			</div>
		</div>
	);
};

export default BrowseNotes;
