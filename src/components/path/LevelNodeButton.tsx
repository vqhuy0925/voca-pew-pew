import React from 'react';
import { LevelNode, LevelProgress } from '../../data/progress-types';
import { Lock, Star, Sparkles } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';

interface LevelNodeButtonProps {
  level: LevelNode;
  progress?: LevelProgress;
  isCurrent: boolean;
  onSelect: (level: LevelNode) => void;
  offsetX?: number; // Visual zigzag offset for the winding path
}

export const LevelNodeButton: React.FC<LevelNodeButtonProps> = ({
  level,
  progress,
  isCurrent,
  onSelect,
  offsetX = 0
}) => {
  const isUnlocked = progress?.isUnlocked ?? false;
  const isCompleted = progress?.isCompleted ?? false;
  const stars = progress?.stars ?? 0;

  const handleClick = () => {
    if (!isUnlocked) {
      soundFx.playWrong();
      return;
    }
    soundFx.playClick();
    onSelect(level);
  };

  // Node Color styling
  const getNodeColorClass = () => {
    if (!isUnlocked) {
      return 'bg-slate-800 border-slate-700 text-slate-500 shadow-none';
    }

    if (level.type === 'CHEST_REWARD') {
      return isCompleted
        ? 'bg-amber-600 border-b-6 border-amber-800 text-amber-200'
        : 'bg-gradient-to-b from-amber-400 to-amber-500 border-b-6 border-amber-700 text-slate-950 shadow-[0_10px_25px_rgba(245,158,11,0.4)]';
    }

    if (level.type === 'BOSS_BATTLE') {
      return isCompleted
        ? 'bg-purple-700 border-b-6 border-purple-950 text-white'
        : 'bg-gradient-to-b from-purple-500 to-indigo-600 border-b-6 border-purple-900 text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)]';
    }

    if (level.type === 'SPEED_RUSH') {
      return isCompleted
        ? 'bg-orange-600 border-b-6 border-orange-800 text-white'
        : 'bg-gradient-to-b from-orange-400 to-amber-500 border-b-6 border-orange-700 text-slate-950 shadow-[0_10px_25px_rgba(249,115,22,0.4)]';
    }

    // Standard lesson
    return isCompleted
      ? 'bg-emerald-600 border-b-6 border-emerald-800 text-white'
      : 'bg-gradient-to-b from-emerald-400 to-teal-500 border-b-6 border-emerald-700 text-slate-950 shadow-[0_10px_25px_rgba(16,185,129,0.4)]';
  };

  return (
    <div
      className="relative flex flex-col items-center my-3 transition-transform duration-300"
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      {/* Current Active Floating Tag */}
      {isCurrent && (
        <div className="absolute -top-9 z-20">
          <div className="bg-cyan-400 text-slate-950 font-game font-extrabold text-xs uppercase px-3 py-0.5 rounded-lg shadow-md flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Bắt Đầu</span>
          </div>
          <div className="w-2 h-2 bg-cyan-400 rotate-45 mx-auto -mt-1" />
        </div>
      )}

      {/* Main Circular Button */}
      <button
        onClick={handleClick}
        disabled={!isUnlocked}
        className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center font-game font-bold transition-all duration-150 select-none ${
          isUnlocked
            ? 'cursor-pointer hover:scale-105 active:translate-y-1 active:border-b-0'
            : 'cursor-not-allowed opacity-50'
        } ${getNodeColorClass()}`}
      >
        {/* Node Icon / State */}
        {!isUnlocked ? (
          <Lock className="w-7 h-7 text-slate-400" />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl leading-none">{level.icon}</span>
            {level.type !== 'CHEST_REWARD' && (
              <span className="text-[11px] font-extrabold mt-0.5 tracking-tight text-white">
                {level.levelNumber}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Title Below Node */}
      <div className="mt-1.5 text-center max-w-[140px]">
        <div className={`font-game font-bold text-xs sm:text-sm line-clamp-1 ${isUnlocked ? 'text-slate-100' : 'text-slate-500'}`}>
          {level.titleVi}
        </div>

        {/* Stars Display for standard/boss levels */}
        {level.type !== 'CHEST_REWARD' && isUnlocked && (
          <div className="flex justify-center items-center gap-0.5 mt-0.5">
            {[1, 2, 3].map(sIndex => (
              <Star
                key={sIndex}
                className={`w-3.5 h-3.5 ${
                  sIndex <= stars
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-slate-800 fill-slate-800'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
