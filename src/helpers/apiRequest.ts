import axios, { Method } from 'axios';

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

export default apiRequest;