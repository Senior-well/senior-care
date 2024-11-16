import React from 'react';
import './caregiver.sass';

const CaregiverDashboard = () => {
  return (
    <>
      <header>
        <div className="container">
          <h1>Caregiver & Family Dashboard</h1>
          <nav>
            <ul className="menu">
              <li><a href="#">Home</a></li>
              <li><a href="#">Training & Support</a></li>
              <li>
                <a href="#">Elders You Care For</a>
                <ul className="dropdown">
                  <li><a href="Elder1.html">Elder 1 - John Doe</a></li>
                  <li><a href="Elder2.html">Elder 2 - Jane Smith</a></li>
                </ul>
              </li>
              <li><a href="#">Emergency Contacts</a></li>
              <li><a href="#">Reminders & Appointments</a></li>
              <li><a href="#">Communication</a></li>
              <li><a href="#">Export Data</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="dashboard">
          <h2>Your Elders</h2>
          <ul className="elders-list">
            <li>
              <a href="profile-john.html" className="elder-link">John Doe</a>
            </li>
            <li>
              <a href="profile-jane.html" className="elder-link">Jane Smith</a>
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 Elder Care Application. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default CaregiverDashboard;
