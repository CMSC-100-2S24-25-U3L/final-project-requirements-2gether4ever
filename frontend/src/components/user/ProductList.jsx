import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/product';
import Product from '../Product';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    priceRange: { min: 0, max: 1000 },
    sortBy: 'name-asc'
  });

  const categories = ['Gulay', 'Prutas', 'Karne at Itlog', 'Bigas at Butil', 'Mga Gawa sa Sakahan', 'Organik'];

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        console.log('API URL:', import.meta.env.VITE_API_URL || 'http://localhost:5000/api');  // log API URL
        console.log('Fetched products:', data);  // log raw fetched data
        const productArray = Array.isArray(data) ? data : data.products || [];
        setProducts(productArray);
        setFilteredProducts(productArray);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let result = [...products];
    console.log('Applying filters on products:', result.length);

    // Search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product =>
        product.name?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
      console.log(`After search filter (${filters.search}):`, result.length);
    }

    // Category filter (type field)
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
      console.log(`After category filter (${filters.category}):`, result.length);
    }

    // Price range filter
    result = result.filter(product =>
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
    );
    console.log(`After price filter (min: ${filters.priceRange.min}, max: ${filters.priceRange.max}):`, result.length);

    // Sorting
    const [sortField, sortDirection] = filters.sortBy.split('-');
    result.sort((a, b) => {
      if (sortField === 'price') {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
      } else {
        const nameA = a.name?.toUpperCase() || '';
        const nameB = b.name?.toUpperCase() || '';
        if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }
    });
    console.log('After sorting:', result.map(p => p.name));

    setFilteredProducts(Array.isArray(result) ? result : []);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'min' || name === 'max') {
      setFilters(prev => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          [name]: isNaN(Number(value)) ? 0 : Number(value)
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      <div className="filters-container">
        <div className="filter-group">
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group price-range">
          <span>Price: </span>
          <input
            type="number"
            name="min"
            placeholder="Min"
            value={filters.priceRange.min}
            onChange={handleFilterChange}
            className="price-input"
          />
          <span> to </span>
          <input
            type="number"
            name="max"
            placeholder="Max"
            value={filters.priceRange.max}
            onChange={handleFilterChange}
            className="price-input"
          />
        </div>

        <div className="filter-group">
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="sort-select"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Product
              key={product._id}
              product={product}
              addToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <div className="no-products">No products found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
