import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='py-2 border-b border-zinc-300 w-full sticky top-0 left-0 bg-white flex justify-center items-center'>
      <div className='w-full sm:w-4/5 md:w-4/5 lg:w-3/5 xl:w-3/5 2xl:w-3/5 flex justify-between items-center px-4'>
        <h1 className='handwritten text-2xl'>KNS Confession</h1>
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