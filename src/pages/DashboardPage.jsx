import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import TabNavigation from '../components/TabNavigation';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab !== 'scan') {
      setShowIntro(false); 
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <div className="action-group">
            <button onClick={() => navigate('/scan/start')}>Start New Scan</button>
            <button onClick={() => navigate('/scan/list')}>List All Scans</button>
            <button onClick={() => navigate('/scan/get')}>Get Scan by ID</button>
            <button onClick={() => navigate('/scan/delete')}>Delete Scan</button>
          </div>
        );
      case 'export':
        return (
          <div className="action-group">
            <button onClick={() => navigate('/export/json')}>🧾 Export Reports</button>
      
            <button onClick={() => navigate('/export/pdf')}>Download PDF</button>
            <button onClick={() => navigate('/export/ai')}>Download AI Report</button>
          </div>
        );
      case 'tools':
        return (
          <div className="action-group">
            <button onClick={() => navigate('/scan/latest')}>Show Latest Scan</button>
            <button onClick={() => navigate('/export/search-keyword')}>Search Scan Data</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="main">
        {showIntro && (
          <>
            <h1 className="dashboard-title">ARESS Security Toolkit</h1>
            <p className="dashboard-subtext">Run scans, export reports, and search data securely.</p>
          </>
        )}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
      
    </DashboardLayout>
  );
};

export default DashboardPage;