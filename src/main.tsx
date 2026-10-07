import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerServiceWorker } from './services/serviceWorkerRegistration';
import { checkAndRedirectLegacyDomain, handleIncomingMigration } from './services/domainMigration';

// 1. If currently on legacy domain (voca-pew-pew.vercel.app), transfer progress and redirect
const isRedirecting = checkAndRedirectLegacyDomain();

if (!isRedirecting) {
  // If arrived via migration payload, decompress into localStorage before React mounts
  handleIncomingMigration();
  registerServiceWorker();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}



