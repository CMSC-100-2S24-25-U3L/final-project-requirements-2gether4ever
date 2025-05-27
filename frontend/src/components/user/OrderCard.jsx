// src/components/OrderCard.jsx
import React from 'react';

const statusColors = {
  0: '#fbbf24', // Pending - Amber
  1: '#22c55e', // Completed - Green
  2: '#ef4444', // Canceled - Red
};

const statusLabels = {
  0: 'Pending',
  1: 'Completed',
  2: 'Canceled',
};

const OrderCard = ({ order }) => {
  if (!order || !order.productId) {
    return <div className="order-card error">Order data is incomplete.</div>;
  }

  return (
    <div
      className="order-card"
      style={{
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        background: '#f3f4f6',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        maxWidth: 320,
        fontSize: 14,
        color: '#222', 
      }}
    >
      <div style={{ marginBottom: 4 }}>
        <strong>Order ID:</strong> <span style={{ color: '#555' }}>{order._id}</span>
      </div>
      <div style={{ marginBottom: 4 }}>
        <strong>Date:</strong>{' '}
        <span style={{ color: '#555' }}>
          {order.dateOrdered ? new Date(order.dateOrdered).toLocaleString() : 'N/A'}
        </span>
      </div>
      <div style={{ marginBottom: 4 }}>
        <strong>Product:</strong>{' '}
        <span style={{ color: '#333' }}>{order.productId.name}</span>
      </div>
      <div style={{ marginBottom: 4 }}>
        <strong>Qty:</strong> {order.orderQuantity}
      </div>
      <div style={{ marginBottom: 4 }}>
        <strong>Unit:</strong> ₱{order.productId.price.toFixed(2)}
      </div>
      <div style={{ marginBottom: 4 }}>
        <strong>Total:</strong>{' '}
        <span style={{ color: '#0d9488', fontWeight: 'bold' }}>
          ₱{(order.productId.price * order.orderQuantity).toFixed(2)}
        </span>
      </div>
      <div>
        <strong>Status:</strong>{' '}
        <span
          style={{
            color: '#fff',
            background: statusColors[order.orderStatus] || '#888',
            padding: '1px 8px',
            borderRadius: 10,
            fontWeight: 'bold',
            fontSize: 12,
          }}
        >
          {statusLabels[order.orderStatus] || 'Unknown'}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
