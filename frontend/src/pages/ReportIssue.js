import React, { useState } from 'react';
import { reportIssue } from '../api';
import './ReportIssue.css'; // Ensure this CSS file is updated

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'pothole',
    location: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus('submitting'); // Indicate submission start

    try {
      const response = await reportIssue(formData);

      if (response.msg === 'Issue reported successfully') {
        setSubmitStatus('success');
        setFormData({ title: '', description: '', category: 'pothole', location: '' });
        setErrors({});
      } else {
        throw new Error('Submission failed: ' + (response.msg || 'Unknown error'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrors(prev => ({ ...prev, general: 'Failed to submit report. Please try again.' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null })); // Clear error on change
    }
  };

  return (
    <div className="report-issue-page">
      <div className="form-container">
        <h1 className="form-title">Report a New Issue</h1>
        <p className="form-subtitle">Help improve your community by reporting problems.</p>

        {submitStatus === 'success' && (
          <div className="alert alert-success">Report submitted successfully! Thank you.</div>
        )}
        {submitStatus === 'error' && errors.general && (
          <div className="alert alert-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="title">Issue Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Large pothole on Main St"
              className={errors.title ? 'input-error' : ''}
              required
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide details like size, severity, and exact location..."
              rows="4"
              className={errors.description ? 'input-error' : ''}
              required
            ></textarea>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="pothole">Pothole</option>
              <option value="streetlight">Broken Streetlight</option>
              <option value="garbage">Garbage/Waste Issue</option>
              <option value="graffiti">Graffiti</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Address, intersection, or landmark"
              className={errors.location ? 'input-error' : ''}
              required
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={submitStatus === 'submitting'}
          >
            {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;

