import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebaseConfig';
import { UserProgress } from '../../data/progress-types';
import { getWeekIdentifier, calculateTotalStars } from './cloudSyncService';
import { getCurrentUid, getOrInitPlayerTag } from './authService';

export type LeaderboardCategory = 'global' | 'realm' | 'weekly';

export interface LeaderboardEntry {
  uid: string;
  playerTag: string;
  userName: string;
  avatar: string;
  gender?: string;
  userAge?: number;
  selectedRealmId?: string;
  equippedShipId?: string;
  totalXp: number;
  weeklyXp: number;
  starsCount: number;
  streakDays: number;
  rank: number;
  isCurrentUser?: boolean;
}

/**
 * Kid-friendly cosmic contenders for lively galactic rankings,
 * ensuring the game never shows empty leaderboards even when offline or in cold-start.
 */
const MOCK_COSMIC_CONTENDERS: Omit<LeaderboardEntry, 'rank'>[] = [
  {
    uid: 'bot_nova_01',
    playerTag: '#PEW-NOVA',
    userName: 'Captain Nova',
    avatar: '🌟',
    gender: 'neutral',
    userAge: 9,
    selectedRealmId: 'realm-1',
    equippedShipId: 'ship-interceptor',
    totalXp: 1850,
    weeklyXp: 420,
    starsCount: 42,
    streakDays: 8
  },
  {
    uid: 'bot_bapp_02',
    playerTag: '#PEW-BAPP',
    userName: 'Bé Bắp Vui Vẻ',
    avatar: '🌽',
    gender: 'boy',
    userAge: 8,
    selectedRealmId: 'realm-1',
    equippedShipId: 'ship-scout',
    totalXp: 1620,
    weeklyXp: 380,
    starsCount: 38,
    streakDays: 6
  },
  {
    uid: 'bot_soc_03',
    playerTag: '#PEW-SOC7',
    userName: 'Xạ Thủ Sóc Nâu',
    avatar: '🐿️',
    gender: 'girl',
    userAge: 10,
    selectedRealmId: 'realm-2',
    equippedShipId: 'ship-destroyer',
    totalXp: 1450,
    weeklyXp: 350,
    starsCount: 34,
    streakDays: 7
  },
  {
    uid: 'bot_long_04',
    playerTag: '#PEW-LONG',
    userName: 'Phi Long Vũ Trụ',
    avatar: '🐉',
    gender: 'boy',
    userAge: 11,
    selectedRealmId: 'realm-3',
    equippedShipId: 'ship-cruiser',
    totalXp: 1290,
    weeklyXp: 310,
    starsCount: 30,
    streakDays: 5
  },
  {
    uid: 'bot_meow_05',
    playerTag: '#PEW-MEOW',
    userName: 'Mèo Phi Hành',
    avatar: '🐱',
    gender: 'girl',
    userAge: 8,
    selectedRealmId: 'realm-1',
    equippedShipId: 'ship-scout',
    totalXp: 1120,
    weeklyXp: 270,
    starsCount: 26,
    streakDays: 4
  },
  {
    uid: 'bot_metr_06',
    playerTag: '#PEW-METR',
    userName: 'Sao Băng Tốc Độ',
    avatar: '💫',
    gender: 'neutral',
    userAge: 12,
    selectedRealmId: 'realm-4',
    equippedShipId: 'ship-interceptor',
    totalXp: 980,
    weeklyXp: 240,
    starsCount: 24,
    streakDays: 5
  },
  {
    uid: 'bot_avoc_07',
    playerTag: '#PEW-AVOC',
    userName: 'Bé Bơ Đáng Yêu',
    avatar: '🥑',
    gender: 'girl',
    userAge: 9,
    selectedRealmId: 'realm-2',
    equippedShipId: 'ship-scout',
    totalXp: 860,
    weeklyXp: 210,
    starsCount: 20,
    streakDays: 3
  },
  {
    uid: 'bot_robo_08',
    playerTag: '#PEW-ROBO',
    userName: 'Robot Tia Chớp',
    avatar: '🤖',
    gender: 'boy',
    userAge: 13,
    selectedRealmId: 'realm-5',
    equippedShipId: 'ship-destroyer',
    totalXp: 750,
    weeklyXp: 180,
    starsCount: 18,
    streakDays: 4
  },
  {
    uid: 'bot_prnc_09',
    playerTag: '#PEW-PRNC',
    userName: 'Công Chúa Thiên Hà',
    avatar: '👑',
    gender: 'girl',
    userAge: 8,
    selectedRealmId: 'realm-1',
    equippedShipId: 'ship-carrier',
    totalXp: 640,
    weeklyXp: 150,
    starsCount: 16,
    streakDays: 3
  },
  {
    uid: 'bot_knig_10',
    playerTag: '#PEW-KNIG',
    userName: 'Kỵ Sĩ Vũ Trụ',
    avatar: '🛡️',
    gender: 'boy',
    userAge: 11,
    selectedRealmId: 'realm-3',
    equippedShipId: 'ship-scout',
    totalXp: 530,
    weeklyXp: 130,
    starsCount: 14,
    streakDays: 2
  },
  {
    uid: 'bot_bear_11',
    playerTag: '#PEW-BEAR',
    userName: 'Gấu Tuyết Bắc Cực',
    avatar: '🐻‍❄️',
    gender: 'boy',
    userAge: 9,
    selectedRealmId: 'realm-2',
    equippedShipId: 'ship-scout',
    totalXp: 420,
    weeklyXp: 100,
    starsCount: 11,
    streakDays: 2
  },
  {
    uid: 'bot_fire_12',
    playerTag: '#PEW-FIRE',
    userName: 'Tiểu Phượng Hoàng',
    avatar: '🔥',
    gender: 'girl',
    userAge: 14,
    selectedRealmId: 'realm-6',
    equippedShipId: 'ship-interceptor',
    totalXp: 350,
    weeklyXp: 90,
    starsCount: 9,
    streakDays: 1
  }
];

