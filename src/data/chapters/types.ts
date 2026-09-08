import { Unit } from '../progress-types';

export interface AgeRealm {
  id: string;
  realmNumber: number;
  name: string;
  nameVi: string;
  ageRange: string;      // e.g. '7 - 8 Tuổi'
  gradeLabel: string;    // e.g. 'Lớp 2 - 3 (Pre-A1)'
  description: string;
  icon: string;
  color: string;
  badgeBg: string;
  startChapter: number;
  endChapter: number;
  wordLengthHint: string; // e.g. '3 - 5 chữ cái'
  targetWpm: string;      // e.g. '15 - 25 WPM'
  units: Unit[];
}
