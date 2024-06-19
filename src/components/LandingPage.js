import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h1>RBAC Client Landing Page</h1>
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LandingPage;
