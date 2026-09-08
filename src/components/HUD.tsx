import React from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { Heart, Flame, Sparkles, Volume2, VolumeX, Pause } from 'lucide-react';
import { MascotWidget } from './mascot/MascotWidget';

interface HUDProps {
  stats: GameStats;
  level: LevelNode;
  hearts: number;
  maxHearts: number;
  totalWords: number;
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
  isMuted,
  onToggleMute,
  onPause
}) => {
  // Calculate Duolingo progress percentage for the current lesson
  const progressPercent = totalWords > 0
    ? Math.min(100, Math.round((stats.wordsDefeated / totalWords) * 100))
    : 0;

  return (
    <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 pointer-events-none flex flex-col gap-2 z-20 select-none">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-3">
        {/* Left: Pause & Level Info */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onPause}
            className="p-2.5 bg-slate-900/85 hover:bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 rounded-2xl transition text-slate-200 shadow-md active:scale-95 cursor-pointer"
            title="Tạm dừng"
          >
            <Pause className="w-5 h-5 text-cyan-300" />
          </button>

          <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 bg-slate-900/90 border-2 border-slate-700 rounded-2xl backdrop-blur-md">
            <span className="text-2xl">{level.icon}</span>
            <div>
              <div className="text-xs text-cyan-300 font-extrabold uppercase">Màn {level.levelNumber}</div>
              <div className="text-sm font-bold text-white leading-tight">{level.titleVi}</div>
            </div>
          </div>
        </div>

        {/* Center: Duolingo Lesson Progress Bar */}
        <div className="flex-1 max-w-xs sm:max-w-md pointer-events-auto">
          <div className="w-full h-4 sm:h-5 bg-slate-900/90 rounded-full border-2 border-slate-700 overflow-hidden shadow-inner flex items-center p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Right: Hearts & Score */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* 5 Hearts Display */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border-2 border-rose-500/60 rounded-2xl px-3.5 py-1.5 shadow-md">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
            <span className="font-game font-bold text-base text-rose-300">
              {hearts}/{maxHearts}
            </span>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border-2 border-amber-400/60 rounded-2xl px-3.5 py-1.5 shadow-md">
            <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-game font-bold text-base text-yellow-300">{stats.score}</span>
          </div>

          {/* Streak Combo */}
          {stats.combo > 1 && (
            <div className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-rose-600 border-2 border-pink-300 rounded-2xl px-3.5 py-1.5 shadow-md animate-bounce">
              <Flame className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="font-game font-bold text-sm text-white">x{stats.combo}</span>
            </div>
          )}

          {/* Mute Button */}
          <button
            onClick={onToggleMute}
            className="p-2.5 bg-slate-900/85 hover:bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 rounded-2xl transition text-slate-200 shadow-md active:scale-95 cursor-pointer"
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
