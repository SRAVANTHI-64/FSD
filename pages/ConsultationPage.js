import React, { useState } from "react";
import "./ConsultationPage.css"
const doctors = [
  {
    name: "Dr. Asha Sharma",
    specialty: "Depression",
    experience: "10 years",
    contact: "asha@example.com",
  },
  {
    name: "Dr. Ravi Verma",
    specialty: "Anxiety",
    experience: "8 years",
    contact: "ravi@example.com",
  },
  {
    name: "Dr. Naina Kapoor",
    specialty: "PTSD",
    experience: "12 years",
    contact: "naina@example.com",
  },
  {
    name: "Dr. Sameer Khan",
    specialty: "Insomnia",
    experience: "7 years",
    contact: "sameer@example.com",
  },
  {
    name: "Dr. Priya Iyer",
    specialty: "General Mental Health",
    experience: "15 years",
    contact: "priya@example.com",
  },
];

const ConsultationPage = () => {
  const [disease, setDisease] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = doctors.filter((doc) =>
      doc.specialty.toLowerCase().includes(disease.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="consultation-container">
      <h2>Consultation</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter your issue/disease:</label>
        <input
          type="text"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          placeholder="e.g. depression, anxiety"
        />
        <button type="submit">Find Doctors</button>
      </form>

      {filteredDoctors.length > 0 ? (
        <div>
          <h3>Available Doctors:</h3>
          <ul>
            {filteredDoctors.map((doc, index) => (
              <li key={index}>
                <strong>{doc.name}</strong><br />
                Specialty: {doc.specialty}<br />
                Experience: {doc.experience}<br />
                Contact: {doc.contact}<br />
              </li>
            ))}
          </ul>
        </div>
      ) : disease ? (
        <p>No doctors found for "{disease}"</p>
      ) : null}
    </div>
  );
};

export default ConsultationPage;
