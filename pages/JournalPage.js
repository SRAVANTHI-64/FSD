import React, { useState, useEffect } from "react";
import Journal from "../components/Journal";
import AIAnalysis from "../components/AIAnalysis";
import WeeklyAnalysis from "../components/WeeklyAnalysis";
import "./JournalPage.css";

const JournalPage = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setJournalEntries(savedEntries);
  }, []);

  const handleNewEntry = (newEntry) => {
    setJournalEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <div className="journal-background">
      <div className="journal-container">
        <h2>Journal Page</h2>
        <Journal onSave={handleNewEntry} />
        <AIAnalysis journalText={journalEntries.length > 0 ? journalEntries[journalEntries.length - 1].content : ""} />
        <WeeklyAnalysis journalEntries={journalEntries} />
      </div>
    </div>
  );
};

export default JournalPage;
