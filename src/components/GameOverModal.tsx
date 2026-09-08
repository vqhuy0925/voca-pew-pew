import React from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { RotateCcw, Map } from 'lucide-react';
import { soundFx } from '../game/engine/SoundController';
import { MascotWidget } from './mascot/MascotWidget';

interface GameOverModalProps {
  stats: GameStats;
  level: LevelNode;
  onRestart: () => void;
  onGoToMap: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  level,
  onRestart,
  onGoToMap
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-[#1a102a] to-slate-950 border-3 border-rose-500/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.35)] text-center">
        {/* Oops Icon */}
        <div className="w-20 h-20 mx-auto mb-3 bg-rose-500/20 border-3 border-rose-400 rounded-full flex items-center justify-center text-4xl shadow-lg">
          🥺🚀
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-game text-rose-400 mb-1.5">
          OOPS! KHÔNG SAO ĐÂU! ❤️
        </h2>
        <p className="text-slate-200 text-sm sm:text-base mb-5">
          Bé hãy thử lại màn <span className="text-cyan-300 font-extrabold">{level.titleVi}</span> để gõ chính xác hơn nhé!
        </p>

        {/* Mascot Encouragement */}
        <div className="flex justify-center mb-6">
          <MascotWidget mood="oopsie" customMessage="Bé đừng nản lòng nhé! Thử lại là được ngay! 🌟" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className="w-full py-4.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-2xl rounded-2xl border-b-6 border-emerald-700 active:border-b-0 active:translate-y-1.5 shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <RotateCcw className="w-6 h-6 stroke-[3]" />
            THỬ LẠI NGAY (MIỄN PHÍ)
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onGoToMap();
            }}
            className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-game font-bold text-base rounded-xl border-2 border-slate-700 hover:border-cyan-400 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Map className="w-5 h-5 text-cyan-400" />
            Quay Về Bản Đồ
          </button>
        </div>
      </div>
    </div>
  );
};
