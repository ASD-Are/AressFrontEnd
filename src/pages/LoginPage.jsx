// import React from 'react';
// import LoginForm from '../components/LoginForm';
// import '../styles/LoginPage.css';
// import logo from '../assets/logo.png';

// const LoginPage = () => {
//   return (
//     <div className="login-container">
//       <div className="left-side">
//         <img src={logo} alt="Aress Logo" className="logo" />
//         <h2 className="brand-name">ARESS</h2>
//       </div>
//       <div className="right-side">
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React from 'react';
// import LoginForm from '../components/LoginForm';
// import SnakeModel from '../components/SnakeModel'; // 🐍 New import
// import '../styles/LoginPage.css';

// const LoginPage = () => {
//   return (
//     <div className="login-container">
//       <div className="left-side">
//   <div className="snake-hacker-wrapper">
//     <SnakeModel />
//     <img src="/hacker-protector.png" alt="Security Icon" className="hacker-image" />
//   </div>

//   <div className="branding-content">
//     <h1 className="brand-name">ARESS</h1>
//     <h2 className="tagline">Vulnerability Detection. AI-Powered. Always Watching.</h2>
//     <p className="subtext">Secure your web apps before attackers do. Run deep vulnerability scans in seconds.</p>
//   </div>
// </div>
//       <div className="right-side">
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from 'react';
import ThemeToggle from '../components/ThemeToggle'; // ✅ no curly braces
import LoginForm from '../components/LoginForm';
import SnakeModel from '../components/SnakeModel';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <div className="login-container">
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="left-side">
        <div className="snake-hacker-wrapper">
          <SnakeModel />
          <img src="/hacker-protector.png" alt="Security Icon" className="hacker-image" />
        </div>
        <div className="branding-content">
          <h1 className="brand-name">ARESS</h1>
          <h2 className="tagline">Vulnerability Detection. AI-Powered. Always Watching.</h2>
          <p className="subtext">Secure your web apps before attackers do. Run deep vulnerability scans in seconds.</p>
        </div>
      </div>

      <div className="right-side">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;