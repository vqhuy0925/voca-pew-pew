import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
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

/**
 * Queue progress update to Firestore with debounce (1500ms) to conserve free quotas
 */
export const queueCloudSync = (progress: UserProgress) => {
  if (!isFirebaseConfigured || !db) {
    notifyStatus('offline');
    return;
  }

  notifyStatus('syncing');

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(async () => {
    const currentDb = db;
    if (!isFirebaseConfigured || !currentDb) {
      notifyStatus('offline');
      return;
    }

    try {
      const uid = progress.cloudUid || getCurrentUid();
      const playerTag = progress.playerTag || getOrInitPlayerTag();
      const weekId = getWeekIdentifier();

      const userDocRef = doc(currentDb, 'users', uid);
      const totalStars = calculateTotalStars(progress);
      const completedCount = calculateCompletedLevelsCount(progress);

      const payload = {
        uid,
        playerTag,
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
        lastActiveDate: progress.lastActiveDate,
        lastWeeklyReset: weekId,
        updatedAt: serverTimestamp()
      };

      await setDoc(userDocRef, payload, { merge: true });
      const now = Date.now();
      notifyStatus('synced', now);
    } catch (error) {
      console.warn('[CloudSync] Sync failed, keeping local copy safe:', error);
      notifyStatus('error');
    }
  }, 1500);
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
