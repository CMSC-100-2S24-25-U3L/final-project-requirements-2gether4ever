import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { Link } from 'react-router-dom';
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
      // Register the user
      const res = await axios.post('http://localhost:5000/user/register', {
        firstName,
        lastName,
        email,
        password,
      });

      navigate('/login');

    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="
          w-80
          p-6
          bg-[#FFF8E1]
          rounded-xl
          shadow-md
          space-y-4
          border-2
          border-[#424242]
          text-black
        "
      >
        <form
          onSubmit={handleRegister}
          className='
            space-y-4
          '
        >
        <img src="/logo/3.png" alt="Logo" className="h-16 mx-auto" />
        <label htmlFor="firstName">First Name</label>
        <input
          type="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className='
            btn-primary
            btn
            w-full
          '
        >
          Register
        </button>
        {error && <p>{error}</p>}
        <hr />
        <div
            className='flex justify-between items-center'
          >
            <p>Have an account?</p>
            <Link
              to='/login'
            >
              <button
                className="
                btn
                btn-primary
                "
              >
                Back to Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
