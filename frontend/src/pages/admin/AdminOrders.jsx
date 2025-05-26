// import Navbar from '../../components/NavBar';
import { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/admin/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusMap = {
    pending: 0,
    completed: 1,
    canceled: 2,
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === statusMap[filter];
  });

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      setOrders(orders.map(order => 
        order._id === updatedOrder._id ? updatedOrder : order
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Completed';
      case 2: return 'Canceled';
      default: return 'Unknown';
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      
      <div className="filter-controls">
        <label>Filter by status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Email</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Date Ordered</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order._id || Math.random()}>
              <td>{order._id?.substring(0, 8) || 'N/A'}...</td>
              <td>{order.email || 'N/A'}</td>
              <td>{order.productName || `Product ID: ${order.productId || 'N/A'}`}</td>
              <td>{order.quantity ?? '-'}</td>
              <td>{order.dateOrdered ? new Date(order.dateOrdered).toLocaleDateString() : 'N/A'}</td>
              <td>{getStatusText(order.status)}</td>
              <td>
                {order.status === 0 && (
                  <>
                    <button onClick={() => updateOrderStatus(order._id, 1)}>Confirm</button>
                    <button onClick={() => updateOrderStatus(order._id, 2)}>Cancel</button>
                  </>
                )}
                {order.status === 1 && (
                  <span className="completed-badge">Completed</span>
                )}
                {order.status === 2 && (
                  <span className="canceled-badge">Canceled</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;

