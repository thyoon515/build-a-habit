import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Signup = ({ setUserLoggedIn }) => {

  const [signupUserInputs, setSignupUserInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    fetch(`/users`, {
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        first_name: signupUserInputs.first_name,
        last_name: signupUserInputs.last_name,
        email: signupUserInputs.email,
        password: signupUserInputs.password
      })
    })
    .then(res => {
      if(res.ok){
          res.json().then(() => {
            setUserLoggedIn(true)
            //setCurrentUser(newUser)
            navigate('/')
          })
      }else{
          res.json().then((e) => {
            setErrors(e.errors)
          })
      }
    })
  }

  const handleUserInputChange = (e) => {
    const key = e.target.id
    setSignupUserInputs({
      ...signupUserInputs,
      [key]: e.target.value
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSignupSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="first_name"
                label="First Name"
                value={signupUserInputs.first_name}
                onChange={handleUserInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                value={signupUserInputs.last_name}
                onChange={handleUserInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                value={signupUserInputs.email}
                onChange={handleUserInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                value={signupUserInputs.password}
                onChange={handleUserInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <div>
           {errors && (
           <ul style={{ color: "red" }}>
             {errors.map((error) => (
               <li key={error}>{error}</li>
            ))}
           </ul>
           )}
          </div>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup