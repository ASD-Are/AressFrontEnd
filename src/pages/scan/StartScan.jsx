// import React, { useState } from 'react';
// import DashboardLayout from '../../components/DashboardLayout';
// import MainTabNavigation from '../../components/MainTabNavigation';
// import SubTabNavigation from '../../components/SubTabNavigation';
// import axios from '../../utils/axiosInstance';
// import '../../styles/ScanPages.css';
// import '../../styles/MainTabNavigation.css';
// import '../../styles/SubTabNavigation.css';

// const StartScan = () => {
//   const [formData, setFormData] = useState({
//     target_url: '',
//     scan_type: 'full',
//     scan_tool: 'nmap',
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setResult(null);
//     setError(null);

//     try {
//       const response = await axios.post('/scan/scan', {
//         ...formData,
//         status: 'pending',
//         ai_risk: 0,
//       });
//       setResult(response.data);
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Something went wrong.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="main">
//         <MainTabNavigation />
//         <SubTabNavigation />

//         <div className="scan-form-container">
//           <h2>Start a New Scan</h2>
//           <div className="scan-form">
//             <input
//               type="text"
//               name="target_url"
//               placeholder="Target URL (e.g., https://example.com)"
//               value={formData.target_url}
//               onChange={handleChange}
//             />
//             <select name="scan_type" value={formData.scan_type} onChange={handleChange}>
//               <option value="full">Full Scan</option>
//               <option value="quick">Quick Scan</option>
//             </select>
//             <select name="scan_tool" value={formData.scan_tool} onChange={handleChange}>
//               <option value="nmap">Nmap</option>
//               <option value="zap">OWASP ZAP</option>
//               <option value="42crunch">42Crunch</option>
//             </select>

//             <button onClick={handleSubmit} disabled={isLoading}>
//               {isLoading ? 'Starting Scan...' : 'Start Scan'}
//             </button>
//           </div>

//           {isLoading && (
//             <div className="terminal-output">
//               <pre>
//                 {`> Initializing scan...
// > Connecting to ${formData.target_url}...
// > Using ${formData.scan_tool} for ${formData.scan_type} scan...
// > Analyzing vulnerabilities...`}
//               </pre>
//               <div className="loader" />
//             </div>
//           )}

//           {result && (
//             <div className="scan-results-preview">
//               <h4>Scan Started Successfully ✅</h4>
//               <p><strong>Status:</strong> {result.status}</p>
//               <p><strong>AI Risk Score:</strong> {result.ai_risk}</p>
//               <pre>{JSON.stringify(result.results, null, 2)}</pre>
//             </div>
//           )}

//           {error && <div className="error-message">❌ {error}</div>}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default StartScan;
// import React, { useState, useEffect } from 'react';
// import DashboardLayout from '../../components/DashboardLayout';
// import TabNavigation from '../../components/TabNavigation';
// import '../../styles/Dashboard.css';
// import { useNavigate } from 'react-router-dom';

// const StartScan = () => {
//   const [activeTab, setActiveTab] = useState('scan');
//   const [showIntro, setShowIntro] = useState(true);
//   const navigate = useNavigate();


//   useEffect(() => {
//     if (activeTab !== 'scan') {
//       setShowIntro(false); 
//     }
//   }, [activeTab]);

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'scan':
//         return (
//           <div className="action-group">
//             <button onClick={() => navigate('/scan/start')}>Start New Scan</button>
//             <button>List All Scans</button>
//             <button>Get Scan by ID</button>
//             <button>Delete Scan</button>
//           </div>
//         );
//       case 'export':
//         return (
//           <div className="action-group">
//             <button>Download JSON</button>
//             <button>Download PDF</button>
//             <button>Download AI Report</button>
//           </div>
//         );
//       case 'tools':
//         return (
//           <div className="action-group">
//             <button>View Available Tools</button>
//             <button>Search Scan Data</button>
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

// export default StartScan;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DashboardLayout from '../../components/DashboardLayout';
// import TabNavigation from '../../components/TabNavigation';
// import axios from '../../utils/axiosInstance';
// import '../../styles/Dashboard.css';
// import '../../styles/ScanPages.css'; // for terminal + form styles

// const StartScan = () => {
//   const [activeTab, setActiveTab] = useState('scan');
//   const [showIntro, setShowIntro] = useState(true);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     target_url: '',
//     scan_type: 'full',
//     scan_tool: 'nmap',
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (activeTab !== 'scan') setShowIntro(false);
//   }, [activeTab]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setResult(null);
//     setError(null);
//     try {
//       const response = await axios.post('/scan/scan', {
//         ...formData,
//         status: 'pending',
//         ai_risk: 0,
//       });
//       setResult(response.data);
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Something went wrong.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'scan':
//         return (
//           <>
//             <div className="action-group">
//               <button onClick={() => navigate('/scan/start')}>Start New Scan</button>
//               <button>List All Scans</button>
//               <button>Get Scan by ID</button>
//               <button>Delete Scan</button>
//             </div>

