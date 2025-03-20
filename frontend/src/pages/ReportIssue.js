import React, { useState } from 'react';
import './ReportIssue.css';

const ReportIssue = () => {
    const [showTips, setShowTips] = useState(false);

    const toggleTips = () => {
        setShowTips(!showTips);
    };

    return (
        <div className="report-issue-container">
            {/* Trending Reviews Section */}
            <div className="trending-reviews">
                <h3>Trending Reviews</h3>
                <p><strong>John Doe:</strong> Reported a pothole and it got fixed within a week!</p>
                <p><strong>Jane Smith:</strong> The streetlight issue was resolved promptly.</p>
                <p><strong>Mike Johnson:</strong> Garbage collection request was handled well.</p>
            </div>

            {/* Report Form Section */}
            <div className="report-form">
                <h2>Report an Issue</h2>
                <form>
                    <label>Issue Title</label>
                    <input type="text" placeholder="Enter the issue title" />

                    <label>Issue Type</label>
                    <select>
                        <option>Select an issue type</option>
                        <option>Pothole</option>
                        <option>Streetlight</option>
                        <option>Garbage Collection</option>
                        <option>Water Leakage</option>
                        <option>Other</option>
                    </select>

                    <label>Description</label>
                    <textarea placeholder="Describe the issue in detail" rows="4"></textarea>

                    <label>Location</label>
                    <div className="location-inputs">
                        <input type="text" placeholder="Enter locality" />
                        <input type="text" placeholder="Enter pincode" />
                    </div>

                    <label>Upload Images</label>
                    <input type="file" accept="image/*" multiple />

                    <button type="submit">Submit</button>
                </form>
            </div>

            {/* Helpful Tips Section */}
            <div className="helpful-tips">
                <div className="tips-title" onClick={toggleTips}>
                    Helpful Tips or Instructions {showTips ? '▼' : '▲'}
                </div>
                {showTips && (
                    <div className="tips-content">
                        <h4>How to describe your issue effectively</h4>
                        <p>Provide clear and concise details about the issue, including relevant descriptions such as location, size, and impact.</p>
                        <h4>Why providing an accurate location is important</h4>
                        <p>Ensure you provide accurate locality names and pincodes for faster resolution.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportIssue;
