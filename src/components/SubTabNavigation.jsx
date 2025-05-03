import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SubTabNavigation.css';

const subRoutes = {
  '/scan': [
    { label: 'Start New Scan', path: '/scan/start' },
    { label: 'List All Scans', path: '/scan/list' },
    { label: 'Get Scan by ID', path: '/scan/get' },
    { label: 'Delete Scan', path: '/scan/delete' },
  ],
  '/export': [
    { label: 'Download JSON', path: '/export/json' },
    { label: 'Download PDF', path: '/export/pdf' },
    { label: 'Download AI Report', path: '/export/ai' },
  ],
  '/tools': [
    { label: 'View Tools', path: '/tools/view' },
    { label: 'Search Data', path: '/tools/search' },
  ],
};

const SubTabNavigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const base = Object.keys(subRoutes).find((key) =>
      location.pathname.startsWith(key)
    );
  
    if (!base) return null;
  
    const links = subRoutes[base] || [];
  
    return (
      <div className="sub-tab-selector">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={location.pathname.startsWith(link.path) ? 'active-sub-tab' : ''}
          >
            {link.label}
          </button>
        ))}
      </div>
    );
  };
  
export default SubTabNavigation;