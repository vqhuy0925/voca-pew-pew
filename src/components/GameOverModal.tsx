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
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-center">
        {/* Oops Icon */}
        <div className="w-16 h-16 mx-auto mb-3 bg-rose-500/10 border border-rose-400/40 rounded-full flex items-center justify-center text-3xl shadow">
          🥺🚀
        </div>

        <h2 className="text-2xl font-extrabold font-game text-rose-400 mb-1">
          KHÔNG SAO CẢ!
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mb-5">
          Hãy thử lại màn <span className="text-cyan-300 font-bold">{level.titleVi}</span> để vượt qua nhé!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-game font-extrabold text-base rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4 stroke-[3]" />
            <span>THỬ LẠI NGAY</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onGoToMap();
            }}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-game font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Map className="w-4 h-4 text-cyan-400" />
            <span>Quay Về Bản Đồ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
