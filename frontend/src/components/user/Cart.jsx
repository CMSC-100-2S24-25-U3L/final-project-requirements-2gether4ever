import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/shop/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/shop/products');
  };

  if (cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart to see them here!</p>
        <button className="continue-shopping" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.product._id} className="cart-item">
            <div className="item-image">
              <img src={item.product.imageUrl || '/placeholder-image.jpg'} alt={item.product.name} />
            </div>

            <div className="item-details">
              <h3>{item.product.name}</h3>
              <p className="item-price">₱{item.product.price.toFixed(2)}</p>
              <p className="item-category">{item.product.category}</p>
            </div>

            <div className="item-quantity">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="item-subtotal">
              ₱{(item.product.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.product._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <span>Total:</span>
          <span className="total-price">₱{total.toFixed(2)}</span>
        </div>

        <div className="cart-actions">
          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cart.items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
