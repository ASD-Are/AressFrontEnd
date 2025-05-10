import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import UpdateInfoPage from './pages/UpdateInfoPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import StartScan from './pages/scan/StartScan';
import ListScans from './pages/scan/ListScans';
import GetScanById from './pages/scan/GetScanById';
import AccountSettingsPage from './pages/AccountSettingsPage';
import DeleteScan from './pages/scan/DeleteScan';
import ScanExportJSON from './pages/export/ScanExportJSON';
import ExportPdf from './pages/export/ExportPdf';
import ScanExportAIReport from './pages/export/ScanExportAIReport';
import SearchScansPage from './pages/Search/SearchScansPage';
import CLILauncher from './components/CLILauncher';
import DashboardStatsPage from './pages/DashboardStatsPage';




const AppWithSessionCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        const exp = decodedPayload.exp * 1000;
        const now = Date.now();

        if (now > exp) {
          alert('Session expired. Logging out.');
          localStorage.removeItem('access_token');
          navigate('/');
        }
      } catch (err) {
        console.error('Invalid token format:', err);
        localStorage.removeItem('access_token');
        navigate('/');
      }
    };

    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 60 * 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/first-dashboard" element={<DashboardStatsPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/account-settings" element={<AccountSettingsPage />} />
      <Route path="/update-info" element={<UpdateInfoPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/delete-account" element={<DeleteAccountPage />} />
      <Route path="/scan/start" element={<StartScan />} />
      <Route path="/scan/list" element={<ListScans />} />
      <Route path="/scan/get" element={<GetScanById />} />
      <Route path="/scan/delete" element={<DeleteScan />} />
      <Route path="/export/json" element={<ScanExportJSON />} />
      <Route path="/export/pdf" element={<ExportPdf />} />
      <Route path="/export/ai" element={<ScanExportAIReport />} />
      <Route path="/export/search-keyword" element={<SearchScansPage />} />
      <Route path="/cli" element={<CLILauncher />} />


    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppWithSessionCheck />
    </Router>
  );
}

export default App;