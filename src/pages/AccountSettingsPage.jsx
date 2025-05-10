import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import axios from '../utils/axiosInstance';
import '../styles/AccountSettings.css';
import { useNavigate } from 'react-router-dom';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/user/me')
      .then(res => setProfile(res.data))
      .catch(() => setMessage('❌ Failed to fetch user profile'));
  }, []);

  const handleUpdateInfo = async () => {
    try {
      await axios.put('/user/update', profile);
      setMessage('✅ Profile info updated!');
    } catch {
      setMessage('❌ Failed to update info');
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put('/user/update-password', {
        old_password: oldPassword,
        new_password: newPassword
      });
      setOldPassword('');
      setNewPassword('');
      setMessage('✅ Password changed successfully!');
    } catch {
      setMessage('❌ Failed to change password. Check your old password.');
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('This will permanently delete your account. Continue?');
    if (!confirm) return;

    try {
      await axios.delete('/user/account');
      localStorage.removeItem('access_token');
      alert('✅ Account deleted.');
      navigate('/');
    } catch {
      alert('❌ Failed to delete account.');
    }
  };

  return (
    <DashboardLayout>
      <div className="account-settings-container">
        <h1 className="page-title">⚙️ Account Settings</h1>

        {message && <p className="feedback-msg">{message}</p>}

        <section className="account-section">
          <h2>✏️ Update Info</h2>
          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <button onClick={handleUpdateInfo}>Save Info</button>
        </section>

        <section className="account-section">
          <h2>🔒 Change Password</h2>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>Update Password</button>
        </section>

        <section className="account-section">
          <h2>🗑 Delete Account</h2>
          <button className="danger-btn" onClick={handleDeleteAccount}>Delete My Account</button>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AccountSettingsPage;