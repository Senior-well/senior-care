import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.sass';
import Nav from './frontend/Nav/Nav';
import HomePage from './frontend/HomePage/homePage';
import Footer from './frontend/Footer/Footer';
import Login from './frontend/Components/loginPage/login';
import PatientInfo from './frontend/PatientInfor/PatientInfor';
import { UserProvider } from './frontend/Components/Context/UserContent';

export default function App() {
  return (
    <UserProvider>
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
        

            {/* Routes for login */}
            
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
          
            {/* Routes for user information */}
            <Route
              path='/'
              element={
                <>
                  {/* <Nav /> */}
                  <div className='User-Information'>
                      <PatientInfo />
                  </div>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider >
  );

}