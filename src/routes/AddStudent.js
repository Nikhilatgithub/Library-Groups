import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import StudentTables from '../components/StudentTable';
import { useFirebase } from '../firebases/firebaseDB';
import './Users/LoginPage.css';


const AddStudent = () => {
  const firebase = useFirebase();
  const [formData, setFormData] = useState({
    studentName: '',
    prnNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 

  const handleSubmit = async(e) => {
    e.preventDefault();
    // // Logic for handling form submission
    // console.log(formData);
    // addDoc(collection(firestore,'students'),{
    //     studentName: formData.studentName,
    //     prnNumber: formData.prnNumber
    // });
    // Reset form fields after submission
   await firebase.addNewStudentToGroup(formData.studentName,formData.prnNumber);
    setFormData({
      studentName: '',
      prnNumber: ''
    });
  };

  return (
    <div className="login-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            className="txtField"
            label="Student Name"
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            className="txtField"
            label="PRN Number"
            type="text"
            name="prnNumber"
            value={formData.prnNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <Button type="submit" variant="contained" color="primary">
            Add Student
          </Button>
        </div>
      </form>
      
      <StudentTables />
    </div>
  );
};

export default AddStudent;