/**
 * Merge current user into list, sort, and assign consecutive ranks 1..N
 */
export const mergeCurrentUser = (
  entries: LeaderboardEntry[],
  currentProgress?: UserProgress,
  sortKey: 'totalXp' | 'weeklyXp' = 'totalXp'
): LeaderboardEntry[] => {
  if (!currentProgress) {
    return entries
      .sort((a, b) => b[sortKey] - a[sortKey])
      .map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  }

  const currentUid = currentProgress.cloudUid || getCurrentUid();
  const currentTag = currentProgress.playerTag || getOrInitPlayerTag();
  const currentStars = calculateTotalStars(currentProgress);
  const currentName = currentProgress.userName?.trim() || 'Phi Hành Gia';

  // Check if current user is already in entries
  const existingIdx = entries.findIndex(
    e => e.uid === currentUid || (e.playerTag === currentTag && e.playerTag !== '#PEW')
  );

  const cleanList = entries.filter((_, idx) => idx !== existingIdx);

  const currentUserEntry: LeaderboardEntry = {
    uid: currentUid,
    playerTag: currentTag,
    userName: currentName,
    avatar: currentProgress.avatar || '🚀',
    gender: currentProgress.gender || 'neutral',
    userAge: currentProgress.userAge,
    selectedRealmId: currentProgress.selectedRealmId || 'realm-1',
    equippedShipId: currentProgress.equippedShipId || 'ship-scout',
    totalXp: currentProgress.totalXp || 0,
    weeklyXp: currentProgress.weeklyXp || 0,
    starsCount: currentStars,
    streakDays: currentProgress.streakDays || 1,
    rank: 0,
    isCurrentUser: true
  };

  cleanList.push(currentUserEntry);

  return cleanList
    .sort((a, b) => b[sortKey] - a[sortKey])
    .map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
      isCurrentUser: entry.uid === currentUid || entry.playerTag === currentTag
    }));
};

/**
 * Fetch Top Global Leaderboard (sorted by totalXp descending)
 */
export const fetchGlobalLeaderboard = async (
  limitCount = 50,
  currentProgress?: UserProgress
): Promise<LeaderboardEntry[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('totalXp', 'desc'),
        limit(limitCount)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const liveEntries: LeaderboardEntry[] = snap.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            uid: docSnap.id,
            playerTag: data.playerTag || '#PEW-????',
            userName: data.userName || 'Nhà Thám Hiểm',
            avatar: data.avatar || '🚀',
            gender: data.gender || 'neutral',
            userAge: data.userAge,
            selectedRealmId: data.selectedRealmId,
            equippedShipId: data.equippedShipId,
            totalXp: Number(data.totalXp) || 0,
            weeklyXp: Number(data.weeklyXp) || 0,
            starsCount: Number(data.starsCount) || 0,
            streakDays: Number(data.streakDays) || 1,
            rank: 0
          };
        });

        return mergeCurrentUser(liveEntries, currentProgress, 'totalXp');
      }
    } catch (err) {
      console.warn('[Leaderboard] Global fetch failed, using cosmic contenders:', err);
    }
  }

  // Fallback mode
  const baseEntries = MOCK_COSMIC_CONTENDERS.map(c => ({ ...c, rank: 0 }));
  return mergeCurrentUser(baseEntries, currentProgress, 'totalXp');
};

