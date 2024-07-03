import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadComponent = async (path, elementId) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api${path}?style=true`);
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
        console.error('Error loading page:', error);
      }
    };

    loadComponent('/login', 'loginContent');
    loadComponent('/signup', 'signupContent');

    const handleLoginSuccess = (event) => {
      console.log('Login successful, navigating to landing page', event.detail);
      navigate('/landing');
    };

    window.addEventListener('rbacLogin', handleLoginSuccess);

    return () => {
      window.removeEventListener('rbacLogin', handleLoginSuccess);
    };
  }, [navigate]);

  const spacerStyle = {
    height: '20px', // Adjust the height as needed
  };

  return (
    <div>
      <div style={spacerStyle}><h2>RBAC Client Home Page</h2></div>
      <div id="loginContent"></div>
      <div style={spacerStyle}></div>
      <div id="signupContent"></div>
    </div>
  );
};

export default Home;
