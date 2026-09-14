import { VocabWord } from './types';

export type MasteryStatus = 'learning' | 'reviewing' | 'mastered';

export interface WordMistakeRecord {
  wordId: string;
  word: string;
  meaningVi: string;
  emoji: string;
  category?: string;
  pronunciation?: string;
  
  // Real-time & cumulative metrics
  typoCount: number;          // Total wrong keystrokes while this word was targeted
  breachCount: number;        // Number of times this word fell to bottom and damaged station
  successCount: number;       // Number of times cleared
  consecutiveCleanClears: number; // Consecutive times cleared with 0 typos
  masteryStatus: MasteryStatus;
  
  lastMistakeTimestamp: number;
  lastAttemptTimestamp: number;
}

export type MistakeProgressMap = Record<string, WordMistakeRecord>;

export interface SessionMistakeDelta {
  wordId: string;
  word: string;
  meaningVi: string;
  emoji: string;
  category?: string;
  pronunciation?: string;
  typos: number;
  breached: boolean;
  cleared: boolean;
  isRevengeTarget?: boolean;
}
