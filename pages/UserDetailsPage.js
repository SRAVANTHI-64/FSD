import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./UserDetailsPage.css";

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate(); // Initialize navigation function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("User Details Submitted:", userDetails); // Debugging
    localStorage.setItem("userDetails", JSON.stringify(userDetails)); // Store in local storage
    navigate("/journal"); // Navigate to the journal page
  };

  return (
    <div className="user-details-container">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={userDetails.name} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={userDetails.age} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={userDetails.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserDetailsPage;
