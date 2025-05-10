import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TabNavigation from '../../components/TabNavigation';
import axios from '../../utils/axiosInstance';
import '../../styles/Dashboard.css';
import '../../styles/ScanPages.css';

const ScanExportAIReport = () => {
  const [activeTab, setActiveTab] = useState('export');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const [scanId, setScanId] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab !== 'export') setShowIntro(false);
  }, [activeTab]);

  const fetchAIReport = async () => {
    setIsLoading(true);
    setDownloadUrl(null);
    setError(null);

    try {
      const res = await axios.get(`/scan/scan/export/ai-report/${scanId}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setDownloadUrl(url);
    } catch (err) {
      setError('❌ Failed to fetch AI report. Check the Scan ID and try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <>
            <div className="action-group">
              <button onClick={() => navigate('/export/json')}>Export JSON</button>
              <button onClick={() => navigate('/export/pdf')}>Download PDF</button>
              <button onClick={() => navigate('/export/ai')}>Download AI Report</button>
            </div>

            <div className="scan-form-container">
              <h2>Download AI-analyzed Report</h2>
              <div className="scan-form">
                <input
                  type="text"
                  placeholder="Enter Scan ID (e.g., 23)"
                  value={scanId}
                  onChange={(e) => setScanId(e.target.value)}
                />
                <button onClick={fetchAIReport} disabled={!scanId || isLoading}>
                  {isLoading ? 'Downloading...' : '🧠 Download AI Report'}
                </button>
              </div>

              {downloadUrl && (
                <div className="scan-results-preview">
                  <h4>AI Report Ready ✅</h4>
                  <a
                    href={downloadUrl}
                    download={`scan_${scanId}_ai_report.json`}
                    className="download-link"
                  >
                    📥 Click here to download AI Report
                  </a>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}
            </div>
          </>
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

export default ScanExportAIReport;
