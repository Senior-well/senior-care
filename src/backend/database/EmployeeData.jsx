import { useState } from "react";

export default function EmployeeData() {
    const employeeId = '1', employeePassword = '1';
    const [employeeLogin, setEmployeeLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleLogin = () => {
        if (employeeLogin === employeeId && password === employeePassword) {
            setStatus('Login successful!');
        } else {
            setStatus('Login failed!');
        }
    }

    return (
        <div className="employee-login">
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <div className="login">
                        <label htmlFor="employeeID">Employee ID</label>
                        <input type="text" id="employeeID" placeholder="#####" onChange={(e) => setEmployeeLogin(e.target.value)}/>
                    </div>
                    <div className="login">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
                {status && <p>{status}</p>}
            </div>
        </div>
    );
}