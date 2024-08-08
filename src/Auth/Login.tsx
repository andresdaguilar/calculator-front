import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../helpers/apiRequest';

const Login = () => {
  const { user, setUser } = useContext(AppContext);
  const [ email, setEmail ] = useState('andresd.aguilar@gmail.com');
  const [ password, setPassword ] = useState('1234');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your login logic here
    setUser({ email, token: '1234', balance: 0 });
    try{
      const login = await apiRequest({token: '', url: '/user/login', method: 'POST', data: { email, password }, params: {}}); 
      console.log("Login", login);
      setUser({ email: login.email, token: login.token, balance: login.balance });
      navigate('/');
    }catch (error) {
    console.log(error)
    }    
    navigate('/');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <img src="/logo.png" alt="logo" width="130" height="80" />
        <Typography variant="h6" component="h2" gutterBottom>
          User Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </Box>
    </Container>
  );
}

export default Login;