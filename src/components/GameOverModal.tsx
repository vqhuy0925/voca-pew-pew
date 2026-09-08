import React from 'react';
import { GameStats, VocabTheme } from '../data/types';
import { AlertTriangle, RotateCcw, LayoutGrid } from 'lucide-react';

interface GameOverModalProps {
  stats: GameStats;
  theme: VocabTheme;
  onRestart: () => void;
  onChangeTheme: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  stats,
  theme,
  onRestart,
  onChangeTheme
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-[#1c0d16] to-slate-950 border-2 border-rose-500/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.35)] text-center">
        {/* Danger Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500/20 border-2 border-rose-500 rounded-full mb-3 shadow-[0_0_20px_rgba(244,63,94,0.5)]">
          <AlertTriangle className="w-8 h-8 text-rose-400" />
        </div>

        <h2 className="text-3xl font-bold font-game text-rose-400 mb-1">
          TRẠM BỊ THẤT THỦ!
        </h2>
        <p className="text-slate-300 text-sm mb-6">
          Không sao cả, bé hãy thử lại để đánh bại các từ vựng này nhé!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-xs text-slate-400 uppercase font-semibold">Điểm đạt được</div>
            <div className="text-2xl font-bold text-yellow-300 font-game">{stats.score}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-xs text-slate-400 uppercase font-semibold">Từ đã gõ đúng</div>
            <div className="text-2xl font-bold text-cyan-300 font-game">{stats.wordsDefeated}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold font-game rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Thử Lại Ngay
          </button>
          <button
            onClick={onChangeTheme}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400 text-white font-bold font-game rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <LayoutGrid className="w-4 h-4 text-cyan-400" />
            Đổi Chủ Đề
          </button>
        </div>
      </div>
    </div>
  );
};
