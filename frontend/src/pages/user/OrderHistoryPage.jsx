// src/pages/OrderHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../../components/user/OrderCard';
import './OrderHistoryPage.css';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Cancelled', value: 'canceled' }
];

const statusLabels = {
  all: 'orders',
  completed: 'completed orders',
  pending: 'pending orders',
  canceled: 'cancelled orders'
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <p>Could not display some orders due to an error.</p>;
    }
    return this.props.children;
  }
}

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');
  const [canceling, setCanceling] = useState(null);
  const [counts, setCounts] = useState({
    all: 0,
    completed: 0,
    pending: 0,
    canceled: 0,
  });

  // Helper to count orders by status
  const computeCounts = (orders) => {
    const countObj = { all: orders.length, completed: 0, pending: 0, canceled: 0 };
    orders.forEach(order => {
      if (order.orderStatus === 0) countObj.pending += 1;
      else if (order.orderStatus === 1) countObj.completed += 1;
      else if (order.orderStatus === 2) countObj.canceled += 1;
    });
    return countObj;
  };

  const fetchOrders = async (status) => {
    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/user-transaction`;
      // Always fetch all for counting, then filter for display
      const res = await axios.get(url);
      const allOrders = Array.isArray(res.data) ? res.data : [];
      setCounts(computeCounts(allOrders));
      let filteredOrders = allOrders;
      if (status === 'completed') filteredOrders = allOrders.filter(o => o.orderStatus === 1);
      else if (status === 'pending') filteredOrders = allOrders.filter(o => o.orderStatus === 0);
      else if (status === 'canceled') filteredOrders = allOrders.filter(o => o.orderStatus === 2);
      setOrders(filteredOrders);
    } catch (error) {
      setOrders([]);
      setCounts({ all: 0, completed: 0, pending: 0, canceled: 0 });
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(tab);

  }, [tab]);

  const handleCancelOrder = async (orderId) => {
    setCanceling(orderId);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/user-transaction/cancel/${orderId}`
      );
      fetchOrders(tab);
    } catch (error) {
      alert('Failed to cancel order.');
    } finally {
      setCanceling(null);
    }
  };

  return (
    <div className="order-history">
      <h1>Your Orders</h1>
      <div className="order-tabs">
        {TABS.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`order-tab-btn${tab === t.value ? ' selected' : ''}`}
          >
            {t.label}
            <span className="order-tab-count">{counts[t.value]}</span>
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading order history...</p>
      ) : orders.length === 0 ? (
        <div className="order-history-empty">
          <span>🗂️</span>
          <p style={{ marginTop: 8 }}>You have no {statusLabels[tab]}.</p>
        </div>
      ) : (
        <ErrorBoundary>
          <div className="order-cards-container">
            {orders.map(order => (
              <OrderCard
                key={order._id}
                order={order}
                showCancel={tab === 'pending'}
                onCancel={() => handleCancelOrder(order._id)}
                canceling={canceling === order._id}
              />
            ))}
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default OrderHistoryPage;
