import { Routes, Route } from 'react-router-dom';
import AddMessage from './Components/AddMessage';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import BrowseNotes from './Components/BrowseNotes.jsx';
import NotePage from './Components/NotePage.jsx';
import Home from './Components/Home.jsx';
import Success from './Components/Success.jsx';
import { Analytics } from '@vercel/analytics/react';

import './App.css';

function App() {
	return (
		<div className="bg-white w-screen h-screen flex flex-col justify-between items-center overflow-x-hidden">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create" element={<AddMessage />} />
				<Route path="/browse" element={<BrowseNotes />} />
				<Route path="/notes/:id" element={<NotePage />} />
				<Route path="/success" element={<Success />} />
				{/* <div className='w-2/5'>
    <AddMessage />
    </div> */}
			</Routes>
			<Footer />
			<Analytics />
		</div>
	);
}

export default App;
