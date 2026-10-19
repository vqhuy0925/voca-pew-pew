import { CustomWord } from '../data/custom-topic-types';
import { ALL_LEVELS } from '../data/learning-path-data';

// Cache map of lower-case words to their dictionary entry
const INTERNAL_WORD_MAP = new Map<string, { meaningVi: string; emoji: string; pronunciation?: string; category?: string }>();

// Pre-fill from existing game curriculum
ALL_LEVELS.forEach(level => {
  level.words.forEach(w => {
    const key = w.word.trim().toLowerCase();
    if (!INTERNAL_WORD_MAP.has(key)) {
      INTERNAL_WORD_MAP.set(key, {
        meaningVi: w.meaningVi,
        emoji: w.emoji,
        pronunciation: w.pronunciation,
        category: w.category || level.titleVi
      });
    }
  });
});

// Common Kid English dictionary backup for common primary center words (Oxford Phonics World, Family and Friends, Cambridge Starters)
const BACKUP_KID_DICTIONARY: Record<string, { meaningVi: string; emoji: string }> = {
  // Animals
  cat: { meaningVi: 'Con mèo', emoji: '🐱' },
  dog: { meaningVi: 'Con chó', emoji: '🐶' },
  duck: { meaningVi: 'Con vịt', emoji: '🦆' },
  bird: { meaningVi: 'Con chim', emoji: '🐦' },
  pig: { meaningVi: 'Con heo / lợn', emoji: '🐷' },
  cow: { meaningVi: 'Con bò sữa', emoji: '🐮' },
  chicken: { meaningVi: 'Con gà', emoji: '🐔' },
  sheep: { meaningVi: 'Con cừu', emoji: '🐑' },
  horse: { meaningVi: 'Con ngựa', emoji: '🐴' },
  rabbit: { meaningVi: 'Con thỏ', emoji: '🐰' },
  bear: { meaningVi: 'Con gấu', emoji: '🐻' },
  lion: { meaningVi: 'Sư tử', emoji: '🦁' },
  tiger: { meaningVi: 'Con hổ', emoji: '🐯' },
  elephant: { meaningVi: 'Con voi', emoji: '🐘' },
  monkey: { meaningVi: 'Con khỉ', emoji: '🐒' },
  fish: { meaningVi: 'Con cá', emoji: '🐟' },
  frog: { meaningVi: 'Con ếch', emoji: '🐸' },
  turtle: { meaningVi: 'Con rùa', emoji: '🐢' },
  panda: { meaningVi: 'Gấu trúc', emoji: '🐼' },
  fox: { meaningVi: 'Con cáo', emoji: '🦊' },

  // School Things
  pencil: { meaningVi: 'Bút chì', emoji: '✏️' },
  pen: { meaningVi: 'Bút mực', emoji: '🖊️' },
  ruler: { meaningVi: 'Cây thước kẻ', emoji: '📏' },
  eraser: { meaningVi: 'Cục tẩy', emoji: '🧼' },
  book: { meaningVi: 'Quyển sách', emoji: '📖' },
  notebook: { meaningVi: 'Quyển vở', emoji: '📓' },
  bag: { meaningVi: 'Cặp sách', emoji: '🎒' },
  backpack: { meaningVi: 'Ba lô', emoji: '🎒' },
  desk: { meaningVi: 'Bàn học', emoji: '🪑' },
  chair: { meaningVi: 'Cái ghế', emoji: '🪑' },
  board: { meaningVi: 'Cái bảng', emoji: '📋' },
  teacher: { meaningVi: 'Thầy / Cô giáo', emoji: '👩‍🏫' },
  student: { meaningVi: 'Học sinh', emoji: '🧑‍🎓' },
  school: { meaningVi: 'Trường học', emoji: '🏫' },
  classroom: { meaningVi: 'Lớp học', emoji: '🏫' },
  scissors: { meaningVi: 'Cái kéo', emoji: '✂️' },
  crayon: { meaningVi: 'Bút màu sáp', emoji: '🖍️' },

  // Colors
  red: { meaningVi: 'Màu đỏ', emoji: '🔴' },
  blue: { meaningVi: 'Màu xanh dương', emoji: '🔵' },
  yellow: { meaningVi: 'Màu vàng', emoji: '🟡' },
  green: { meaningVi: 'Màu xanh lá', emoji: '🟢' },
  orange: { meaningVi: 'Màu cam', emoji: '🟠' },
  purple: { meaningVi: 'Màu tím', emoji: '🟣' },
  pink: { meaningVi: 'Màu hồng', emoji: '🌸' },
  black: { meaningVi: 'Màu đen', emoji: '⚫' },
  white: { meaningVi: 'Màu trắng', emoji: '⚪' },
  brown: { meaningVi: 'Màu nâu', emoji: '🟤' },

  // Food & Fruits
  apple: { meaningVi: 'Quả táo', emoji: '🍎' },
  banana: { meaningVi: 'Quả chuối', emoji: '🍌' },
  orange_fruit: { meaningVi: 'Quả cam', emoji: '🍊' },
  grape: { meaningVi: 'Quả nho', emoji: '🍇' },
  mango: { meaningVi: 'Quả xoài', emoji: '🥭' },
  bread: { meaningVi: 'Bánh mì', emoji: '🍞' },
  milk: { meaningVi: 'Sữa', emoji: '🥛' },
  water: { meaningVi: 'Nước lọc', emoji: '💧' },
  egg: { meaningVi: 'Quả trứng', emoji: '🥚' },
  pizza: { meaningVi: 'Bánh pizza', emoji: '🍕' },
  cake: { meaningVi: 'Bánh ngọt', emoji: '🍰' },
  candy: { meaningVi: 'Kẹo ngọt', emoji: '🍬' },
  ice_cream: { meaningVi: 'Que kem', emoji: '🍦' },

  // Family & Body
  dad: { meaningVi: 'Bố / Ba', emoji: '👨' },
  mom: { meaningVi: 'Mẹ', emoji: '👩' },
  brother: { meaningVi: 'Anh / Em trai', emoji: '👦' },
  sister: { meaningVi: 'Chị / Em gái', emoji: '👧' },
  baby: { meaningVi: 'Em bé', emoji: '👶' },
  eye: { meaningVi: 'Mắt', emoji: '👁️' },
  nose: { meaningVi: 'Mũi', emoji: '👃' },
  mouth: { meaningVi: 'Miệng', emoji: '👄' },
  ear: { meaningVi: 'Tai', emoji: '👂' },
  hand: { meaningVi: 'Bàn tay', emoji: '✋' },
  foot: { meaningVi: 'Bàn chân', emoji: '🦶' },
  head: { meaningVi: 'Đầu', emoji: '👦' }
};

