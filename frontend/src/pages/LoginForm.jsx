import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import './style.css';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem('accessToken', responseData.access_token);
                onLogin(); 
                navigate('/');
            } else {
                if (response.status === 401) {
                    setError('Invalid username or password. Please try again.');
                } else {
                    setError('An error occurred while logging in. Please try again later.');
                }
                console.error('Error logging in:', response.statusText);
            }
        } catch (error) {
            setError('An error occurred while logging in. Please try again later.');
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <>
            <header>
                <AppNavbar />
                <div className='header-content3 flex flex-c text-left '>
                    <div className="wrapper">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}>
                            <h2>Login</h2>
                            <div className="input-field">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" autoComplete="off" />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <button className='button-login' type="submit">Login</button>
                            <button onClick={handleRegister}>Don't have an account?</button>
                            <button onClick={handleGoBack}>Go Back</button>
                        </form>
                    </div>
                </div>
            </header>
        </>
    );
};

export default LoginForm;
