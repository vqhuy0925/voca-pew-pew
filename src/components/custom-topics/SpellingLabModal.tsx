import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CustomTopic, CustomWord, SpellingStage } from '../../data/custom-topic-types';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { FingerGuideBadge } from '../common/FingerGuideBadge';
import {
  X,
  Volume2,
  Lightbulb,
  Sparkles,
  Award,
  ChevronRight,
  RotateCcw,
  Rocket,
  CheckCircle2,
  Zap,
  HelpCircle
} from 'lucide-react';

interface SpellingLabModalProps {
  isOpen: boolean;
  topic: CustomTopic;
  onClose: () => void;
  onUpdateWordMastery: (topicId: string, wordId: string, newLevel: number) => void;
  onStartArcadeBattle?: (topic: CustomTopic) => void;
}

// Pentatonic scale frequencies for melodic letter chimes: C4, D4, E4, G4, A4, C5, D5, E5
const PENTATONIC_FREQS = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

function playMelodicLetterChime(index: number) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = PENTATONIC_FREQS[index % PENTATONIC_FREQS.length];
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Fallback to soundFx
    soundFx.playHit();
  }
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

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const words = topic.words || [];
  const currentWord: CustomWord | undefined = words[currentWordIndex];
  const targetChars = currentWord ? currentWord.word.toLowerCase().split('') : [];

  // Xác định các ký tự bị ẩn trong chế độ PHONICS_GAP (ưu tiên ẩn nguyên âm a, e, i, o, u hoặc ký tự giữa từ)
  const gapIndices = useRef<Set<number>>(new Set());

  const initStageForWord = useCallback((w: CustomWord, currentStage: SpellingStage) => {
    setTypedIndex(0);
    setIsWordCleared(false);
    setIsShaking(false);

    const chars = w.word.toLowerCase().split('');
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);
    const gaps = new Set<number>();

    if (currentStage === 'PHONICS_GAP') {
      // Ẩn 1 đến 2 nguyên âm
      chars.forEach((c, idx) => {
        if (vowels.has(c) && gaps.size < 2) {
          gaps.add(idx);
        }
      });
      // Nếu không có nguyên âm hoặc từ quá ngắn, ẩn chữ ở giữa
      if (gaps.size === 0 && chars.length > 2) {
        gaps.add(Math.floor(chars.length / 2));
      }
    } else if (currentStage === 'BLIND_RECALL') {
      // Ẩn toàn bộ
      chars.forEach((_, idx) => gaps.add(idx));
    }

    gapIndices.current = gaps;
    setRevealedIndices(new Set());

    // Phát âm từ vựng tự động
    speechHelper.speak(w.word, true);
  }, []);

  useEffect(() => {
    if (isOpen && currentWord) {
      initStageForWord(currentWord, stage);
    }
  }, [isOpen, currentWordIndex, stage, initStageForWord]);

  // Keep focus on hidden input for keyboard typing
  useEffect(() => {
    if (isOpen && !isWordCleared && !isCompletedSession) {
      hiddenInputRef.current?.focus();
    }
  }, [isOpen, isWordCleared, isCompletedSession, typedIndex]);

  if (!isOpen || !currentWord) return null;

  const handleCharInput = (inputChar: string) => {
    if (isWordCleared || isCompletedSession) return;
    const cleanInput = inputChar.toLowerCase();
    const expectedChar = targetChars[typedIndex];

    if (cleanInput === expectedChar) {
      // Đúng chữ cái!
      playMelodicLetterChime(typedIndex);
      const nextIndex = typedIndex + 1;
      setTypedIndex(nextIndex);

      // Nếu gõ xong từ
      if (nextIndex >= targetChars.length) {
        setIsWordCleared(true);
        soundFx.playVictory();
        setEarnedStars(prev => prev + 1);

        // Lưu tiến độ mastery
        const stageNum = stage === 'TRACE' ? 1 : stage === 'PHONICS_GAP' ? 2 : 3;
        onUpdateWordMastery(topic.id, currentWord.id, stageNum);

        // Khen ngợi sau 1.2s tự động sang từ tiếp theo
        setTimeout(() => {
          if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
          } else {
            // Hoàn thành cả bộ!
            soundFx.playUpgradeSuccess();
            setIsCompletedSession(true);
          }
        }, 1200);
      }
    } else {
      // Sai chữ cái: rung nhẹ, âm thud êm dịu, không phạt nặng
      soundFx.playWrong();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && typedIndex > 0) {
      // Cho phép bé lùi lại nếu muốn
      setTypedIndex(prev => prev - 1);
      return;
    }

    if (e.key.length === 1 && /^[a-zA-Z\s\-']$/.test(e.key)) {
      e.preventDefault();
      handleCharInput(e.key);
    }
  };

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={() => hiddenInputRef.current?.focus()}
    >
      {/* Hidden input to catch keyboard events on all devices */}
      <input
        ref={hiddenInputRef}
        type="text"
        className="opacity-0 absolute -left-9999px"
        onKeyDown={handleKeyDown}
        autoFocus
      />

      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950/90 border-3 border-cyan-400 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,240,255,0.4)] flex flex-col max-h-[96vh] overflow-y-auto font-game text-white">
        {/* Top Bar: Progress, Stage Tabs, Close */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{topic.icon}</span>
            <div>
              <div className="text-xs font-black text-cyan-300 uppercase tracking-wide truncate max-w-[180px] sm:max-w-xs">
                {topic.title}
              </div>
              <div className="text-[11px] text-slate-400 font-bold">
                Từ {currentWordIndex + 1} / {words.length} · ⭐ {earnedStars} sao
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Stage Selector Pills */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setStage('TRACE');
                }}
                className={`px-2.5 py-1 rounded-lg font-black transition ${
                  stage === 'TRACE'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Nhìn & Gõ
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setStage('PHONICS_GAP');
                }}
                className={`px-2.5 py-1 rounded-lg font-black transition ${
                  stage === 'PHONICS_GAP'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Điền m
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setStage('BLIND_RECALL');
                }}
                className={`px-2.5 py-1 rounded-lg font-black transition ${
                  stage === 'BLIND_RECALL'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Nhớ Viết
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

        {/* COMPLETED SESSION OVERLAY */}
        {isCompletedSession ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="text-7xl animate-bounce">🏆</div>
            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-cyan-300">
              Tuyệt Vời Bé Ơi!
            </h2>
            <p className="text-base text-cyan-200 max-w-md font-bold">
              Bé đã chinh phục xuất sắc toàn bộ từ vựng trong chủ đề &quot;{topic.title}&quot;!
            </p>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-yellow-400/20 border-2 border-yellow-400 text-yellow-300 text-lg font-black shadow-[0_0_20px_rgba(250,204,21,0.4)]">
              <span>🌟 +{earnedStars} Sao Khen Ngợi</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setCurrentWordIndex(0);
                  setIsCompletedSession(false);
                  setEarnedStars(0);
                }}
                className="btn-3d px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Luyện Lại Lần Nữa</span>
              </button>

              {onStartArcadeBattle && (
                <button
                  onClick={() => {
                    soundFx.playVictory();
                    onStartArcadeBattle(topic);
                  }}
                  className="btn-3d btn-3d-cyan px-6 py-3 rounded-2xl text-slate-950 font-black text-sm flex items-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  <span>🚀 Bắn Phi Thuyền Arcade</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ACTIVE SPELLING WORKSHOP */
          <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-8 space-y-6">
            {/* Word Card: Big Emoji, Vietnamese Meaning, Audio Button */}
            <div className="flex flex-col items-center space-y-3">
              <div
                onClick={handleSpeakCurrentWord}
                className="relative cursor-pointer group flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-cyan-500/15 border-3 border-cyan-400/70 shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-105 active:scale-95 transition-all"
                title="Bấm để nghe phát âm lại"
              >
                <span className="text-6xl sm:text-7xl drop-shadow-lg animate-pulse">
                  {currentWord.emoji || '⭐'}
                </span>
                <div className="absolute bottom-1 right-1 p-1.5 rounded-full bg-cyan-500 text-slate-950 shadow-md">
                  <Volume2 className="w-4 h-4" />
                </div>
              </div>

              {/* Meaning Vi */}
              <div className="text-xl sm:text-2xl font-black text-cyan-200 drop-shadow flex items-center gap-2">
                <span>{currentWord.meaningVi}</span>
                <button
                  onClick={handleSpeakCurrentWord}
                  className="p-1 rounded-lg hover:bg-cyan-500/20 text-cyan-400 transition"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Stage instruction for kid */}
              <div className="text-xs text-slate-400 font-bold px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800">
                {stage === 'TRACE' && '👀 Nhìn chữ cái và gõ theo từng phím'}
                {stage === 'PHONICS_GAP' && '🕵️ Nghe âm thanh và tìm chữ cái còn thiếu'}
                {stage === 'BLIND_RECALL' && '🧠 Nghe đọc và tự nhớ viết cả từ vào ô nhé'}
              </div>
            </div>

            {/* Letter Tiles Row */}
            <div
              className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 transition-transform ${
                isShaking ? 'animate-shake' : ''
              }`}
            >
              {targetChars.map((char, idx) => {
                const isTyped = idx < typedIndex;
                const isCurrent = idx === typedIndex;
                const isGap = gapIndices.current.has(idx);
                const isRevealed = revealedIndices.has(idx);

                // Quyết định xem chữ cái có bị ẩn hay không
                const shouldHideChar = (stage === 'PHONICS_GAP' || stage === 'BLIND_RECALL') && isGap && !isTyped && !isRevealed;

                return (
                  <div
                    key={idx}
                    className={`relative flex items-center justify-center rounded-2xl select-none font-orbitron font-black text-2xl sm:text-4xl transition-all duration-150 ${
                      char === ' '
                        ? 'w-6 sm:w-8 h-14 sm:h-18'
                        : 'w-12 sm:w-16 h-14 sm:h-18 shadow-lg'
                    } ${
                      isTyped
                        ? 'bg-emerald-500/30 text-emerald-300 border-2 border-emerald-400 border-b-4 border-b-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : isCurrent
                        ? 'bg-yellow-400/35 text-yellow-200 border-2 sm:border-3 border-yellow-300 border-b-4 sm:border-b-6 border-b-yellow-500 scale-110 -translate-y-1 animate-pulse shadow-[0_0_25px_rgba(253,224,71,0.8)]'
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
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute top-1 right-1" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Assistance Row: Finger Guide & Peek Hint */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {currentChar && (
                <FingerGuideBadge currentChar={currentChar} />
              )}

              {/* Peek hint button */}
              {(stage === 'PHONICS_GAP' || stage === 'BLIND_RECALL') && (
                <button
                  type="button"
                  onClick={handlePeekHint}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md"
                  title="Gợi ý 1 chữ cái nếu bé quên"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>Gợi Ý 1 Chữ</span>
                </button>
              )}
            </div>

            {/* On-screen tactile keyboard for touch screen/iPad */}
            <div className="w-full max-w-lg pt-4 flex flex-col items-center gap-1.5 select-none">
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
                        className={`min-w-[34px] sm:min-w-[44px] h-11 sm:h-13 rounded-xl uppercase font-orbitron font-black text-sm sm:text-base transition-all active:scale-90 active:translate-y-1 shadow-md ${
                          isNextToPress && stage === 'TRACE'
                            ? 'bg-yellow-400 text-slate-950 border-2 border-yellow-200 border-b-4 border-b-yellow-600 animate-pulse shadow-[0_0_15px_rgba(250,204,21,0.7)]'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 border-b-3 border-b-slate-950'
                        }`}
                      >
                        {k}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Bar: Action buttons */}
        {!isCompletedSession && (
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Gõ phím hoặc chạm màn hình để luyện phản xạ</span>
            </div>

            {onStartArcadeBattle && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onStartArcadeBattle(topic);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
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
