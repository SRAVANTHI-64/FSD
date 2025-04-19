import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Sentiment from "sentiment";
import "./WeeklyAnalysis.css";

const WeeklyAnalysis = ({ journalEntries }) => {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    analyzeWeeklySentiments();
  }, [journalEntries]);

  const analyzeWeeklySentiments = () => {
    const sentiment = new Sentiment();
    let data = [];

    journalEntries.forEach((entry) => {
      const result = sentiment.analyze(entry.content);
      data.push({ date: new Date(entry.id).toLocaleDateString(), score: result.score });
    });

    setWeeklyData(data);
  };

  const chartData = {
    labels: weeklyData.map((d) => d.date),
    datasets: [
      {
        label: "Sentiment Score",
        data: weeklyData.map((d) => d.score),
        borderColor: "#4caf50",
        fill: false,
      },
    ],
  };

  return (
    <div className="weekly-analysis">
      <h3>Weekly Journal Analysis</h3>
      {weeklyData.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No journal entries yet.</p>
      )}
    </div>
  );
};

export default WeeklyAnalysis;