export type GameState = 'MENU' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'GAME_OVER';

export interface VocabWord {
  id: string;
  word: string;        // e.g. "cat"
  meaningVi: string;   // e.g. "con mèo"
  category: string;    // e.g. "Animals"
  emoji: string;       // e.g. "🐱"
  pronunciation?: string; // phonetic hint e.g. "/kæt/"
}

export interface VocabTheme {
  id: string;
  title: string;
  titleVi: string;
  icon: string;
  color: string;       // Hex or Tailwind color class
  words: VocabWord[];
}

export interface EnemyItem {
  id: string;
  word: string;
  meaningVi: string;
  emoji: string;
  typedIndex: number;  // How many characters have been typed correctly
  x: number;           // Canvas X
  y: number;           // Canvas Y
  speed: number;       // Fall speed
  width: number;
  height: number;
  color: string;
  isTargeted: boolean; // Currently active locked-on target
  shakeTime: number;   // Visual feedback when hit or wrong key
}

export interface LaserBolt {
  id: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  progress: number;    // 0 to 1
  color: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export interface GameStats {
  score: number;
  wordsDefeated: number;
  combo: number;
  maxCombo: number;
  accuracy: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  stationHealth: number; // 0 - 100
  maxHealth: number;
  starsEarned: number;   // 1 to 3
  clearedWordsList: VocabWord[];
}
