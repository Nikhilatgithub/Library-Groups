import * as React from 'react';
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


// function refresh(){
//   React.useEffect(() => {
//       getData();
    
//     }, []);
// }
const customId = ''+getCurrentMonthID();
const handleClick = () => {
 // getData();
};
export default function BookTable() {
    const firebase = useFirebase();
    let rows =[];
    
    const getData = async() => {
    
     rows=[];

    const querySnapshot = await getDocs(collection(firebase.getFirestoreData(), "books_"+customId));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const d =doc.data();
      
      rows.push(createData( d.bookname,  d.bookid));
    });

   console.log(rows);
   console.log(rows[0].name);
    };
    // 
  return (
    <div>
      <Button  onClick={getData} variant="contained" color="primary" >
           Show Books
          </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Book Name</StyledTableCell>
            <StyledTableCell align="right">Book Id</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.bookname}
              </StyledTableCell>
              <StyledTableCell align="right">{row.id}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}