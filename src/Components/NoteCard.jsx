import React from 'react'

const NoteCard = ({recipient,department,yearLevel,message,track}) => {
  return (
    <div className='border border-zinc-300 rounded-xl w-full h-60 flex flex-col justify-between shadow'>

        <div className='px-4 pt-4 flex justify-between'>        
        <h1 className='text-sm text-left'>To: <span className='font-medium'>{recipient}</span></h1>
        <h1 className='text-xs text-left'>{yearLevel} {department}</h1>
        </div>
        <p className='px-4 handwritten text-3xl text-left truncate'>{message}</p>
        <div className='flex justify-between items-center p-4 w-full h-20 bg-zinc-100 border-t border-zinc-300 rounded-b-xl'>
							<div className="flex gap-2">
								<img
									src={track.image}
									alt={track.name}
									className="w-10 h-10 rounded"
								/>
								<div className="flex flex-col items-start">
									<h3 className="text-sm font-semibold">{track.name}</h3>
									<p className="text-gray-500 text-xs">{track.artist}</p>
								</div>
							</div>
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
    </div>
  )
}

export default NoteCard