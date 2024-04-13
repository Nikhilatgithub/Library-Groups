import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function MediaCard() {
    const navigate = useNavigate();
    const handlelogin = (e) => {
      
        // You can perform form validation and submission logic here
        navigate('/login');
      
      };
      const handleregister = (e) => {
      
        // You can perform form validation and submission logic here
        navigate('/Register');
     
      };
    
  return (
    <Card sx={{ maxWidth: 720 ,width: 600}}>
      <CardMedia
        component="img"
        alt="books"
        height="350"
        image={require('../assets/books bg.jpg')}   //"/../assets/books bg.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Welcome To IACSD...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This site is for maintaning
          the record for library group books.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handlelogin}>Login</Button>
        <Button size="small" onClick={handleregister}>Create New Account</Button>
      </CardActions>
    </Card>
  );
}