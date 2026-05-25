import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [form, setForm] = useState({ name: '', email: '', address: '', cardNumber: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).some(val => !val)) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);

    try {
      if (!cart.items || cart.items.length === 0) {
        setError('Your cart is empty');
        setLoading(false);
        return;
      }

      // Loop through each cart item and send an order
      for (const item of cart.items) {
        const prodId = item.product?._id || item.product || item._id;
        if (!prodId || typeof prodId === 'object' && !prodId._id) {
          setError('Invalid product details in cart. Please clear your cart and add the items again.');
          setLoading(false);
          return;
        }

        const finalProdId = typeof prodId === 'object' ? prodId._id : prodId;

        //testing purposes
        console.log('Placing order:', {
          productId: finalProdId,
          orderQuantity: item.quantity,
          email: form.email,
        });
        await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/user-transaction/order`,
          {
            productId: finalProdId,
            orderQuantity: item.quantity,
            email: form.email,
          }
        );
      }
      localStorage.removeItem('cart');
      navigate('/shop/confirmation', { state: { ...form, cart } });
    } catch (err) {
      const serverMessage = err.response?.data?.message || err.response?.data?.error || err.message;
      setError(`Order failed: ${serverMessage}`);
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
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
        <button type="submit" disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</button>
      </form>
    </div>
  );
};

export default CheckoutPage;