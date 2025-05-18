import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTransactionById } from '../../../api/transaction';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(Boolean(transactionId));
  const [error, setError] = useState(null);

  const locationState = location.state || {};
  const locationOrder = locationState.orderDetails;
  const locationOrderId = locationState.orderId;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getTransactionById(transactionId);
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details.');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchOrderDetails();
    } else if (locationOrder) {
      setOrder(locationOrder);
    } else {
      setError('No order information found.');
    }
  }, [transactionId, locationOrder]);

  const handleContinueShopping = () => {
    navigate('/shop/products');
  };

  const handleViewOrders = () => {
    navigate('/shop/orders');
  };

  if (loading) {
    return (
      <div className="order-confirmation loading">
        <div className="loading-spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-confirmation error">
        <div className="error-icon">!</div>
        <h2>Order Not Found</h2>
        <p>{error || 'We could not find the order you are looking for.'}</p>
        <button className="primary-btn" onClick={handleViewOrders}>
          View Orders
        </button>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const estimatedDelivery = new Date(order.createdAt || Date.now());
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
  const deliveryDate = estimatedDelivery.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-header">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
          </div>
        </div>
        <h2>Order Confirmed!</h2>
        <p className="confirmation-message">
          Thank you for your order. Your order has been received and is now being processed.
        </p>
        <p className="order-id">Order ID: {order._id || locationOrderId}</p>
      </div>

      <div className="order-info">
        <div className="info-item">
          <span className="info-label">Order Date</span>
          <span className="info-value">{orderDate}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Payment Method</span>
          <span className="info-value">
            {{
              'cod': 'Cash on Delivery',
              'gcash': 'GCash',
              'bank_transfer': 'Bank Transfer',
              'credit': 'Credit Card'
            }[order.paymentMethod] || order.paymentMethod}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Estimated Delivery</span>
          <span className="info-value">{deliveryDate}</span>
        </div>
      </div>

      <div className="delivery-info">
        <h3>Delivery Information</h3>
        <p className="address">
          {order.deliveryAddress}, {order.city} {order.state} {order.zipCode}
        </p>
        <p className="phone">Phone: {order.phoneNumber || order.contactNumber}</p>
        {order.notes && <p className="notes">Notes: {order.notes}</p>}
      </div>

      <div className="order-items">
        <h3>Order Items</h3>
        <div className="items-table">
          <div className="table-header">
            <div className="header-item">Product</div>
            <div className="header-item">Price</div>
            <div className="header-item">Quantity</div>
            <div className="header-item">Total</div>
          </div>
          {order.items.map((item, index) => (
            <div key={index} className="table-row">
              <div className="row-item product-name">
                {item.productDetails?.name || item.productName}
              </div>
              <div className="row-item">
                ₱{item.price?.toFixed(2) || '0.00'}
              </div>
              <div className="row-item">{item.quantity}</div>
              <div className="row-item">
                ₱{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₱{order.subtotal?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span>₱{order.tax?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>₱{order.total?.toFixed(2) || order.totalAmount?.toFixed(2)}</span>
        </div>
      </div>

      <div className="confirmation-actions">
        <button className="secondary-btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="primary-btn" onClick={handleViewOrders}>
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
