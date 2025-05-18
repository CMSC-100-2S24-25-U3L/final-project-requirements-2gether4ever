import React from 'react';
import './Product.css';

const Product = ({ product, addToCart }) => {
  const { name, price, image, unit, description, quantity } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image ? `http://localhost:5000${image}` : '/placeholder-product.jpg'} alt={name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">₱{price}/{unit}</p>
        <p className="product-description">{description}</p>
        <p className="product-stock">Stock: {quantity} {unit}</p>
        <button
          className="add-to-cart-btn"
          onClick={addToCart}
          disabled={quantity <= 0}
        >
          {quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default Product;
