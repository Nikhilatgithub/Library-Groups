import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useFirebase } from '../firebases/firebaseDB';
import Select from '@mui/material/Select';
import { InputLabel, MenuItem, OutlinedInput } from '@mui/material';


let names = [];
// let books = [];
let selectedBookId="";

const AddBookRecordPage = () => {
  const firebase = useFirebase();

  const [studentName, setStudentName] = useState('');
  const [prnNumber, setPrnNumber] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [lastStudent, setLastStudent] = useState('');
  const [bookName, setBookName] = useState('');
  const [bookId, setBookId] = useState('');

  const [books, setBooks] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission, e.g., add the book record to a database

    firebase.addNewRecord(studentName,prnNumber,date,bookName,bookId,lastStudent);
    firebase.updateBookAssignStatus(selectedBookId);
    // Reset form fields
    setStudentName('');
    setPrnNumber('');
    setLastStudent('');
    setBookName('');
    setBookId('');
    getBookData();
    getData();
  };
  

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const [count, setCount] = React.useState(0);
    
  // let rows = [];
  const handleClick = () => {
    setCount(count + 1); // Update state to trigger rerender
  };

  const getBookData = async() => {
     
    await firebase.getNotAssignBooks().then((newData) => {
      setBooks(newData); // Update the component state with the new data
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  
  handleClick();
  };

  

  const getData = async() => {
   
    names =  await firebase.getStudentToGroupRecord();

  // for (let index = 0; index < names.length; index++) {
  //   const element = rows[index];
  //   console.log(element.name);
  // }
 
   handleClick();
  };

  React.useEffect(() => {
   getData();
   getBookData();
   handleClick();
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleChange = (event) => {
    // const {
    //   target: { value,key },
    // } = event;
    // setStudentName(value);
    // setPrnNumber(key);
    const selectedStudentName = event.target.value;
    const selectedStudent = names.find((name) => name.studentName === selectedStudentName);
    if (selectedStudent) {
      const selectedPrnNumber = selectedStudent.prnNumber;
      setPrnNumber(selectedPrnNumber);
      console.log("Selected student PRN number:", selectedPrnNumber);
      // Now you can use the selected PRN number as needed
    }
    setStudentName(selectedStudentName);
  };

  const handlebookChange = (event) => {
    const selectedBookName = event.target.value;
  const selectedBook = books.find((book) => book.bookName === selectedBookName);
  if (selectedBook) {
    selectedBookId = selectedBook.bookId;
    console.log("Selected book ID:", selectedBookId);
    setBookId(selectedBookId);
    // Now you can use the selected book ID as needed
  }
  setBookName(selectedBookName);
  
  };

  const handlelastnameChange = (event) => {
    const selectedStudentName = event.target.value;
    
    setLastStudent(selectedStudentName);
  
  };


  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Book Record
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <TextField
            label="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div> */}
        <div fullWidth>
         <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={studentName}
          onChange={handleChange}
          fullWidth
          onClick={getData}
        >
          {names.map((name) => (
            <MenuItem
              key={name.prnNumber}
              value={name.studentName}
              
            >
              {name.studentName}

            </MenuItem>
          ))}
        </Select>
        </div>
        <div>
          <TextField
            label="PRN Number"
            value={prnNumber}
            onChange={handleChange}
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
          {/* <TextField
            label="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            fullWidth
            margin="normal"
          /> */}
          <Select
          labelId="demo-multiple-book-label"
          id="demo-multiplebokk"
          value={bookName}
          onChange={handlebookChange}
          fullWidth
          onClick={getBookData}
        >
          {books.map((book) => (
            <MenuItem
              key={book.bookId}
              value={book.bookName}
              
            >
              {book.bookName}
            </MenuItem>
          ))}
        </Select>
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
        {/* <div>
          <TextField
            label="Last Student"
            value={lastStudent}
            onChange={(e) => setLastStudent(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div> */} <div fullWidth>
         <InputLabel id="demo-multiple-namelast-label">Last Student</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-namelast"
          value={lastStudent}
          onChange={handlelastnameChange}
          fullWidth
          onClick={getData}
        >
          {names.map((name) => (
            <MenuItem
              key={name.prnNumber}
              value={name.studentName}
              
            >
              {name.studentName}
              
            </MenuItem>
          ))}
        </Select>
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
