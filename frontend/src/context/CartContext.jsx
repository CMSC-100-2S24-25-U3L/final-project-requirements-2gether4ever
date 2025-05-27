import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create Context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  total: 0
};

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';
const INITIALIZE_CART = 'INITIALIZE_CART';

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_CART: {
      return action.payload;
    }
    case ADD_TO_CART: {
      const existingProductIndex = state.items.findIndex(
        item => item.product._id === action.payload.product._id
      );

      let updatedItems;

      if (existingProductIndex >= 0) {
        // Product exists, increase quantity
        updatedItems = [...state.items];
        updatedItems[existingProductIndex] = {
          ...updatedItems[existingProductIndex],
          quantity: updatedItems[existingProductIndex].quantity + action.payload.quantity
        };
      } else {
        // Add new product
        updatedItems = [...state.items, action.payload];
      }

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      localStorage.setItem('cart', JSON.stringify({ items: updatedItems, total: newTotal }));

      return { items: updatedItems, total: newTotal };
    }
    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter(
        item => item.product._id !== action.payload.productId
      );

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      localStorage.setItem('cart', JSON.stringify({ items: updatedItems, total: newTotal }));

      return { items: updatedItems, total: newTotal };
    }
    case UPDATE_QUANTITY: {
      const updatedItems = state.items.map(item =>
        item.product._id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
        .filter(item => item.quantity > 0);
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      localStorage.setItem('cart', JSON.stringify({ items: updatedItems, total: newTotal }));

      return { items: updatedItems, total: newTotal };
    }
    case CLEAR_CART: {
      localStorage.removeItem('cart');
      return initialState;
    }
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.items && parsedCart.total !== undefined) {
          dispatch({ type: INITIALIZE_CART, payload: parsedCart });
        }
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Actions
  const addToCart = (product, quantity = 1) => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
