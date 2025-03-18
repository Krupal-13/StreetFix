import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt, FaClock, FaBell, FaCheckCircle, FaUsers, FaShieldAlt } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to <span className="highlight">StreetFix</span></h1>
        <p>Your city, your responsibility. Report issues, track progress, and make a difference.</p>
        <a href="/report" className="btn btn-warning btn-lg shadow">Report an Issue</a>
      </header>

      {/* Key Features */}
      <section className="features">
        <div className="feature-box">
          <FaMapMarkerAlt className="feature-icon" />
          <div class="bg-light p-3">
          <h4 class="text-dark">Location-Based Reports</h4>
          <p class="text-dark">Pinpoint issues on the map and provide accurate details.</p>
          </div>
        </div>
        <div className="feature-box">
          <FaClock className="feature-icon" />
          <div class="bg-light p-3">
          <h4 class="text-dark">Real-Time Tracking</h4>
          <p class="text-dark">Monitor your reports as they progress toward resolution.</p>
          </div>
        </div>
        <div className="feature-box">
          <FaBell className="feature-icon" />
          <div class="bg-light p-3">
          <h4 class="text-dark">Instant Notifications</h4>
          <p class="text-dark">Stay updated on fixes and improvements in your area.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How StreetFix Works</h2>
        <div className="steps">
          <div className="step">
            <FaCheckCircle className="step-icon" />
            <div class="bg-light p-3">
              <h5 class="text-dark">Location-Based Reports</h5>
              <p class="text-dark">Pinpoint issues with exact locations.</p>
            </div>
          </div>
          <div className="step">
            <FaUsers className="step-icon" />
            <div class="bg-light p-3">
            <h5 class="text-dark">Community Driven</h5>
            <p class="text-dark">Collaborate with others to prioritize key concerns.</p>
            </div>
          </div>
          <div className="step">
            <FaShieldAlt className="step-icon" />
            <div class="bg-light p-3">
            <h5 class="text-dark">Resolved Efficiently</h5>
            <p class="text-dark">Authorities take action and keep the city safe & clean.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h3>Join the Movement for a Cleaner & Safer City</h3>
        <a href="/report" className="btn btn-outline-light btn-lg">Start Reporting</a>
      </section>
    </div>
  );
}

export default Home;
