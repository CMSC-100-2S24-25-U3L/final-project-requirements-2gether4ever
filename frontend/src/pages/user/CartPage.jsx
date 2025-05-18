import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const updateQuantity = (productId, quantity) => {
    const updatedItems = cart.items.map(item =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    const newTotal = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const updatedCart = { items: updatedItems, total: newTotal };
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedItems = cart.items.filter(item => item.product._id !== productId);
    const newTotal = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const updatedCart = { items: updatedItems, total: newTotal };
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
    localStorage.removeItem('cart');
  };

  const handleCheckout = () => navigate('/shop/checkout');

  if (cart.items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <ul className="cart-items-list">
        {cart.items.map(({ product, quantity }) => (
          <li key={product._id} className="cart-item">
            <div className="item-info">
              <img src={product.image} alt={product.name} width={80} />
              <div>
                <h3>{product.name}</h3>
                <p>₱{product.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="item-actions">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => updateQuantity(product._id, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(product._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h2>Total: ₱{cart.total.toFixed(2)}</h2>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default CartPage;