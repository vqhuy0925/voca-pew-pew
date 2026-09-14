import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Safe environment variable resolution with fallback for Node test environments
const env: Record<string, string | undefined> = (typeof import.meta !== 'undefined' && import.meta.env) ? (import.meta.env as any) : {};

// Validate environment variables
const apiKey = env.VITE_FIREBASE_API_KEY;
const projectId = env.VITE_FIREBASE_PROJECT_ID;

export const isFirebaseConfigured = Boolean(
  apiKey &&
  projectId &&
  !apiKey.includes('your_api_key') &&
  !projectId.includes('your_project_id')
);

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize Analytics if measurementId is provided
    if (firebaseConfig.measurementId) {
      isSupported().then(supported => {
        if (supported && app) {
          analytics = getAnalytics(app);
          console.log('[Firebase] Analytics initialized with measurementId 📈');
        }
      }).catch(() => {
        // Analytics not supported in this environment
      });
    }

    console.log('[Firebase] Successfully initialized Vocab Pew Pew Cloud Engine 🚀');
  } catch (error) {
    console.warn('[Firebase] Initialization error, falling back to offline LocalStorage mode:', error);
    app = null;
    auth = null;
    db = null;
    analytics = null;
  }
} else {
  console.info('[Firebase] Config keys not detected. Vocab Pew Pew is running in Offline-First mode 🌿');
}

export { app, auth, db, analytics };
