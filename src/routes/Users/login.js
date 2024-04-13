import React, { useState } from 'react';
import './LoginPage.css';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic for handling form submission
    navigate('/home');
  };

  const handleCreateNew = (event) => {
    event.preventDefault();
    // Logic for handling form submission
    navigate('/Register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <TextField
            className="txtField"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <TextField
            className="txtField"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Login</Button>
        <Button size="small" color="secondary">Forgot Password</Button>
        <Button size="small" color="secondary" onClick={handleCreateNew}>Create New Account</Button>
      </form>
    </div>
  );
};

export default LoginPage;
