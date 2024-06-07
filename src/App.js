import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import './App.css';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
);

export default App;
