import React from 'react';
import BubbleNetwork from './components/BubbleNetwork';
import './index.css';

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-bg" />
      <BubbleNetwork />
    </div>
  );
};

export default App;
