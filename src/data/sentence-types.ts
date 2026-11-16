export type SentenceMode = 'SCRAMBLE' | 'GAP_FILL' | 'LISTEN_REPEAT';

export interface SentenceItem {
  id: string;
  sentence: string;       // Full English sentence e.g. "The ball is under the chair."
  meaningVi: string;      // Vietnamese meaning e.g. "Quả bóng ở dưới cái ghế."
  emoji: string;          // Visual cue e.g. "⚽🪑"
  gapWord: string;        // Target missing word for GAP_FILL e.g. "under"
  distractors: string[];  // Wrong options for GAP_FILL choice mode e.g. ["in", "on", "next to"]
  tokens?: string[];      // Optional custom tokens; if omitted, auto-split from sentence
}

export interface SentenceTopic {
  id: string;
  unitNumber: number;
  title: string;
  titleVi: string;
  patternFormula: string; // e.g. "The [vật] is in/on/under the [vật]."
  description: string;
  icon: string;
  accentColor: string;
  items: SentenceItem[];
}

export interface SentenceTopicProgress {
  topicId: string;
  completedModes: SentenceMode[];
  bestAccuracy: number;
  stars: number; // 0 to 3
  lastPlayedAt: number;
}
