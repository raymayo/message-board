import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='py-2 border-b border-zinc-300 w-full mb-8 fixed top-0 left-0 bg-white flex justify-center items-center'>
      <div className='w-3/5 flex justify-between items-center'>
        <h1 className='handwritten text-3xl'>KNS Message Board</h1>
        <div>
            <ul className='flex gap-4'>
                <Link to='/' className='cursor-pointer text-sm'>Home</Link>
                <Link to='/create' className='cursor-pointer text-sm'>Create</Link>
                <Link to='/browse' className='cursor-pointer text-sm'>Browse</Link>
            </ul>
        </div>
        </div>
    </nav>
  )
}

export default Header