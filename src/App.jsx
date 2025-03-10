
import  AddMessage  from './Components/AddMessage'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import SpotifySearch from './Components/SpotifySearch.jsx'

import './App.css'

function App() {

  return (
    <div className='bg-white w-screen h-screen flex flex-col justify-between items-center'>
    <Header />
      <div className='w-2/5'>
    <AddMessage />
   {/* <SpotifySearch /> */}
    </div>
    <Footer/>
    </div>
  )
}

export default App
