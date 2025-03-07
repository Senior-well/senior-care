import React, { useState, useEffect } from "react";
import "./Caregiver.sass";

const CaregiverDashboard = () => {
  const [elders, setElders] = useState(
    JSON.parse(localStorage.getItem("elders")) || []
  );
  const [showForm, setShowForm] = useState(false);
  const [newElder, setNewElder] = useState("");
  const [menuActive, setMenuActive] = useState(false); // For sidebar toggle

  useEffect(() => {
    localStorage.setItem("elders", JSON.stringify(elders));
  }, [elders]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newElder.trim() === "") return;

    setElders([...elders, newElder]);
    setNewElder("");
    setShowForm(false);
  };

  const handleMenuToggle = () => {
    setMenuActive(!menuActive); // Toggle sidebar state
  };

  return (
    <div className="caregiver-dashboard">
      <div className={`navigation ${menuActive ? "active" : ""}`}>
        <div className="menuToggle" onClick={handleMenuToggle}></div>
        <ul>
          <li className="list active">
            <a href="/caregiver" style={{ "--clr": "#f44336" }}>
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="text">Home</span>
            </a>
          </li>
          <li className="list">
            <a href="/ai" style={{ "--clr": "#ffa117" }}>
              <span className="icon">
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span className="text">AI Dashboard</span>
            </a>
          </li>
          <li className="list">
            <a href="/reminder" style={{ "--clr": "#0fc70f" }}>
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span className="text">Reminders & Appointments</span>
            </a>
          </li>
          <li className="list">
            <a href="/" style={{ "--clr": "#2196f3" }}>
              <span className="icon">
                <ion-icon name="camera-outline"></ion-icon>
              </span>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </div>

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
    </div>
  );
};

export default CaregiverDashboard;
