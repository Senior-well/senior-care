import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.sass';
import Nav from './frontend/Nav/Nav';
import HomePage from './frontend/HomePage/homePage';
import Footer from './frontend/Footer/Footer';
import Login from './frontend/Components/loginPage/login';

export default function App() {
  return (
    <Router>
      <div className='App'>
        {/* Routes for main content */}
        <Routes>
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
        </Routes>

        {/* Routes for login */}
        <Routes>
          <Route
            path='/sign-in'
            element={
              <>
                <div className='Login-page'>
                  <Login />
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );

}