import React from 'react';
import './About.css'; 

function About() {
  return (
    <div className="about-page">
      
      <section className="page-header">
        <div className="header-content">
          <h1>About StreetFix</h1>
          <p>Connecting communities and local governments for better cities.</p>
        </div>
      </section>

      
      <section className="mission-section content-section">
        <h2>Our Mission</h2>
        <p>
          StreetFix was founded on the belief that technology can bridge the gap
          between citizens and their local governments. Our mission is to empower
          individuals to easily report non-emergency issues in their neighborhoods
          and provide municipalities with the tools to efficiently track, manage,
          and resolve these issues, fostering transparency and collaboration.
        </p>
      </section>

      
      <section className="how-we-help-section content-section bg-light">
        <h2>How We Help</h2>
        <div className="help-grid">
          <div className="help-item">
            <span className="help-icon">👥</span>
            <h3>Empower Citizens</h3>
            <p>Provide a simple, accessible platform for reporting issues.</p>
          </div>
          <div className="help-item">
            <span className="help-icon">🏢</span>
            <h3>Streamline Government</h3>
            <p>Offer tools for efficient issue tracking and management.</p>
          </div>
          <div className="help-item">
            <span className="help-icon">🔗</span>
            <h3>Foster Collaboration</h3>
            <p>Create transparency and build trust between residents and officials.</p>
          </div>
        </div>
      </section>

      
      <section className="future-goals-section content-section">
        <h2>Looking Ahead</h2>
        <p>
          We are constantly innovating to improve StreetFix. Future plans include
          integrating AI for issue categorization, developing advanced analytics
          for city planning, expanding mobile app features, and partnering with more
          municipalities worldwide to build smarter, more responsive cities together.
        </p>
        
        <div className="roadmap-placeholder">Future Roadmap Visualization</div>
      </section>
    </div>
  );
}

export default About;
