// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DashboardLayout from '../../components/DashboardLayout';
// import TabNavigation from '../../components/TabNavigation';
// import axios from '../../utils/axiosInstance';
// import '../../styles/Dashboard.css';
// import '../../styles/ScanPages.css';

// const SearchScansPage = () => {
//   const [activeTab, setActiveTab] = useState('tools');
//   const [showIntro, setShowIntro] = useState(true);
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (activeTab !== 'tools') setShowIntro(false);
//   }, [activeTab]);

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setResults([]);
//     setError(null);
//     try {
//       const res = await axios.get(`/scan/scan/search?q=${encodeURIComponent(query)}`);
//       setResults(res.data);
//     } catch (err) {
//       setError('❌ Failed to search scans. Try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'tools':
//         return (
//           <>
//             <div className="action-group">
//               <button onClick={() => navigate('/tools/view')}>View Available Tools</button>
//               <button onClick={() => navigate('/tools/search')}>Search Scan Data</button>
//             </div>

//             <div className="scan-form-container">
//               <h2>Search Scan Results</h2>
//               <div className="scan-form">
//                 <input
//                   type="text"
//                   placeholder="Enter keyword (e.g., sql injection)"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                 />
//                 <button onClick={handleSearch} disabled={!query || isLoading}>
//                   {isLoading ? 'Searching...' : '🔍 Search'}
//                 </button>
//               </div>

//               {results.length > 0 && (
//                 <div className="scan-results-preview">
//                   <h4>Search Results ✅</h4>
//                   <ul>
//                     {results.map((item) => (
//                       <li key={item.id}>
//                         <p><strong>ID:</strong> {item.id}</p>
//                         <p><strong>Target:</strong> {item.target_url}</p>
//                         <p><strong>Status:</strong> {item.status}</p>
//                         <p><strong>Tool:</strong> {item.scan_tool}</p>
//                         <p><strong>AI Risk:</strong> {item.ai_risk}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {error && <div className="error-message">{error}</div>}
//             </div>
//           </>
//         );
//       case 'scan':
//         return (
//           <div className="action-group">
//             <button onClick={() => navigate('/scan/start')}>Start New Scan</button>
//             <button onClick={() => navigate('/scan/list')}>List All Scans</button>
//             <button onClick={() => navigate('/scan/get')}>Get Scan by ID</button>
//             <button onClick={() => navigate('/scan/delete')}>Delete Scan</button>
//           </div>
//         );
//       case 'export':
//         return (
//           <div className="action-group">
//             <button onClick={() => navigate('/export/json')}>Export JSON</button>
//             <button onClick={() => navigate('/export/pdf')}>Download PDF</button>
//             <button onClick={() => navigate('/export/ai')}>Download AI Report</button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="main">
//         {showIntro && (
//           <>
//             <h1 className="dashboard-title">ARESS Security Toolkit</h1>
//             <p className="dashboard-subtext">Run scans, export reports, and search data securely.</p>
//           </>
//         )}
//         <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
//         {renderContent()}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default SearchScansPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TabNavigation from '../../components/TabNavigation';
import axios from '../../utils/axiosInstance';
import '../../styles/Dashboard.css';
import '../../styles/ScanPages.css';

const SearchScansPage = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const [showIntro, setShowIntro] = useState(true);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab !== 'tools') setShowIntro(false);
  }, [activeTab]);

  const handleLatestScan = async () => {
    setIsLoading(true);
    setResults([]);
    setError(null);
    try {
      const res = await axios.get(`/scan/scan/latest`);
      setResults([res.data]);
    } catch (err) {
      setError('❌ Failed to fetch the latest scan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setResults([]);
    setError(null);
    try {
      const res = await axios.get(`/scan/scan/search?q=${encodeURIComponent(query)}`);
      setResults(res.data);
    } catch (err) {
      setError('❌ Failed to search scans. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'tools':
        return (
          <>
            <div className="action-group">
              <button onClick={handleLatestScan}>Show Latest Scan</button>
            </div>

            <div className="scan-form-container">
              <h2>Search Scan Results</h2>
              <div className="scan-form">
                <input
                  type="text"
                  placeholder="Enter keyword (e.g., sql injection)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch} disabled={!query || isLoading}>
                  {isLoading ? 'Searching...' : '🔍 Search'}
                </button>
              </div>

              {results.length > 0 && (
                <div className="scan-results-preview">
                  <h4>Search Results ✅</h4>
                  <ul>
                    {results.map((item) => (
                      <li key={item.id}>
                        <p><strong>ID:</strong> {item.id}</p>
                        <p><strong>Target:</strong> {item.target_url}</p>
                        <p><strong>Status:</strong> {item.status}</p>
                        <p><strong>Tool:</strong> {item.scan_tool}</p>
                        <p><strong>AI Risk:</strong> {item.ai_risk}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}
            </div>
          </>
        );
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
            <button onClick={() => navigate('/export/json')}>Export JSON</button>
            <button onClick={() => navigate('/export/pdf')}>Download PDF</button>
            <button onClick={() => navigate('/export/ai')}>Download AI Report</button>
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

export default SearchScansPage;