//             {/* ✅ Scan Form */}
//             <div className="scan-form-container">
//               <h2>Start a New Scan</h2>
//               <div className="scan-form">
//                 <input
//                   type="text"
//                   name="target_url"
//                   placeholder="Target URL (e.g., https://example.com)"
//                   value={formData.target_url}
//                   onChange={handleChange}
//                 />
//                 <select name="scan_type" value={formData.scan_type} onChange={handleChange}>
//                   <option value="full">full</option>
//                   <option value="quick">quick</option>
//                 </select>
//                 <select name="scan_tool" value={formData.scan_tool} onChange={handleChange}>
//                   <option value="nmap">Nmap</option>
//                   <option value="zap">ZAP</option>
//                   <option value="42crunch">42Crunch</option>
//                 </select>

//                 <button onClick={handleSubmit} disabled={isLoading}>
//                   {isLoading ? 'Starting Scan...' : 'Start Scan'}
//                 </button>
//               </div>

//               {isLoading && (
//                 <div className="terminal-output">
//                   <pre>
// {`> Initializing scan...
// > Connecting to ${formData.target_url}...
// > Using ${formData.scan_tool} for ${formData.scan_type} scan...
// > Analyzing vulnerabilities...`}
//                   </pre>
//                   <div className="loader" />
//                 </div>
//               )}

//               {result && (
//                 <div className="scan-results-preview">
//                   <h4>Scan Started Successfully ✅</h4>
//                   <p><strong>Status:</strong> {result.status}</p>
//                   <p><strong>AI Risk Score:</strong> {result.ai_risk}</p>
//                   <pre>{JSON.stringify(result.results, null, 2)}</pre>
//                 </div>
//               )}

//               {error && <div className="error-message">❌ {error}</div>}
//             </div>
//           </>
//         );
//       case 'export':
//         return (
//           <div className="action-group">
//             <button>Download JSON</button>
//             <button>Download PDF</button>
//             <button>Download AI Report</button>
//           </div>
//         );
//       case 'tools':
//         return (
//           <div className="action-group">
//             <button>View Available Tools</button>
//             <button>Search Scan Data</button>
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

// export default StartScan;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TabNavigation from '../../components/TabNavigation';
import axios from '../../utils/axiosInstance';
import '../../styles/Dashboard.css';
import '../../styles/ScanPages.css'; // for terminal + form styles

const StartScan = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    target_url: '',
    scan_type: 'full',
    scan_tool: 'ZAP', // ✅ Capitalized to match Swagger/Backend
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab !== 'scan') setShowIntro(false);
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await axios.post('/scan/scan', {
        ...formData,
        status: 'pending',
        ai_risk: 0,
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong.');
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
              <h2>Start a New Scan</h2>
              <div className="scan-form">
                <input
                  type="text"
                  name="target_url"
                  placeholder="Target URL (e.g., https://example.com)"
                  value={formData.target_url}
                  onChange={handleChange}
                />
                <select name="scan_type" value={formData.scan_type} onChange={handleChange}>
                  <option value="full">Full Scan</option>
                  <option value="quick">Quick Scan</option>
                </select>
                <select name="scan_tool" value={formData.scan_tool} onChange={handleChange}>
                  <option value="NMAP">Nmap</option>
                  <option value="ZAP">OWASP ZAP</option>
                  <option value="42CRUNCH">42Crunch</option>
                </select>

                <button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? 'Starting Scan...' : 'Start Scan'}
                </button>
              </div>

              {isLoading && (
                <div className="terminal-output">
                  <pre>
{`> Initializing scan...
> Connecting to ${formData.target_url}...
> Using ${formData.scan_tool} for ${formData.scan_type} scan...
> Analyzing vulnerabilities...`}
                  </pre>
                  <div className="loader" />
                </div>
              )}

        {result && (
            <div className="scan-results-preview">
            <h4>Scan Started Successfully ✅</h4>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>AI Risk Score:</strong> {result.ai_risk}</p>
        
            <div className="json-output">
            <pre>{JSON.stringify(result.results, null, 2)}</pre>
            </div>
        </div>
        )}

              {error && <div className="error-message">❌ {error}</div>}
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

export default StartScan;