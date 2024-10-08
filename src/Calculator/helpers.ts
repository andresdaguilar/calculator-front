import axios, { Method } from 'axios';

import OperationTypes from '../helpers/operationTypes.enum';

const baseUrl = process.env.REACT_APP_API_URL;

interface ApiRequestParams {
  token: string;
  url: string;
  method?: Method;
  data?: any;
  params?: any;
}

/**
 * Make an API request using a provided token.
 * @param {string} token - The authentication token.
 * @param {string} url - The API endpoint URL.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {object} data - The data to be sent with the request (for POST, PUT, etc.).
 * @param {object} params - The query parameters to be sent with the request (for GET, DELETE, etc.).
 * @returns {Promise} - The axios response promise.
 */
const apiRequest = async ({token, url, method = 'GET', data = {}, params = {}} : ApiRequestParams ): Promise<any> => {
  try {
    const response = await axios({
      method: method,
      url: baseUrl+url,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: method === 'GET' ? null : data,
      params: method === 'GET' ? params : null
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const getOperationType = (operator: string) => {    
  switch(operator) {
    case '+':
      return OperationTypes.ADDITION;
    case '-':
      return OperationTypes.SUBTRACTION;
    case '*':
      return OperationTypes.MULTIPLICATION;
    case '/':
      return OperationTypes.DIVISION;
    case "sr":
      return OperationTypes.SQUARE_ROOT;
    case "random":
      return OperationTypes.RANDOM_STRING;
  }
}

interface OperationComponents {
  amount1: number;
  amount2: number;
  operation: string;
}
export const getValuesAndOperation = (input: string) : OperationComponents => {
  const regex = /^(\d+)([+\-*/])(\d+)$/;
  const match = input.match(regex);

  if (match) {
    const [, amount1, operation, amount2] = match;
    return {
      amount1: parseFloat(amount1),
      amount2: parseFloat(amount2),
      operation: operation,
    }
  } else {
      return {
        amount1: 0,
        amount2: 0,
        operation: ''
      }
  }    
}

export default apiRequest;
