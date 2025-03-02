import React, { useState, useEffect } from "react";
import "./Caregiver.sass";

const CaregiverDashboard = () => {
  const [elders, setElders] = useState(
    JSON.parse(localStorage.getItem("elders")) || []
  );
  const [showForm, setShowForm] = useState(false);
  const [newElder, setNewElder] = useState("");

  useEffect(() => {
    localStorage.setItem("elders", JSON.stringify(elders));
  }, [elders]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newElder.trim() === "") return;
    
    setElders([...elders, newElder]); // Add new elder to the list
    setNewElder(""); // Clear input field
    setShowForm(false); // Hide form after submission
  };

  return (
    <>
      <header>
        <div className="container">
          <h1>Caregiver & Family Dashboard</h1>
          <nav>
            <ul className="menu">
              <li><a href="/caregiver">Home</a></li>
              <li><a href="/ai">AI Dashboard</a></li>
              <li><a href="/reminder">Reminders & Appointments</a></li>
              <li><a href="/">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="dashboard">
          <h2>Your Elders</h2>
          <ul className="elders-list">
            {elders.map((elder, index) => (
              <li key={index}>
                <a
                  href={`/elder/${elder.replace(/\s+/g, "-").toLowerCase()}`}
                  className="elder-link"
                >
                  {elder}
                </a>
              </li>
            ))}
          </ul>

          <button onClick={() => setShowForm(!showForm)} className="assign-button">
            Assign Yourself
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="assign-form">
              <input
                type="text"
                placeholder="Elder's Full Name"
                value={newElder}
                onChange={(e) => setNewElder(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          )}
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
