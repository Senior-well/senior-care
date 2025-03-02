import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.sass';

import Nav from './frontend/Nav/Nav'; // Homepage navbar
import HomePage from './frontend/HomePage/HomePage'; // Homepage content
import Caregiver from './frontend/Caregiver/Caregiver'; // Caregiver page content
import Footer from './frontend/Footer/Footer'; // Shared footer
import Login from './frontend/Login/Login'; // Login page
import Reminder from './frontend/Reminder/Reminder'; // Reminder page
import Elder from './frontend/Elder/Elder'; // Elder page
import AI from './frontend/AI/AI';

function Layout() {
  const location = useLocation(); // Get the current route

  return (
    <div className="App">
      {location.pathname === "/" && <Nav />}  {/* Show Nav only on homepage */}

      <div className="Main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/caregiver" element={<Caregiver />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/elder/:elderId" element={<Elder />} />
          <Route path="/ai" element={<AI />} />
        </Routes>
      </div>

      <Footer /> {/* Footer remains on all pages */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />  {/* Keep Layout inside Router */}
    </Router>
  );
}