import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  getRealmByChapterNumber,
  getRealmByAge,
  getRealmById,
  getRealmByLevelId,
  getUnitByLevelId,
  AGE_REALMS
} from '../../data/learning-path-data';
import { LevelNode, UserProgress } from '../../data/progress-types';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../../data/theme-types';
import { LevelNodeButton } from './LevelNodeButton';
import { LeftNavSidebar } from '../navigation/LeftNavSidebar';
import { RightPlayerSidebar } from '../navigation/RightPlayerSidebar';
import { MobileTopBar, MobileBottomBar } from '../navigation/MobileNavBar';
import { RealmSelectModal } from '../modals/RealmSelectModal';
import { GraduationModal } from '../modals/GraduationModal';
import { DailyQuestModal } from '../modals/DailyQuestModal';
import {
  Target,
  ArrowRight,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { subscribeSyncStatus, SyncStatus } from '../../services/firebase/cloudSyncService';
import { claimDailyQuestReward, graduateRealm, awardTypingDiplomaIfEligible } from '../../services/progressStorage';
import { getBrandingConfig, subscribeBrandingConfig, BrandingConfig } from '../../services/brandingService';

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
  onOpenDiamondGuide?: () => void;
  onOpenInstallModal?: () => void;
  onOpenLanding?: () => void;
  onOpenMistakeVault?: () => void;
  onOpenDailyQuests?: () => void;
  onOpenTypingDojo?: () => void;
  onOpenCourseSwitcher?: () => void;
  onOpenAuth?: (tab: 'register' | 'login') => void;
  onLogout?: () => void;
  onOpenMigration?: () => void;
  showInstallButton?: boolean;
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
  onOpenAstronautCard,
  onOpenDiamondGuide,
  onOpenInstallModal,
  onOpenLanding,
  onOpenMistakeVault,
  onOpenTypingDojo,
  onOpenCourseSwitcher,
  onOpenAuth,
  onLogout,
  onOpenMigration,
  showInstallButton
}) => {
  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;
  const mascot = MASCOT_CONFIGS[progress.mascotId || 'cosmo_dog'] || MASCOT_CONFIGS.cosmo_dog;
  const [branding, setBranding] = useState<BrandingConfig>(() => getBrandingConfig());

  useEffect(() => {
    const unsubscribe = subscribeBrandingConfig((cfg) => {
      setBranding(cfg);
    });
    return () => unsubscribe();
  }, []);

  // Determine realm for current level
  const curLevelRealm = useMemo(() => {
    return getRealmByLevelId(progress.currentLevelId);
  }, [progress.currentLevelId]);

  // Derive active realm directly from user progress to always stay in sync
  const activeRealmId = progress.selectedRealmId || curLevelRealm.id || (progress.userAge ? getRealmByAge(progress.userAge).id : 'realm-1');
  const [showRealmModal, setShowRealmModal] = useState<boolean>(false);
  const [showGraduationModal, setShowGraduationModal] = useState<boolean>(false);
  const [showDailyQuestModal, setShowDailyQuestModal] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('offline');
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});
  const levelRefs = useRef<Record<string, HTMLElement | null>>({});
  const hasUserSwitchedRealmRef = useRef<boolean>(false);

  useEffect(() => {
    return subscribeSyncStatus((status) => {
      setSyncStatus(status);
    });
  }, []);

  const handleToggleSound = () => {
    const isMuted = soundFx.toggleMute();
    speechHelper.setEnabled(!isMuted);
    onUpdateProgress(p => ({ ...p, soundEnabled: !isMuted }));
  };

  const currentRealm = useMemo(() => {
    return getRealmById(activeRealmId);
  }, [activeRealmId]);

  const isRealmCompleted = useMemo(() => {
    const allLevels = currentRealm.units.flatMap(u => u.levels);
    return allLevels.length > 0 && allLevels.every(l => progress.levelProgressMap[l.id]?.isCompleted);
  }, [currentRealm, progress.levelProgressMap]);

  const nextRealm = useMemo(() => {
    return AGE_REALMS.find(r => r.realmNumber === currentRealm.realmNumber + 1);
  }, [currentRealm]);

  const handleClaimDailyQuest = () => {
    onUpdateProgress(prev => claimDailyQuestReward(prev));
  };

  const handleAdvanceToNextRealm = (nextRealmId: string) => {
    onUpdateProgress(prev => graduateRealm(prev, currentRealm.id));
    setShowGraduationModal(false);
  };

  const mainScrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to current level
  const scrollToCurrentLevel = (behavior: ScrollBehavior = 'auto') => {
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

  // Scroll to current level when in the same realm, or top of page if inspecting another realm
  useEffect(() => {
    if (curLevelRealm && curLevelRealm.id === activeRealmId) {
      // Immediate attempt for already-mounted DOM
      scrollToCurrentLevel('auto');

      const timer = setTimeout(() => {
        scrollToCurrentLevel('auto');
      }, 50);

      return () => clearTimeout(timer);
    } else {
      // User is exploring a different realm: scroll to top of this realm
      if (mainScrollContainerRef.current) {
        mainScrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  }, [progress.currentLevelId, activeRealmId]);

  const handleSelectRealm = (realmId: string) => {
    soundFx.playClick();
    hasUserSwitchedRealmRef.current = true;
    onUpdateProgress(p => ({ ...p, selectedRealmId: realmId }));
    if (mainScrollContainerRef.current) {
      mainScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        setTimeout(() => {
          scrollToCurrentLevel('auto');
        }, 50);
      } else {
        scrollToCurrentLevel('smooth');
      }
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b ${theme.bgGradient} bg-galactic-stars text-white select-none transition-colors duration-500 flex flex-col lg:flex-row justify-between`}>
      {/* 1. Desktop Left Sidebar Navigation (256px - 288px) */}
      <LeftNavSidebar
        progress={progress}
        onOpenCourseSwitcher={onOpenCourseSwitcher}
        onOpenProfileModal={onOpenProfileModal}
        onOpenArmory={onOpenArmory}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenAstronautCard={onOpenAstronautCard}
        onOpenMistakeVault={onOpenMistakeVault}
        onOpenTypingDojo={onOpenTypingDojo}
        onOpenInstallModal={onOpenInstallModal}
        onOpenLanding={onOpenLanding}
        onLogout={onLogout}
        onOpenMigration={onOpenMigration}
        onToggleSound={handleToggleSound}
        showInstallButton={showInstallButton}
      />

      {/* 2. Center Column: Learning Roadmap */}
      <div
        ref={mainScrollContainerRef}
        className="flex-1 h-full overflow-y-auto no-scrollbar flex flex-col items-center min-w-0 relative"
      >
        {/* Mobile Top Status Bar (< 1024px) */}
        <MobileTopBar
          progress={progress}
          syncStatus={syncStatus}
          onOpenProfileModal={onOpenProfileModal}
          onOpenCourseSwitcher={onOpenCourseSwitcher}
          onOpenEnergyModal={onOpenEnergyModal}
          onOpenRefillModal={onOpenRefillModal}
          onOpenDiamondGuide={onOpenDiamondGuide}
          onOpenDailyQuests={() => setShowDailyQuestModal(true)}
          onToggleSound={handleToggleSound}
        />

        {/* Main Centered Focused Roadmap */}
        <div className="w-full max-w-xl mx-auto px-4 py-6 pb-36 flex flex-col items-center">
          {/* Sleek Minimal Realm Header Pill */}
          <button
            onClick={() => {
              soundFx.playClick();
              if (onOpenCourseSwitcher) {
                onOpenCourseSwitcher();
              } else {
                setShowRealmModal(true);
              }
            }}
            className="group flex items-center gap-3.5 px-6 py-3 rounded-full border-2 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95 mb-8 bg-slate-900/95 hover:bg-slate-800 border-slate-700/90 hover:border-cyan-400/80"
            title="Bấm để chuyển đổi cõi thiên hà hoặc môn học khác"
          >
          <span className="text-3xl drop-shadow">{currentRealm.icon}</span>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-cyan-400">
                Cõi {currentRealm.realmNumber}
              </span>
              {currentRealm.cefrLevel && (
                <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-400/40">
                  {currentRealm.cefrLevel}
                </span>
              )}
            </div>
            <span className="text-sm sm:text-base md:text-lg font-game font-black transition text-white group-hover:text-cyan-200">
              {currentRealm.nameVi}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition ml-1 text-slate-400 group-hover:text-cyan-300" />
        </button>

        {/* Road of Level Nodes by Chapter */}
        <main className="w-full space-y-12">
          {currentRealm.units.map((unit, uIdx) => {
            const unitCompletedCount = unit.levels.filter(
              l => progress.levelProgressMap[l.id]?.isCompleted
            ).length;

            const cleanTitle = unit.titleVi.replace(new RegExp(`^Chương\\s*${unit.unitNumber}\\s*[:\\-]?\\s*`, 'i'), '');

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
                <div className="flex items-center justify-between gap-3.5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl backdrop-blur-md shadow-lg mb-8 border bg-slate-900/90 border-slate-700/80">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="text-3xl sm:text-4xl flex-shrink-0 drop-shadow">{unit.icon}</span>
                    <div className="min-w-0">
                      <div className="font-game font-black text-base sm:text-lg md:text-xl truncate text-white">
                        Chương {unit.unitNumber}: {cleanTitle}
                      </div>
                    </div>
                  </div>

                  <span className="text-sm sm:text-base font-game font-black px-3 py-1.5 rounded-xl border flex-shrink-0 shadow-inner text-cyan-300 bg-slate-800/90 border-slate-700/70">
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

          {/* Realm Completed / Graduation Celebration Card */}
          {isRealmCompleted && (
            <div className="w-full mt-8 p-5 sm:p-7 bg-gradient-to-b from-amber-500/20 via-slate-900/90 to-amber-950/30 border-3 border-amber-400/90 rounded-3xl text-center shadow-[0_0_50px_rgba(245,158,11,0.4)] animate-in fade-in">
              <div className="text-5xl mb-2 drop-shadow">🎓</div>
              <div className="font-orbitron font-black text-lg sm:text-2xl text-yellow-300 mb-1.5 starwars-gold-glow">
                ĐÃ HOÀN THÀNH {currentRealm.nameVi.toUpperCase()}!
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-bold mb-4 max-w-md mx-auto">
                Chúc mừng bạn đã chinh phục trọn vẹn toàn bộ các chương của cõi thiên hà này! Hãy nhận chứng chỉ tốt nghiệp và tiếp tục thăng cấp.
              </p>
              <button
                onClick={() => {
                  soundFx.playVictory();
                  onUpdateProgress(prev => awardTypingDiplomaIfEligible(prev, currentRealm.id));
                  setShowGraduationModal(true);
                }}
                className="py-3 px-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-game font-black text-sm sm:text-base rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.6)] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 mx-auto animate-pulse"
              >
                <Award className="w-5 h-5" />
                <span>XEM BẰNG TỐT NGHIỆP & THĂNG CẤP 🚀</span>
              </button>
            </div>
          )}

          {/* Partner Credit Footer in Map */}
          {branding.showPartnerBanner && branding.partnerMessage && (
            <div className="mt-10 mb-20 text-center text-xs text-slate-500 flex flex-col items-center gap-1.5 px-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-300 font-semibold shadow-sm">
                {branding.partnerLogoUrl ? (
                  <img
                    src={branding.partnerLogoUrl}
                    alt="Logo đối tác"
                    className="w-5 h-5 object-contain rounded-full shadow-sm"
                  />
                ) : (
                  <span className="text-sm">🏛️</span>
                )}
                <span className="text-xs sm:text-sm">{branding.partnerMessage}</span>
              </div>
              {branding.partnerSubtext && (
                <span className="text-[11px] text-slate-400 max-w-md">{branding.partnerSubtext}</span>
              )}
            </div>
          )}
        </main>
        </div>
      </div>

      {/* 3. Desktop Right Player Hub (320px - 352px) */}
      <RightPlayerSidebar
        progress={progress}
        onOpenRefillModal={onOpenRefillModal}
        onOpenEnergyModal={onOpenEnergyModal}
        onOpenDiamondGuide={onOpenDiamondGuide}
        onOpenDailyQuests={() => setShowDailyQuestModal(true)}
        onOpenCourseSwitcher={onOpenCourseSwitcher}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenMistakeVault={onOpenMistakeVault}
      />

      {/* 4. Mobile Bottom Arcade Navigation Bar (< 1024px) */}
      <MobileBottomBar
        progress={progress}
        onOpenMistakeVault={onOpenMistakeVault}
        onOpenTypingDojo={onOpenTypingDojo}
        onOpenArmory={onOpenArmory}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenProfileModal={onOpenProfileModal}
        onToggleSound={handleToggleSound}
      />

      {/* Floating "Tiếp tục bài học" Quick Button */}
      <button
        onClick={handleJumpToCurrent}
        className={`fixed bottom-20 lg:bottom-6 right-5 sm:right-6 xl:right-[21.5rem] 2xl:right-[23.5rem] z-40 px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-game font-black text-sm sm:text-lg rounded-2xl border border-white/60 flex items-center gap-2.5 cursor-pointer transition active:scale-95 hover:scale-105 shadow-xl`}
        style={{ boxShadow: `0 8px 25px ${theme.glowColor}` }}
        title="Nhảy tới bài học hiện tại"
      >
        <Target className="w-5 h-5 stroke-[3]" />
        <span>TIẾP TỤC</span>
        <ArrowRight className="w-5 h-5 stroke-[3]" />
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

      {/* Graduation Modal */}
      {showGraduationModal && (
        <GraduationModal
          realm={currentRealm}
          nextRealm={nextRealm}
          progress={progress}
          onAdvanceToNextRealm={handleAdvanceToNextRealm}
          onClose={() => setShowGraduationModal(false)}
        />
      )}

      {/* Daily Quest Modal */}
      {showDailyQuestModal && (
        <DailyQuestModal
          progress={progress}
          onClaimDailyReward={handleClaimDailyQuest}
          onOpenMistakeVault={onOpenMistakeVault}
          onOpenTypingDojo={onOpenTypingDojo}
          onClose={() => setShowDailyQuestModal(false)}
        />
      )}
    </div>
  );
};
