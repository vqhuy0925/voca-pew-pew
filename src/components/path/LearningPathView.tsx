import React, { useState, useMemo, useRef } from 'react';
import { LEARNING_UNITS, AGE_REALMS, getRealmByChapterNumber, getRealmByAge } from '../../data/learning-path-data';
import { LevelNode, UserProgress } from '../../data/progress-types';
import { LevelNodeButton } from './LevelNodeButton';
import { TopNavBar } from './TopNavBar';
import { Search, Target, ArrowRight } from 'lucide-react';
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
const ZIGZAG_OFFSETS = [0, 45, 75, 45, 0, -45, -75, -45];

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  progress,
  onSelectLevel,
  onUpdateProgress,
  onOpenRefillModal,
  onOpenProfileModal,
  onOpenArmory
}) => {
  // Determine active realm (defaults to user's saved realm, or realm based on current level, or user age)
  const [activeRealmId, setActiveRealmId] = useState<string>(() => {
    if (progress.selectedRealmId) return progress.selectedRealmId;
    if (progress.userAge) return getRealmByAge(progress.userAge).id;
    return 'realm-1';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jumpChapter, setJumpChapter] = useState<string>('');
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});

  const currentRealm = useMemo(() => {
    return AGE_REALMS.find(r => r.id === activeRealmId) || AGE_REALMS[0];
  }, [activeRealmId]);

  // Filter units according to active realm and search query
  const displayedUnits = useMemo(() => {
    let units = currentRealm.units;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
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
  const realmPercent = Math.round((realmCompletedLevels / realmTotalLevels) * 100);

  const handleSelectRealm = (realmId: string) => {
    soundFx.playClick();
    setActiveRealmId(realmId);
    setSearchQuery('');
    setJumpChapter('');
    onUpdateProgress(p => ({ ...p, selectedRealmId: realmId }));
  };

  const handleJumpToChapter = (chapterNumStr: string) => {
    const num = parseInt(chapterNumStr, 10);
    if (isNaN(num) || num < 1 || num > 200) return;
    soundFx.playClick();
    const targetRealm = getRealmByChapterNumber(num);
    setActiveRealmId(targetRealm.id);
    setSearchQuery('');
    setJumpChapter(chapterNumStr);

    setTimeout(() => {
      const el = chapterRefs.current[`unit-${num}`];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleJumpToCurrent = () => {
    soundFx.playClick();
    const curLevelId = progress.currentLevelId;
    const curUnit = LEARNING_UNITS.find(u => u.levels.some(l => l.id === curLevelId));
    if (curUnit) {
      const targetRealm = getRealmByChapterNumber(curUnit.unitNumber);
      setActiveRealmId(targetRealm.id);
      setTimeout(() => {
        const el = chapterRefs.current[curUnit.id];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#090b1e] via-[#0d102b] to-[#080918] text-white select-none">
      {/* Top Bar */}
      <TopNavBar
        progress={progress}
        onUpdateProgress={onUpdateProgress}
        onOpenRefillModal={onOpenRefillModal}
        onOpenProfileModal={onOpenProfileModal}
        onOpenArmory={onOpenArmory}
      />

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 py-4 pb-24">
        {/* 1. Sleek Realm Category Tabs (Horizontal Pill Selector) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3 -mx-2 px-2">
          {AGE_REALMS.map((realm) => {
            const isSelected = realm.id === activeRealmId && !searchQuery;
            return (
              <button
                key={realm.id}
                onClick={() => handleSelectRealm(realm.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-game font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md scale-102'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{realm.icon}</span>
                <span>{realm.gradeLabel}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Compact Active Realm Summary Card */}
        {!searchQuery && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 mb-4 backdrop-blur-md flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentRealm.icon}</span>
                <span className="font-game font-extrabold text-sm sm:text-base text-white">
                  {currentRealm.nameVi} ({currentRealm.ageRange})
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Chương {currentRealm.startChapter} - {currentRealm.endChapter} • Tốc độ: {currentRealm.targetWpm}
              </div>
            </div>

            {/* Realm Progress bar */}
            <div className="text-right flex-shrink-0">
              <div className="text-xs font-bold text-cyan-300">
                {realmCompletedLevels}/{realmTotalLevels} ({realmPercent}%)
              </div>
              <div className="w-20 sm:w-24 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mt-1">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${realmPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. Compact Search & Chapter Jump Tool */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ vựng, chủ đề..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900/80 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white placeholder:text-slate-500 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={jumpChapter}
            onChange={(e) => handleJumpToChapter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs font-bold text-cyan-300 outline-none cursor-pointer max-w-[140px] truncate"
          >
            <option value="">Nhảy chương...</option>
            {LEARNING_UNITS.map(u => (
              <option key={u.id} value={u.unitNumber}>
                Ch.{u.unitNumber}: {u.titleVi}
              </option>
            ))}
          </select>
        </div>

        {/* Search Notice */}
        {searchQuery && (
          <div className="mb-4 p-2.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 flex items-center justify-between">
            <span>Tìm thấy <b>{displayedUnits.length}</b> chương</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-cyan-400 underline hover:text-white"
            >
              Xem tất cả
            </button>
          </div>
        )}

        {/* 4. Units & Road of Level Nodes */}
        <div className="space-y-10">
          {displayedUnits.map((unit, uIdx) => {
            const unitCompletedCount = unit.levels.filter(
              l => progress.levelProgressMap[l.id]?.isCompleted
            ).length;

            return (
              <section
                key={unit.id}
                ref={(el) => { chapterRefs.current[unit.id] = el; }}
                className="relative scroll-mt-16"
              >
                {/* Clean Chapter Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900/60 border border-slate-800 rounded-2xl mb-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-xl">{unit.icon}</span>
                    <div className="truncate">
                      <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                        Chương {unit.unitNumber}
                      </div>
                      <div className="font-game font-bold text-sm text-white truncate">
                        {unit.titleVi}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-300 px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700/60 flex-shrink-0">
                    {unitCompletedCount}/{unit.levels.length}
                  </span>
                </div>

                {/* Road of Level Nodes */}
                <div className="relative flex flex-col items-center">
                  {/* Subtle background path line */}
                  <div className="absolute top-6 bottom-6 w-2 bg-slate-800/60 rounded-full z-0" />

                  {unit.levels.map((lvl, lIdx) => {
                    const globalIdx = uIdx * 5 + lIdx;
                    const offset = ZIGZAG_OFFSETS[globalIdx % ZIGZAG_OFFSETS.length];
                    const isCurrent = lvl.id === progress.currentLevelId;

                    return (
                      <div key={lvl.id} className="relative z-10 my-1">
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

      {/* Floating "Tiếp tục bài học" Quick Button */}
      <button
        onClick={handleJumpToCurrent}
        className="fixed bottom-5 right-5 z-40 px-3.5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-game font-bold text-xs sm:text-sm rounded-xl shadow-lg border border-white/30 flex items-center gap-1.5 cursor-pointer transition active:scale-95"
        title="Nhảy tới bài học hiện tại"
      >
        <Target className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Tiếp tục học</span>
        <ArrowRight className="w-3 h-3 stroke-[2.5]" />
      </button>
    </div>
  );
};
