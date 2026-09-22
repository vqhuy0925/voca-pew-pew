import React, { useEffect } from 'react';
import { UserGender, ThemeStyle, MascotId } from '../../data/progress-types';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../../data/theme-types';
import { MistakeKeyCount } from '../../game/engine/TypingMetrics';
import { Gauge, Target, RotateCcw, ArrowRight, X } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';

interface TypingResultModalProps {
  title: string;
  wpm: number;
  accuracy: number;
  passed: boolean;
  minAccuracyToPass?: number;
  topMistakeKeys?: MistakeKeyCount[];
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  onRetry: () => void;
  onExit: () => void;
  userName?: string;
  gender?: UserGender;
  themeStyle?: ThemeStyle;
  mascotId?: MascotId;
}

export const TypingResultModal: React.FC<TypingResultModalProps> = ({
  title,
  wpm,
  accuracy,
  passed,
  minAccuracyToPass,
  topMistakeKeys = [],
  primaryActionLabel,
  onPrimaryAction,
  onRetry,
  onExit,
  userName,
  gender = 'neutral',
  themeStyle = 'galactic_starwars',
  mascotId = 'cosmo_dog'
}) => {
  const theme = THEME_CONFIGS[themeStyle] || THEME_CONFIGS.galactic_starwars;
  const mascot = MASCOT_CONFIGS[mascotId] || MASCOT_CONFIGS.cosmo_dog;

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (passed) {
      soundFx.playVictory();
    } else {
      soundFx.playClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cheerMessage = passed
    ? mascot.cheerMessages[Math.floor(Math.random() * mascot.cheerMessages.length)]
    : mascot.oopsieMessages[Math.floor(Math.random() * mascot.oopsieMessages.length)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md bg-gradient-to-b ${theme.bgGradient} border-2 sm:border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-6 text-center max-h-[92vh] overflow-y-auto shadow-2xl`}
        style={{ boxShadow: `0 0 35px ${theme.glowColor}` }}
      >
        <div className="flex justify-center mb-2">
          <MascotWidget
            mascotId={mascotId}
            mood={passed ? 'celebrating' : 'oopsie'}
            gender={gender}
            userName={userName}
          />
        </div>

        <h2 className={`text-2xl sm:text-3xl font-black font-orbitron tracking-wider ${passed ? 'text-white starwars-gold-glow' : 'text-amber-300'}`}>
          {passed ? 'HOÀN THÀNH!' : 'GẦN ĐƯỢC RỒI!'}
        </h2>
        <p className={`${theme.textColor} font-bold text-sm sm:text-base mt-0.5`}>
          {title}
        </p>
        <p className="text-slate-300 text-sm mt-2 font-game">{cheerMessage}</p>

        {/* WPM / Accuracy Stats */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-slate-950/80 border border-violet-500/40 rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm">
            <Gauge className="w-6 h-6 text-violet-400 mb-1" />
            <span className="text-violet-300/90 text-xs sm:text-sm font-black uppercase font-orbitron tracking-wider">Tốc Độ Gõ</span>
            <span className="text-2xl sm:text-3xl font-black font-orbitron text-violet-300 mt-0.5">
              {Math.round(wpm)} <span className="text-sm">WPM</span>
            </span>
          </div>

          <div className={`bg-slate-950/80 border rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm ${passed ? 'border-emerald-500/40' : 'border-amber-500/40'}`}>
            <Target className={`w-6 h-6 mb-1 ${passed ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className={`text-xs sm:text-sm font-black uppercase font-orbitron tracking-wider ${passed ? 'text-emerald-300/90' : 'text-amber-300/90'}`}>Độ Chính Xác</span>
            <span className={`text-2xl sm:text-3xl font-black font-orbitron mt-0.5 ${passed ? 'text-emerald-300' : 'text-amber-300'}`}>
              {Math.round(accuracy)}%
            </span>
          </div>
        </div>

        {typeof minAccuracyToPass === 'number' && (
          <p className="text-xs sm:text-sm text-slate-400 font-semibold -mt-1 mb-3">
            {passed
              ? `Đã vượt ngưỡng ${minAccuracyToPass}% chính xác cần thiết! 🎉`
              : `Cần đạt tối thiểu ${minAccuracyToPass}% chính xác để qua bài. Cố lên nào!`}
          </p>
        )}

        {/* Top Mistake Keys */}
        {topMistakeKeys.length > 0 && (
          <div className="text-left bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3 mb-4">
            <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-rose-300 mb-2 px-0.5">
              Phím hay gõ sai
            </div>
            <div className="flex flex-wrap gap-2">
              {topMistakeKeys.map((mk) => (
                <span
                  key={mk.key}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-400/40 text-rose-300 font-mono font-black text-sm"
                >
                  {mk.key === ' ' ? '␣' : mk.key} <span className="text-rose-400/80 text-xs">×{mk.count}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-0.5">
          <button
            onClick={() => {
              soundFx.playClick();
              onPrimaryAction();
            }}
            className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-orbitron font-black text-lg sm:text-xl rounded-2xl shadow-lg border-b-4 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2.5 cursor-pointer tracking-wider`}
          >
            <span>{primaryActionLabel}</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
          </button>

          <div className="flex gap-2.5">
            <button
              onClick={() => {
                soundFx.playClick();
                onRetry();
              }}
              className="flex-1 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-orbitron font-bold text-sm sm:text-base rounded-xl border border-slate-700/80 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>THỬ LẠI</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onExit();
              }}
              className="flex-1 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-orbitron font-bold text-sm sm:text-base rounded-xl border border-slate-700/80 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <X className="w-4 h-4 text-cyan-400" />
              <span>THOÁT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
