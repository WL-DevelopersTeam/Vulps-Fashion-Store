import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Unisex Hoodie',
      price: 1999,
      quantity: 1,
      size: 'M',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Printed Men T-shirt',
      price: 899,
      quantity: 2,
      size: 'L',
      image: 'https://via.placeholder.com/150'
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 100;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title fade-in">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart fade-in">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button className="cta-button" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item slide-up">
                  <div className="item-image">
                    <div className="image-placeholder">{item.name}</div>
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-size">Size: {item.size}</p>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    <p className="total-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <button 
                      className="remove-btn" 
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary slide-left">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <button className="continue-shopping-btn" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

