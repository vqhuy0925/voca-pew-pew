import React from 'react';
import { GameStats, VocabTheme } from '../data/types';
import { Star, Trophy, RotateCcw, LayoutGrid, Volume2, Sparkles } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';

interface VictoryModalProps {
  stats: GameStats;
  theme: VocabTheme;
  onRestart: () => void;
  onChangeTheme: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  theme,
  onRestart,
  onChangeTheme
}) => {
  // Calculate Star Rating (1 to 3 stars)
  let stars = 1;
  if (stats.stationHealth >= 70 && stats.accuracy >= 75) {
    stars = 3;
  } else if (stats.stationHealth >= 40) {
    stars = 2;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-[#10143a] to-slate-950 border-2 border-yellow-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,230,0,0.3)] text-center my-8">
        {/* Victory Trophy Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/20 border-2 border-yellow-400 rounded-full mb-3 shadow-[0_0_30px_rgba(255,230,0,0.5)]">
          <Trophy className="w-10 h-10 text-yellow-300" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-game text-yellow-300 drop-shadow mb-1">
          XUẤT SẮC! CHIẾN THẮNG! 🎉
        </h2>
        <p className="text-slate-300 text-sm mb-4">
          Bé đã hoàn thành xuất sắc chủ đề <span className="font-semibold text-cyan-300">{theme.titleVi}</span>!
        </p>

        {/* Stars */}
        <div className="flex justify-center items-center gap-3 mb-6">
          {[1, 2, 3].map((starIndex) => (
            <Star
              key={starIndex}
              className={`w-10 h-10 transition-all duration-300 ${
                starIndex <= stars
                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_12px_rgba(255,230,0,0.8)] scale-110'
                  : 'text-slate-700 fill-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Điểm số</div>
            <div className="text-xl sm:text-2xl font-bold text-yellow-300 font-game">{stats.score}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Chính xác</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-game">{stats.accuracy}%</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Max Streak</div>
            <div className="text-xl sm:text-2xl font-bold text-pink-400 font-game">x{stats.maxCombo}</div>
          </div>
        </div>

        {/* Word Review Box (Bé cùng ôn tập từ vựng) */}
        <div className="text-left bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-6">
          <div className="text-xs uppercase tracking-wider text-cyan-300 font-bold mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Bảng Ôn Tập Từ Vựng Đã Học:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {theme.words.map((item) => (
              <div
                key={item.id}
                onClick={() => speechHelper.speak(item.word)}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:border-cyan-400 cursor-pointer transition active:scale-95 group"
                title="Bấm để nghe phát âm"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-lg">{item.emoji}</span>
                  <div className="leading-tight">
                    <div className="font-bold text-white text-sm group-hover:text-cyan-300">{item.word}</div>
                    <div className="text-[10px] text-slate-400 truncate">{item.meaningVi}</div>
                  </div>
                </div>
                <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-game rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Chơi Lại Màn Này
          </button>
          <button
            onClick={onChangeTheme}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400 text-white font-bold font-game rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <LayoutGrid className="w-4 h-4 text-cyan-400" />
            Chọn Chủ Đề Khác
          </button>
        </div>
      </div>
    </div>
  );
};
