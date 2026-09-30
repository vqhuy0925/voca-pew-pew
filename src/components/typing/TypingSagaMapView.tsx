import React, { useEffect, useRef, useState, useMemo } from 'react';
import { UserProgress } from '../../data/progress-types';
import { TYPING_LESSONS, TYPING_UNITS, TypingLesson } from '../../data/typing-curriculum';
import { TypingSagaNode } from './TypingSagaNode';
import { ArrowLeft, BookOpen, Sun, Moon, Lock, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';

interface TypingSagaMapViewProps {
  progress: UserProgress;
  currentLessonIndex: number;
  onSelectLesson: (lessonIndex: number) => void;
  onExit: () => void;
  onStartParagraphMode: () => void;
  isLight: boolean;
  onToggleTheme: () => void;
}

// Zigzag offsets for winding saga path (minimalist, kid-friendly)
const ZIGZAG_OFFSETS = [0, 32, 56, 32, 0, -32, -56, -32];

export const TypingSagaMapView: React.FC<TypingSagaMapViewProps> = ({
  progress,
  currentLessonIndex,
  onSelectLesson,
  onExit,
  onStartParagraphMode,
  isLight,
  onToggleTheme
}) => {
  const unitRefs = useRef<Record<string, HTMLElement | null>>({});
  const currentLessonRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeUnitId, setActiveUnitId] = useState<string>(TYPING_UNITS[0].id);

  // Lesson status helpers
  const lessonProgressMap = progress.typingProgress?.lessonProgressMap || {};

  const isLessonUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    const prevLesson = TYPING_LESSONS[index - 1];
    return !!lessonProgressMap[prevLesson.id]?.isCompleted;
  };

  const isUnitUnlocked = (unitOrder: number): boolean => {
    if (unitOrder === 0) return true;
    const prevUnit = TYPING_UNITS[unitOrder - 1];
    const lastLessonOfPrevUnit = TYPING_LESSONS[prevUnit.endOrder - 1];
    return !!lessonProgressMap[lastLessonOfPrevUnit.id]?.isCompleted;
  };

  const getUnitCompletedCount = (unitOrder: number): number => {
    const unit = TYPING_UNITS[unitOrder];
    let count = 0;
    for (let i = unit.startOrder - 1; i < unit.endOrder; i++) {
      if (lessonProgressMap[TYPING_LESSONS[i].id]?.isCompleted) count++;
    }
    return count;
  };

  const totalCompletedCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < TYPING_LESSONS.length; i++) {
      if (lessonProgressMap[TYPING_LESSONS[i].id]?.isCompleted) count++;
    }
    return count;
  }, [lessonProgressMap]);

  const allCompleted = totalCompletedCount >= TYPING_LESSONS.length;

  // Auto-scroll to current active lesson node on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLessonRef.current) {
        currentLessonRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleJumpToUnit = (unitId: string) => {
    soundFx.playClick();
    setActiveUnitId(unitId);
    const el = unitRefs.current[unitId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-y-auto select-none font-game transition-colors duration-300 ${
        isLight
          ? 'bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 text-slate-800'
          : 'bg-space-dark text-white'
      }`}
    >
      {/* 1. Header — Sleek, Clean, "Less is More" */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isLight
          ? 'bg-white/90 border-slate-200/90 shadow-xs'
          : 'bg-slate-950/85 border-slate-800/80 shadow-md'
      }`}>
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          {/* Back Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onExit();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl border transition active:scale-95 text-xs sm:text-sm font-bold shadow-xs ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Về Vũ Trụ</span>
            <span className="xs:hidden">Thoát</span>
          </button>

          {/* Center Title & Global Progress */}
          <div className="flex flex-col items-center min-w-0">
            <h1 className={`text-base sm:text-xl font-black font-orbitron tracking-wide truncate ${
              isLight ? 'text-slate-900' : 'text-violet-300'
            }`}>
              ⌨️ Lộ Trình Gõ Phím
            </h1>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold">
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                Đã hoàn thành {totalCompletedCount}/{TYPING_LESSONS.length} bài
              </span>
              <div className={`w-16 sm:w-24 h-1.5 rounded-full overflow-hidden ${
                isLight ? 'bg-slate-200' : 'bg-slate-800'
              }`}>
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((totalCompletedCount / TYPING_LESSONS.length) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Actions: Paragraph Mode & Theme Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                onStartParagraphMode();
              }}
              title="Chuyển sang chế độ gõ đoạn văn tự do"
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition active:scale-95 text-xs sm:text-sm font-bold shadow-xs ${
                isLight
                  ? 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100'
                  : 'bg-violet-500/20 border-violet-400/40 text-violet-300 hover:bg-violet-500/30'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-500" />
              <span className="hidden sm:inline">Đoạn Văn</span>
            </button>

            <button
              onClick={onToggleTheme}
              title={isLight ? 'Chế độ Tối' : 'Chế độ Sáng'}
              aria-label="Đổi giao diện Sáng / Tối"
              className={`p-2 rounded-xl border transition active:scale-95 shadow-xs ${
                isLight
                  ? 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200/80'
                  : 'bg-slate-900/80 border-slate-700/80 text-yellow-300 hover:border-yellow-400/50'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* 2. Unit Quick Jump Ribbon */}
        <div className="max-w-4xl mx-auto px-3 sm:px-6 pb-2 pt-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {TYPING_UNITS.map((unit) => {
            const unlocked = isUnitUnlocked(unit.order);
            const count = unlocked ? getUnitCompletedCount(unit.order) : 0;
            const isFull = count === unit.lessonCount;
            const isActive = unit.id === activeUnitId;

            return (
              <button
                key={unit.id}
                disabled={!unlocked}
                onClick={() => handleJumpToUnit(unit.id)}
                title={unit.titleVi}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold active:scale-95 shadow-2xs ${
                  !unlocked
                    ? (isLight
                        ? 'bg-slate-100/80 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'bg-slate-900/50 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed')
                    : isActive
                      ? (isLight
                          ? 'bg-violet-100 border-violet-500 text-violet-950 font-black shadow-xs ring-2 ring-violet-300/40'
                          : 'bg-violet-500/25 border-violet-400 text-violet-200 font-black shadow-md ring-1 ring-violet-400/50')
                      : isFull
                        ? (isLight
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                            : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25')
                        : (isLight
                            ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                            : 'bg-slate-900/70 border-slate-700 text-slate-300 hover:border-slate-500')
                }`}
              >
                <span>{unlocked ? unit.icon : <Lock className="w-3 h-3 text-slate-400" />}</span>
                <span className="whitespace-nowrap">{unit.titleVi}</span>
                {unlocked && (
                  <span className={`text-[10px] font-black ml-0.5 ${
                    isFull
                      ? (isLight ? 'text-emerald-700' : 'text-emerald-400')
                      : (isLight ? 'text-slate-500' : 'text-slate-400')
                  }`}>
                    {count}/{unit.lessonCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* 3. Main Saga Road Container */}
      <main className="max-w-xl mx-auto px-4 py-8 flex flex-col items-center">
        {TYPING_UNITS.map((unit) => {
          const unlocked = isUnitUnlocked(unit.order);
          const count = unlocked ? getUnitCompletedCount(unit.order) : 0;
          const isFull = count === unit.lessonCount;
          const lessonsInUnit = TYPING_LESSONS.slice(unit.startOrder - 1, unit.endOrder);

          return (
            <section
              key={unit.id}
              ref={(el) => {
                unitRefs.current[unit.id] = el;
              }}
              className="relative w-full scroll-mt-28 mb-10"
            >
              {/* Unit Chapter Banner — Clean & Tactile */}
              <div className={`flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border backdrop-blur-md shadow-sm mb-6 transition-all ${
                !unlocked
                  ? (isLight
                      ? 'bg-slate-100/90 border-slate-200 text-slate-400 opacity-70'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-600 opacity-60')
                  : isFull
                    ? (isLight
                        ? 'bg-emerald-50/90 border-emerald-300 text-slate-800'
                        : 'bg-emerald-950/30 border-emerald-600/40 text-emerald-200')
                    : (isLight
                        ? 'bg-white/95 border-slate-300 text-slate-800 shadow-sm'
                        : 'bg-slate-900/80 border-slate-700/80 text-white')
              }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl sm:text-3xl flex-shrink-0 drop-shadow-xs">
                    {unlocked ? unit.icon : '🔒'}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider ${
                        isLight ? 'text-violet-600' : 'text-violet-400'
                      }`}>
                        Trạm {unit.order + 1}
                      </span>
                      {isFull && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline flex-shrink-0" />
                      )}
                    </div>
                    <h2 className="text-sm sm:text-base font-black truncate leading-tight">
                      {unit.titleVi}
                    </h2>
                  </div>
                </div>

                <div className={`px-2.5 py-1 rounded-xl text-xs font-black border flex-shrink-0 shadow-2xs ${
                  isFull
                    ? (isLight
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40')
                    : (isLight
                        ? 'bg-slate-100 text-slate-700 border-slate-300'
                        : 'bg-slate-800 text-slate-300 border-slate-700')
                }`}>
                  {count}/{unit.lessonCount}
                </div>
              </div>

              {/* Road of Level Nodes */}
              <div className="relative flex flex-col items-center">
                {/* Central Road Connecting Line */}
                <div
                  className={`absolute top-6 bottom-6 w-2 sm:w-2.5 rounded-full z-0 transition-colors ${
                    isLight
                      ? 'bg-slate-300/80 border border-slate-300'
                      : 'bg-slate-800/80 border border-slate-700/50'
                  }`}
                />

                {lessonsInUnit.map((lesson, lIdx) => {
                  const globalIdx = lesson.order - 1;
                  const offset = ZIGZAG_OFFSETS[globalIdx % ZIGZAG_OFFSETS.length];
                  const unlockedLesson = isLessonUnlocked(globalIdx);
                  const isCurrent = globalIdx === currentLessonIndex;

                  return (
                    <div
                      key={lesson.id}
                      ref={isCurrent ? currentLessonRef : null}
                      className="relative z-10"
                    >
                      <TypingSagaNode
                        lesson={lesson}
                        progress={lessonProgressMap[lesson.id]}
                        isUnlocked={unlockedLesson}
                        isCurrent={isCurrent}
                        onSelect={() => onSelectLesson(globalIdx)}
                        offsetX={offset}
                        isLight={isLight}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* 4. Curriculum Completion / Congratulations Card */}
        {allCompleted && (
          <div className={`w-full mt-6 p-6 rounded-3xl border-2 text-center shadow-xl transition-all ${
            isLight
              ? 'bg-gradient-to-b from-amber-50 to-amber-100/80 border-amber-300 text-amber-950'
              : 'bg-gradient-to-b from-amber-500/15 via-slate-900/90 to-amber-950/20 border-amber-400/80 text-white'
          }`}>
            <div className="text-4xl sm:text-5xl mb-2 drop-shadow-sm">🏆</div>
            <h3 className={`font-orbitron font-black text-lg sm:text-xl mb-1.5 ${
              isLight ? 'text-amber-800' : 'text-amber-300'
            }`}>
              BẠN ĐÃ CHINH PHỤC TOÀN BỘ LỘ TRÌNH!
            </h3>
            <p className={`text-xs sm:text-sm font-semibold max-w-md mx-auto mb-4 ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Tuyệt đỉnh! Bạn đã làm chủ toàn bộ các phím, từ ngữ và câu văn. Hãy chuyển sang chế độ Đoạn Văn để rèn luyện độ bền và tốc độ đỉnh cao.
            </p>
            <button
              onClick={() => {
                soundFx.playVictory();
                onStartParagraphMode();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black rounded-xl shadow-md active:scale-95 transition cursor-pointer inline-flex items-center gap-2 text-xs sm:text-sm"
            >
              <span>VÀO CHẾ ĐỘ ĐOẠN VĂN</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
