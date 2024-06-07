import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found, please log in.');
        navigate('/');
        return;
      }

      try {
        const authCheckResponse = await axios.post(
          'http://localhost:3000/api/auth-check',
          { path: '/profile' },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (authCheckResponse.data.access) {
          const profileResponse = await axios.post(
            'http://localhost:3000/api/profile',
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setProfileData(profileResponse.data);
        } else {
          setMessage('Access denied');
          navigate('/');
        }
      } catch (error) {
        setMessage('Error: ' + (error.response?.data?.message || 'Unknown error'));
        navigate('/');
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h1>Profile</h1>
      {message && <p>{message}</p>}
      {profileData && (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Role: {profileData.role}</p>
          <p>Permissions: {profileData.permissions.join(', ')}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
