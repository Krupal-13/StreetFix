import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './MyReports.css';

function MyReports() {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/issues/user/${user._id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await res.json();
      setReports(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/issues/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Failed to delete report');
      }
      setReports(prev => prev.filter(report => report._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (id) => {
    // For simplicity, redirect to ReportIssue page with id param for editing
    // You can implement a dedicated edit page if needed
    window.location.href = `/report?id=${id}`;
  };

  return (
    <div className="my-reports-page">
      <h1>My Reports</h1>
      {loading && <p>Loading your reports...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && reports.length === 0 && <p>You have not reported any issues yet.</p>}
      <table className="reports-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report._id}>
              <td>{report.title}</td>
              <td>{report.category}</td>
              <td>{report.location}</td>
              <td>{report.submitted ? new Date(report.submitted).toLocaleDateString() : 'N/A'}</td>
              <td>{report.status || 'Pending'}</td>
              <td>
                {(!report.status || report.status === 'Pending') && (
                  <>
                    <button onClick={() => handleEdit(report._id)}>Edit</button>
                    <button onClick={() => handleDelete(report._id)}>Delete</button>
                  </>
                )}
                {(report.status && report.status !== 'Pending') && (
                  <span>Locked</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyReports;
