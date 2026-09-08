import React from 'react';
import { GameStats } from '../data/types';
import { LevelNode, UserGender, ThemeStyle, MascotId } from '../data/progress-types';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../data/theme-types';
import { RotateCcw, Map, Heart } from 'lucide-react';
import { soundFx } from '../game/engine/SoundController';
import { MascotWidget } from './mascot/MascotWidget';

interface GameOverModalProps {
  stats: GameStats;
  level: LevelNode;
  userName?: string;
  avatar?: string;
  gender?: UserGender;
  themeStyle?: ThemeStyle;
  mascotId?: MascotId;
  onRestart: () => void;
  onGoToMap: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  level,
  userName,
  avatar = '🚀',
  gender = 'neutral',
  themeStyle = 'cosmic_cyan',
  mascotId = 'cosmo_dog',
  onRestart,
  onGoToMap
}) => {
  const theme = THEME_CONFIGS[themeStyle] || THEME_CONFIGS.cosmic_cyan;
  const mascot = MASCOT_CONFIGS[mascotId] || MASCOT_CONFIGS.cosmo_dog;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className={`relative w-full max-w-md bg-gradient-to-b ${theme.bgGradient} border-3 ${theme.borderAccent} rounded-3xl p-6 sm:p-7 shadow-[0_0_30px_${theme.glowColor}] text-center`}>
        {/* Mascot Comforting Widget */}
        <div className="flex justify-center mb-4">
          <MascotWidget
            mascotId={mascotId}
            mood="oopsie"
            customMessage={`Không sao cả ${userName || 'bạn ơi'}! ${mascot.name} luôn ở đây đồng hành cùng bạn! ❤️`}
          />
        </div>

        <h2 className="text-3xl font-black font-game text-rose-400 mb-1">
          KHÔNG SAO CẢ!
        </h2>
        <p className="text-slate-200 text-sm sm:text-base mb-6">
          Hãy cùng {avatar} thử lại màn <span className={`${theme.textColor} font-extrabold`}>{level.titleVi}</span> để vượt qua nhé!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-game font-black text-lg rounded-2xl shadow-lg border-b-4 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer`}
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

