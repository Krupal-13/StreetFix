import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this CSS file is updated

import heroBg from './images/A_flat-style_digital_illustration_in_the_backgroun.png'; // Import the image

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: '100% 140%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Improve Your City, One Report at a Time
          </h1>
          <p className="hero-subtitle">
            StreetFix connects citizens with local authorities to resolve urban issues efficiently.
          </p>
          <Link to="/report" className="hero-cta-button">Report an Issue Now</Link>
        </div>
        <div className="hero-visual">
          <div className="visual-placeholder"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📍</span>
            <h3>Easy Reporting</h3>
            <p>Submit issues quickly with location and photos.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⏱️</span>
            <h3>Real-Time Tracking</h3>
            <p>Monitor the status of your reports live.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔔</span>
            <h3>Instant Updates</h3>
            <p>Get notified when issues are resolved.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">Simple 4-Step Process</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Submit Report</h4>
            <p>Detail the issue with location and media.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>Verification</h4>
            <p>Our team confirms the report details.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Resolution</h4>
            <p>Issue assigned to the relevant department.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h4>Completion</h4>
            <p>Receive confirmation once resolved.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join thousands of citizens improving their communities.</p>
        <Link to="/report" className="cta-button-secondary">Start Reporting Today</Link>
      </section>
    </div>
  );
}

export default Home;
