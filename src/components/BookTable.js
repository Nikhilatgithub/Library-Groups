import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFirebase } from '../firebases/firebaseDB';
import {  doc,setDoc, getFirestore,collection, getDoc, query, where, onSnapshot, getDocs } from "firebase/firestore";
import Book from '../firebases/BookDAO';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, id) {
  return { name, id};
}


const getCurrentMonthID = () => {
  const currentDate = new Date();
  const m=currentDate.getMonth() + 1;// Adding 1 because getMonth() returns zero-based index
  return currentDate.getFullYear()+''+''+m; 
};

let rows =[];
// function refresh(){
//   React.useEffect(() => {
//       getData();
    
//     }, []);
// }
const customId = ''+getCurrentMonthID();

export default function BookTable() {
    const firebase = useFirebase();
    const [count, setCount] = useState(0);
    
    // let rows = [];
    const handleClick = () => {
      setCount(count + 1); // Update state to trigger rerender
    };
  
    const getData = async() => {
     
      rows =  await firebase.getBooks();
    // rows=[];
    
    //  books.forEach(Book => {
    //   rows.push(createData(Book.name, Book.id));
    //  });
  //  await console.log("lenght"+rows.length);
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      console.log(element.name);
    }
    // console.log(rows);
    // console.log("lenght"+rows.length);
    handleClick();
    };

    React.useEffect(() => {
      getData();
    }, []);

    // 
  return (
    <div>
      <Button  onClick={getData} variant="contained" color="primary" >
           Show Books
          </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Book Name</StyledTableCell>
            <StyledTableCell align="right">Book Id</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.bookId}>
              <StyledTableCell component="th" scope="row">
                {row.bookName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.bookId}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}