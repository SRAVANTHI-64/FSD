import React, { useState } from "react";
import "./ConsultationPage.css";

const doctors = [
  { id: 1, name: "Dr. Aakash Mehta", phone: "9876543210", email: "aakash@hospital.com", workplace: "Apollo Hospital" },
  { id: 2, name: "Dr. Priya Sharma", phone: "8765432109", email: "priya@mentalhealth.com", workplace: "Fortis Healthcare" },
  { id: 3, name: "Dr. Rohan Kapoor", phone: "7654321098", email: "rohan@neurology.com", workplace: "AIIMS Delhi" }
];

const ConsultationPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="consultation-container">
      <h2>Consult a Doctor</h2>
      <ul className="doctor-list">
        {doctors.map((doctor) => (
          <li key={doctor.id} onClick={() => setSelectedDoctor(doctor)}>
            {doctor.name}
          </li>
        ))}
      </ul>

      {selectedDoctor && (
        <div className="doctor-details">
          <h3>{selectedDoctor.name}</h3>
          <p><strong>Phone:</strong> {selectedDoctor.phone}</p>
          <p><strong>Email:</strong> {selectedDoctor.email}</p>
          <p><strong>Workplace:</strong> {selectedDoctor.workplace}</p>
          <button onClick={() => setSelectedDoctor(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ConsultationPage;