import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if we're running on the correct development server
if (import.meta.env.DEV && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  console.warn('⚠️  Development mode detected but not running on localhost. This may cause issues.');
  console.log('Expected: http://localhost:8081/');
  console.log('Current:', window.location.href);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
