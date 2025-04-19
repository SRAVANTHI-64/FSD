import React, { useState, useEffect } from "react";
import "./Journal.css"; // Optional styling

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");

  // Load saved entries from local storage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  // Save entries to local storage
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  // Add a new entry
  const addEntry = () => {
    if (text.trim() === "") return;
    const newEntry = { id: Date.now(), content: text };
    setEntries([...entries, newEntry]);
    setText(""); // Clear input after adding
  };

  // Delete an entry
  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="journal-container">
      <h2>Journaling</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts here..."
      />
      <button onClick={addEntry}>Save Entry</button>

      <div className="journal-entries">
        {entries.map((entry) => (
          <div key={entry.id} className="journal-entry">
            <p>{entry.content}</p>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;