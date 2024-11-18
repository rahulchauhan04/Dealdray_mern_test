import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api', // Backend server base URL
});

export default API;
