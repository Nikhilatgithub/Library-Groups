import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FooterImage from '../assets/hearder img.jpg';
function Footer() {
  return (
    <Box
      component="footer"
      className='footerImg'
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        py: 3,
        px: 2,
        textAlign: 'center',
        position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,

      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        Library Group Management
        </Typography>
        <Typography sx={{ fontSize: '1rem'}}>
            Developed by NikhiL March-24 Batch
        </Typography> 
    
    </Box>
  );
}

export default Footer;
