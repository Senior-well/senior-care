import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeData() {
    const employeeId = '1', employeePassword = '1';
    const [employeeLogin, setEmployeeLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        if (employeeLogin === employeeId && password === employeePassword) {
            navigate('/patient-infor');
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
                        <input className="text-black" type="text" id="employeeID" placeholder="#####" onChange={(e) => setEmployeeLogin(e.target.value)}/>
                    </div>
                    <div className="login">
                        <label htmlFor="password">Password</label>
                        <input className="text-black" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
                {status && <p>{status}</p>}
            </div>
        </div>
    );
}