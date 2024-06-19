import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadComponent = async (path, elementId) => {
      try {
        const response = await axios.get(`http://ec2-75-101-229-145.compute-1.amazonaws.com:3000/api${path}`);
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

    window.addEventListener('loginSuccess', handleLoginSuccess);

    return () => {
      window.removeEventListener('loginSuccess', handleLoginSuccess);
    };
  }, [navigate]);

  return (
    <div>
      <h1>RBAC Client Home Page</h1>
      <div id="loginContent"></div>
      <div id="signupContent"></div>
    </div>
  );
};

export default Home;
