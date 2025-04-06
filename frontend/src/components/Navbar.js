import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">StreetFix</Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/report" className="nav-link">Report Issue</Link>
          </li>
          <li className="nav-item">
            <Link to="/track" className="nav-link">Track Issues</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          {/* Add Login/Signup Links */}
          <li className="nav-item nav-item-auth">
            <Link to="/login" className="nav-link nav-link-login">Log In</Link>
          </li>
          <li className="nav-item nav-item-auth">
            <Link to="/signup" className="nav-link nav-link-signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
