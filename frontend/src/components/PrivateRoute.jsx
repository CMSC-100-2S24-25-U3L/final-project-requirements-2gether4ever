import { Navigate } from 'react-router-dom';
import { getUserFromToken } from '../api/auth';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
