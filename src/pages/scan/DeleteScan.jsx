import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TabNavigation from '../../components/TabNavigation';
import axios from '../../utils/axiosInstance';
import '../../styles/Dashboard.css';
import '../../styles/ScanPages.css';

const DeleteScan = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const [scanId, setScanId] = useState('');
  const [scanData, setScanData] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab !== 'scan') setShowIntro(false);
  }, [activeTab]);

  const fetchScan = async () => {
    setError(null);
    setScanData(null);
    setSuccessMessage(null);

    try {
      const res = await axios.get(`/scan/scan/${scanId}`);
      setScanData(res.data);
    } catch (err) {
      setError('❌ Scan not found. Check the ID and try again.');
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`/scan/scan/${scanId}`);
      setSuccessMessage(`✅ Scan with ID ${scanId} deleted successfully.`);
      setScanData(null);
      setScanId('');
      setConfirmed(false);
    } catch (err) {
      setError('❌ Deletion failed. Please try again.');
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
              <h2>Delete Scan by ID</h2>
              <div className="scan-form">
                <input
                  type="text"
                  placeholder="Enter Scan ID (e.g., 23)"
                  value={scanId}
                  onChange={(e) => setScanId(e.target.value)}
                />
                <button onClick={fetchScan} disabled={!scanId}>
                  Fetch Scan
                </button>
              </div>

              {scanData && (
                <div className="scan-results-preview">
                  <h4>Scan Found ✅</h4>
                  <p><strong>Target:</strong> {scanData.target_url}</p>
                  <p><strong>Tool:</strong> {scanData.scan_tool}</p>
                  <p><strong>Status:</strong> {scanData.status}</p>
                  <p><strong>AI Risk Score:</strong> {scanData.ai_risk}</p>

                  <div className="json-output">
                    <pre>{JSON.stringify(scanData.results, null, 2)}</pre>
                  </div>

                  {!confirmed ? (
                    <button onClick={() => setConfirmed(true)} className="danger-button">
                      ⚠️ Confirm Delete
                    </button>
                  ) : (
                    <button onClick={handleDelete} disabled={isLoading} className="danger-button">
                      {isLoading ? 'Deleting...' : '✅ Delete Now'}
                    </button>
                  )}
                </div>
              )}

              {successMessage && (
                <div className="scan-results-preview">
                  <p>{successMessage}</p>
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

export default DeleteScan;