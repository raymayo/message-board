import React from 'react';
import { CircleCheck, Search, PencilLine } from 'lucide-react';

import { Link } from 'react-router-dom';

const Success = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-12 md:gap-16 p-6">
			<div class="success-animation">
				<svg
					class="checkmark"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 52 52">
					<circle
						class="checkmark__circle"
						cx="26"
						cy="26"
						r="25"
						fill="none"
					/>
					<path
						class="checkmark__check"
						fill="none"
						d="M14.1 27.2l7.1 7.2 16.7-16.8"
					/>
				</svg>
			</div>
			<h1 className="text-lg max-w-[700px] text-zinc-700 font-medium">
				Your note has been successfully submitted! Thank you for your input. If
				you need to submit another note, feel free to do so.
			</h1>
			<div className="flex flex-col md:flex-row gap-2 w-full max-w-md md:max-w-none justify-center items-center">
				<Link
					to="/browse"
					className=" text-sm bg-zinc-900 text-zinc-50 px-6 h-10 cursor-pointer font-medium rounded-md shadow-sm flex items-center justify-center gap-2 w-full md:w-auto">
					View your note <Search size={20} />
				</Link>
				<Link
					to="/create"
					className="text-sm border border-zinc-300 px-6 h-10 cursor-pointer font-medium rounded-md shadow-sm flex items-center justify-center gap-2 w-full md:w-auto">
					Create another <PencilLine size={20} />
				</Link>
			</div>
		</div>
	);
};

export default Success;
