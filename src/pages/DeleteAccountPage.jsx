import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/DeleteAccountPage.css'; 
import axios from '../utils/axiosInstance'; 

const DeleteAccountPage = () => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user/account`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Your account has been deleted.');
      localStorage.removeItem('access_token');
      window.location.href = '/';
    } catch (err) {
      alert('Failed to delete account.');
    }
  };

  return (
    <DashboardLayout>
      <div className="delete-container">
        <h2>Delete Account</h2>
        <p className="warning-text">This action is irreversible. All your data will be permanently deleted.</p>
        <button onClick={handleDelete} className="delete-btn">Confirm Delete</button>
      </div>
    </DashboardLayout>
  );
};

export default DeleteAccountPage;