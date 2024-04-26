import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Box, Paper } from '@mui/material';
import StudentTables from '../components/StudentTable';
import { useFirebase } from '../firebases/firebaseDB';
import './Users/LoginPage.css';
import MediaCard from '../components/HomeCard';


const AddStudent = () => {
  const firebase = useFirebase();
  const [progressD, setProgressD] = useState(false);
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
    setProgressD(true);
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
    setProgressD(false);
  };

  if(firebase.user===null)
  {
    return (
    
    
      <div className='card' >
     <MediaCard />
        </div>
      
    );
  }
  else{

  return (
    <div className="containerTwoColumn">
      <Paper elevation={3} sx={{ padding: 2, maxWidth: 500,marginLeft:5,
     marginBottom: 10,marginTop:2}}>
      <h2>Add Student</h2>
      {progressD ? (<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <Box sx={{ display: 'center' , alignItems: 'center' }}>
            <CircularProgress />
          </Box></div>) : (<div></div>)}
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
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, maxWidth: 500,
     marginBottom: 10,marginTop:2}}>
     
      <StudentTables />
      </Paper>
    </div>
  );
  }
};

export default AddStudent;