/**
 * Tra cứu thông tin từ vựng có sẵn (Emoji + Nghĩa tiếng Việt)
 */
export function lookupWordInfo(word: string): { meaningVi: string; emoji: string; pronunciation?: string } {
  const clean = word.trim().toLowerCase();
  
  // 1. Kiểm tra trong kho 8 cõi
  const fromCurriculum = INTERNAL_WORD_MAP.get(clean);
  if (fromCurriculum) {
    return {
      meaningVi: fromCurriculum.meaningVi,
      emoji: fromCurriculum.emoji,
      pronunciation: fromCurriculum.pronunciation
    };
  }

  // 2. Kiểm tra trong từ điển bổ trợ thiếu nhi
  if (BACKUP_KID_DICTIONARY[clean]) {
    return {
      meaningVi: BACKUP_KID_DICTIONARY[clean].meaningVi,
      emoji: BACKUP_KID_DICTIONARY[clean].emoji
    };
  }

  // 3. Mặc định nếu không tìm thấy
  return {
    meaningVi: '',
    emoji: '⭐'
  };
}

/**
 * Xử lý chuỗi dán nhanh từ phụ huynh (Quick Paste)
 * Hỗ trợ các định dạng:
 * - "cat, dog, bird, elephant"
 * - "cat: con mèo\ndog: con chó"
 * - "cat - con mèo\ndog - con chó"
 * - mỗi dòng 1 từ
 */
export function parseRawVocabInput(rawText: string): CustomWord[] {
  if (!rawText.trim()) return [];

  const lines = rawText.split('\n');
  const results: CustomWord[] = [];
  const seenWords = new Set<string>();

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Kiểm tra xem dòng có dấu phẩy nhiều từ hay không (VD: "apple, banana, orange")
    if (trimmedLine.includes(',') && !trimmedLine.includes(':') && !trimmedLine.includes(' - ')) {
      const parts = trimmedLine.split(',');
      for (const p of parts) {
        const w = p.trim().replace(/^[\d\.\-\*\•\)]+\s*/, ''); // Xóa đánh số đầu dòng nếu có
        if (w && /^[a-zA-Z\s\-']+$/.test(w)) {
          const lower = w.toLowerCase();
          if (!seenWords.has(lower)) {
            seenWords.add(lower);
            const info = lookupWordInfo(lower);
            results.push({
              id: `cword-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
              word: lower,
              meaningVi: info.meaningVi,
              emoji: info.emoji,
              pronunciation: info.pronunciation,
              masteryLevel: 0
            });
          }
        }
      }
      continue;
    }

    // Tách theo định dạng "từ [dấu cách/hai chấm/gạch ngang] nghĩa"
    let word = '';
    let meaning = '';

    if (trimmedLine.includes(':')) {
      const parts = trimmedLine.split(':');
      word = parts[0].trim();
      meaning = parts.slice(1).join(':').trim();
    } else if (trimmedLine.includes(' - ')) {
      const parts = trimmedLine.split(' - ');
      word = parts[0].trim();
      meaning = parts.slice(1).join(' - ').trim();
    } else if (trimmedLine.includes('\t')) {
      const parts = trimmedLine.split('\t');
      word = parts[0].trim();
      meaning = parts.slice(1).join(' ').trim();
    } else {
      word = trimmedLine;
    }

    // Làm sạch từ (loại bỏ số thứ tự đầu dòng: "1. Cat", "• Dog")
    word = word.replace(/^[\d\.\-\*\•\)]+\s*/, '').trim();

    if (word && /^[a-zA-Z\s\-']+$/.test(word)) {
      const lower = word.toLowerCase();
      if (!seenWords.has(lower)) {
        seenWords.add(lower);
        const info = lookupWordInfo(lower);
        results.push({
          id: `cword-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          word: lower,
          meaningVi: meaning || info.meaningVi,
          emoji: info.emoji || '⭐',
          pronunciation: info.pronunciation,
          masteryLevel: 0
        });
      }
    }
  }

  return results;
}
