import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';
import logo from '../assets/logo.png';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="left-side">
        <img src={logo} alt="Aress Logo" className="logo" />
        <h2 className="brand-name">ARESS</h2>
      </div>
      <div className="right-side">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;