import React from 'react';
import { GameStats } from '../data/types';
import { LevelNode, ThemeStyle } from '../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../data/upgrade-types';
import { THEME_CONFIGS } from '../data/theme-types';
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
  themeStyle?: ThemeStyle;
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
  themeStyle = 'cosmic_cyan',
  isMuted,
  onToggleMute,
  onPause
}) => {
  const theme = THEME_CONFIGS[themeStyle] || THEME_CONFIGS.cosmic_cyan;
  // Calculate progress percentage for the current lesson
  const progressPercent = totalWords > 0
    ? Math.min(100, Math.round((stats.wordsDefeated / totalWords) * 100))
    : 0;

  const isUrgent = timeRemaining !== undefined && timeRemaining <= 10;
  const timePercent = timeRemaining !== undefined && totalTime > 0
    ? Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100))
    : 100;

  return (
    <div className="absolute top-0 left-0 right-0 p-2 sm:p-4 pointer-events-none flex flex-col z-20 select-none">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Left: Pause & Level Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 pointer-events-auto">
          <button
            onClick={onPause}
            className="p-2 sm:p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400 rounded-xl sm:rounded-2xl transition text-slate-200 shadow-md active:scale-95 cursor-pointer backdrop-blur-md"
            title="Tạm dừng"
          >
            <Pause className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-300" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-slate-900/90 border border-slate-700/80 rounded-xl sm:rounded-2xl backdrop-blur-md shadow-md">
            <span className="text-base sm:text-2xl">{level.icon}</span>
            <span className="text-[11px] sm:text-sm font-orbitron font-extrabold text-white whitespace-nowrap tracking-wide">
              Màn {level.levelNumber}
            </span>
          </div>
        </div>

        {/* Center: Sleek Dual Progress (Words & Timer) */}
        <div className="flex-1 max-w-[140px] sm:max-w-md pointer-events-auto flex flex-col gap-1 px-1 sm:px-2">
          {/* Progress bar */}
          <div className="w-full h-2 sm:h-3 bg-slate-950/90 rounded-full border border-slate-800 overflow-hidden flex items-center p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(0,240,255,0.6)]"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          {/* Time Remaining Bar */}
          {timeRemaining !== undefined && (
            <div className="flex items-center justify-between text-[10px] sm:text-sm font-bold px-0.5">
              <span className="text-slate-300 whitespace-nowrap font-orbitron text-[10px] sm:text-xs">
                {stats.wordsDefeated}/{totalWords} từ
              </span>

              <span
                className={`flex items-center gap-0.5 font-orbitron whitespace-nowrap tracking-wide ${
                  isUrgent ? 'text-rose-400 animate-pulse font-black text-xs sm:text-sm' : 'text-cyan-300 font-extrabold'
                }`}
              >
                <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {timeRemaining}s
              </span>
            </div>
          )}
        </div>

        {/* Right: Hearts, Score & Mute */}
        <div className="flex items-center gap-1 sm:gap-2.5 pointer-events-auto">
          {/* Hearts */}
          <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-slate-900/90 border border-rose-500/40 rounded-xl sm:rounded-2xl backdrop-blur-md shadow-md">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500" />
            <span className="font-orbitron font-extrabold text-[11px] sm:text-sm text-rose-300 tracking-wide">
              {hearts}/{maxHearts}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-slate-900/90 border border-amber-400/40 rounded-xl sm:rounded-2xl backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-orbitron font-extrabold text-[11px] sm:text-sm text-yellow-300 tracking-wide">{stats.score}</span>
          </div>

          {/* Mute Button */}
          <button
            onClick={onToggleMute}
            className="p-2 sm:p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 rounded-xl sm:rounded-2xl transition text-slate-200 shadow-md active:scale-95 cursor-pointer backdrop-blur-md"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

