import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase/firebaseConfig';
import { AgeRealm } from '../data/chapters/types';
import { AGE_REALMS } from '../data/learning-path-data';
import { LevelNode, Unit } from '../data/progress-types';

const SNAPSHOT_KEY_VERSION = 'vocab_pew_pew_snapshot_version';
const SNAPSHOT_KEY_REALMS = 'vocab_pew_pew_snapshot_realms';

let cachedRealms: AgeRealm[] | null = null;
let currentSnapshotVersion: string | null = null;

/**
 * Initialize active realms from LocalStorage cache or fallback to static AGE_REALMS
 */
const loadInitialRealms = (): AgeRealm[] => {
  if (cachedRealms) return cachedRealms;

  try {
    const savedVersion = localStorage.getItem(SNAPSHOT_KEY_VERSION);
    const savedData = localStorage.getItem(SNAPSHOT_KEY_REALMS);
    if (savedVersion && savedData) {
      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedRealms = parsed;
        currentSnapshotVersion = savedVersion;
        console.log(`[VocabLoader] Loaded cached snapshot ${savedVersion} (${parsed.length} realms) 🚀`);
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[VocabLoader] Failed to read local snapshot cache, using static defaults:', e);
  }

  cachedRealms = AGE_REALMS;
  return AGE_REALMS;
};

// Initial synchronous load
loadInitialRealms();

/**
 * Check if a newer vocab snapshot is available on Firestore and update cache in background
 */
export const checkAndUpdateVocabSnapshot = async (): Promise<boolean> => {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const snapshotDocRef = doc(db, 'vocab_snapshots', 'latest');
    const snap = await getDoc(snapshotDocRef);

    if (snap.exists()) {
      const data = snap.data();
      const cloudVersion = data.versionId;
      const localVersion = localStorage.getItem(SNAPSHOT_KEY_VERSION);

      if (cloudVersion && cloudVersion !== localVersion && Array.isArray(data.realms)) {
        console.log(`[VocabLoader] Found new vocab snapshot ${cloudVersion} (was ${localVersion}). Updating... 🔄`);
        cachedRealms = data.realms;
        currentSnapshotVersion = cloudVersion;

        localStorage.setItem(SNAPSHOT_KEY_VERSION, cloudVersion);
        localStorage.setItem(SNAPSHOT_KEY_REALMS, JSON.stringify(data.realms));
        return true;
      }
    }
  } catch (error) {
    console.warn('[VocabLoader] Cloud snapshot check failed, continuing with cached/static data:', error);
  }

  return false;
};

/**
 * Get active realms (Cloud snapshot > Local Cache > Static Codebase Fallback)
 */
export const getActiveRealms = (): AgeRealm[] => {
  if (!cachedRealms) {
    return loadInitialRealms();
  }
  return cachedRealms;
};

/**
 * Get active learning units
 */
export const getActiveLearningUnits = (): Unit[] => {
  const realms = getActiveRealms();
  return realms.flatMap(r => r.units || []);
};

/**
 * Get all active level nodes
 */
export const getActiveAllLevels = (): LevelNode[] => {
  return getActiveLearningUnits().flatMap(u => u.levels || []);
};

/**
 * Get active level by ID
 */
export const getActiveLevelById = (id: string): LevelNode => {
  const levels = getActiveAllLevels();
  return levels.find(l => l.id === id) || levels[0];
};

/**
 * Get active realm by ID
 */
export const getActiveRealmById = (realmId: string): AgeRealm => {
  const realms = getActiveRealms();
  return realms.find(r => r.id === realmId) || realms[0];
};

/**
 * Get current snapshot version string if available
 */
export const getCurrentSnapshotVersion = (): string => {
  return currentSnapshotVersion || 'v1.0.0-static';
};
