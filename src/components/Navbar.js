import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import './NavbarStyles.css';
import { useFirebase } from '../firebases/firebaseDB';


function NavbarCustom() {
  const firebase = useFirebase();
  const [userProfile, setUserProfile] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
   
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
   
    if(firebase.user!==null)
    {
    setUserProfile(firebase.user);
    console.log(userProfile?.photoURL);
    }
   
  
  
}, []);

  return (
    <AppBar position="static" className="navbg-component">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} /> */}
          <Avatar
            alt="" 
            src= {require('../assets/books.jpg')}
            sx={{ width: 56, height: 56 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              position: 'end',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Library Groups
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              position= 'end'
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Button color="inherit" component={Link} to="/">Home</Button>
             <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/addrecord">Add Record</Button>
              {/* {pages.map((page) => (
                 <Button key={page} color="inherit" component={Link} to={`/${page.toLowerCase()}`}>
                 {page}
               </Button>
              ))} */}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
           
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              position: 'end',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Library Groups
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             <Button color="inherit" component={Link} to="/">Home</Button>
             <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/addBooks">Add Books</Button>
            <Button color="inherit" component={Link} to="/addStudent">Add Student</Button>
            <Button color="inherit" component={Link} to="/addrecord">Add Record</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  src={userProfile?.picture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
                <MenuItem  component={Link} to="/profile">
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                {/* <MenuItem  component={Link} to="/addBooks">
                  <Typography textAlign="center">Add Books</Typography>
                </MenuItem>
                <MenuItem  component={Link} to="/addStudent">
                  <Typography textAlign="center">Add Student</Typography>
                </MenuItem> */}
                <MenuItem  component={Link} to="/login">
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarCustom;