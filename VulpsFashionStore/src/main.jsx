import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // Explicitly add .jsx extension

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Note: reportWebVitals is a CRA feature and usually isn't 
// needed in a clean Vite setup, so we can remove it.