import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  getRealmByChapterNumber,
  getRealmByAge,
  getRealmById,
  getRealmByLevelId,
  getUnitByLevelId
} from '../../data/learning-path-data';
import { LevelNode, UserProgress } from '../../data/progress-types';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../../data/theme-types';
import { LevelNodeButton } from './LevelNodeButton';
import { TopNavBar } from './TopNavBar';
import { RealmSelectModal } from '../modals/RealmSelectModal';
import {
  Target,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';

interface LearningPathViewProps {
  progress: UserProgress;
  onSelectLevel: (level: LevelNode) => void;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenRefillModal: () => void;
  onOpenEnergyModal?: () => void;
  onOpenProfileModal: () => void;
  onOpenArmory: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAstronautCard?: () => void;
}

// Zigzag offsets for winding saga path
const ZIGZAG_OFFSETS = [0, 45, 75, 45, 0, -45, -75, -45];

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  progress,
  onSelectLevel,
  onUpdateProgress,
  onOpenRefillModal,
  onOpenEnergyModal,
  onOpenProfileModal,
  onOpenArmory,
  onOpenLeaderboard,
  onOpenAstronautCard
}) => {
  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;
  const mascot = MASCOT_CONFIGS[progress.mascotId || 'cosmo_dog'] || MASCOT_CONFIGS.cosmo_dog;

  // Determine realm for current level
  const curLevelRealm = useMemo(() => {
    return getRealmByLevelId(progress.currentLevelId);
  }, [progress.currentLevelId]);

  // Derive active realm directly from user progress to always stay in sync
  const activeRealmId = progress.selectedRealmId || curLevelRealm.id || (progress.userAge ? getRealmByAge(progress.userAge).id : 'realm-1');
  const [showRealmModal, setShowRealmModal] = useState<boolean>(false);
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});
  const levelRefs = useRef<Record<string, HTMLElement | null>>({});
  const hasUserSwitchedRealmRef = useRef<boolean>(false);

  const currentRealm = useMemo(() => {
    return getRealmById(activeRealmId);
  }, [activeRealmId]);

  // Auto-scroll to current level
  const scrollToCurrentLevel = (behavior: ScrollBehavior = 'smooth') => {
    const curLevelId = progress.currentLevelId;
    if (!curLevelId) return;

    // Check if the current level element is rendered in DOM
    const levelEl = levelRefs.current[curLevelId];
    if (levelEl) {
      levelEl.scrollIntoView({ behavior, block: 'center' });
      return;
    }

    // Fallback: check if unit chapter element is rendered
    const curUnit = getUnitByLevelId(curLevelId);
    if (curUnit) {
      const chapterEl = chapterRefs.current[curUnit.id] || chapterRefs.current[`unit-${curUnit.unitNumber}`];
      if (chapterEl) {
        chapterEl.scrollIntoView({ behavior, block: 'center' });
      }
    }
  };

  // Auto-jump to current level on mount and when activeRealm/currentLevel changes
  useEffect(() => {
    if (curLevelRealm && curLevelRealm.id !== activeRealmId && !hasUserSwitchedRealmRef.current) {
      onUpdateProgress(p => ({ ...p, selectedRealmId: curLevelRealm.id }));
      return;
    }

    const timer = setTimeout(() => {
      scrollToCurrentLevel('smooth');
    }, 150);

    return () => clearTimeout(timer);
  }, [progress.currentLevelId, activeRealmId]);

  const handleSelectRealm = (realmId: string) => {
    soundFx.playClick();
    hasUserSwitchedRealmRef.current = true;
    onUpdateProgress(p => ({ ...p, selectedRealmId: realmId }));
  };

  const handleJumpToCurrent = () => {
    soundFx.playClick();
    const curLevelId = progress.currentLevelId;
    const curUnit = getUnitByLevelId(curLevelId);
    if (curUnit) {
      const targetRealm = getRealmByChapterNumber(curUnit.unitNumber);
      if (targetRealm.id !== activeRealmId) {
        hasUserSwitchedRealmRef.current = false;
        onUpdateProgress(p => ({ ...p, selectedRealmId: targetRealm.id }));
      }
      setTimeout(() => {
        scrollToCurrentLevel('smooth');
      }, 120);
    }
  };

  return (
    <div className={`relative w-full h-full overflow-y-auto bg-gradient-to-b ${theme.bgGradient} bg-galactic-stars text-white select-none transition-colors duration-500`}>
      {/* Top Bar */}
      <TopNavBar
        progress={progress}
        onUpdateProgress={onUpdateProgress}
        onOpenRefillModal={onOpenRefillModal}
        onOpenEnergyModal={onOpenEnergyModal}
        onOpenProfileModal={onOpenProfileModal}
        onOpenArmory={onOpenArmory}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenAstronautCard={onOpenAstronautCard}
      />

      {/* Main Centered Focused Roadmap */}
      <div className="max-w-xl mx-auto px-4 py-6 pb-32 flex flex-col items-center">
        
        {/* Sleek Minimal Realm Header Pill */}
        <button
          onClick={() => {
            soundFx.playClick();
            setShowRealmModal(true);
          }}
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/60 shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95 mb-8"
          title="Bấm để chuyển đổi cõi thiên hà khác"
        >
          <span className="text-2xl drop-shadow">{currentRealm.icon}</span>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-black tracking-wider text-cyan-400">
              Cõi {currentRealm.realmNumber} • {currentRealm.gradeLabel}
            </span>
            <span className="text-xs sm:text-sm font-game font-black text-white group-hover:text-cyan-200 transition">
              {currentRealm.nameVi}
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-300 pl-1">
            <span className="text-[11px] font-bold hidden sm:inline">Đổi</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </div>
        </button>

        {/* Road of Level Nodes by Chapter */}
        <main className="w-full space-y-12">
          {currentRealm.units.map((unit, uIdx) => {
            const unitCompletedCount = unit.levels.filter(
              l => progress.levelProgressMap[l.id]?.isCompleted
            ).length;

            return (
              <section
                key={unit.id}
                ref={(el) => {
                  chapterRefs.current[unit.id] = el;
                  chapterRefs.current[`unit-${unit.unitNumber}`] = el;
                }}
                className="relative scroll-mt-20 w-full"
              >
                {/* Clean, Kid-Friendly Chapter Banner */}
                <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 bg-slate-900/85 border border-slate-800/90 rounded-2xl backdrop-blur-md shadow-md mb-8">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl sm:text-3xl flex-shrink-0 drop-shadow">{unit.icon}</span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">
                        Chương {unit.unitNumber}
                      </div>
                      <div className="font-game font-black text-sm sm:text-base text-white truncate">
                        {unit.titleVi}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-game font-bold text-slate-300 px-2.5 py-1 rounded-xl bg-slate-800/90 border border-slate-700/60 flex-shrink-0">
                    {unitCompletedCount}/{unit.levels.length}
                  </span>
                </div>

                {/* Road of Level Nodes */}
                <div className="relative flex flex-col items-center">
                  {/* Central Background Path Line */}
                  <div className="absolute top-8 bottom-8 w-2.5 sm:w-3 bg-slate-800/80 rounded-full z-0 border border-slate-700/40" />

                  {unit.levels.map((lvl, lIdx) => {
                    const globalIdx = uIdx * 5 + lIdx;
                    const offset = ZIGZAG_OFFSETS[globalIdx % ZIGZAG_OFFSETS.length];
                    const isCurrent = lvl.id === progress.currentLevelId;

                    return (
                      <div
                        key={lvl.id}
                        ref={(el) => {
                          levelRefs.current[lvl.id] = el;
                        }}
                        className="relative z-10 my-2"
                      >
                        <LevelNodeButton
                          level={lvl}
                          progress={progress.levelProgressMap[lvl.id]}
                          isCurrent={isCurrent}
                          onSelect={onSelectLevel}
                          offsetX={offset}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </main>
      </div>

      {/* Floating "Tiếp tục bài học" Quick Button */}
      <button
        onClick={handleJumpToCurrent}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 px-4 py-2.5 sm:px-5 sm:py-3.5 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-game font-black text-xs sm:text-base rounded-2xl border border-white/60 flex items-center gap-2 cursor-pointer transition active:scale-95 hover:scale-105 shadow-xl`}
        style={{ boxShadow: `0 8px 25px ${theme.glowColor}` }}
        title="Nhảy tới bài học hiện tại"
      >
        <Target className="w-4 h-4 stroke-[3]" />
        <span>TIẾP TỤC HỌC</span>
        <ArrowRight className="w-4 h-4 stroke-[3]" />
      </button>

      {/* Realm Switcher Modal */}
      {showRealmModal && (
        <RealmSelectModal
          currentRealmId={activeRealmId}
          progress={progress}
          onSelectRealm={handleSelectRealm}
          onClose={() => setShowRealmModal(false)}
        />
      )}
    </div>
  );
};
