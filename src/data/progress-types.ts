import { VocabWord } from './types';

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

export interface UserProgress {
  userName: string;         // Child's name (e.g. 'Bé Bắp', 'Minh Trí')
  avatar: string;           // Selected emoji avatar (e.g. '🚀', '🐱')
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
}
