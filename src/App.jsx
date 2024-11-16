import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.sass';
import Nav from './frontend/Nav/Nav';
import HomePage from './frontend/HomePage/homePage';
import Footer from './frontend/Footer/Footer';
import Login from './frontend/Components/loginPage/login';
import CaregiverDashboard from './frontend/Components/caregiverPage/caregiver';

export default function App() {
  // State to track whether the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className='App'>
        {/* Routes for main content */}
        <Routes>
          {/* Home Page */}
          <Route
            path='/'
            element={
              <>
                <div className='Main-content'>
                  <Nav />
                  <HomePage />
                </div>
                <Footer />
              </>
            }
          />

          {/* Login Page */}
          <Route
            path='/sign-in'
            element={
              <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />

          {/* Caregiver Dashboard */}
          <Route
            path='/dashboard'
            element={
              isAuthenticated ? <CaregiverDashboard /> : <HomePage />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
