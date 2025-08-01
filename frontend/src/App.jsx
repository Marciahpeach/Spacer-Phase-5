// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard';
import SpaceList from './components/SpaceList';
import Login from './components/LoginForm';
import './index.css'; // If your file is named style.css

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [backendMessage, setBackendMessage] = useState('Connecting to backend...');
  const [loadingBackend, setLoadingBackend] = useState(false);
  const [backendError, setBackendError] = useState(null);
  // State for dark mode, initialized from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect to apply dark mode class to body and save preference
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const testBackendConnection = async () => {
    setLoadingBackend(true);
    setBackendError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBackendMessage(data.message);
    } catch (err) {
      console.error('Failed to fetch from backend:', err);
      setBackendError('Failed to connect to backend. Is the Flask server running?');
      setBackendMessage('Error connecting to backend.');
    } finally {
      setLoadingBackend(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content container">
          <h1 className="navbar-title">Spacer</h1>
          <div className="navbar-buttons-wrapper">
            <div className="navbar-buttons">
              <button
                onClick={() => setCurrentPage('home')}
                className={`navbar-button ${currentPage === 'home' ? 'active' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('admin')}
                className={`navbar-button ${currentPage === 'admin' ? 'active' : ''}`}
              >
                Admin
              </button>
              <button
                onClick={() => setCurrentPage('login')}
                className={`navbar-button ${currentPage === 'login' ? 'active' : ''}`}
              >
                Login
              </button>
            </div>
            {/* Dark Mode Toggle Button */}
            <button onClick={toggleDarkMode} className="dark-mode-toggle" aria-label="Toggle dark mode">
              <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content container">
        {currentPage === 'home' && (
          <>
            <div className="hero-section">
              <h2 className="hero-title">
                Explore Unique Spaces
              </h2>
              <p className="hero-subtitle">
                Discover and book the perfect space for your needs, from cozy studios to grand event venues.
              </p>
              <button
                onClick={testBackendConnection}
                disabled={loadingBackend}
                className="btn btn-primary"
              >
                {loadingBackend ? 'Connecting...' : 'Test Backend Connection'}
              </button>
              {backendError && (
                <p className="message-box message-error">{backendError}</p>
              )}
              <div className="backend-test-area">
                <p className="backend-message">{backendMessage}</p>
              </div>
            </div>
            <SpaceList />
          </>
        )}

        {currentPage === 'admin' && <AdminDashboard />}
        {currentPage === 'login' && <Login />}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Spacer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;