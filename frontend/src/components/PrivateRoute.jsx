import { Navigate } from 'react-router-dom';
import { getUserFromToken } from '../api/auth';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log("User: ", user)

  const userRole = user.userType?.toLowerCase();
  const hasRole = allowedRoles?.some(role => role.toLowerCase() === userRole);

  if (allowedRoles && !hasRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
