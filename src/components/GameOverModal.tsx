import React from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { RotateCcw, Map, Heart } from 'lucide-react';
import { soundFx } from '../game/engine/SoundController';

interface GameOverModalProps {
  stats: GameStats;
  level: LevelNode;
  userName?: string;
  avatar?: string;
  onRestart: () => void;
  onGoToMap: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  level,
  onRestart,
  onGoToMap
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-[#181128] border-2 border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl text-center">
        {/* Oops Icon */}
        <div className="w-20 h-20 mx-auto mb-3 bg-rose-500/15 border-2 border-rose-400/40 rounded-full flex items-center justify-center text-4xl shadow-inner">
          🥺🚀
        </div>

        <h2 className="text-3xl font-black font-game text-rose-400 mb-1.5">
          KHÔNG SAO CẢ!
        </h2>
        <p className="text-slate-200 text-sm sm:text-base mb-6">
          Hãy thử lại màn <span className="text-cyan-300 font-extrabold">{level.titleVi}</span> để vượt qua nhé!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-game font-black text-lg rounded-2xl shadow-lg border-b-4 border-teal-600 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 stroke-[3]" />
            <span>THỬ LẠI NGAY</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onGoToMap();
            }}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-game font-bold text-sm sm:text-base rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Map className="w-4 h-4 text-cyan-400" />
            <span>Quay Về Bản Đồ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
