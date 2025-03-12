/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from './NoteCard.jsx';
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
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/notes`, {
				params: filters,
			});
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
		<div className="
  w-full mx-auto flex flex-col justify-center gap-6 py-20 p-6
  sm:grid sm:grid-cols-2 
  md:grid md:grid-cols-2 
  lg:w-4/5 
  2xl:w-2/5 2xl:grid 2xl:grid-cols-2
">
			<div className="flex flex-col gap-4 w-full col-span-2 mb-4">
				<div className='flex gap-4 text-left'>
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
					<div className="cursor-pointer border border-zinc-300 shadow-2xs text-sm rounded-md w-full focus:border focus-within:border-black transition-all duration-300 pr-2">
						<select
							name="department"
							className="cursor-pointer text-sm rounded-md px-3 py-2 w-full focus:outline-none"
							onChange={(e) =>
								setFilters({ ...filters, department: e.target.value })
							}
							value={filters.department}
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
							onChange={(e) =>
								setFilters({ ...filters, yearLevel: e.target.value })
							}
							value={filters.yearLevel}
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
				<p>No notes found.</p>
			)}
		</div>
	);
};

export default BrowseNotes;
