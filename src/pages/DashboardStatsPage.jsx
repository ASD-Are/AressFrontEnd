

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DashboardLayout from '../components/DashboardLayout';
// import axios from '../utils/axiosInstance';
// import '../styles/Dashboard.css';
// import '../styles/DashboardStats.css';

// const DashboardStatsPage = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     highRisk: 0,
//     averageRisk: 0,
//     recent: [],
//     riskDistribution: { high: 0, medium: 0, low: 0 }
//   });
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get('/scan/scan/scans');
//         const allScans = res.data;

//         const total = allScans.length;
//         const pending = allScans.filter(scan => scan.status === 'pending').length;
//         const highRisk = allScans.filter(scan => scan.ai_risk >= 0.7).length;
//         const avgRisk = (
//           allScans.reduce((acc, cur) => acc + (cur.ai_risk || 0), 0) / total || 0
//         ).toFixed(2);

//         const sorted = allScans.sort((a, b) => b.id - a.id);
//         const recent = sorted.slice(0, 5);

//         const riskCounts = {
//           high: allScans.filter(s => s.ai_risk >= 0.7).length,
//           medium: allScans.filter(s => s.ai_risk >= 0.3 && s.ai_risk < 0.7).length,
//           low: allScans.filter(s => s.ai_risk < 0.3).length
//         };

//         setStats({
//           total,
//           pending,
//           highRisk,
//           averageRisk: avgRisk,
//           recent,
//           riskDistribution: riskCounts
//         });
//       } catch (err) {
//         console.error('Error fetching dashboard stats:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="dashboard-header-bar">
//         <span className="dashboard-subtext-tagline">Analyze vulnerabilities faster with AI 🚀</span>
//         <div className="user-avatar">👤 Aaron</div>
//       </div>

//       <div className="dashboard-stats-container">
//         <div className="stats-cards">
//           <div className="card"><h3>Total Scans</h3><p>{stats.total}</p></div>
//           <div className="card"><h3>Pending Scans</h3><p>{stats.pending}</p></div>
//           <div className="card"><h3>High Risk</h3><p>{stats.highRisk}</p></div>
//           <div className="card"><h3>Avg. AI Risk Score</h3><p>{stats.averageRisk}</p></div>
//         </div>

//         <div className="dashboard-graphs">
//           <div className="graph-placeholder">
//             <h3>Scans Overview</h3>
//             <div className="fake-graph" />
//           </div>
//           <div className="recent-scans">
//             <h3>Recent Scans <span className="view-all" onClick={() => navigate('/scan/list')}>View all</span></h3>
//             <table>
//               <thead>
//                 <tr><th>Target</th><th>Type</th><th>AI Risk</th><th>Status</th></tr>
//               </thead>
//               <tbody>
//                 {stats.recent.map(scan => (
//                   <tr key={scan.id}>
//                     <td>{scan.target_url}</td>
//                     <td>{scan.scan_type}</td>
//                     <td>{scan.ai_risk ?? '–'}</td>
//                     <td>{scan.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="risk-distribution-section">
//           <div className="donut-chart-placeholder">
//             <h3>Risk Distribution</h3>
//             <div className="donut-labels">
//               <div><span className="legend-color high" /> High ({stats.riskDistribution.high})</div>
//               <div><span className="legend-color medium" /> Medium ({stats.riskDistribution.medium})</div>
//               <div><span className="legend-color low" /> Low ({stats.riskDistribution.low})</div>
//             </div>
//             <div className="donut-fake" />
//           </div>
//           <div className="risk-bars">
//             <h3>Risk Distribution</h3>
//             <p>High <div className="bar high" style={{ width: `${stats.riskDistribution.high * 10}px` }} /></p>
//             <p>Medium <div className="bar medium" style={{ width: `${stats.riskDistribution.medium * 10}px` }} /></p>
//             <p>Low <div className="bar low" style={{ width: `${stats.riskDistribution.low * 10}px` }} /></p>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default DashboardStatsPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import axios from '../utils/axiosInstance';
import '../styles/Dashboard.css';
import '../styles/DashboardStats.css';

const DashboardStatsPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    highRisk: 0,
    averageRisk: 0,
    recent: [],
    riskDistribution: { high: 0, medium: 0, low: 0 }
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'User' });

useEffect(() => {
    const fetchUser = async () => {
        try {
        const res = await axios.get('/user/me');
        setUser(res.data);
        } catch (err) {
        console.error('Error fetching user:', err);
        }
    };

    fetchUser();
    }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/scan/scan/scans');
        const allScans = res.data;

        const total = allScans.length;
        const pending = allScans.filter(scan => scan.status === 'pending').length;
        const highRisk = allScans.filter(scan => scan.ai_risk >= 0.7).length;
        const avgRisk = (
          allScans.reduce((acc, cur) => acc + (cur.ai_risk || 0), 0) / total || 0
        ).toFixed(2);

        const sorted = allScans.sort((a, b) => b.id - a.id);
        const recent = sorted.slice(0, 5);

        const riskCounts = {
          high: allScans.filter(s => s.ai_risk >= 0.7).length,
          medium: allScans.filter(s => s.ai_risk >= 0.3 && s.ai_risk < 0.7).length,
          low: allScans.filter(s => s.ai_risk < 0.3).length
        };

        setStats({
          total,
          pending,
          highRisk,
          averageRisk: avgRisk,
          recent,
          riskDistribution: riskCounts
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-header-bar styled-header">
        <span className="dashboard-subtext-tagline"><strong>Analyze vulnerabilities faster with AI</strong></span>
        <div className="user-avatar styled-avatar">👤 <span>{user.name}</span></div>
        </div>

      <div className="dashboard-stats-container">
        <div className="stats-cards">
          <div className="card"><h3>Total Scans</h3><p>{stats.total}</p></div>
          <div className="card"><h3>Pending Scans</h3><p>{stats.pending}</p></div>
          <div className="card"><h3>High Risk</h3><p>{stats.highRisk}</p></div>
          <div className="card"><h3>Avg. AI Risk Score</h3><p>{stats.averageRisk}</p></div>
        </div>

        <div className="dashboard-graphs">
          <div className="graph-placeholder">
            <h3>Scans Overview</h3>
            <div className="fake-graph" />
          </div>
          <div className="recent-scans">
            <h3>Recent Scans <span className="view-all" onClick={() => navigate('/scan/list')}>View all</span></h3>
            <table>
              <thead>
                <tr><th>Target</th><th>Type</th><th>AI Risk</th><th>Status</th></tr>
              </thead>
              <tbody>
                {stats.recent.map(scan => (
                  <tr key={scan.id}>
                    <td>{scan.target_url}</td>
                    <td>{scan.scan_type}</td>
                    <td>{scan.ai_risk ?? '–'}</td>
                    <td>{scan.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="risk-distribution-section">
          <div className="donut-chart-placeholder">
            <h3>Risk Distribution</h3>
            <div className="donut-labels">
              <div><span className="legend-color high" /> High ({stats.riskDistribution.high})</div>
              <div><span className="legend-color medium" /> Medium ({stats.riskDistribution.medium})</div>
              <div><span className="legend-color low" /> Low ({stats.riskDistribution.low})</div>
            </div>
            <div className="donut-fake" />
          </div>
          <div className="risk-bars">
            <h3>Risk Distribution</h3>
            <p>High <div className="bar high" style={{ width: `${stats.riskDistribution.high * 10}px` }} /></p>
            <p>Medium <div className="bar medium" style={{ width: `${stats.riskDistribution.medium * 10}px` }} /></p>
            <p>Low <div className="bar low" style={{ width: `${stats.riskDistribution.low * 10}px` }} /></p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStatsPage;