import React from 'react';
import { Play, RotateCcw, LayoutGrid } from 'lucide-react';
import { VocabTheme } from '../data/types';

interface PauseModalProps {
  theme: VocabTheme;
  onResume: () => void;
  onRestart: () => void;
  onChangeTheme: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  theme,
  onResume,
  onRestart,
  onChangeTheme
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 text-center shadow-2xl">
        <h3 className="text-2xl font-bold font-game text-cyan-300 mb-1">TẠM DỪNG GAME</h3>
        <p className="text-xs text-slate-400 mb-6">Đang chơi chủ đề: {theme.titleVi}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onResume}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-game rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            Tiếp Tục Chơi
          </button>
          <button
            onClick={onRestart}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold font-game rounded-xl transition flex items-center justify-center gap-2 active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-yellow-400" />
            Chơi Lại Từ Đầu
          </button>
          <button
            onClick={onChangeTheme}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold font-game rounded-xl transition flex items-center justify-center gap-2 active:scale-95"
          >
            <LayoutGrid className="w-4 h-4 text-cyan-400" />
            Đổi Chủ Đề Khác
          </button>
        </div>
      </div>
    </div>
  );
};
