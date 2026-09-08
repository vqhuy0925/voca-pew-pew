import React from 'react';
import { LevelNode } from '../data/progress-types';
import { Play, RotateCcw, Map } from 'lucide-react';
import { soundFx } from '../game/engine/SoundController';

interface PauseModalProps {
  level: LevelNode;
  onResume: () => void;
  onRestart: () => void;
  onGoToMap: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  level,
  onResume,
  onRestart,
  onGoToMap
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-[#101438] to-slate-950 border-3 border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 mx-auto mb-3 bg-cyan-500/20 border-3 border-cyan-400 rounded-full flex items-center justify-center text-3xl shadow-lg">
          ⏸️
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-game text-white mb-1">
          TẠM DỪNG 🚀
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mb-6">
          Đang chơi: <span className="text-cyan-300 font-bold">{level.titleVi}</span>
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onResume();
            }}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-game font-bold text-lg rounded-2xl border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            TIẾP TỤC CHƠI
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-game font-bold rounded-xl border-2 border-slate-700 hover:border-cyan-400 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Chơi Lại Màn Này
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onGoToMap();
            }}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-game font-bold rounded-xl border-2 border-slate-700 hover:border-cyan-400 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Map className="w-4 h-4 text-cyan-400" />
            Về Bản Đồ Bài Học
          </button>
        </div>
      </div>
    </div>
  );
};
