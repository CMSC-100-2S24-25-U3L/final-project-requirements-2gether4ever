// src/components/OrderCard.jsx
import React from 'react';
// import './OrderCard.css';

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.product._id}>
            {item.product.name} x {item.quantity}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> ₱{order.total.toFixed(2)}</p>
    </div>
  );
};

export default OrderCard;
