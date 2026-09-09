import { UserProgress } from './progress-types';
import { ALL_LEVELS, AGE_REALMS } from './learning-path-data';

export type BadgeCategory = 'COMBAT' | 'LEARNING' | 'DEDICATION' | 'COLLECTION' | 'MASTERY';

export interface BadgeItem {
  id: string;
  name: string;
  nameVi: string;
  descriptionVi: string;
  category: BadgeCategory;
  icon: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC';
  color: string;
  borderColor: string;
  glowColor: string;
  unlockedTitle: string;
  checkUnlocked: (progress: UserProgress) => boolean;
}

/**
 * Calculate total unique English words mastered across completed levels
 */
export const calculateWordsMastered = (progress: UserProgress): number => {
  if (!progress.levelProgressMap) return 0;
  const wordsSet = new Set<string>();
  ALL_LEVELS.forEach(lvl => {
    if (progress.levelProgressMap[lvl.id]?.isCompleted) {
      lvl.words.forEach(w => wordsSet.add(w.word.toLowerCase()));
    }
  });
  return wordsSet.size;
};

/**
 * Count total 3-star level clears
 */
export const calculateThreeStarCount = (progress: UserProgress): number => {
  if (!progress.levelProgressMap) return 0;
  return Object.values(progress.levelProgressMap).filter(p => (p.stars || 0) >= 3).length;
};

/**
 * Count defeated boss levels
 */
export const calculateBossDefeatedCount = (progress: UserProgress): number => {
  if (!progress.levelProgressMap) return 0;
  return ALL_LEVELS.filter(
    lvl => lvl.type === 'BOSS_BATTLE' && progress.levelProgressMap[lvl.id]?.isCompleted
  ).length;
};

/**
 * Count fully cleared realms (all levels in realm have at least 1 star or completed)
 */
export const calculateCompletedRealmsCount = (progress: UserProgress): number => {
  if (!progress.levelProgressMap) return 0;
  return AGE_REALMS.filter(realm => {
    const realmLevels = ALL_LEVELS.filter(lvl => {
      const match = lvl.id.match(/^lvl-(\d+)-/);
      if (!match) return false;
      const ch = parseInt(match[1], 10);
      return ch >= realm.startChapter && ch <= realm.endChapter;
    });
    if (realmLevels.length === 0) return false;
    return realmLevels.every(lvl => progress.levelProgressMap[lvl.id]?.isCompleted);
  }).length;
};

/**
 * Count unlocked spaceships
 */
export const calculateUnlockedShipsCount = (progress: UserProgress): number => {
  if (!progress.unlockedUpgradeIds) return 1;
  return progress.unlockedUpgradeIds.filter(id => id.startsWith('ship-')).length;
};

/**
 * Registry of all achievable badges in Vocab Pew Pew
 */
