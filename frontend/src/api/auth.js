import axios from 'axios';

export const loginUser = async (credentials) => {
  const response = await axios.post('/user/login', credentials);
  const { token, user } = response.data;

  // Save token and role to localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('userType', user.userType);

  return user;
};
