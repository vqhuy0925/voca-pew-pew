import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebaseConfig';
import { getCurrentUid, getOrInitPlayerTag, isOnlineAuth } from './authService';
import { UserProgress } from '../../data/progress-types';
import { calculateWordsMastered } from '../../data/badge-data';

export type SyncStatus = 'offline' | 'idle' | 'syncing' | 'synced' | 'error';

type SyncListener = (status: SyncStatus, lastSynced?: number) => void;
const listeners: Set<SyncListener> = new Set();

let currentStatus: SyncStatus = isFirebaseConfigured ? 'idle' : 'offline';
let lastSyncedAt: number | undefined = undefined;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export const subscribeSyncStatus = (fn: SyncListener): (() => void) => {
  listeners.add(fn);
  fn(currentStatus, lastSyncedAt);
  return () => listeners.delete(fn);
};

const notifyStatus = (status: SyncStatus, timestamp?: number) => {
  currentStatus = status;
  if (timestamp) lastSyncedAt = timestamp;
  listeners.forEach(fn => fn(status, lastSyncedAt));
};

/**
 * Get current ISO week format (e.g. "2026-W37") for weekly leaderboard partitioning
 */
export const getWeekIdentifier = (d: Date = new Date()): string => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

/**
 * Compute total stars earned across all levels
 */
export const calculateTotalStars = (progress: UserProgress): number => {
  return Object.values(progress.levelProgressMap || {}).reduce((sum, lvl) => sum + (lvl.stars || 0), 0);
};

/**
 * Count total completed levels
 */
export const calculateCompletedLevelsCount = (progress: UserProgress): number => {
  return Object.values(progress.levelProgressMap || {}).filter(lvl => lvl.isCompleted).length;
};

export const ACTIVE_SESSION_STORAGE_KEY = 'vocab_pew_pew_active_session_v1';

export const getActiveSessionUid = (): string | null => {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session?.uid || null;
  } catch {
    return null;
  }
};

/**
 * Resolve Single Source of Truth UID for Firestore sync:
 * 1. Active Account Session UID (e.g. 'usr_...') - HIGHEST PRIORITY
 * 2. Registered Account progress.cloudUid
 * 3. Existing persistent cloudUid
 * 4. Anonymous Firebase Auth UID
 * 5. Local UID fallback
 */
export const resolveSyncUid = (progress: UserProgress): string => {
  // 1. Registered Account UID from active session
  const sessionUid = getActiveSessionUid();
  if (sessionUid && !sessionUid.startsWith('local_')) {
    return sessionUid;
  }

  // 2. Registered Account UID on progress object
  if (progress.isRegisteredAccount && progress.cloudUid && !progress.cloudUid.startsWith('local_')) {
    return progress.cloudUid;
  }

  // 3. Persistent established cloudUid (e.g. from prior guest session)
  if (progress.cloudUid && !progress.cloudUid.startsWith('local_')) {
    return progress.cloudUid;
  }

  // 4. Current online Firebase Auth UID
  const activeUid = getCurrentUid();
  if (activeUid && !activeUid.startsWith('local_')) {
    return activeUid;
  }

  // 5. Local UID fallback
  return progress.cloudUid || activeUid || getOrInitPlayerTag();
};

/**
 * Build consolidated Firestore player payload
 */
