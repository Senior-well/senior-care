import React from 'react';
import './App.sass';
import Nav from './frontend/Nav/Nav';
import HomePage from './frontend/HomePage/homePage';

export default function App() {
  return (
    <div className='App'>
      <Nav /> 
      <HomePage /> 
    </div>
  );

}