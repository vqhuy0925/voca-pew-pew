import React from 'react';
import { GameStats } from '../data/types';
import { LevelNode, UserGender, ThemeStyle, MascotId } from '../data/progress-types';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../data/theme-types';
import { RotateCcw, Map } from 'lucide-react';
import { soundFx } from '../game/engine/SoundController';
import { MascotWidget } from './mascot/MascotWidget';
import { getGameOverModalMessages } from '../services/personaMessageHelper';

interface GameOverModalProps {
  stats: GameStats;
  level: LevelNode;
  userAge?: number;
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
  userAge,
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
  const modalMessages = getGameOverModalMessages(userAge, gender, userName, mascot.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md bg-gradient-to-b ${theme.bgGradient} border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-7 text-center max-h-[92vh] overflow-y-auto`}
        style={{ boxShadow: `0 0 30px ${theme.glowColor}` }}
      >
        {/* Mascot Comforting Widget */}
        <div className="flex justify-center mb-4">
          <MascotWidget
            mascotId={mascotId}
            mood="oopsie"
            userAge={userAge}
            gender={gender}
            userName={userName}
          />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-orbitron text-rose-400 mb-2 tracking-wider">
          {modalMessages.heading}
        </h2>
        <p className="text-slate-200 text-base sm:text-lg mb-4 font-game">
          Thử lại màn <span className={`${theme.textColor} font-black`}>{level.titleVi}</span> nhé!
        </p>

        {/* Zen tip - Concise & Punchy */}
        <div className="bg-sky-950/60 border border-sky-500/40 rounded-2xl p-3 sm:p-3.5 mb-5 text-sm sm:text-base text-sky-200 text-left flex items-center gap-2.5 font-game font-bold">
          <span className="text-xl flex-shrink-0">💡</span>
          <span>
            Mẹo: Chọn chế độ <strong>🧘 ZEN</strong> để không bị tính giờ!
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-orbitron font-black text-xl sm:text-2xl rounded-2xl shadow-lg border-b-4 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2.5 cursor-pointer tracking-wider`}
          >
            <RotateCcw className="w-6 h-6 stroke-[3]" />
            <span>THỬ LẠI</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onGoToMap();
            }}
            className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-orbitron font-black text-base sm:text-lg rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Map className="w-5 h-5 text-cyan-400" />
            <span>BẢN ĐỒ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

