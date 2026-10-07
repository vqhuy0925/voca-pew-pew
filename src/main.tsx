import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerServiceWorker } from './services/serviceWorkerRegistration';
import { checkAndRedirectLegacyDomain } from './services/domainMigration';

// 1. If currently on legacy domain (voca-pew-pew.vercel.app), transfer progress and redirect
const isRedirecting = checkAndRedirectLegacyDomain();

if (!isRedirecting) {
  registerServiceWorker();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}


