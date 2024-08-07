import React from 'react';
import { Box, Container } from '@mui/material';
import AppTopBar from './AppTopBar';

const Skeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'grey',
        minHeight: '100vh',
        padding: "0px"
      }}
    >
      
      <Container id="mainContainer"
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          minWidth: 430,
          width: '50%',
          padding: "0px !important"
        }}
      >
        <AppTopBar />
        {children}
      </Container>
    </Box>
  );
};

export default Skeleton;
