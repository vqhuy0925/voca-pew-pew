import { VocabWord } from './types';
import { DifficultyLevel } from './upgrade-types';

export type LevelType = 'STANDARD' | 'SPEED_RUSH' | 'BOSS_BATTLE' | 'CHEST_REWARD';

export interface LevelNode {
  id: string;               // e.g. 'lvl-1-1'
  unitId: string;           // e.g. 'unit-1'
  levelNumber: number;      // 1, 2, 3...
  title: string;            // e.g. 'Red & Blue'
  titleVi: string;          // e.g. 'Màu Sắc Khởi Đầu'
  type: LevelType;
  words: VocabWord[];
  icon: string;             // e.g. '🎨', '👑', '🎁'
  bgColor: string;          // Color hex
  targetScore: number;
  xpReward: number;
  gemReward: number;
  speedMultiplier: number;  // Fall speed factor for kid-friendly scaling
  spawnInterval: number;    // Spawn interval in ms
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  titleVi: string;
  description: string;
  icon: string;
  themeColor: string;
  bannerBg: string;
  levels: LevelNode[];
}

export interface LevelProgress {
  levelId: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  stars: number;            // 0 to 3 stars
  highScore: number;
  lastPlayedAt?: number;
}

export type UserGender = 'boy' | 'girl' | 'neutral';

export type ThemeStyle = 'cosmic_cyan' | 'sweet_sakura' | 'galaxy_purple' | 'aurora_emerald' | 'solar_amber' | 'galactic_starwars';

export type MascotId = 'cosmo_dog' | 'luna_cat' | 'stella_unicorn' | 'pixel_robot' | 'spark_fox';

export type DailyEnergyMode = 'relaxed' | 'balanced' | 'intense';

export interface UserProgress {
  userName: string;         // Learner's name (e.g. 'Bé Bắp', 'Minh Trí')
  avatar: string;           // Selected emoji avatar (e.g. '🚀', '🦄', '🐱')
  gender?: UserGender;      // 'boy' | 'girl' | 'neutral'
  themeStyle?: ThemeStyle;  // App color & visual theme
  mascotId?: MascotId;      // Companion mascot
  userAge?: number;         // 7 to 18
  selectedRealmId?: string; // 'realm-1' to 'realm-8'
  currentLevelId: string;
  unlockedLevelIds: string[];
  levelProgressMap: Record<string, LevelProgress>;
  hearts: number;           // Max 5 hearts
  maxHearts: number;        // 5
  gems: number;             // Gems currency 💎
  totalXp: number;          // Total XP points
  streakDays: number;       // Consecutive days 🔥
  lastActiveDate: string;   // YYYY-MM-DD
  totalVisits: number;      // Total times user opened the app
  lastVisitTimestamp: number; // Timestamp of latest visit
  createdAt: string;        // Registration date YYYY-MM-DD
  soundEnabled: boolean;
  speechEnabled: boolean;
  keyboardHintsEnabled: boolean;
  hasSeenLanding?: boolean;

  // Energy & Daily Learning Limit System ⚡
  energy: number;
  maxEnergy: number;
  lastEnergyDate: string;
  dailyEnergyMode: DailyEnergyMode;

  // Equipment & Upgrades
  equippedShipId: string;
  equippedBlasterId: string;
  equippedLaserId: string;
  unlockedUpgradeIds: string[];
  selectedDifficulty: DifficultyLevel;

  // Cloud & Identity (Phase 1) ☁️
  playerTag?: string;               // Unique friend code e.g. '#PEW-8492'
  cloudUid?: string;                // Firebase UID
  lastCloudSyncTimestamp?: number;  // Last time synced with Firestore

  // Leaderboard & Weekly Competition (Phase 2) 🏆
  weeklyXp?: number;                // XP earned in the current week
  lastWeeklyReset?: string;         // Week identifier e.g. '2026-W37'

  // Showcase & Citizen ID (Phase 3) 🎖️
  unlockedBadgeIds?: string[];      // Array of earned badge IDs
  selectedBadgeIds?: string[];      // Up to 3 featured badge IDs for Citizen ID
  activeTitle?: string;             // Active astronaut title e.g. 'Xạ Thủ Tập Sự'
}

