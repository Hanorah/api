import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';  // Correct import

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password,
            });

            // After successful login, store the token and navigate to the books page
            localStorage.setItem('token', response.data.token);

            alert('Login successful!');
            navigate('/books'); // Redirect to books page after login
        } catch (err) {
            console.error(err);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="input-field"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input-field"
                    />
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
