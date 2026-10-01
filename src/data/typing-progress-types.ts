export interface TypingLessonProgress {
  lessonId: string;
  isCompleted: boolean;
  bestWpm: number;
  bestAccuracy: number;
  attempts: number;
  lastPlayedAt?: number;
}

export interface TypingWpmHistoryEntry {
  date: string;   // YYYY-MM-DD
  wpm: number;
  accuracy: number;
}

export const TYPING_WPM_HISTORY_CAP = 30;

export interface TypingProgress {
  lastActiveMode?: 'saga' | 'dojo';
  currentLessonId?: string;                   // ID bài học hiện đang chọn/luyện tập dở
  lessonProgressMap: Record<string, TypingLessonProgress>;
  bestWpmOverall: number;
  bestAccuracyOverall: number;
  wpmHistory: TypingWpmHistoryEntry[];        // cap TYPING_WPM_HISTORY_CAP entries gần nhất
  keyMistakeMap: Record<string, number>;      // key -> số lần gõ sai
  earnedTypingDiplomaRealmIds: string[];      // Realm đã đạt diploma gõ phím
  vietnameseModeUnlocked: boolean;            // mặc định true, để mở khả năng khoá sau này
}

export const DEFAULT_TYPING_PROGRESS: TypingProgress = {
  lastActiveMode: 'saga',
  currentLessonId: undefined,
  lessonProgressMap: {},
  bestWpmOverall: 0,
  bestAccuracyOverall: 0,
  wpmHistory: [],
  keyMistakeMap: {},
  earnedTypingDiplomaRealmIds: [],
  vietnameseModeUnlocked: true
};
