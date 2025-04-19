import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [resetToken, setResetToken] = useState('');
  const [displayToken, setDisplayToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  useEffect(() => {
    // Simulate the token being passed from /forgot-password page or stored in local/session
    const token = localStorage.getItem('reset_token'); // or replace with actual token if needed
    if (token) {
      setResetToken(token);
      const preview = token.slice(0, 6) + '...' + token.slice(-4);
      setDisplayToken(preview);
    }
  }, []);

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      alert('❌ Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }

    if (newPassword === oldPassword) {
      alert('❌ New password cannot be the same as old password.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/reset-password`, {
        token: resetToken,
        new_password: newPassword,
      });

      alert('✅ Password reset successful!');
      localStorage.removeItem('reset_token');
      navigate('/');
    } catch (err) {
      alert(`❌ Reset failed: ${err.response?.data?.detail || 'Unknown error'}`);
    }
  };

  return (
    <div className="login-container">
      <div className="right-side">
        <form className="login-form" onSubmit={handleReset}>
          <h1 className="form-title">Reset Password</h1>

          {displayToken && (
            <p style={{ color: '#fff', fontWeight: 'bold' }}>
              Reset Token: <span>{displayToken}</span>
            </p>
          )}

          <input
            type="password"
            className="styled-input"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="styled-input"
            placeholder="New Strong Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button className="btn primary-btn" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;