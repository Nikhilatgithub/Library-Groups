import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const AddBookRecordPage = () => {
  const [studentName, setStudentName] = useState('');
  const [prnNumber, setPrnNumber] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [lastStudent, setLastStudent] = useState('');
  const [bookName, setBookName] = useState('');
  const [bookId, setBookId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission, e.g., add the book record to a database
    console.log('Student Name:', studentName);
    console.log('PRN Number:', prnNumber);
    console.log('Date:', date);
    console.log('Last Student:', lastStudent);
    // Reset form fields
    setStudentName('');
    setPrnNumber('');
    setDate('');
    setLastStudent('');
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Book Record
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="PRN Number"
            value={prnNumber}
            onChange={(e) => setPrnNumber(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Last Student"
            value={lastStudent}
            onChange={(e) => setLastStudent(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type="submit" variant="contained" color="primary">
            Add Record
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default AddBookRecordPage;
