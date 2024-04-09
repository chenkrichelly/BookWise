import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import './style.css';


const RegistrationForm = ({  }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                navigate('/login');

            } else {
                console.error('Error registering user:', response.statusText);
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <header>
                <AppNavbar />
                <div className='header-content3 flex flex-c text-left '>
                    <div className="wrapper">
                        <form onSubmit={(e) => {
                            e.preventDefault(); 
                            handleRegister();
                        }}>
                            <h2>Register</h2>
                            <div className="input-field">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" autoComplete="off" required />
                            </div>
                            <div className="input-field">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" autoComplete="off" required />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required minLength={6} />
                            </div>
                            <button className='button-login' type="submit">Register</button>
                            <button onClick={handleGoBack}>Go Back</button>
                        </form>
                    </div>
                </div>
            </header>
        </>
    );
};

export default RegistrationForm;
