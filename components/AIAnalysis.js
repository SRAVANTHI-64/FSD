import React, { useState } from "react";
import Sentiment from "sentiment";
import "./AIAnalysis.css";

const AIAnalysis = ({ journalText }) => {
  const [analysis, setAnalysis] = useState(null);
  const [aiEnabled, setAiEnabled] = useState(true);

  const analyzeText = () => {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(journalText);
    
    let advice = "Neutral entry. Keep expressing yourself!";
    if (result.score > 0) {
      advice = "You seem positive! Keep up the good vibes!";
    } else if (result.score < 0) {
      advice = "You're feeling down. Try talking to someone or doing something relaxing.";
    }

    setAnalysis({
      score: result.score,
      advice: advice,
    });
  };

  return (
    <div className="ai-analysis">
      <h3>AI Suggestions & Advice</h3>
      <label>
        <input 
          type="checkbox" 
          checked={aiEnabled} 
          onChange={() => setAiEnabled(!aiEnabled)} 
        /> Enable AI Analysis
      </label>

      {aiEnabled && (
        <div>
          <button onClick={analyzeText}>Analyze Journal</button>
          {analysis && (
            <div className="analysis-result">
              <p><strong>Sentiment Score:</strong> {analysis.score}</p>
              <p><strong>Advice:</strong> {analysis.advice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;