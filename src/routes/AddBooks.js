import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BookTable from '../components/BookTable';
import { useFirebase } from '../firebases/firebaseDB';
import './Users/LoginPage.css';
import MediaCard from '../components/HomeCard';
import { Box, CircularProgress } from '@mui/material';

const AddBookPage = () => {
  const [bookName, setBookName] = useState('');
  const [bookId, setBookId] = useState('');
  const [progressD, setProgressD] = useState(false);

  const firebase = useFirebase();

  const handleSubmit = async(event) => {
    setProgressD(true);
    event.preventDefault();
    // Logic to handle form submission, e.g., add the book to a database
    // console.log('Book Name:', bookName);
    // console.log('Book ID:', bookId);
   await firebase.addNewBook(bookName,bookId);
  //await firebase.getBooks();
    // Reset form fields
    setBookName('');
    setBookId('');
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
      <Typography variant="h4" align="center" gutterBottom>
        Add New Book
      </Typography>

      {progressD ? (<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <Box sx={{ display: 'center' , alignItems: 'center' }}>
            <CircularProgress />
          </Box></div>) : (<div></div>)}

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
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 500,
     marginBottom: 10,marginTop:2}}>
      
     <BookTable />
     </Paper>
    </div>
  );
  }
};

export default AddBookPage;
