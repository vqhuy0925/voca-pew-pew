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
      {/* Current Active Floating Tag ("BẮT ĐẦU" / "START" callout) */}
      {isCurrent && (
        <div className="absolute -top-10 z-20 animate-bounce">
          <div className="bg-white text-slate-900 font-game font-extrabold text-xs sm:text-sm uppercase px-3.5 py-1 rounded-xl shadow-lg border-2 border-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Bắt Đầu</span>
          </div>
          <div className="w-2.5 h-2.5 bg-white rotate-45 mx-auto -mt-1 border-r border-b border-emerald-400" />
        </div>
      )}

      {/* Outer Pulse Ring for Current Active Node */}
      {isCurrent && (
        <div className="absolute inset-0 w-22 h-22 -top-1 -left-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
      )}

      {/* Main Circular 3D Button */}
      <button
        onClick={handleClick}
        disabled={!isUnlocked}
        className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full flex flex-col items-center justify-center font-game font-bold transition-all duration-150 select-none ${
          isUnlocked
            ? 'cursor-pointer hover:scale-105 active:translate-y-1.5 active:border-b-0'
            : 'cursor-not-allowed opacity-60'
        } ${getNodeColorClass()}`}
      >
        {/* Node Icon / State */}
        {!isUnlocked ? (
          <Lock className="w-8 h-8 text-slate-400" />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl leading-none">{level.icon}</span>
            {level.type !== 'CHEST_REWARD' && (
              <span className="text-xs font-extrabold mt-0.5 tracking-tight text-white">
                {level.levelNumber}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Title Below Node */}
      <div className="mt-2 text-center max-w-[150px]">
        <div className={`font-game font-bold text-sm sm:text-base line-clamp-1 ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
          {level.titleVi}
        </div>

        {/* Stars Display for standard/boss levels */}
        {level.type !== 'CHEST_REWARD' && isUnlocked && (
          <div className="flex justify-center items-center gap-1 mt-1">
            {[1, 2, 3].map(sIndex => (
              <Star
                key={sIndex}
                className={`w-4 h-4 ${
                  sIndex <= stars
                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(255,230,0,0.9)]'
                    : 'text-slate-700 fill-slate-800'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
