import { useEffect, useState } from "react";
import { ElderPortal, CaregiverPortal } from "../../backend/DashboardData/dashboardData";
import { PatientInfor, PatientStatistics } from "../../backend/DashboardData/patientInfor";
import { logoTrans } from "../../images/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { fetchFitbitData } from "../api/API";

export default function Dashboard() {
    const [alignment, setAlignment] = useState('infor');
    const status = alignment == 'infor' ? ElderPortal : ElderPortal;
    const [steps, setSteps] = useState("Loading...");
    const [heartRate, setHeartRate] = useState("Loading...");
    const [name, setName] = useState("Loading...");
    const [birthDate, setBirthDate] = useState("Loading...");
    const [symtomps, setSymptons] = useState("No current data");
    const [connection, setConnection] = useState("Not connected");

    useEffect(() => {
        async function loadingData() {
            const { steps, heartRate, name, birthDate } = await fetchFitbitData();
            setSteps(steps);
            setHeartRate(heartRate);
            setName(name);
            setBirthDate(birthDate);
            setConnection('Connected');
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
                        <ToggleButton value="infor" sx={{ color: 'white' }}>Information</ToggleButton>
                        <ToggleButton value="statistics" sx={{ color: 'white' }}>Statistics</ToggleButton>
                    </ToggleButtonGroup>

                </div>
                <div>
                    <ul className="flex justify-evenly">
                        {alignment === 'infor' ?
                            (
                                <div className="grid grid-cols-2 w-[50vw] h-[80vh]">
                                    {/* Left side - Full name and Date of birth */}
                                    <div className="flex flex-col items-start border-r border-gray-50">
                                        {PatientInfor.filter(data => data.id === 'name' || data.id === 'birthDate').map((data, index) => (
                                            <div key={index} className="flex flex-col mb-5">
                                                <span className="font-bold text-lg">{data.name}</span>
                                                <span className="mb-10">{data.id === 'name' ? name : birthDate}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right side - Symptons */}
                                    <div className="flex flex-col items-end">
                                        {PatientInfor.filter(data => data.id === 'symp').map((data, index) => (
                                            <div className="flex flex-col mb-5" key={index}>
                                                <span className="font-bold text-lg">{data.name}</span>
                                                <span>{symtomps}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="grid grid-cols-2 w-[50vw] h-[80vh]">
                                    {/* Left side - Heart rate and Steps */}
                                    <div className="flex flex-col items-start border-r border-gray-50">
                                        {PatientStatistics.filter(data => data.id === 'heartRate' || data.id === 'steps').map((data, index) => (
                                            <div key={index} className="flex flex-col mb-5">
                                                <span className="font-bold text-lg">{data.name}</span>
                                                <span className="mb-10">{data.id === 'heartRate' ? heartRate : steps}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right side - Connection */}
                                    <div className="flex flex-col items-end">
                                        {PatientStatistics.filter(data => data.id === 'connect').map((data, index) => (
                                            <div className="flex flex-col mb-5" key={index}>
                                                <span className="font-bold text-lg">{data.name}</span>
                                                <span>{connection}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}