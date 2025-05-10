// import React from 'react';
// import './ThemeToggle.css';

// const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
//   return (
//     <div className="theme-toggle">
//       <label className="switch">
//         <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
//         <span className="slider round"></span>
//       </label>
//     </div>
//   );
// };

// export default ThemeToggle; 

// ThemeToggle.jsx
import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <span className="theme-icon">
        {isDarkMode ? '🌙 Dark' : '☀️ Light'}
      </span>
    </div>
  );
};

export default ThemeToggle;

// components/ThemeToggle.jsx
// components/ThemeToggle.jsx
// components/ThemeToggle.jsx
// import React, { useState } from 'react';
// import './ThemeToggle.css';
// import { FaTerminal } from 'react-icons/fa';
// import CLILauncher from './CLILauncher';
// import { createRoot } from 'react-dom/client';

// const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
//   const [cliWindow, setCliWindow] = useState(null);

//   const openCLIWindow = () => {
//     const width = 800;
//     const height = 500;
//     const left = window.screenX + (window.outerWidth - width) / 2;
//     const top = window.screenY + (window.outerHeight - height) / 2;

//     const cliWin = window.open(
//       '',
//       'CLI Terminal',
//       `width=${width},height=${height},left=${left},top=${top},resizable=yes`
//     );

//     if (cliWin) {
//       cliWin.document.write(`
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <title>CLI Terminal</title>
//             <style>
//               body {
//                 margin: 0;
//                 background: #1e1e1e;
//                 color: #dcdcdc;
//                 font-family: 'SF Mono', monospace;
//               }
//               #cli-root {
//                 height: 100vh;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//               }
//             </style>
//           </head>
//           <body>
//             <div id="cli-root"></div>
//           </body>
//         </html>
//       `);
//       cliWin.document.close();

//       const cliRoot = cliWin.document.getElementById('cli-root');
//       if (cliRoot) {
//         const root = createRoot(cliRoot);
//         root.render(<CLILauncher />);
//       }

//       setCliWindow(cliWin);
//     }
//   };

//   return (
//     <div className="theme-toggle-wrapper">
//       <div className="theme-toggle">
//         <label className="switch">
//           <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
//           <span className="slider round"></span>
//         </label>
//         <span className="theme-icon">
//           {isDarkMode ? '🌙 Dark' : '☀️ Light'}
//         </span>
//       </div>
//       <div className="cli-icon-button">
//         <button onClick={openCLIWindow} className="cli-toggle-button">
//           <FaTerminal size={18} style={{ marginRight: '6px' }} /> CLI
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ThemeToggle;

