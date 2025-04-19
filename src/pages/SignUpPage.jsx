import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import '../styles/SignUpPage.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isSignedUp, setIsSignedUp] = useState(false); // ✅ handle state

  return (
    <div className="signup-container">
      <div className="top-right">
        <button type="button" className="btn login-top-btn" onClick={() => navigate('/')}>
          LOGIN
        </button>
      </div>

      <div className="left-side">
        <img src={logo} alt="Aress Logo" className="logo" />
        <h2 className="brand-name">ARESS</h2>
      </div>

      <div className="right-side">
        {!isSignedUp ? (
          <SignUpForm onSuccess={() => setIsSignedUp(true)} />
        ) : (
          <div className="success-message">
            <h2 className="form-title">✅ Registered Successfully!</h2>
            <p className="success-text">You can now log in with your credentials.</p>
            <button className="btn secondary-btn" onClick={() => navigate('/')}>
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;