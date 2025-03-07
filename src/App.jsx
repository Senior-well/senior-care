import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.sass';
import Nav from './frontend/Nav/Nav';
import HomePage from './frontend/HomePage/HomePage';
import Footer from './frontend/Footer/Footer';
import { UserProvider } from './frontend/Components/Context/UserContent';
import Dashboard from './frontend/Dashboard/Dashboard';
import Request from './frontend/pages/Request';

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
            <Route path='/request' element={<Request />} />
            <Route path='/patient-infor' element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </UserProvider >
  );

}