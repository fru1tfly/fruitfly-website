import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from 'app/App';
import EPK from 'app/epk/EPK';
import Admin from 'app/admin/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="epk" element={<EPK />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

