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
      <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-[#101438] to-slate-950 border-2 sm:border-3 border-cyan-400/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.35)] text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 mx-auto mb-3 bg-cyan-500/20 border-2 sm:border-3 border-cyan-400 border-b-4 border-b-cyan-600 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(0,240,255,0.4)]">
          ⏸️
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-orbitron text-white mb-1.5 tracking-wider starwars-cyan-glow">
          TẠM DỪNG
        </h2>
        <p className="text-cyan-300 text-base sm:text-lg mb-6 font-game font-black truncate">
          {level.titleVi}
        </p>

        <div className="space-y-3.5">
          <button
            onClick={() => {
              soundFx.playClick();
              onResume();
            }}
            className="btn-3d btn-3d-emerald w-full py-4 text-slate-950 font-orbitron font-black text-xl sm:text-2xl rounded-2xl shadow-lg flex items-center justify-center gap-2.5 tracking-wider"
          >
            <Play className="w-6 h-6 fill-slate-950 stroke-[2.5]" />
            TIẾP TỤC
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className="btn-3d btn-3d-slate w-full py-3.5 border-slate-700/80 hover:border-cyan-400 text-white font-orbitron font-black text-base sm:text-lg rounded-2xl flex items-center justify-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-5 h-5 text-amber-400" />
            CHƠI LẠI
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onGoToMap();
            }}
            className="btn-3d btn-3d-slate w-full py-3.5 border-slate-700/80 hover:border-cyan-400 text-slate-200 hover:text-white font-orbitron font-black text-base sm:text-lg rounded-2xl flex items-center justify-center gap-2 shadow-sm"
          >
            <Map className="w-5 h-5 text-cyan-400" />
            BẢN ĐỒ
          </button>
        </div>
      </div>
    </div>
  );
};