/**
 * Fetch Realm Leaderboard (sorted by totalXp descending within the given Realm)
 */
export const fetchRealmLeaderboard = async (
  realmId: string,
  limitCount = 50,
  currentProgress?: UserProgress
): Promise<LeaderboardEntry[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'users'),
        where('selectedRealmId', '==', realmId),
        orderBy('totalXp', 'desc'),
        limit(limitCount)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const liveEntries: LeaderboardEntry[] = snap.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            uid: docSnap.id,
            playerTag: data.playerTag || '#PEW-????',
            userName: data.userName || 'Nhà Thám Hiểm',
            avatar: data.avatar || '🚀',
            gender: data.gender || 'neutral',
            userAge: data.userAge,
            selectedRealmId: data.selectedRealmId,
            equippedShipId: data.equippedShipId,
            totalXp: Number(data.totalXp) || 0,
            weeklyXp: Number(data.weeklyXp) || 0,
            starsCount: Number(data.starsCount) || 0,
            streakDays: Number(data.streakDays) || 1,
            rank: 0
          };
        });

        // Filter current user to only show in this realm if their realm matches
        const matchesRealm = currentProgress && (currentProgress.selectedRealmId === realmId);
        return mergeCurrentUser(liveEntries, matchesRealm ? currentProgress : undefined, 'totalXp');
      }
    } catch (err) {
      console.warn('[Leaderboard] Realm fetch failed, using fallback:', err);
    }
  }

  // Fallback mode: Filter mock contenders by realm or adapt them
  let realmContenders = MOCK_COSMIC_CONTENDERS.filter(c => c.selectedRealmId === realmId);
  if (realmContenders.length < 5) {
    // Borrow and adapt a few contenders so realm board looks vibrant
    realmContenders = MOCK_COSMIC_CONTENDERS.slice(0, 8).map(c => ({
      ...c,
      selectedRealmId: realmId,
      totalXp: Math.round(c.totalXp * 0.85)
    }));
  }

  const baseEntries = realmContenders.map(c => ({ ...c, rank: 0 }));
  const matchesRealm = currentProgress && (currentProgress.selectedRealmId === realmId);
  return mergeCurrentUser(baseEntries, matchesRealm ? currentProgress : undefined, 'totalXp');
};

/**
 * Fetch Weekly Leaderboard (sorted by weeklyXp descending)
 */
export const fetchWeeklyLeaderboard = async (
  limitCount = 50,
  currentProgress?: UserProgress
): Promise<LeaderboardEntry[]> => {
  const currentWeek = getWeekIdentifier();

  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'users'),
        where('lastWeeklyReset', '==', currentWeek),
        orderBy('weeklyXp', 'desc'),
        limit(limitCount)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const liveEntries: LeaderboardEntry[] = snap.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            uid: docSnap.id,
            playerTag: data.playerTag || '#PEW-????',
            userName: data.userName || 'Nhà Thám Hiểm',
            avatar: data.avatar || '🚀',
            gender: data.gender || 'neutral',
            userAge: data.userAge,
            selectedRealmId: data.selectedRealmId,
            equippedShipId: data.equippedShipId,
            totalXp: Number(data.totalXp) || 0,
            weeklyXp: Number(data.weeklyXp) || 0,
            starsCount: Number(data.starsCount) || 0,
            streakDays: Number(data.streakDays) || 1,
            rank: 0
          };
        });

        return mergeCurrentUser(liveEntries, currentProgress, 'weeklyXp');
      }
    } catch (err) {
      console.warn('[Leaderboard] Weekly fetch failed, using fallback:', err);
    }
  }

  // Fallback mode
  const baseEntries = MOCK_COSMIC_CONTENDERS.map(c => ({ ...c, rank: 0 }));
  return mergeCurrentUser(baseEntries, currentProgress, 'weeklyXp');
};

/**
 * Find the user's rank and total player count in a given list
 */
export const findUserRankInfo = (
  entries: LeaderboardEntry[]
): { userRank?: number; totalPlayers: number; userEntry?: LeaderboardEntry } => {
  const userEntry = entries.find(e => e.isCurrentUser);
  return {
    userRank: userEntry ? userEntry.rank : undefined,
    totalPlayers: entries.length,
    userEntry
  };
};
