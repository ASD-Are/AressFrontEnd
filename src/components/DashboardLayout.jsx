import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/DashboardLayout.css';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null); 
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme(); 


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleNavigation = (path) => {
    setMenuOpen(false); // Close sidebar on any menu click
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  // ✅ Highlight current page in sidebar
  const isActive = (path) => (location.pathname === path ? 'active-menu' : '');

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-menu">
        <button className={`menu-link ${isActive('/first-dash')}`} onClick={() => handleNavigation('/first-dashboard')}>
            Dashboard
          </button>
          <button className={`menu-link ${isActive('/dashboard')}`} onClick={() => handleNavigation('/dashboard')}>
            Scans
          </button>
          <button className={`menu-link ${isActive('/profile')}`} onClick={() => handleNavigation('/profile')}>
            My Profile
          </button>
          <button className={`menu-link ${isActive('/account-settings')}`} onClick={() => handleNavigation('/account-settings')}>
            Account Settings
          </button>
          

          {/* <button className={`menu-link ${isActive('/update-info')}`} onClick={() => handleNavigation('/update-info')}>
            ✏️ Update Info
          </button>
          <button className={`menu-link ${isActive('/change-password')}`} onClick={() => handleNavigation('/change-password')}>
            🔒 Change Password
          </button>
          <button className={`menu-link ${isActive('/delete-account')}`} onClick={() => handleNavigation('/delete-account')}>
            🗑 Delete Account
          </button> */}
          <button className="menu-link" onClick={() => {
            localStorage.removeItem('access_token');
            navigate('/');
          }}>
           Log Out
          </button>
     

        </div>
      </div>

      {/* Top Bar */}
      <div className="top-bar">
        <button
          ref={hamburgerRef}
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '‖' : '≡'}
        </button>
        {/* <img src={logo} alt="ARESS Logo" className="dashboard-logo" /> */}
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> {/* ✅ use toggle */}

      </div>

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;