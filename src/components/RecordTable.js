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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
let rows = [];

export default function RecordTables() {
  const firebase = useFirebase();
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount(count + 1); // Update state to trigger rerender
  };

  const getData = async() => {
    rows = await firebase.getBookRecord();
    handleClick();
  };

  React.useEffect(() => {
   rows = firebase.getBookRecord();
  }, []);

  return (
    <div>
       <Button  onClick={getData} variant="contained" color="primary" >
           Show Records
          </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="right">PRN No.</StyledTableCell>
            <StyledTableCell align="right">Book Name</StyledTableCell>
            <StyledTableCell align="right">Book No.</StyledTableCell>
            <StyledTableCell align="right">Taken Date</StyledTableCell>
            <StyledTableCell align="right">Last Student</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.studentName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.prnNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.bookName}</StyledTableCell>
              <StyledTableCell align="right">{row.bookId}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.lastStudent}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}