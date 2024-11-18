import API from './src/services/api.js';

// Test the /test endpoint
const testAPI = async () => {
  try {
    const response = await API.get('/users/test');
    console.log(response.data); // Should log: { message: 'API is working!' }
  } catch (error) {
    console.error('API Test failed:', error.message);
  }
};

testAPI();
