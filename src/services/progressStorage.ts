import { UserProgress, LevelProgress } from '../data/progress-types';
import { ALL_LEVELS } from '../data/learning-path-data';

const STORAGE_KEY = 'vocab_pew_pew_user_progress_v2';

const getTodayDateString = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getInitialLevelProgressMap = (): Record<string, LevelProgress> => {
  const map: Record<string, LevelProgress> = {};
  ALL_LEVELS.forEach((lvl, idx) => {
    map[lvl.id] = {
      levelId: lvl.id,
      isUnlocked: idx === 0, // First level is unlocked by default
      isCompleted: false,
      stars: 0,
      highScore: 0
    };
  });
  return map;
};

export const getInitialUserProgress = (): UserProgress => {
  const today = getTodayDateString();
  return {
    userName: '',
    avatar: '🚀',
    currentLevelId: ALL_LEVELS[0].id,
    unlockedLevelIds: [ALL_LEVELS[0].id],
    levelProgressMap: getInitialLevelProgressMap(),
    hearts: 5,
    maxHearts: 5,
    gems: 60, // Starting bonus gems 💎
    totalXp: 0,
    streakDays: 1,
    lastActiveDate: today,
    totalVisits: 1,
    lastVisitTimestamp: Date.now(),
    createdAt: today,
    soundEnabled: true,
    speechEnabled: true,
    keyboardHintsEnabled: true,

    // Default Equipment
    equippedShipId: 'ship-scout',
    equippedBlasterId: 'blaster-single',
    equippedLaserId: 'laser-cyan',
    unlockedUpgradeIds: ['ship-scout', 'blaster-single', 'laser-cyan'],
    selectedDifficulty: 'NORMAL'
  };
};

export const loadUserProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialUserProgress();
      saveUserProgress(initial);
      return initial;
    }

    const parsed: UserProgress = JSON.parse(raw);
    const today = getTodayDateString();

    // Check & update Streak logic
    if (parsed.lastActiveDate) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Logged in on consecutive day!
        parsed.streakDays += 1;
        parsed.lastActiveDate = today;
      } else if (diffDays > 1) {
        // Streak broken
        parsed.streakDays = 1;
        parsed.lastActiveDate = today;
      }
    } else {
      parsed.lastActiveDate = today;
      parsed.streakDays = 1;
    }

    // Ensure profile and visit tracking fields exist & track visit
    parsed.userName = parsed.userName ?? '';
    parsed.avatar = parsed.avatar || '🚀';
    parsed.totalVisits = (parsed.totalVisits || 0) + 1;
    parsed.lastVisitTimestamp = Date.now();
    parsed.createdAt = parsed.createdAt || today;

    // Ensure equipment fields exist
    parsed.equippedShipId = parsed.equippedShipId || 'ship-scout';
    parsed.equippedBlasterId = parsed.equippedBlasterId || 'blaster-single';
    parsed.equippedLaserId = parsed.equippedLaserId || 'laser-cyan';
    parsed.unlockedUpgradeIds = Array.isArray(parsed.unlockedUpgradeIds) && parsed.unlockedUpgradeIds.length > 0
      ? parsed.unlockedUpgradeIds
      : ['ship-scout', 'blaster-single', 'laser-cyan'];
    parsed.selectedDifficulty = parsed.selectedDifficulty || 'NORMAL';

    // Ensure base items are always in unlockedUpgradeIds
    const baseItems = ['ship-scout', 'blaster-single', 'laser-cyan'];
    baseItems.forEach(id => {
      if (!parsed.unlockedUpgradeIds.includes(id)) {
        parsed.unlockedUpgradeIds.push(id);
      }
    });

    // Ensure all levels in ALL_LEVELS exist in levelProgressMap
    ALL_LEVELS.forEach((lvl, idx) => {
      if (!parsed.levelProgressMap[lvl.id]) {
        parsed.levelProgressMap[lvl.id] = {
          levelId: lvl.id,
          isUnlocked: idx === 0,
          isCompleted: false,
          stars: 0,
          highScore: 0
        };
      }
    });

    saveUserProgress(parsed);
    return parsed;
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return getInitialUserProgress();
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
};

