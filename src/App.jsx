import React from 'react';
import './App.sass';
import Nav from './frontend/Nav/Nav';
import HomePage from './frontend/HomePage/homePage';
import Footer from './frontend/Footer/Footer';

export default function App() {
  return (
    <div className='App'>
      <div className='Main-content'>
      <Nav /> 
      <HomePage /> 
      </div>
      <Footer />
    </div>
  );

}