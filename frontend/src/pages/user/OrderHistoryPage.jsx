// src/pages/OrderHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../../components/user/OrderCard';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Cancelled', value: 'canceled' }
];

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

  const fetchOrders = async (status) => {
    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/user-transaction`;
      if (status && status !== 'all') url += `/${status}`;
      const res = await axios.get(url);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      setOrders([]);
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(tab);
  }, [tab]);

  return (
    <div className="order-history">
      <h1>Your Orders</h1>
      <div className="order-tabs" style={{ marginBottom: 16 }}>
        {TABS.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            style={{
              marginRight: 8,
              fontWeight: tab === t.value ? 'bold' : 'normal',
              borderBottom: tab === t.value ? '2px solid #333' : 'none'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading order history...</p>
      ) : orders.length === 0 ? (
        <p>You have no {tab === 'all' ? '' : tab} orders.</p>
      ) : (
        <ErrorBoundary>
          {!loading && orders.length > 0 && (
            <>
              {console.log('Orders:', orders)}
              {orders.map(order => <OrderCard key={order._id} order={order} />)}
            </>
          )}
        </ErrorBoundary>
      )}
    </div>
  );
};



export default OrderHistoryPage;
