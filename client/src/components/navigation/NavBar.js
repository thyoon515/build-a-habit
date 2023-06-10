import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ setUserLoggedIn, userLoggedIn }) => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', {
      method: "DELETE",
    }).then(() => { 
      setUserLoggedIn(false)
      navigate('/')
    })
  }

  const loggedInLinks = () => {
    return(
      <>
        <Button color="inherit" component={ Link } to="/tasks">Today</Button>
        <Button color="inherit" onClick={ handleLogout }>Logout</Button>
      </>
    )
  }

  const loggedOutLinks = () => {
    return(
    <>
      <Button color="inherit" component={ Link } to="/login">Login</Button>
    </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography fontWeight='900' fontStyle='italic' color="#fafafa" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Build-A-Habit
          </Typography>
          { userLoggedIn ? loggedInLinks() : loggedOutLinks() }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar