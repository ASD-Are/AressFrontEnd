import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigator

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      localStorage.setItem('access_token', response.data.access_token);
      alert('✅ Login successful!');
      console.log('Token:', response.data.access_token);

      // ✅ Redirect to dashboard or home
      navigate('/first-dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('❌ Login failed: ' + (err.response?.data?.detail || 'Unknown error'));
    }
  };

  const goToSignUp = () => {
    navigate('/signup'); // ✅ Navigate to signup page
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h1 className="form-title">LOG IN</h1>
      <p className="form-subtext">
        Authenticate to access your scans, reports, and threat dashboard.
      </p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="styled-input"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="styled-input"
        required
      />

      <div className="button-row">
        <button type="submit" className="btn primary-btn">LOG IN</button>
        <span className="or-separator">OR</span>
        <button type="button" className="btn secondary-btn" onClick={goToSignUp}>
          SIGN UP
        </button>
      </div>

      <div className="bottom-links">
      <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
      </div>
    </form>
  );
};

export default LoginForm;
