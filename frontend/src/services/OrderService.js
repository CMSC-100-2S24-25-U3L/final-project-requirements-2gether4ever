import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchOrders = async () => {
    const response = await axios.get(`${API_URL}/orders/my-orders`, {
        headers: getAuthHeader(),
    });
    return response.data;
};