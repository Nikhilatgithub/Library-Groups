import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useFirebase } from '../firebases/firebaseDB';


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

function createData(name, prn) {
  return { name, prn};
}

let rows = [];

export default function StudentTables() {
  const firebase = useFirebase();
  const [count, setCount] = React.useState(0);
    
    // let rows = [];
    const handleClick = () => {
      setCount(count + 1); // Update state to trigger rerender
    };
  
    const getData = async() => {
     
      rows =  await firebase.getStudentToGroupRecord();
  
    // for (let index = 0; index < rows.length; index++) {
    //   const element = rows[index];
    //   console.log(element.name);
    // }
   
     handleClick();
    };

    React.useEffect(() => {
      getData();
    }, []);

  return (
    <div>
    <Button  onClick={getData} variant="contained" color="primary" >
         Show Students
        </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="right">PRN No.</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.studentName}>
              <StyledTableCell component="th" scope="row">
                {row.studentName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.prnNumber}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}