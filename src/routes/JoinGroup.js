import React, { useState } from 'react';
import './JoinGroupPage.css'; // Add your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const JoinGroupForm = () => {
  const [groupId, setGroupId] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setGroupId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form validation and submission logic here
    navigate('/'); // Redirect to home page after joining the group
    console.log('Joined Group ID:', groupId);
  };

  return (
    <div className="join-group-container">
      <h2>Join Group</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Group ID:</label>
          <TextField
            className="txtField"
            type="text"
            value={groupId}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Join Group</button>
        </div>
      </form>
    </div>
  );
};

export default JoinGroupForm;
