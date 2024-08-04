import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function AppTopBar() {
  return (
    
      <AppBar position="static"  sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <img src="icon.png" alt="logo" width="40" height="40" style={{margin: "10px"}} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Arithmetic Calculator
          </Typography>
          <Button color="inherit">Sign out</Button>
        </Toolbar>
      </AppBar>

  );
}