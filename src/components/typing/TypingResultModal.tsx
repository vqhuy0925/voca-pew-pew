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
  exitLabel?: string;
  exitIcon?: React.ReactNode;
  userName?: string;
  gender?: UserGender;
  themeStyle?: ThemeStyle;
  mascotId?: MascotId;
  isLight?: boolean;
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
  exitLabel,
  exitIcon,
  userName,
  gender = 'neutral',
  themeStyle = 'galactic_starwars',
  mascotId = 'cosmo_dog',
  isLight = false
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
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md select-none animate-in fade-in duration-200 ${
      isLight ? 'bg-slate-900/40' : 'bg-black/80'
    }`}>
      <div
        className={`relative w-full max-w-md rounded-3xl p-5 sm:p-6 text-center max-h-[92vh] overflow-y-auto shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-2 border-slate-200 text-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]'
            : `bg-gradient-to-b ${theme.bgGradient} border-2 sm:border-3 ${theme.borderAccent} text-white`
        }`}
        style={!isLight ? { boxShadow: `0 0 35px ${theme.glowColor}` } : undefined}
      >
        <div className="flex justify-center mb-2">
          <MascotWidget
            mascotId={mascotId}
            mood={passed ? 'celebrating' : 'oopsie'}
            gender={gender}
            userName={userName}
          />
        </div>

        <h2 className={`text-2xl sm:text-3xl font-black font-orbitron tracking-wider ${
          isLight
            ? (passed ? 'text-amber-600' : 'text-rose-600')
            : (passed ? 'text-white starwars-gold-glow' : 'text-amber-300')
        }`}>
          {passed ? 'HOÀN THÀNH!' : 'GẦN ĐƯỢC RỒI!'}
        </h2>
        <p className={`font-bold text-sm sm:text-base mt-0.5 ${
          isLight ? 'text-sky-800' : theme.textColor
        }`}>
          {title}
        </p>
        <p className={`text-sm mt-2 font-game ${
          isLight ? 'text-slate-600 font-medium' : 'text-slate-300'
        }`}>
          {cheerMessage}
        </p>

        {/* WPM / Accuracy Stats */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className={`rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm border ${
            isLight
              ? 'bg-violet-50/80 border-violet-200'
              : 'bg-slate-950/80 border-violet-500/40'
          }`}>
            <Gauge className={`w-6 h-6 mb-1 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
            <span className={`text-xs sm:text-sm font-black uppercase font-orbitron tracking-wider ${
              isLight ? 'text-violet-900' : 'text-violet-300/90'
            }`}>
              Tốc Độ Gõ
            </span>
            <span className={`text-2xl sm:text-3xl font-black font-orbitron mt-0.5 ${
              isLight ? 'text-violet-700' : 'text-violet-300'
            }`}>
              {Math.round(wpm)} <span className="text-sm">WPM</span>
            </span>
          </div>

          <div className={`rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm border ${
            isLight
              ? (passed ? 'bg-emerald-50/80 border-emerald-200' : 'bg-amber-50/80 border-amber-200')
              : (passed ? 'bg-slate-950/80 border-emerald-500/40' : 'bg-slate-950/80 border-amber-500/40')
          }`}>
            <Target className={`w-6 h-6 mb-1 ${
              isLight
                ? (passed ? 'text-emerald-600' : 'text-amber-600')
                : (passed ? 'text-emerald-400' : 'text-amber-400')
            }`} />
            <span className={`text-xs sm:text-sm font-black uppercase font-orbitron tracking-wider ${
              isLight
                ? (passed ? 'text-emerald-900' : 'text-amber-900')
                : (passed ? 'text-emerald-300/90' : 'text-amber-300/90')
            }`}>
              Độ Chính Xác
            </span>
            <span className={`text-2xl sm:text-3xl font-black font-orbitron mt-0.5 ${
              isLight
                ? (passed ? 'text-emerald-700' : 'text-amber-700')
                : (passed ? 'text-emerald-300' : 'text-amber-300')
            }`}>
              {Math.round(accuracy)}%
            </span>
          </div>
        </div>

        {typeof minAccuracyToPass === 'number' && (
          <p className={`text-xs sm:text-sm font-semibold -mt-1 mb-3 ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {passed
              ? `Đã vượt ngưỡng ${minAccuracyToPass}% chính xác cần thiết! 🎉`
              : `Cần đạt tối thiểu ${minAccuracyToPass}% chính xác để qua bài. Cố lên nào!`}
          </p>
        )}

        {/* Top Mistake Keys */}
        {topMistakeKeys.length > 0 && (
          <div className={`text-left rounded-2xl p-3 mb-4 border ${
            isLight
              ? 'bg-rose-50/80 border-rose-200'
              : 'bg-slate-950/70 border-slate-800/80'
          }`}>
            <div className={`text-xs sm:text-sm font-black uppercase tracking-wider mb-2 px-0.5 ${
              isLight ? 'text-rose-900' : 'text-rose-300'
            }`}>
              Phím hay gõ sai
            </div>
            <div className="flex flex-wrap gap-2">
              {topMistakeKeys.map((mk) => (
                <span
                  key={mk.key}
                  className={`px-2.5 py-1 rounded-lg font-mono font-black text-sm border shadow-sm ${
                    isLight
                      ? 'bg-white border-rose-300 text-rose-800'
                      : 'bg-rose-500/15 border-rose-400/40 text-rose-300'
                  }`}
                >
                  {mk.key === ' ' ? '␣' : mk.key} <span className={`text-xs ${isLight ? 'text-rose-500' : 'text-rose-400/80'}`}>×{mk.count}</span>
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
            className={`w-full py-4 font-orbitron font-black text-lg sm:text-xl rounded-2xl shadow-lg border-b-4 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2.5 cursor-pointer tracking-wider ${
              isLight
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-105 border-amber-600 text-slate-950 shadow-amber-300/40'
                : `bg-gradient-to-r ${theme.buttonGradient} text-slate-950 ${theme.buttonBorder}`
            }`}
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
              className={`flex-1 py-3 font-orbitron font-bold text-sm sm:text-base rounded-xl border transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>THỬ LẠI</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onExit();
              }}
              className={`flex-1 py-3 font-orbitron font-bold text-sm sm:text-base rounded-xl border transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80'
              }`}
            >
              {exitIcon ?? <X className={`w-4 h-4 ${isLight ? 'text-slate-600' : 'text-cyan-400'}`} />}
              <span>{exitLabel || 'THOÁT'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
