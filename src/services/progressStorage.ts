import { UserProgress, LevelProgress, DailyEnergyMode } from '../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../data/upgrade-types';
import { ALL_LEVELS, AGE_REALMS, getRealmByAge, getRealmByLevelId } from '../data/learning-path-data';
import { queueCloudSync, getWeekIdentifier } from './firebase/cloudSyncService';
import { getOrInitPlayerTag, getCurrentUid } from './firebase/authService';
import { checkAndUnlockBadges, DEFAULT_TITLE } from '../data/badge-data';
import { WordMistakeRecord, MistakeProgressMap, SessionMistakeDelta, MasteryStatus } from '../data/mistake-types';

const STORAGE_KEY = 'vocab_pew_pew_user_progress_v2';

export const DAILY_ENERGY_CAPS: Record<DailyEnergyMode, { maxEnergy: number; label: string; subLabel: string; icon: string }> = {
  relaxed: { maxEnergy: 60, label: 'Nhẹ Nhàng', subLabel: '15-20 phút • ~6 màn/ngày', icon: '🌿' },
  balanced: { maxEnergy: 100, label: 'Tiêu Chuẩn', subLabel: '25-30 phút • ~10 màn/ngày (Khuyên Dùng)', icon: '🚀' },
  intense: { maxEnergy: 150, label: 'Siêu Năng', subLabel: '40-50 phút • ~15 màn/ngày', icon: '🏆' }
};

export const getEnergyCostForLevel = (levelType?: string): number => {
  if (levelType === 'BOSS_BATTLE') return 15;
  if (levelType === 'CHEST_REWARD') return 0;
  return 10;
};

const getTodayDateString = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// First levels of each realm are unlocked by default so students of different ages can start at their appropriate grade
const REALM_ENTRY_LEVEL_IDS = new Set(
  AGE_REALMS.map(r => `lvl-${r.startChapter}-1`)
);

const getInitialLevelProgressMap = (): Record<string, LevelProgress> => {
  const map: Record<string, LevelProgress> = {};
  ALL_LEVELS.forEach((lvl, idx) => {
    const isUnlocked = idx === 0 || REALM_ENTRY_LEVEL_IDS.has(lvl.id);
    map[lvl.id] = {
      levelId: lvl.id,
      isUnlocked,
      isCompleted: false,
      stars: 0,
      highScore: 0
    };
  });
  return map;
};

export const getInitialUserProgress = (): UserProgress => {
  const today = getTodayDateString();
  const initialMap = getInitialLevelProgressMap();
  const unlockedIds = Object.keys(initialMap).filter(id => initialMap[id].isUnlocked);

  return {
    userName: '',
    avatar: '🚀',
    gender: 'neutral',
    themeStyle: 'galactic_starwars',
    mascotId: 'cosmo_dog',
    userAge: 8,
    selectedRealmId: 'realm-1',
    currentLevelId: ALL_LEVELS[0].id,
    unlockedLevelIds: unlockedIds,
    levelProgressMap: initialMap,
    hearts: 5,
    maxHearts: 5,
    gems: 15, // Starting bonus starter gems 💎
    totalXp: 0,
    streakDays: 1,
    lastActiveDate: today,
    totalVisits: 1,
    lastVisitTimestamp: Date.now(),
    createdAt: today,
    soundEnabled: true,
    speechEnabled: true,
    keyboardHintsEnabled: true,
    hasSeenLanding: false,

    // Energy & Daily Limit System ⚡
    energy: 100,
    maxEnergy: 100,
    lastEnergyDate: today,
    dailyEnergyMode: 'balanced',

    // Default Equipment
    equippedShipId: 'ship-scout',
    equippedBlasterId: 'blaster-single',
    equippedLaserId: 'laser-cyan',
    unlockedUpgradeIds: ['ship-scout', 'blaster-single', 'laser-cyan'],
    selectedDifficulty: 'NORMAL',

    // Cloud Identity
    playerTag: getOrInitPlayerTag(),
    cloudUid: getCurrentUid(),

    // Leaderboard
    weeklyXp: 0,
    lastWeeklyReset: getWeekIdentifier(),

    // Showcase & Citizen ID
    unlockedBadgeIds: [],
    selectedBadgeIds: [],
    activeTitle: DEFAULT_TITLE,

    // Adaptive Learning Mistake Engine
    mistakeMap: {}
  };
};

