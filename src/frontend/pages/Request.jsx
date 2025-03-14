import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Request() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');

        if (accessToken) {
            localStorage.setItem('fitbit_access_token', accessToken);
            navigate('/patient-infor');
        }

        else {
            setError(true);
        }
    }, [navigate]);
    return (
        <h2>{error ? "Failed to retrieve access token" : "Processing Fitbit authentication ..."}</h2>
    );
}