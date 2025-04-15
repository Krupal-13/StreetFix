import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Link back to login
import './LoginSignup.css'; // Shared CSS
import { signupUser } from '../api'; 
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error on input change
    setSuccess('');
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
  
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
  
    try {
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
  
      if (response.msg === "User registered successfully") {
        // Do not auto login user
        setSuccess('Account created successfully! Please log in.');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError(response.msg || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };
  

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">Join StreetFix and start making a difference.</p>

        {error && <div className="auth-error-message">{error}</div>}
        {success && <div className="auth-success-message">{success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-submit-button">
            Sign Up
          </button>
        </form>

        <div className="auth-switch-link">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
