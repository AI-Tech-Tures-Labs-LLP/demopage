import React, { useState } from 'react';
import BubbleNetwork from './components/BubbleNetwork';
import LoginPage from './components/LoginPage';
import './index.css';

const App = () => {
  // Initialize state from sessionStorage so reloads keep the user logged in
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('stacklogix_auth') === 'true';
  });

  const handleLogin = () => {
    sessionStorage.setItem('stacklogix_auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('stacklogix_auth');
    sessionStorage.removeItem('stacklogix_token');
    sessionStorage.removeItem('stacklogix_user');
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
          <div className="mesh-bg" />
          <BubbleNetwork onLogout={handleLogout} />
        </div>
      )}
    </>
  );
};

export default App;
