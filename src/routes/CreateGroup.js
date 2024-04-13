import React, { useState } from 'react';
// import './CreateGroupPage.css'; // Add your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useFirebase } from '../firebases/firebaseDB';



const CreateGroupForm = () => {
  const [formData, setFormData] = useState({
    groupId: '',
    numberOfStudents: ''
  });
  
  // const navigate = useNavigate();
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
    await firebase.addNewGroup(formData.groupId,formData.numberOfStudents);
    console.log(formData);
  };

  return (
    <div className="create-group-container">
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Group ID:</label>
          <TextField
            className="txtField"
            type="text"
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Number of Students:</label>
          <TextField
            className="txtField"
            type="number"
            name="numberOfStudents"
            value={formData.numberOfStudents}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Create Group</button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupForm;
