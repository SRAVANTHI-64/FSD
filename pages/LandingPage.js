// src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import logo from "../pages/mindguide-logo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <img src={logo} alt="MindGuide Logo" className="logo" />
      <h1>Welcome to MindGuide</h1>
      <button onClick={() => navigate("/login")}>Start</button> {/* Navigate to login */}
    </div>
  );
};

export default LandingPage;
