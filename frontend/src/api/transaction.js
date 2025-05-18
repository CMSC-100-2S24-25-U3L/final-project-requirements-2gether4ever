import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders`, 
      orderData,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Fetch all orders for the current user
export const fetchOrders = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/orders/my-orders`,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Fetch a specific order by ID
export const fetchOrderById = async (orderId) => {
  try {
    const response = await axios.get(
      `${API_URL}/orders/${orderId}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

// Cancel an order
export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.put(
      `${API_URL}/orders/${orderId}/cancel`,
      {},
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error(`Error cancelling order ${orderId}:`, error);
    throw error;
  }
};

export default {
  createOrder,
  fetchOrders,
  fetchOrderById,
  cancelOrder
};