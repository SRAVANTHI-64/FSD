// src/components/Navbar.js
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  // Hide navbar on Landing, Login, and User Details pages
  if (["/", "/login", "/user-details"].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/journal" activeClassName="active">Journal</NavLink>
        </li>
        <li>
          <NavLink to="/consultation" activeClassName="active">Consultation</NavLink>
        </li>
        <li>
          <NavLink to="/todo" activeClassName="active">To-Do List</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
