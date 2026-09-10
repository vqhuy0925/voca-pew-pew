import { detectIncognito } from 'detectincognitojs';

export interface IncognitoDetectionResult {
  isPrivate: boolean;
  browserName: string;
}

let cachedResult: IncognitoDetectionResult | null = null;
let detectionPromise: Promise<IncognitoDetectionResult> | null = null;

/**
 * Fallback detection for Chromium-based browsers via Storage Quota
 */
const fallbackQuotaCheck = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    if (navigator.storage && navigator.storage.estimate) {
      const { quota } = await navigator.storage.estimate();
      // On Chromium incognito, quota is capped to a fraction of RAM (typically < 120MB)
      if (quota && quota < 120 * 1024 * 1024) {
        return true;
      }
    }
  } catch {
    // Ignore error
  }
  return false;
};

/**
 * Asynchronously detect if the current session is running in Incognito / Private browsing mode.
 * Results are cached in memory for the duration of the page lifecycle.
 */
export const checkIsIncognito = async (): Promise<IncognitoDetectionResult> => {
  if (cachedResult) {
    return cachedResult;
  }

  if (detectionPromise) {
    return detectionPromise;
  }

  detectionPromise = (async () => {
    try {
      const result = await detectIncognito();
      let isPrivate = result.isPrivate;

      // Double-check with quota check if detectIncognito gave false on Chromium
      if (!isPrivate && (await fallbackQuotaCheck())) {
        isPrivate = true;
      }

      cachedResult = {
        isPrivate,
        browserName: result.browserName || 'Unknown'
      };
      return cachedResult;
    } catch (err) {
      console.warn('[IncognitoDetector] Standard detection failed, attempting fallback:', err);
      const isPrivateFallback = await fallbackQuotaCheck();
      cachedResult = {
        isPrivate: isPrivateFallback,
        browserName: 'Unknown'
      };
      return cachedResult;
    }
  })();

  return detectionPromise;
};

/**
 * Synchronously check if incognito mode has been detected.
 * Returns false until checkIsIncognito() completes.
 */
export const isIncognitoSession = (): boolean => {
  return cachedResult?.isPrivate ?? false;
};
