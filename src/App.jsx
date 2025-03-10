
import  AddMessage  from './Components/AddMessage'
import SpotifySearch from './Components/SpotifySearch.jsx'

import './App.css'

function App() {

  return (
    <div className='bg-white h-screen flex justify-center items-start p-8'>
      <div className='w-2/5'>
    <AddMessage />
   <SpotifySearch />
    </div>
    </div>
  )
}

export default App
