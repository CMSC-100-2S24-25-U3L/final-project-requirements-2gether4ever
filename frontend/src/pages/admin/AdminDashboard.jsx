import Navbar from '../../components/NavBar';
import Layout from '../../components/Page_Paddings';
import { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import AdminUserList from './AdminUserList';
import AdminProductListings from './AdminProductListings';
import AdminOrders from './AdminOrders';
import AdminSalesReport from './AdminSalesReport';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    users: 0,
    products: 0,
    orders: 0,
    sales: 0,
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Placeholder for real auth

  // Fetch summary data (replace with your real endpoints)
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const api = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(`${api}/user/admin/summary`);
        const data = await res.json();
        setSummary({
          users: data.users,
          products: data.products,
          orders: data.orders,
          sales: data.sales,
        });
      } catch (err) {
        // handle error
      }
    };
    fetchSummary();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="admin-dashboard">
        <header className="admin-header">
          <div>
            <h1>Welcome, Admin!</h1>
            <p className="admin-subtitle">Current Statistics:</p>
          </div>
          <Link to='/logout'><button className="logout-btn">Logout</button></Link>
        </header>

        <div className="summary-grid">
          <div className="summary-card">
            <h3>Total Users</h3>
            <div className="amount">{summary.users}</div>
          </div>
          <div className="summary-card">
            <h3>Total Products</h3>
            <div className="amount">{summary.products}</div>
          </div>
          <div className="summary-card">
            <h3>Total Orders</h3>
            <div className="amount">{summary.orders}</div>
          </div>
          <div className="summary-card">
            <h3>Total Sales</h3>
            <div className="amount">₱{summary.sales}</div>
          </div>
        </div>

        <div className="quick-links" style={{ marginBottom: '2rem' }}>
          <h2>Navigation</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/admin/users" className="btn btn-primary">User Management</Link>
            <Link to="/admin/products" className="btn btn-primary">Product Listings</Link>
            <Link to="/admin/orders" className="btn btn-primary">Order Management</Link>
            <Link to="/admin/sales-report" className="btn btn-primary">Sales Reports</Link>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AdminDashboard;
