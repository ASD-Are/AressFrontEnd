import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignUpPage.css';

const SignUpForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert('❌ Please enter a valid Gmail address.');
      return;
    }
    if (!validatePassword(formData.password)) {
      alert('❌ Password must be strong (8+ chars, uppercase, lowercase, number, special char)');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('❌ Passwords do not match.');
      return;
    }

    try {
      const { confirmPassword, ...payload } = formData;
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('access_token', res.data.access_token);
      onSuccess(); // ✅ Trigger success handler
    } catch (err) {
      console.error('❌ Signup error:', err.response?.data || err);
      alert(`Signup failed: ${JSON.stringify(err.response?.data || err.message)}`);
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h1 className="form-title">SIGN UP</h1>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="styled-input"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Gmail Address"
        value={formData.email}
        onChange={handleChange}
        className="styled-input"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Strong Password"
        value={formData.password}
        onChange={handleChange}
        className="styled-input"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="styled-input"
        required
      />
      <button type="submit" className="btn primary-btn">REGISTER</button>
    </form>
  );
};

export default SignUpForm;