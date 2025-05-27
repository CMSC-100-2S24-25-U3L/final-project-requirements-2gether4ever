import axios from 'axios';


export const loginUser = async (credentials) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, credentials);
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userType', user.userType);
  return user;
};


