import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Caregiver from '../Caregiver/Caregiver'; // Import the Caregiver component
import HomePage from '../HomePage/HomePage';
import './Reminder.sass';

const ElderCareReminder = () => {
    return (
        <Router>
            <div>
                <div className="navbar flex space-x-1 p-4 bg-gray-200">
                    <Link to="/homepage" className="cursor-pointer text-blue-500">Home</Link>
                    <Link to="/reminders" className="cursor-pointer text-blue-500">Reminders</Link>
                </div>

                <Routes>
                    <Route path="/" element={<Caregiver />} />
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/reminders" element={<ReminderSettings />} />
                </Routes>
            </div>
        </Router>
    );
};

// Reminder Settings Component (Moved from ElderCareReminder)
const ReminderSettings = () => {
    const [activeTab, setActiveTab] = useState("medication");

    return (
        <div className="container p-6">
            <h2 className="text-xl font-bold">Elder Care Medication and Appointment Reminder</h2>

            <div className="tab-bar flex space-x-4 my-4">
                <div
                    className={`tab cursor-pointer p-2 ${
                        activeTab === "medication" ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                    onClick={() => setActiveTab("medication")}
                >
                    Medication Reminder
                </div>
                <div
                    className={`tab cursor-pointer p-2 ${
                        activeTab === "appointment" ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                    onClick={() => setActiveTab("appointment")}
                >
                    Appointment Reminder
                </div>
            </div>

            {activeTab === "medication" && (
                <div className="section p-4 border rounded bg-gray-100">
                    <h3 className="text-lg font-semibold">Medication Reminder Schedule</h3>
                    <div className="form-group my-2">
                        <label>Medication Name:</label>
                        <input type="text" className="border p-2 w-full" placeholder="Enter medication name" />
                    </div>
                    <div className="form-group my-2">
                        <label>Dose Time:</label>
                        <select className="border p-2 w-full">
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                            <option>Night</option>
                        </select>
                    </div>
                    <div className="form-group my-2">
                        <label>Dosage:</label>
                        <input type="text" className="border p-2 w-full" placeholder="Enter dosage" />
                    </div>
                    <div className="form-group my-2">
                        <label>Additional Notes:</label>
                        <textarea className="border p-2 w-full" placeholder="Any additional instructions..."></textarea>
                    </div>
                    <button className="button bg-blue-500 text-white p-2 rounded">Set Reminder</button>
                </div>
            )}

            {activeTab === "appointment" && (
                <div className="section p-4 border rounded bg-gray-100">
                    <h3 className="text-lg font-semibold">Appointment Reminder Schedule</h3>
                    <div className="form-group my-2">
                        <label>Appointment Name:</label>
                        <input type="text" className="border p-2 w-full" placeholder="Enter appointment name" />
                    </div>
                    <div className="form-group my-2">
                        <label>Appointment Time:</label>
                        <input type="datetime-local" className="border p-2 w-full" />
                    </div>
                    <div className="form-group my-2">
                        <label>Location:</label>
                        <input type="text" className="border p-2 w-full" placeholder="Enter location" />
                    </div>
                    <button className="button bg-blue-500 text-white p-2 rounded">Set Reminder</button>
                </div>
            )}
        </div>
    );
};



export default ElderCareReminder;