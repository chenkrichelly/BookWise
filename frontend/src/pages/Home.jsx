import React, { useState, useEffect } from 'react';
import AppNavbar from '../components/Navbar'; 
import LoggedUser from '../components/LoggedUser';
import Guest from '../components/Guest';

const Home = ({ isLoggedIn }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const fetchCurrentUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:8080/current-user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  };  

  const fetchUserId = async () => {
    try {
      const response = await fetchCurrentUser();
      if (response.ok) {
        const userData = await response.json();
        setUserId(userData.id);
        setUsername(userData.username);
      } else {
        console.error('Failed to fetch current user');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserId();
    }
  }, [isLoggedIn]);

  const handleLogoutSuccess = () => {
    localStorage.removeItem('accessToken');
    setUserId(null);
    setUsername(null);
  };


  return (
    <>
      <AppNavbar isLoggedIn={isLoggedIn} userId={userId} handleLogoutSuccess={handleLogoutSuccess} />
      {isLoggedIn ? (
        <>
          <LoggedUser username= {username}/>
        </>
      ) : (
        <>
          <Guest /> 
        </>
      )}
    </>
  );
};

export default Home;


