import React, { useEffect, useRef, useState, useMemo } from 'react';
import { UserProgress } from '../../data/progress-types';
import { TYPING_LESSONS, TYPING_UNITS } from '../../data/typing-curriculum';
import { TypingSagaNode } from './TypingSagaNode';
import { TypingSagaCurvedPath } from './TypingSagaCurvedPath';
import { ArrowLeft, BookOpen, Sun, Moon, Lock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
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

// Bảng tên Đai Võ Sĩ tương ứng với 6 Trạm trong Lộ trình Typing Dojo
const BELT_INFOS = [
  { name: 'Đai Trắng', subtitle: 'Hàng Phím Cơ Sở (Home Row)', colorClass: 'belt-badge-0', accentColor: '#cbd5e1' },
  { name: 'Đai Vàng', subtitle: 'Hàng Phím Trên (Top Row)', colorClass: 'belt-badge-1', accentColor: '#eab308' },
  { name: 'Đai Xanh Lá', subtitle: 'Hàng Phím Dưới (Bottom Row)', colorClass: 'belt-badge-2', accentColor: '#22c55e' },
  { name: 'Đai Xanh Lam', subtitle: 'Hàng Phím Số & Ký Tự', colorClass: 'belt-badge-3', accentColor: '#0284c7' },
  { name: 'Đai Đỏ', subtitle: 'Luyện Ghép Từ Tốc Độ', colorClass: 'belt-badge-4', accentColor: '#ef4444' },
  { name: 'Đai Đen Cyber', subtitle: 'Luyện Câu & Đoạn Văn Đỉnh Cao', colorClass: 'belt-badge-5', accentColor: '#38bdf8' }
];

// Zigzag offsets for winding saga path (uốn lượn mượt mà)
const ZIGZAG_OFFSETS = [0, 42, 70, 42, 0, -42, -70, -42];
const NODE_SPACING_Y = 112; // Khoảng cách pixel chuẩn giữa các node

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
    }, 250);
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
          ? 'bg-[#f8fafc] text-slate-900'
          : 'bg-[#08091a] bg-galactic-stars text-white'
      }`}
    >
      {/* 1. Header — Sleek Cyber-Dojo Navigation Bar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors shadow-lg ${
          isLight
            ? 'bg-white/95 border-slate-200/90'
            : 'bg-slate-950/90 border-slate-800/80 shadow-cyan-950/20'
        }`}
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          {/* Back Button (Về Vũ Trụ) */}
          <button
            onClick={() => {
              soundFx.playClick();
              onExit();
            }}
            className={`btn-3d flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
              isLight
                ? 'btn-3d-slate bg-white text-slate-800 border-b-4 border-slate-300 hover:bg-slate-50'
                : 'btn-3d-slate bg-slate-900 text-slate-200 border-b-4 border-slate-950 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Vũ Trụ</span>
            <span className="xs:hidden">Thoát</span>
          </button>

          {/* Center Title & Global Dojo Progress */}
          <div className="flex flex-col items-center min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg">🥋</span>
              <h1 className="text-base sm:text-xl font-black font-orbitron tracking-wider truncate text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                TYPING DOJO
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold mt-0.5">
              <span className={isLight ? 'text-slate-600 font-extrabold' : 'text-slate-400 font-bold'}>
                Đã luyện {totalCompletedCount}/{TYPING_LESSONS.length} bài
              </span>
              <div
                className={`w-20 sm:w-28 h-2 rounded-full overflow-hidden border ${
                  isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-900 border-slate-700/80'
                }`}
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-400 rounded-full transition-all duration-500 shadow-sm"
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
              className="btn-3d btn-3d-purple flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Đoạn Văn</span>
            </button>

            <button
              onClick={onToggleTheme}
              title={isLight ? 'Chế độ Tối' : 'Chế độ Sáng'}
              aria-label="Đổi giao diện Sáng / Tối"
              className={`p-2 rounded-xl border-2 transition active:scale-95 shadow-sm ${
                isLight
                  ? 'bg-amber-100/90 border-amber-300 text-amber-900 hover:bg-amber-200'
                  : 'bg-slate-900/90 border-slate-700 text-yellow-300 hover:border-yellow-400/50'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* 2. Unit Quick Jump Belt Ribbon */}
        <div className="max-w-4xl mx-auto px-3 sm:px-6 pb-2.5 pt-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {TYPING_UNITS.map((unit) => {
            const unlocked = isUnitUnlocked(unit.order);
            const count = unlocked ? getUnitCompletedCount(unit.order) : 0;
            const isFull = count === unit.lessonCount;
            const isActive = unit.id === activeUnitId;
            const belt = BELT_INFOS[unit.order] || BELT_INFOS[0];

            return (
              <button
                key={unit.id}
                disabled={!unlocked}
                onClick={() => handleJumpToUnit(unit.id)}
                title={`${unit.titleVi} — ${belt.name}`}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-all text-xs font-black active:scale-95 shadow-xs ${
                  !unlocked
                    ? (isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'bg-slate-900/60 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed')
                    : isActive
                    ? (isLight
                        ? 'bg-cyan-100 border-cyan-500 text-cyan-950 ring-2 ring-cyan-400/50 shadow-md'
                        : 'bg-cyan-500/25 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20')
                    : isFull
                    ? (isLight
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 hover:bg-emerald-100'
                        : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30')
                    : (isLight
                        ? 'bg-white border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-50'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white')
                }`}
              >
                <span>{unlocked ? unit.icon : <Lock className="w-3 h-3 text-slate-400" />}</span>
                <span className="whitespace-nowrap">{belt.name}</span>
                {unlocked && (
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                      isFull
                        ? (isLight ? 'bg-emerald-200/80 text-emerald-900' : 'bg-emerald-500/30 text-emerald-300')
                        : (isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-400')
                    }`}
                  >
                    {count}/{unit.lessonCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* 3. Main Saga Road Container */}
      <main className="max-w-xl mx-auto px-4 py-8 pb-28 flex flex-col items-center">
        {TYPING_UNITS.map((unit) => {
          const unlocked = isUnitUnlocked(unit.order);
          const count = unlocked ? getUnitCompletedCount(unit.order) : 0;
          const isFull = count === unit.lessonCount;
          const lessonsInUnit = TYPING_LESSONS.slice(unit.startOrder - 1, unit.endOrder);
          const belt = BELT_INFOS[unit.order] || BELT_INFOS[0];

          // Tìm node hoàn thành cao nhất và node hiện tại trong Unit này
          let completedUpTo = -1;
          let currentInUnit = -1;
          lessonsInUnit.forEach((ls, idx) => {
            const globalIdx = ls.order - 1;
            if (lessonProgressMap[ls.id]?.isCompleted) completedUpTo = idx;
            if (globalIdx === currentLessonIndex) currentInUnit = idx;
          });

          // offsets cho các node trong Unit này
          const unitOffsets = lessonsInUnit.map((ls) => {
            const globalIdx = ls.order - 1;
            return ZIGZAG_OFFSETS[globalIdx % ZIGZAG_OFFSETS.length];
          });

          return (
            <section
              key={unit.id}
              ref={(el) => {
                unitRefs.current[unit.id] = el;
              }}
              className="relative w-full scroll-mt-28 mb-14"
            >
              {/* Unit Chapter Banner — Cổng Trạm Đai Võ Sĩ (Dojo Belt Gate) */}
              <div
                className={`relative flex items-center justify-between gap-3 px-5 py-4 rounded-3xl border-2 backdrop-blur-xl shadow-xl mb-8 transition-all overflow-hidden ${
                  !unlocked
                    ? (isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                        : 'bg-slate-900/60 border-slate-800 text-slate-600 opacity-50')
                    : isFull
                    ? (isLight
                        ? 'bg-emerald-50/95 border-emerald-400 text-slate-900 shadow-emerald-500/10'
                        : 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-emerald-950/40')
                    : (isLight
                        ? 'bg-white/95 border-slate-300 text-slate-900 shadow-slate-200'
                        : 'bg-slate-900/90 border-slate-700/80 text-white shadow-black/50')
                }`}
              >
                {/* Dải màu ruy băng đai ở mép trái */}
                {unlocked && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-2.5 rounded-l-3xl shadow-sm"
                    style={{ backgroundColor: belt.accentColor }}
                  />
                )}

                <div className="flex items-center gap-3.5 min-w-0 pl-1">
                  <span className="text-3xl sm:text-4xl flex-shrink-0 drop-shadow-md">
                    {unlocked ? unit.icon : '🔒'}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isLight ? 'bg-slate-100 text-slate-800 font-extrabold' : 'bg-slate-800 text-cyan-300'
                        }`}
                      >
                        Trạm {unit.order + 1} · {belt.name}
                      </span>
                      {isFull && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 inline flex-shrink-0" />
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-black truncate leading-tight mt-1">
                      {unit.titleVi}
                    </h2>
                    <p className={`text-[11px] sm:text-xs truncate font-semibold ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {belt.subtitle}
                    </p>
                  </div>
                </div>

                {/* Huy hiệu số bài đã hoàn thành */}
                <div
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black border-2 flex-shrink-0 shadow-inner ${
                    isFull
                      ? (isLight
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                          : 'bg-emerald-500/30 text-emerald-300 border-emerald-500/60')
                      : (isLight
                          ? 'bg-slate-100 text-slate-800 border-slate-300'
                          : 'bg-slate-800 text-slate-200 border-slate-700')
                  }`}
                >
                  {count}/{unit.lessonCount}
                </div>
              </div>

              {/* Road of Level Nodes với dải năng lượng uốn lượn SVG Bézier */}
              <div className="relative flex flex-col items-center">
                {/* SVG Bézier Curved Path (Thay thế thanh cọc thẳng tuột cũ) */}
                <TypingSagaCurvedPath
                  offsets={unitOffsets}
                  nodeSpacingY={NODE_SPACING_Y}
                  completedUpToIndex={completedUpTo}
                  currentIndexInUnit={currentInUnit}
                  isLight={isLight}
                  width={380}
                />

                {lessonsInUnit.map((lesson) => {
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
          <div
            className={`w-full mt-8 p-7 rounded-3xl border-3 text-center shadow-2xl transition-all ${
              isLight
                ? 'bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100/90 border-amber-400 text-amber-950 shadow-amber-500/20'
                : 'bg-gradient-to-b from-amber-500/20 via-slate-900/95 to-amber-950/30 border-amber-400 text-white shadow-amber-500/30'
            }`}
          >
            <div className="text-5xl sm:text-6xl mb-3 animate-bounce">🏆</div>
            <h3 className="font-orbitron font-black text-xl sm:text-2xl mb-2 text-amber-400 drop-shadow-md">
              BẠN ĐÃ CHINH PHỤC TOÀN BỘ VÕ ĐƯỜNG!
            </h3>
            <p className={`text-xs sm:text-sm font-semibold max-w-md mx-auto mb-5 leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              Tuyệt đỉnh! Bạn đã tốt nghiệp cấp độ Đai Đen Cyber. Giờ đây hãy bước vào Chế Độ Đoạn Văn để rèn luyện tốc độ phi thuyền và đoạt Chứng Chỉ Gõ Phím!
            </p>
            <button
              onClick={() => {
                soundFx.playVictory();
                onStartParagraphMode();
              }}
              className="btn-3d btn-3d-amber px-8 py-3 rounded-2xl text-sm sm:text-base font-black inline-flex items-center gap-2 shadow-xl"
            >
              <span>VÀO CHẾ ĐỘ ĐOẠN VĂN</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
