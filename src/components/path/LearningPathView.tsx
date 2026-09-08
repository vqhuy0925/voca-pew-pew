import React from 'react';
import { LEARNING_UNITS } from '../../data/learning-path-data';
import { LevelNode, UserProgress } from '../../data/progress-types';
import { LevelNodeButton } from './LevelNodeButton';
import { TopNavBar } from './TopNavBar';
import { MascotWidget } from '../mascot/MascotWidget';
import { BookOpen, Trophy, Sparkles } from 'lucide-react';

interface LearningPathViewProps {
  progress: UserProgress;
  onSelectLevel: (level: LevelNode) => void;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenRefillModal: () => void;
}

// Zigzag offsets for winding Duolingo path
const ZIGZAG_OFFSETS = [0, 45, 75, 45, 0, -45, -75, -45];

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  progress,
  onSelectLevel,
  onUpdateProgress,
  onOpenRefillModal
}) => {
  // Calculate overall completion percentage
  const totalLevels = LEARNING_UNITS.reduce((acc, u) => acc + u.levels.length, 0);
  const completedCount = Object.values(progress.levelProgressMap).filter(p => p.isCompleted).length;
  const progressPercent = Math.round((completedCount / totalLevels) * 100);

  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#0a0c24] via-[#101438] to-[#080918] text-white select-none">
      {/* Top Duolingo Bar */}
      <TopNavBar
        progress={progress}
        onUpdateProgress={onUpdateProgress}
        onOpenRefillModal={onOpenRefillModal}
      />

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 py-6 pb-24">
        {/* Welcome & Progress Card */}
        <div className="bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-pink-600/30 border-2 border-cyan-400/40 rounded-3xl p-5 sm:p-6 mb-8 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-sm font-bold mb-2">
                <Sparkles className="w-4 h-4" /> Lộ trình học Lớp 2
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white">
                Hành Trình Từ Vựng Vũ Trụ 🌟
              </h2>
              <p className="text-sm sm:text-base text-slate-200 mt-1">
                Hoàn thành các bài học để bảo vệ ngân hà và nhận thật nhiều Kim Cương!
              </p>
            </div>

            <MascotWidget mood="happy" className="hidden sm:flex flex-shrink-0" />
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-3 border-t border-slate-700/60">
            <div className="flex justify-between text-sm font-bold text-slate-200 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-400" /> Tiến độ khám phá
              </span>
              <span className="text-cyan-300 font-bold">{completedCount}/{totalLevels} màn ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Units List */}
        <div className="space-y-12">
          {LEARNING_UNITS.map((unit, uIdx) => {
            const unitCompletedCount = unit.levels.filter(
              l => progress.levelProgressMap[l.id]?.isCompleted
            ).length;
            const unitPercent = Math.round((unitCompletedCount / unit.levels.length) * 100);

            return (
              <section key={unit.id} className="relative">
                {/* Unit Header Card */}
                <div
                  className={`bg-gradient-to-r ${unit.bannerBg} border-2 border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-lg mb-8 backdrop-blur-md`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300">
                        Chương {unit.unitNumber}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-game text-white flex items-center gap-2 mt-1">
                        <span>{unit.icon}</span> {unit.titleVi}
                      </h3>
                      <p className="text-sm text-slate-200 mt-1">{unit.description}</p>
                    </div>

                    <div className="px-3.5 py-1.5 bg-slate-900/85 border border-slate-700 rounded-2xl text-sm font-bold text-yellow-300 flex items-center gap-1.5 flex-shrink-0">
                      <BookOpen className="w-4 h-4" />
                      <span>{unitCompletedCount}/{unit.levels.length}</span>
                    </div>
                  </div>
                </div>

                {/* Road of Level Nodes */}
                <div className="relative flex flex-col items-center">
                  {/* Decorative background connector line */}
                  <div className="absolute top-10 bottom-10 w-3 bg-slate-800/80 rounded-full z-0 border border-slate-700/50" />

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
    </div>
  );
};
