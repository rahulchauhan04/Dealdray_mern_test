import axios from 'axios';

// Configure Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5001/api', // Base URL for all API calls
});

export default API;
