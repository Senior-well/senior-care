import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './AI.sass';

export default function DataInsights() {
    const [file, setFile] = useState(null);
    const [insights, setInsights] = useState([]);
    const [plotImg, setPlotImg] = useState(null);
    const [hasUploaded, setHasUploaded] = useState(false); // Track upload state

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("Response Data:", data); // Debugging log

            setInsights(data.insights || []);
            setPlotImg(data.plot_img || null);
            setHasUploaded(true); // Ensure display after upload

            // Save to localStorage for persistence
            localStorage.setItem("insights", JSON.stringify(data.insights || []));
            localStorage.setItem("plotImg", data.plot_img || "");
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <div className="data-insights">
            {/* NavBar */}
            <nav className="navbar">
                <ul>
                    <li><Link to="/ai">Home</Link></li>
                    <li><Link to="/caregiver">Caregiver</Link></li>
                </ul>
            </nav>

            <div className="container">
                <h1>Upload Your Data File</h1>
                <form onSubmit={handleUpload}>
                    <input type="file" accept=".csv" onChange={handleFileChange} required />
                    <button type="submit">Upload</button>
                </form>

                {/* Show insights only after upload */}
                {hasUploaded && insights.length > 0 && (
                    <div className="insights-section">
                        <h2>Insights</h2>
                        <ul>
                            {insights.map((insight, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: insight }} />
                            ))}
                        </ul>
                    </div>
                )}

                {/* Show plot only after upload */}
                {hasUploaded && plotImg && (
                    <div className="plot-section">
                        <h2>Visualization</h2>
                        <img src={`data:image/png;base64,${plotImg}`} alt="Data Trend Plot" className="plot-image" />
                    </div>
                )}
            </div>
        </div>
    );
}
