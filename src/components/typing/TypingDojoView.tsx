import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserProgress } from '../../data/progress-types';
import { TYPING_LESSONS, TYPING_UNITS } from '../../data/typing-curriculum';
import { TypingMetrics, TypingSessionResult } from '../../game/engine/TypingMetrics';
import { recordTypingSessionResult } from '../../services/progressStorage';
import { soundFx } from '../../game/engine/SoundController';
import { VirtualKeyboardWithHands, TypingKeyFlash } from './VirtualKeyboardWithHands';
import { TypingResultModal } from './TypingResultModal';
import { TypingSagaMapView } from './TypingSagaMapView';
import { ArrowLeft, Sun, Moon, Map, Zap, Target, Sparkles } from 'lucide-react';

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
    return saved !== null ? saved === 'light' : false; // Mặc định dark mode cho vũ trụ
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
      className={`relative w-full h-full overflow-y-auto no-scrollbar select-none font-game px-3 sm:px-6 py-3 sm:py-5 transition-colors duration-300 ${
        isLight
          ? 'bg-daybreak-sunny text-slate-900'
          : 'bg-[#08091a] bg-galactic-stars text-white'
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

      {/* 1. Top Bar — Sleek Cyber-Arcade Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto mb-3 gap-2">
        <div className="flex items-center gap-2">
          {/* Back to Saga Map */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              setViewMode('saga');
            }}
            className={`btn-3d flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black ${
              isLight
                ? 'btn-3d-slate bg-white text-slate-800 border-b-4 border-slate-300'
                : 'btn-3d-slate bg-slate-900 text-slate-200 border-b-4 border-slate-950'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bold">Lộ Trình</span>
          </button>

          {/* Quick Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={isLight ? 'Chuyển sang giao diện Tối' : 'Chuyển sang giao diện Sáng'}
            className={`p-2 rounded-xl border-2 transition active:scale-95 shadow-sm ${
              isLight
                ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                : 'bg-slate-900 border-slate-700 text-yellow-300 hover:border-yellow-400/50'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4 text-indigo-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>

        {/* Current Lesson Badge */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3.5 py-1.5 rounded-xl border-2 shadow-md flex items-center gap-2 max-w-[220px] sm:max-w-md ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-slate-900/90 border-cyan-500/40 text-cyan-200'
            }`}
          >
            <span className="text-base">{currentUnit?.icon || '⌨️'}</span>
            <span className="text-xs sm:text-sm font-black truncate font-game">
              Bài {lesson.order}: {lesson.titleVi}
            </span>
          </div>
        </div>

        {/* Live Tachometer Metrics */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
          {/* WPM Meter */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 shadow-sm font-orbitron ${
              isLight
                ? 'bg-violet-50 border-violet-300 text-violet-900'
                : 'bg-violet-950/60 border-violet-500/60 text-violet-200 shadow-violet-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-violet-400 stroke-[3]" />
            <span>{Math.round(liveStats.wpm)} WPM</span>
          </div>

          {/* Accuracy Meter */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 shadow-sm font-orbitron ${
              isLight
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 shadow-emerald-500/20'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            <span>{Math.round(liveStats.accuracy)}%</span>
          </div>
        </div>
      </div>

      {/* 2. Progress Bar within Curriculum */}
      <div className="max-w-4xl mx-auto mb-3 flex items-center gap-2.5">
        <div
          className={`flex-1 h-2.5 rounded-full border-2 overflow-hidden ${
            isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-900 border-slate-700/80'
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-400 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${(lesson.order / TYPING_LESSONS.length) * 100}%` }}
          />
        </div>
        <span
          className={`flex-shrink-0 text-xs font-black font-orbitron ${
            isLight ? 'text-slate-700' : 'text-slate-400'
          }`}
        >
          {lesson.order}/{TYPING_LESSONS.length}
        </span>
      </div>

      {/* 3. High-Contrast Practice Text Box (Giải quyết triệt để chữ và nền khó đọc) */}
      <div
        className={`max-w-4xl mx-auto rounded-3xl p-5 sm:p-6 mb-4 transition-all ${
          isLight
            ? 'dojo-card-light'
            : 'dojo-card-dark'
        }`}
      >
        {/* Hướng dẫn phím trọng tâm của bài */}
        {lesson.keys.length > 0 && (
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-dashed border-slate-300/40 dark:border-slate-700/60 text-xs">
            <span className={`font-black flex items-center gap-1.5 ${
              isLight ? 'text-cyan-800' : 'text-cyan-300'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Phím trọng tâm bài này:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {lesson.keys.map((k) => (
                <span
                  key={k}
                  className="px-2 py-0.5 rounded-lg bg-amber-400/20 border border-amber-400/60 text-amber-500 font-orbitron font-black text-xs uppercase"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bảng chữ luyện gõ Teleprompter */}
        <div className="font-mono text-xl sm:text-3xl md:text-4xl tracking-wider leading-relaxed text-center select-none py-1">
          {lesson.practiceText.split('').map((ch, i) => {
            const isDone = i < typedIndex;
            const isCur = i === typedIndex;

            if (isCur) {
              // Phím đang cần gõ tiếp theo
              if (ch === ' ') {
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 mx-1.5 px-2.5 py-0.5 rounded-xl bg-amber-400/30 text-amber-500 border-2 border-amber-400 font-game font-black text-xs sm:text-sm animate-pulse align-middle shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                  >
                    ␣ CÁCH
                  </span>
                );
              }

              return (
                <span
                  key={i}
                  className={`inline-block px-2 py-0.5 rounded-xl font-black font-orbitron animate-pulse align-middle transition-all scale-110 shadow-lg ${
                    isLight
                      ? 'text-sky-950 bg-sky-200 border-2 border-sky-500 ring-2 ring-sky-300 shadow-sky-500/20'
                      : 'text-white bg-cyan-500/40 border-2 border-cyan-300 ring-2 ring-cyan-400/80 shadow-[0_0_18px_rgba(0,240,255,0.8)]'
                  }`}
                >
                  {ch}
                </span>
              );
            }

            if (isDone) {
              const ok = correctness[i];
              return (
                <span
                  key={i}
                  className={`transition-colors ${
                    ok
                      ? (isLight
                          ? 'text-emerald-700 font-black'
                          : 'text-emerald-400 font-black drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]')
                      : (isLight
                          ? 'text-rose-600 font-black bg-rose-100 rounded px-0.5 underline decoration-wavy decoration-rose-500'
                          : 'text-rose-400 font-black bg-rose-950/50 rounded px-0.5 underline decoration-wavy decoration-rose-500')
                  }`}
                >
                  {ch === ' ' ? ' ' : ch}
                </span>
              );
            }

            // Ký tự chưa gõ tới — Độ tương phản cao, không bị mờ
            return (
              <span
                key={i}
                className={`font-semibold ${
                  isLight
                    ? 'text-slate-800'
                    : 'text-slate-300/90'
                }`}
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            );
          })}
        </div>
      </div>

      {/* 4. Virtual Keyboard With Hands */}
      <div className="max-w-4xl mx-auto pb-4">
        <VirtualKeyboardWithHands nextChar={nextChar} lastFlash={lastFlash} isLight={isLight} />
      </div>

      {/* 5. Results Modal */}
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
          exitIcon={<Map className="w-4 h-4 text-cyan-400" />}
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