export const getStreakBonusGems = (streakDays: number): number => {
  if (streakDays === 3) return 5;
  if (streakDays === 7) return 12;
  if (streakDays === 14) return 25;
  if (streakDays === 30) return 50;
  return 0;
};

export interface ClearRewardBreakdown {
  isFirstClear: boolean;
  baseGems: number;
  firstClearBonusGems: number;
  starBonusGems: number;
  accuracyBonusGems: number;
  heroicBonusGems: number;
  totalGemsEarned: number;
  totalXpEarned: number;
  starsEarned: number;
  newStarsEarned: number;
}

export const calculateLevelClearRewards = (
  prev: UserProgress,
  level: { id: string; unitId?: string; type?: string; xpReward: number; gemReward: number },
  heartsRemaining: number,
  accuracy: number,
  difficulty: DifficultyLevel = 'NORMAL',
  maxHearts: number = 5
): ClearRewardBreakdown => {
  let starsEarned = 1;
  const heartRatio = maxHearts > 0 ? heartsRemaining / maxHearts : 1;
  if (heartRatio >= 0.8 && accuracy >= 80) {
    starsEarned = 3;
  } else if (heartRatio >= 0.4) {
    starsEarned = 2;
  }

  const isBlitzPractice = level.id.startsWith('blitz-') || level.id === 'lvl-mistake-blitz' || level.unitId === 'unit-blitz';

  const currentProgress = prev.levelProgressMap[level.id] || {
    levelId: level.id,
    isUnlocked: true,
    isCompleted: false,
    stars: 0,
    highScore: 0
  };

  const isFirstClear = !currentProgress.isCompleted && !isBlitzPractice;
  const previousStars = currentProgress.stars || 0;
  const newStarsEarned = isBlitzPractice ? 0 : Math.max(0, starsEarned - previousStars);

  const diffMultiplier = DIFFICULTY_CONFIGS[difficulty]?.xpMultiplier ?? 1.25;
  const totalXpEarned = Math.round(level.xpReward * diffMultiplier);

  let firstClearBonusGems = 0;
  let starBonusGems = 0;
  let accuracyBonusGems = 0;
  let heroicBonusGems = 0;

  if (isBlitzPractice) {
    // 1. Revenge Blitz mode: Focuses on quick mistake drills & XP
    // Awards +1 token gem only when achieving 3 stars with high accuracy (>= 90%)
    if (starsEarned === 3 && accuracy >= 90) {
      starBonusGems = 1;
    }
  } else if (isFirstClear) {
    // 2. First Clear Bonus: Big exploration rewards for discovering new territory
    if (level.type === 'CHEST_REWARD') {
      firstClearBonusGems = 15;
    } else if (level.type === 'BOSS_BATTLE') {
      firstClearBonusGems = 8;
    } else if (level.type === 'SPEED_RUSH') {
      firstClearBonusGems = 4;
    } else {
      firstClearBonusGems = 2;
    }

    // 1 gem per newly unlocked star
    starBonusGems = newStarsEarned;

    // Accuracy Bonus: +1 gem for sniper-like precision (>= 90%)
    if (accuracy >= 90) {
      accuracyBonusGems = 1;
    }

    // Heroic Bonus: +1 gem for tackling hard mode
    if (difficulty === 'HEROIC') {
      heroicBonusGems = 1;
    }
  } else {
    // 3. Replay Mode: Reward gems only for newly attained stars (e.g. going from 1⭐ to 3⭐)
    if (newStarsEarned > 0) {
      starBonusGems = newStarsEarned;
    }

    // Mastery Bonus: +1 token gem for flawless 100% accuracy on Heroic replay
    if (difficulty === 'HEROIC' && accuracy >= 100) {
      heroicBonusGems = 1;
    }
  }

  const totalGemsEarned = firstClearBonusGems + starBonusGems + accuracyBonusGems + heroicBonusGems;

  return {
    isFirstClear,
    baseGems: firstClearBonusGems,
    firstClearBonusGems,
    starBonusGems,
    accuracyBonusGems,
    heroicBonusGems,
    totalGemsEarned,
    totalXpEarned,
    starsEarned,
    newStarsEarned
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
        parsed.streakDays += 1;
        parsed.lastActiveDate = today;
        const streakBonus = getStreakBonusGems(parsed.streakDays);
        if (streakBonus > 0) {
          parsed.gems = (parsed.gems || 0) + streakBonus;
        }
      } else if (diffDays > 1) {
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
    parsed.gender = parsed.gender || 'neutral';
    parsed.themeStyle = parsed.themeStyle || 'galactic_starwars';
    parsed.mascotId = parsed.mascotId || 'cosmo_dog';
    parsed.userAge = parsed.userAge || 8;
    parsed.selectedRealmId = parsed.selectedRealmId || 'realm-1';
    parsed.totalVisits = (parsed.totalVisits || 0) + 1;
    parsed.lastVisitTimestamp = Date.now();
    parsed.createdAt = parsed.createdAt || today;
    parsed.hasSeenLanding = parsed.hasSeenLanding ?? Boolean(parsed.userName);

    // Ensure Energy & Daily Limits
    const validModes: DailyEnergyMode[] = ['relaxed', 'balanced', 'intense'];
    parsed.dailyEnergyMode = validModes.includes(parsed.dailyEnergyMode) ? parsed.dailyEnergyMode : 'balanced';
    const targetMaxEnergy = DAILY_ENERGY_CAPS[parsed.dailyEnergyMode]?.maxEnergy || 100;
    parsed.maxEnergy = targetMaxEnergy;

    if (!parsed.lastEnergyDate || parsed.lastEnergyDate !== today) {
      // New day: Full energy recharge! ⚡🔋
      parsed.energy = targetMaxEnergy;
      parsed.lastEnergyDate = today;
    } else {
      parsed.energy = typeof parsed.energy === 'number' ? Math.min(parsed.energy, targetMaxEnergy) : targetMaxEnergy;
    }

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

    // Ensure all levels in ALL_LEVELS exist in levelProgressMap and realm entry levels are unlocked
    if (!parsed.levelProgressMap) {
      parsed.levelProgressMap = {};
    }
    ALL_LEVELS.forEach((lvl, idx) => {
      const isDefaultEntry = idx === 0 || REALM_ENTRY_LEVEL_IDS.has(lvl.id);
      if (!parsed.levelProgressMap[lvl.id]) {
        parsed.levelProgressMap[lvl.id] = {
          levelId: lvl.id,
          isUnlocked: isDefaultEntry,
          isCompleted: false,
          stars: 0,
          highScore: 0
        };
      } else if (isDefaultEntry && !parsed.levelProgressMap[lvl.id].isUnlocked) {
        parsed.levelProgressMap[lvl.id].isUnlocked = true;
      }
    });

    const unlockedSet = new Set(parsed.unlockedLevelIds || []);
    REALM_ENTRY_LEVEL_IDS.forEach(id => unlockedSet.add(id));
    parsed.unlockedLevelIds = Array.from(unlockedSet);

    // Ensure Cloud Identity
    parsed.playerTag = parsed.playerTag || getOrInitPlayerTag();
    parsed.cloudUid = parsed.cloudUid || getCurrentUid();

    // Ensure Weekly XP reset
    const currentWeek = getWeekIdentifier();
    if (!parsed.lastWeeklyReset || parsed.lastWeeklyReset !== currentWeek) {
      parsed.weeklyXp = 0;
      parsed.lastWeeklyReset = currentWeek;
    } else {
      parsed.weeklyXp = typeof parsed.weeklyXp === 'number' ? parsed.weeklyXp : 0;
    }

    // Ensure Showcase & Citizen ID (Phase 3)
    parsed.unlockedBadgeIds = Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : [];
    parsed.selectedBadgeIds = Array.isArray(parsed.selectedBadgeIds) ? parsed.selectedBadgeIds : [];
    // Ensure Mistake Map (Adaptive Learning Engine)
    parsed.mistakeMap = parsed.mistakeMap && typeof parsed.mistakeMap === 'object' ? parsed.mistakeMap : {};

    // Evaluate badges for past achievements
    const { updatedProgress } = checkAndUnlockBadges(parsed);
    parsed.unlockedBadgeIds = updatedProgress.unlockedBadgeIds;
    parsed.selectedBadgeIds = updatedProgress.selectedBadgeIds;
    parsed.activeTitle = updatedProgress.activeTitle;

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
    queueCloudSync(progress);
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

  const nextTargetId = nextLvl ? nextLvl.id : levelId;
  const targetRealm = getRealmByLevelId(nextTargetId);

  const currentWeek = getWeekIdentifier();
  const isSameWeek = prev.lastWeeklyReset === currentWeek;
  const updatedWeeklyXp = (isSameWeek ? (prev.weeklyXp || 0) : 0) + xpEarned;

  const updatedUser: UserProgress = {
    ...prev,
    levelProgressMap: updatedMap,
    unlockedLevelIds: Array.from(updatedUnlocked),
    currentLevelId: nextTargetId,
    selectedRealmId: targetRealm ? targetRealm.id : prev.selectedRealmId,
    totalXp: prev.totalXp + xpEarned,
    weeklyXp: updatedWeeklyXp,
    lastWeeklyReset: currentWeek,
    gems: prev.gems + gemsEarned,
    lastActiveDate: getTodayDateString()
  };

  const { updatedProgress: userWithBadges } = checkAndUnlockBadges(updatedUser);
  saveUserProgress(userWithBadges);
  return userWithBadges;
};

/**
 * Update astronaut's featured badges and active title
 */
export const updateAstronautShowcase = (
  activeTitle: string,
  selectedBadgeIds: string[]
): UserProgress => {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    activeTitle,
    selectedBadgeIds: selectedBadgeIds.slice(0, 3)
  };
  saveUserProgress(updated);
  return updated;
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
    return prev;
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

export const deductEnergy = (prev: UserProgress, amount: number): UserProgress => {
  const updated: UserProgress = {
    ...prev,
    energy: Math.max(0, prev.energy - amount)
  };
  saveUserProgress(updated);
  return updated;
};

export const refillEnergyWithGems = (
  prev: UserProgress,
  gemCost: number,
  energyAmount: number
): UserProgress => {
  if (prev.gems < gemCost) return prev;
  const updated: UserProgress = {
    ...prev,
    gems: Math.max(0, prev.gems - gemCost),
    energy: Math.min(prev.maxEnergy, prev.energy + energyAmount)
  };
  saveUserProgress(updated);
  return updated;
};

export const refillEnergyFromReview = (
  prev: UserProgress,
  energyGain: number
): UserProgress => {
  const updated: UserProgress = {
    ...prev,
    energy: Math.min(prev.maxEnergy, prev.energy + energyGain)
  };
  saveUserProgress(updated);
  return updated;
};

export const updateDailyEnergyMode = (
  prev: UserProgress,
  mode: DailyEnergyMode
): UserProgress => {
  const newMax = DAILY_ENERGY_CAPS[mode]?.maxEnergy || 100;
  const updated: UserProgress = {
    ...prev,
    dailyEnergyMode: mode,
    maxEnergy: newMax,
    energy: Math.min(prev.energy, newMax)
  };
  saveUserProgress(updated);
  return updated;
};

export const markLandingSeen = (prev: UserProgress): UserProgress => {
  const updated: UserProgress = {
    ...prev,
    hasSeenLanding: true
  };
  saveUserProgress(updated);
  return updated;
};

// ==========================================
// ADAPTIVE LEARNING & MISTAKE MASTERY SYSTEM
// ==========================================

export const recordSessionMistakes = (
  prev: UserProgress,
  deltas: SessionMistakeDelta[]
): UserProgress => {
  if (!deltas || deltas.length === 0) return prev;

  const mistakeMap: MistakeProgressMap = { ...(prev.mistakeMap || {}) };
  const now = Date.now();

  for (const delta of deltas) {
    if (!delta.word) continue;
    const key = delta.word.toLowerCase().trim();
    const existing = mistakeMap[key] || {
      wordId: delta.wordId || key,
      word: delta.word,
      meaningVi: delta.meaningVi || '',
      emoji: delta.emoji || '📝',
      category: delta.category || '',
      pronunciation: delta.pronunciation || '',
      typoCount: 0,
      breachCount: 0,
      successCount: 0,
      consecutiveCleanClears: 0,
      masteryStatus: 'learning' as MasteryStatus,
      lastMistakeTimestamp: now,
      lastAttemptTimestamp: now
    };

    const hasNewMistake = delta.typos > 0 || delta.breached;
    const isCleanClear = delta.cleared && delta.typos === 0 && !delta.breached;

    const typoCount = existing.typoCount + delta.typos;
    const breachCount = existing.breachCount + (delta.breached ? 1 : 0);
    const successCount = existing.successCount + (delta.cleared ? 1 : 0);
    
    let consecutiveCleanClears = existing.consecutiveCleanClears;
    if (isCleanClear) {
      consecutiveCleanClears += 1;
    } else if (hasNewMistake) {
      consecutiveCleanClears = 0;
    }

    // Determine mastery status
    let masteryStatus: MasteryStatus = 'learning';
    if (consecutiveCleanClears >= 3) {
      masteryStatus = 'mastered';
    } else if (consecutiveCleanClears === 2) {
      masteryStatus = 'reviewing';
    } else {
      masteryStatus = 'learning';
    }

    mistakeMap[key] = {
      ...existing,
      meaningVi: delta.meaningVi || existing.meaningVi,
      emoji: delta.emoji || existing.emoji,
      category: delta.category || existing.category,
      pronunciation: delta.pronunciation || existing.pronunciation,
      typoCount,
      breachCount,
      successCount,
      consecutiveCleanClears,
      masteryStatus,
      lastMistakeTimestamp: hasNewMistake ? now : existing.lastMistakeTimestamp,
      lastAttemptTimestamp: now
    };
  }

  const updated: UserProgress = {
    ...prev,
    mistakeMap
  };

  saveUserProgress(updated);
  return updated;
};

export const getActiveWeakWords = (
  progress: UserProgress,
  limit: number = 6
): WordMistakeRecord[] => {
  const map = progress.mistakeMap || {};
  const records = Object.values(map);

  // Filter words that are learning or reviewing (prioritizing learning, then typo/breach count)
  const weakWords = records
    .filter(r => r.masteryStatus !== 'mastered' || (r.typoCount + r.breachCount > 0 && r.consecutiveCleanClears < 3))
    .sort((a, b) => {
      // Prioritize learning over reviewing
      if (a.masteryStatus === 'learning' && b.masteryStatus !== 'learning') return -1;
      if (b.masteryStatus === 'learning' && a.masteryStatus !== 'learning') return 1;

      // Then by total mistakes (typos + breaches)
      const aMistakes = a.typoCount + a.breachCount * 2;
      const bMistakes = b.typoCount + b.breachCount * 2;
      if (bMistakes !== aMistakes) return bMistakes - aMistakes;

      // Then by recency
      return b.lastMistakeTimestamp - a.lastMistakeTimestamp;
    });

  return weakWords.slice(0, limit);
};

export const getMistakeStats = (progress: UserProgress) => {
  const map = progress.mistakeMap || {};
  const records = Object.values(map);

  let learning = 0;
  let reviewing = 0;
  let mastered = 0;

  for (const r of records) {
    if (r.masteryStatus === 'mastered') {
      mastered++;
    } else if (r.masteryStatus === 'reviewing') {
      reviewing++;
    } else {
      learning++;
    }
  }

  return {
    learning,
    reviewing,
    mastered,
    total: records.length
  };
};

export const resetWordMastery = (
  prev: UserProgress,
  wordKey: string
): UserProgress => {
  const mistakeMap = { ...(prev.mistakeMap || {}) };
  const key = wordKey.toLowerCase().trim();
  if (mistakeMap[key]) {
    delete mistakeMap[key];
  }
  const updated = {
    ...prev,
    mistakeMap
  };
  saveUserProgress(updated);
  return updated;
};


