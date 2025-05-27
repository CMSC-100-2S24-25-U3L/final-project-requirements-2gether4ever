import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(form);

      const userType = user.userType;
      if (userType === 'admin') navigate('/admin');
      else navigate('/home');
    } catch (err) {
      console.log("Error: ", err.message);
      alert('Invalid credentials');
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
          onSubmit={handleSubmit}
          className='
            space-y-4
          '
        >
          <img src="/logo/3.png" alt="Logo" className="h-16 mx-auto" />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
          />
        
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
          />
        
          <button
            type="submit"
            className="
            btn
            btn-primary
            w-full"
          >
            Login
          </button>
          <hr />
        </form>
        <div
          className='flex justify-between items-center'
        >
          <p>No Account?</p>
          <Link
            to='/register'
          >
            <button
              className="
              btn
              btn-primary
              "
            >
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Login;