export const buildUserSyncPayload = (progress: UserProgress, uid: string, playerTag: string, weekId: string) => {
  const totalStars = calculateTotalStars(progress);
  const completedCount = calculateCompletedLevelsCount(progress);

  return {
    uid,
    playerTag,
    accountUsername: progress.accountUsername || null,
    isRegisteredAccount: Boolean(progress.isRegisteredAccount),
    userName: progress.userName || 'Phi Hành Gia',
    avatar: progress.avatar || '🚀',
    gender: progress.gender || 'neutral',
    themeStyle: progress.themeStyle || 'cosmic_cyan',
    mascotId: progress.mascotId || 'cosmo_dog',
    userAge: progress.userAge || 8,
    selectedRealmId: progress.selectedRealmId || 'realm-1',
    currentLevelId: progress.currentLevelId,
    totalXp: progress.totalXp || 0,
    weeklyXp: progress.weeklyXp || 0,
    starsCount: totalStars,
    completedLevelsCount: completedCount,
    streakDays: progress.streakDays || 1,
    gems: progress.gems || 0,
    equippedShipId: progress.equippedShipId || 'ship-scout',
    equippedBlasterId: progress.equippedBlasterId || 'blaster-single',
    equippedLaserId: progress.equippedLaserId || 'laser-cyan',
    unlockedUpgradeIds: progress.unlockedUpgradeIds || [],
    dailyEnergyMode: progress.dailyEnergyMode || 'balanced',
    activeTitle: progress.activeTitle || 'Phi Hành Gia Tập Sự',
    unlockedBadgeIds: progress.unlockedBadgeIds || [],
    selectedBadgeIds: progress.selectedBadgeIds || [],
    wordsMastered: calculateWordsMastered(progress),
    graduatedRealmIds: progress.graduatedRealmIds || [],
    graduatedRealmsCount: (progress.graduatedRealmIds || []).length,
    legendaryUnitsCount: Object.keys(progress.legendaryUnitsMap || {}).length,
    legendaryUnitsMap: progress.legendaryUnitsMap || {},
    dailyQuestProgress: progress.dailyQuestProgress || null,
    levelProgressMap: progress.levelProgressMap || {},
    unlockedLevelIds: Array.from(progress.unlockedLevelIds || []),
    mistakeMap: progress.mistakeMap || {},
    typingProgress: progress.typingProgress || null,
    bestWpmOverall: progress.typingProgress?.bestWpmOverall || 0,
    bestAccuracyOverall: progress.typingProgress?.bestAccuracyOverall || 0,
    lastActiveDate: progress.lastActiveDate,
    lastWeeklyReset: weekId,
    updatedAt: serverTimestamp()
  };
};

/**
 * Queue progress update to Firestore with debounce (1500ms) to conserve free quotas
 */
export const queueCloudSync = (progress: UserProgress) => {
  if (!isFirebaseConfigured || !db || !isOnlineAuth()) {
    notifyStatus('offline');
    return;
  }

  notifyStatus('syncing');

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(async () => {
    const currentDb = db;
    if (!isFirebaseConfigured || !currentDb || !isOnlineAuth()) {
      notifyStatus('offline');
      return;
    }

    try {
      const uid = resolveSyncUid(progress);
      const playerTag = progress.playerTag || getOrInitPlayerTag();
      const weekId = getWeekIdentifier();

      const userDocRef = doc(currentDb, 'users', uid);
      const payload = buildUserSyncPayload(progress, uid, playerTag, weekId);

      await setDoc(userDocRef, payload, { merge: true });

      // Clean up legacy orphan local doc from Firestore if player transitioned to Firebase auth
      const prevLocalUid = progress.cloudUid && progress.cloudUid.startsWith('local_') && progress.cloudUid !== uid ? progress.cloudUid : null;
      if (prevLocalUid) {
        try {
          await deleteDoc(doc(currentDb, 'users', prevLocalUid));
        } catch {
          // Non-blocking cleanup
        }
      }

      const now = Date.now();
      notifyStatus('synced', now);
    } catch (error) {
      console.warn('[CloudSync] Sync failed, keeping local copy safe:', error);
      notifyStatus('error');
    }
  }, 1500);
};

/**
 * Immediate, un-debounced sync to Firestore (used prior to logout or critical milestones)
 */
export const syncCloudNow = async (progress: UserProgress): Promise<void> => {
  if (!isFirebaseConfigured || !db || !isOnlineAuth()) {
    notifyStatus('offline');
    return;
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }

  notifyStatus('syncing');

  try {
    const uid = resolveSyncUid(progress);
    if (!uid) {
      notifyStatus('idle');
      return;
    }
    const playerTag = progress.playerTag || getOrInitPlayerTag();
    const weekId = getWeekIdentifier();

    const userDocRef = doc(db, 'users', uid);
    const payload = buildUserSyncPayload(progress, uid, playerTag, weekId);

    await setDoc(userDocRef, payload, { merge: true });
    notifyStatus('synced', Date.now());
  } catch (error) {
    console.warn('[CloudSync] Immediate sync failed, keeping local copy safe:', error);
    notifyStatus('error');
  }
};

/**
 * Pull latest user profile from cloud if available
 */
export const pullCloudProfile = async (uid: string): Promise<Record<string, any> | null> => {
  const currentDb = db;
  if (!isFirebaseConfigured || !currentDb) return null;

  try {
    const userDocRef = doc(currentDb, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (error) {
    console.warn('[CloudSync] Pull profile failed:', error);
  }
  return null;
};
