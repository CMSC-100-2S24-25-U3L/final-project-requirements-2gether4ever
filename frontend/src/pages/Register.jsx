import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
        firstName, lastName, email, password,
      });
      const user = await loginUser({ email, password }); // stores token & userType
      if (user.userType === 'admin') navigate('/admin');
      else if (user.userType === 'merchant') navigate('/merchant');
      else navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className='w-50 h-200'>
      <label htmlFor="firstName">First Name</label>
      <input 
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)} 
        className='border-1 border-amber-400'
      />
      <label htmlFor="lastName">Last Name</label>
      <input 
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)} 
        className='border-1 border-amber-400'
      />
      <label htmlFor="email">Email</label>
      <input 
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)} 
        className='border-1 border-amber-400'
      />
      <label htmlFor="password">Password</label>
      <input 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)} 
      />
      <button type="submit" className='btn-primary btn'>
        Register
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Register;
