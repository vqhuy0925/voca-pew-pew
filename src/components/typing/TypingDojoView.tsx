import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserProgress } from '../../data/progress-types';
import { TYPING_LESSONS, TYPING_UNITS, TypingLesson } from '../../data/typing-curriculum';
import { TypingMetrics, TypingSessionResult } from '../../game/engine/TypingMetrics';
import { recordTypingSessionResult } from '../../services/progressStorage';
import { soundFx } from '../../game/engine/SoundController';
import { VirtualKeyboardWithHands, TypingKeyFlash } from './VirtualKeyboardWithHands';
import { TypingResultModal } from './TypingResultModal';
import { ArrowLeft, Lock, Check, Map, X, Sun, Moon } from 'lucide-react';

interface TypingDojoViewProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onExit: () => void;
  onStartParagraphMode: () => void;
}

const ROW_TYPE_ICON: Record<TypingLesson['rowType'], string> = {
  home: '🏠',
  top: '⬆️',
  bottom: '⬇️',
  numbers: '🔢',
  symbols: '✨',
  review: '🏆',
  words: '✍️',
  sentences: '📝',
  paragraph: '📖'
};

const getIsLessonUnlocked = (progress: UserProgress, index: number): boolean => {
  if (index === 0) return true;
  const prevLesson = TYPING_LESSONS[index - 1];
  return !!progress.typingProgress?.lessonProgressMap?.[prevLesson.id]?.isCompleted;
};

const getInitialLessonIndex = (progress: UserProgress): number => {
  for (let i = 0; i < TYPING_LESSONS.length; i++) {
    const isCompleted = progress.typingProgress?.lessonProgressMap?.[TYPING_LESSONS[i].id]?.isCompleted;
    if (!isCompleted) return i;
  }
  return TYPING_LESSONS.length - 1;
};

const getIsUnitUnlocked = (progress: UserProgress, unitOrder: number): boolean => {
  if (unitOrder === 0) return true;
  const prevUnit = TYPING_UNITS[unitOrder - 1];
  const lastLessonOfPrevUnit = TYPING_LESSONS[prevUnit.endOrder - 1];
  return !!progress.typingProgress?.lessonProgressMap?.[lastLessonOfPrevUnit.id]?.isCompleted;
};

const getUnitCompletedCount = (progress: UserProgress, unitOrder: number): number => {
  const unit = TYPING_UNITS[unitOrder];
  let count = 0;
  for (let i = unit.startOrder - 1; i < unit.endOrder; i++) {
    if (progress.typingProgress?.lessonProgressMap?.[TYPING_LESSONS[i].id]?.isCompleted) count++;
  }
  return count;
};

export const TypingDojoView: React.FC<TypingDojoViewProps> = ({
  progress,
  onUpdateProgress,
  onExit,
  onStartParagraphMode
}) => {
  const [lessonIndex, setLessonIndex] = useState<number>(() => getInitialLessonIndex(progress));
  const [activeUnit, setActiveUnit] = useState<number>(() => TYPING_LESSONS[getInitialLessonIndex(progress)].unit);
  const [showPicker, setShowPicker] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const [correctness, setCorrectness] = useState<boolean[]>([]);
  const [lastFlash, setLastFlash] = useState<TypingKeyFlash | null>(null);
  const [liveStats, setLiveStats] = useState<{ wpm: number; accuracy: number }>({ wpm: 0, accuracy: 100 });
  const [result, setResult] = useState<TypingSessionResult | null>(null);

  const lesson = TYPING_LESSONS[lessonIndex];
  const metricsRef = useRef(new TypingMetrics());
  const hasFinishedRef = useRef(false);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const lastInputRef = useRef<{ char: string; time: number }>({ char: '', time: 0 });

  // Reset drill state whenever the active lesson changes
  useEffect(() => {
    setTypedIndex(0);
    setCorrectness(new Array(lesson.practiceText.length).fill(false));
    setResult(null);
    setLiveStats({ wpm: 0, accuracy: 100 });
    hasFinishedRef.current = false;
    metricsRef.current.reset();
    metricsRef.current.startSession();
    const focusTimer = setTimeout(() => hiddenInputRef.current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(focusTimer);
  }, [lesson.id, lesson.practiceText]);

  // Theo dõi bài học hiện tại -> tự chuyển Unit hiển thị nếu bài mới thuộc Unit khác
  useEffect(() => {
    setActiveUnit(lesson.unit);
  }, [lesson.unit]);

  const finishLesson = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    const finalResult = metricsRef.current.getResult();
    setResult(finalResult);
    onUpdateProgress(prev =>
      recordTypingSessionResult(prev, {
        lessonId: lesson.id,
        wpm: finalResult.wpm,
        accuracy: finalResult.accuracy,
        mistakeKeys: finalResult.topMistakeKeys,
        minAccuracyToPass: lesson.minAccuracyToPass
      })
    );
  }, [lesson.id, lesson.minAccuracyToPass, onUpdateProgress]);

  const processChar = useCallback((rawChar: string) => {
    if (hasFinishedRef.current) return;
    const expectedChar = lesson.practiceText[typedIndex];
    if (expectedChar === undefined) return;

    const typed = rawChar.length === 1 ? rawChar.toLowerCase() : '';
    if (!typed) return;

    const isCorrect = metricsRef.current.recordKeystroke(expectedChar, typed);
    soundFx.playHit();
    if (!isCorrect) soundFx.playWrong();

    setCorrectness(prev => {
      const next = [...prev];
      next[typedIndex] = isCorrect;
      return next;
    });
    setLastFlash({ char: expectedChar, correct: isCorrect, nonce: Date.now() });
    setLiveStats({ wpm: metricsRef.current.computeCurrentWpm(), accuracy: metricsRef.current.computeCurrentAccuracy() });

    const nextIndex = typedIndex + 1;
    setTypedIndex(nextIndex);
    if (nextIndex >= lesson.practiceText.length) {
      finishLesson();
    }
  }, [lesson.practiceText, typedIndex, finishLesson]);

  const safeProcessChar = useCallback((rawChar: string) => {
    const lower = rawChar.toLowerCase();
    const now = performance.now();
    if (lastInputRef.current.char === lower && now - lastInputRef.current.time < 35) return;
    lastInputRef.current = { char: lower, time: now };
    processChar(rawChar);
  }, [processChar]);

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === ' ' || e.code === 'Space' || (e.key.length === 1 && /^[a-zA-Z0-9 ;,./!?'"\-]$/.test(e.key))) {
        e.preventDefault();
        safeProcessChar(e.key === ' ' || e.code === 'Space' ? ' ' : e.key);
        if (hiddenInputRef.current) hiddenInputRef.current.value = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeProcessChar]);

  const handleHiddenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    for (let i = 0; i < val.length; i++) safeProcessChar(val[i]);
    e.target.value = '';
  };

  const isFinalLesson = lessonIndex === TYPING_LESSONS.length - 1;
  const passed = result ? result.accuracy >= lesson.minAccuracyToPass : false;

  const handlePrimaryAction = () => {
    if (isFinalLesson && passed) {
      onStartParagraphMode();
      return;
    }
    if (passed && !isFinalLesson) {
      setLessonIndex(i => Math.min(i + 1, TYPING_LESSONS.length - 1));
      return;
    }
    // Chưa đạt ngưỡng: thử lại cùng bài
    setResult(null);
    setTypedIndex(0);
    setCorrectness(new Array(lesson.practiceText.length).fill(false));
    hasFinishedRef.current = false;
    metricsRef.current.reset();
    metricsRef.current.startSession();
  };

  const handleRetry = () => {
    setResult(null);
    setTypedIndex(0);
    setCorrectness(new Array(lesson.practiceText.length).fill(false));
    hasFinishedRef.current = false;
    metricsRef.current.reset();
    metricsRef.current.startSession();
  };

  const handleDismissResult = () => {
    setResult(null);
    setTypedIndex(0);
    setCorrectness(new Array(lesson.practiceText.length).fill(false));
    hasFinishedRef.current = false;
    metricsRef.current.reset();
    metricsRef.current.startSession();
    setShowPicker(true);
  };

  const nextChar = lesson.practiceText[typedIndex];

  const primaryLabel = isFinalLesson
    ? (passed ? 'VÀO ĐOẠN VĂN 📝' : 'THỬ LẠI')
    : (passed ? 'BÀI TIẾP THEO' : 'THỬ LẠI');

  const [isLight, setIsLight] = useState<boolean>(() => {
    const saved = localStorage.getItem('vocab_dojo_theme_mode');
    return saved !== null ? saved === 'light' : true;
  });

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    setIsLight((prev) => {
      const next = !prev;
      localStorage.setItem('vocab_dojo_theme_mode', next ? 'light' : 'dark');
      return next;
    });
  };

  return (
    <div
      className={`relative w-full h-full overflow-y-auto select-none font-game px-3 sm:px-8 py-4 sm:py-6 transition-colors duration-300 ${
        isLight
          ? 'bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 text-slate-800'
          : 'bg-space-dark text-white'
      }`}
      onClick={() => hiddenInputRef.current?.focus({ preventScroll: true })}
    >
      <input
        ref={hiddenInputRef}
        type="text"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        inputMode="text"
        aria-label="Nhập ký tự luyện gõ"
        className="absolute opacity-0 pointer-events-none w-px h-px"
        onChange={handleHiddenInputChange}
      />

      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-4 gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); soundFx.playClick(); onExit(); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition active:scale-95 shadow-sm ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold">Thoát</span>
          </button>

          {/* Quick Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={isLight ? 'Chuyển sang giao diện Tối' : 'Chuyển sang giao diện Sáng'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition active:scale-95 shadow-sm ${
              isLight
                ? 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200/80'
                : 'bg-slate-900/80 border-slate-700/80 text-yellow-300 hover:text-yellow-200 hover:border-yellow-400/50'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span className="text-xs sm:text-sm font-bold hidden xs:inline">{isLight ? 'Chế độ Tối' : 'Chế độ Sáng'}</span>
          </button>
        </div>

        <h1 className={`text-lg sm:text-2xl font-black font-orbitron tracking-wide ${
          isLight ? 'text-sky-800' : 'text-violet-300'
        }`}>
          ⌨️ Typing Dojo
        </h1>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
          <span className={`px-2.5 sm:px-3 py-1.5 rounded-lg border shadow-sm ${
            isLight
              ? 'bg-violet-50 border-violet-200 text-violet-700'
              : 'bg-violet-500/15 border-violet-400/40 text-violet-300'
          }`}>
            {Math.round(liveStats.wpm)} WPM
          </span>
          <span className={`px-2.5 sm:px-3 py-1.5 rounded-lg border shadow-sm ${
            isLight
              ? 'bg-cyan-50 border-cyan-200 text-cyan-700'
              : 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300'
          }`}>
            {Math.round(liveStats.accuracy)}%
          </span>
        </div>
      </div>

      {/* Progress — 1 dòng gọn: bài hiện tại, thanh tiến độ, nút mở Lộ Trình */}
      <div className="max-w-5xl mx-auto mb-5 flex items-center gap-2.5">
        <button
          onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setShowPicker(true); }}
          className={`flex-shrink-0 flex items-center gap-1.5 pl-2.5 pr-3 py-2 rounded-xl border transition active:scale-95 max-w-[55%] sm:max-w-xs shadow-sm ${
            isLight
              ? 'bg-white border-slate-300 text-slate-700 hover:text-sky-800 hover:border-sky-400'
              : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-violet-400/60'
          }`}
        >
          <Map className={`w-4 h-4 flex-shrink-0 ${isLight ? 'text-sky-600' : 'text-violet-400'}`} />
          <span className="text-xs sm:text-sm font-bold truncate">{lesson.titleVi}</span>
        </button>
        <div className={`flex-1 h-2.5 rounded-full border overflow-hidden ${
          isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-900 border-slate-800'
        }`}>
          <div
            className={`h-full transition-all duration-300 ${
              isLight
                ? 'bg-gradient-to-r from-sky-500 to-emerald-500'
                : 'bg-gradient-to-r from-violet-500 to-cyan-400'
            }`}
            style={{ width: `${(lesson.order / TYPING_LESSONS.length) * 100}%` }}
          />
        </div>
        <span className={`flex-shrink-0 text-[11px] sm:text-xs font-bold ${
          isLight ? 'text-slate-600' : 'text-slate-500'
        }`}>
          {lesson.order}/{TYPING_LESSONS.length}
        </span>
      </div>

      {/* Practice Text Box */}
      <div className={`max-w-5xl mx-auto rounded-3xl p-5 sm:p-8 mb-5 transition-colors ${
        isLight
          ? 'bg-white border-2 border-slate-200/90 shadow-xl'
          : 'bg-slate-950/70 border border-slate-800/80 shadow-inner'
      }`}>
        <p className="font-mono text-xl sm:text-3xl md:text-4xl tracking-wide leading-relaxed text-center break-all select-none">
          {lesson.practiceText.split('').map((ch, i) => {
            let cls = isLight ? 'text-slate-400' : 'text-slate-500';
            if (i < typedIndex) {
              cls = correctness[i]
                ? (isLight ? 'text-emerald-600 font-bold' : 'text-emerald-400')
                : (isLight ? 'text-rose-600 font-bold underline decoration-wavy decoration-rose-500' : 'text-rose-400 underline decoration-wavy decoration-rose-500');
            } else if (i === typedIndex) {
              cls = isLight
                ? 'text-sky-950 bg-sky-200/90 rounded px-1 ring-2 ring-sky-400/60 font-black animate-pulse'
                : 'text-white bg-cyan-500/30 rounded px-1 ring-1 ring-cyan-300 animate-pulse';
            }
            return (
              <span key={i} className={cls}>
                {ch === ' ' ? ' ' : ch}
              </span>
            );
          })}
        </p>
      </div>

      {/* Virtual Keyboard With Hands */}
      <div className="max-w-5xl mx-auto pb-6">
        <VirtualKeyboardWithHands nextChar={nextChar} lastFlash={lastFlash} isLight={isLight} />
      </div>

      {showPicker && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-150 ${
            isLight ? 'bg-slate-900/50' : 'bg-black/80'
          }`}
          onClick={() => setShowPicker(false)}
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-4 max-h-[85vh] flex flex-col shadow-2xl transition-colors ${
              isLight ? 'bg-white border-2 border-slate-200 text-slate-800' : 'bg-slate-950 border border-slate-800 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <h2 className={`text-sm sm:text-base font-black font-orbitron tracking-wide ${
                isLight ? 'text-slate-900' : 'text-violet-300'
              }`}>
                Lộ Trình Luyện Gõ
              </h2>
              <button
                onClick={() => { soundFx.playClick(); setShowPicker(false); }}
                className={`p-1.5 rounded-lg transition ${
                  isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Units */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 flex-shrink-0">
              {TYPING_UNITS.map((u) => {
                const unlocked = getIsUnitUnlocked(progress, u.order);
                const completedCount = unlocked ? getUnitCompletedCount(progress, u.order) : 0;
                const isFull = completedCount === u.lessonCount;
                const isActive = u.order === activeUnit;
                return (
                  <button
                    key={u.id}
                    disabled={!unlocked}
                    onClick={() => { if (!unlocked) return; soundFx.playClick(); setActiveUnit(u.order); }}
                    title={u.titleVi}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 transition ${
                      isLight
                        ? (isActive
                            ? 'bg-violet-100 border-violet-500 shadow-sm'
                            : isFull
                              ? 'bg-emerald-50 border-emerald-400 hover:bg-emerald-100'
                              : unlocked
                                ? 'bg-slate-100 border-slate-300 hover:bg-slate-200 hover:border-slate-400'
                                : 'bg-slate-100/70 border-slate-200 opacity-50 cursor-not-allowed')
                        : (isActive
                            ? 'bg-violet-500/25 border-violet-400 shadow-lg'
                            : isFull
                              ? 'bg-emerald-500/15 border-emerald-500/50'
                              : unlocked
                                ? 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
                                : 'bg-slate-950/60 border-slate-800 opacity-50 cursor-not-allowed')
                    }`}
                  >
                    <span className="text-sm sm:text-base">
                      {!unlocked ? (
                        <Lock className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                      ) : (
                        u.icon
                      )}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-bold whitespace-nowrap ${
                      isLight
                        ? (isActive ? 'text-violet-950 font-black' : isFull ? 'text-emerald-950' : unlocked ? 'text-slate-800' : 'text-slate-400')
                        : (isActive ? 'text-violet-200 font-black' : isFull ? 'text-emerald-200' : unlocked ? 'text-slate-300' : 'text-slate-500')
                    }`}>
                      {u.titleVi}
                    </span>
                    {unlocked && (
                      <span className={`text-[10px] font-black ${
                        isFull
                          ? (isLight ? 'text-emerald-700' : 'text-emerald-400')
                          : (isLight ? 'text-slate-500' : 'text-slate-400')
                      }`}>
                        {completedCount}/{u.lessonCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Lessons trong Unit đang chọn */}
            <div className="flex flex-wrap content-start gap-2 overflow-y-auto">
              {TYPING_LESSONS.slice(TYPING_UNITS[activeUnit].startOrder - 1, TYPING_UNITS[activeUnit].endOrder).map((l) => {
                const idx = l.order - 1;
                const unlocked = getIsLessonUnlocked(progress, idx);
                const isCompleted = !!progress.typingProgress?.lessonProgressMap?.[l.id]?.isCompleted;
                const isCurrent = idx === lessonIndex;
                return (
                  <button
                    key={l.id}
                    disabled={!unlocked}
                    onClick={() => {
                      if (!unlocked) return;
                      soundFx.playClick();
                      setLessonIndex(idx);
                      setShowPicker(false);
                    }}
                    title={l.titleVi}
                    className={`flex flex-col items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl border-2 transition ${
                      isLight
                        ? (isCurrent
                            ? 'bg-violet-100 border-violet-500 shadow-md ring-2 ring-violet-300/60 scale-105'
                            : isCompleted
                              ? 'bg-emerald-50/90 border-emerald-400 hover:bg-emerald-100/90 hover:border-emerald-500 shadow-sm'
                              : unlocked
                                ? 'bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm'
                                : 'bg-slate-100/70 border-slate-200 opacity-50 cursor-not-allowed')
                        : (isCurrent
                            ? 'bg-violet-500/25 border-violet-400 scale-105 shadow-lg'
                            : isCompleted
                              ? 'bg-emerald-500/15 border-emerald-500/50'
                              : unlocked
                                ? 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
                                : 'bg-slate-950/60 border-slate-800 opacity-50 cursor-not-allowed')
                    }`}
                  >
                    <span className="text-base sm:text-lg">
                      {!unlocked ? (
                        <Lock className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                      ) : isCompleted ? (
                        <Check className={`w-4 h-4 ${isLight ? 'text-emerald-700 stroke-[3]' : 'text-emerald-400 stroke-[2.5]'}`} />
                      ) : (
                        ROW_TYPE_ICON[l.rowType]
                      )}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-bold hidden sm:block ${
                      isLight
                        ? (isCurrent
                            ? 'text-violet-950 font-black'
                            : isCompleted
                              ? 'text-emerald-950 font-extrabold'
                              : unlocked
                                ? 'text-slate-800'
                                : 'text-slate-400')
                        : (isCurrent
                            ? 'text-violet-200'
                            : isCompleted
                              ? 'text-emerald-200'
                              : unlocked
                                ? 'text-slate-200'
                                : 'text-slate-500')
                    }`}>
                      {l.titleVi}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {result && (
        <TypingResultModal
          title={lesson.titleVi}
          wpm={result.wpm}
          accuracy={result.accuracy}
          passed={passed}
          minAccuracyToPass={lesson.minAccuracyToPass}
          topMistakeKeys={result.topMistakeKeys}
          primaryActionLabel={primaryLabel}
          onPrimaryAction={handlePrimaryAction}
          onRetry={handleRetry}
          onExit={handleDismissResult}
          exitLabel="DANH SÁCH BÀI"
          exitIcon={<Map className="w-4 h-4 text-violet-400" />}
          userName={progress.userName}
          gender={progress.gender}
          themeStyle={progress.themeStyle}
          mascotId={progress.mascotId}
          isLight={isLight}
        />
      )}
    </div>
  );
};
