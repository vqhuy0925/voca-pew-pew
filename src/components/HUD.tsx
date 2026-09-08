import React from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../data/upgrade-types';
import { Heart, Flame, Sparkles, Volume2, VolumeX, Pause, Timer } from 'lucide-react';
import { MascotWidget } from './mascot/MascotWidget';

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

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.NORMAL;
  const isUrgent = timeRemaining !== undefined && timeRemaining <= 10;
  const timePercent = timeRemaining !== undefined && totalTime > 0
    ? Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100))
    : 100;

  return (
    <div className="absolute top-0 left-0 right-0 p-2 sm:p-4 pointer-events-none flex flex-col gap-2 z-20 select-none">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Pause & Level Info */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onPause}
            className="p-2 sm:p-2.5 bg-slate-900/85 hover:bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 rounded-2xl transition text-slate-200 shadow-md active:scale-95 cursor-pointer"
            title="Tạm dừng"
          >
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 border-2 border-slate-700 rounded-2xl backdrop-blur-md">
            <span className="text-xl">{level.icon}</span>
            <div>
              <div className="text-[10px] text-cyan-300 font-extrabold uppercase leading-tight">Màn {level.levelNumber}</div>
              <div className="text-xs font-bold text-white leading-tight truncate max-w-[100px]">{level.titleVi}</div>
            </div>
            <div
              className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border ml-1"
              style={{ color: diffConfig.color, borderColor: diffConfig.color }}
            >
              {diffConfig.badge}
            </div>
          </div>
        </div>

        {/* Center: Lesson Progress & Countdown Timer */}
        <div className="flex-1 max-w-xs sm:max-w-sm pointer-events-auto flex flex-col gap-1">
          {/* Words Progress Bar */}
          <div className="w-full h-3.5 sm:h-4 bg-slate-900/90 rounded-full border-2 border-slate-700 overflow-hidden shadow-inner flex items-center p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          {/* Time Countdown Urgency Indicator */}
          {timeRemaining !== undefined && (
            <div className="flex items-center gap-1.5 px-1">
              <Timer
                className={`w-3.5 h-3.5 ${
                  isUrgent ? 'text-rose-400 animate-bounce' : 'text-cyan-400'
                }`}
              />
              <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-200 rounded-full ${
                    isUrgent
                      ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                      : timeRemaining <= 20
                      ? 'bg-amber-400'
                      : 'bg-cyan-400'
                  }`}
                  style={{ width: `${timePercent}%` }}
                />
              </div>
              <span
                className={`font-game text-xs font-extrabold ${
                  isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-300'
                }`}
              >
                {timeRemaining}s
              </span>
            </div>
          )}
        </div>

        {/* Right: Hearts, Score & Mute */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {/* Hearts Display */}
          <div className="flex items-center gap-1 bg-slate-900/90 border-2 border-rose-500/60 rounded-2xl px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-md">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
            <span className="font-game font-bold text-xs sm:text-sm text-rose-300">
              {hearts}/{maxHearts}
            </span>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-1 bg-slate-900/90 border-2 border-amber-400/60 rounded-2xl px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-md">
            <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-game font-bold text-xs sm:text-sm text-yellow-300">{stats.score}</span>
          </div>

          {/* Streak Combo */}
          {stats.combo > 1 && (
            <div className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-pink-600 to-rose-600 border-2 border-pink-300 rounded-2xl px-2.5 py-1 shadow-md animate-bounce">
              <Flame className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="font-game font-bold text-xs text-white">x{stats.combo}</span>
            </div>
          )}

          {/* Mute Button */}
          <button
            onClick={onToggleMute}
            className="p-2 sm:p-2.5 bg-slate-900/85 hover:bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 rounded-2xl transition text-slate-200 shadow-md active:scale-95 cursor-pointer"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            )}
          </button>
        </div>
      </div>

      {/* Floating Mascot in in-game corner */}
      <div className="max-w-4xl mx-auto w-full flex justify-end pointer-events-auto pr-2">
        <MascotWidget
          mood={stats.combo > 3 ? 'cheering' : 'happy'}
          combo={stats.combo}
        />
      </div>
    </div>
  );
};