export const BADGES: BadgeItem[] = [
  {
    id: 'badge-first-step',
    name: 'First Flight',
    nameVi: 'Bước Chân Đầu Tiên',
    descriptionVi: 'Hoàn thành bài học từ vựng đầu tiên trong vũ trụ.',
    category: 'LEARNING',
    icon: '🚀',
    rarity: 'COMMON',
    color: '#4ade80',
    borderColor: 'border-emerald-500/70',
    glowColor: 'rgba(74, 222, 128, 0.4)',
    unlockedTitle: 'Tân Binh Không Gian',
    checkUnlocked: (p) => {
      return Object.values(p.levelProgressMap || {}).some(lvl => lvl.isCompleted);
    }
  },
  {
    id: 'badge-streak-3',
    name: 'First Spark',
    nameVi: 'Tia Lửa Khởi Đầu',
    descriptionVi: 'Học tập chăm chỉ liên tục trong 3 ngày.',
    category: 'DEDICATION',
    icon: '⚡',
    rarity: 'COMMON',
    color: '#38bdf8',
    borderColor: 'border-sky-500/70',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    unlockedTitle: 'Ngọn Lửa Khởi Động',
    checkUnlocked: (p) => (p.streakDays || 0) >= 3
  },
  {
    id: 'badge-streak-7',
    name: 'Unstoppable Flame',
    nameVi: 'Chiến Binh Bất Diệt',
    descriptionVi: 'Duy trì chuỗi học tập bùng nổ trong 7 ngày liên tiếp.',
    category: 'DEDICATION',
    icon: '🔥',
    rarity: 'EPIC',
    color: '#c084fc',
    borderColor: 'border-purple-500/70',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    unlockedTitle: 'Chiến Thần Chăm Chỉ',
    checkUnlocked: (p) => (p.streakDays || 0) >= 7
  },
  {
    id: 'badge-streak-14',
    name: 'Cosmic Discipline',
    nameVi: 'Kỷ Luật Thiên Hà',
    descriptionVi: 'Học liên tục 14 ngày không ngơi nghỉ, vượt mọi giới hạn.',
    category: 'DEDICATION',
    icon: '✨',
    rarity: 'LEGENDARY',
    color: '#fbbf24',
    borderColor: 'border-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    unlockedTitle: 'Ngọn Lửa Vĩnh Cửu',
    checkUnlocked: (p) => (p.streakDays || 0) >= 14
  },
  {
    id: 'badge-star-15',
    name: 'Star Collector',
    nameVi: 'Người Săn Sao',
    descriptionVi: 'Thu thập đạt mốc 15 ngôi sao danh giá.',
    category: 'MASTERY',
    icon: '⭐',
    rarity: 'COMMON',
    color: '#facc15',
    borderColor: 'border-yellow-500/70',
    glowColor: 'rgba(250, 204, 21, 0.4)',
    unlockedTitle: 'Nhà Sưu Tầm Sao',
    checkUnlocked: (p) => {
      const stars = Object.values(p.levelProgressMap || {}).reduce((s, l) => s + (l.stars || 0), 0);
      return stars >= 15;
    }
  },
  {
    id: 'badge-star-45',
    name: 'Starlight Legend',
    nameVi: 'Tinh Tú Rực Rỡ',
    descriptionVi: 'Thu thập được 45 ngôi sao trên bầu trời tri thức.',
    category: 'MASTERY',
    icon: '🌟',
    rarity: 'RARE',
    color: '#38bdf8',
    borderColor: 'border-sky-400',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    unlockedTitle: 'Tinh Tú Rực Rỡ',
    checkUnlocked: (p) => {
      const stars = Object.values(p.levelProgressMap || {}).reduce((s, l) => s + (l.stars || 0), 0);
      return stars >= 45;
    }
  },
  {
    id: 'badge-star-80',
    name: 'Supernova',
    nameVi: 'Siêu Tân Tinh',
    descriptionVi: 'Chạm mốc 80 ngôi sao rực sáng muôn nơi.',
    category: 'MASTERY',
    icon: '💫',
    rarity: 'LEGENDARY',
    color: '#fbbf24',
    borderColor: 'border-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    unlockedTitle: 'Siêu Tân Tinh',
    checkUnlocked: (p) => {
      const stars = Object.values(p.levelProgressMap || {}).reduce((s, l) => s + (l.stars || 0), 0);
      return stars >= 80;
    }
  },
  {
    id: 'badge-words-25',
    name: 'Word Explorer',
    nameVi: 'Nhà Thám Hiểm Từ Vựng',
    descriptionVi: 'Nắm vững và vượt qua ít nhất 25 từ vựng tiếng Anh.',
    category: 'LEARNING',
    icon: '📚',
    rarity: 'COMMON',
    color: '#4ade80',
    borderColor: 'border-emerald-500/70',
    glowColor: 'rgba(74, 222, 128, 0.4)',
    unlockedTitle: 'Học Giả Tí Hon',
    checkUnlocked: (p) => calculateWordsMastered(p) >= 25
  },
  {
    id: 'badge-words-60',
    name: 'Lexicon Scholar',
    nameVi: 'Kho Tàng Tri Thức',
    descriptionVi: 'Chinh phục 60 từ vựng phong phú.',
    category: 'LEARNING',
    icon: '📖',
    rarity: 'RARE',
    color: '#38bdf8',
    borderColor: 'border-sky-500/70',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    unlockedTitle: 'Đại Sứ Ngôn Ngữ',
    checkUnlocked: (p) => calculateWordsMastered(p) >= 60
  },
  {
    id: 'badge-words-120',
    name: 'Galactic Encyclopedia',
    nameVi: 'Bách Khoa Vũ Trụ',
    descriptionVi: 'Thành thạo hơn 120 từ vựng các chủ đề.',
    category: 'LEARNING',
    icon: '🎓',
    rarity: 'EPIC',
    color: '#c084fc',
    borderColor: 'border-purple-500/70',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    unlockedTitle: 'Bách Khoa Vũ Trụ',
    checkUnlocked: (p) => calculateWordsMastered(p) >= 120
  },
  {
    id: 'badge-boss-hunter',
    name: 'Boss Hunter',
    nameVi: 'Thợ Săn Trùm',
    descriptionVi: 'Bắn hạ và chiến thắng trận đấu Boss đầu tiên.',
    category: 'COMBAT',
    icon: '👑',
    rarity: 'RARE',
    color: '#f97316',
    borderColor: 'border-orange-500/70',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    unlockedTitle: 'Thợ Săn Quái Thú',
    checkUnlocked: (p) => calculateBossDefeatedCount(p) >= 1
  },
  {
    id: 'badge-boss-slayer',
    name: 'Cosmic Nemesis',
    nameVi: 'Kẻ Huỷ Diệt Boss',
    descriptionVi: 'Bắn hạ ít nhất 3 Trùm Vũ Trụ khổng lồ.',
    category: 'COMBAT',
    icon: '👾',
    rarity: 'EPIC',
    color: '#f43f5e',
    borderColor: 'border-rose-500/70',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    unlockedTitle: 'Kẻ Huỷ Diệt Boss',
    checkUnlocked: (p) => calculateBossDefeatedCount(p) >= 3
  },
  {
    id: 'badge-fleet-admiral',
    name: 'Fleet Commander',
    nameVi: 'Chỉ Huy Hạm Đội',
    descriptionVi: 'Mở khóa sở hữu ít nhất 3 chiến cơ vũ trụ tại Xưởng Tàu.',
    category: 'COLLECTION',
    icon: '🛸',
    rarity: 'EPIC',
    color: '#06b6d4',
    borderColor: 'border-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    unlockedTitle: 'Chỉ Huy Hạm Đội',
    checkUnlocked: (p) => calculateUnlockedShipsCount(p) >= 3
  },
  {
    id: 'badge-galaxy-master',
    name: 'Galaxy Sovereign',
    nameVi: 'Bậc Thầy Thiên Hà',
    descriptionVi: 'Chinh phục toàn bộ các màn chơi trong ít nhất 1 Cõi Thiên Hà.',
    category: 'MASTERY',
    icon: '🌌',
    rarity: 'LEGENDARY',
    color: '#ec4899',
    borderColor: 'border-pink-500',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    unlockedTitle: 'Bậc Thầy Thiên Hà',
    checkUnlocked: (p) => calculateCompletedRealmsCount(p) >= 1
  },
  {
    id: 'badge-sharpshooter',
    name: 'Sharpshooter Ace',
    nameVi: 'Xạ Thủ Thần Sầu',
    descriptionVi: 'Đạt ít nhất 8 màn chơi đạt mức 3 sao hoàn hảo.',
    category: 'COMBAT',
    icon: '🎯',
    rarity: 'LEGENDARY',
    color: '#fbbf24',
    borderColor: 'border-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    unlockedTitle: 'Xạ Thủ Bách Phát',
    checkUnlocked: (p) => calculateThreeStarCount(p) >= 8
  },
  {
    id: 'badge-mythic-pilot',
    name: 'Intergalactic Legend',
    nameVi: 'Huyền Thoại Không Gian',
    descriptionVi: 'Đạt trên 1.000 điểm kinh nghiệm XP vũ trụ.',
    category: 'MASTERY',
    icon: '🪐',
    rarity: 'MYTHIC',
    color: '#f43f5e',
    borderColor: 'border-rose-400',
    glowColor: 'rgba(244, 63, 94, 0.7)',
    unlockedTitle: 'Huyền Thoại Không Gian',
    checkUnlocked: (p) => (p.totalXp || 0) >= 1000
  }
];

