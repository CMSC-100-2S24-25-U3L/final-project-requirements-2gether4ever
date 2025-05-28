import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../../components/user/Cart.jsx';
import Navbar from '../../components/NavBar.jsx';
import Layout from '../../components/Page_Paddings.jsx';

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const saved = localStorage.getItem('cart');
        if (saved) {
          const parsedCart = JSON.parse(saved);
          setCart(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCart({ items: [], total: 0 });
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = (updatedCart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const updateQuantity = (productId, quantity) => {
    const updatedItems = cart.items.map(item =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    const newTotal = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const updatedCart = { items: updatedItems, total: newTotal };
    saveCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedItems = cart.items.filter(item => item.product._id !== productId);
    const newTotal = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const updatedCart = { items: updatedItems, total: newTotal };
    saveCart(updatedCart);
  };

  const clearCart = () => {
    const emptyCart = { items: [], total: 0 };
    saveCart(emptyCart);
    localStorage.removeItem('cart');
  };

  return (
    <>
      <Navbar />
      <Layout>
        <Cart
          cartProp={cart}
          updateQuantityProp={updateQuantity}
          removeFromCartProp={removeFromCart}
          clearCartProp={clearCart}
        />
      </Layout>
    </>
  );
};

export default CartPage;