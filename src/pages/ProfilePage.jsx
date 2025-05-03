import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/ProfilePage.css';
import axios from '../utils/axiosInstance'; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/'); // ⛔ No token, force redirect
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/'); // ⛔ Token expired, logout
        } else {
          alert('Failed to fetch user profile.');
        }
      });
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="profile-container">
        <h2>My Profile</h2>
        {user ? (
          <div className="profile-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;