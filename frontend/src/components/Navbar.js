import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

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
          {user ? (
            <>
              <li className="nav-item nav-item-auth">
                <span className="nav-link nav-link-user">Hello, {user.name}</span>
              </li>
              <li className="nav-item nav-item-auth">
                <button className="nav-link nav-link-signout" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item nav-item-auth">
                <Link to="/login" className="nav-link nav-link-login">Log In</Link>
              </li>
              <li className="nav-item nav-item-auth">
                <Link to="/signup" className="nav-link nav-link-signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
