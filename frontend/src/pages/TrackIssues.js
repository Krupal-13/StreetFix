import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { fetchIssues } from '../api';
import './TrackIssues.css'; // Ensure this CSS file is updated

function TrackIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [showImageView, setShowImageView] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchIssues();
        setIssues(data);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to load issues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, []);

  // Separate issues into ongoing and resolved using useMemo
  const ongoingIssues = useMemo(() => {
    // Consider 'Pending' or empty status as ongoing
    return issues.filter(issue => !issue.status || issue.status.toLowerCase() !== 'resolved');
  }, [issues]);

  const resolvedIssues = useMemo(() => {
    return issues.filter(issue => issue.status && issue.status.toLowerCase() === 'resolved');
  }, [issues]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'status-resolved';
      case 'in progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const openImageView = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageView(true);
  };

  const closeImageView = () => {
    setSelectedImage(null);
    setShowImageView(false);
  };

  return (
    <div className="track-issues-page">
      <h1 className="page-title">Track Your Reported Issues</h1>

      {loading && <div className="loading-indicator">Loading issues...</div>}
      {error && <div className="error-message-box">{error}</div>}

      {!loading && !error && issues.length === 0 && (
        <p className="no-issues-message">You haven't reported any issues yet.</p>
      )}

      {/* Ongoing Issues Section */}
      {!loading && !error && ongoingIssues.length > 0 && (
        <div className="issues-section">
          <h2 className="section-title">Ongoing Issues</h2>
          <div className="issues-list-container">
            <table className="issues-table ongoing-issues-table">
              <thead>
                <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {ongoingIssues.map(issue => (
                <tr key={issue._id} className="issue-row">
                  <td>#{issue._id}</td>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>{issue.submitted ? new Date(issue.submitted).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(issue.status || '')}`}>
                      {issue.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    {issue.imageUrl ? (
                      <img
                        src={`http://localhost:5000${issue.imageUrl}`}
                        alt="Issue"
                        className="issue-thumbnail"
                        onClick={() => openImageView(`http://localhost:5000${issue.imageUrl}`)}
                        style={{ cursor: 'pointer', maxWidth: '50px', maxHeight: '50px' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Resolved Issues Section */}
      {!loading && !error && resolvedIssues.length > 0 && (
        <div className="issues-section resolved-section">
           <h2 className="section-title">Resolved Issues</h2>
           <div className="issues-list-container">
            <table className="issues-table resolved-issues-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {resolvedIssues.map(issue => (
                  <tr key={issue._id} className="issue-row resolved-row">
                    <td>#{issue._id}</td>
                    <td>{issue.title}</td>
                    <td>{issue.category}</td>
                    <td>{issue.submitted ? new Date(issue.submitted).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(issue.status || '')}`}>
                        {issue.status || 'Pending'} {/* Should always be Resolved here */}
                      </span>
                    </td>
                    <td>
                      {issue.imageUrl ? (
                        <img
                          src={`http://localhost:5000${issue.imageUrl}`}
                          alt="Issue"
                          className="issue-thumbnail"
                          onClick={() => openImageView(`http://localhost:5000${issue.imageUrl}`)}
                          style={{ cursor: 'pointer', maxWidth: '50px', maxHeight: '50px' }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Combined check for no issues at all */}
      {!loading && !error && ongoingIssues.length === 0 && resolvedIssues.length === 0 && (
         <p className="no-issues-message">No issues found.</p>
      )}


      {showImageView && (
        <div className="image-view-overlay" onClick={closeImageView}>
          <div className="image-view-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Issue Large" className="image-view-large" />
            <button className="image-view-close-button" onClick={closeImageView}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackIssues;
