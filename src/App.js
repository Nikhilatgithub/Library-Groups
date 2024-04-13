
import React, { useState } from 'react';
import './App.css';
import RegistrationForm from './routes/Users/Register';
import LoginPage from './routes/Users/login';
import HomePage from './routes/Users/Home';
import About from './routes/About';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarCustom from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    
    <Router className="bg-component">
      <NavbarCustom />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
      
    
  
  );
}

export default App;
