import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import { AuthProvider } from './context/AuthContext';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
