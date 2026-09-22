import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase/firebaseConfig';
import { AgeRealm } from '../data/chapters/types';
import { VocabWord } from '../data/types';
import { AGE_REALMS } from '../data/learning-path-data';
import { TypingParagraph, TypingParagraphSnapshotDoc } from '../data/typing-paragraph-types';

const SNAPSHOT_KEY_VERSION = 'typing_pew_pew_snapshot_version';
const SNAPSHOT_KEY_PARAGRAPHS = 'typing_pew_pew_snapshot_paragraphs';

let cachedParagraphsByRealm: Record<string, TypingParagraph[]> | null = null;
let currentSnapshotVersion: string | null = null;

/**
 * Initialize cached paragraph snapshot from LocalStorage (mirrors vocabLoader.ts pattern)
 */
const loadInitialSnapshotCache = (): void => {
  if (cachedParagraphsByRealm) return;

  try {
    const savedVersion = localStorage.getItem(SNAPSHOT_KEY_VERSION);
    const savedData = localStorage.getItem(SNAPSHOT_KEY_PARAGRAPHS);
    if (savedVersion && savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed && typeof parsed === 'object') {
        cachedParagraphsByRealm = parsed;
        currentSnapshotVersion = savedVersion;
        console.log(`[TypingParagraphLoader] Loaded cached snapshot ${savedVersion} 🚀`);
      }
    }
  } catch (e) {
    console.warn('[TypingParagraphLoader] Failed to read local snapshot cache, using auto-generated paragraphs:', e);
  }
};

loadInitialSnapshotCache();

/**
 * Check if a newer typing paragraph snapshot is available on Firestore and update cache.
 * Reads exactly 1 document (`typing_paragraph_snapshots/latest`) per call — Quota Budgeting.
 */
export const initTypingParagraphs = async (): Promise<boolean> => {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const snapshotDocRef = doc(db, 'typing_paragraph_snapshots', 'latest');
    const snap = await getDoc(snapshotDocRef);

    if (snap.exists()) {
      const data = snap.data() as TypingParagraphSnapshotDoc;
      const cloudVersion = data.versionId;
      const localVersion = localStorage.getItem(SNAPSHOT_KEY_VERSION);

      if (cloudVersion && cloudVersion !== localVersion && data.paragraphsByRealm) {
        console.log(`[TypingParagraphLoader] Found new snapshot ${cloudVersion} (was ${localVersion}). Updating... 🔄`);
        cachedParagraphsByRealm = data.paragraphsByRealm;
        currentSnapshotVersion = cloudVersion;

        localStorage.setItem(SNAPSHOT_KEY_VERSION, cloudVersion);
        localStorage.setItem(SNAPSHOT_KEY_PARAGRAPHS, JSON.stringify(data.paragraphsByRealm));
        return true;
      }
    }
  } catch (error) {
    console.warn('[TypingParagraphLoader] Snapshot check failed, using cached/auto-generated paragraphs:', error);
  }

  return false;
};

const collectRealmWords = (realm: AgeRealm): VocabWord[] => {
  const words: VocabWord[] = [];
  (realm.units || []).forEach(unit => {
    (unit.levels || []).forEach(level => {
      (level.words || []).forEach(w => words.push(w));
    });
  });
  return words;
};

const capitalizeSentence = (text: string): string => {
  const trimmed = text.trim();
  if (trimmed.length === 0) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

// Realm 1-6: từ vựng là từ đơn -> ghép vào câu đơn giản tăng dần độ dài
const ENGLISH_VOCAB_TEMPLATES: Array<(word: string, emoji: string) => string> = [
  (word, emoji) => `I can see a ${word}. It is ${emoji}.`,
  (word, emoji) => `Look at the ${word} ${emoji}! I like it.`,
  (word, emoji) => `This is my ${word}. I love my ${word} ${emoji}.`,
  (word, emoji) => `Do you have a ${word}? I have a ${word} ${emoji}.`
];

/**
 * Tự sinh đoạn văn luyện gõ client-side từ từ vựng đã học trong Realm (fallback offline
 * và dữ liệu khởi tạo cho Admin chỉnh sửa) — theo spec.md mục 2.7.
 *
 * Realm 1-6: ghép 4-6 từ đã học theo template câu đơn giản.
 * Realm 7-8: "word" đã là câu giao tiếp dài sẵn -> nối trực tiếp 2-3 câu thành đoạn hội thoại.
 */
export const generateParagraphsFromRealm = (realm: AgeRealm): TypingParagraph[] => {
  const words = collectRealmWords(realm);
  if (words.length === 0) return [];

  const now = Date.now();
  const isSentenceRealm = realm.realmNumber >= 7;
  const paragraphs: TypingParagraph[] = [];
  const maxParagraphs = 3;

  if (isSentenceRealm) {
    const chunkSize = 2;
    for (let i = 0; i + 1 < words.length && paragraphs.length < maxParagraphs; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize);
      const text = chunk.map(w => `${capitalizeSentence(w.word)}.`).join(' ');
      paragraphs.push({
        id: `typing-paragraph-${realm.id}-auto-${paragraphs.length + 1}`,
        realmId: realm.id,
        text,
        isVietnamese: false,
        sourceWordIds: chunk.map(w => w.id),
        createdBy: 'auto',
        updatedAt: now
      });
    }
    return paragraphs;
  }

  const wordsPerParagraph = 5;
  for (let i = 0; i + wordsPerParagraph <= words.length && paragraphs.length < maxParagraphs; i += wordsPerParagraph) {
    const chunk = words.slice(i, i + wordsPerParagraph);
    const text = chunk
      .map((w, idx) => ENGLISH_VOCAB_TEMPLATES[idx % ENGLISH_VOCAB_TEMPLATES.length](w.word.trim(), w.emoji || ''))
      .join(' ');
    paragraphs.push({
      id: `typing-paragraph-${realm.id}-auto-${paragraphs.length + 1}`,
      realmId: realm.id,
      text,
      isVietnamese: false,
      sourceWordIds: chunk.map(w => w.id),
      createdBy: 'auto',
      updatedAt: now
    });
  }

  return paragraphs;
};

/**
 * Lấy đoạn văn luyện gõ cho 1 Realm — ưu tiên snapshot Firestore đã cache,
 * fallback tự sinh runtime khi offline hoặc chưa có snapshot.
 */
export const getParagraphsForRealm = (realmId: string): TypingParagraph[] => {
  const cached = cachedParagraphsByRealm?.[realmId];
  if (cached && cached.length > 0) {
    return cached;
  }

  const realm = AGE_REALMS.find(r => r.id === realmId);
  if (!realm) return [];
  return generateParagraphsFromRealm(realm);
};

/**
 * Get current snapshot version string if available
 */
export const getTypingParagraphSnapshotVersion = (): string => {
  return currentSnapshotVersion || 'v1.0.0-auto';
};
