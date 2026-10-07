import { collection, query, orderBy, limit, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebaseConfig';

export interface UserAnalyticsItem {
  uid: string;
  playerTag: string;
  userName: string;
  avatar: string;
  userAge: number;
  selectedRealmId: string;
  currentLevelId: string;
  totalXp: number;
  weeklyXp: number;
  starsCount: number;
  completedLevelsCount: number;
  streakDays: number;
  wordsMastered: number;
  graduatedRealmIds?: string[];
  graduatedRealmsCount?: number;
  legendaryUnitsCount?: number;
  dailyQuestProgress?: {
    date: string;
    mistakesReviewedCount: number;
    threeStarEarnedCount: number;
    levelsPlayedCount: number;
    claimedReward: boolean;
  } | null;
  mascotId?: string;
  themeStyle?: string;
  lastActiveDate?: string;
  updatedAt?: any;
}

export interface AnalyticsSummary {
  totalUsers: number;
  dau: number;            // Active within last 24h
  wau: number;            // Active within last 7 days
  totalStars: number;
  totalXp: number;
  totalWordsMastered: number;
  totalGraduations: number;
  totalLegendaryUnits: number;
  dailyQuestsCompletedToday: number;
  averageStreak: number;
  realmDistribution: Record<string, number>;
  mascotDistribution: Record<string, number>;
  themeDistribution: Record<string, number>;
}

/**
 * Fetch learners list from Firestore `users` collection with quota-safe limit
 */
export const fetchUserAnalyticsList = async (maxLimit = 100): Promise<UserAnalyticsItem[]> => {
  if (!isFirebaseConfigured || !db) {
    return [];
  }

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('updatedAt', 'desc'), limit(maxLimit));
    const snap = await getDocs(q);

    const rawList: UserAnalyticsItem[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      rawList.push({
        uid: docSnap.id,
        playerTag: data.playerTag || docSnap.id.substring(0, 6).toUpperCase(),
        userName: data.userName || 'Phi Hành Gia',
        avatar: data.avatar || '🚀',
        userAge: data.userAge || 8,
        selectedRealmId: data.selectedRealmId || 'realm-1',
        currentLevelId: data.currentLevelId || 'lvl-1-1',
        totalXp: data.totalXp || 0,
        weeklyXp: data.weeklyXp || 0,
        starsCount: data.starsCount || 0,
        completedLevelsCount: data.completedLevelsCount || 0,
        streakDays: data.streakDays || 1,
        wordsMastered: data.wordsMastered || 0,
        graduatedRealmIds: data.graduatedRealmIds || [],
        graduatedRealmsCount: data.graduatedRealmsCount || (data.graduatedRealmIds || []).length,
        legendaryUnitsCount: data.legendaryUnitsCount || (data.legendaryUnitsMap ? Object.keys(data.legendaryUnitsMap).length : 0),
        dailyQuestProgress: data.dailyQuestProgress || null,
        mascotId: data.mascotId || 'cosmo_dog',
        themeStyle: data.themeStyle || 'cosmic_cyan',
        lastActiveDate: data.lastActiveDate,
        updatedAt: data.updatedAt
      });
    });

    // Deduplicate users by playerTag (or uid) keeping the record with highest XP/stars
    const userMap = new Map<string, UserAnalyticsItem>();
    for (const item of rawList) {
      const key = item.playerTag ? item.playerTag.trim().toUpperCase() : item.uid;
      const existing = userMap.get(key);
      if (!existing) {
        userMap.set(key, item);
      } else {
        const isBetter =
          item.totalXp > existing.totalXp ||
          (item.totalXp === existing.totalXp && item.starsCount > existing.starsCount) ||
          (item.totalXp === existing.totalXp && !item.uid.startsWith('local_') && existing.uid.startsWith('local_'));
        if (isBetter) {
          userMap.set(key, item);
        }
      }
    }

    // Sort by totalXp descending
    return Array.from(userMap.values()).sort((a, b) => b.totalXp - a.totalXp);
  } catch (error) {
    console.warn('[AnalyticsAdmin] Failed to fetch users list:', error);
    return [];
  }
};

/**
 * Compute aggregate KPIs and distribution breakdown from users list
 */
