// src/pages/OrderHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/OrderService';
import OrderCard from '../../components/user/OrderCard';
// import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p>Loading order history...</p>;

  return (
    <div className="order-history">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))
      )}
    </div>
  );
};

export default OrderHistoryPage;
