import Navbar from '../../components/NavBar';
import { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import Layout from '../../components/Page_Paddings';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/user-transaction`);
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
      const response = await fetch(`${API_URL}/user-transaction/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errMsg = await response.json();
        throw new Error(errMsg.message || 'Failed to update order status');
      }

      // Refetch all orders to ensure UI is up-to-date
      const refreshed = await fetch(`${API_URL}/user-transaction`);
      const data = await refreshed.json();
      setOrders(data);
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
    <>
      <Navbar />
// <<<<<<< backendFixes-nevi
//       <div className="order-management user-management-admin full-page-admin">
//         <h2>User Transactions</h2>
//         <div className="filter-controls" style={{ marginBottom: '1rem' }}>
//           <label>Filter by status:</label>
//           <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//             <option value="all">All Orders</option>
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//             <option value="canceled">Canceled</option>
//           </select>
//         </div>
//         <div className="table-responsive">
//           <table className="users-table">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>User Email</th>
//                 <th>Products</th>
//                 <th>Total</th>
//                 <th>Date Ordered</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map(order => (
//                 <tr key={order._id}>
//                   <td>{order._id?.substring(0, 8) || 'N/A'}...</td>
//                   <td>{order.email || order.userEmail || 'N/A'}</td>
//                   <td>
//                     {order.productId?.name || 'N/A'} x{order.orderQuantity ?? 1}
//                   </td>
//                   <td>
//                     ₱{order.productId && order.productId.price && order.orderQuantity
//                       ? (order.productId.price * order.orderQuantity).toFixed(2)
//                       : '0.00'}
//                   </td>
//                   <td>{order.dateOrdered ? new Date(order.dateOrdered).toLocaleDateString() : 'N/A'}</td>
//                   <td>{getStatusText(order.orderStatus)}</td>
//                   <td>
//                     {order.orderStatus === 0 && (
//                       <>
//                         <button
//                           className="btn btn-primary"
//                           onClick={() => updateOrderStatus(order._id, 1)}
//                         >
//                           Approve
//                         </button>
//                         <button
//                           className="btn delete-btn"
//                           onClick={() => updateOrderStatus(order._id, 2)}
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     )}
//                     {order.orderStatus === 1 && (
//                       <span className="completed-badge">Completed</span>
//                     )}
//                     {order.orderStatus === 2 && (
//                       <span className="canceled-badge">Canceled</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
// =======
      <Layout>
        <div className="order-management user-management-admin full-page-admin">
          <h2>User Transactions</h2>
          <div className="filter-controls" style={{ marginBottom: '1rem' }}>
            <label>Filter by status:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Email</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Date Ordered</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id?.substring(0, 8) || 'N/A'}...</td>
                    <td>{order.email || order.userEmail || 'N/A'}</td>
                    <td>
                      {order.productId?.name || 'N/A'} x{order.orderQuantity ?? 1}
                    </td>
                    <td>
                      ₱{order.productId && order.productId.price && order.orderQuantity
                        ? (order.productId.price * order.orderQuantity).toFixed(2)
                        : '0.00'}
                    </td>
                    <td>{order.dateOrdered ? new Date(order.dateOrdered).toLocaleDateString() : 'N/A'}</td>
                    <td>{getStatusText(order.orderStatus)}</td>
                    <td>
                      {order.orderStatus === 0 && (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => updateOrderStatus(order._id, 1)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn delete-btn"
                            onClick={() => updateOrderStatus(order._id, 2)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {order.orderStatus === 1 && (
                        <span className="completed-badge">Completed</span>
                      )}
                      {order.orderStatus === 2 && (
                        <span className="canceled-badge">Canceled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
// >>>>>>> main
    </>
  );
};

export default AdminOrders;

