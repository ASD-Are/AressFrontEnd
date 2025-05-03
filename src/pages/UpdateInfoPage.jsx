import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/UpdateInfoPage.css';
import axios from '../utils/axiosInstance'; 

const UpdateInfoPage = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState({ name: false, email: false });
  const [temp, setTemp] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.get(`${process.env.REACT_APP_API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser(res.data);
      setTemp(res.data);
      setLoading(false);
    })
    .catch(() => {
      alert('Session expired. Redirecting...');
      localStorage.removeItem('access_token');
      window.location.href = '/';
    });
  }, []);

  const handleChange = (e) => {
    setTemp(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (field) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/update`, temp, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setUser(temp);
      setEditing({ name: false, email: false });
      alert('✅ Info updated!');
    } catch {
      alert('❌ Failed to update info.');
    }
  };

  return (
    <DashboardLayout>
      <div className="update-container">
        <h2>Update Info</h2>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <div className="terminal-card">
            <div className="field-group">
              <label>Name:</label>
              {editing.name ? (
                <input
                  type="text"
                  name="name"
                  value={temp.name}
                  onChange={handleChange}
                  autoFocus
                  className="terminal-input"
                />
              ) : (
                <span className="terminal-text" onClick={() => handleEdit('name')}>
                  {user.name || 'Click to edit'}
                </span>
              )}
            </div>
            <div className="field-group">
              <label>Email:</label>
              {editing.email ? (
                <input
                  type="email"
                  name="email"
                  value={temp.email}
                  onChange={handleChange}
                  className="terminal-input"
                />
              ) : (
                <span className="terminal-text" onClick={() => handleEdit('email')}>
                  {user.email || 'Click to edit'}
                </span>
              )}
            </div>

            {(editing.name || editing.email) && (
              <button onClick={handleSave} className="save-btn">Save Changes</button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UpdateInfoPage;