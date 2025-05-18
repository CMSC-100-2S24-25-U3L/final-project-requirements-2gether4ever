import { Link } from 'react-router-dom';

const Navbar = () => {
  const userType = localStorage.getItem('userType');

  return (
    <nav>
      {userType === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
      {userType === 'merchant' && <Link to="/merchant">Merchant Dashboard</Link>}
      {userType === 'user' && <Link to="/home">User Home</Link>}
      {userType && <Link to="/logout">Logout</Link>}
    </nav>
  );
};

export default Navbar;
