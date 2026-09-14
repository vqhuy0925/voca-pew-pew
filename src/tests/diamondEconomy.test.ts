import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

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

import {
  calculateLevelClearRewards,
  getInitialUserProgress,
  completeLevelProgress
} from '../services/progressStorage';
import { LevelNode } from '../data/progress-types';

describe('Diamond Economy & Anti-Inflation System', () => {
  const sampleStandardLevel: LevelNode = {
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

  const sampleBossLevel: LevelNode = {
    id: 'lvl-1-10',
    unitId: 'unit-1',
    levelNumber: 10,
    title: 'Colors Boss',
    titleVi: 'Trùm Màu Sắc',
    type: 'BOSS_BATTLE',
    words: [
      { id: 'w-rainbow', word: 'rainbow', meaningVi: 'cầu vồng', emoji: '🌈', category: 'Boss' }
    ],
    icon: '👑',
    bgColor: '#dc2626',
    targetScore: 500,
    xpReward: 150,
    gemReward: 8,
    speedMultiplier: 0.8,
    spawnInterval: 1500
  };

  const sampleBlitzLevel: LevelNode = {
    id: 'lvl-mistake-blitz',
    unitId: 'unit-blitz',
    levelNumber: 99,
    title: 'Revenge Blitz',
    titleVi: 'Lò Rèn Phục Thù',
    type: 'SPEED_RUSH',
    words: [
      { id: 'w-red', word: 'red', meaningVi: 'màu đỏ', emoji: '🔴', category: 'Colors' }
    ],
    icon: '🔥',
    bgColor: '#ea580c',
    targetScore: 120,
    xpReward: 25,
    gemReward: 1,
    speedMultiplier: 0.75,
    spawnInterval: 1900
  };

  it('1. First clear of standard level with 3 stars & 95% accuracy awards proper first-clear reward (6 gems)', () => {
    const progress = getInitialUserProgress();
    const reward = calculateLevelClearRewards(
      progress,
      sampleStandardLevel,
      5, // 5/5 hearts remaining
      95, // 95% accuracy
      'NORMAL',
      5
    );

    assert.equal(reward.isFirstClear, true);
    assert.equal(reward.starsEarned, 3);
    assert.equal(reward.firstClearBonusGems, 2);
    assert.equal(reward.starBonusGems, 3); // 3 new stars
    assert.equal(reward.accuracyBonusGems, 1);
    assert.equal(reward.heroicBonusGems, 0);
    assert.equal(reward.totalGemsEarned, 6);
  });

  it('2. First clear of boss level awards big boss reward (12 gems)', () => {
    const progress = getInitialUserProgress();
    const reward = calculateLevelClearRewards(
      progress,
      sampleBossLevel,
      5,
      95,
      'NORMAL',
      5
    );

    assert.equal(reward.isFirstClear, true);
    assert.equal(reward.starsEarned, 3);
    assert.equal(reward.firstClearBonusGems, 8);
    assert.equal(reward.starBonusGems, 3);
    assert.equal(reward.accuracyBonusGems, 1);
    assert.equal(reward.totalGemsEarned, 12);
  });

  it('3. Replaying an already 3-starred level on NORMAL does NOT award infinite farmed gems', () => {
    let progress = getInitialUserProgress();
    // Complete level first time
    progress = completeLevelProgress(
      progress,
      sampleStandardLevel.id,
      3,
      300,
      50,
      6
    );

    const replayReward = calculateLevelClearRewards(
      progress,
      sampleStandardLevel,
      5,
      95,
      'NORMAL',
      5
    );

    assert.equal(replayReward.isFirstClear, false);
    assert.equal(replayReward.newStarsEarned, 0);
    assert.equal(replayReward.starBonusGems, 0);
    assert.equal(replayReward.firstClearBonusGems, 0);
    assert.equal(replayReward.totalGemsEarned, 0, 'Replaying completed level should not award farmed gems');
  });

  it('4. Replaying a level previously 1 star to 3 stars awards gems only for newly gained stars (+2 gems)', () => {
    let progress = getInitialUserProgress();
    // Complete with 1 star initially
    progress = completeLevelProgress(
      progress,
      sampleStandardLevel.id,
      1,
      100,
      50,
      3
    );

    // Replay with 3 stars
    const replayReward = calculateLevelClearRewards(
      progress,
      sampleStandardLevel,
      5,
      85,
      'NORMAL',
      5
    );

    assert.equal(replayReward.isFirstClear, false);
    assert.equal(replayReward.starsEarned, 3);
    assert.equal(replayReward.newStarsEarned, 2);
    assert.equal(replayReward.starBonusGems, 2);
    assert.equal(replayReward.totalGemsEarned, 2);
  });

  it('5. Replaying on HEROIC with 100% accuracy awards +1 mastery gem', () => {
    let progress = getInitialUserProgress();
    progress = completeLevelProgress(
      progress,
      sampleStandardLevel.id,
      3,
      300,
      50,
      6
    );

    const replayReward = calculateLevelClearRewards(
      progress,
      sampleStandardLevel,
      5,
      100,
      'HEROIC',
      5
    );

    assert.equal(replayReward.isFirstClear, false);
    assert.equal(replayReward.heroicBonusGems, 1);
    assert.equal(replayReward.totalGemsEarned, 1);
  });

  it('6. Revenge Blitz practice mode awards at most +1 token gem on 3-star clean clear and does NOT trigger firstClearBonusGems', () => {
    const progress = getInitialUserProgress();
    const blitzReward = calculateLevelClearRewards(
      progress,
      sampleBlitzLevel,
      5,
      95,
      'NORMAL',
      5
    );

    assert.equal(blitzReward.isFirstClear, false, 'Blitz must not count as first clear');
    assert.equal(blitzReward.firstClearBonusGems, 0, 'Blitz must have 0 first clear bonus gems');
    assert.equal(blitzReward.starBonusGems, 1, 'Blitz awards +1 token gem for clean 3-star practice');
    assert.equal(blitzReward.totalGemsEarned, 1);
  });
});
