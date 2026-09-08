import React, { useState, useMemo, useRef, useEffect } from 'react';
import { LEARNING_UNITS, ALL_LEVELS, AGE_REALMS, getRealmByChapterNumber, getRealmByAge, getRealmById } from '../../data/learning-path-data';
import { LevelNode, UserProgress } from '../../data/progress-types';
import { getSpaceshipById, getBlasterById, getLaserById } from '../../data/upgrade-types';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../../data/theme-types';
import { LevelNodeButton } from './LevelNodeButton';
import { TopNavBar } from './TopNavBar';
import { MascotWidget } from '../mascot/MascotWidget';
import { RealmSelectModal } from '../modals/RealmSelectModal';
import {
  Search,
  Target,
  ArrowRight,
  BookOpen,
  Sparkles,
  Rocket,
  Flame,
  Gem,
  Star,
  CheckCircle2,
  ChevronRight,
  Zap,
  Award,
  Compass,
  RefreshCw,
  Palette
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';

interface LearningPathViewProps {
  progress: UserProgress;
  onSelectLevel: (level: LevelNode) => void;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenRefillModal: () => void;
  onOpenProfileModal: () => void;
  onOpenArmory: () => void;
}

// Zigzag offsets for winding saga path
const ZIGZAG_OFFSETS = [0, 50, 85, 50, 0, -50, -85, -50];

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  progress,
  onSelectLevel,
  onUpdateProgress,
  onOpenRefillModal,
  onOpenProfileModal,
  onOpenArmory
}) => {
  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;
  const mascot = MASCOT_CONFIGS[progress.mascotId || 'cosmo_dog'] || MASCOT_CONFIGS.cosmo_dog;

  // Derive active realm directly from user progress to always stay in sync
  const activeRealmId = progress.selectedRealmId || (progress.userAge ? getRealmByAge(progress.userAge).id : 'realm-1');
  const [showRealmModal, setShowRealmModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jumpChapter, setJumpChapter] = useState<string>('');
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});

  const currentRealm = useMemo(() => {
    return getRealmById(activeRealmId);
  }, [activeRealmId]);

  // Filter units according to active realm only ("less is more")
  const displayedUnits = useMemo(() => {
    let units = currentRealm.units;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      // First search inside current realm
      const matchInCurrent = units.filter(
        u =>
          u.title.toLowerCase().includes(q) ||
          u.titleVi.toLowerCase().includes(q) ||
          u.description.toLowerCase().includes(q) ||
          String(u.unitNumber).includes(q) ||
          u.levels.some(l => l.words.some(w => w.word.toLowerCase().includes(q) || w.meaningVi.toLowerCase().includes(q)))
      );
      if (matchInCurrent.length > 0) {
        return matchInCurrent;
      }
      // If not in current realm, fallback to search across all units
      return LEARNING_UNITS.filter(
        u =>
          u.title.toLowerCase().includes(q) ||
          u.titleVi.toLowerCase().includes(q) ||
          u.description.toLowerCase().includes(q) ||
          String(u.unitNumber).includes(q) ||
          u.levels.some(l => l.words.some(w => w.word.toLowerCase().includes(q) || w.meaningVi.toLowerCase().includes(q)))
      );
    }
    return units;
  }, [currentRealm, searchQuery]);

  // Overall calculations across current realm
  const realmTotalLevels = currentRealm.units.reduce((acc, u) => acc + u.levels.length, 0);
  const realmCompletedLevels = currentRealm.units.flatMap(u => u.levels).filter(
    l => progress.levelProgressMap[l.id]?.isCompleted
  ).length;
  const realmPercent = realmTotalLevels > 0 ? Math.round((realmCompletedLevels / realmTotalLevels) * 100) : 0;

  // Overall total game stats
  const totalCompletedLevels = Object.values(progress.levelProgressMap).filter(lp => lp.isCompleted).length;
  const totalStars = Object.values(progress.levelProgressMap).reduce((acc, lp) => acc + (lp.stars || 0), 0);

  // Active equipped gear
  const equippedShip = getSpaceshipById(progress.equippedShipId);
  const equippedBlaster = getBlasterById(progress.equippedBlasterId);
  const equippedLaser = getLaserById(progress.equippedLaserId);

  const handleSelectRealm = (realmId: string) => {
    soundFx.playClick();
    setSearchQuery('');
    setJumpChapter('');
    onUpdateProgress(p => ({ ...p, selectedRealmId: realmId }));
  };

  const handleJumpToChapter = (chapterNumStr: string) => {
    const num = parseInt(chapterNumStr, 10);
    if (isNaN(num) || num < 1) return;
    soundFx.playClick();
    const targetRealm = getRealmByChapterNumber(num);
    if (targetRealm.id !== activeRealmId) {
      onUpdateProgress(p => ({ ...p, selectedRealmId: targetRealm.id }));
    }
    setSearchQuery('');
    setJumpChapter(chapterNumStr);

    setTimeout(() => {
      const el = chapterRefs.current[`unit-${num}`];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  const handleJumpToCurrent = () => {
    soundFx.playClick();
    const curLevelId = progress.currentLevelId;
    const curUnit = LEARNING_UNITS.find(u => u.levels.some(l => l.id === curLevelId));
    if (curUnit) {
      const targetRealm = getRealmByChapterNumber(curUnit.unitNumber);
      if (targetRealm.id !== activeRealmId) {
        onUpdateProgress(p => ({ ...p, selectedRealmId: targetRealm.id }));
      }
      setTimeout(() => {
        const el = chapterRefs.current[curUnit.id];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 120);
    }
  };

  return (
    <div className={`relative w-full h-full overflow-y-auto bg-gradient-to-b ${theme.bgGradient} text-white select-none transition-colors duration-500`}>
      {/* Top Bar */}
      <TopNavBar
        progress={progress}
        onUpdateProgress={onUpdateProgress}
        onOpenRefillModal={onOpenRefillModal}
        onOpenProfileModal={onOpenProfileModal}
        onOpenArmory={onOpenArmory}
      />

      {/* Main Responsive Multi-Column Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          
          {/* ================= LEFT SIDEBAR (Desktop lg+) ================= */}
          <aside className="hidden lg:flex flex-col gap-5 w-72 xl:w-80 flex-shrink-0 sticky top-20 self-start">
            {/* 1. Active Realm Card with Switcher Button */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4.5 backdrop-blur-xl shadow-xl text-left">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-game font-extrabold text-xs uppercase tracking-wider">
                  <Compass className="w-4 h-4 stroke-[2.5]" />
                  <span>Cõi Hiện Tại</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                  {currentRealm.ageRange}
                </span>
              </div>

              {/* Realm Profile */}
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentRealm.icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-black uppercase text-cyan-400">
                      Cõi {currentRealm.realmNumber}
                    </div>
                    <div className="font-game font-extrabold text-base text-white truncate">
                      {currentRealm.nameVi}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Chương {currentRealm.startChapter} - {currentRealm.endChapter}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-1">
                    <span>Tiến độ Cõi:</span>
                    <span>{realmCompletedLevels}/{realmTotalLevels} ({realmPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${realmPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Switch Realm Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setShowRealmModal(true);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/50 hover:border-cyan-300 rounded-xl text-cyan-300 hover:text-white text-xs font-game font-extrabold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ĐỔI CÕI THIÊN HÀ KHÁC</span>
              </button>
            </div>

            {/* 2. Adventure Achievements Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4.5 backdrop-blur-xl shadow-xl text-left">
              <div className="flex items-center gap-2 mb-3 text-amber-300 font-game font-extrabold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 stroke-[2.5]" />
                <span>Thành Tựu Phi Hành Gia</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Màn Đã Qua</span>
                  </div>
                  <div className="text-xl font-game font-black text-emerald-300 mt-1">
                    {totalCompletedLevels} / {ALL_LEVELS.length}
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span>Sao Đạt Được</span>
                  </div>
                  <div className="text-xl font-game font-black text-yellow-300 mt-1">
                    {totalStars} ⭐
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ================= CENTER COLUMN (Roadmap & Lessons) ================= */}
          <main className="flex-1 min-w-0 max-w-2xl lg:max-w-3xl w-full">
            
            {/* Active Realm Hero Banner */}
            {!searchQuery && (
              <div className="bg-gradient-to-r from-slate-900/90 via-[#101538]/90 to-slate-900/90 border-2 border-slate-700/80 rounded-3xl p-5 sm:p-6 mb-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <span className="text-4xl sm:text-5xl drop-shadow-md">{currentRealm.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-extrabold uppercase border border-cyan-400/40">
                          {currentRealm.gradeLabel}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">
                          {currentRealm.ageRange}
                        </span>
                      </div>
                      <h1 className="font-game font-black text-xl sm:text-2xl text-white mt-1">
                        {currentRealm.nameVi}
                      </h1>
                      <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                        Chương {currentRealm.startChapter} - {currentRealm.endChapter} ({currentRealm.units.length} chương) • Mục tiêu: <span className="text-yellow-300 font-bold">{currentRealm.targetWpm}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Progress */}
                  <div className="w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setShowRealmModal(true);
                      }}
                      className="px-3.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/60 rounded-xl text-cyan-300 text-xs font-game font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95 shadow-sm"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Đổi Cõi</span>
                    </button>

                    <div className="text-right bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
                      <div className="text-xs sm:text-sm font-extrabold text-cyan-300">
                        {realmCompletedLevels}/{realmTotalLevels} ({realmPercent}%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search & Chapter Jump Bar for Current Realm */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Tìm từ vựng trong ${currentRealm.nameVi}...`}
                  className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-2xl text-sm sm:text-base text-white placeholder:text-slate-400 outline-none transition shadow-inner font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <select
                value={jumpChapter}
                onChange={(e) => handleJumpToChapter(e.target.value)}
                className="px-3.5 py-2.5 sm:py-3 bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-2xl text-xs sm:text-sm font-game font-extrabold text-cyan-300 outline-none cursor-pointer max-w-[160px] sm:max-w-[200px] truncate shadow-sm"
              >
                <option value="">Nhảy tới Chương...</option>
                {currentRealm.units.map(u => (
                  <option key={u.id} value={u.unitNumber}>
                    Ch.{u.unitNumber}: {u.titleVi}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Notice */}
            {searchQuery && (
              <div className="mb-6 p-3.5 bg-cyan-950/60 border border-cyan-500/40 rounded-2xl text-sm text-cyan-200 flex items-center justify-between shadow-md">
                <span className="font-medium">Tìm thấy <b>{displayedUnits.length}</b> chương học phù hợp</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs sm:text-sm font-bold text-cyan-400 underline hover:text-white cursor-pointer"
                >
                  Xem tất cả
                </button>
              </div>
            )}

            {/* Road of Level Nodes (Only Current Realm's Units) */}
            <div className="space-y-14">
              {displayedUnits.map((unit, uIdx) => {
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
                    className="relative scroll-mt-20"
                  >
                    {/* Chapter Header Banner */}
                    <div className="flex items-center justify-between p-3.5 sm:p-4 bg-slate-900/80 border-2 border-slate-800 rounded-3xl mb-6 backdrop-blur-md shadow-lg">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-3xl sm:text-4xl drop-shadow">{unit.icon}</span>
                        <div className="truncate">
                          <div className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                            Chương {unit.unitNumber}
                          </div>
                          <div className="font-game font-extrabold text-base sm:text-xl text-white truncate">
                            {unit.titleVi}
                          </div>
                        </div>
                      </div>

                      <span className="text-xs sm:text-sm font-game font-black text-slate-200 px-3.5 py-1 rounded-xl bg-slate-800 border border-slate-700 flex-shrink-0">
                        {unitCompletedCount}/{unit.levels.length}
                      </span>
                    </div>

                    {/* Road of Level Nodes */}
                    <div className="relative flex flex-col items-center">
                      {/* Central Background Path Line */}
                      <div className="absolute top-8 bottom-8 w-3 sm:w-3.5 bg-slate-800/80 rounded-full z-0 border border-slate-700/50" />

                      {unit.levels.map((lvl, lIdx) => {
                        const globalIdx = uIdx * 5 + lIdx;
                        const offset = ZIGZAG_OFFSETS[globalIdx % ZIGZAG_OFFSETS.length];
                        const isCurrent = lvl.id === progress.currentLevelId;

                        return (
                          <div key={lvl.id} className="relative z-10 my-2">
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
            </div>
          </main>

          {/* ================= RIGHT SIDEBAR (Desktop xl+) ================= */}
          <aside className="hidden xl:flex flex-col gap-5 w-72 2xl:w-80 flex-shrink-0 sticky top-20 self-start">
            {/* 1. Mascot Companion Widget Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4.5 backdrop-blur-xl shadow-xl text-left">
              <div className="text-xs font-game font-extrabold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Bạn Đồng Hành {mascot.name}</span>
                </span>
                <span className="text-base">{mascot.icon}</span>
              </div>
              <div className="flex justify-center py-2">
                <MascotWidget
                  mascotId={progress.mascotId}
                  mood="happy"
                  customMessage={
                    realmPercent > 50
                      ? `Tuyệt vời! Bạn đã vượt qua ${realmPercent}% cõi ${currentRealm.nameVi}! 🚀`
                      : `Cùng ${mascot.name} chinh phục ${currentRealm.nameVi} để thu thập sao và kim cương nhé! ✨`
                  }
                />
              </div>
            </div>

            {/* 2. Equipped Gear Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4.5 backdrop-blur-xl shadow-xl text-left">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-game font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Rocket className="w-4 h-4 text-purple-400" />
                  <span>Chiến Hạm & Vũ Khí</span>
                </div>
                <button
                  onClick={onOpenArmory}
                  className="text-xs font-game font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                >
                  Xưởng Tàu
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2.5">
                  <span className="text-2xl">{equippedShip.icon}</span>
                  <div>
                    <div className="font-bold text-white text-sm">{equippedShip.nameVi}</div>
                    <div className="text-[11px] text-slate-400">{equippedShip.perkDescription}</div>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white text-sm">{equippedBlaster.nameVi}</div>
                    <div className="text-[11px] text-slate-400">Tia: {equippedLaser.nameVi}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenArmory}
                className="w-full mt-3 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white rounded-xl text-xs font-game font-extrabold shadow-md transition cursor-pointer active:scale-95"
              >
                MỞ XƯỞNG NÂNG CẤP 🚀
              </button>
            </div>

            {/* 3. Quick Chapter Bookmarks within Current Realm */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4.5 backdrop-blur-xl shadow-xl text-left">
              <div className="text-xs font-game font-extrabold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Mục Lục {currentRealm.gradeLabel}</span>
              </div>

              <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {currentRealm.units.map(u => {
                  const uDone = u.levels.filter(l => progress.levelProgressMap[l.id]?.isCompleted).length;
                  const isAllDone = uDone === u.levels.length;

                  return (
                    <button
                      key={u.id}
                      onClick={() => handleJumpToChapter(String(u.unitNumber))}
                      className="w-full p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span>{u.icon}</span>
                        <span className="text-slate-300 group-hover:text-white font-medium truncate">
                          Ch.{u.unitNumber}: {u.titleVi}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                        isAllDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {uDone}/{u.levels.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating "Tiếp tục bài học" Quick Button */}
      <button
        onClick={handleJumpToCurrent}
        className={`fixed bottom-6 right-6 z-40 px-5 py-3.5 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-game font-black text-sm sm:text-base rounded-2xl shadow-[0_10px_30px_${theme.glowColor}] border border-white/60 flex items-center gap-2 cursor-pointer transition active:scale-95 hover:scale-105`}
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