export const DEFAULT_TITLE = 'Phi Hành Gia Tập Sự';

/**
 * List of default and unlocked titles that can be used
 */
export const BASE_TITLES = [
  'Phi Hành Gia Tập Sự',
  'Nhà Thám Hiểm Không Gian',
  'Vệ Binh Tinh Tú'
];

/**
 * Retrieve badge item by id
 */
export const getBadgeById = (id: string): BadgeItem | undefined => {
  return BADGES.find(b => b.id === id);
};

/**
 * Get all unlocked titles available to player
 */
export const getAvailableTitlesForPlayer = (progress: UserProgress): string[] => {
  const titles = new Set<string>(BASE_TITLES);
  const unlockedBadges = progress.unlockedBadgeIds || [];
  unlockedBadges.forEach(id => {
    const b = getBadgeById(id);
    if (b?.unlockedTitle) {
      titles.add(b.unlockedTitle);
    }
  });
  return Array.from(titles);
};

/**
 * Check player's progress and return updated progress with newly unlocked badges
 */
export const checkAndUnlockBadges = (
  progress: UserProgress
): { newlyUnlocked: BadgeItem[]; updatedProgress: UserProgress } => {
  const currentUnlocked = new Set(progress.unlockedBadgeIds || []);
  const newlyUnlocked: BadgeItem[] = [];

  BADGES.forEach(badge => {
    if (!currentUnlocked.has(badge.id)) {
      if (badge.checkUnlocked(progress)) {
        currentUnlocked.add(badge.id);
        newlyUnlocked.push(badge);
      }
    }
  });

  const updatedUnlockedIds = Array.from(currentUnlocked);
  
  // Ensure default selected badges if empty
  let selected = progress.selectedBadgeIds || [];
  if (selected.length === 0 && updatedUnlockedIds.length > 0) {
    selected = updatedUnlockedIds.slice(0, 3);
  }

  // Ensure default active title if missing
  const title = progress.activeTitle || DEFAULT_TITLE;

  const updatedProgress: UserProgress = {
    ...progress,
    unlockedBadgeIds: updatedUnlockedIds,
    selectedBadgeIds: selected,
    activeTitle: title
  };

  return { newlyUnlocked, updatedProgress };
};
