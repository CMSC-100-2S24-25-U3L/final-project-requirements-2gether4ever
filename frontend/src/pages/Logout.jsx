import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