export const completeLevelProgress = (
  prev: UserProgress,
  levelId: string,
  starsEarned: number,
  score: number,
  xpEarned: number,
  gemsEarned: number
): UserProgress => {
  const currentLvlIdx = ALL_LEVELS.findIndex(l => l.id === levelId);
  const nextLvl = currentLvlIdx >= 0 && currentLvlIdx < ALL_LEVELS.length - 1 ? ALL_LEVELS[currentLvlIdx + 1] : null;

  const currentProgress = prev.levelProgressMap[levelId] || {
    levelId,
    isUnlocked: true,
    isCompleted: false,
    stars: 0,
    highScore: 0
  };

  const updatedProgress: LevelProgress = {
    ...currentProgress,
    isCompleted: true,
    stars: Math.max(currentProgress.stars, starsEarned),
    highScore: Math.max(currentProgress.highScore, score),
    lastPlayedAt: Date.now()
  };

  const updatedMap = { ...prev.levelProgressMap, [levelId]: updatedProgress };
  const updatedUnlocked = new Set(prev.unlockedLevelIds);
  updatedUnlocked.add(levelId);

  if (nextLvl) {
    updatedUnlocked.add(nextLvl.id);
    if (updatedMap[nextLvl.id]) {
      updatedMap[nextLvl.id] = {
        ...updatedMap[nextLvl.id],
        isUnlocked: true
      };
    }
  }

  const updatedUser: UserProgress = {
    ...prev,
    levelProgressMap: updatedMap,
    unlockedLevelIds: Array.from(updatedUnlocked),
    currentLevelId: nextLvl ? nextLvl.id : levelId,
    totalXp: prev.totalXp + xpEarned,
    gems: prev.gems + gemsEarned,
    lastActiveDate: getTodayDateString()
  };

  saveUserProgress(updatedUser);
  return updatedUser;
};

export const refillHearts = (prev: UserProgress): UserProgress => {
  const updated: UserProgress = {
    ...prev,
    hearts: prev.maxHearts
  };
  saveUserProgress(updated);
  return updated;
};

export const deductHeart = (prev: UserProgress): UserProgress => {
  const updated: UserProgress = {
    ...prev,
    hearts: Math.max(0, prev.hearts - 1)
  };
  saveUserProgress(updated);
  return updated;
};

export const unlockAndEquipItem = (
  prev: UserProgress,
  itemId: string,
  itemType: 'ship' | 'blaster' | 'laser',
  priceGems: number
): UserProgress => {
  if (prev.gems < priceGems && !prev.unlockedUpgradeIds.includes(itemId)) {
    return prev; // Not enough gems
  }

  const newUnlocked = new Set(prev.unlockedUpgradeIds);
  const isNewUnlock = !newUnlocked.has(itemId);
  newUnlocked.add(itemId);

  const remainingGems = isNewUnlock ? Math.max(0, prev.gems - priceGems) : prev.gems;

  const updated: UserProgress = {
    ...prev,
    gems: remainingGems,
    unlockedUpgradeIds: Array.from(newUnlocked),
    equippedShipId: itemType === 'ship' ? itemId : prev.equippedShipId,
    equippedBlasterId: itemType === 'blaster' ? itemId : prev.equippedBlasterId,
    equippedLaserId: itemType === 'laser' ? itemId : prev.equippedLaserId
  };

  saveUserProgress(updated);
  return updated;
};

export const equipItem = (
  prev: UserProgress,
  itemId: string,
  itemType: 'ship' | 'blaster' | 'laser'
): UserProgress => {
  if (!prev.unlockedUpgradeIds.includes(itemId)) {
    return prev;
  }

  const updated: UserProgress = {
    ...prev,
    equippedShipId: itemType === 'ship' ? itemId : prev.equippedShipId,
    equippedBlasterId: itemType === 'blaster' ? itemId : prev.equippedBlasterId,
    equippedLaserId: itemType === 'laser' ? itemId : prev.equippedLaserId
  };

  saveUserProgress(updated);
  return updated;
};

