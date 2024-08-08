import React, { useEffect, useState, useRef, useContext } from 'react';
import { Box, Container, TextField, Typography, Button, Card, Grid, Tooltip, Alert, CircularProgress, Paper } from '@mui/material';
import buttons from './buttons';
import apiRequest, { getOperationType, getValuesAndOperation } from './helpers';

import "./styles.css";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OperationTypes from '../helpers/operationTypes.enum';
import iOperationTypes from './iOperationTypes';

const Calculator = () => {
  const [ operationTypes, setOperationTypes ]= useState<iOperationTypes[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ input, setInput] = useState('');
  const [ result, setResult] = useState<string | null>(null);
  const [ isValid, setIsValid ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ operationCost, setOperationCost ] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { user, setUser } = useContext(AppContext);

  const handleClear= () => {
    setInput('');
    setIsValid(true);
    setErrorMessage('');
  }

  const handleRandomString= async () => {
    const operationDetail = operationTypes.find((operation: any) => operation.type === OperationTypes.RANDOM_STRING);
    if (operationDetail?.id)
    try {
      const result = await apiRequest({token: user.token, url: '/record', method: 'POST', data: {amount: 0, amount2: 0, operation_id: operationDetail.id}, params: {}});
      setInput(result.operation_response);
      setUser({ ...user, balance: result.user_balance});
    } catch (error){
      console.log(error)  
    }
    console.log('RANDOM STRING')
  }

  const handleAddCredit = () => {
    navigate('/add-credit');
  }
  
  const handleInput= async  (type: string, value: string | undefined) => {
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
          await calculate('sr');
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
        if (matches && matches.length > 1) {
          setIsValid(false);
          setErrorMessage('Only 1 operation at a time');
          
        }else {
          //Check invalid chars
          const ValidCharsRegex = /^[0123456789+\-./*]*$/;
          if (!ValidCharsRegex.test(value || '')){
            setIsValid(false);
            setErrorMessage('Invalid character');            
          }else{
            setInput(value || '');            
          }
        }      
        break; 
      case 'calculate':
        await calculate();
        break;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  

  const getOperationDetails = (operationType: string) : iOperationTypes  => {
    console.log(operationType);
    const operationName = getOperationType(operationType);
    console.log(operationType, operationName);
    const operation = operationTypes.find((operation: any) => operation.type === operationName);
    if (operation) {
      return operation;
    }
    return {id: 0, type: '', cost: '0'}
  }

  const calculate = async (operationType? : string) => {
    //Calculate result if user has enough balance
    //Get Operation Type and Operation Id based on the symbol used for the operation
    //Get amounts from the input depending on the operation type  
    let amountValue, amount2Value, costValue= 0;
    let operationDetails;
    if (operationType === 'sr') {
      amountValue = parseFloat(input);
      amount2Value = 0;
      operationDetails = getOperationDetails(operationType);
      costValue = parseFloat(operationDetails.cost);         
    } else{
      const { amount1, amount2, operation } = getValuesAndOperation(input);
      operationDetails = getOperationDetails(operation);
      amountValue = amount1;
      amount2Value = amount2;
      costValue = parseFloat(operationDetails.cost);
    }
  
    setOperationCost(costValue);
    if (costValue > user.balance) {
      setIsValid(false);
      setErrorMessage('Insufficient balance');
      return;
    }else {
      //Execute operation
      try {
        const result = await apiRequest({token: user.token, url: '/record', method: 'POST', data: {amount: amountValue, amount2: amount2Value, operation_id: operationDetails.id }, params: {} });
        setInput(result.operation_response)  ;
        setUser({ ...user, balance: result.user_balance});
      } catch (error) {
        console.log(error);
      }            
    }
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
        const operations =  await apiRequest({token: user.token, url: '/operation', method: 'GET', data: {}, params: {} });
        setOperationTypes(operations)
        setIsLoading(false);
      } catch(error) {
          navigate('/login');
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              console.error('Unauthorized: 401');
              navigate('/login');
            } else {
              console.log(`Error: ${error.response.status}`);
            }
          } else {
            console.log('Error: No response from server');
          }
        } else {
          console.log('Error: Something went wrong');
        }
        setIsLoading(false);
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
        <Grid container sx={{margin:"10px"}}>
          <Grid item xs={6}>Your Balance: <p>{user.balance}</p></Grid>
          <Grid item xs={6}>Cost: <p>{operationCost}</p></Grid>
          <Grid item xs={12}>
            <Button onClick={() => handleAddCredit}>Add credit</Button>
          </Grid>
        </Grid>        
        
      </Card>
      <Box >
      <Paper sx={{margin:"30px", padding: "20px"}}>
        <h3>Operation Costs</h3>
        <ul>
          {operationTypes.map((operation: iOperationTypes) => (
            <li key={operation.id}>
              {operation.type} - {operation.cost}
            </li>
          ))}
          </ul>
      </Paper>
      </Box>
    </Container>
  );
};

export default Calculator;
