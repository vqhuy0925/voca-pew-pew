import { Unit } from '../progress-types';

export interface AgeRealm {
  id: string;
  realmNumber: number;
  rankCode?: string;     // e.g. 'STAR_CADET' | 'SPACE_SCOUT'
  name: string;
  nameVi: string;
  cefrLevel?: string;    // e.g. 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'B2' | 'Tech/Work' | 'Everyday'
  recommendedAge?: string; // e.g. 'Khuyên dùng: 6 - 8 Tuổi hoặc người mới bắt đầu'
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

