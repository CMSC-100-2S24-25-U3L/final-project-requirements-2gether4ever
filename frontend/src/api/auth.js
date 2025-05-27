import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/user/login`, credentials);
  const { token } = response.data;


  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token from server');
  }

  const decoded = jwtDecode(token);

  localStorage.setItem('token', token);
  localStorage.setItem('userType', decoded.userType);

  return decoded;
};

const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token || typeof token !== 'string') return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error('Invalid token:', err.message);
    return null;
  }
};

export { loginUser, getUserFromToken };