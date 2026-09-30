import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase/firebaseConfig';

export interface BrandingConfig {
  partnerMessage: string;
  partnerSubtext: string;
  partnerLogoUrl?: string;
  showPartnerBanner: boolean;
  updatedAt?: any;
  updatedBy?: string;
}

export const DEFAULT_BRANDING_CONFIG: BrandingConfig = {
  partnerMessage: 'Được đồng phát triển bởi Đoàn phường Phước Thới',
  partnerSubtext: 'Đồng hành cùng học sinh nâng cao năng lực ngoại ngữ và tin học ứng dụng',
  partnerLogoUrl: '/logo_doan_phuong_phuoc_thoi.jpeg',
  showPartnerBanner: true,
};

const STORAGE_KEY = 'vocapewpew_branding_config';
const listeners = new Set<(config: BrandingConfig) => void>();

let cachedConfig: BrandingConfig = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_BRANDING_CONFIG,
        ...parsed,
        partnerLogoUrl: parsed.partnerLogoUrl ?? DEFAULT_BRANDING_CONFIG.partnerLogoUrl,
      };
    }
  } catch (err) {
    console.warn('[BrandingService] Error reading localStorage, using defaults:', err);
  }
  return { ...DEFAULT_BRANDING_CONFIG };
})();

function notifyListeners() {
  listeners.forEach((callback) => {
    try {
      callback({ ...cachedConfig });
    } catch (e) {
      console.error('[BrandingService] Error notifying listener:', e);
    }
  });
}

/**
 * Get current branding configuration (synchronous, backed by memory/localStorage).
 */
export function getBrandingConfig(): BrandingConfig {
  return { ...cachedConfig };
}

/**
 * Subscribe to changes in branding config.
 */
export function subscribeBrandingConfig(callback: (config: BrandingConfig) => void): () => void {
  listeners.add(callback);
  // Send current cached value immediately
  callback({ ...cachedConfig });

  return () => {
    listeners.delete(callback);
  };
}

/**
 * Fetch latest branding configuration from Firebase Firestore `system_settings/branding`.
 * Updates local cache and notifies all mounted components.
 */
export async function syncRemoteBrandingConfig(): Promise<BrandingConfig> {
  if (!isFirebaseConfigured || !db) {
    return getBrandingConfig();
  }

  try {
    const docRef = doc(db, 'system_settings', 'branding');
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const remoteData = snap.data();
      if (remoteData) {
        cachedConfig = {
          ...DEFAULT_BRANDING_CONFIG,
          ...remoteData,
          partnerLogoUrl: remoteData.partnerLogoUrl ?? DEFAULT_BRANDING_CONFIG.partnerLogoUrl,
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedConfig));
        } catch (e) {
          console.warn('[BrandingService] Could not persist to localStorage:', e);
        }
        notifyListeners();
      }
    }
  } catch (err) {
    console.warn('[BrandingService] Error syncing remote branding:', err);
  }

  return getBrandingConfig();
}

/**
 * Save new branding configuration to LocalStorage and Firebase Firestore.
 */
export async function saveBrandingConfig(
  newConfig: Partial<BrandingConfig>,
  authorEmail: string = 'admin'
): Promise<BrandingConfig> {
  const updated: BrandingConfig = {
    ...cachedConfig,
    ...newConfig,
    updatedBy: authorEmail,
  };

  cachedConfig = updated;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[BrandingService] Failed to save to localStorage:', err);
  }

  notifyListeners();

  // Save to Cloud Firestore if connected
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'system_settings', 'branding');
      await setDoc(docRef, {
        partnerMessage: updated.partnerMessage,
        partnerSubtext: updated.partnerSubtext,
        partnerLogoUrl: updated.partnerLogoUrl ?? '',
        showPartnerBanner: updated.showPartnerBanner,
        updatedBy: authorEmail,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('[BrandingService] Error saving branding to Firestore:', err);
      throw err;
    }
  }

  return { ...cachedConfig };
}

/**
 * Reset branding configuration back to default Phước Thới Youth Union settings.
 */
export async function resetBrandingConfig(authorEmail: string = 'admin'): Promise<BrandingConfig> {
  return saveBrandingConfig(DEFAULT_BRANDING_CONFIG, authorEmail);
}
