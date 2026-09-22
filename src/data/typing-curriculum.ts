import { AgeRealm } from './chapters/types';
import { TypingProgress } from './typing-progress-types';
import { parseTargetWpmFloor } from '../game/engine/TypingMetrics';
import { ALL_LEVELS } from './learning-path-data';

export type TypingRowType =
  | 'home'
  | 'top'
  | 'bottom'
  | 'numbers'
  | 'symbols'
  | 'review'
  | 'words'
  | 'sentences'
  | 'paragraph';

export interface TypingLesson {
  id: string;             // 'typing-lesson-1'
  order: number;
  unit: number;            // chỉ số Unit (0-based), trỏ vào TYPING_UNITS
  rowType: TypingRowType;
  title: string;
  titleVi: string;
  keys: string[];         // các phím trọng tâm của bài
  practiceText: string;   // chuỗi luyện gõ tạo sẵn
  minAccuracyToPass: number; // ngưỡng qua bài, tăng dần theo lộ trình
}

export interface TypingUnit {
  id: string;
  order: number;          // 0-based, trùng chỉ số trong TYPING_UNITS
  titleVi: string;
  icon: string;
  startOrder: number;     // TypingLesson.order (1-based) đầu tiên của Unit
  endOrder: number;       // TypingLesson.order (1-based) cuối cùng của Unit
  lessonCount: number;
}

// ==========================================
// PRNG có seed — đảm bảo nội dung luyện tập ổn định giữa các lần tải app
// (không dùng Math.random() vì mảng được build 1 lần lúc module load)
// ==========================================

