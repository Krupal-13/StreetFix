import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import { loginUser } from '../api';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (response.msg === "Login successful") {
        login({ name: response.name, email: formData.email });
        alert(`Welcome, ${response.name}! You have logged in successfully.`);
        setFormData({ email: '', password: '' });
        navigate('/');
      } else {
        setError(response.msg || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Welcome Back!</h1>
        <p className="auth-subtitle">Log in to access your account and track issues.</p>

        {error && <div className="auth-error-message">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
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
              placeholder="Enter your password"
              required
            />
            {/* Optional: Add Forgot Password link here */}
          </div>

          <button type="submit" className="auth-submit-button">
            Log In
          </button>
        </form>

        <div className="auth-switch-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
