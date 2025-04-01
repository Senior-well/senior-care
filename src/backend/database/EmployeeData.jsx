import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeData() {
    const credentials = {
        '1': '1', // Employee login
        '2': '2'  // Elder login
    };

    const [employeeLogin, setEmployeeLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials[employeeLogin] === password) {
            setStatus('Login successful!');
            if (employeeLogin === '1') {
                navigate('/caregiver');
            } else if (employeeLogin === '2') {
                navigate('/patient-infor');
            }
        } else {
            setStatus('Login failed!');
            e.preventDefault();
        }
    }

    return (
        <div className="employee-login">
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <div className="login">
                        <label htmlFor="employeeID">Employee ID</label>
                        <input 
                            type="text" 
                            id="employeeID" 
                            placeholder="####" 
                            onChange={(e) => setEmployeeLogin(e.target.value)}
                        />
                    </div>
                    <div className="login">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {status && <p>{status}</p>}
            </div>
        </div>
    );
}
