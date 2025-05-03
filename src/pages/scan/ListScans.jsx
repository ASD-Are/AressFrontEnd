import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TabNavigation from '../../components/TabNavigation';
import axios from '../../utils/axiosInstance';
import '../../styles/Dashboard.css';
import '../../styles/ScanPages.css'; // for terminal + form styles

const ListScans = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab !== 'scan') setShowIntro(false);
  }, [activeTab]);

  useEffect(() => {
    const fetchScans = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/scan/scans', {
          params: {
            scan_type: 'full',
            status: 'complete',
          },
        });
        setScans(res.data);
      } catch (err) {
        setError('❌ Failed to load scans.');
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <>
            <div className="action-group">
              <button onClick={() => navigate('/scan/start')}>Start New Scan</button>
              <button onClick={() => navigate('/scan/list')}>List All Scans</button>
              <button onClick={() => navigate('/scan/get')}>Get Scan by ID</button>
              <button onClick={() => navigate('/scan/delete')}>Delete Scan</button>
            </div>

            <div className="scan-form-container">
              <h2>List of Completed Scans</h2>

              {loading && <p>Loading scans...</p>}
              {error && <div className="error-message">{error}</div>}

              {scans.length > 0 && scans.map((scan) => (
                <div key={scan.id} className="scan-results-preview">
                  <p><strong>Target:</strong> {scan.target_url}</p>
                  <p><strong>Tool:</strong> {scan.scan_tool}</p>
                  <p><strong>Status:</strong> {scan.status}</p>
                  <p><strong>AI Risk Score:</strong> {scan.ai_risk}</p>

                  <div className="json-output">
                    <pre>{JSON.stringify(scan.results, null, 2)}</pre>
                  </div>
                </div>
              ))}
            </div>
          </>
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

export default ListScans;