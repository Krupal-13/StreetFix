import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>The Page you are trying to find does not exists</h1>
      <p>Please enter correct Url or <Link to="/">Go back to Home</Link></p>
    </div>
  );
}

export default NotFound;
