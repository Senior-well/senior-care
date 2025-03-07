import { useEffect, useState } from "react";
import { ElderPortal, CaregiverPortal } from "../../backend/DashboardData/dashboardData";
import { PatientInfor } from "../../backend/DashboardData/patientInfor";
import { logoTrans } from "../../images/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { fetchFitbitData } from "../api/API";

export default function Dashboard() {
    const [alignment, setAlignment] = useState('elder');
    const status = alignment == 'elder' ? ElderPortal : CaregiverPortal;
    const [steps, setSteps] = useState("Loading...");
    const [heartRate, setHeartRate] = useState("Loading...");
    const [name, setName] = useState("Loading...");
    const [birthDate, setBirthDate] = useState("Loading...");

    useEffect(() => {
        async function loadingData() {
            const { steps, heartRate, name, birthDate } = await fetchFitbitData();
            setSteps(steps);
            setHeartRate(heartRate);
            setName(name);
            setBirthDate(birthDate);
        }
        loadingData();

        // Refresh heart rate every 60 seconds
        const interval = setInterval(loadingData, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null) {
            setAlignment(newAlignment);
        }
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
                        <ToggleButton value="elder" sx={{ color: 'white' }}>Elder Portal</ToggleButton>
                        <ToggleButton value="caregiver" sx={{ color: 'white' }}>Caregiver Portal</ToggleButton>
                    </ToggleButtonGroup>

                </div>
                <div>
                    <ul className="flex justify-evenly">
                        {alignment == 'elder' ?
                            (
                                PatientInfor.map((data, index) => (
                                    <li className="flex flex-col items-center" key={index}>
                                        {data.name}
                                        <span id={data.id}>
                                            {data.id === "steps" ? steps : data.id === "heartRate" ? heartRate : data.id === "name" ? name : data.id === "birthDate" ? birthDate : ""}
                                        </span>
                                    </li>
                                ))
                            )
                            :
                            (
                                <></>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}