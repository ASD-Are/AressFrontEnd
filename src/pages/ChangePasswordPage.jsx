import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/ChangePassword.css';
import axios from '../utils/axiosInstance';

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage('✅ Password updated successfully!');
      setFormData({ old_password: '', new_password: '' });
    } catch (err) {
      setMessage('❌ Failed to update password. Check your old password.');
    }
  };

  return (
    <DashboardLayout>
      <div className="password-container">
        <h2>Change Password</h2>
        <form className="password-form" onSubmit={handleSubmit}>
          <input
            type="password"
            name="old_password"
            placeholder="Current Password"
            value={formData.old_password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={formData.new_password}
            onChange={handleChange}
            required
          />
          <button type="submit">Update Password</button>
        </form>
        {message && <p className="feedback-msg">{message}</p>}
      </div>
    </DashboardLayout>
  );
};

export default ChangePasswordPage;