import { useState } from 'react';
import { Link, Links } from 'react-router-dom';

const Navbar = () => {
  const userType = localStorage.getItem('userType');
  const [isOpen, setIsOpen] = useState(false);

  const navLink = (destination, label) => {
    return (
      <Link
        to={`${destination}`}
          className="
          h-full 
          flex items-center 
          px-4 py-2 
          hover:bg-[#a8b059] hover:scale-105 transition duration-200 ease-in-out hover:rounded"
      >
        {label}
      </Link>
    );
  }

  const renderLinks = () => {
    if (userType === 'admin') {
      return (
        <>
          {navLink('/admin', 'Admin Dashboard')}
          {navLink('/admin/users', 'User Management')}
          {navLink('/admin/products', 'Product Listings')}
          {navLink('/admin/orders', 'Order Management')}
          {navLink('/admin/sales-report', 'Sales Reports')}
          {navLink('/logout', 'Logout')}
        </>
      );
    }

    if (userType === 'Customer') {
      return (
        <>
          {navLink('/home', 'Home')}
          {navLink('/shop', '🛍️ Browse Products')}
          {navLink('/shop/cart', '🛒 View Cart')}
          {navLink('/shop/order-history', '📦 Order History')}
          {navLink('/profile', '👤 Profile')}
          {navLink('/logout', 'Logout')}
        </>
      );
    }

    // If not logged in or unknown role
    return null;
  };


  return (
    <nav className="fixed h-[75px] top-0 w-full bg-[#FFF8E1] z-50 shadow-md text-black">
      <div className="flex items-center justify-between h-full">
        <Link to="/home">
          <img src="/logo/3.png" alt="The Nature's Basket" className="h-[70px] mx-1" />
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
        <div className="flex flex-col md:hidden">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
