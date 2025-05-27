import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const res = await axios.post('http://localhost:5000/user/register', {
        email,
        password,
      });
      
      // After registration, automatically login the user
      // const user = await loginUser({ email, password });

      navigate('/home');

    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className='w-50 h-200'>
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
