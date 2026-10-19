// Version Management & Proactive Update Service for Vocab Pew Pew

export interface VersionInfo {
  version: string;
  buildTime?: number;
  releaseNotes?: string;
  features?: string[];
}

export const APP_CURRENT_VERSION: string =
  typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.1.0';

type VersionListener = (info: VersionInfo) => void;
const listeners = new Set<VersionListener>();

let pendingUpdate: VersionInfo | null = null;
let isCheckInProgress = false;

// Periodic check interval: every 5 minutes
const VERSION_CHECK_INTERVAL_MS = 5 * 60 * 1000;

/**
 * Compare two semver-like strings (e.g. "1.1.0" vs "1.0.0")
 * Returns true if server is strictly newer than client
 */
export function isNewerVersion(serverVer: string, clientVer: string): boolean {
  if (!serverVer || !clientVer) return false;
  if (serverVer === clientVer) return false;

  const sParts = serverVer.replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);
  const cParts = clientVer.replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);

  const maxLen = Math.max(sParts.length, cParts.length);
  for (let i = 0; i < maxLen; i++) {
    const s = sParts[i] || 0;
    const c = cParts[i] || 0;
    if (s > c) return true;
    if (s < c) return false;
  }

  // If numeric parts identical but string differs (e.g. 1.1.0-beta)
  return serverVer !== clientVer;
}

/**
 * Fetch /version.json directly from server bypassing any cache
 */
export async function checkServerVersion(): Promise<VersionInfo | null> {
  if (typeof window === 'undefined') return null;
  if (isCheckInProgress) return pendingUpdate;

  isCheckInProgress = true;
  try {
    const response = await fetch(`/version.json?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      return null;
    }

    const data: VersionInfo = await response.json();
    if (data && data.version && isNewerVersion(data.version, APP_CURRENT_VERSION)) {
      pendingUpdate = data;
      console.log(
        `[VersionService] 🚀 New version detected! Server: v${data.version} | Current: v${APP_CURRENT_VERSION}`
      );
      listeners.forEach(fn => {
        try {
          fn(data);
        } catch (e) {
          console.error('[VersionService] Listener error:', e);
        }
      });
      return data;
    }
    return null;
  } catch (err) {
    // Network failure / offline: ignore silently
    return null;
  } finally {
    isCheckInProgress = false;
  }
}

/**
 * Subscribe to new version notifications
 */
export function onVersionUpdateAvailable(listener: VersionListener): () => void {
  listeners.add(listener);
  if (pendingUpdate) {
    try {
      listener(pendingUpdate);
    } catch (e) {
      console.error('[VersionService] Listener error:', e);
    }
  }
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Get current pending version update if available
 */
export function getPendingVersionUpdate(): VersionInfo | null {
  return pendingUpdate;
}

/**
 * Purge all Service Worker caches and hard reload the application
 * This completely eliminates the need for F12 -> Empty Cache and Hard Reload!
 */
export async function forcePurgeCacheAndReload(): Promise<void> {
  if (typeof window === 'undefined') return;

  console.log('[VersionService] 🧹 Purging all browser caches and reloading...');

  try {
    // 1. Unregister all existing Service Workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(r => r.unregister()));
      console.log(`[VersionService] Unregistered ${registrations.length} service worker(s)`);
    }

    // 2. Delete all CacheStorage entries
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      console.log(`[VersionService] Deleted ${keys.length} cache storage entries`);
    }

    // 3. Clear temporary reload flag
    sessionStorage.removeItem('app_reloaded_for_version');
  } catch (err) {
    console.warn('[VersionService] Cache cleanup error (continuing with reload):', err);
  }

  // 4. Force hard navigation to fresh timestamped URL
  const targetUrl = new URL(window.location.origin + window.location.pathname);
  targetUrl.searchParams.set('_v', Date.now().toString());
  if (window.location.hash) {
    targetUrl.hash = window.location.hash;
  }

  window.location.replace(targetUrl.toString());
}

/**
 * Initialize proactive background check loop
 */
export function initVersionChecker(): void {
  if (typeof window === 'undefined') return;

  // 1. Initial check shortly after app loads
  setTimeout(() => {
    checkServerVersion();
  }, 3000);

  // 2. Periodic background check
  setInterval(() => {
    if (navigator.onLine) {
      checkServerVersion();
    }
  }, VERSION_CHECK_INTERVAL_MS);

  // 3. Tab visibility change check (when user switches back to app tab)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && navigator.onLine) {
      checkServerVersion();
    }
  });

  // 4. Online event
  window.addEventListener('online', () => {
    checkServerVersion();
  });
}
