import React from 'react';
import TestComponent from './Components/TestComponent';

function App() {
  const centerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  return (
    <div style={centerStyle}>
      <TestComponent />
    </div>
  );
}

export default App;
