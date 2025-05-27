import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../../components/user/ProductList.jsx';
import './ShopPage.css';

const ShopPage = () => {
  const navigate = useNavigate();

  // Safe cart initialization
  const [cart, setCart] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cart'));
      if (
        saved &&
        typeof saved === 'object' &&
        Array.isArray(saved.items) &&
        typeof saved.total === 'number'
      ) {
        return saved;
      }
    } catch (err) {
      console.error('Failed to parse cart from localStorage:', err);
    }
    return { items: [], total: 0 };
  });

  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.items.findIndex(
      (item) => item.product._id === product._id
    );

    let updatedItems;
    if (existingIndex >= 0) {
      updatedItems = [...cart.items];
      updatedItems[existingIndex].quantity += quantity;
    } else {
      updatedItems = [...cart.items, { product, quantity }];
    }

    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const updatedCart = { items: updatedItems, total: newTotal };
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const goToCart = () => navigate('/shop/cart');

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>All Products</h1>
        <div className="cart-widget" onClick={goToCart}>
          <div className="cart-icon">
            <span className="material-icons">shopping_cart</span>
            {Array.isArray(cart.items) && cart.items.length > 0 && (
              <span className="cart-count">
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          {Array.isArray(cart.items) && cart.items.length > 0 && (
            <div className="cart-preview">
              <span>
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
              <span>₱{cart.total.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default ShopPage;
