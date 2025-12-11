import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import { AuthProvider } from './context/AuthContext';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
      </LocalizationProvider>
    </AuthProvider>
  </React.StrictMode>
);
