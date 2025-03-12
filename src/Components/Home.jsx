import React from 'react';
import { Link } from 'react-router-dom';
import { PencilLine, Search } from 'lucide-react';


const Home = () => {
	return (
		<div className='flex flex-col justify-center items-center w-full h-full gap-6'>
			<h1 className='handwritten text-6xl w-1/3'>a collection of unspoken words, conveyed through the song</h1>
			<p className='text-zinc-500 text-lg'>Express your untold note through the song.</p>
            <div className='flex gap-4'>
			<Link to="/create" className="bg-zinc-900 text-zinc-50 px-6 h-10 cursor-pointer font-medium rounded-md shadow-sm flex items-center gap-2">
                Write your feelings <PencilLine size={20}/>
                </Link>
			<Link to='/browse' className='border border-zinc-300 px-6 h-10 cursor-pointer font-medium rounded-md shadow-sm flex items-center gap-2'>Browse Notes <Search size={20}/></Link>
            </div>
			<div className='flex gap-6 w-3/5 mt-16'>
                <div className='flex flex-col gap-2 border border-zinc-300 bg-white rounded-md p-6 text-left w-full hover:border-zinc-400 hover:shadow-xl hover:scale-101 transition-all duration-300'>
                    <h1 className='handwritten text-2xl'>Share Your Notes</h1>
                    <p className='text-sm text-zinc-500'>Choose a song and write a heartfelt note to someone special or save it as a little gift for yourself.</p>
                </div>
                <div className='flex flex-col gap-2 border border-zinc-300 bg-white rounded-md p-6 text-left w-full hover:border-zinc-400 hover:shadow-xl hover:scale-101 transition-all duration-300'>
                    <h1 className='handwritten text-2xl'>Browse Notes</h1>
                    <p className='text-sm text-zinc-500'>Find notes that were written for you. Search your name and uncover heartfelt notes written just for you.</p>
                </div>
                <div className='flex flex-col gap-2 border border-zinc-300 bg-white rounded-md p-6 text-left w-full hover:border-zinc-400 hover:shadow-xl hover:scale-101 transition-all duration-300'>
                    <h1 className='handwritten text-2xl'>Detail Notes</h1>
                    <p className='text-sm text-zinc-500'>Tap on any note card to discover the full story behind it and listen to the song that captures the emotion of the moment!</p>
                </div>
            </div>
		</div>
	);
};

export default Home;
