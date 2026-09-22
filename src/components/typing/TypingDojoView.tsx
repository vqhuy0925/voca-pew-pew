import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserProgress } from '../../data/progress-types';
import { TYPING_LESSONS, TypingLesson } from '../../data/typing-curriculum';
import { TypingMetrics, TypingSessionResult } from '../../game/engine/TypingMetrics';
import { recordTypingSessionResult } from '../../services/progressStorage';
import { soundFx } from '../../game/engine/SoundController';
import { VirtualKeyboardWithHands, TypingKeyFlash } from './VirtualKeyboardWithHands';
import { TypingResultModal } from './TypingResultModal';
import { ArrowLeft, Lock, Check } from 'lucide-react';

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
  short_words: '✍️',
  paragraph: '📝'
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

export const TypingDojoView: React.FC<TypingDojoViewProps> = ({
  progress,
  onUpdateProgress,
  onExit,
  onStartParagraphMode
}) => {
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

  const nextChar = lesson.practiceText[typedIndex];

  const primaryLabel = isFinalLesson
    ? (passed ? 'VÀO ĐOẠN VĂN 📝' : 'THỬ LẠI')
    : (passed ? 'BÀI TIẾP THEO' : 'THỬ LẠI');

  return (
    <div
      className="relative w-full h-full overflow-y-auto bg-space-dark select-none font-game text-white px-3 sm:px-6 py-4 sm:py-6"
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
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-4">
        <button
          onClick={(e) => { e.stopPropagation(); soundFx.playClick(); onExit(); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold">Thoát</span>
        </button>
        <h1 className="text-lg sm:text-2xl font-black font-orbitron tracking-wide text-violet-300">
          ⌨️ Typing Dojo
        </h1>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
          <span className="px-2.5 py-1.5 rounded-lg bg-violet-500/15 border border-violet-400/40 text-violet-300">
            {Math.round(liveStats.wpm)} WPM
          </span>
          <span className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
            {Math.round(liveStats.accuracy)}%
          </span>
        </div>
      </div>

      {/* Lesson Progress Dots */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto mb-5">
        {TYPING_LESSONS.map((l, idx) => {
          const unlocked = getIsLessonUnlocked(progress, idx);
          const isCompleted = !!progress.typingProgress?.lessonProgressMap?.[l.id]?.isCompleted;
          const isCurrent = idx === lessonIndex;
          return (
            <button
              key={l.id}
              disabled={!unlocked}
              onClick={(e) => {
                e.stopPropagation();
                if (!unlocked) return;
                soundFx.playClick();
                setLessonIndex(idx);
              }}
              title={l.titleVi}
              className={`flex flex-col items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl border-2 transition ${
                isCurrent
                  ? 'bg-violet-500/25 border-violet-400 scale-105 shadow-lg'
                  : isCompleted
                    ? 'bg-emerald-500/15 border-emerald-500/50'
                    : unlocked
                      ? 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
                      : 'bg-slate-950/60 border-slate-800 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="text-base sm:text-lg">
                {!unlocked ? <Lock className="w-4 h-4 text-slate-500" /> : isCompleted ? <Check className="w-4 h-4 text-emerald-400" /> : ROW_TYPE_ICON[l.rowType]}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-300 hidden sm:block">{l.titleVi}</span>
            </button>
          );
        })}
      </div>

      {/* Practice Text */}
      <div className="max-w-3xl mx-auto mb-2 text-center">
        <p className="text-sm sm:text-base text-slate-400 font-bold mb-2">{lesson.titleVi}</p>
      </div>
      <div className="max-w-3xl mx-auto bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-6 mb-5">
        <p className="font-mono text-lg sm:text-2xl md:text-3xl tracking-wide leading-relaxed text-center break-all">
          {lesson.practiceText.split('').map((ch, i) => {
            let cls = 'text-slate-500';
            if (i < typedIndex) {
              cls = correctness[i] ? 'text-emerald-400' : 'text-rose-400 underline decoration-wavy decoration-rose-500';
            } else if (i === typedIndex) {
              cls = 'text-white bg-cyan-500/30 rounded animate-pulse';
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
      <div className="max-w-3xl mx-auto pb-6">
        <VirtualKeyboardWithHands nextChar={nextChar} lastFlash={lastFlash} />
      </div>

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
          onExit={onExit}
          userName={progress.userName}
          gender={progress.gender}
          themeStyle={progress.themeStyle}
          mascotId={progress.mascotId}
        />
      )}
    </div>
  );
};
