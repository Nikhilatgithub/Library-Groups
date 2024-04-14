import React, { useState } from 'react';
import './LoginPage.css';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../firebases/firebaseDB';
import Alert from '@mui/material/Alert';
import { signInWithEmailAndPassword } from 'firebase/auth';
// Validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const LoginPage = () => {
  const firebase = useFirebase();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic for handling form submission
    const auth=firebase.getAuthentication();
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      firebase.getGroupId(username);
     alert("Login succesfull");
     navigate('/');
      // ...
    })
    .catch((error) => {
      alert("Failed to login");
      firebase.user=null;
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    });
    console.log(firebase.user);
    // navigate('/home');
  };

  const handlelogout = (event) => {
    event.preventDefault();
    // Logic for handling form submission
    firebase.signOutUser();
  };

  const handleCreateNew = (event) => {
    event.preventDefault();
    // Logic for handling form submission
    navigate('/Register');
  };

 

  if(firebase.user===null)
  {
    return (
      <div className="login-container">
         
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <TextField
              className="txtField"
              type="email"
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
  }
  else
  {
    return (
      <div className="login-container">
        <h2>LogOut</h2>
        <Button onClick={handlelogout}>Logout</Button>
        </div>
    );
  }
 
};

export default LoginPage;
