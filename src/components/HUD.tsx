import React from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../data/upgrade-types';
import { Heart, Sparkles, Volume2, VolumeX, Pause, Timer } from 'lucide-react';

interface HUDProps {
  stats: GameStats;
  level: LevelNode;
  hearts: number;
  maxHearts: number;
  totalWords: number;
  timeRemaining?: number;
  totalTime?: number;
  difficulty?: DifficultyLevel;
  isMuted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  stats,
  level,
  hearts,
  maxHearts,
  totalWords,
  timeRemaining,
  totalTime = 45,
  difficulty = 'NORMAL',
  isMuted,
  onToggleMute,
  onPause
}) => {
  // Calculate progress percentage for the current lesson
  const progressPercent = totalWords > 0
    ? Math.min(100, Math.round((stats.wordsDefeated / totalWords) * 100))
    : 0;

  const isUrgent = timeRemaining !== undefined && timeRemaining <= 10;
  const timePercent = timeRemaining !== undefined && totalTime > 0
    ? Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100))
    : 100;

  return (
    <div className="absolute top-0 left-0 right-0 p-2 sm:p-3 pointer-events-none flex flex-col z-20 select-none">
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between gap-2">
        {/* Left: Pause & Level Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onPause}
            className="p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400 rounded-xl transition text-slate-200 shadow-sm active:scale-95 cursor-pointer backdrop-blur-md"
            title="Tạm dừng"
          >
            <Pause className="w-4 h-4 text-cyan-300" />
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 border border-slate-700/80 rounded-xl backdrop-blur-md">
            <span className="text-base">{level.icon}</span>
            <span className="text-xs font-game font-extrabold text-white">
              Màn {level.levelNumber}
            </span>
          </div>
        </div>

        {/* Center: Sleek Dual Progress (Words & Timer) */}
        <div className="flex-1 max-w-xs sm:max-w-sm pointer-events-auto flex flex-col gap-1 px-2">
          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-950/80 rounded-full border border-slate-800 overflow-hidden flex items-center p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          {/* Time Remaining Bar */}
          {timeRemaining !== undefined && (
            <div className="flex items-center justify-between text-[11px] font-bold px-0.5">
              <span className="text-slate-400">
                {stats.wordsDefeated}/{totalWords} từ
              </span>

              <span
                className={`flex items-center gap-1 font-game ${
                  isUrgent ? 'text-rose-400 animate-pulse font-extrabold' : 'text-cyan-300'
                }`}
              >
                <Timer className="w-3 h-3" />
                {timeRemaining}s
              </span>
            </div>
          )}
        </div>

        {/* Right: Hearts, Score & Mute */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {/* Hearts */}
          <div className="flex items-center gap-1 bg-slate-900/80 border border-rose-500/40 rounded-xl px-2.5 py-1 backdrop-blur-md">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="font-game font-bold text-xs text-rose-300">
              {hearts}/{maxHearts}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 bg-slate-900/80 border border-amber-400/40 rounded-xl px-2.5 py-1 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="font-game font-bold text-xs text-yellow-300">{stats.score}</span>
          </div>

          {/* Mute Button */}
          <button
            onClick={onToggleMute}
            className="p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 rounded-xl transition text-slate-200 shadow-sm active:scale-95 cursor-pointer backdrop-blur-md"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

