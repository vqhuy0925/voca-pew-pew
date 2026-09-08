import React, { useState, useMemo, useRef, useEffect } from 'react';
import { LEARNING_UNITS, AGE_REALMS, getRealmByChapterNumber, getRealmByAge } from '../../data/learning-path-data';
import { LevelNode, UserProgress } from '../../data/progress-types';
import { LevelNodeButton } from './LevelNodeButton';
import { TopNavBar } from './TopNavBar';
import { MascotWidget } from '../mascot/MascotWidget';
import { BookOpen, Trophy, Sparkles, Search, Compass, Target, ArrowRight, Zap, Award } from 'lucide-react';
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
      // Search across entire 200 chapters if query is typed
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

  // Overall calculations across all 200 chapters
  const totalLevels = LEARNING_UNITS.reduce((acc, u) => acc + u.levels.length, 0);
  const completedCount = Object.values(progress.levelProgressMap || {}).filter(p => p.isCompleted).length;
  const progressPercent = Math.round((completedCount / totalLevels) * 100);
  const playerName = progress.userName?.trim() || 'Bạn Nhỏ';

  // Realm specific completion
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
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#0a0c24] via-[#101438] to-[#080918] text-white select-none">
      {/* Top Bar */}
      <TopNavBar
        progress={progress}
        onUpdateProgress={onUpdateProgress}
        onOpenRefillModal={onOpenRefillModal}
        onOpenProfileModal={onOpenProfileModal}
        onOpenArmory={onOpenArmory}
      />

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-28">
        {/* Welcome & 200 Chapters Grand Banner */}
        <div className="bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-pink-600/30 border-2 border-cyan-400/40 rounded-3xl p-5 sm:p-6 mb-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-xs sm:text-sm font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> 200 Chương • 1,000 Màn Chơi (7 - 18 Tuổi)
                </div>
                {progress.userAge && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/20 border border-purple-400/40 rounded-full text-purple-300 text-xs font-semibold">
                    <span>🎂 {progress.userAge} Tuổi</span>
                  </div>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white">
                Chào {progress.avatar || '🚀'} {playerName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                Luyện gõ bàn phím siêu tốc và chinh phục hàng ngàn từ vựng tiếng Anh chuẩn quốc tế!
              </p>
            </div>

            <MascotWidget mood="happy" className="hidden sm:flex flex-shrink-0" />
          </div>

          {/* Overall 200 Chapters Progress Bar */}
          <div className="mt-4 pt-3 border-t border-slate-700/60">
            <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-200 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-400" /> Tiến độ thiên hà (200 Chương)
              </span>
              <span className="text-cyan-300 font-bold">{completedCount}/{totalLevels} màn ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6 Age Realms Switcher Tabs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> 6 Vùng Độ Tuổi (Realms)
            </span>
            <span className="text-[11px] text-slate-400">Chọn cấp độ để nhảy nhanh</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {AGE_REALMS.map((realm) => {
              const isSelected = realm.id === activeRealmId && !searchQuery;
              const rLevels = realm.units.flatMap(u => u.levels);
              const rCompleted = rLevels.filter(l => progress.levelProgressMap[l.id]?.isCompleted).length;

              return (
                <button
                  key={realm.id}
                  onClick={() => handleSelectRealm(realm.id)}
                  className={`p-3 rounded-2xl text-left transition-all border-2 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/25 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.35)] scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xl">{realm.icon}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      Ch. {realm.startChapter}-{realm.endChapter}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white truncate">{realm.nameVi}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-300 mt-1">
                    <span className="text-slate-400 font-semibold">{realm.ageRange}</span>
                    <span className="text-yellow-400 font-bold">{rCompleted}/{rLevels.length}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Jump Tools Bar */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-8">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ vựng, chủ đề (ví dụ: robot, AI, math, animals...)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-cyan-400 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Jump to Chapter dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={jumpChapter}
              onChange={(e) => handleJumpToChapter(e.target.value)}
              className="px-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl text-xs font-bold text-cyan-300 outline-none cursor-pointer"
            >
              <option value="">🚀 Nhảy tới Chương (1 - 200)...</option>
              {LEARNING_UNITS.map(u => (
                <option key={u.id} value={u.unitNumber}>
                  Chương {u.unitNumber}: {u.titleVi} ({u.icon})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Realm Info Header */}
        {!searchQuery && (
          <div className={`p-4 rounded-2xl border-2 border-slate-700/80 bg-gradient-to-r ${currentRealm.badgeBg} mb-8 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentRealm.icon}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-game text-white">
                    {currentRealm.nameVi} ({currentRealm.ageRange})
                  </h3>
                  <div className="text-xs text-slate-200 font-semibold">{currentRealm.gradeLabel} • Chương {currentRealm.startChapter} - {currentRealm.endChapter}</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-1.5">{currentRealm.description}</p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/50">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-yellow-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <Zap className="w-3.5 h-3.5 text-yellow-400" /> Tốc độ: {currentRealm.targetWpm}
              </span>
              <span className="text-[11px] text-cyan-300 font-bold">
                Độ dài: {currentRealm.wordLengthHint}
              </span>
            </div>
          </div>
        )}

        {/* Search Results Notification if active */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl text-xs text-cyan-200 flex items-center justify-between">
            <span>Tìm thấy <b>{displayedUnits.length}</b> chương phù hợp với "<i>{searchQuery}</i>"</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs underline text-cyan-400 hover:text-white"
            >
              Xem tất cả
            </button>
          </div>
        )}

        {/* Units List */}
        <div className="space-y-12">
          {displayedUnits.map((unit, uIdx) => {
            const unitCompletedCount = unit.levels.filter(
              l => progress.levelProgressMap[l.id]?.isCompleted
            ).length;

            return (
              <section
                key={unit.id}
                ref={(el) => { chapterRefs.current[unit.id] = el; }}
                className="relative scroll-mt-20"
              >
                {/* Unit Header Card */}
                <div
                  className={`bg-gradient-to-r ${unit.bannerBg} border-2 border-slate-700/80 rounded-3xl p-4 sm:p-5 shadow-lg mb-6 backdrop-blur-md`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                        Chương {unit.unitNumber} / 200
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-game text-white flex items-center gap-2 mt-0.5">
                        <span>{unit.icon}</span> {unit.titleVi}
                      </h3>
                      <p className="text-xs text-slate-200 mt-1">{unit.description}</p>
                    </div>

                    <div className="px-3 py-1 bg-slate-900/85 border border-slate-700 rounded-xl text-xs font-bold text-yellow-300 flex items-center gap-1.5 flex-shrink-0">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{unitCompletedCount}/{unit.levels.length}</span>
                    </div>
                  </div>
                </div>

                {/* Road of Level Nodes */}
                <div className="relative flex flex-col items-center">
                  {/* Decorative background connector line */}
                  <div className="absolute top-8 bottom-8 w-2.5 bg-slate-800/80 rounded-full z-0 border border-slate-700/50" />

                  {unit.levels.map((lvl, lIdx) => {
                    const globalIdx = uIdx * 5 + lIdx;
                    const offset = ZIGZAG_OFFSETS[globalIdx % ZIGZAG_OFFSETS.length];
                    const isCurrent = lvl.id === progress.currentLevelId;

                    return (
                      <div key={lvl.id} className="relative z-10 my-1.5">
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

      {/* Floating "Tiếp tục bài đang học" Quick Button */}
      <button
        onClick={handleJumpToCurrent}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-bold text-xs sm:text-sm rounded-2xl shadow-[0_4px_25px_rgba(0,240,255,0.4)] border-2 border-white/40 flex items-center gap-2 cursor-pointer transition-transform active:scale-95 animate-bounce duration-1000"
        title="Nhảy tới bài học hiện tại"
      >
        <Target className="w-4 h-4 stroke-[2.5]" />
        <span>Tiếp tục học</span>
        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </div>
  );
};
