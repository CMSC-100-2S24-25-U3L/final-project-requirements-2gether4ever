import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userType = localStorage.getItem('userType');
  const [isOpen, setIsOpen] = useState(false);

  const renderLinks = () => {
    if (userType === 'admin') {
      return (
        <>
          <Link to="/admin">Admin Dashboard</Link>
          <Link to="/logout">Logout</Link>
        </>
      );
    }

    if (userType === 'Customer') {
      return (
        <>
          <Link 
            to="/home"
            className="h-full flex items-center px-4 py-2 hover:bg-[#a8b059] hover:scale-105 transition duration-200 ease-in-out rounded"
          >Home</Link>
          <Link 
            to="/shop/cart"
            className="h-full flex items-center px-4 py-2 hover:bg-[#a8b059] hover:scale-105 transition duration-200 ease-in-out rounded"
          >🛒 View Cart</Link>
          <Link 
            to="/shop/order-history"
            className="h-full flex items-center px-4 py-2 hover:bg-[#a8b059] hover:scale-105 transition duration-200 ease-in-out rounded"
          >📦 Order History</Link>
          <Link 
            to="/logout"
            className="h-full flex items-center px-4 py-2 hover:bg-[#a8b059] hover:scale-105 transition duration-200 ease-in-out rounded"
          >Logout</Link>
        </>
      );
    }

    // If not logged in or unknown role
    return null;
  };


  return (
    <nav className="fixed h-[75px] top-0 w-full bg-[#FFF8E1] z-50 px-4 shadow-md text-black">
      <div className="flex items-center justify-between h-full">
        <Link to="/">
          <img src="/logo/3.png" alt="The Nature's Basket" className="h-10" />
        </Link>

        {/* Hamburger button (shown on small screens) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Links (hidden on small screens, shown on md+) */}
        <div className="hidden md:flex h-full items-center">
          {renderLinks()}
        </div>
      </div>

      {/* Dropdown menu for mobile */}
      {isOpen && (
        <div className="mt-4 flex flex-col space-y-2 md:hidden">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
