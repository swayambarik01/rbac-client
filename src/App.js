import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import './App.css';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </div>
);

export default App;
