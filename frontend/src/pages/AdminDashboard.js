import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    date: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/issues');
      const data = await res.json();
      setIssues(data);
      setFilteredIssues(data);
    } catch (err) {
      setError('Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/issues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setIssues(prev =>
          prev.map(issue => (issue._id === id ? { ...issue, status } : issue))
        );
        setFilteredIssues(prev =>
          prev.map(issue => (issue._id === id ? { ...issue, status } : issue))
        );
      } else {
        alert('Failed to update status: ' + (data.msg || 'Unknown error'));
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let filtered = [...issues];
    if (filters.category) {
      filtered = filtered.filter(issue => issue.category === filters.category);
    }
    if (filters.location) {
      filtered = filtered.filter(issue =>
        issue.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.date) {
      filtered = filtered.filter(issue => {
        const issueDate = new Date(issue.submitted).toISOString().split('T')[0];
        return issueDate === filters.date;
      });
    }
    setFilteredIssues(filtered);
  }, [filters, issues]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Reported Issues</h1>

      {loading && <p>Loading issues...</p>}
      {error && <p className="error">{error}</p>}

      <div className="filters">
        <label>
          Category:
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="pothole">Pothole</option>
            <option value="streetlight">Broken Streetlight</option>
            <option value="garbage">Garbage/Waste Issue</option>
            <option value="graffiti">Graffiti</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Filter by location"
          />
        </label>

      </div>

      <table className="issues-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map(issue => (
            <tr key={issue._id}>
              <td>{issue._id}</td>
              <td>{issue.title}</td>
              <td>{issue.category}</td>
              <td>{issue.location}</td>
              <td>{issue.submitted ? new Date(issue.submitted).toLocaleDateString() : 'N/A'}</td>
              <td>{issue.status || 'Pending'}</td>
              <td>
                <select
                  value={issue.status || 'Pending'}
                  onChange={(e) => updateStatus(issue._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
