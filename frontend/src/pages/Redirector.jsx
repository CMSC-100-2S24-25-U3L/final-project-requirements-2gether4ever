import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../api/auth'; 

const Redirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserFromToken();

    if (user?.userType === 'Customer') {
      navigate('/home');
    } else if (user?.userType === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <h1>Redirecting...</h1>;
};

export default Redirector;