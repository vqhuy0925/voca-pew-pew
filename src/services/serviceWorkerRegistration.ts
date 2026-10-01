// Service Worker Registration for Vocab Pew Pew (Workbox via vite-plugin-pwa)
import { registerSW } from 'virtual:pwa-register';

type UpdateListener = () => void;

const updateListeners = new Set<UpdateListener>();
let isUpdateReady = false;
let isUserInGame = false;
let updateSWFn: ((reloadPage?: boolean) => Promise<void>) | null = null;
let swRegistration: ServiceWorkerRegistration | undefined;

// Interval to periodically query server for SW updates (20 minutes)
const PERIODIC_CHECK_INTERVAL_MS = 20 * 60 * 1000;

/**
 * Register listener for when a new app version is ready
 */
export function onAppUpdateAvailable(listener: UpdateListener): () => void {
  updateListeners.add(listener);
  // If already ready, notify immediately
  if (isUpdateReady) {
    try {
      listener();
    } catch (e) {
      console.error('[PWA] Error in update listener:', e);
    }
  }
  return () => {
    updateListeners.delete(listener);
  };
}

/**
 * Notify all subscribers that a new version has been downloaded and ready to apply
 */
function notifyUpdateAvailable(): void {
  isUpdateReady = true;
  console.log('[PWA] 🚀 New app version detected and ready to activate!');

  // If user is currently in the middle of battle/dojo, defer reload and notify UI
  if (isUserInGame) {
    console.log('[PWA] User is in active gameplay. Deferring reload until safe.');
    updateListeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('[PWA] Listener failed:', e);
      }
    });
  } else {
    // If user is at Landing or Map menu, reload seamlessly
    console.log('[PWA] User is in menu/idle. Reloading to apply fresh build...');
    applyAppUpdate();
  }
}

/**
 * Update the active gameplay state.
 * When exiting gameplay, if an update is pending, apply it.
 */
export function setInActiveGameplay(inGame: boolean): void {
  isUserInGame = inGame;
  if (!inGame && isUpdateReady) {
    console.log('[PWA] User exited gameplay. Applying pending update now...');
    applyAppUpdate();
  }
}

/**
 * Apply the update immediately by skipping waiting and reloading the page
 */
export function applyAppUpdate(): void {
  try {
    if (updateSWFn) {
      updateSWFn(true);
    } else {
      window.location.reload();
    }
  } catch {
    window.location.reload();
  }
}

/**
 * Manually trigger a service worker check against the server
 */
export async function checkForAppUpdates(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !swRegistration) {
    return false;
  }
  try {
    console.log('[PWA] Checking for updates against server...');
    await swRegistration.update();
    return true;
  } catch (err) {
    console.warn('[PWA] Update check failed:', err);
    return false;
  }
}

/**
 * Returns whether an app update is currently waiting to be applied
 */
export function isUpdatePending(): boolean {
  return isUpdateReady;
}

/**
 * Main Service Worker registration
 */
export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const runRegistration = () => {
    try {
      updateSWFn = registerSW({
        immediate: true,
        onNeedReload() {
          notifyUpdateAvailable();
        },
        onNeedRefresh() {
          notifyUpdateAvailable();
        },
        onOfflineReady() {
          console.log('[PWA] Content cached by Workbox for offline play 🚀');
        },
        onRegisteredSW(_swScriptUrl, registration) {
          if (!registration) return;
          swRegistration = registration;
          console.log('[PWA] Service Worker registered successfully.');

          // 1. Periodic background update check
          setInterval(() => {
            if (navigator.onLine) {
              registration.update().catch(() => {});
            }
          }, PERIODIC_CHECK_INTERVAL_MS);

          // 2. Tab focus / visibility check (when student returns to tab)
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && navigator.onLine) {
              registration.update().catch(() => {});
            }
          });

          // 3. Online event check (when student reconnects to internet)
          window.addEventListener('online', () => {
            registration.update().catch(() => {});
          });
        },
        onRegisterError(error: unknown) {
          console.warn('[PWA] Service Worker registration failed:', error);
        }
      });
    } catch (err) {
      console.warn('[PWA] Failed to initialize registerSW:', err);
    }
  };

  // Run immediately if DOM ready, or on load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runRegistration();
  } else {
    window.addEventListener('DOMContentLoaded', runRegistration, { once: true });
  }
}

export function unregisterServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
}
