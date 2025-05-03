import React from 'react';
import '../styles/TabNavigation.css';

const tabs = ['scan', 'export', 'tools'];
const tabLabels = {
  scan: '🛡 Scan Management',
  export: '📄 Export Reports',
  tools: '🧠 Tools & Search',
};

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const index = tabs.indexOf(activeTab);

  return (
    <div className="tab-nav-container">
      <div className="tab-selector">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active-tab' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabLabels[tab]}
          </button>
        ))}
        {/* <div
          className="tab-underline"
          style={{ transform: `translateX(${index * 100}%)` }}
        /> */}
      </div>
     
    </div>
  );
};

export default TabNavigation;