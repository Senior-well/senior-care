import React from "react";
import "./Elder.sass";

const ElderProfile = () => {
  return (
    <div>
      <header>
        <div className="container">
          <h1>Elder's Profile</h1>
          <nav>
            <ul className="menu">
              <li><a href="HomePage.jsx">Home</a></li>
              <li><a href="#">Training & Support</a></li>
              <li><a href="#">Emergency Contacts</a></li>
              <li><a href="#">Communication</a></li>
              <li><a href="#">Export Data</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        <section className="profile">
          <h2>Elder's Profile Information</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Age:</strong> 78</p>
          <p><strong>Sex:</strong> Male</p>

          <div className="health-records">
            <h3>Health Records</h3>
            <p><strong>Heart Rate:</strong> 72 bpm</p>
            <p><strong>Sleep:</strong> 7 hours</p>
            <p><strong>Activity:</strong> 5,200 steps</p>
          </div>

          <div className="emergency-contacts">
            <h3>Emergency Contacts</h3>
            <ul>
              <li>Dr. Smith: +1 123-456-7890</li>
              <li>Caregiver Hotline: +1 987-654-3210</li>
            </ul>
          </div>

          <div className="reminders">
            <h3>Appointment & Medication Reminders</h3>
            <p>Next Doctor's Appointment: March 25, 2024</p>
            <p>Medication: 2 tablets of Aspirin daily at 9:00 AM</p>
          </div>

          <div className="actions">
            <button className="view-update-records">Update Health Records</button>
            <button className="export-data">Export to Excel</button>
          </div>
        </section>
      </main>
      
      <footer>
        <div className="container">
          <p>&copy; 2024 Elder Care Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ElderProfile;
