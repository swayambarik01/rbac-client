import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePage = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found, please log in.');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const contentElement = document.getElementById('profileContent');
        contentElement.innerHTML = response.data;

        // Extract and run scripts in the loaded HTML
        const scripts = contentElement.getElementsByTagName('script');
        for (let script of scripts) {
          const newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          document.body.appendChild(newScript);
        }
      } catch (error) {
        alert('Error loading profile page. Redirecting to home.');
        navigate('/');
      }
    };

    fetchProfilePage();
  }, [navigate]);

  return <div id="profileContent"></div>;
};

export default Profile;
