import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { CustomTopic, CustomWord, SpellingStage } from '../../data/custom-topic-types';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { FingerGuideBadge } from '../common/FingerGuideBadge';
import {
  X,
  Volume2,
  Lightbulb,
  Sparkles,
  RotateCcw,
  Rocket,
  CheckCircle2,
  Zap,
  Keyboard
} from 'lucide-react';

interface SpellingLabModalProps {
  isOpen: boolean;
  topic: CustomTopic;
  onClose: () => void;
  onUpdateWordMastery: (topicId: string, wordId: string, newLevel: number) => void;
  onStartArcadeBattle?: (topic: CustomTopic) => void;
}

export const SpellingLabModal: React.FC<SpellingLabModalProps> = ({
  isOpen,
  topic,
  onClose,
  onUpdateWordMastery,
  onStartArcadeBattle
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [stage, setStage] = useState<SpellingStage>('TRACE');
  const [typedIndex, setTypedIndex] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isWordCleared, setIsWordCleared] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [isCompletedSession, setIsCompletedSession] = useState(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState<boolean>(false);

  const words = topic.words || [];
  const currentWord: CustomWord | undefined = words[currentWordIndex];
  const targetChars = useMemo(
    () => (currentWord ? currentWord.word.toLowerCase().split('') : []),
    [currentWord]
  );

  // Synchronous refs for smooth, zero-latency keyboard handling
  const typedIndexRef = useRef(typedIndex);
  typedIndexRef.current = typedIndex;

  const targetCharsRef = useRef(targetChars);
  targetCharsRef.current = targetChars;

  const isWordClearedRef = useRef(isWordCleared);
  isWordClearedRef.current = isWordCleared;

  const isCompletedSessionRef = useRef(isCompletedSession);
  isCompletedSessionRef.current = isCompletedSession;

  const lastInputRef = useRef<{ char: string; time: number }>({ char: '', time: 0 });

  // Xác định các ký tự bị ẩn trong chế độ PHONICS_GAP
  const gapIndices = useRef<Set<number>>(new Set());

  const initStageForWord = useCallback((w: CustomWord, currentStage: SpellingStage) => {
    setTypedIndex(0);
    setIsWordCleared(false);
    setIsShaking(false);

    const chars = w.word.toLowerCase().split('');
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);
    const gaps = new Set<number>();

    if (currentStage === 'PHONICS_GAP') {
      chars.forEach((c, idx) => {
        if (vowels.has(c) && gaps.size < 2) {
          gaps.add(idx);
        }
      });
      if (gaps.size === 0 && chars.length > 2) {
        gaps.add(Math.floor(chars.length / 2));
      }
    } else if (currentStage === 'BLIND_RECALL') {
      chars.forEach((_, idx) => gaps.add(idx));
    }

    gapIndices.current = gaps;
    setRevealedIndices(new Set());

    // Phát âm từ vựng chuẩn
    speechHelper.speak(w.word, true);
  }, []);

  useEffect(() => {
    if (isOpen && currentWord) {
      initStageForWord(currentWord, stage);
    }
  }, [isOpen, currentWordIndex, stage, initStageForWord]);

  // Xử lý ký tự gõ vào mượt mà, không phụ thuộc vào DOM input focus
  const handleCharInput = useCallback(
    (inputChar: string) => {
      if (isWordClearedRef.current || isCompletedSessionRef.current) return;

      const cleanInput = inputChar.toLowerCase();
      const now = performance.now();
      // Chống dội phím (debounce 35ms)
      if (lastInputRef.current.char === cleanInput && now - lastInputRef.current.time < 35) return;
      lastInputRef.current = { char: cleanInput, time: now };

      const currentChars = targetCharsRef.current;
      const currentIndex = typedIndexRef.current;
      const expectedChar = currentChars[currentIndex];

      if (cleanInput === expectedChar) {
        // Đúng chữ cái: phát âm thanh nốt nhạc tái sử dụng audio context
        soundFx.playMelodicLetterChime(currentIndex);
        const nextIndex = currentIndex + 1;
        setTypedIndex(nextIndex);

        if (nextIndex >= currentChars.length) {
          setIsWordCleared(true);
          soundFx.playVictory();
          setEarnedStars(prev => prev + 1);

          if (currentWord) {
            const stageNum = stage === 'TRACE' ? 1 : stage === 'PHONICS_GAP' ? 2 : 3;
            onUpdateWordMastery(topic.id, currentWord.id, stageNum);
          }

          // Chuyển nấc thang liên tục 1 -> 2 -> 3 trên từng từ (Ladder per Word)
          setTimeout(() => {
            if (stage === 'TRACE') {
              setStage('PHONICS_GAP');
            } else if (stage === 'PHONICS_GAP') {
              setStage('BLIND_RECALL');
            } else {
              // Hoàn thành cả 3 bậc của từ hiện tại!
              if (currentWordIndex < words.length - 1) {
                setStage('TRACE');
                setCurrentWordIndex(prev => prev + 1);
              } else {
                soundFx.playUpgradeSuccess();
                setIsCompletedSession(true);
              }
            }
          }, 700);
        }
      } else {
        // Sai chữ cái: âm nhẹ, không giật màn hình
        soundFx.playWrong();
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 250);
      }
    },
    [currentWord, currentWordIndex, words.length, stage, topic.id, onUpdateWordMastery]
  );

  // Bắt sự kiện bàn phím vật lý toàn cục khi modal mở — không bao giờ gây giật màn hình
  useEffect(() => {
    if (!isOpen) return;

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (isWordClearedRef.current || isCompletedSessionRef.current) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        setTypedIndex(prev => Math.max(0, prev - 1));
        return;
      }

      if (e.key.length === 1 && /^[a-zA-Z\s\-']$/.test(e.key)) {
        e.preventDefault();
        handleCharInput(e.key);
      }
    };

    window.addEventListener('keydown', handleWindowKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleWindowKeyDown, { capture: true });
  }, [isOpen, handleCharInput]);

  if (!isOpen || !currentWord) return null;

  // Cứu trợ: Bấm nút Đèn Thần 💡 để gợi ý 1 chữ cái
  const handlePeekHint = () => {
    soundFx.playClick();
    if (typedIndex < targetChars.length) {
      setRevealedIndices(prev => new Set(prev).add(typedIndex));
      speechHelper.speak(targetChars[typedIndex], true);
    }
  };

  const handleSpeakCurrentWord = () => {
    soundFx.playClick();
    speechHelper.speak(currentWord.word, true);
  };

  const currentChar = typedIndex < targetChars.length ? targetChars[typedIndex] : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 border-3 border-cyan-400 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,240,255,0.35)] flex flex-col max-h-[95vh] overflow-y-auto no-scrollbar font-game text-white">
        {/* Top Bar: Progress, Stage Tabs, Close */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{topic.icon}</span>
            <div>
              <div className="text-xs font-black text-cyan-300 uppercase tracking-wide truncate max-w-[160px] sm:max-w-xs">
                {topic.title}
              </div>
              <div className="text-[11px] text-slate-400 font-bold">
                Từ {currentWordIndex + 1} / {words.length} · ⭐ {earnedStars} sao
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Stage Selector Pills for current word */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setStage('TRACE');
                }}
                className={`px-2.5 py-1 rounded-lg font-black transition cursor-pointer flex items-center gap-1 ${
                  stage === 'TRACE'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Bậc 1: Nhìn chữ và gõ theo làm quen vị trí phím"
              >
                {(currentWord.masteryLevel || 0) >= 1 && <span className="text-emerald-400">✓</span>}
                <span>1. Tô Chữ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setStage('PHONICS_GAP');
                }}
                className={`px-2.5 py-1 rounded-lg font-black transition cursor-pointer flex items-center gap-1 ${
                  stage === 'PHONICS_GAP'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Bậc 2: Điền các chữ cái nguyên âm/phụ âm còn thiếu"
              >
                {(currentWord.masteryLevel || 0) >= 2 && <span className="text-emerald-400">✓</span>}
                <span>2. Khuyết Âm</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setStage('BLIND_RECALL');
                }}
                className={`px-2.5 py-1 rounded-lg font-black transition cursor-pointer flex items-center gap-1 ${
                  stage === 'BLIND_RECALL'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Bậc 3: Tự gõ cả từ trong trí nhớ không nhìn chữ mẫu"
              >
                {(currentWord.masteryLevel || 0) >= 3 && <span className="text-amber-300">⭐</span>}
                <span>3. Tự Viết</span>
              </button>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Word Pagination Carousel: Allows jumping to any word & viewing mastery stars */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 border-b border-slate-800/80 no-scrollbar shrink-0">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Từ:
          </span>
          {words.map((w, idx) => {
            const isCurrent = idx === currentWordIndex;
            const mastery = w.masteryLevel || 0;
            return (
              <button
                key={w.id || idx}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setCurrentWordIndex(idx);
                  setStage('TRACE');
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500/25 border-2 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : mastery >= 3
                    ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/40'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
                title={`${w.word}: ${w.meaningVi}`}
              >
                <span>{w.emoji || '📝'}</span>
                <span>{w.word}</span>
                {mastery >= 3 ? (
                  <span className="text-[10px] text-amber-300">⭐⭐⭐</span>
                ) : mastery === 2 ? (
                  <span className="text-[10px] text-amber-300">⭐⭐</span>
                ) : mastery === 1 ? (
                  <span className="text-[10px] text-amber-300">⭐</span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* COMPLETED SESSION OVERLAY */}
        {isCompletedSession ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="text-7xl">🏆</div>
            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-cyan-300">
              Tuyệt Vời Bé Ơi!
            </h2>
            <p className="text-base text-cyan-200 max-w-md font-bold">
              Bé đã chinh phục xuất sắc toàn bộ {words.length} từ vựng qua cả 3 nấc thang trong chủ đề &quot;{topic.title}&quot;!
            </p>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-yellow-400/20 border-2 border-yellow-400 text-yellow-300 text-lg font-black shadow-[0_0_20px_rgba(250,204,21,0.4)]">
              <span>🌟 +{earnedStars} Sao Khen Ngợi</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {onStartArcadeBattle && (
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playVictory();
                    onStartArcadeBattle(topic);
                  }}
                  className="btn-3d btn-3d-cyan px-6 py-3 rounded-2xl text-slate-950 font-black text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.5)] cursor-pointer"
                >
                  <Rocket className="w-4 h-4" />
                  <span>🚀 Bắn Phi Thuyền Arcade</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setCurrentWordIndex(0);
                  setStage('TRACE');
                  setIsCompletedSession(false);
                  setEarnedStars(0);
                }}
                className="btn-3d px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Luyện Lại Toàn Bộ</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold text-sm cursor-pointer"
              >
                <span>Về Sổ Từ Của Con</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE SPELLING WORKSHOP */
          <div className="flex-1 flex flex-col items-center justify-center py-4 sm:py-6 space-y-5">
            {/* Word Card: Big Emoji, Vietnamese Meaning, Audio Button */}
            <div className="flex flex-col items-center space-y-2">
              <div
                onClick={handleSpeakCurrentWord}
                className="relative cursor-pointer group flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-cyan-500/15 border-2 border-cyan-400/70 shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:scale-105 active:scale-95 transition-transform"
                title="Bấm để nghe phát âm lại"
              >
                <span className="text-5xl sm:text-6xl drop-shadow-md">
                  {currentWord.emoji || '⭐'}
                </span>
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-cyan-500 text-slate-950 shadow-md">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Meaning Vi */}
              <div className="text-lg sm:text-xl font-black text-cyan-200 drop-shadow flex items-center gap-2">
                <span>{currentWord.meaningVi}</span>
                <button
                  onClick={handleSpeakCurrentWord}
                  className="p-1 rounded-lg hover:bg-cyan-500/20 text-cyan-400 transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Stage instruction for kid */}
              <div className="text-xs text-slate-400 font-bold px-3 py-0.5 rounded-full bg-slate-950/80 border border-slate-800">
                {stage === 'TRACE' && '👀 Nhìn chữ cái và gõ theo từng phím'}
                {stage === 'PHONICS_GAP' && '🕵️ Nghe âm thanh và tìm chữ cái còn thiếu'}
                {stage === 'BLIND_RECALL' && '🧠 Nghe đọc và tự nhớ viết cả từ vào ô nhé'}
              </div>
            </div>

            {/* Letter Tiles Row (Locked height to prevent layout shifts & screen jump) */}
            <div className="min-h-[64px] sm:min-h-[76px] flex items-center justify-center py-1">
              <div
                className={`flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 ${
                  isShaking ? 'animate-shake' : ''
                }`}
              >
                {targetChars.map((char, idx) => {
                  const isTyped = idx < typedIndex;
                  const isCurrent = idx === typedIndex;
                  const isGap = gapIndices.current.has(idx);
                  const isRevealed = revealedIndices.has(idx);

                  const shouldHideChar =
                    (stage === 'PHONICS_GAP' || stage === 'BLIND_RECALL') &&
                    isGap &&
                    !isTyped &&
                    !isRevealed;

                  return (
                    <div
                      key={idx}
                      className={`relative flex items-center justify-center rounded-2xl select-none font-orbitron font-black text-2xl sm:text-3xl transition-colors duration-100 ${
                        char === ' '
                          ? 'w-5 sm:w-7 h-13 sm:h-16'
                          : 'w-11 sm:w-14 h-13 sm:h-16 shadow-md'
                      } ${
                        isTyped
                          ? 'bg-emerald-500/30 text-emerald-300 border-2 border-emerald-400 border-b-4 border-b-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                          : isCurrent
                          ? 'bg-yellow-400/35 text-yellow-200 border-2 border-yellow-300 border-b-4 border-b-yellow-500 shadow-[0_0_20px_rgba(253,224,71,0.7)]'
                          : shouldHideChar
                          ? 'bg-slate-950/90 text-slate-600 border-2 border-dashed border-slate-700'
                          : 'bg-slate-900/90 text-slate-300 border-2 border-slate-700 border-b-4 border-b-slate-950'
                      }`}
                    >
                      {isTyped ? (
                        char.toUpperCase()
                      ) : isCurrent ? (
                        shouldHideChar ? '?' : char.toUpperCase()
                      ) : shouldHideChar ? (
                        '·'
                      ) : (
                        char.toUpperCase()
                      )}

                      {/* Checkmark icon for typed letters */}
                      {isTyped && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 absolute top-1 right-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assistance Row: Finger Guide, Peek Hint & Keyboard Toggle */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {currentChar && <FingerGuideBadge currentChar={currentChar} />}

              {/* Peek hint button */}
              {(stage === 'PHONICS_GAP' || stage === 'BLIND_RECALL') && (
                <button
                  type="button"
                  onClick={handlePeekHint}
                  className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md"
                  title="Gợi ý 1 chữ cái nếu bé quên"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gợi Ý 1 Chữ</span>
                </button>
              )}

              {/* Toggle virtual keyboard button (default: OFF) */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setShowVirtualKeyboard(prev => !prev);
                }}
                className={`px-3 py-1 rounded-xl border text-xs font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm ${
                  showVirtualKeyboard
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
                title={showVirtualKeyboard ? 'Tắt bàn phím ảo' : 'Bật bàn phím ảo (cho màn hình cảm ứng/iPad)'}
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>{showVirtualKeyboard ? 'Tắt Phím Ảo' : 'Bật Phím Ảo'}</span>
              </button>
            </div>

            {/* On-screen tactile keyboard for touch screen/iPad (DEFAULT: HIDDEN) */}
            {showVirtualKeyboard && (
              <div className="w-full max-w-lg pt-2 flex flex-col items-center gap-1 sm:gap-1.5 select-none animate-in fade-in duration-150">
                {[
                  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
                ].map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-1 sm:gap-1.5">
                    {row.map(k => {
                      const isNextToPress = currentChar?.toLowerCase() === k;
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => handleCharInput(k)}
                          className={`min-w-[32px] sm:min-w-[42px] h-10 sm:h-12 rounded-xl uppercase font-orbitron font-black text-xs sm:text-base transition-all active:scale-90 active:translate-y-0.5 shadow-sm ${
                            isNextToPress && stage === 'TRACE'
                              ? 'bg-yellow-400 text-slate-950 border-2 border-yellow-200 border-b-3 border-b-yellow-600 shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 border-b-2 border-b-slate-950'
                          }`}
                        >
                          {k}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom Bar: Quick info */}
        {!isCompletedSession && (
          <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gõ phím máy tính hoặc chạm bàn phím màn hình</span>
            </div>

            {onStartArcadeBattle && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onStartArcadeBattle(topic);
                }}
                className="px-3 py-1 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Bắn Arcade</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
