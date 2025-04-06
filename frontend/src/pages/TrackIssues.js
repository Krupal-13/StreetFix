import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrackIssues.css'; // Ensure this CSS file is updated

function TrackIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data fetching - replace with actual API call
  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Replace with your actual API endpoint: e.g., axios.get('/api/issues')
        // For now, using mock data
        const mockData = [
          { id: 1, title: 'Large pothole on Elm St', status: 'Resolved', submitted: '2024-04-01', category: 'Pothole' },
          { id: 2, title: 'Streetlight out at Oak & Main', status: 'In Progress', submitted: '2024-04-03', category: 'Streetlight' },
          { id: 3, title: 'Overflowing bin near park', status: 'Pending', submitted: '2024-04-05', category: 'Garbage' },
          { id: 4, title: 'Graffiti on bridge wall', status: 'Pending', submitted: '2024-04-06', category: 'Graffiti' },
        ];
        setIssues(mockData);

      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to load issues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []); // Empty dependency array means this runs once on mount

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'status-resolved';
      case 'in progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="track-issues-page">
      <h1 className="page-title">Track Your Reported Issues</h1>

      {loading && <div className="loading-indicator">Loading issues...</div>}
      {error && <div className="error-message-box">{error}</div>}

      {!loading && !error && issues.length === 0 && (
        <p className="no-issues-message">You haven't reported any issues yet.</p>
      )}

      {!loading && !error && issues.length > 0 && (
        <div className="issues-list-container">
          <table className="issues-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(issue => (
                <tr key={issue.id} className="issue-row">
                  <td>#{issue.id}</td>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>{new Date(issue.submitted).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TrackIssues;
