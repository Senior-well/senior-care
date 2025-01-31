import React, { useState } from 'react';
import './App.sass';
import Nav from './frontend/Nav/Nav'; // Homepage navbar
import HomePage from './frontend/HomePage/HomePage'; // Homepage content
import Caregiver from './frontend/Caregiver/Caregiver'; // Caregiver page content
import Footer from './frontend/Footer/Footer'; // Shared footer
import Login from './frontend/Login/Login'; // Shared footer
import Reminder from './frontend/Reminder/Reminder'; // Shared footer



export default function App() {
  return (
    <div className='App'>
      <div className='Main-content'>
        {/* <Nav /> */}
        {/* <Caregiver /> */}
        {/* <Login /> */}
        <Reminder />
      </div>
      <Footer />
    </div >
  );

}
