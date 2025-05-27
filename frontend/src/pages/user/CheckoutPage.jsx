import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [form, setForm] = useState({ name: '', email: '', address: '', cardNumber: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some(val => !val)) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    const orderDetails = { ...form, cart };
    localStorage.removeItem('cart');
    navigate('/shop/confirmation', { state: orderDetails });
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        {['name', 'email', 'address', 'cardNumber', 'expiry', 'cvv'].map(field => (
          <input
            key={field}
            name={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
          />
        ))}
        {error && <p className="error">{error}</p>}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;