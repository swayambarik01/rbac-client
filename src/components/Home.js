import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [role, setRole] = useState('User');
  const [loginMessage, setLoginMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username: loginUsername,
        password: loginPassword,
      });
      localStorage.setItem('token', response.data.token);
      setLoginMessage('Login successful');
      navigate('/profile');  // Redirect to profile page after successful login
    } catch (error) {
      setLoginMessage('Error: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        username: signupUsername,
        password: signupPassword,
        role,
      });
      setSignupMessage(response.data.message);
    } catch (error) {
      setSignupMessage('Error: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{loginMessage}</p>

      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Support">Support</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>{signupMessage}</p>
    </div>
  );
};

export default Home;
