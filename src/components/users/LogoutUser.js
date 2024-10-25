import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutUser = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <a onClick={handleLogout} className='logout-user-button'>Logout</a>
  );
};

export default LogoutUser;