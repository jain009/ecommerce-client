import axios from 'axios';

// Create an axios instance with custom config
const api = axios.create({
  baseURL: 'https://ecommerce-backend-1-npbm.onrender.com/api',
  timeout: 5000, // 5 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')).token 
    : null;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Required for CORS
  config.headers['Access-Control-Allow-Origin'] = 'https://jovial-tartufo-794ca6.netlify.app';
  config.withCredentials = true;
  
  return config;
});
// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Interceptor Error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;

// In your HomeScreen
import api from '../path/to/axiosConfig';

const fetchProducts = async () => {
  try {
    setLoading(true);
    const { data } = await api.get('/products');
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  } catch (err) {
    console.error("Error fetching products:", err);
    setError(err.message || 'An unexpected error occurred');
    setLoading(false);
  }
};
