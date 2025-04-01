import { useState, useEffect } from "react";

const ElderReminder = () => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const storedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
        setReminders(storedReminders);
    }, []);

    return (
        <div>
            {/* Navbar with links */}
            <ul className="navbar flex space-x-5 p-7 bg-gray-200">
                <li><a href="/remindersMA" className="cursor-pointer text-blue-500">Home</a></li>
                <li><a href="/" className="cursor-pointer text-blue-500">Logout</a></li>
            </ul>
            
            <div className="container p-6">
                <h2 className="text-xl font-bold text-black">Elder Care Reminders</h2>
                {reminders.length === 0 ? (
                    <p className="text-black">No reminders set.</p>
                ) : (
                    <ul className="mt-4">
                        {reminders.map((reminder, index) => (
                            <li key={index} className="border p-4 mb-2 bg-gray-100 rounded">
                                <p className="text-black"><strong className="text-black">Type:</strong> {reminder.type}</p>
                                <p className="text-black"><strong className="text-black">Subject:</strong> {reminder.subject}</p>
                                <p className="text-black"><strong className="text-black">Message:</strong> {reminder.message}</p>
                                <p className="text-black"><strong className="text-black">Recipient:</strong> {reminder.recipient}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ElderReminder;
