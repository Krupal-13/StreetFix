import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt, FaClock, FaBell } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to <span className="highlight">StreetFix</span></h1>
        <p>A smart way to report and resolve public issues in your city.</p>
        <a href="/report" className="btn btn-warning btn-lg shadow">
          Report an Issue
        </a>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-box">
          <FaMapMarkerAlt className="feature-icon" />
            <div class="bg-light p-3">
              <h5 class="text-dark">Location-Based Reports</h5>
                <p class="text-dark">Pinpoint issues with exact locations.</p>
            </div>
        </div>
        <div className="feature-box">
          <FaClock className="feature-icon" />
          <div class="bg-light p-3">
          <h4 class="text-dark">Real-Time Tracking</h4>
          <p class="text-dark">Monitor the progress of your reports.</p>
          </div>
        </div>
        <div className="feature-box">
          <FaBell className="feature-icon" />
          <div class="bg-light p-3">
          <h4 class="text-dark">Instant Notifications</h4>
          <p class="text-dark">Get notified when an issue is resolved.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h3>Help Us Keep the City Clean & Safe</h3>
        <a href="/report" className="btn btn-outline-light btn-lg">
          Start Reporting
        </a>
      </section>
    </div>
  );
}

export default Home;
