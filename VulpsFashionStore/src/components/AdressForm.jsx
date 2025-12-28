import React, { useState } from 'react';
import './AddressForm.css';

const AdressForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', streetName: '', houseNumber: '', city: '', zip: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-wrapper">
      {/* Dynamic Background Elements */}
      <div className="aurora-container">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>

      <div className="glass-card">
        <div className="header-section">
          <h2>Shipping Details</h2>
          <p>Complete your order for Vulps Fashion</p>
        </div>
        
        <form className="animated-form">
          <div className="input-row-group">
            <div className="floating-group">
              <input type="text" name="fullName" required onChange={handleChange} />
              <label>Full Name</label>
            </div>
            <div className="floating-group">
              <input type="tel" name="phone" required onChange={handleChange} />
              <label>Phone Number</label>
            </div>
          </div>

          <div className="floating-group">
            <input type="text" name="streetName" required onChange={handleChange} />
            <label>Street Name / Landmark</label>
          </div>

          <div className="form-row">
            <div className="floating-group">
              <input type="text" name="houseNumber" required onChange={handleChange} />
              <label>Apt/House #</label>
            </div>
            <div className="floating-group">
              <input type="text" name="city" required onChange={handleChange} />
              <label>City</label>
            </div>
            <div className="floating-group">
              <input type="text" name="zip" required onChange={handleChange} />
              <label>ZIP Code</label>
            </div>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="save" />
            <label htmlFor="save">Save address for faster checkout</label>
          </div>

          <button type="submit" className="prime-button">
            Confirm & Continue
            <span className="arrow">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdressForm;