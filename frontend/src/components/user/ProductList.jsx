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
    sortBy: 'name-asc',
    category: '',
  });

  const categories = [
    'Gulay',
    'Prutas',
    'Karne at Itlog',
    'Bigas at Butil',
    'Mga Gawa sa Sakahan',
    'Organik'
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();

        const productArray = Array.isArray(data) ? data : data.products || [];
        console.log('✅ Products fetched:', productArray.length);
        setProducts(productArray);
        setFilteredProducts(productArray);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
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

    // 🔍 Search
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        product =>
          product.name?.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term)
      );
    }

    // 📂 Category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // 💸 Price range
    result = result.filter(product =>
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
    );

    // ↕️ Sorting
    const [field, direction] = filters.sortBy.split('-');
    result.sort((a, b) => {
      if (field === 'price') {
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
      } else {
        const nameA = a.name?.toUpperCase() || '';
        const nameB = b.name?.toUpperCase() || '';
        return direction === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
    });

    setFilteredProducts(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'min' || name === 'max') {
      setFilters(prev => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          [name]: Number(value)
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
        {filteredProducts.length > 0 ? (
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
