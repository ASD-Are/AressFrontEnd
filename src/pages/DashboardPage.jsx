import React, { useState } from 'react';
import '../styles/Dashboard.css';
import logo from '../assets/logo.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <div className="action-group">
            <button>Start New Scan</button>
            <button>List All Scans</button>
            <button>Get Scan by ID</button>
            <button>Delete Scan</button>
          </div>
        );
      case 'export':
        return (
          <div className="action-group">
            <button>Download JSON</button>
            <button>Download PDF</button>
            <button>Download AI Report</button>
          </div>
        );
      case 'tools':
        return (
          <div className="action-group">
            <button>View Available Tools</button>
            <button>Search Scan Data</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger + Sidebar */}
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-menu">
          <button className="menu-link">👤 My Profile</button>
          <button className="menu-link">✏️ Update Info</button>
          <button className="menu-link">🔒 Change Password</button>
          <button className="menu-link">🗑 Delete Account</button>
          <button className="menu-link">📕 Log Out</button>
        </div>
      </div>

      {/* Top bar */}
      <div className="top-bar">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '|||' : '≡'}
        </button>
        <img src={logo} alt="ARESS Logo" className="dashboard-logo" />
      </div>

      {/* Main Section */}
      <div className="main">
        <h1 className="dashboard-title">ARESS Security Toolkit</h1>
        <p className="dashboard-subtext">
          Run scans, export reports, and search data securely.
        </p>

        {/* Tabs */}
        <div className="tab-selector">
          <button
            className={activeTab === 'scan' ? 'active-tab' : ''}
            onClick={() => setActiveTab('scan')}
          >
            🛡 Scan Management
          </button>
          <button
            className={activeTab === 'export' ? 'active-tab' : ''}
            onClick={() => setActiveTab('export')}
          >
            📄 Export Reports
          </button>
          <button
            className={activeTab === 'tools' ? 'active-tab' : ''}
            onClick={() => setActiveTab('tools')}
          >
            🧠 Tools & Search
          </button>
        </div>

        <div className="tab-rail" />
        <div className={`tab-underline ${activeTab}`} />

        {/* Actions */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;