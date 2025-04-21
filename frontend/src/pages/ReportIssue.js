import React, { useState, useContext, useEffect } from 'react';
import { reportIssue } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ReportIssue.css';

function ReportIssue() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'pothole',
    location: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
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

    setSubmitStatus('submitting');

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('category', formData.category);
      formPayload.append('location', formData.location);
      if (imageFile) {
        formPayload.append('image', imageFile);
      }

      const response = await fetch('http://localhost:5000/api/issues', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok && data.msg === 'Issue reported successfully') {
        setSubmitStatus('success');
        setFormData({ title: '', description: '', category: 'pothole', location: '' });
        setImageFile(null);
        setErrors({});
      } else {
        throw new Error(data.msg || 'Unknown error');
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
      setErrors(prev => ({ ...prev, [name]: null })); 
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: null }));
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

          <div className="form-group">
            <label htmlFor="image">Upload Photo (Optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className={errors.image ? 'input-error' : ''}
            />
            {imageFile && <span className="file-name-display">Selected: {imageFile.name}</span>}
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