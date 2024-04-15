import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BookTable from '../components/BookTable';
import { useFirebase } from '../firebases/firebaseDB';
import './Users/LoginPage.css';

const AddBookPage = () => {
  const [bookName, setBookName] = useState('');
  const [bookId, setBookId] = useState('');

  const firebase = useFirebase();

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Logic to handle form submission, e.g., add the book to a database
    // console.log('Book Name:', bookName);
    // console.log('Book ID:', bookId);
   await firebase.addNewBook(bookName,bookId);
  //await firebase.getBooks();
    // Reset form fields
    setBookName('');
    setBookId('');
  };

  return (
    <div className="login-container">
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto', marginBottom: 10}}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Book
      </Typography>
      <form onSubmit={handleSubmit}>
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
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type="submit" variant="contained" color="primary">
            Add Book
          </Button>
        </div>
      </form>
     
    </Paper>
     <BookTable />
    </div>
  );
};

export default AddBookPage;