const mulberry32 = (seed: number) => {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const seededShuffle = <T,>(arr: T[], seed: number): T[] => {
  const rand = mulberry32(seed);
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/** Sinh chuỗi luyện "định vị phím" (syllable ngẫu nhiên có seed) từ bộ phím đã học, thiên vị phím mới. */
const genKeyDrillText = (learnedKeys: string[], newKeys: string[], seed: number, tokenCount = 12): string => {
  const rand = mulberry32(seed);
  const pool = learnedKeys.length ? learnedKeys : newKeys;
  const pick = (biasNew: boolean) => {
    const source = biasNew && newKeys.length ? newKeys : pool;
    return source[Math.floor(rand() * source.length)];
  };
  const tokens: string[] = [];
  for (let i = 0; i < tokenCount; i++) {
    const len = 2 + Math.floor(rand() * 3); // 2-4 ký tự / token
    let token = '';
    for (let c = 0; c < len; c++) {
      token += pick(rand() < 0.55);
    }
    tokens.push(token);
  }
  return tokens.join(' ');
};

// ==========================================
// KHO TỪ VỰNG — tái dùng chính bộ từ vựng của game (867+ từ, đã sắp theo độ khó
// Realm 1 -> Realm 8) để bài luyện gõ củng cố luôn vốn từ đang học.
// ==========================================

const VOCAB_WORD_POOL: string[] = Array.from(
  new Set(
    ALL_LEVELS.flatMap(lvl => lvl.words.map(w => w.word.toLowerCase())).filter(w => /^[a-z]+$/.test(w))
  )
);

// ==========================================
// PHASE A — LÀM QUEN BÀN PHÍM (theo từng ngón, chuẩn sư phạm gõ 10 ngón)
// ==========================================

interface KeyStage {
  keys: string[];
}

const HOME_STAGES: KeyStage[] = [
  { keys: ['f', 'j'] },
  { keys: ['d', 'k'] },
  { keys: ['s', 'l'] },
  { keys: ['a', ';'] },
  { keys: ['g', 'h'] }
];

const TOP_STAGES: KeyStage[] = [
  { keys: ['e', 'i'] },
  { keys: ['r', 'u'] },
  { keys: ['t', 'y'] },
  { keys: ['w', 'o'] },
  { keys: ['q', 'p'] }
];

const BOTTOM_STAGES: KeyStage[] = [
  { keys: ['v', 'm'] },
  { keys: ['c', ','] },
  { keys: ['x', '.'] },
  { keys: ['z', '/'] },
  { keys: ['b', 'n'] }
];

const NUMBER_STAGES: KeyStage[] = [
  { keys: ['4', '7'] },
  { keys: ['5', '6'] },
  { keys: ['3', '8'] },
  { keys: ['2', '9'] },
  { keys: ['1', '0'] }
];

const HOME_ROW_WORDS = [
  'add', 'ask', 'dad', 'gal', 'gas', 'had', 'half', 'hall', 'fall', 'flag',
  'flask', 'glass', 'salad', 'flags', 'gash', 'dash', 'lash', 'slash', 'alas', 'ads', 'lads', 'flasks'
];

interface LessonSpec {
  rowType: TypingRowType;
  title: string;
  titleVi: string;
  keys: string[];
  practiceText: string;
}

const makeKeyDrillSpec = (
  rowType: TypingRowType,
  newKeys: string[],
  learnedKeys: string[],
  seed: number,
  labelVi: string
): LessonSpec => ({
  rowType,
  title: `Keys ${newKeys.join(' & ').toUpperCase()}`,
  titleVi: `${labelVi}: Phím ${newKeys.join(' & ')}`,
  keys: [...newKeys],
  practiceText: genKeyDrillText(learnedKeys, newKeys, seed)
});

const makeReviewSpec = (keys: string[], practiceText: string, titleVi: string): LessonSpec => ({
  rowType: 'review',
  title: titleVi,
  titleVi,
  keys,
  practiceText
});

const buildLetterSections = (): { home: LessonSpec[]; top: LessonSpec[]; bottom: LessonSpec[]; learned: string[] } => {
  let learned: string[] = [];
  const home: LessonSpec[] = [];
  const top: LessonSpec[] = [];
  const bottom: LessonSpec[] = [];

  HOME_STAGES.forEach((stage, i) => {
    learned = [...learned, ...stage.keys];
    home.push(makeKeyDrillSpec('home', stage.keys, learned, 1000 + i, 'Hàng Tổ Ấm'));
  });
  home.push(
    makeReviewSpec(
      [...learned],
      seededShuffle(HOME_ROW_WORDS, 1099).slice(0, 14).join(' '),
      'Ôn Tập: Hàng Phím Tổ Ấm'
    )
  );

  TOP_STAGES.forEach((stage, i) => {
    learned = [...learned, ...stage.keys];
    top.push(makeKeyDrillSpec('top', stage.keys, learned, 1100 + i, 'Hàng Trên'));
  });
  const learnedLetterSet = new Set(learned);
  const topWords = VOCAB_WORD_POOL.filter(w => [...w].every(ch => learnedLetterSet.has(ch)));
  top.push(
    makeReviewSpec(
      [...learned],
      seededShuffle(topWords, 1199).slice(0, 14).join(' '),
      'Ôn Tập: Hàng Phím Trên'
    )
  );

  BOTTOM_STAGES.forEach((stage, i) => {
    learned = [...learned, ...stage.keys];
    bottom.push(makeKeyDrillSpec('bottom', stage.keys, learned, 1200 + i, 'Hàng Dưới'));
  });
  bottom.push(
    makeReviewSpec(
      [...learned],
      seededShuffle(VOCAB_WORD_POOL.slice(0, 120), 1299).slice(0, 14).join(' '),
      'Ôn Tập: Toàn Bộ Bảng Chữ Cái'
    )
  );

  return { home, top, bottom, learned };
};

const buildNumbersSection = (priorLearned: string[]): { specs: LessonSpec[]; learned: string[] } => {
  let learned = [...priorLearned];
  const specs: LessonSpec[] = [];
  NUMBER_STAGES.forEach((stage, i) => {
    learned = [...learned, ...stage.keys];
    specs.push(makeKeyDrillSpec('numbers', stage.keys, learned, 1300 + i, 'Số Học'));
  });
  specs.push(makeReviewSpec([...learned], genKeyDrillText(learned, learned, 1399, 14), 'Ôn Tập: Phím Số'));
  return { specs, learned };
};

const buildSymbolsSection = (priorLearned: string[]): LessonSpec[] => {
  const learned = [...priorLearned, "'"];
  const practicalWords = [
    "it's", "don't", "let's", "we're", "can't", "i'm", "that's", "you're", "cosmo's", "star's"
  ];
  return [
    {
      rowType: 'symbols',
      title: "Key: Apostrophe",
      titleVi: "Ký Hiệu: Dấu Nháy Đơn '",
      keys: ["'"],
      practiceText: genKeyDrillText(learned, ["'"], 1400)
    },
    {
      rowType: 'symbols',
      title: 'Punctuation Practice',
      titleVi: 'Luyện Tập: Dấu Câu Trong Từ',
      keys: ["'", '!', '?'],
      practiceText: `${practicalWords.join(' ')} let's go! are you ready?`
    }
  ];
};

// ==========================================
// PHASE B1 — THANG TỪ VỰNG THEO ĐỘ DÀI (dùng trực tiếp kho từ vựng của game)
// ==========================================

const buildWordLadderUnit = (lengths: number[]): LessonSpec[] => {
  const specs: LessonSpec[] = [];
  lengths.forEach(len => {
    const bucket = VOCAB_WORD_POOL.filter(w => w.length === len);
    if (bucket.length === 0) return;
    const shuffled = seededShuffle(bucket, 2000 + len);
    const lessonsForLen = Math.min(6, Math.ceil(shuffled.length / 8));
    for (let i = 0; i < lessonsForLen; i++) {
      const chunk = shuffled.slice(i * 8, i * 8 + 8);
      if (chunk.length === 0) continue;
      specs.push({
        rowType: 'words',
        title: `${len}-Letter Words #${i + 1}`,
        titleVi: `Từ ${len} Chữ Cái - Đợt ${i + 1}`,
        keys: [],
        practiceText: chunk.join(' ')
      });
    }
  });
  return specs;
};

// ==========================================
// PHASE B2 — THỬ THÁCH TỐC ĐỘ (lướt qua kho từ vựng theo đúng thứ tự Realm 1 -> 8)
// ==========================================

const buildSpeedSections = (): LessonSpec[][] => {
  const chunkSize = 9;
  const totalLessons = 45;
  const words = VOCAB_WORD_POOL.slice(0, chunkSize * totalLessons);
  const all: LessonSpec[] = [];
  for (let i = 0; i < totalLessons; i++) {
    const chunk = words.slice(i * chunkSize, i * chunkSize + chunkSize);
    if (chunk.length === 0) break;
    all.push({
      rowType: 'words',
      title: `Speed Words #${i + 1}`,
      titleVi: `Thử Thách Tốc Độ #${i + 1}`,
      keys: [],
      practiceText: chunk.join(' ')
    });
  }
  return [all.slice(0, 15), all.slice(15, 30), all.slice(30, 45)];
};

// ==========================================
// PHASE B3 — CÂU VĂN (phi hành đoàn Cosmo khám phá vũ trụ, độ dài tăng dần)
// ==========================================

const SENTENCE_BANK: string[] = [
  'the sun is hot.',
  'cosmo is a dog.',
  'we love stars.',
  'the sky is blue.',
  'i see a star.',
  'my ship is fast.',
  'mars is a planet.',
  'the moon is bright.',
  'we fly at night.',
  'stars are so far.',
  'the rocket goes up.',
  'cosmo likes to run.',
  'we explore new worlds.',
  'the comet has a tail.',
  'my dog loves the stars.',
  'we wear a space suit.',
  'the astronaut waves to us.',
  'venus is very hot today.',
  'the crew checks the engine.',
  'our ship flies past mars.',
  'the galaxy is full of stars.',
  'cosmo barks at the bright moon.',
  'we pack snacks for the trip.',
  'the planet earth is our home.',
  'a shooting star crossed the sky.',
  'the pilot checks the fuel level.',
  'we land softly on the moon.',
  'the robot helps us fix the ship.',
  'jupiter is the biggest planet we know.',
  'the stars twinkle above the quiet base.',
  'our rocket blasts off into the dark sky.',
  'cosmo floats gently inside the space station.',
  'the crew studies rocks from a new planet.',
  'we watch the sunrise from the space window.',
  'saturn has beautiful rings made of ice and rock.',
  'the astronauts train hard before every single mission.',
  'our brave team explores a cave on the moon.',
  'the telescope shows us stars from far away.',
  'we send a message back to planet earth.',
  'the little robot beeps as it scans the ground.',
  'cosmo and the crew share a meal in zero gravity.',
  'the spaceship glides quietly past a ring of asteroids.',
  'every planet in our solar system has its own story.',
  'the captain gives the order to launch the rocket now.',
  'bright stars fill the sky as the ship sails through space.',
  'our mission is to find water on this cold red planet.',
  'the crew works together to repair the broken solar panel.',
  'cosmo wags his tail when he sees the friendly aliens.',
  'a comet with a long tail flew past our tiny ship.',
  'the young explorer records every discovery in her small notebook.',
  'deep in space, the stars look like tiny grains of sand.',
  'the engineer checks each wire before the big launch tomorrow.',
  "our ship slows down as it enters the planet's thin air.",
  'the crew cheers when they finally see their home world again.',
  'cosmo naps in his cozy corner while the ship flies on.',
  'the scientist studies a strange rock found near the crater.',
  'we float past rings of dust on our way to saturn.',
  'the team plants a small flag on the quiet gray moon.',
  'every star we pass has its own name and its own story.',
  'the captain smiles as the ship safely lands back on earth.',
  'beyond the last planet, the galaxy stretches farther than we can see.',
  'cosmo presses his paw on the glass to watch the passing stars.',
  'the young pilot studies maps of every planet in our solar system.',
  'our small robot rolls across the dusty ground collecting tiny rock samples.',
  'the crew shares stories about home while the ship drifts through space.',
  'a bright light appears on the screen as we near the space station.',
  'the captain guides the ship gently through a field of floating rocks.',
  'cosmo barks with joy when the crew finds a new friendly planet.',
  'we record the sound of the wind on this strange and quiet world.',
  'the engineer smiles proudly after fixing the last broken part of the ship.',
  'far below, the ocean of earth looks like a small blue marble.',
  'the whole crew gathers to watch the new star being born tonight.',
  'cosmo curls up next to the window as the stars drift slowly by.',
  'our team studies the weather on this cloudy planet before we land there.',
  'the young explorer writes about every planet she has visited this year.',
  'after a long journey, the tired crew finally rests inside the warm station.',
  'the captain thanks every member of the crew for their hard work today.',
  'cosmo and his friends watch the sunrise together from the top of the ship.',
  'the last light fades as our rocket heads home through the quiet dark sky.',
  'together, the crew and cosmo look back at the stars they came to explore.'
];

const buildSentenceSections = (): { unit14: LessonSpec[]; unit15: LessonSpec[]; unit16: LessonSpec[] } => {
  const singles = SENTENCE_BANK.map((s, i) => ({
    rowType: 'sentences' as TypingRowType,
    title: `Sentence #${i + 1}`,
    titleVi: `Câu Số ${i + 1}`,
    keys: [],
    practiceText: s
  }));
  const unit14 = singles.slice(0, 30);
  const unit15 = singles.slice(30, 60);
  const unit16: LessonSpec[] = [];
  for (let i = 0; i < 20; i++) {
    const a = SENTENCE_BANK[i];
    const b = SENTENCE_BANK[60 + i];
    unit16.push({
      rowType: 'sentences',
      title: `Sentence Combo #${i + 1}`,
      titleVi: `Câu Ghép #${i + 1}`,
      keys: [],
      practiceText: `${a} ${b}`
    });
  }
  return { unit14, unit15, unit16 };
};

// ==========================================
// PHASE B4 — ĐOẠN VĂN (khép lại hành trình Cosmo, dẫn vào Paragraph Mode tự do)
// ==========================================

const PARAGRAPH_BANK: string[] = [
  'cosmo is a brave little dog. he loves to fly through space. every day he looks for new stars.',
  'our rocket ship is fast and strong. it flies past the moon and the stars. cosmo watches from the window.',
  'the sun is a giant ball of fire. it gives us light and warmth. without the sun, our planet would be cold and dark.',
  'mars is called the red planet. its soil is full of iron dust. many robots have explored its rocky ground.',
  'venus is the hottest planet in our solar system. thick clouds trap the heat inside. no ship has ever landed there safely.',
  'the moon does not make its own light. it only reflects light from the sun. that is why it glows so softly at night.',
  'our crew trains for many months before a launch. they learn about engines, stars, and safety. hard work makes every mission possible.',
  'a comet is like a giant dirty snowball. as it nears the sun, it grows a long bright tail. people on earth love to watch it pass.',
  'saturn is famous for its beautiful rings. the rings are made of ice, dust, and rock. from far away, they look like a golden halo.',
  'jupiter is the largest planet in our solar system. a giant storm called the great red spot has raged there for centuries. many moons circle around it.',
  'astronauts must wear special suits in space. the suits protect them from extreme heat and cold. they also carry oxygen so the crew can breathe.',
  'cosmo loves floating in zero gravity. he tumbles and spins with a happy grin. the crew laughs every time he tries to catch his tail.',
  'a galaxy is a huge group of stars, planets, and dust. our galaxy is called the milky way. scientists believe there are billions of other galaxies in space.',
  'the crew found a strange rock near a quiet crater. it sparkled under the light of their small lamps. they carefully placed it in a sample bag.',
  'every planet spins on its own axis as it travels around the sun. this spinning motion is what gives us day and night. earth completes one spin every twenty four hours.',
  'the captain checked every system before the long journey began. fuel, oxygen, and navigation all had to be perfect. one small mistake could put the whole crew in danger.',
  'stars are born inside huge clouds of gas and dust. over millions of years, gravity pulls the gas together. eventually it becomes hot enough to shine as a brand new star.',
  'our ship passed through a quiet field of floating rocks called an asteroid belt. the pilot steered carefully between each one. cosmo watched with wide eyes, amazed by the silent dance of stone.',
  'water is one of the most important things we search for on other planets. it could mean that life once existed there. scientists study ice, rivers, and clouds for any small sign of water.',
  'after months of travel, the crew finally saw their home planet again. earth looked like a small blue marble floating in the dark. everyone cheered, and cosmo barked with joy at the beautiful sight.',
  'the team built a small camp on the surface of a quiet gray moon. they studied rocks, tested the thin air, and mapped the land around them. every discovery brought them closer to understanding this new world.',
  'a telescope helps us see stars and planets that are too far away to reach. the biggest telescopes can see galaxies billions of light years from earth. scientists use these images to learn how the universe began.',
  'life on a spaceship follows a careful daily routine. the crew wakes up, checks the systems, and shares a meal together. even in the middle of space, teamwork keeps everyone safe and happy.',
  'cosmo has traveled to more planets than any other dog in the galaxy. he has felt the cold winds of mars and floated past the rings of saturn. no matter how far they travel, he always dreams of returning home.',
  'as the mission comes to an end, the crew gathers on the deck to watch the stars one last time. cosmo sits quietly beside them, his tail wagging softly. together they remember every planet, every star, and every friend they found along the way, grateful for the journey that brought them so far from home.'
];

const buildParagraphSection = (): LessonSpec[] =>
  PARAGRAPH_BANK.map((p, i) => ({
    rowType: 'paragraph' as TypingRowType,
    title: `Paragraph #${i + 1}`,
    titleVi: `Đoạn Văn #${i + 1}`,
    keys: [],
    practiceText: p
  }));

// ==========================================
// LẮP RÁP TOÀN BỘ LỘ TRÌNH
// ==========================================

const letterResult = buildLetterSections();
const numbersResult = buildNumbersSection(letterResult.learned);
const symbolsSpecs = buildSymbolsSection(numbersResult.learned);
const wordLadderGroups = [[3, 4], [5, 6], [7, 8], [9, 10], [11, 12]].map(buildWordLadderUnit);
const speedGroups = buildSpeedSections();
const sentenceGroups = buildSentenceSections();
const paragraphSpecs = buildParagraphSection();

const SECTIONS: { titleVi: string; icon: string; specs: LessonSpec[] }[] = [
  { titleVi: 'Trạm Tổ Ấm', icon: '🏠', specs: letterResult.home },
  { titleVi: 'Trạm Hàng Trên', icon: '⬆️', specs: letterResult.top },
  { titleVi: 'Trạm Hàng Dưới', icon: '⬇️', specs: letterResult.bottom },
  { titleVi: 'Trạm Số Học', icon: '🔢', specs: numbersResult.specs },
  { titleVi: 'Trạm Ký Hiệu', icon: '✨', specs: symbolsSpecs },
  { titleVi: 'Từ Vựng 3-4 Chữ', icon: '📘', specs: wordLadderGroups[0] },
  { titleVi: 'Từ Vựng 5-6 Chữ', icon: '📗', specs: wordLadderGroups[1] },
  { titleVi: 'Từ Vựng 7-8 Chữ', icon: '📙', specs: wordLadderGroups[2] },
  { titleVi: 'Từ Vựng 9-10 Chữ', icon: '📕', specs: wordLadderGroups[3] },
  { titleVi: 'Từ Vựng Nâng Cao', icon: '🎓', specs: wordLadderGroups[4] },
  { titleVi: 'Thử Thách Tốc Độ I', icon: '⚡', specs: speedGroups[0] },
  { titleVi: 'Thử Thách Tốc Độ II', icon: '⚡', specs: speedGroups[1] },
  { titleVi: 'Thử Thách Tốc Độ III', icon: '⚡', specs: speedGroups[2] },
  { titleVi: 'Câu Văn Phi Hành I', icon: '📝', specs: sentenceGroups.unit14 },
  { titleVi: 'Câu Văn Phi Hành II', icon: '📝', specs: sentenceGroups.unit15 },
  { titleVi: 'Câu Văn Ghép Đôi', icon: '🔗', specs: sentenceGroups.unit16 },
  { titleVi: 'Đoạn Văn Vũ Trụ', icon: '📖', specs: paragraphSpecs }
];

const flatSpecs: LessonSpec[] = [];
const lessonUnitIndex: number[] = [];
SECTIONS.forEach((sec, secIdx) => {
  sec.specs.forEach(spec => {
    flatSpecs.push(spec);
    lessonUnitIndex.push(secIdx);
  });
});

/** Ngưỡng % chính xác tăng dần tuyến tính theo tiến độ lộ trình: 78% (bài đầu) -> 94% (bài cuối). */
const rampAccuracy = (idx0: number, total: number): number => {
  const t = total > 1 ? idx0 / (total - 1) : 0;
  return Math.round(78 + t * (94 - 78));
};

export const TYPING_LESSONS: TypingLesson[] = flatSpecs.map((spec, i) => ({
  id: `typing-lesson-${i + 1}`,
  order: i + 1,
  unit: lessonUnitIndex[i],
  rowType: spec.rowType,
  title: spec.title,
  titleVi: spec.titleVi,
  keys: spec.keys,
  practiceText: spec.practiceText,
  minAccuracyToPass: rampAccuracy(i, flatSpecs.length)
}));

export const TYPING_UNITS: TypingUnit[] = SECTIONS.reduce<TypingUnit[]>((acc, sec, idx) => {
  const prevEnd = idx === 0 ? 0 : acc[idx - 1].endOrder;
  const startOrder = prevEnd + 1;
  const endOrder = prevEnd + sec.specs.length;
  acc.push({
    id: `typing-unit-${idx + 1}`,
    order: idx,
    titleVi: sec.titleVi,
    icon: sec.icon,
    startOrder,
    endOrder,
    lessonCount: sec.specs.length
  });
  return acc;
}, []);

/**
 * Ngưỡng Accuracy tối thiểu cho "Chứng Chỉ Gõ 10 Ngón" theo Realm (xem `intent.md` mục 6).
 * Ngưỡng WPM đọc trực tiếp từ `AgeRealm.targetWpm` qua `parseTargetWpmFloor()` — một nguồn dữ liệu duy nhất.
 */
export const TYPING_DIPLOMA_ACCURACY_THRESHOLDS: Record<string, number> = {
  'realm-1': 85,
  'realm-2': 88,
  'realm-3': 90,
  'realm-4': 90,
  'realm-5': 92,
  'realm-6': 93,
  'realm-7': 95,
  'realm-8': 95
};

export const getTypingDiplomaAccuracyThreshold = (realmId: string): number =>
  TYPING_DIPLOMA_ACCURACY_THRESHOLDS[realmId] ?? 90;

/**
 * Kiểm tra điều kiện đạt "Chứng Chỉ Gõ 10 Ngón" của 1 Realm: bestWpmOverall >= cận dưới targetWpm
 * và bestAccuracyOverall >= ngưỡng accuracy tương ứng.
 */
export const isTypingDiplomaEligible = (realm: AgeRealm, typingProgress?: TypingProgress): boolean => {
  if (!typingProgress) return false;
  const wpmFloor = parseTargetWpmFloor(realm.targetWpm);
  const accuracyThreshold = getTypingDiplomaAccuracyThreshold(realm.id);
  return typingProgress.bestWpmOverall >= wpmFloor && typingProgress.bestAccuracyOverall >= accuracyThreshold;
};
