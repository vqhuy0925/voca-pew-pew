import { AgeRealm } from './chapters/types';
import { TypingProgress } from './typing-progress-types';
import { parseTargetWpmFloor } from '../game/engine/TypingMetrics';

export type TypingRowType = 'home' | 'top' | 'bottom' | 'numbers' | 'short_words' | 'paragraph';

export interface TypingLesson {
  id: string;             // 'typing-lesson-1'
  order: number;
  rowType: TypingRowType;
  title: string;
  titleVi: string;
  keys: string[];         // các phím trọng tâm của bài
  practiceText: string;   // chuỗi luyện gõ tạo sẵn
  minAccuracyToPass: number; // mặc định 80
}

export const TYPING_LESSONS: TypingLesson[] = [
  {
    id: 'typing-lesson-1',
    order: 1,
    rowType: 'home',
    title: 'Home Row',
    titleVi: 'Hàng Phím Tổ Ấm',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    practiceText: 'asdf jkl; fdsa ;lkj asdf ghjk lkjh gfds ;lkj sadf ghjkl asdf jkl;',
    minAccuracyToPass: 80
  },
  {
    id: 'typing-lesson-2',
    order: 2,
    rowType: 'top',
    title: 'Top Row',
    titleVi: 'Hàng Phím Trên',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    practiceText: 'qwer tyui op qwer top tyui erty uiop wert yuio pqwe rtyu iop',
    minAccuracyToPass: 80
  },
  {
    id: 'typing-lesson-3',
    order: 3,
    rowType: 'bottom',
    title: 'Bottom Row',
    titleVi: 'Hàng Phím Dưới',
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    practiceText: 'zxcv bnm, zxcv bnm. vbnm zxcv xcvb n,m. zxc vbn m,./ zxcv bnm,.',
    minAccuracyToPass: 80
  },
  {
    id: 'typing-lesson-4',
    order: 4,
    rowType: 'numbers',
    title: 'Numbers & Symbols',
    titleVi: 'Số & Ký Tự Đặc Biệt',
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '?'],
    practiceText: '123 456 789 0 12! 34? 56 78 90 123 456 789 0! 10 20 30?',
    minAccuracyToPass: 80
  },
  {
    id: 'typing-lesson-5',
    order: 5,
    rowType: 'short_words',
    title: 'Short Words',
    titleVi: 'Cụm Từ Ngắn',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    practiceText: 'sad lag hall fall salad flash glass hard silk dark jolly quiet',
    minAccuracyToPass: 80
  },
  {
    id: 'typing-lesson-6',
    order: 6,
    rowType: 'paragraph',
    title: 'Paragraph',
    titleVi: 'Đoạn Văn',
    keys: [],
    practiceText: 'Great job! Now let\'s type a full paragraph to put everything together.',
    minAccuracyToPass: 80
  }
];

/**
 * Ngưỡng Accuracy tối thiểu cho "Chứng Chỉ Gõ 10 Ngón" theo Realm (xem `intent.md` mục 6).
 * Ngưỡng WPM đọc trực tiếp từ `AgeRealm.targetWpm` qua `parseTargetWpmFloor()` — một nguồn dữ liệu duy nhất.
 */
export const TYPING_DIPLOMA_ACCURACY_THRESHOLDS: Record<string, number> = {
  'realm-1': 85,
  'realm-2': 88,
  'realm-3': 90,
  'realm-4': 90,
  'realm-5': 92,
  'realm-6': 93,
  'realm-7': 95,
  'realm-8': 95
};

export const getTypingDiplomaAccuracyThreshold = (realmId: string): number =>
  TYPING_DIPLOMA_ACCURACY_THRESHOLDS[realmId] ?? 90;

/**
 * Kiểm tra điều kiện đạt "Chứng Chỉ Gõ 10 Ngón" của 1 Realm: bestWpmOverall >= cận dưới targetWpm
 * và bestAccuracyOverall >= ngưỡng accuracy tương ứng.
 */
export const isTypingDiplomaEligible = (realm: AgeRealm, typingProgress?: TypingProgress): boolean => {
  if (!typingProgress) return false;
  const wpmFloor = parseTargetWpmFloor(realm.targetWpm);
  const accuracyThreshold = getTypingDiplomaAccuracyThreshold(realm.id);
  return typingProgress.bestWpmOverall >= wpmFloor && typingProgress.bestAccuracyOverall >= accuracyThreshold;
};
