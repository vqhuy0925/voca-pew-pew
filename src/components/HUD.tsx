import React from 'react';
import { GameStats, VocabTheme } from '../data/types';
import { Shield, Flame, Volume2, VolumeX, Sparkles, Pause } from 'lucide-react';
import { soundFx } from '../game/engine/SoundController';

interface HUDProps {
  stats: GameStats;
  theme: VocabTheme;
  isMuted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  stats,
  theme,
  isMuted,
  onToggleMute,
  onPause
}) => {
  const healthPercent = Math.max(0, Math.min(100, (stats.stationHealth / stats.maxHealth) * 100));

  return (
    <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none flex flex-col gap-2 z-20">
      {/* Top Main Bar */}
      <div className="flex items-center justify-between gap-2 max-w-5xl mx-auto w-full">
        {/* Left: Current Theme & Health */}
        <div className="flex items-center gap-3 bg-space-card/85 backdrop-blur-md border border-cyan-500/40 rounded-2xl px-4 py-2 pointer-events-auto shadow-lg">
          <div className="text-2xl">{theme.icon}</div>
          <div>
            <div className="text-xs text-cyan-300 font-medium uppercase tracking-wider">{theme.titleVi}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              <div className="w-24 sm:w-32 h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    healthPercent > 50 ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' :
                    healthPercent > 25 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                    'bg-gradient-to-r from-red-600 to-rose-500 animate-pulse'
                  }`}
                  style={{ width: `${healthPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-200">{stats.stationHealth} HP</span>
            </div>
          </div>
        </div>

        {/* Center: Score & Combo Streak */}
        <div className="flex items-center gap-3">
          {/* Score Box */}
          <div className="bg-space-card/85 backdrop-blur-md border border-yellow-400/40 rounded-2xl px-5 py-2 text-center pointer-events-auto shadow-lg">
            <div className="text-[10px] text-yellow-300 font-semibold uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Điểm Số
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-yellow-300 font-game leading-tight">
              {stats.score.toLocaleString()}
            </div>
          </div>

          {/* Combo Multiplier */}
          {stats.combo > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-pink-600/90 to-rose-600/90 backdrop-blur-md border border-pink-400 rounded-2xl px-4 py-2 pointer-events-auto animate-bounce shadow-lg">
              <Flame className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <div>
                <div className="text-[10px] text-pink-200 uppercase font-bold">Streak</div>
                <div className="text-lg font-bold text-white leading-none">x{stats.combo}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Controls (Mute & Pause) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onToggleMute}
            className="p-2.5 bg-space-card/85 hover:bg-slate-700/80 border border-slate-700 hover:border-cyan-400 rounded-xl transition text-slate-200 hover:text-cyan-300 shadow-md active:scale-95"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
          </button>

          <button
            onClick={onPause}
            className="p-2.5 bg-space-card/85 hover:bg-slate-700/80 border border-slate-700 hover:border-cyan-400 rounded-xl transition text-slate-200 hover:text-cyan-300 shadow-md active:scale-95"
            title="Tạm dừng"
          >
            <Pause className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
