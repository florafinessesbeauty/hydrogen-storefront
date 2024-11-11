// src/components/App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
// Corrected import path for App.tsx
import App from '../routes/App';

const MyApp: React.FC = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
};

export default MyApp;