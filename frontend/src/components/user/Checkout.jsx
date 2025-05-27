import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { createTransaction } from '../../../api/transaction';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    deliveryAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    paymentMethod: 'cod',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['deliveryAddress', 'city', 'state', 'zipCode', 'phoneNumber'];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) errors[field] = 'This field is required';
    });

    if (formData.paymentMethod === 'credit') {
      ['cardNumber', 'cardName', 'expiryDate', 'cvv'].forEach(field => {
        if (!formData[field].trim()) errors[field] = 'Required for credit card';
      });
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Invalid card number';
      }
      if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        errors.expiryDate = 'Use MM/YY format';
      }
      if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = 'Invalid ZIP code';
    }

    if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Invalid 10-digit phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      const items = cart.items.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const subtotal = cart.total;
      const tax = parseFloat((subtotal * 0.07).toFixed(2));
      const total = parseFloat((subtotal + tax).toFixed(2));

      const transactionData = {
        deliveryAddress: formData.deliveryAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phoneNumber: formData.phoneNumber,
        paymentMethod: formData.paymentMethod,
        items,
        subtotal,
        tax,
        total,
        notes: formData.notes
      };

      const response = await createTransaction(transactionData);
      clearCart();
      navigate(`/order-confirmation/${response.transactionId}`);
    } catch (err) {
      setError('Checkout failed. Try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate('/cart');

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Delivery Address</label>
          <textarea name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} required />
          <small>{formErrors.deliveryAddress}</small>
        </div>

        <div className="form-row">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <small>{formErrors.city}</small>
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <small>{formErrors.state}</small>
        </div>

        <div className="form-row">
          <input type="text" name="zipCode" placeholder="ZIP Code" value={formData.zipCode} onChange={handleChange} />
          <small>{formErrors.zipCode}</small>
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <small>{formErrors.phoneNumber}</small>
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="cod">Cash on Delivery</option>
            <option value="gcash">GCash</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="credit">Credit Card</option>
          </select>
        </div>

        {formData.paymentMethod === 'credit' && (
          <div className="credit-card-fields">
            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} />
            <small>{formErrors.cardNumber}</small>
            <input type="text" name="cardName" placeholder="Cardholder Name" value={formData.cardName} onChange={handleChange} />
            <small>{formErrors.cardName}</small>
            <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} />
            <small>{formErrors.expiryDate}</small>
            <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} />
            <small>{formErrors.cvv}</small>
          </div>
        )}

        <div className="form-group">
          <label>Order Notes (Optional)</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </div>

        <div className="checkout-summary">
          <p>Subtotal: ₱{cart.total.toFixed(2)}</p>
          <p>Tax (7%): ₱{(cart.total * 0.07).toFixed(2)}</p>
          <h3>Total: ₱{(cart.total * 1.07).toFixed(2)}</h3>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleBack}>Back to Cart</button>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
