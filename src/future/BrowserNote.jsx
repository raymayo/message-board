import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import NoteCard from "./NoteCard.jsx";
import { Link } from "react-router-dom";

const FilterComponent = ({ filters, setFilters, fetchNotes }) => (
  <div className="w-full flex flex-col gap-4">
    {/* Recipient */}
    <label className="flex flex-col gap-2 w-full">
      <h1 className="text-sm font-medium">Recipient</h1>
      <input
        type="text"
        placeholder="Enter recipient's name"
        className="border border-zinc-300 shadow-2xs text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:border focus:border-black transition-all duration-300"
        onChange={(e) => setFilters({ ...filters, recipient: e.target.value })}
        value={filters.recipient}
      />
    </label>

    {/* Department & Year Level */}
    <div className="flex gap-4 w-full">
      {[
        { name: "department", label: "Department", options: ["CSD", "HM", "EXEC", "EDUC"] },
        { name: "yearLevel", label: "Year Level", options: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
      ].map(({ name, label, options }) => (
        <label key={name} className="flex flex-col gap-2 w-full">
          <h1 className="text-sm font-medium">{label}</h1>
          <select
            name={name}
            className="cursor-pointer border border-zinc-300 shadow-2xs text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:border-black transition-all duration-300"
            onChange={(e) => setFilters({ ...filters, [name]: e.target.value })}
            value={filters[name]}
          >
            <option value="" disabled>Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      ))}
    </div>

    {/* Search Button */}
    <button
      onClick={() => fetchNotes(true)}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Search
    </button>
  </div>
);

const BrowseNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({ recipient: "", department: "", yearLevel: "" });
  const observerRef = useRef(null);

  const fetchNotes = useCallback(async (reset = false) => {
    if (reset) {
      setNotes([]);
      setHasMore(true);
    }

    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const lastId = reset ? null : notes.length > 0 ? notes[notes.length - 1]._id : null;
      const { data } = await axios.get("http://localhost:5000/notes", {
        params: { ...filters, lastId, limit: 10 },
      });

      setNotes((prev) => (reset ? data : [...prev, ...data]));
      if (data.length === 0) setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, hasMore, loading, notes]);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNotes();
    }, { threshold: 1.0 });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="w-2/5 grid justify-center gap-6 grid-cols-2 p-6 py-20">
      <FilterComponent filters={filters} setFilters={setFilters} fetchNotes={fetchNotes} />

      {/* Notes List */}
      {notes.length > 0 ? notes.map((note) => (
        <Link to={`/notes/${note._id}`} key={note._id}>
          <NoteCard {...note} />
        </Link>
      )) : <p>No notes found.</p>}

      {/* Infinite Scroll Trigger */}
      {hasMore && <div ref={observerRef} style={{ height: "20px" }} />}
      {loading && <p>Loading more notes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};

export default BrowseNotes;
