import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/TabNavigation.css';

const tabs = [
  { label: 'Scan Management', icon: '🛡', path: '/scan/start' },
  { label: 'Export Reports', icon: '📄', path: '/export/json' },
  { label: 'Tools & Search', icon: '🧠', path: '/tools/view' }
];

const MainTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="main-tab-selector">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          className={`main-tab-button ${location.pathname.startsWith(tab.path) ? 'active-tab' : ''}`}          onClick={() => navigate(tab.path)}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
      <div className={`tab-rail`} />
    </div>
  );
};

export default MainTabNavigation;