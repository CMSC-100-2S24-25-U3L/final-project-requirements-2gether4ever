// import Navbar from '../../components/NavBar'; // Was not used

import { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminUserList from './AdminUserList';
import AdminProductListings from './AdminProductListings';
import AdminOrders from './AdminOrders';
import AdminSalesReport from './AdminSalesReport';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Placeholder for real auth

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      <div className="dashboard-container">
        <nav className="sidebar">
          <ul>
            <li className={activeTab === 'users' ? 'active' : ''}>
              <Link to="/admin/users" onClick={() => setActiveTab('users')}>User Management</Link>
            </li>
            <li className={activeTab === 'products' ? 'active' : ''}>
              <Link to="/admin/products" onClick={() => setActiveTab('products')}>Product Listings</Link>
            </li>
            <li className={activeTab === 'orders' ? 'active' : ''}>
              <Link to="/admin/orders" onClick={() => setActiveTab('orders')}>Order Management</Link>
            </li>
            <li className={activeTab === 'sales' ? 'active' : ''}>
              <Link to="/admin/sales" onClick={() => setActiveTab('sales')}>Sales Reports</Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/admin/users" element={<AdminUserList />} />
            <Route path="/admin/products" element={<AdminProductListings />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/sales" element={<AdminSalesReport />} />
            <Route path="/admin" element={<Navigate to="/admin/users" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
