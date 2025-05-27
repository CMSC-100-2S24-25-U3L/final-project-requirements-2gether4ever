import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h2>403 - You are not authorized to view this page.</h2>
      <p>Redirecting in 5 seconds...</p>
    </div>
  );
};

export default Unauthorized;
