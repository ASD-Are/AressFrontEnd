// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css'; // Reuse existing styles
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/forgot-password`, { email });
      const resetToken = res.data.reset_token;
  
      localStorage.setItem('reset_token', res.data.reset_token);
  
      alert('✅ Reset token received! Now resetting password...');
      navigate('/reset-password');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Error';
      if (typeof errorMsg === 'string') {
        alert(`❌ ${errorMsg}`);
      } else {
        alert('❌ User not found or something went wrong.');
      }
    }

  };

  return (
    <div className="login-container">
      <div className="right-side">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Forgot Password</h1>
          <input
            type="email"
            className="styled-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn primary-btn" type="submit">Send Reset Token</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;