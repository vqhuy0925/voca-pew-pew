// Cross-domain progress migration bridge between legacy Vercel domain and custom domain (vocabpewpew.com)
// Uses iframe postMessage to transfer large localStorage payloads without hitting "414 URI Too Long" limits.

const TARGET_ORIGIN = 'https://www.vocabpewpew.com';
const TARGET_FALLBACK_ORIGIN = 'https://vocabpewpew.com';

// List of all keys to sync across domains
const SYNC_KEYS = [
  'vocab_pew_pew_user_progress_v2',
  'vocab_pew_pew_user_progress_v1',
  'vocab_pew_pew_active_session_v1',
  'vocab_pew_pew_local_accounts_v1',
  'vocab_pew_pew_local_uid_v1',
  'vocab_pew_pew_player_tag_v1',
  'vocab_dojo_theme_mode'
];

/**
 * Gather all game-related items from localStorage
 */
export function gatherSyncPayload(): Record<string, string> {
  const payload: Record<string, string> = {};
  if (typeof window === 'undefined') return payload;

  for (const key of SYNC_KEYS) {
    const val = localStorage.getItem(key);
    if (val) payload[key] = val;
  }

  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && (k.startsWith('vocab_') || k.startsWith('typing_')) && !payload[k]) {
      const val = localStorage.getItem(k);
      if (val) payload[k] = val;
    }
  }

  return payload;
}

/**
 * Check if running on legacy Vercel domain (e.g. voca-pew-pew.vercel.app).
 * If so, transfers data to vocabpewpew.com via invisible sync-bridge iframe,
 * then redirects smoothly.
 */
export function checkAndRedirectLegacyDomain(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname.toLowerCase();
  const isLegacyDomain =
    hostname.includes('vercel.app') &&
    !hostname.includes('localhost') &&
    !hostname.includes('vocabpewpew.com');

  if (!isLegacyDomain) {
    return false;
  }

  console.log('[DomainMigration] Detected legacy domain! Initiating cross-domain postMessage sync...');

  try {
    const payload = gatherSyncPayload();
    const targetUrl = `${TARGET_ORIGIN}${window.location.pathname}${window.location.hash}`;

    // If no progress stored, redirect immediately
    if (Object.keys(payload).length === 0) {
      window.location.replace(targetUrl);
      return true;
    }

    // Create invisible iframe pointing to sync-bridge.html on target domain
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = `${TARGET_ORIGIN}/sync-bridge.html`;

    let isDone = false;
    const finishRedirect = () => {
      if (isDone) return;
      isDone = true;
      console.log('[DomainMigration] Sync finished. Redirecting to:', targetUrl);
      window.location.replace(targetUrl);
    };

    // Safety timeout: if iframe takes more than 1.8 seconds, redirect anyway
    const timeout = setTimeout(finishRedirect, 1800);

    // Listen for acknowledgment from iframe
    const messageHandler = (e: MessageEvent) => {
      if (e.origin.includes('vocabpewpew.com') && e.data?.type === 'MIGRATE_SUCCESS') {
        clearTimeout(timeout);
        window.removeEventListener('message', messageHandler);
        finishRedirect();
      }
    };
    window.addEventListener('message', messageHandler);

    iframe.onload = () => {
      try {
        iframe.contentWindow?.postMessage(
          { type: 'MIGRATE_PAYLOAD', payload },
          TARGET_ORIGIN
        );
        iframe.contentWindow?.postMessage(
          { type: 'MIGRATE_PAYLOAD', payload },
          TARGET_FALLBACK_ORIGIN
        );
      } catch (err) {
        console.error('[DomainMigration] postMessage failed:', err);
        finishRedirect();
      }
    };

    iframe.onerror = () => {
      finishRedirect();
    };

    document.body.appendChild(iframe);
    return true;
  } catch (err) {
    console.error('[DomainMigration] Redirect error:', err);
    window.location.replace(`${TARGET_ORIGIN}${window.location.pathname}${window.location.hash}`);
    return true;
  }
}
