// src/components/Loading.js
import React from 'react';
import '../assets/styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Chargement en cours...</p>
    </div>
  );
};

export default Loading;
