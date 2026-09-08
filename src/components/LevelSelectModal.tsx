import React from 'react';
import { VocabTheme } from '../data/types';
import { VOCAB_THEMES } from '../data/vocab-levels';
import { Rocket, Sparkles, BookOpen } from 'lucide-react';

interface LevelSelectModalProps {
  selectedTheme: VocabTheme;
  onSelectTheme: (theme: VocabTheme) => void;
  onStartGame: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  selectedTheme,
  onSelectTheme,
  onStartGame
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-[#0d1030] to-slate-950 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-center">
        {/* Title & Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-400/40 rounded-full text-cyan-300 text-xs sm:text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Lớp 2 - Tiếng Anh Vui Nhộn
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold font-game text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-300 drop-shadow-md mb-2">
          VOCAB PEW PEW 🚀
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-6">
          Bảo vệ trạm không gian bằng cách gõ nhanh các chữ cái tiếng Anh đang rơi xuống!
        </p>

        {/* Theme Selection Grid */}
        <div className="text-left mb-3">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Chọn chủ đề từ vựng:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VOCAB_THEMES.map((theme) => {
              const isSelected = theme.id === selectedTheme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme)}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 text-left ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.35)] scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-700/60 hover:border-slate-500 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-3xl p-2 bg-slate-950/60 rounded-xl border border-slate-700">
                    {theme.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-base sm:text-lg">{theme.titleVi}</div>
                    <div className="text-xs text-slate-400 font-medium">{theme.title} • {theme.words.length} từ</div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Game Action */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={onStartGame}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-game font-bold text-xl rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.5)] transition transform active:scale-95 flex items-center justify-center gap-3"
          >
            <Rocket className="w-6 h-6 animate-bounce" />
            BẮT ĐẦU CHƠI NGAY
          </button>
          <span className="text-xs text-slate-400">
            Mẹo: Nhấn phím bất kỳ trên bàn phím để bắn hạ mục tiêu
          </span>
        </div>
      </div>
    </div>
  );
};
