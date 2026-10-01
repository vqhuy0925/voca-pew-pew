import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Polyfill localStorage for Node test runner
const store: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  key: (index: number) => Object.keys(store)[index] || null,
  length: 0
};

import { ALL_COURSES, getRealmProgressStats, getTypingDojoProgressStats } from '../data/courses-config';
import { getInitialUserProgress } from '../services/progressStorage';

describe('Duolingo-Style Multi-Course System Configuration', () => {
  it('defines the 4 core courses: English, Typing, Math, and Chess', () => {
    assert.equal(ALL_COURSES.length, 4);

    const english = ALL_COURSES.find(c => c.id === 'course_english');
    assert.ok(english);
    assert.equal(english?.status, 'active');
    assert.equal(english?.icon, '🚀');

    const typing = ALL_COURSES.find(c => c.id === 'course_typing');
    assert.ok(typing);
    assert.equal(typing?.status, 'active');
    assert.equal(typing?.icon, '⌨️');

    const math = ALL_COURSES.find(c => c.id === 'course_math');
    assert.ok(math);
    assert.equal(math?.status, 'coming_soon');
    assert.equal(math?.icon, '🔢');

    const chess = ALL_COURSES.find(c => c.id === 'course_chess');
    assert.ok(chess);
    assert.equal(chess?.status, 'coming_soon');
    assert.equal(chess?.icon, '♟️');
  });

  describe('getRealmProgressStats', () => {
    it('calculates completion and stars accurately for an English realm', () => {
      const progress = getInitialUserProgress();
      progress.levelProgressMap = {
        'lvl-1-1': { levelId: 'lvl-1-1', isCompleted: true, stars: 3, highScore: 500, isUnlocked: true },
        'lvl-1-2': { levelId: 'lvl-1-2', isCompleted: true, stars: 2, highScore: 400, isUnlocked: true }
      };

      const stats = getRealmProgressStats('realm-1', progress);
      assert.equal(stats.completedCount, 2);
      assert.equal(stats.totalStars, 5);
      assert.ok(stats.totalLevels > 0);
      assert.ok(stats.percent >= 0 && stats.percent <= 100);
      assert.equal(stats.realm.id, 'realm-1');
    });
  });

  describe('getTypingDojoProgressStats', () => {
    it('calculates completion and typing metrics for Typing Dojo', () => {
      const progress = getInitialUserProgress();
      progress.typingProgress = {
        ...progress.typingProgress!,
        bestWpmOverall: 45,
        bestAccuracyOverall: 98,
        lessonProgressMap: {
          'typing-lesson-1': { lessonId: 'typing-lesson-1', isCompleted: true, bestWpm: 40, bestAccuracy: 95, attempts: 2 },
          'typing-lesson-2': { lessonId: 'typing-lesson-2', isCompleted: true, bestWpm: 45, bestAccuracy: 98, attempts: 1 }
        }
      };

      const stats = getTypingDojoProgressStats(progress);
      assert.equal(stats.completedCount, 2);
      assert.equal(stats.bestWpm, 45);
      assert.equal(stats.bestAccuracy, 98);
      assert.ok(stats.totalLessons >= 30);
      assert.ok(stats.percent > 0);
    });
  });
});
