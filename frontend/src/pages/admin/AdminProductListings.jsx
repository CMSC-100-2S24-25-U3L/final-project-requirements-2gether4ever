// import Navbar from '../../components/NavBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminProductListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '1',
    price: 0,
    quantity: 0
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/admin/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct ? `/admin/products/${editingProduct._id}` : '/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(editingProduct ? 'Failed to update product' : 'Failed to add product');
      }

      const updatedProduct = await response.json();

      if (editingProduct) {
        setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
      } else {
        setProducts([...products, updatedProduct]);
      }

      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        type: '1',
        price: 0,
        quantity: 0
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/admin/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      type: product.type.toString(),
      price: product.price,
      quantity: product.quantity
    });
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-management">
      <h2>Product Listings</h2>
      
      <div className="product-form">
        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="1">Crop</option>
              <option value="2">Poultry</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
          {editingProduct && (
            <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
          )}
        </form>
      </div>

      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => requestSort('type')}>
                Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => requestSort('price')}>
                Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => requestSort('quantity')}>
                Qty {sortConfig.key === 'quantity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.type === 1 ? 'Crop' : 'Poultry'}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => startEditing(product)}>Edit</button>
                  <button onClick={() => deleteProduct(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductListings;
