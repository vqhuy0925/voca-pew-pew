import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Polyfill localStorage & window for Node environment
const store: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  key: (index: number) => Object.keys(store)[index] || null,
  length: 0
};
(globalThis as any).window = { location: { hash: '' } };

import { CustomTopic, customWordToVocabWord } from '../data/custom-topic-types';
import { parseRawVocabInput, lookupWordInfo } from '../services/customVocabHelper';
import {
  getInitialUserProgress,
  saveCustomTopicProgress,
  deleteCustomTopicProgress,
  updateCustomWordMasteryProgress
} from '../services/progressStorage';

describe('Custom Topics & Natural Spelling Lab System', () => {
  it('1. lookupWordInfo correctly suggests emoji and Vietnamese meaning for common kid words', () => {
    const pencilInfo = lookupWordInfo('pencil');
    assert.equal(pencilInfo.emoji, '✏️');
    assert.ok(pencilInfo.meaningVi.toLowerCase().includes('bút chì'));

    const catInfo = lookupWordInfo('cat');
    assert.equal(catInfo.emoji, '🐱');
    assert.ok(catInfo.meaningVi.toLowerCase().includes('mèo'));
  });

  it('2. parseRawVocabInput correctly parses comma-separated lists and colon-separated lists', () => {
    const commaList = 'cat, dog, elephant';
    const parsedComma = parseRawVocabInput(commaList);
    assert.equal(parsedComma.length, 3);
    assert.equal(parsedComma[0].word, 'cat');
    assert.equal(parsedComma[1].word, 'dog');
    assert.equal(parsedComma[2].word, 'elephant');

    const detailedList = `
      1. apple: quả táo
      2. banana: quả chuối
      3. water - nước lọc
    `;
    const parsedDetailed = parseRawVocabInput(detailedList);
    assert.equal(parsedDetailed.length, 3);
    assert.equal(parsedDetailed[0].word, 'apple');
    assert.equal(parsedDetailed[0].meaningVi, 'quả táo');
    assert.equal(parsedDetailed[1].word, 'banana');
    assert.equal(parsedDetailed[1].meaningVi, 'quả chuối');
    assert.equal(parsedDetailed[2].word, 'water');
    assert.equal(parsedDetailed[2].meaningVi, 'nước lọc');
  });

  it('3. customWordToVocabWord converts a custom word into a playable VocabWord for Arcade Battle', () => {
    const customWord = {
      id: 'cw-1',
      word: 'Tiger',
      meaningVi: 'Con hổ',
      emoji: '🐯',
      pronunciation: '/ˈtaɪ.ɡər/'
    };
    const vocabWord = customWordToVocabWord(customWord);
    assert.equal(vocabWord.id, 'cw-1');
    assert.equal(vocabWord.word, 'tiger'); // normalized lowercase
    assert.equal(vocabWord.meaningVi, 'Con hổ');
    assert.equal(vocabWord.emoji, '🐯');
  });

  it('4. saveCustomTopicProgress, deleteCustomTopicProgress and updateCustomWordMasteryProgress persist state correctly', () => {
    const initial = getInitialUserProgress();
    assert.ok(Array.isArray(initial.customTopics));
    assert.equal(initial.customTopics.length, 0);

    const topic1: CustomTopic = {
      id: 'topic-1',
      title: 'Unit 3: Pets',
      icon: '🐶',
      createdAt: 1000,
      updatedAt: 1000,
      words: [
        { id: 'w1', word: 'cat', meaningVi: 'Con mèo', emoji: '🐱', masteryLevel: 0 },
        { id: 'w2', word: 'dog', meaningVi: 'Con chó', emoji: '🐶', masteryLevel: 0 }
      ]
    };

    // Save topic
    const withTopic = saveCustomTopicProgress(initial, topic1);
    assert.equal(withTopic.customTopics?.length, 1);
    assert.equal(withTopic.customTopics?.[0].title, 'Unit 3: Pets');

    // Update word mastery (e.g. from 0 to 2)
    const withMastery = updateCustomWordMasteryProgress(withTopic, 'topic-1', 'w1', 2);
    const updatedWord = withMastery.customTopics?.[0].words.find(w => w.id === 'w1');
    assert.equal(updatedWord?.masteryLevel, 2);
    assert.equal(updatedWord?.correctAttempts, 1);

    // Delete topic
    const afterDelete = deleteCustomTopicProgress(withMastery, 'topic-1');
    assert.equal(afterDelete.customTopics?.length, 0);
  });
});
