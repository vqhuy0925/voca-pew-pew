import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  recordSessionMistakes,
  getActiveWeakWords,
  getMistakeStats,
  resetWordMastery,
  getInitialUserProgress
} from '../services/progressStorage';
import { SessionMistakeDelta } from '../data/mistake-types';
import { EnemySpawner } from '../game/engine/EnemySpawner';
import { LevelNode } from '../data/progress-types';
import { VocabWord } from '../data/types';

// Polyfill localStorage for Node environment if missing
if (typeof globalThis.localStorage === 'undefined') {
  const store: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    key: (index: number) => Object.keys(store)[index] || null,
    length: 0
  };
}

describe('Stage 4: Adaptive Mistake Mastery System Continuous Evals', () => {

  it('1. Should record typos and breaches accurately in mistakeMap', () => {
    let progress = getInitialUserProgress();
    assert.deepEqual(progress.mistakeMap, {});

    const delta: SessionMistakeDelta = {
      wordId: 'w-cat',
      word: 'cat',
      meaningVi: 'con mèo',
      emoji: '🐱',
      typos: 2,
      breached: false,
      cleared: false
    };

    progress = recordSessionMistakes(progress, [delta]);
    const record = progress.mistakeMap?.['cat'];

    assert.ok(record, 'Record for cat should exist');
    assert.equal(record!.typoCount, 2);
    assert.equal(record!.breachCount, 0);
    assert.equal(record!.consecutiveCleanClears, 0);
    assert.equal(record!.masteryStatus, 'learning');

    // Add a breach in subsequent session
    const breachDelta: SessionMistakeDelta = {
      wordId: 'w-cat',
      word: 'cat',
      meaningVi: 'con mèo',
      emoji: '🐱',
      typos: 1,
      breached: true,
      cleared: false
    };

    progress = recordSessionMistakes(progress, [breachDelta]);
    const updatedRecord = progress.mistakeMap?.['cat'];

    assert.equal(updatedRecord?.typoCount, 3);
    assert.equal(updatedRecord?.breachCount, 1);
    assert.equal(updatedRecord?.masteryStatus, 'learning');
  });

  it('2. Should advance mastery status from learning -> reviewing -> mastered on clean streaks', () => {
    let progress = getInitialUserProgress();

    const cleanClearDelta: SessionMistakeDelta = {
      wordId: 'w-dog',
      word: 'dog',
      meaningVi: 'con chó',
      emoji: '🐶',
      typos: 0,
      breached: false,
      cleared: true
    };

    // First clean clear
    progress = recordSessionMistakes(progress, [cleanClearDelta]);
    assert.equal(progress.mistakeMap?.['dog']?.consecutiveCleanClears, 1);
    assert.equal(progress.mistakeMap?.['dog']?.masteryStatus, 'learning');

    // Second clean clear -> reviewing
    progress = recordSessionMistakes(progress, [cleanClearDelta]);
    assert.equal(progress.mistakeMap?.['dog']?.consecutiveCleanClears, 2);
    assert.equal(progress.mistakeMap?.['dog']?.masteryStatus, 'reviewing');

    // Third clean clear -> mastered
    progress = recordSessionMistakes(progress, [cleanClearDelta]);
    assert.equal(progress.mistakeMap?.['dog']?.consecutiveCleanClears, 3);
    assert.equal(progress.mistakeMap?.['dog']?.masteryStatus, 'mastered');
  });

  it('3. Should reset streak and demote from mastered to learning when a new typo occurs', () => {
    let progress = getInitialUserProgress();

    // Set dog to mastered
    const cleanClear: SessionMistakeDelta = {
      wordId: 'w-dog',
      word: 'dog',
      meaningVi: 'con chó',
      emoji: '🐶',
      typos: 0,
      breached: false,
      cleared: true
    };
    progress = recordSessionMistakes(progress, [cleanClear]);
    progress = recordSessionMistakes(progress, [cleanClear]);
    progress = recordSessionMistakes(progress, [cleanClear]);
    assert.equal(progress.mistakeMap?.['dog']?.masteryStatus, 'mastered');

    // Now user makes a typo on dog
    const typoDelta: SessionMistakeDelta = {
      wordId: 'w-dog',
      word: 'dog',
      meaningVi: 'con chó',
      emoji: '🐶',
      typos: 1,
      breached: false,
      cleared: true
    };
    progress = recordSessionMistakes(progress, [typoDelta]);

    const updated = progress.mistakeMap?.['dog'];
    assert.equal(updated?.consecutiveCleanClears, 0, 'Clean streak should reset to 0');
    assert.equal(updated?.masteryStatus, 'learning', 'Status should drop back to learning');
  });

  it('4. Should prioritize active weak words by learning status and mistake frequency', () => {
    let progress = getInitialUserProgress();

    // Record word A with 1 typo
    progress = recordSessionMistakes(progress, [{
      wordId: 'w-apple',
      word: 'apple',
      meaningVi: 'quả táo',
      emoji: '🍎',
      typos: 1,
      breached: false,
      cleared: false
    }]);

    // Record word B with 5 typos + 2 breaches
    progress = recordSessionMistakes(progress, [{
      wordId: 'w-banana',
      word: 'banana',
      meaningVi: 'quả chuối',
      emoji: '🍌',
      typos: 5,
      breached: true,
      cleared: false
    }]);

    // Record word C as mastered
    for (let i = 0; i < 3; i++) {
      progress = recordSessionMistakes(progress, [{
        wordId: 'w-cherry',
        word: 'cherry',
        meaningVi: 'quả anh đào',
        emoji: '🍒',
        typos: 0,
        breached: false,
        cleared: true
      }]);
    }

    const weakWords = getActiveWeakWords(progress, 5);

    // banana should be first because of highest mistake score
    assert.equal(weakWords.length, 2, 'Mastered cherry should be excluded');
    assert.equal(weakWords[0].word, 'banana');
    assert.equal(weakWords[1].word, 'apple');
  });

  it('5. Should aggregate mistake statistics correctly', () => {
    let progress = getInitialUserProgress();

    progress = recordSessionMistakes(progress, [
      { wordId: 'w-1', word: 'red', meaningVi: 'đỏ', emoji: '🔴', typos: 2, breached: false, cleared: false },
      { wordId: 'w-2', word: 'blue', meaningVi: 'xanh', emoji: '🔵', typos: 0, breached: false, cleared: true }
    ]);
    progress = recordSessionMistakes(progress, [
      { wordId: 'w-2', word: 'blue', meaningVi: 'xanh', emoji: '🔵', typos: 0, breached: false, cleared: true }
    ]);

    const stats = getMistakeStats(progress);
    assert.equal(stats.learning, 1);
    assert.equal(stats.reviewing, 1);
    assert.equal(stats.mastered, 0);
    assert.equal(stats.total, 2);
  });

  it('6. Should inject weak words into EnemySpawner as revenge targets in standard levels', () => {
    const spawner = new EnemySpawner(800, 600);

    const level: LevelNode = {
      id: 'lvl-1-1',
      unitId: 'unit-1',
      levelNumber: 1,
      title: 'Colors',
      titleVi: 'Màu Sắc',
      type: 'STANDARD',
      words: [
        { id: 'w-red', word: 'red', meaningVi: 'màu đỏ', emoji: '🔴', category: 'Colors' },
        { id: 'w-blue', word: 'blue', meaningVi: 'màu xanh', emoji: '🔵', category: 'Colors' }
      ],
      icon: '🎨',
      bgColor: '#38bdf8',
      targetScore: 200,
      xpReward: 50,
      gemReward: 2,
      speedMultiplier: 0.6,
      spawnInterval: 2000
    };

    const weakWords: VocabWord[] = [
      { id: 'w-banana', word: 'banana', meaningVi: 'quả chuối', emoji: '🍌', category: 'Fruits' },
      { id: 'w-apple', word: 'apple', meaningVi: 'quả táo', emoji: '🍎', category: 'Fruits' }
    ];

    spawner.loadLevel(level, 1.0, weakWords);

    assert.ok(spawner.getTotalWordsCount() >= 4, 'Should include level words + injected weak words');
  });

  it('7. Should NOT inject weak words in BOSS_BATTLE levels', () => {
    const spawner = new EnemySpawner(800, 600);

    const bossLevel: LevelNode = {
      id: 'lvl-boss-1',
      unitId: 'unit-1',
      levelNumber: 10,
      title: 'Boss Battle',
      titleVi: 'Trùm Cuối',
      type: 'BOSS_BATTLE',
      words: [
        { id: 'w-dragon', word: 'dragon', meaningVi: 'rồng lửa', emoji: '🐉', category: 'Boss' }
      ],
      icon: '👑',
      bgColor: '#dc2626',
      targetScore: 500,
      xpReward: 150,
      gemReward: 5,
      speedMultiplier: 0.8,
      spawnInterval: 1500
    };

    const weakWords: VocabWord[] = [
      { id: 'w-banana', word: 'banana', meaningVi: 'quả chuối', emoji: '🍌', category: 'Fruits' }
    ];

    spawner.loadLevel(bossLevel, 1.0, weakWords);

    assert.equal(spawner.getEnemies().length, 0);
  });
});
