import { useState } from "react";
import emailjs from "emailjs-com";
import "./Reminder.sass";

const ElderCareReminder = () => {
    return (
        <div>
            <ul className="navbar flex space-x-5 p-7 bg-gray-200">
                <li><a href="/reminder" className="cursor-pointer text-blue-500">Home</a></li>
                <li><a href="/" className="cursor-pointer text-blue-500">Logout</a></li>
            </ul>
            <ReminderSettings />
        </div>
    );
};

const ReminderSettings = () => {
    const [activeTab, setActiveTab] = useState("medication");
    const [formData, setFormData] = useState({
        recipient: "",
        subject: "",
        message: "",
        medication: "",
        doseTime: "Morning",
        dosage: "",
        notes: "",
        appointment: "",
        appointmentTime: "",
        location: ""
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const prepareEmail = () => {
        let subject, message;

        if (activeTab === "medication") {
            subject = "Medication Reminder";
            message = `Medication: ${formData.medication}\nDose Time: ${formData.doseTime}\nDosage: ${formData.dosage}\nNotes: ${formData.notes}`;
        } else {
            subject = "Appointment Reminder";
            message = `Appointment: ${formData.appointment}\nTime: ${formData.appointmentTime}\nLocation: ${formData.location}`;
        }

        setFormData((prev) => ({ ...prev, subject, message }));
        setIsOpen(true);
    };

    const sendEmail = async () => {
        try {
            await emailjs.send("service_mjaoomd", "template_1qqu468", formData, "G1puXBN89pJT9zvhP");
            saveReminder();
            alert("Email sent successfully!");
            setIsOpen(false);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const saveReminder = () => {
        const newReminder = {
            type: activeTab,
            recipient: formData.recipient,
            subject: formData.subject,
            message: formData.message,
        };
        const existingReminders = JSON.parse(localStorage.getItem("reminders")) || [];
        localStorage.setItem("reminders", JSON.stringify([...existingReminders, newReminder]));
    };

    return (
        <div className="container p-6">
            <h2 className="text-xl font-bold">Elder Care Medication and Appointment Reminder</h2>
            <div className="tab-bar flex space-x-4 my-4">
                <div className={`tab cursor-pointer p-2 ${activeTab === "medication" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setActiveTab("medication")}>
                    Medication Reminder
                </div>
                <div className={`tab cursor-pointer p-2 ${activeTab === "appointment" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setActiveTab("appointment")}>
                    Appointment Reminder
                </div>
            </div>

            {activeTab === "medication" && (
                <div className="section p-4 border rounded bg-gray-100">
                    <h3 className="text-lg font-semibold">Medication Reminder Schedule</h3>
                    <input type="email" name="recipient" placeholder="Recipient Email" onChange={handleChange} className="border p-2 w-full mb-2" />
                    <input type="text" name="medication" placeholder="Medication Name" onChange={handleChange} className="border p-2 w-full mb-2" />
                    <select name="doseTime" className="border p-2 w-full mb-2" onChange={handleChange}>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                        <option>Night</option>
                    </select>
                    <input type="text" name="dosage" placeholder="Dosage" onChange={handleChange} className="border p-2 w-full mb-2" />
                    <textarea name="notes" placeholder="Additional Notes" onChange={handleChange} className="border p-2 w-full mb-2" />
                    <button onClick={prepareEmail} className="bg-blue-500 text-white p-2 rounded mt-2">Set & Send Reminder</button>
                </div>
            )}

            {activeTab === "appointment" && (
                <div className="section p-4 border rounded bg-gray-100">
                    <h3 className="text-lg font-semibold">Appointment Reminder Schedule</h3>
                    <input type="email" name="recipient" placeholder="Recipient Email" onChange={handleChange} className="border p-2 w-full mb-2" />
                    <input type="text" name="appointment" placeholder="Appointment Name" onChange={handleChange} className="border p-2 w-full mb-2" />
                    <input type="datetime-local" name="appointmentTime" onChange={handleChange} className="border p-2 w-full mb-2" />
                    <input type="text" name="location" placeholder="Location" onChange={handleChange} className="border p-2 w-full mb-2" />
                    <button onClick={prepareEmail} className="bg-blue-500 text-white p-2 rounded mt-2">Set & Send Reminder</button>
                </div>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2>Email Preview</h2>
                        <p><strong>To:</strong> {formData.recipient}</p>
                        <p><strong>Subject:</strong> {formData.subject}</p>
                        <p>{formData.message}</p>
                        <div className="flex space-x-2 mt-4">
                            <button onClick={() => setIsOpen(false)} className="bg-gray-300 p-2 rounded">Cancel</button>
                            <button onClick={sendEmail} className="bg-blue-500 text-white p-2 rounded">Send Email</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ElderCareReminder;
