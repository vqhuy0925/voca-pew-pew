import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerServiceWorker } from './services/serviceWorkerRegistration';
import { checkAndRedirectLegacyDomain, handleIncomingMigration } from './services/domainMigration';

// 1. If currently on legacy domain (voca-pew-pew.vercel.app), redirect with progress payload immediately
const isRedirecting = checkAndRedirectLegacyDomain();

// 2. If on new domain and receiving migration data, restore localStorage before initial render
if (!isRedirecting) {
  handleIncomingMigration();
  registerServiceWorker();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

