import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadComponent = async (path, elementId) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found, please log in.');
          navigate('/');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api${path}?style=true`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const contentElement = document.getElementById(elementId);
        contentElement.innerHTML = response.data;

        // Find and run the scripts in the loaded HTML
        const scripts = contentElement.getElementsByTagName('script');
        for (let script of scripts) {
          const newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          document.body.appendChild(newScript);
        }
      } catch (error) {
        alert(`Error loading ${path} page. Redirecting to home.`);
        navigate('/');
      }
    };

    loadComponent('/dashboard', 'dashboardContent');
  }, [navigate]);

  return (
    <div>
      <button onClick={() => navigate('/landing')}>Back to Landing Page</button>
      <div id="dashboardContent"></div>
    </div>
  );
};

export default Dashboard;
