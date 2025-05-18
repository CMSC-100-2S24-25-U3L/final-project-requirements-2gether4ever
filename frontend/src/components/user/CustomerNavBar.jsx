import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './CustomerNavBar.css';

const CustomerNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const count = parsedCart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };
    
    // Update on mount
    updateCartCount();
    
    // Listen for storage events (for multi-tab support)
    window.addEventListener('storage', updateCartCount);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  return (
    <nav className={`customer-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo.png" alt="Farm to Table Logo" />
            <span>Farm to Table</span>
          </Link>
        </div>
        
        <div className="navbar-categories">
          <Link to="/shop/category/Gulay" className={location.pathname.includes('/category/Gulay') ? 'active' : ''}>
            🥕 Gulay
          </Link>
          <Link to="/shop/category/Prutas" className={location.pathname.includes('/category/Prutas') ? 'active' : ''}>
            🍌 Prutas
          </Link>
          <Link to="/shop/category/Karne at Itlog" className={location.pathname.includes('/category/Karne at Itlog') ? 'active' : ''}>
            🐔 Karne at Itlog
          </Link>
          <Link to="/shop/category/Bigas at Butil" className={location.pathname.includes('/category/Bigas at Butil') ? 'active' : ''}>
            🌾 Bigas at Butil
          </Link>
          <Link to="/shop/category/Mga Gawa sa Sakahan" className={location.pathname.includes('/category/Mga Gawa sa Sakahan') ? 'active' : ''}>
            🍯 Mga Gawa sa Sakahan
          </Link>
          <Link to="/shop/category/Organik" className={location.pathname.includes('/category/Organik') ? 'active' : ''}>
            🌱 Organik
          </Link>
        </div>
        
        <div className="navbar-actions">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search products..." 
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/shop/search?q=${e.target.value}`);
                }
              }}
            />
            <span className="material-icons">search</span>
          </div>
          
          <Link to="/shop/cart" className="cart-icon">
            <span className="material-icons">shopping_cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          {isLoggedIn ? (
            <div className="user-menu">
              <button className="user-button">
                <span className="material-icons">person</span>
              </button>
              <div className="dropdown-menu">
                <Link to="/shop/orders" onClick={closeMobileMenu}>My Orders</Link>
                <Link to="/profile" onClick={closeMobileMenu}>Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className="material-icons">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          <input 
            type="text" 
            placeholder="Search products..." 
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                navigate(`/shop/search?q=${e.target.value}`);
                closeMobileMenu();
              }
            }}
          />
          <span className="material-icons">search</span>
        </div>
        
        <div className="mobile-categories">
          <h3>Categories</h3>
          <Link to="/shop/category/Gulay" onClick={closeMobileMenu}>🥕 Gulay</Link>
          <Link to="/shop/category/Prutas" onClick={closeMobileMenu}>🍌 Prutas</Link>
          <Link to="/shop/category/Karne at Itlog" onClick={closeMobileMenu}>🐔 Karne at Itlog</Link>
          <Link to="/shop/category/Bigas at Butil" onClick={closeMobileMenu}>🌾 Bigas at Butil</Link>
          <Link to="/shop/category/Mga Gawa sa Sakahan" onClick={closeMobileMenu}>🍯 Mga Gawa sa Sakahan</Link>
          <Link to="/shop/category/Organik" onClick={closeMobileMenu}>🌱 Organik</Link>
        </div>
        
        <div className="mobile-actions">
          <Link to="/shop/cart" onClick={closeMobileMenu}>
            <span className="material-icons">shopping_cart</span> Cart ({cartCount})
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/shop/orders" onClick={closeMobileMenu}>
                <span className="material-icons">receipt</span> My Orders
              </Link>
              <Link to="/profile" onClick={closeMobileMenu}>
                <span className="material-icons">person</span> Profile
              </Link>
              <button onClick={() => { handleLogout(); closeMobileMenu(); }}>
                <span className="material-icons">logout</span> Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMobileMenu}>
              <span className="material-icons">login</span> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavBar;