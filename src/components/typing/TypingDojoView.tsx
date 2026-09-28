import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserProgress } from '../../data/progress-types';
import { TYPING_LESSONS, TYPING_UNITS } from '../../data/typing-curriculum';
import { TypingMetrics, TypingSessionResult } from '../../game/engine/TypingMetrics';
import { recordTypingSessionResult } from '../../services/progressStorage';
import { soundFx } from '../../game/engine/SoundController';
import { VirtualKeyboardWithHands, TypingKeyFlash } from './VirtualKeyboardWithHands';
import { TypingResultModal } from './TypingResultModal';
import { TypingSagaMapView } from './TypingSagaMapView';
import { ArrowLeft, Sun, Moon, Map } from 'lucide-react';

interface TypingDojoViewProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onExit: () => void;
  onStartParagraphMode: () => void;
}

const getInitialLessonIndex = (progress: UserProgress): number => {
  for (let i = 0; i < TYPING_LESSONS.length; i++) {
    const isCompleted = progress.typingProgress?.lessonProgressMap?.[TYPING_LESSONS[i].id]?.isCompleted;
    if (!isCompleted) return i;
  }
  return TYPING_LESSONS.length - 1;
};

export const TypingDojoView: React.FC<TypingDojoViewProps> = ({
  progress,
  onUpdateProgress,
  onExit,
  onStartParagraphMode
}) => {
  const [viewMode, setViewMode] = useState<'saga' | 'drill'>('saga');
  const [lessonIndex, setLessonIndex] = useState<number>(() => getInitialLessonIndex(progress));
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

  // Light / Dark mode persistence
  const [isLight, setIsLight] = useState<boolean>(() => {
    const saved = localStorage.getItem('vocab_dojo_theme_mode');
    return saved !== null ? saved === 'light' : true;
  });

  const toggleTheme = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundFx.playClick();
    setIsLight((prev) => {
      const next = !prev;
      localStorage.setItem('vocab_dojo_theme_mode', next ? 'light' : 'dark');
      return next;
    });
  };

  // Reset drill state whenever active lesson or viewMode changes
  useEffect(() => {
    if (viewMode !== 'drill') return;
    setTypedIndex(0);
    setCorrectness(new Array(lesson.practiceText.length).fill(false));
    setResult(null);
    setLiveStats({ wpm: 0, accuracy: 100 });
    hasFinishedRef.current = false;
    metricsRef.current.reset();
    metricsRef.current.startSession();
    const focusTimer = setTimeout(() => hiddenInputRef.current?.focus({ preventScroll: true }), 80);
    return () => clearTimeout(focusTimer);
  }, [lesson.id, lesson.practiceText, viewMode]);

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

  // Physical keyboard listener (active only in drill mode)
  useEffect(() => {
    if (viewMode !== 'drill') return;
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
  }, [viewMode, safeProcessChar]);

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
    setViewMode('saga');
  };

  const nextChar = lesson.practiceText[typedIndex];

  const primaryLabel = isFinalLesson
    ? (passed ? 'VÀO ĐOẠN VĂN 📝' : 'THỬ LẠI')
    : (passed ? 'BÀI TIẾP THEO 🚀' : 'THỬ LẠI');

  // ==========================================
  // MODE 1: SAGA JOURNEY MAP VIEW (BẢN ĐỒ LỘ TRÌNH)
  // ==========================================
  if (viewMode === 'saga') {
    return (
      <TypingSagaMapView
        progress={progress}
        currentLessonIndex={lessonIndex}
        onSelectLesson={(idx) => {
          setLessonIndex(idx);
          setViewMode('drill');
        }}
        onExit={onExit}
        onStartParagraphMode={onStartParagraphMode}
        isLight={isLight}
        onToggleTheme={() => toggleTheme()}
      />
    );
  }

  // ==========================================
  // MODE 2: DRILL VIEW (TẬP TRUNG LUYỆN GÕ PHÍM)
  // ==========================================
  const currentUnit = TYPING_UNITS[lesson.unit];

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

      {/* Top Bar — Sleek & Focused */}
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-4 gap-2">
        <div className="flex items-center gap-2">
          {/* Back to Saga Map */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              setViewMode('saga');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl border transition active:scale-95 shadow-xs ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-bold">Lộ Trình</span>
          </button>

          {/* Quick Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={isLight ? 'Chuyển sang giao diện Tối' : 'Chuyển sang giao diện Sáng'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition active:scale-95 shadow-xs ${
              isLight
                ? 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200/80'
                : 'bg-slate-900/80 border-slate-700/80 text-yellow-300 hover:text-yellow-200 hover:border-yellow-400/50'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>

        {/* Current Lesson Badge */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-xl border shadow-xs flex items-center gap-1.5 max-w-[200px] sm:max-w-md ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-slate-900/90 border-slate-700/80 text-white'
          }`}>
            <span className="text-sm">{currentUnit?.icon || '⌨️'}</span>
            <span className="text-xs sm:text-sm font-bold truncate">
              Bài {lesson.order}: {lesson.titleVi}
            </span>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black">
          <span className={`px-2.5 sm:px-3 py-1.5 rounded-lg border shadow-xs ${
            isLight
              ? 'bg-violet-50 border-violet-200 text-violet-700'
              : 'bg-violet-500/15 border-violet-400/40 text-violet-300'
          }`}>
            {Math.round(liveStats.wpm)} WPM
          </span>
          <span className={`px-2.5 sm:px-3 py-1.5 rounded-lg border shadow-xs ${
            isLight
              ? 'bg-cyan-50 border-cyan-200 text-cyan-700'
              : 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300'
          }`}>
            {Math.round(liveStats.accuracy)}%
          </span>
        </div>
      </div>

      {/* Progress Bar within Curriculum */}
      <div className="max-w-5xl mx-auto mb-4 flex items-center gap-2.5">
        <div className={`flex-1 h-2 rounded-full border overflow-hidden ${
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

      {/* Results Modal */}
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
          exitLabel="LỘ TRÌNH SAGA"
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
