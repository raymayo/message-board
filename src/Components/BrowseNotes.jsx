import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import NoteCard from './NoteCard.jsx'

const BrowseNotes = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const response = await axios.get('http://localhost:5000/notes');
        setNotes(response.data);
      }catch (error) {
        setError(error);
      }finally {
        setLoading(false);
  
    }
  }
  fetchNotes();
  },[]);

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  console.log(notes)



  return (
<div className='w-4/10 grid justify-center gap-6 grid-cols-2 p-6 py-20'>
 {notes.map((note) => (
    <NoteCard key={note._id} {...note} />
  ))}
</div>
  )
}

export default BrowseNotes