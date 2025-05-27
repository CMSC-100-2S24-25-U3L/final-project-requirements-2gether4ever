import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = ({ 
  cartProp = null, 
  updateQuantityProp = null, 
  removeFromCartProp = null, 
  clearCartProp = null 
}) => {
  const navigate = useNavigate();
  
  // Try to use context first, fallback to props
  let cart, updateQuantity, removeFromCart, clearCart;
  
  try {
    const cartContext = useCart();
    cart = cartProp || cartContext.cart;
    updateQuantity = updateQuantityProp || cartContext.updateQuantity;
    removeFromCart = removeFromCartProp || cartContext.removeFromCart;
    clearCart = clearCartProp || cartContext.clearCart;
  } catch (error) {
    // Context not available, use props
    cart = cartProp;
    updateQuantity = updateQuantityProp;
    removeFromCart = removeFromCartProp;
    clearCart = clearCartProp;
  }
  
  // Ensure we have cart data
  if (!cart) {
    return (
      <div className="empty-cart">
        <h2>cart not available</h2>
        <p>Unable to load cart data.</p>
      </div>
    );
  }

  const total = cart.total || 0;
  console.log("Cart Items:", cart.items);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart?.(productId);
    } else {
      updateQuantity?.(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/shop/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  // Helper function to get image URL with fallback
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-product.jpg';

    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // If it starts with a slash, it's a relative path from server
    if (imageUrl.startsWith('/')) {
      return `http://localhost:5000${imageUrl}`;
    }

    // Otherwise, prepend the server URL
    return `http://localhost:5000/${imageUrl}`;
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = '/placeholder-product.jpg';
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>your cart is empty</h2>
        <p>Add some products to your cart to see them here!</p>
        <button className="continue-shopping" onClick={handleContinueShopping}>
          continue shopping
        </button>
      </div>
    );
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-main">
        <div className="cart-header">
          <h2>your cart</h2>
          <div className="cart-items-count">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </div>
          <div className="shipping-notice">Free shipping on orders over ₱2,000</div>
        </div>

        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.product._id} className="cart-item">
              <div className="item-image">
                <img
                  src={getImageUrl(item.product.image)}
                  alt={item.product.name}
                  onError={handleImageError}
                />
              </div>

              <div className="item-details">
                <h3>{item.product.name.toLowerCase()}</h3>
                <div className="item-price">₱{item.product.price.toFixed(2)}</div>
                <div className="item-category">{item.product.category?.toLowerCase()}</div>
              </div>

              <div className="item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="item-subtotal">
                ₱{(item.product.price * item.quantity).toFixed(2)}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart?.(item.product._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-summary">
        <div className="total-section">
          <div className="total-line">
            <span>Subtotal:</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
          <div className="total-line">
            <span>Shipping:</span>
            <span>{total >= 2000 ? 'Free' : '₱100.00'}</span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span className="total-price">
              ₱{(total + (total >= 2000 ? 0 : 100)).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="shipping-note">
          {total < 2000 && `Add ₱${(2000 - total).toFixed(2)} more for free shipping`}
          {total >= 2000 && 'You qualify for free shipping!'}
        </div>

        <div className="cart-actions">
          <button className="clear-cart" onClick={() => clearCart?.()}>
            clear cart
          </button>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={!cart.items || cart.items.length === 0}
          >
            proceed to checkout
          </button>
          <div className="payment-options">
            <span>We accept: </span>
            <span>💳 Card • 🏦 Bank • 📱 E-wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;