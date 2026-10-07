// Cross-domain progress migration bridge between legacy Vercel domain and custom domain (vocabpewpew.com)

const TARGET_DOMAIN = 'vocabpewpew.com';
const MIGRATION_PARAM = 'migrate_sync';

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
 * Handle incoming migration payload on target domain (vocabpewpew.com)
 * Returns true if migration data was applied and page is reloading.
 */
export function handleIncomingMigration(): boolean {
  if (typeof window === 'undefined') return false;

  const url = new URL(window.location.href);
  const rawPayload = url.searchParams.get(MIGRATION_PARAM);
  if (!rawPayload) return false;

  try {
    // Decode base64 UTF-8 JSON payload
    const jsonStr = decodeURIComponent(escape(atob(rawPayload)));
    const data = JSON.parse(jsonStr) as Record<string, string>;

    if (data && typeof data === 'object') {
      let restoredCount = 0;
      for (const [key, val] of Object.entries(data)) {
        if (typeof val === 'string' && val.length > 0) {
          // If destination doesn't have it or only has default, save it
          localStorage.setItem(key, val);
          restoredCount++;
        }
      }

      console.log(`[DomainMigration] Restored ${restoredCount} items from legacy domain!`);

      // Clean URL params cleanly without reloading twice
      url.searchParams.delete(MIGRATION_PARAM);
      window.history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
      return true;
    }
  } catch (err) {
    console.error('[DomainMigration] Failed to unpack migration payload:', err);
  }

  return false;
}

/**
 * Check if running on legacy Vercel domain (voca-pew-pew.vercel.app).
 * If so, pack all localStorage data and redirect immediately to vocabpewpew.com.
 */
export function checkAndRedirectLegacyDomain(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname.toLowerCase();

  // Check if current hostname is legacy vercel domain
  const isLegacyDomain =
    hostname.includes('vercel.app') &&
    !hostname.includes('localhost') &&
    hostname !== TARGET_DOMAIN;

  if (!isLegacyDomain) {
    return false;
  }

  console.log('[DomainMigration] Detected legacy domain! Packaging user progress for migration...');

  try {
    // Gather all local storage keys
    const payload: Record<string, string> = {};
    for (const key of SYNC_KEYS) {
      const val = localStorage.getItem(key);
      if (val) {
        payload[key] = val;
      }
    }

    // Also pick any other keys starting with vocab_
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('vocab_') && !payload[k]) {
        const val = localStorage.getItem(k);
        if (val) payload[k] = val;
      }
    }

    const jsonStr = JSON.stringify(payload);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));

    const targetUrl = new URL(`https://${TARGET_DOMAIN}${window.location.pathname}${window.location.hash}`);
    if (Object.keys(payload).length > 0) {
      targetUrl.searchParams.set(MIGRATION_PARAM, encoded);
    }

    console.log(`[DomainMigration] Redirecting to ${targetUrl.toString()}...`);
    window.location.replace(targetUrl.toString());
    return true;
  } catch (err) {
    console.error('[DomainMigration] Error preparing redirect payload:', err);
    // Fallback: direct redirect anyway
    window.location.replace(`https://${TARGET_DOMAIN}${window.location.pathname}${window.location.hash}`);
    return true;
  }
}
