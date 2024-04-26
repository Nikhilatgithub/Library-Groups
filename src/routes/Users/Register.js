import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useFirebase } from '../../firebases/firebaseDB';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    group: '',
    studentName: '', // Add student name field
    prnNumber: ''   // Add PRN number field
  });
  
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can perform form validation and submission logic here
    // navigate('/login');
    await firebase.signUpUser(formData.email,formData.password,formData.group,formData.studentName,formData.prnNumber)
    //console.log(formData);
    if (firebase.grpId>0)
    {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Student Name:</label>
          <TextField
            className="txtField"
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>PRN Number:</label>
          <TextField
            className="txtField"
            type="text"
            name="prnNumber"
            value={formData.prnNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <TextField
            className="txtField"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <TextField
            className="txtField"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Group Number:</label>
          <TextField
            className="txtField"
            type="text"
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
