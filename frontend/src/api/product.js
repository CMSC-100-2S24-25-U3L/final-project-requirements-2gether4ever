import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
        throw error;
    }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products in category ${category}:`, error);
        throw error;
    }
};

// Search products by term
export const searchProducts = async (searchTerm) => {
    try {
        const response = await axios.get(`${API_URL}/products/search?term=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error(`Error searching products with term "${searchTerm}":`, error);
        throw error;
    }
};

export default {
    fetchProducts,
    fetchProductById,
    fetchProductsByCategory,
    searchProducts
};