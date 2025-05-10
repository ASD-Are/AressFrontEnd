// components/CLILauncher.jsx
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/cli.css';

const CLILauncher = ({ onClose }) => {
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [sessionValid, setSessionValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setSessionValid(false);
      navigate('/login');
    }
  }, [navigate]);

  const appendOutput = (text) => {
    setOutput((prev) => `${prev}\n${text}`);
  };

  const handleCommand = async (e) => {
    e.preventDefault();
    const cmd = input.trim();
    appendOutput(`> ${cmd}`);
    if (!cmd) return;

    try {
      if (cmd.startsWith('start scan')) {
        const parts = cmd.split(' ');
        const url = parts[2] || 'https://example.com';
        const scanTool = parts[3]?.toUpperCase() || 'NMAP';
        const res = await axios.post('/scan/scan', {
          target_url: url,
          scan_type: 'full',
          scan_tool: scanTool,
          status: 'pending',
          ai_risk: 0,
        });
        appendOutput(`✅ Scan started for ${url} using ${scanTool}. ID: ${res.data.id}`);
      } else if (cmd === 'list scans') {
        const res = await axios.get('/scan/scans');
        appendOutput(`📝 Found ${res.data.length} scans:`);
        res.data.forEach((scan) => {
          appendOutput(`- ID ${scan.id} | ${scan.scan_tool} | ${scan.status}`);
        });
      } else if (cmd.startsWith('get scan')) {
        const id = cmd.split(' ')[2];
        const res = await axios.get(`/scan/scan/${id}`);
        appendOutput(JSON.stringify(res.data, null, 2));
      } else if (cmd.startsWith('delete scan')) {
        const id = cmd.split(' ')[2];
        await axios.delete(`/scan/scan/${id}`);
        appendOutput(`🗑 Scan ID ${id} deleted successfully.`);
      } else if (cmd.startsWith('export json')) {
        const id = cmd.split(' ')[2];
        const res = await axios.get(`/scan/export/json/${id}`);
        appendOutput(`📤 JSON Export for ID ${id}:\n${JSON.stringify(res.data, null, 2)}`);
      } else if (cmd.startsWith('export ai')) {
        const id = cmd.split(' ')[2];
        const res = await axios.get(`/scan/export/ai-report/${id}`);
        appendOutput(`🤖 AI Report for ID ${id}:\n${res.data}`);
      } else if (cmd.startsWith('export pdf')) {
        const id = cmd.split(' ')[2];
        const res = await axios.get(`/scan/export/pdf/${id}`, { responseType: 'blob' });
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `scan_report_${id}.pdf`;
        link.click();
        appendOutput(`📄 PDF report for ID ${id} downloaded.`);
      } else if (cmd.startsWith('search')) {
        const keyword = cmd.replace('search ', '');
        const res = await axios.get(`/scan/search?q=${encodeURIComponent(keyword)}`);
        appendOutput(`🔍 Results for "${keyword}":`);
        res.data.forEach((scan) => {
          appendOutput(`- ID ${scan.id} | ${scan.target_url} | ${scan.scan_tool} | ${scan.status}`);
        });
      } else if (cmd === 'logout') {
        localStorage.removeItem('access_token');
        appendOutput('👋 Logged out. Redirecting...');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        appendOutput('❌ Unknown command. Try commands like:');
        appendOutput('start scan <url> <tool>, list scans, get scan <id>, delete scan <id>');
        appendOutput('export json <id>, export ai <id>, export pdf <id>, search <keyword>, logout');
      }
    } catch (err) {
      appendOutput(`❌ Error: ${err.response?.data?.detail || err.message}`);
    }

    setInput('');
  };

  if (!sessionValid) return null;

  return (
    <div className="cli-popup">
      <div className="cli-header">
        <span>Interactive CLI</span>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="cli-body">
        <pre className="cli-output">{output || 'Type a command (e.g. start scan https://example.com ZAP)'}</pre>
        <form onSubmit={handleCommand} className="cli-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default CLILauncher;
