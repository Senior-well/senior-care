import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserMd, faClipboardList, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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

    setElders([...elders, newElder]);
    setNewElder("");
    setShowForm(false);
  };

  return (
    <div className="flex items-center w-screen h-screen">
      {/* Sidebar */}
      <div className="bg-gradient-to-b from-[#1B1A55] to-[#310331] w-80 h-screen">
        <ul className="flex flex-col justify-center">
          <li className="h-24 flex items-center justify-center mb-20 text-white font-bold text-lg">
            Caregiver Dashboard
          </li>
          <a href="/caregiver">
            <li className="px-16 py-4 rounded-sm hover:bg-purple-700 transition text-white flex items-center">
              <FontAwesomeIcon icon={faHome} size="lg" />
              <span className="ml-5">Home</span>
            </li>
          </a>
          <a href="/ai">
            <li className="px-16 py-4 rounded-sm hover:bg-purple-700 transition text-white flex items-center">
              <FontAwesomeIcon icon={faUserMd} size="lg" />
              <span className="ml-5">AI Dashboard</span>
            </li>
          </a>
          <a href="/reminder">
            <li className="px-16 py-4 rounded-sm hover:bg-purple-700 transition text-white flex items-center">
              <FontAwesomeIcon icon={faClipboardList} size="lg" />
              <span className="ml-5">Reminders</span>
            </li>
          </a>
          <a href="/">
            <li className="px-16 py-4 rounded-sm hover:bg-red-600 transition text-white flex items-center">
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              <span className="ml-5">Logout</span>
            </li>
          </a>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-purple-900 bg-opacity-20 h-screen p-10 text-white">
        <h2 className="text-2xl font-bold mb-5">Your Elders</h2>
        <ul className="elders-list space-y-3">
          {elders.map((elder, index) => (
            <li key={index} className="bg-purple-700 p-3 rounded-lg">
              <a href="/patient-infor" className="text-white hover:underline">{elder}</a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-5 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700"
        >
          Assign Yourself
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-5">
            <input
              type="text"
              placeholder="Elder's Full Name"
              value={newElder}
              onChange={(e) => setNewElder(e.target.value)}
              required
              className="p-2 rounded-lg text-black"
            />
            <button type="submit" className="ml-3 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CaregiverDashboard;
