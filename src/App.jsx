import React from 'react';
import './App.sass';
// eslint-disable-next-line
import Nav from './frontend/Nav/Nav';
// eslint-disable-next-line
import HomePage from './frontend/HomePage/homePage';
import Footer from './frontend/Footer/Footer';
import Login from './frontend/Components/loginPage/login';

export default function App() {
  return (
    <div className='App'>
      {/* <div className='Main-content'>
        <Nav />
        <HomePage />
      </div> */}
      <div className='Login-page'>
        <Login />
      </div>
      <Footer />
    </div>
  );

}