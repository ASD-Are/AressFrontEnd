import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MePage.css';

const MePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch current user on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      alert('🔒 Not authenticated');
      return navigate('/');
    }

    axios.get(`${process.env.REACT_APP_API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.error('Error fetching user:', err.response?.data || err.message);
      alert('⚠️ Failed to fetch user info');
      navigate('/');
    });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`);
    } catch (err) {
      console.warn("Logout request failed, proceeding anyway");
    }
    localStorage.removeItem('access_token');
    navigate('/');
  };
  
  return (
    <div className="me-container">
      {user ? (
        <div className="me-card">
          <h1>👤 Welcome, {user.full_name || 'User'}!</h1>
          <p>Email: {user.email}</p>
          <button className="logout-btn" onClick={handleLogout}>🚪 Log Out</button>
        </div>
      ) : (
        <p className="loading-text">Loading user info...</p>
      )}
    </div>
  );
};

export default MePage;