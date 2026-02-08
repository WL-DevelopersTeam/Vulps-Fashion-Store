import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Unisex Hoodie',
      price: 1999,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Printed Men T-shirt',
      price: 899,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Women\'s Printed T-shirt',
      price: 799,
      image: 'https://via.placeholder.com/150'
    }
  ]);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title fade-in">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="empty-cart fade-in">
            <div className="empty-cart-icon">❤️</div>
            <h2>Your wishlist is empty</h2>
            <p>Start adding items you love to your wishlist!</p>
            <button className="cta-button" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {wishlistItems.map((item) => (
                <div key={item.id} className="cart-item wishlist-item slide-up">
                  <div className="item-image">
                    <div className="image-placeholder">{item.name}</div>
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="item-actions">
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="remove-btn">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;

