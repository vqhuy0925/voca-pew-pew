import React, { useEffect, useRef, useState, useMemo } from 'react';
import { UserProgress } from '../../data/progress-types';
import { TYPING_LESSONS, TYPING_UNITS } from '../../data/typing-curriculum';
import { TypingSagaNode } from './TypingSagaNode';
import { TypingSagaCurvedPath } from './TypingSagaCurvedPath';
import { ArrowLeft, BookOpen, Sun, Moon, Lock, CheckCircle2, ChevronRight, Zap, Target } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { CoursePillButton } from '../common/CoursePillButton';
import { LeftNavSidebar } from '../navigation/LeftNavSidebar';
import { RightPlayerSidebar } from '../navigation/RightPlayerSidebar';
import { MobileTopBar, MobileBottomBar } from '../navigation/MobileNavBar';
import { DailyQuestModal } from '../modals/DailyQuestModal';
import { claimDailyQuestReward } from '../../services/progressStorage';
import { subscribeSyncStatus, SyncStatus } from '../../services/firebase/cloudSyncService';

interface TypingSagaMapViewProps {
  progress: UserProgress;
  currentLessonIndex: number;
  onSelectLesson: (lessonIndex: number) => void;
  onExit: () => void;
  onStartParagraphMode: () => void;
  isLight: boolean;
  onToggleTheme: () => void;
  onOpenCourseSwitcher?: () => void;
  onOpenProfileModal?: () => void;
  onOpenArmory?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAstronautCard?: () => void;
  onOpenMistakeVault?: () => void;
  onOpenDailyQuests?: () => void;
  onOpenRefillModal?: () => void;
  onOpenEnergyModal?: () => void;
  onOpenDiamondGuide?: () => void;
  onOpenInstallModal?: () => void;
  onOpenLanding?: () => void;
  onLogout?: () => void;
  onOpenMigration?: () => void;
  showInstallButton?: boolean;
  onUpdateProgress?: (updater: (prev: UserProgress) => UserProgress) => void;
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
  onToggleTheme,
  onOpenCourseSwitcher,
  onOpenProfileModal,
  onOpenArmory,
  onOpenLeaderboard,
  onOpenAstronautCard,
  onOpenMistakeVault,
  onOpenDailyQuests,
  onOpenRefillModal,
  onOpenEnergyModal,
  onOpenDiamondGuide,
  onOpenInstallModal,
  onOpenLanding,
  onLogout,
  onOpenMigration,
  showInstallButton,
  onUpdateProgress
}) => {
  const unitRefs = useRef<Record<string, HTMLElement | null>>({});
  const currentLessonRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeUnitId, setActiveUnitId] = useState<string>(TYPING_UNITS[0].id);
  const [showDailyQuestModal, setShowDailyQuestModal] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('offline');

  useEffect(() => {
    return subscribeSyncStatus((status) => {
      setSyncStatus(status);
    });
  }, []);

  const handleToggleSound = () => {
    const isMuted = soundFx.toggleMute();
    if (onUpdateProgress) {
      onUpdateProgress(p => ({ ...p, soundEnabled: !isMuted }));
    }
  };

  const handleClaimDailyQuest = () => {
    if (onUpdateProgress) {
      onUpdateProgress(prev => claimDailyQuestReward(prev));
    }
  };

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
    soundFx.playToriiGong();
    setActiveUnitId(unitId);
    const el = unitRefs.current[unitId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleJumpToCurrent = () => {
    soundFx.playMechanicalClick();
    if (currentLessonRef.current) {
      currentLessonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none font-game transition-colors duration-300 flex flex-col lg:flex-row justify-between ${
        isLight
          ? 'bg-daybreak-sunny text-slate-900 arcade-scrollbar-light'
          : 'bg-[#08091a] bg-galactic-stars text-white arcade-scrollbar-dark'
      }`}
    >
      {/* 1. Desktop Left Sidebar Navigation */}
      <LeftNavSidebar
        progress={progress}
        activeRoute="dojo"
        onOpenSaga={onExit}
        onOpenCourseSwitcher={onOpenCourseSwitcher}
        onStartParagraphMode={onStartParagraphMode}
        onOpenProfileModal={onOpenProfileModal}
        onOpenArmory={onOpenArmory}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenAstronautCard={onOpenAstronautCard}
        onOpenMistakeVault={onOpenMistakeVault}
        onOpenInstallModal={onOpenInstallModal}
        onOpenLanding={onOpenLanding}
        onLogout={onLogout}
        onOpenMigration={onOpenMigration}
        onToggleSound={handleToggleSound}
        showInstallButton={showInstallButton}
        isLight={isLight}
        onToggleTheme={onToggleTheme}
      />

      {/* 2. Center Column: Dojo Learning Roadmap */}
      <div
        ref={containerRef}
        className="flex-1 h-full overflow-y-auto no-scrollbar flex flex-col items-center min-w-0 relative"
      >
        {/* Mobile Top Status Bar (< 1024px) */}
        <MobileTopBar
          progress={progress}
          syncStatus={syncStatus}
          activeRoute="dojo"
          onOpenProfileModal={onOpenProfileModal}
          onOpenCourseSwitcher={onOpenCourseSwitcher}
          onOpenEnergyModal={onOpenEnergyModal}
          onOpenRefillModal={onOpenRefillModal}
          onOpenDiamondGuide={onOpenDiamondGuide}
          onOpenDailyQuests={() => {
            if (onOpenDailyQuests) onOpenDailyQuests();
            else setShowDailyQuestModal(true);
          }}
          onToggleSound={handleToggleSound}
          isLight={isLight}
          onToggleTheme={onToggleTheme}
        />

        {/* Center Content Container */}
        <div className="w-full max-w-xl mx-auto px-4 py-6 pb-36 flex flex-col items-center">
          {/* Dojo Course Banner & Quick Switcher Pill */}
          <div className="w-full flex flex-col items-center mb-6">
            <button
              onClick={() => {
                soundFx.playClick();
                if (onOpenCourseSwitcher) {
                  onOpenCourseSwitcher();
                }
              }}
              className={`group flex items-center gap-3.5 px-6 py-3 rounded-full border-2 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95 mb-4 ${
                isLight
                  ? 'bg-white/95 hover:bg-slate-50 border-slate-300 hover:border-cyan-500 shadow-slate-200/80 text-slate-800'
                  : 'bg-slate-900/95 hover:bg-slate-800 border-slate-700/90 hover:border-cyan-400/80 shadow-cyan-950/20 text-white'
              }`}
              title="Bấm để đổi môn học"
            >
              <span className="text-3xl drop-shadow">🥋</span>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-cyan-400">
                    Võ Đường 10 Ngón
                  </span>
                  <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-400/40">
                    TYPING DOJO
                  </span>
                </div>
                <span className={`text-[11px] sm:text-xs font-semibold ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Đã hoàn thành {totalCompletedCount}/{TYPING_LESSONS.length} bài luyện
                </span>
              </div>
              <ChevronRight className="w-5 h-5 ml-1 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Belt Quick Jump Ribbon */}
            <div className="w-full px-1 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
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
          </div>

          {/* Main Dojo Road Units */}
          <main className="w-full flex flex-col items-center">
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
                  {/* Unit Chapter Banner — Cổng Trạm Cyber Torii Võ Sĩ (Cyber Torii Gate) */}
                  <div
                    className={`relative flex items-center justify-between gap-3 px-5 py-4 rounded-3xl border-2 backdrop-blur-xl shadow-xl mb-8 transition-all overflow-hidden ${
                      !unlocked
                        ? (isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                            : 'bg-slate-900/60 border-slate-800 text-slate-600 opacity-50')
                        : isFull
                        ? (isLight
                            ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-emerald-400 text-slate-900 shadow-emerald-500/10'
                            : 'bg-gradient-to-r from-slate-950/90 via-emerald-950/30 to-slate-900/90 border-emerald-500/60 text-white shadow-emerald-950/50')
                        : (isLight
                            ? 'bg-white/95 border-slate-300 text-slate-900 shadow-md'
                            : 'bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 border-slate-700/80 text-white shadow-black/60')
                    }`}
                  >
                    {/* Cột Trụ Torii Neon bên trái & vệt sáng màu đai */}
                    {unlocked && (
                      <>
                        <div
                          className="absolute left-0 top-0 bottom-0 w-3 rounded-l-3xl shadow-md"
                          style={{
                            backgroundColor: belt.accentColor,
                            boxShadow: `0 0 15px ${belt.accentColor}`
                          }}
                        />
                        <div
                          className="absolute right-0 top-0 bottom-0 w-1 opacity-40"
                          style={{ backgroundColor: belt.accentColor }}
                        />
                      </>
                    )}

                    <div className="flex items-center gap-3.5 min-w-0 pl-1.5">
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

            {/* Curriculum Completion / Congratulations Card */}
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
      </div>

      {/* 3. Desktop Right Player Hub */}
      <RightPlayerSidebar
        progress={progress}
        activeMode="dojo"
        onStartParagraphMode={onStartParagraphMode}
        onOpenRefillModal={onOpenRefillModal}
        onOpenEnergyModal={onOpenEnergyModal}
        onOpenDiamondGuide={onOpenDiamondGuide}
        onOpenDailyQuests={() => {
          if (onOpenDailyQuests) onOpenDailyQuests();
          else setShowDailyQuestModal(true);
        }}
        onOpenCourseSwitcher={onOpenCourseSwitcher}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenMistakeVault={onOpenMistakeVault}
      />

      {/* 4. Mobile Bottom Arcade Navigation Bar (< 1024px) */}
      <MobileBottomBar
        progress={progress}
        activeRoute="dojo"
        onOpenSaga={onExit}
        onOpenMistakeVault={onOpenMistakeVault}
        onOpenArmory={onOpenArmory}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenProfileModal={onOpenProfileModal}
        onToggleSound={handleToggleSound}
        isLight={isLight}
      />

      {/* Floating "Tiếp tục bài luyện" Quick Button */}
      <button
        onClick={handleJumpToCurrent}
        className="fixed bottom-20 lg:bottom-6 right-5 sm:right-6 xl:right-[21.5rem] 2xl:right-[23.5rem] z-40 px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-game font-black text-sm sm:text-lg rounded-2xl border border-white/60 flex items-center gap-2.5 cursor-pointer transition active:scale-95 hover:scale-105 shadow-xl shadow-cyan-500/30"
        title="Nhảy tới bài luyện hiện tại"
      >
        <Target className="w-5 h-5 stroke-[3]" />
        <span>TIẾP TỤC</span>
        <ChevronRight className="w-5 h-5 stroke-[3]" />
      </button>

      {/* Daily Quest Modal (if triggered locally) */}
      {showDailyQuestModal && (
        <DailyQuestModal
          progress={progress}
          onClaimDailyReward={handleClaimDailyQuest}
          onOpenMistakeVault={onOpenMistakeVault}
          onClose={() => setShowDailyQuestModal(false)}
        />
      )}
    </div>
  );
};
