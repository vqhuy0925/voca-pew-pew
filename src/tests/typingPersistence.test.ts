import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Polyfill localStorage for Node environment
const store: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  key: (index: number) => Object.keys(store)[index] || null,
  length: 0
};

// Polyfill window.location for resolveInitialScreen testing
(globalThis as any).window = {
  location: {
    hash: '',
    pathname: '/',
    search: ''
  },
  history: {
    replaceState: (_data: any, _unused: string, url: string) => {
      (globalThis as any).window.location.hash = url.startsWith('#') ? url : '';
    }
  }
};

import {
  resolveInitialScreen,
  getInitialUserProgress,
  saveUserProgress,
  loadUserProgress,
  recordTypingSessionResult,
  updateTypingCurrentLesson,
  updateTypingLastActiveMode,
  resetProgressForNewAccount,
  saveAccountProgressLocally,
  loadAccountProgressLocally
} from '../services/progressStorage';
import {
  registerAccount,
  loginAccount,
  logoutAccount
} from '../services/accountService';
import { buildUserSyncPayload } from '../services/firebase/cloudSyncService';
import { TYPING_LESSONS } from '../data/typing-curriculum';

describe('Typing Dojo Persistence & Session Continuity', () => {
  beforeEach(() => {
    localStorage.clear();
    (globalThis as any).window.location.hash = '';
  });

  describe('resolveInitialScreen (Reload preservation)', () => {
    it('returns LANDING if player has not seen landing', () => {
      const progress = getInitialUserProgress();
      progress.hasSeenLanding = false;
      assert.equal(resolveInitialScreen(progress), 'LANDING');
    });

    it('returns DOJO when URL hash is #dojo or #typing-dojo', () => {
      const progress = getInitialUserProgress();
      progress.hasSeenLanding = true;

      (globalThis as any).window.location.hash = '#dojo';
      assert.equal(resolveInitialScreen(progress), 'DOJO');

      (globalThis as any).window.location.hash = '#typing-dojo';
      assert.equal(resolveInitialScreen(progress), 'DOJO');
    });

    it('returns DOJO_PARAGRAPH when URL hash is #dojo-paragraph or #paragraph', () => {
      const progress = getInitialUserProgress();
      progress.hasSeenLanding = true;

      (globalThis as any).window.location.hash = '#dojo-paragraph';
      assert.equal(resolveInitialScreen(progress), 'DOJO_PARAGRAPH');

      (globalThis as any).window.location.hash = '#paragraph';
      assert.equal(resolveInitialScreen(progress), 'DOJO_PARAGRAPH');
    });

    it('returns DOJO when lastActiveMode is dojo even without URL hash', () => {
      const progress = getInitialUserProgress();
      progress.hasSeenLanding = true;
      progress.typingProgress = {
        ...progress.typingProgress!,
        lastActiveMode: 'dojo'
      };
      (globalThis as any).window.location.hash = '';

      assert.equal(resolveInitialScreen(progress), 'DOJO');
    });

    it('defaults to MAP when lastActiveMode is saga and no hash', () => {
      const progress = getInitialUserProgress();
      progress.hasSeenLanding = true;
      progress.typingProgress = {
        ...progress.typingProgress!,
        lastActiveMode: 'saga'
      };
      (globalThis as any).window.location.hash = '';

      assert.equal(resolveInitialScreen(progress), 'MAP');
    });
  });

  describe('Typing Progress Helpers', () => {
    it('updates currentLessonId via updateTypingCurrentLesson', () => {
      const initial = getInitialUserProgress();
      const updated = updateTypingCurrentLesson(initial, 'lesson-home-3');

      assert.equal(updated.typingProgress?.currentLessonId, 'lesson-home-3');
      const loaded = loadUserProgress();
      assert.equal(loaded.typingProgress?.currentLessonId, 'lesson-home-3');
    });

    it('records lesson result and updates currentLessonId automatically', () => {
      const initial = getInitialUserProgress();
      const updated = recordTypingSessionResult(initial, {
        lessonId: 'lesson-home-1',
        wpm: 28,
        accuracy: 96,
        mistakeKeys: [{ key: 'f', count: 1 }],
        minAccuracyToPass: 80
      });

      assert.equal(updated.typingProgress?.currentLessonId, 'lesson-home-1');
      assert.equal(updated.typingProgress?.lastActiveMode, 'dojo');
      assert.equal(updated.typingProgress?.lessonProgressMap['lesson-home-1']?.isCompleted, true);
      assert.equal(updated.typingProgress?.lessonProgressMap['lesson-home-1']?.bestWpm, 28);
      assert.equal(updated.typingProgress?.bestWpmOverall, 28);
    });
  });

  describe('Account Progress Persistence Across Logout & Login', () => {
    it('preserves typing lessons and currentLessonId across logout and login', async () => {
      // 1. Register Account A
      const reg = await registerAccount({
        username: 'nhim_typing_master',
        pin: '1234',
        displayName: 'Bé Nhím'
      });
      assert.equal(reg.success, true);

      // 2. Play Lesson 1 and Lesson 2
      let userProgress = loadUserProgress();
      userProgress = recordTypingSessionResult(userProgress, {
        lessonId: 'lesson-home-1',
        wpm: 25,
        accuracy: 95,
        minAccuracyToPass: 80
      });
      userProgress = recordTypingSessionResult(userProgress, {
        lessonId: 'lesson-home-2',
        wpm: 32,
        accuracy: 98,
        minAccuracyToPass: 80
      });
      // Currently on lesson 3
      userProgress = updateTypingCurrentLesson(userProgress, 'lesson-home-3');

      // 3. User logs out
      saveAccountProgressLocally(userProgress.accountUsername!, userProgress);
      logoutAccount();
      resetProgressForNewAccount();

      // 4. Verify local active state is completely cleared
      const loggedOutProgress = loadUserProgress();
      assert.equal(loggedOutProgress.accountUsername, undefined);
      assert.equal(Object.keys(loggedOutProgress.typingProgress?.lessonProgressMap || {}).length, 0);

      // 5. Register or Login Account B (starts from scratch)
      const regB = await registerAccount({
        username: 'bap_learner',
        pin: '5678',
        displayName: 'Bé Bắp'
      });
      assert.equal(regB.success, true);
      const bProgress = loadUserProgress();
      assert.equal(bProgress.accountUsername, 'bap_learner');
      assert.equal(bProgress.typingProgress?.lessonProgressMap['lesson-home-1'], undefined);

      logoutAccount();
      resetProgressForNewAccount();

      // 6. Log back in as Account A
      const loginRes = await loginAccount('nhim_typing_master', '1234');
      assert.equal(loginRes.success, true);

      const restored = loginRes.progress!;
      assert.equal(restored.accountUsername, 'nhim_typing_master');
      assert.equal(restored.typingProgress?.currentLessonId, 'lesson-home-3');
      assert.equal(restored.typingProgress?.lessonProgressMap['lesson-home-1']?.isCompleted, true);
      assert.equal(restored.typingProgress?.lessonProgressMap['lesson-home-1']?.bestWpm, 25);
      assert.equal(restored.typingProgress?.lessonProgressMap['lesson-home-2']?.isCompleted, true);
      assert.equal(restored.typingProgress?.lessonProgressMap['lesson-home-2']?.bestWpm, 32);
      assert.equal(restored.typingProgress?.bestWpmOverall, 32);
      assert.equal(restored.typingProgress?.lastActiveMode, 'dojo');
    });

    it('includes full typingProgress and levelProgressMap in Firestore sync payload', () => {
      const progress = getInitialUserProgress();
      progress.cloudUid = 'test-uid-123';
      progress.userName = 'Phi Hành Gia Nhí';
      progress.typingProgress = {
        lastActiveMode: 'dojo',
        currentLessonId: 'lesson-top-1',
        lessonProgressMap: {
          'lesson-home-1': {
            lessonId: 'lesson-home-1',
            isCompleted: true,
            bestWpm: 40,
            bestAccuracy: 99,
            attempts: 1
          }
        },
        bestWpmOverall: 40,
        bestAccuracyOverall: 99,
        wpmHistory: [{ date: '2026-10-01', wpm: 40, accuracy: 99 }],
        keyMistakeMap: { e: 2 },
        earnedTypingDiplomaRealmIds: ['realm-1'],
        vietnameseModeUnlocked: true
      };

      const payload = buildUserSyncPayload(progress, 'test-uid-123', '#PEW-9999', '2026-W40');

      assert.ok(payload.typingProgress);
      assert.equal(payload.typingProgress?.currentLessonId, 'lesson-top-1');
      assert.equal(payload.typingProgress?.lessonProgressMap['lesson-home-1']?.isCompleted, true);
      assert.equal(payload.bestWpmOverall, 40);
      assert.equal(payload.bestAccuracyOverall, 99);
      assert.ok(payload.levelProgressMap);
      assert.ok(Array.isArray(payload.unlockedLevelIds));
    });
  });
});
