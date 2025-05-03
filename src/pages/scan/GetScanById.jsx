import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TabNavigation from '../../components/TabNavigation';
import axios from '../../utils/axiosInstance';
import '../../styles/Dashboard.css';
import '../../styles/ScanPages.css';

const GetScanById = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const [scanId, setScanId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab !== 'scan') setShowIntro(false);
  }, [activeTab]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.get(`/scan/scan/${scanId}`);
      setResult(res.data);
    } catch (err) {
      setError('❌ Invalid ID or scan not found.');
    } finally {
      setIsLoading(false);
    }
  };

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
              <h2>Get Scan by ID</h2>
              <div className="scan-form">
                <input
                  type="text"
                  placeholder="Enter Scan ID (e.g., 23)"
                  value={scanId}
                  onChange={(e) => setScanId(e.target.value)}
                />
                <button onClick={handleSubmit} disabled={isLoading || !scanId}>
                  {isLoading ? 'Fetching...' : 'Fetch Scan'}
                </button>
              </div>

              {result && (
                <div className="scan-results-preview">
                  <h4>Scan Fetched ✅</h4>
                  <p><strong>Target:</strong> {result.target_url}</p>
                  <p><strong>Tool:</strong> {result.scan_tool}</p>
                  <p><strong>Status:</strong> {result.status}</p>
                  <p><strong>AI Risk Score:</strong> {result.ai_risk}</p>

                  <div className="json-output">
                    <pre>{JSON.stringify(result.results, null, 2)}</pre>
                  </div>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}
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

export default GetScanById;