import { useEffect, useState } from "react";
import { PatientData, PatientHealthData } from "../../backend/DashboardData/dashboardData";
import { logoTrans } from "../../images/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchFitbitData } from "../api/API";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [alignment, setAlignment] = useState('elder');
    const status = alignment == 'elder' ? PatientData : PatientHealthData;
    const [steps, setSteps] = useState("Loading...");
    const [heartRate, setHeartRate] = useState("Loading...");
    const [glucose, setGlucose] = useState("Loading...");
    const [oxygen, setOxygen] = useState("Loading...");
    const [name, setName] = useState("Loading...");
    const [connection, setConnection] = useState("Loading...");
    const [batteryLife, setBatteryLife] = useState("Loading...");
    const [email, setEmail] = useState("Loading...");
    const [phone, setPhone] = useState("Loading...");
    const [ehrFile, setEhrFile] = useState(null);

    useEffect(() => {
        async function loadingData() {
            const { steps, heartRate, glucose, oxygen, name, connection, batteryLife, email, phone } = await fetchFitbitData();
            setSteps(steps);
            setHeartRate(heartRate);
            setGlucose(glucose);
            setOxygen(oxygen);
            setName(name);
            setConnection(connection);
            setBatteryLife(batteryLife);
            setEmail(email);
            setPhone(phone);
        }
        loadingData();

        // Refresh health data every 60 seconds
        const interval = setInterval(loadingData, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null) {
            setAlignment(newAlignment);
        }
    };

    const handleFileUpload = (event) => {
        setEhrFile(event.target.files[0]);
    };

    return (
        <div className="flex items-center w-screen h-screen">
            {/* Left side */}
            <div className="bg-gradient-to-b from-[#1B1A55] to-[#310331] w-80 h-screen">
                <ul className="flex flex-col justify-center">
                    <li className="h-24 flex items-center justify-center mb-20">
                        <img src={logoTrans} className="h-10 rotate-90"></img>
                        <span className="ml-2 font-bold">Senior Care</span>
                    </li>
                    {status.map((data, index) => (
                        <a key={index} href={data.url}>
                            <li className="px-16 py-4 rounded-sm hover:bg-purple-700 transition">
                                <FontAwesomeIcon icon={data.icon} size="xl" />
                                <span className="ml-5">{data.title}</span>
                            </li>
                        </a>
                    ))}
                </ul>
            </div>

            {/* Right side */}
            <div className="flex-1 bg-purple-900 bg-opacity-20 h-screen">
                <div className="flex justify-center border-b border-indigo-500 mb-10">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        onChange={handleChange}
                        exclusive
                        aria-label="Platform"
                    >
                        <ToggleButton value="elder" sx={{ color: 'white' }}>Elder Information</ToggleButton>
                        <ToggleButton value="caregiver" sx={{ color: 'white' }}>Elder Health Data</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div>
                    <ul className="flex justify-evenly">
                        {alignment == 'elder' ? (
                            <>
                                <li className="flex flex-col items-center">Full Name: {name}</li>
                                <li className="flex flex-col items-center">Connection: {connection}</li>
                                <li className="flex flex-col items-center">Watch Battery Life: {batteryLife}</li>
                                <li className="flex flex-col items-center">Email: {email}</li>
                                <li className="flex flex-col items-center">Phone: {phone}</li>
                            </>
                        ) : (
                            <>
                                <li className="flex flex-col items-center">Steps: {steps}</li>
                                <li className="flex flex-col items-center">Heart Rate: {heartRate}</li>
                                <li className="flex flex-col items-center">Glucose Level: {glucose}</li>
                                <li className="flex flex-col items-center">Blood Oxygen: {oxygen}</li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col items-center mt-10">
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                    {ehrFile && (
                        <a href={URL.createObjectURL(ehrFile)} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">View EHR</a>
                    )}
                </div>
            </div>
        </div>
    );
}
