import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';

import App from 'app/computer/App';
import EPK from 'app/epk/EPK';
import Admin from 'app/admin/Admin';
import AdminShows from 'app/admin/shows';
import AdminVenues from 'app/admin/venues';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="epk" element={<EPK />} />
        <Route path="admin" element={<Admin />}>
          <Route path="shows" element={<AdminShows />} />
          <Route path="venues" element={<AdminVenues />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

