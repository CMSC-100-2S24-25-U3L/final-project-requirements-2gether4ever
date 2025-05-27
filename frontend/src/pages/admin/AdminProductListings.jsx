// import Navbar from '../../components/NavBar';
import { useState, useEffect } from 'react';
import './AdminUserList.css'; // Reuse table styles

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminProductListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      type: product.category || product.type || '',
      price: product.price,
      quantity: product.quantity
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      type: '',
      price: '',
      quantity: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const res = await fetch(`${API_URL}/api/products/update/${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to update product');
      await fetchProducts();
      cancelEditing();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading-message">Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-management user-management-admin full-page-admin">
      <h2>Product Listings</h2>
      {products.length === 0 ? (
        <p className="no-users">No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type/Category</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category || product.type}</td>
                  <td>₱{Number(product.price).toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-primary" onClick={() => startEditing(product)}>Edit</button>
                      <button className="btn delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Edit Form */}
      {editingProduct && (
        <div className="popup-overlay">
          <div className="popup-form">
            <form className="edit-product-form" onSubmit={handleEditSubmit}>
              <h3>Edit Product</h3>
              <label>
                Name:
                <input name="name" value={formData.name} onChange={handleInputChange} required />
              </label>
              <label>
                Description:
                <input name="description" value={formData.description} onChange={handleInputChange} />
              </label>
              <label>
                Type/Category:
                <input name="type" value={formData.type} onChange={handleInputChange} />
              </label>
              <label>
                Price:
                <input name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} required />
              </label>
              <label>
                Quantity:
                <input name="quantity" type="number" value={formData.quantity} onChange={handleInputChange} required />
              </label>
              <div style={{marginTop: '1rem'}}>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" style={{marginLeft: '1rem'}} onClick={cancelEditing}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductListings;
