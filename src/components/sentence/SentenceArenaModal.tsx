import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  X,
  Volume2,
  Turtle,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Eye,
  EyeOff,
  Mic,
  Keyboard,
  MousePointerClick,
  Star,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { UserProgress } from '../../data/progress-types';
import { SentenceItem, SentenceMode, SentenceTopic } from '../../data/sentence-types';
import { STARTERS_SENTENCE_TOPICS } from '../../data/starters-sentences';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';

interface SentenceArenaModalProps {
  progress: UserProgress;
  onClose: () => void;
  onCompleteTopic: (
    topicId: string,
    mode: SentenceMode,
    accuracy: number,
    xpEarned: number,
    gemsEarned: number
  ) => void;
}

type ArenaScreen = 'TOPICS' | 'PLAY' | 'SUMMARY';

interface TokenItem {
  idx: number;
  text: string;
}

const MODE_META: Record<SentenceMode, { label: string; shortLabel: string; icon: string; colorClass: string }> = {
  SCRAMBLE: {
    label: 'Xếp Mảnh Thành Câu',
    shortLabel: 'Xếp Câu',
    icon: '🧩',
    colorClass: 'bg-sky-500/20 border-sky-400/60 text-sky-200 hover:bg-sky-500/30'
  },
  GAP_FILL: {
    label: 'Điền Từ Vào Khung',
    shortLabel: 'Điền Từ',
    icon: '✏️',
    colorClass: 'bg-amber-500/20 border-amber-400/60 text-amber-200 hover:bg-amber-500/30'
  },
  LISTEN_REPEAT: {
    label: 'Nghe & Đọc To',
    shortLabel: 'Nghe & Nói',
    icon: '🎙️',
    colorClass: 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200 hover:bg-emerald-500/30'
  }
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function tokenizeSentence(item: SentenceItem): string[] {
  if (item.tokens && item.tokens.length > 0) return item.tokens;
  return item.sentence.trim().split(/\s+/);
}

export const SentenceArenaModal: React.FC<SentenceArenaModalProps> = ({
  progress,
  onClose,
  onCompleteTopic
}) => {
  const [arenaScreen, setArenaScreen] = useState<ArenaScreen>('TOPICS');
  const [selectedTopic, setSelectedTopic] = useState<SentenceTopic | null>(null);
  const [selectedMode, setSelectedMode] = useState<SentenceMode>('SCRAMBLE');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scoring
  const [correctFirstTryCount, setCorrectFirstTryCount] = useState(0);
  const [hadMistakeOnCurrent, setHadMistakeOnCurrent] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [rewardResult, setRewardResult] = useState<{ accuracy: number; stars: number; xp: number; gems: number } | null>(null);

  // SCRAMBLE state
  const [poolTokens, setPoolTokens] = useState<TokenItem[]>([]);
  const [placedTokens, setPlacedTokens] = useState<TokenItem[]>([]);

  // GAP_FILL state
  const [gapInputMode, setGapInputMode] = useState<'choice' | 'type'>('choice');
  const [gapOptions, setGapOptions] = useState<string[]>([]);
  const [typedGap, setTypedGap] = useState('');
  const [showGapHint, setShowGapHint] = useState(false);
  const gapInputRef = useRef<HTMLInputElement | null>(null);

  // LISTEN_REPEAT state
  const [revealSentenceText, setRevealSentenceText] = useState(false);

  const currentItem: SentenceItem | null = useMemo(() => {
    if (!selectedTopic) return null;
    return selectedTopic.items[currentIndex] || null;
  }, [selectedTopic, currentIndex]);

  // Setup item whenever topic, mode, or currentIndex changes
  useEffect(() => {
    if (arenaScreen !== 'PLAY' || !currentItem) return;

    setFeedbackState('idle');
    setHadMistakeOnCurrent(false);

    if (selectedMode === 'SCRAMBLE') {
      const rawTokens = tokenizeSentence(currentItem);
      const indexed: TokenItem[] = rawTokens.map((text, idx) => ({ idx, text }));
      let shuffled = shuffleArray(indexed);
      // Avoid already-solved order when possible
      if (shuffled.length > 1 && shuffled.every((t, i) => t.idx === i)) {
        shuffled = [...shuffled.slice(1), shuffled[0]];
      }
      setPoolTokens(shuffled);
      setPlacedTokens([]);
    } else if (selectedMode === 'GAP_FILL') {
      const options = shuffleArray([currentItem.gapWord, ...currentItem.distractors.slice(0, 2)]);
      setGapOptions(options);
      setTypedGap('');
      setShowGapHint(false);
      if (gapInputMode === 'type') {
        setTimeout(() => gapInputRef.current?.focus(), 50);
      }
    } else if (selectedMode === 'LISTEN_REPEAT') {
      setRevealSentenceText(false);
      const timer = setTimeout(() => {
        speechHelper.speak(currentItem.sentence, false, 0.88);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [arenaScreen, currentItem, selectedMode, gapInputMode]);

  const startSession = (topic: SentenceTopic, mode: SentenceMode) => {
    soundFx.playClick();
    setSelectedTopic(topic);
    setSelectedMode(mode);
    setCurrentIndex(0);
    setCorrectFirstTryCount(0);
    setHadMistakeOnCurrent(false);
    setRewardResult(null);
    setArenaScreen('PLAY');
  };

  const finishSession = useCallback(
    (finalCorrectCount: number) => {
      if (!selectedTopic) return;
      const total = selectedTopic.items.length;
      const accuracy = total > 0 ? Math.round((finalCorrectCount / total) * 100) : 100;
      const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;
      const xp = 20 + stars * 10;
      const gems = stars >= 2 ? 5 : 3;

      soundFx.playVictory();
      setRewardResult({ accuracy, stars, xp, gems });
      setArenaScreen('SUMMARY');
      onCompleteTopic(selectedTopic.id, selectedMode, accuracy, xp, gems);
    },
    [selectedTopic, selectedMode, onCompleteTopic]
  );

  const handleNextItem = useCallback(() => {
    if (!selectedTopic) return;
    soundFx.playClick();
    if (currentIndex + 1 < selectedTopic.items.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishSession(correctFirstTryCount);
    }
  }, [selectedTopic, currentIndex, correctFirstTryCount, finishSession]);

  const markSuccess = useCallback(
    (speakSentence = true) => {
      if (feedbackState === 'correct') return;
      setFeedbackState('correct');
      soundFx.playCombo(currentIndex + 1);
      if (!hadMistakeOnCurrent) {
        setCorrectFirstTryCount(prev => prev + 1);
      }
      if (speakSentence && currentItem) {
        speechHelper.speak(currentItem.sentence, false, 0.9);
      }
    },
    [feedbackState, currentIndex, hadMistakeOnCurrent, currentItem]
  );

  const markWrong = useCallback(() => {
    setFeedbackState('wrong');
    setHadMistakeOnCurrent(true);
    soundFx.playWrong();
  }, []);

  // SCRAMBLE handlers
  const handlePickPoolToken = useCallback(
    (token: TokenItem) => {
      if (feedbackState === 'correct' || !currentItem) return;
      soundFx.playMechanicalClick();
      const nextPlaced = [...placedTokens, token];
      const nextPool = poolTokens.filter(t => t.idx !== token.idx);
      setPlacedTokens(nextPlaced);
      setPoolTokens(nextPool);
      setFeedbackState('idle');

      // Auto-check when all tokens are placed
      if (nextPool.length === 0) {
        const expected = tokenizeSentence(currentItem).join(' ');
        const actual = nextPlaced.map(t => t.text).join(' ');
        if (actual === expected) {
          markSuccess(true);
        } else {
          markWrong();
        }
      }
    },
    [feedbackState, currentItem, placedTokens, poolTokens, markSuccess, markWrong]
  );

  const handleRemovePlacedToken = useCallback(
    (token: TokenItem) => {
      if (feedbackState === 'correct') return;
      soundFx.playClick();
      setPlacedTokens(prev => prev.filter(t => t.idx !== token.idx));
      setPoolTokens(prev => [...prev, token]);
      setFeedbackState('idle');
    },
    [feedbackState]
  );

  const handleResetScramble = useCallback(() => {
    if (!currentItem) return;
    soundFx.playClick();
    const all = shuffleArray([...placedTokens, ...poolTokens]);
    setPoolTokens(all);
    setPlacedTokens([]);
    setFeedbackState('idle');
  }, [currentItem, placedTokens, poolTokens]);

  // GAP_FILL handlers
  const handleCheckGapAnswer = useCallback(
    (answer: string) => {
      if (!currentItem || feedbackState === 'correct') return;
      const cleanAnswer = answer.trim().toLowerCase();
      const expected = currentItem.gapWord.trim().toLowerCase();
      if (!cleanAnswer) return;

      if (cleanAnswer === expected) {
        markSuccess(true);
      } else {
        markWrong();
      }
    },
    [currentItem, feedbackState, markSuccess, markWrong]
  );

  // LISTEN_REPEAT handler
  const handleConfirmSpoken = useCallback(() => {
    if (!selectedTopic) return;
    soundFx.playStarPop(2);
    const nextCorrect = correctFirstTryCount + 1;
    setCorrectFirstTryCount(nextCorrect);
    if (currentIndex + 1 < selectedTopic.items.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishSession(nextCorrect);
    }
  }, [selectedTopic, correctFirstTryCount, currentIndex, finishSession]);

  // Keyboard shortcuts for Laptop ergonomics
  useEffect(() => {
    if (arenaScreen !== 'PLAY') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts when typing inside input except Enter
      const target = e.target as HTMLElement | null;
      const isTypingInInput = target?.tagName === 'INPUT';

      if (e.key === 'Enter') {
        if (feedbackState === 'correct') {
          e.preventDefault();
          handleNextItem();
          return;
        }
        if (selectedMode === 'GAP_FILL' && gapInputMode === 'type' && isTypingInInput) {
          e.preventDefault();
          handleCheckGapAnswer(typedGap);
          return;
        }
        if (selectedMode === 'LISTEN_REPEAT') {
          e.preventDefault();
          handleConfirmSpoken();
          return;
        }
      }

      if (isTypingInInput) return;

      if (selectedMode === 'SCRAMBLE') {
        if (e.key === 'Backspace' && placedTokens.length > 0 && feedbackState !== 'correct') {
          e.preventDefault();
          handleRemovePlacedToken(placedTokens[placedTokens.length - 1]);
          return;
        }
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= poolTokens.length && feedbackState !== 'correct') {
          e.preventDefault();
          handlePickPoolToken(poolTokens[num - 1]);
        }
      } else if (selectedMode === 'GAP_FILL' && gapInputMode === 'choice') {
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= gapOptions.length && feedbackState !== 'correct') {
          e.preventDefault();
          handleCheckGapAnswer(gapOptions[num - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    arenaScreen,
    feedbackState,
    selectedMode,
    gapInputMode,
    typedGap,
    placedTokens,
    poolTokens,
    gapOptions,
    handleNextItem,
    handleCheckGapAnswer,
    handleConfirmSpoken,
    handleRemovePlacedToken,
    handlePickPoolToken
  ]);

  // Render blanked sentence for GAP_FILL
  const renderGapSentence = (item: SentenceItem) => {
    const regex = new RegExp(`\\b(${item.gapWord})\\b`, 'i');
    const parts = item.sentence.split(regex);
    return (
      <div className="text-xl sm:text-2xl font-black tracking-wide text-center leading-relaxed">
        {parts.map((part, idx) => {
          if (part.toLowerCase() === item.gapWord.toLowerCase()) {
            return (
              <span
                key={idx}
                className={`inline-block min-w-[84px] px-3 py-0.5 mx-1 rounded-xl border-2 border-dashed ${
                  feedbackState === 'correct'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-amber-500/15 border-amber-400 text-amber-300'
                }`}
              >
                {feedbackState === 'correct' ? part : '_____'}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </div>
    );
  };

  const sentenceProgressMap = progress.sentenceProgressMap || {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Đấu Trường Ghép Câu Starters"
    >
      <div className="w-full h-[100dvh] sm:h-auto sm:max-h-[92dvh] sm:max-w-3xl flex flex-col bg-slate-900 border-0 sm:border-2 sm:border-sky-500/40 sm:rounded-3xl shadow-[0_0_50px_rgba(14,165,233,0.2)] overflow-hidden text-white">
        {/* HEADER (shrink-0) */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            {arenaScreen !== 'TOPICS' && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setArenaScreen('TOPICS');
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
                title="Quay lại danh sách Unit"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧩</span>
                <h2 className="text-base sm:text-lg font-game font-black tracking-wide text-sky-300 truncate">
                  {arenaScreen === 'TOPICS'
                    ? 'ĐẤU TRƯỜNG GHÉP CÂU • STARTERS'
                    : `${selectedTopic?.icon} ${selectedTopic?.title}`}
                </h2>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                {arenaScreen === 'TOPICS'
                  ? 'Luyện ghép câu 3–6 từ, điền từ & đọc to tự tin'
                  : `${MODE_META[selectedMode].icon} ${MODE_META[selectedMode].label}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/50 transition cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY (flex-1 overflow-y-auto min-h-0) */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6">
          {/* SCREEN 1: TOPICS LIST */}
          {arenaScreen === 'TOPICS' && (
            <div className="flex flex-col gap-4">
              {/* Quick Guide Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-emerald-500/15 border border-sky-400/30 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <span className="font-black text-sky-300">Mẹo học cho Tít:</span> Mỗi tối chọn <strong>1 Unit</strong>, chơi lần lượt{' '}
                  <span className="text-sky-300 font-bold">🧩 Xếp Câu</span> →{' '}
                  <span className="text-amber-300 font-bold">✏️ Điền Từ</span> →{' '}
                  <span className="text-emerald-300 font-bold">🎙️ Đọc To</span>. Trên laptop có thể bấm phím số <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-600 text-[11px]">1</kbd>–<kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-600 text-[11px]">9</kbd> cho nhanh!
                </div>
              </div>

              {/* 8 Units Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {STARTERS_SENTENCE_TOPICS.map(topic => {
                  const prog = sentenceProgressMap[topic.id];
                  const stars = prog?.stars || 0;
                  const doneModes = prog?.completedModes || [];

                  return (
                    <div
                      key={topic.id}
                      className="rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-sky-400/50 p-4 flex flex-col justify-between gap-3 transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
                              {topic.icon}
                            </div>
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">
                                Unit {topic.unitNumber} • {topic.items.length} câu
                              </span>
                              <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                                {topic.title}
                              </h3>
                              <p className="text-xs text-slate-400">{topic.titleVi}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 shrink-0">
                            {[1, 2, 3].map(s => (
                              <Star
                                key={s}
                                className={`w-4 h-4 ${
                                  s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-slate-950/70 border border-slate-700/60 text-xs font-mono text-sky-300">
                          {topic.patternFormula}
                        </div>
                      </div>

                      {/* 3 Mode Launch Buttons */}
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {(['SCRAMBLE', 'GAP_FILL', 'LISTEN_REPEAT'] as SentenceMode[]).map(mode => {
                          const meta = MODE_META[mode];
                          const isDone = doneModes.includes(mode);
                          return (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => startSession(topic, mode)}
                              className={`relative flex flex-col items-center justify-center py-2 px-1.5 rounded-xl border text-[11px] font-black transition active:scale-95 cursor-pointer min-h-[46px] ${meta.colorClass}`}
                            >
                              <span className="text-sm leading-none mb-0.5">{meta.icon}</span>
                              <span className="truncate max-w-full">{meta.shortLabel}</span>
                              {isDone && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute top-1 right-1" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCREEN 2: ACTIVE PLAY */}
          {arenaScreen === 'PLAY' && selectedTopic && currentItem && (
            <div className="flex flex-col gap-5 max-w-2xl mx-auto">
              {/* Top Progress & Audio Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 flex-1 min-w-[160px]">
                  <span className="text-xs font-black text-sky-300 shrink-0">
                    Câu {currentIndex + 1}/{selectedTopic.items.length}
                  </span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300"
                      style={{
                        width: `${((currentIndex + (feedbackState === 'correct' ? 1 : 0)) / selectedTopic.items.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      speechHelper.speak(currentItem.sentence, true, 0.92);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 text-sky-200 text-xs font-black transition active:scale-95 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    Nghe mẫu
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      speechHelper.speak(currentItem.sentence, true, 0.72);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 text-xs font-black transition active:scale-95 cursor-pointer"
                    title="Đọc chậm từng chữ"
                  >
                    <Turtle className="w-4 h-4" />
                    Chậm
                  </button>
                </div>
              </div>

              {/* Visual Cue Card */}
              <div className="rounded-3xl bg-slate-800/70 border border-slate-700 p-5 flex flex-col items-center text-center gap-2 shadow-inner">
                <div className="text-5xl sm:text-6xl select-none mb-1">{currentItem.emoji}</div>
                <p className="text-base sm:text-lg font-black text-amber-300">{currentItem.meaningVi}</p>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900/90 text-slate-400 border border-slate-700">
                  Khung: {selectedTopic.patternFormula}
                </span>
              </div>

              {/* MODE 1: SCRAMBLE */}
              {selectedMode === 'SCRAMBLE' && (
                <div className="flex flex-col gap-4">
                  {/* Answer Tray */}
                  <div
                    className={`min-h-[74px] rounded-2xl border-2 p-3 flex flex-wrap items-center justify-center gap-2 transition-all ${
                      feedbackState === 'correct'
                        ? 'bg-emerald-500/15 border-emerald-400'
                        : feedbackState === 'wrong'
                        ? 'bg-rose-500/15 border-rose-400 animate-pulse'
                        : 'bg-slate-950/60 border-slate-700 border-dashed'
                    }`}
                  >
                    {placedTokens.length === 0 ? (
                      <span className="text-xs sm:text-sm text-slate-500 font-medium">
                        Bấm vào các thẻ từ bên dưới (hoặc phím 1–9) để xếp thành câu đúng...
                      </span>
                    ) : (
                      placedTokens.map(token => (
                        <button
                          key={token.idx}
                          type="button"
                          onClick={() => handleRemovePlacedToken(token)}
                          disabled={feedbackState === 'correct'}
                          className="px-3.5 py-2 rounded-xl bg-sky-500/25 border-2 border-sky-400/70 text-white font-black text-base sm:text-lg shadow-sm hover:bg-sky-500/35 active:scale-95 transition cursor-pointer min-h-[44px]"
                        >
                          {token.text}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Word Pool */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    {poolTokens.map((token, i) => (
                      <button
                        key={token.idx}
                        type="button"
                        onClick={() => handlePickPoolToken(token)}
                        className="relative px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-sky-400 text-white font-black text-base sm:text-lg shadow-[0_3px_0_rgb(51,65,85)] active:translate-y-0.5 transition cursor-pointer min-h-[48px] flex items-center gap-2"
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-900 text-sky-400 text-[11px] font-black flex items-center justify-center border border-slate-700">
                          {i + 1}
                        </span>
                        <span>{token.text}</span>
                      </button>
                    ))}
                  </div>

                  {placedTokens.length > 0 && feedbackState !== 'correct' && (
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={handleResetScramble}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Xếp lại từ đầu
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: GAP_FILL */}
              {selectedMode === 'GAP_FILL' && (
                <div className="flex flex-col gap-4">
                  {/* Switch Choice vs Type */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400 font-bold">Cách trả lời:</span>
                    <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setGapInputMode('choice');
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer ${
                          gapInputMode === 'choice' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <MousePointerClick className="w-3.5 h-3.5" />
                        Chọn đáp án
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setGapInputMode('type');
                          setTimeout(() => gapInputRef.current?.focus(), 50);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer ${
                          gapInputMode === 'type' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Keyboard className="w-3.5 h-3.5" />
                        Tự gõ chữ
                      </button>
                    </div>
                  </div>

                  {/* Sentence with Blank */}
                  <div className="rounded-2xl bg-slate-950/60 border border-slate-700 p-4 sm:p-5">
                    {renderGapSentence(currentItem)}
                  </div>

                  {gapInputMode === 'choice' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {gapOptions.map((opt, idx) => (
                        <button
                          key={opt}
                          type="button"
                          disabled={feedbackState === 'correct'}
                          onClick={() => handleCheckGapAnswer(opt)}
                          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-amber-400 text-white font-black text-lg shadow-[0_3px_0_rgb(51,65,85)] active:translate-y-0.5 transition cursor-pointer min-h-[52px]"
                        >
                          <span className="w-6 h-6 rounded-md bg-slate-900 text-amber-400 text-xs font-black flex items-center justify-center border border-slate-700">
                            {idx + 1}
                          </span>
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <input
                          ref={gapInputRef}
                          type="text"
                          value={typedGap}
                          disabled={feedbackState === 'correct'}
                          onChange={e => {
                            setTypedGap(e.target.value);
                            if (feedbackState === 'wrong') setFeedbackState('idle');
                          }}
                          placeholder="Gõ từ còn thiếu rồi bấm Enter..."
                          className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 outline-none text-lg font-black text-white placeholder:text-slate-600"
                          autoComplete="off"
                          spellCheck={false}
                        />
                        <button
                          type="button"
                          disabled={feedbackState === 'correct'}
                          onClick={() => handleCheckGapAnswer(typedGap)}
                          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base transition cursor-pointer shrink-0"
                        >
                          Kiểm tra
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => setShowGapHint(true)}
                          className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold cursor-pointer"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          {showGapHint
                            ? `Gợi ý: bắt đầu bằng "${currentItem.gapWord[0].toUpperCase()}" (${currentItem.gapWord.length} chữ cái)`
                            : 'Xem gợi ý chữ đầu'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 3: LISTEN_REPEAT */}
              {selectedMode === 'LISTEN_REPEAT' && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full rounded-2xl bg-slate-950/60 border border-slate-700 p-5 text-center flex flex-col items-center gap-3">
                    {revealSentenceText ? (
                      <p className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-wide">
                        {currentItem.sentence}
                      </p>
                    ) : (
                      <p className="text-sm sm:text-base text-slate-400 italic">
                        🔊 Hãy nghe thật kỹ và đọc to theo máy trước khi mở chữ nhé!
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setRevealSentenceText(prev => !prev);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 cursor-pointer"
                    >
                      {revealSentenceText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {revealSentenceText ? 'Ẩn chữ tiếng Anh' : 'Hiện chữ để đọc theo'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmSpoken}
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base sm:text-lg shadow-[0_4px_0_rgb(4,120,87)] active:translate-y-0.5 transition cursor-pointer"
                  >
                    <Mic className="w-5 h-5" />
                    Con đã đọc to cả câu! (Enter)
                  </button>
                </div>
              )}

              {/* FEEDBACK BANNER */}
              {feedbackState === 'wrong' && (
                <div className="rounded-2xl bg-rose-500/15 border border-rose-400/60 px-4 py-3 text-center text-sm font-bold text-rose-200">
                  Chưa đúng rồi, Tít thử lại nhé! Có thể bấm <strong>Nghe mẫu</strong> để nghe gợi ý.
                </div>
              )}

              {feedbackState === 'correct' && (
                <div className="rounded-2xl bg-emerald-500/20 border border-emerald-400/70 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-emerald-200">
                    <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-sm">
                      <span className="font-black text-white block">{currentItem.sentence}</span>
                      <span className="text-xs text-emerald-300">Tuyệt vời! Con ghép đúng rồi!</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleNextItem}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition cursor-pointer shrink-0"
                  >
                    {currentIndex + 1 < selectedTopic.items.length ? 'Câu tiếp theo' : 'Xem kết quả'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SCREEN 3: SUMMARY */}
          {arenaScreen === 'SUMMARY' && selectedTopic && rewardResult && (
            <div className="flex flex-col items-center text-center gap-5 py-4 max-w-md mx-auto">
              <div className="text-6xl animate-bounce">🏆</div>
              <div>
                <h3 className="text-2xl font-game font-black text-amber-300">HOÀN THÀNH XUẤT SẮC!</h3>
                <p className="text-sm text-slate-300 mt-1">
                  {selectedTopic.title} • {MODE_META[selectedMode].label}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[1, 2, 3].map(s => (
                  <Star
                    key={s}
                    className={`w-10 h-10 ${
                      s <= rewardResult.stars ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]' : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3">
                  <div className="text-xs text-slate-400">Chính xác</div>
                  <div className="text-xl font-black text-emerald-400">{rewardResult.accuracy}%</div>
                </div>
                <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3">
                  <div className="text-xs text-slate-400">Kinh nghiệm</div>
                  <div className="text-xl font-black text-sky-400">+{rewardResult.xp} XP</div>
                </div>
                <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3">
                  <div className="text-xs text-slate-400">Kim Cương</div>
                  <div className="text-xl font-black text-cyan-300">+{rewardResult.gems} 💎</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextMode: SentenceMode =
                      selectedMode === 'SCRAMBLE'
                        ? 'GAP_FILL'
                        : selectedMode === 'GAP_FILL'
                        ? 'LISTEN_REPEAT'
                        : 'SCRAMBLE';
                    startSession(selectedTopic, nextMode);
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-sm transition cursor-pointer"
                >
                  Chơi dạng tiếp theo →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setArenaScreen('TOPICS');
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-black text-sm transition cursor-pointer"
                >
                  Về danh sách Unit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
