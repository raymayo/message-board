import React from 'react';

const AddMessage = () => {
	return (
		<div className="flex flex-col border border-red-500 text-left gap-4 p-4">
			<label className="flex flex-col gap-2">
				<h1>Recipient</h1>
				<input
					type="text"
					placeholder="name"
					className="border border-zinc-300 shadow-2xs rounded-md p-2 w-full"
				/>
			</label>
			<div className="flex gap-4">
				<label className="w-full flex flex-col gap-2">
					<h1>Department</h1>
					<select
						name="Department"
						id=""
						className="border border-zinc-300 shadow-2xs rounded p-2 w-full">
						<option value="" disabled>
							Select Department
						</option>
						<option value="">CSD</option>
						<option value="">HM</option>
						<option value="">EXEC</option>
						<option value="">EDUC</option>
					</select>
				</label>
				<label className="w-full flex flex-col gap-2">
					<h1>Year Level</h1>
					<select
						name="Year Level"
						id=""
						className="border border-zinc-300 shadow-2xs rounded p-2 w-full">
						<option value="" disabled>
							Select Department
						</option>
						<option value="">1st Year</option>
						<option value="">2nd Year</option>
						<option value="">3rd Year</option>
						<option value="">4th Year</option>
					</select>
				</label>
			</div>
			<textarea
				name="message"
				id=""
				className="border border-zinc-300 shadow-2xs rounded-md p-2 w-full h-36"></textarea>
			<button>Submit</button>
		</div>
	);
};

export default AddMessage;
