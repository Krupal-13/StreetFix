import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReportIssue.css";

function ReportIssue() {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueType, setIssueType] = useState("Pothole");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    console.log({
      issueTitle,
      issueType,
      description,
      location,
      images
    });
    alert("Issue reported successfully!");
  };

  return (
    <div className="report-issue-container">
      <div className="form-container">
        <h2>Report an Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Issue Title</label>
            <input
              type="text"
              className="form-control"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              placeholder="Enter the issue title"
              required
            />
          </div>

          <div className="form-group">
            <label>Issue Type</label>
            <select
              className="form-control"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option>Pothole</option>
              <option>Streetlight Issue</option>
              <option>Garbage Collection</option>
              <option>Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the location of the issue"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Images</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImages(e.target.files)}
              multiple
            />
          </div>

          <button type="submit" className="btn btn-warning mt-3">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;