export const computeAnalyticsKpis = (users: UserAnalyticsItem[]): AnalyticsSummary => {
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

  let dau = 0;
  let wau = 0;
  let totalStars = 0;
  let totalXp = 0;
  let totalWordsMastered = 0;
  let totalGraduations = 0;
  let totalLegendaryUnits = 0;
  let dailyQuestsCompletedToday = 0;
  let totalStreak = 0;

  const realmDistribution: Record<string, number> = {};
  const mascotDistribution: Record<string, number> = {};
  const themeDistribution: Record<string, number> = {};

  users.forEach((u) => {
    totalStars += u.starsCount;
    totalXp += u.totalXp;
    totalWordsMastered += u.wordsMastered;
    totalGraduations += u.graduatedRealmsCount || (u.graduatedRealmIds || []).length;
    totalLegendaryUnits += u.legendaryUnitsCount || 0;
    totalStreak += u.streakDays;

    if (u.dailyQuestProgress?.date === today && u.dailyQuestProgress?.claimedReward) {
      dailyQuestsCompletedToday++;
    }

    if (u.lastActiveDate === today) {
      dau++;
    }
    if (u.lastActiveDate && u.lastActiveDate >= sevenDaysAgo) {
      wau++;
    }

    // Realm distribution
    const realm = u.selectedRealmId || 'realm-1';
    realmDistribution[realm] = (realmDistribution[realm] || 0) + 1;

    // Mascot
    const mascot = u.mascotId || 'cosmo_dog';
    mascotDistribution[mascot] = (mascotDistribution[mascot] || 0) + 1;

    // Theme
    const theme = u.themeStyle || 'cosmic_cyan';
    themeDistribution[theme] = (themeDistribution[theme] || 0) + 1;
  });

  return {
    totalUsers: users.length,
    dau: dau || Math.min(users.length, 1),
    wau: wau || users.length,
    totalStars,
    totalXp,
    totalWordsMastered,
    totalGraduations,
    totalLegendaryUnits,
    dailyQuestsCompletedToday,
    averageStreak: users.length > 0 ? Math.round((totalStreak / users.length) * 10) / 10 : 0,
    realmDistribution,
    mascotDistribution,
    themeDistribution
  };
};

export interface DuplicateGroup {
  playerTag: string;
  userName: string;
  bestDoc: UserAnalyticsItem;
  duplicates: UserAnalyticsItem[];
}

/**
 * Scan Firestore users collection to find duplicate documents sharing the same playerTag
 */
export const findDuplicateUsersInFirestore = async (maxLimit = 300): Promise<DuplicateGroup[]> => {
  if (!isFirebaseConfigured || !db) return [];

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('updatedAt', 'desc'), limit(maxLimit));
    const snap = await getDocs(q);

    const tagGroups = new Map<string, UserAnalyticsItem[]>();

    snap.forEach(docSnap => {
      const data = docSnap.data();
      const item: UserAnalyticsItem = {
        uid: docSnap.id,
        playerTag: data.playerTag || docSnap.id.substring(0, 6).toUpperCase(),
        userName: data.userName || 'Phi Hành Gia',
        avatar: data.avatar || '🚀',
        userAge: data.userAge || 8,
        selectedRealmId: data.selectedRealmId || 'realm-1',
        currentLevelId: data.currentLevelId || 'lvl-1-1',
        totalXp: data.totalXp || 0,
        weeklyXp: data.weeklyXp || 0,
        starsCount: data.starsCount || 0,
        completedLevelsCount: data.completedLevelsCount || 0,
        streakDays: data.streakDays || 1,
        wordsMastered: data.wordsMastered || 0,
        lastActiveDate: data.lastActiveDate,
        updatedAt: data.updatedAt
      };

      const tag = item.playerTag ? item.playerTag.trim().toUpperCase() : '';
      if (!tag || tag === '#PEW-????') return;

      const list = tagGroups.get(tag) || [];
      list.push(item);
      tagGroups.set(tag, list);
    });

    const duplicateGroups: DuplicateGroup[] = [];

    tagGroups.forEach((items, tag) => {
      if (items.length > 1) {
        // Sort items so the best item (highest stars, highest totalXp, non-local) comes first
        items.sort((a, b) => {
          if (b.starsCount !== a.starsCount) return b.starsCount - a.starsCount;
          if (b.totalXp !== a.totalXp) return b.totalXp - a.totalXp;
          return 0;
        });

        const bestDoc = items[0];
        const duplicates = items.slice(1);
        duplicateGroups.push({
          playerTag: tag,
          userName: bestDoc.userName,
          bestDoc,
          duplicates
        });
      }
    });

    return duplicateGroups;
  } catch (err) {
    console.error('[AnalyticsAdmin:findDuplicateUsers] Error:', err);
    return [];
  }
};

/**
 * Purge orphan duplicates from Firestore, leaving only the primary best document
 */
export const purgeDuplicateUsersInFirestore = async (
  groups: DuplicateGroup[]
): Promise<{ success: boolean; deletedCount: number; message: string }> => {
  if (!isFirebaseConfigured || !db) {
    return { success: false, deletedCount: 0, message: 'Firebase chưa được kết nối.' };
  }

  let deletedCount = 0;
  try {
    for (const group of groups) {
      for (const dup of group.duplicates) {
        // Never delete the best document
        if (dup.uid !== group.bestDoc.uid) {
          await deleteDoc(doc(db, 'users', dup.uid));
          deletedCount++;
        }
      }
    }

    return {
      success: true,
      deletedCount,
      message: `Đã dọn dẹp thành công ${deletedCount} document trùng lặp trong Firestore.`
    };
  } catch (err: any) {
    console.error('[AnalyticsAdmin:purgeDuplicateUsers] Failed:', err);
    return {
      success: false,
      deletedCount,
      message: err?.message || 'Có lỗi khi dọn dẹp duplicate users.'
    };
  }
};
