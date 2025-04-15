import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ImageView.css';

function ImageView() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get image URL from query parameter ?img=
  const params = new URLSearchParams(location.search);
  const imageUrl = params.get('img');

  if (!imageUrl) {
    return (
      <div className="image-view-page">
        <p>No image to display.</p>
        <button onClick={() => navigate('/track')}>Go to Track Issues</button>
      </div>
    );
  }

  return (
    <div className="image-view-page">
      <button className="back-button" onClick={() => navigate('/track')}>Back to Track Issues</button>
      <img src={imageUrl} alt="Large view" className="large-image" />
    </div>
  );
}

export default ImageView;
