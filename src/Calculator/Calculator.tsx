import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button } from '@mui/material';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    if (!isNaN(number1) && !isNaN(number2)) {
      setResult(number1 + number2);
    }
  };

  return (
    <Container
      maxWidth="xs"
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Calculator
        </Typography>
        <TextField
          label="Number 1"
          variant="outlined"
          margin="normal"
          fullWidth
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <TextField
          label="Number 2"
          variant="outlined"
          margin="normal"
          fullWidth
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleCalculate}
        >
          Calculate
        </Button>
        {result !== null && (
          <Typography variant="h6" component="div" sx={{ mt: 2 }}>
            Result: {result}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Calculator;
