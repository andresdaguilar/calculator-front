import React, { useEffect, useState, useRef, useContext } from 'react';
import { Box, Container, TextField, Typography, Button, Card, Grid, Tooltip, Alert, CircularProgress } from '@mui/material';
import OperationTypes from '../helpers/operationTypes.enum';
import buttons from './buttons';
import apiRequest from './helpers';

import "./styles.css";
import { AppContext } from '../context/AppContext';

interface iOperationTypes {
  id: number, 
  type: string,
  cost: number  
}
const Calculator = () => {
  const [ operationTypes, setOperationTypes ]= useState<iOperationTypes[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ input, setInput] = useState('');
  const [ result, setResult] = useState<string | null>(null);
  const [ isValid, setIsValid ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useContext(AppContext);

  const handleClear= () => {
    console.log("clear")
    setInput('');
    setIsValid(true);
    setErrorMessage('');
  }

  const handleRandomString= () => {
    console.log('RANDOM STRING')
  }

  const getOperationType = (operator: string) => {    
    switch(operator) {
      case '+':
        return OperationTypes.ADDITION;
      case '-':
        return OperationTypes.SUBTRACTION;
      case 'x':
        return OperationTypes.MULTIPLICATION;
      case '/':
        return OperationTypes.DIVISION;
      case "sr":
        return OperationTypes.SQUARE_ROOT;
      case "random":
        return OperationTypes.RANDOM_STRING;
    }
  }

  const getOperationDetails = (operationType: string) : iOperationTypes | null => {
    const operation = operationTypes.find((operation: any) => operation.type === getOperationType(operationType));
    if (operation) {
      return operation;
    }
    return null
  }

  const handleInput= (type: string, value: string | undefined) => {
    console.log('input', type, value)
    setIsValid(true);
    const regex = /[+\-*/]/;
    if(regex.test(input) && type === 'operator') {
      setErrorMessage('Only 1 operation at a time');
      setIsValid(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return
    } 

    switch(type) {
      case 'clear':
        handleClear();
        break;
      case 'random':
        handleRandomString();
        break;
      case 'operator':
        if (value === 'sr') {
          calculate('sr');
          break;
        }else{
          setInput(input + value);          
          break;
        }        
      case 'input':
        setInput(input + value);
        break;
      case 'text':
        //Validate that only 1 operation is present
        const regex = /[+\-x/]/g;
        const matches = value?.match(regex);
        console.log(value,"matches",matches?.length)
        if (matches && matches.length > 1) {
          setIsValid(false);
          setErrorMessage('Only 1 operation at a time');
          
        }else {
          //Check invalid chars
          const ValidCharsRegex = /^[123456789+\-./*]*$/;
          if (!ValidCharsRegex.test(value || '')){
            setIsValid(false);
            setErrorMessage('Invalid character');            
          }else{
            setInput(value || '');            
          }
        }      
        break; 
      case 'calculate':
        calculate();
        break;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const extractSymbol = (str: string) => {
    const regex = /[+\-*/]/;
    const match = str.match(regex);
    return match ? match[0] : '';
  };

  const calculate = (operationType? : string) => {
    //Get Operation Type    
    const operationDetails = getOperationDetails(operationType || extractSymbol(input))
    console.log('Calculate', input, operationDetails?.cost)
    //Get values
    //Validate balance
    //Execute operation
    //Display Result
    }
  interface iButton {
    label: string;
    type: string,
    value?: string,
    className: string;
    tooltip: string;
    width?: number;
  }
  
  const CalcButton = (button: iButton) => {
    return (
      <Tooltip title={button.tooltip} placement="top">
        <Grid item xs={button.width || 3} className={`calc-item ${button.className}`} >
          <Button onClick={() => handleInput(button.type, button.value)}>
            {button.label}
          </Button>
        </Grid>
      </Tooltip>
    )
  }
  useEffect(() => {
    //Get Operations
    const fetchOperations = async () => {
      try {
        const operations =  await apiRequest({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMzA1NjIwMywiZXhwIjoxNzIzMDU5ODAzfQ.GySmCYRZled-_6Y-aUAjAkugvqRFrNpBGQnCweYOoaY", url: '/operation', method: 'GET', data: {}, params: {} });
        setOperationTypes(operations)
        setIsLoading(false);
      } catch(error) {
        console.log(error);
      }
      
    }
    fetchOperations();
  }, [])

  //Display Operation costs
  //Get operations
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 66px)',
      }}
    >
      { isLoading&& (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      <Card
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
        <Grid container spacing={0} className="calc-grid">
          <Grid item xs={12} className="calc-input">
            <TextField
              inputRef={inputRef}
              value={input}
              onChange={(e) => handleInput("text", e.target.value)}
              sx={{ input: { textAlign: "right",fontFamily: "Calculator, sans-serif", fontSize: "32px", color: "white" },  marginRight: "5px", width: "96%",backgroundColor: "grey",  padding: "5px", border: "0px", textAlign: "right"}}
              className="calculator"
            />
          </Grid>
          {buttons.map((button, index) => (
            <CalcButton key={index} {...button} />
          ))}
        </Grid>
        
        
        { !isValid && 
          <Box sx={{ margin: "10px"}}>
            <Alert severity="warning">{errorMessage}</Alert>
          </Box>
          }
        Cost:
        Balance:
        {result !== null && (
          <Typography variant="h6" component="div" sx={{ mt: 2 }}>
            Result: {result}
          </Typography>
        )}
      </Card>
    </Container>
  );
};

export default Calculator;
