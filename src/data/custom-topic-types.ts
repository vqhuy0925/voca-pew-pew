import { VocabWord } from './types';

export type SpellingStage = 'TRACE' | 'PHONICS_GAP' | 'BLIND_RECALL';

export interface CustomWord {
  id: string;
  word: string;
  meaningVi: string;
  emoji: string;
  pronunciation?: string;
  category?: string;
  masteryLevel?: number; // 0 = New, 1 = Trace clear, 2 = Phonics gap clear, 3 = Mastered
  correctAttempts?: number;
  incorrectAttempts?: number;
}

export interface CustomTopic {
  id: string;
  title: string;
  description?: string;
  icon: string;
  words: CustomWord[];
  createdAt: number;
  updatedAt: number;
  totalPracticed?: number;
}

/**
 * Helper to convert CustomWord to standard VocabWord for Arcade battle gameplay
 */
export function customWordToVocabWord(word: CustomWord): VocabWord {
  return {
    id: word.id,
    word: word.word.trim().toLowerCase(),
    meaningVi: word.meaningVi,
    emoji: word.emoji || '⭐',
    category: word.category || 'Từ Trung Tâm',
    pronunciation: word.pronunciation
  };
}
