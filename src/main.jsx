import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('app')).render(  // Target 'app' instead of 'root'
  <StrictMode>
    <App />
  </StrictMode>,
);
