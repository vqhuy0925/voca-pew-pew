import { UserProgress } from './progress-types';
import { AGE_REALMS } from './learning-path-data';
import { TYPING_LESSONS } from './typing-curriculum';

export type CourseId = 'course_english' | 'course_typing' | 'course_math' | 'course_chess';

export interface CourseSummary {
  id: CourseId;
  titleVi: string;
  tagline: string;
  icon: string;
  status: 'active' | 'coming_soon';
  badgeLabel?: string;
  accentColor: string;
  bgGradient: string;
}

export const ALL_COURSES: CourseSummary[] = [
  {
    id: 'course_english',
    titleVi: 'Tiếng Anh Vũ Trụ',
    tagline: 'Chinh phục 4 cõi thiên hà từ vựng, ngữ pháp & phát âm',
    icon: '🚀',
    status: 'active',
    badgeLabel: 'Môn Chính',
    accentColor: '#00f0ff',
    bgGradient: 'from-cyan-500/20 via-blue-600/15 to-indigo-900/30'
  },
  {
    id: 'course_typing',
    titleVi: 'Võ Đường Typing',
    tagline: 'Luyện gõ 10 ngón chuẩn phản xạ, tốc độ WPM & phím tiếng Việt',
    icon: '⌨️',
    status: 'active',
    badgeLabel: 'Tốc Độ',
    accentColor: '#a855f7',
    bgGradient: 'from-purple-500/20 via-violet-600/15 to-indigo-950/30'
  },
  {
    id: 'course_math',
    titleVi: 'Toán Học Không Gian',
    tagline: 'Phép tính nhanh cộng trừ nhân chia bắn phá thiên thạch',
    icon: '🔢',
    status: 'coming_soon',
    badgeLabel: 'Sắp Ra Mắt',
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-500/15 via-orange-600/10 to-slate-900/30'
  },
  {
    id: 'course_chess',
    titleVi: 'Chiến Thuật Cờ Vua',
    tagline: 'Giải câu đố thế cờ chiếu tướng & tư duy chiến lược',
    icon: '♟️',
    status: 'coming_soon',
    badgeLabel: 'Sắp Ra Mắt',
    accentColor: '#ec4899',
    bgGradient: 'from-pink-500/15 via-rose-600/10 to-slate-900/30'
  }
];

/**
 * Tính toán tiến độ của Tiếng Anh Vũ Trụ theo từng Cõi
 */
export const getRealmProgressStats = (realmId: string, progress: UserProgress) => {
  const realm = AGE_REALMS.find(r => r.id === realmId) || AGE_REALMS[0];
  const allLevels = realm.units.flatMap(u => u.levels);
  const totalLevels = allLevels.length;
  const completedCount = allLevels.filter(l => progress.levelProgressMap?.[l.id]?.isCompleted).length;
  const totalStars = allLevels.reduce((sum, l) => sum + (progress.levelProgressMap?.[l.id]?.stars || 0), 0);
  const percent = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;

  return {
    realm,
    totalLevels,
    completedCount,
    totalStars,
    percent
  };
};

/**
 * Tính toán tổng tiến độ của Typing Dojo
 */
export const getTypingDojoProgressStats = (progress: UserProgress) => {
  const lessonProgressMap = progress.typingProgress?.lessonProgressMap || {};
  const totalLessons = TYPING_LESSONS.length;
  const completedCount = TYPING_LESSONS.filter(l => lessonProgressMap[l.id]?.isCompleted).length;
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const bestWpm = progress.typingProgress?.bestWpmOverall || 0;
  const bestAccuracy = progress.typingProgress?.bestAccuracyOverall || 0;

  return {
    totalLessons,
    completedCount,
    percent,
    bestWpm,
    bestAccuracy
  };
};
