import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import Layout from '../../components/Page_Paddings';
// import './OrderConfirmationPage.css'; 

const OrderConfirmationPage = () => {
  const { state: orderDetails } = useLocation();
  const navigate = useNavigate();

  if (!orderDetails) return <p>No order details found.</p>;

  const { name, email, address, cart } = orderDetails;

  return (
    <>
      <Navbar/>
      <Layout>
        <div className="order-confirmation-page">
          <h1>Thank you for your order, {name}!</h1>
          <p>Confirmation sent to <strong>{email}</strong>.</p>
          <h2>Shipping Address</h2>
          <p>{address}</p>
          <h2>Order Summary</h2>
          <ul>
            {cart.items.map(({ product, quantity }) => (
              <li key={product._id}>
                {product.name} x {quantity} = ₱{(product.price * quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ₱{cart.total.toFixed(2)}</h3>
          <p>We appreciate your business!</p>
          <div style={{ marginTop: '2rem' }}>
            <button onClick={() => navigate('/')} style={{ marginRight: '1rem' }}>
              ← Back to Home
            </button>
            <button onClick={() => navigate('/shop/order-history')}>
              🧾 View Order History
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrderConfirmationPage;
