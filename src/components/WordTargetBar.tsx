import React from 'react';
import { EnemyItem } from '../data/types';
import { Volume2 } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';
import { soundFx } from '../game/engine/SoundController';
import { FingerGuideBadge } from './common/FingerGuideBadge';

interface WordTargetBarProps {
  target: EnemyItem | null;
}

export const WordTargetBar: React.FC<WordTargetBarProps> = ({ target }) => {
  if (!target) {
    return (
      <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none max-w-[95vw]">
        <div className="bg-slate-950/95 backdrop-blur-md border-2 sm:border-3 border-cyan-400/70 border-b-4 border-b-cyan-600 rounded-2xl px-5 py-2.5 text-cyan-200 text-sm sm:text-base md:text-lg font-game font-black flex items-center gap-2.5 shadow-[0_4px_25px_rgba(0,240,255,0.35)] whitespace-nowrap">
          <span className="text-xl sm:text-2xl">🎯</span>
          <span>Gõ chữ đầu tiên để bắn!</span>
        </div>
      </div>
    );
  }

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(target.word, true);
  };

  const currentChar = target.typedIndex < target.word.length ? target.word[target.typedIndex] : undefined;

  return (
    <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none max-w-[95vw] md:max-w-3xl w-full px-2 sm:px-0">
      <div className="bg-slate-950/95 backdrop-blur-xl border-2 sm:border-3 border-cyan-400/80 rounded-2xl sm:rounded-3xl p-3 sm:px-5 sm:py-4 shadow-[0_8px_35px_rgba(0,240,255,0.35)] flex items-center gap-3 sm:gap-4 transition-all">
        {/* Animated Emoji Badge */}
        <div className="relative flex-shrink-0 flex items-center justify-center w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/40 shadow-inner">
          <span className="text-3xl sm:text-5xl drop-shadow-md transform hover:scale-110 transition-transform">
            {target.emoji}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {/* Tactile Letter Tiles */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 leading-none">
            {target.word.split('').map((char, index) => {
              const isTyped = index < target.typedIndex;
              const isCurrent = index === target.typedIndex;
              const isSpace = char === ' ';

              if (isSpace) {
                return (
                  <span
                    key={index}
                    className={`inline-flex items-center justify-center px-2 h-9 sm:h-12 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-yellow-400/30 border-2 border-yellow-400 text-yellow-300 animate-pulse text-sm sm:text-base font-black'
                        : isTyped
                        ? 'text-emerald-400/40 w-2.5 sm:w-3.5'
                        : 'w-2.5 sm:w-3.5'
                    }`}
                  >
                    {isCurrent ? '␣' : ' '}
                  </span>
                );
              }

              return (
                <span
                  key={index}
                  className={`inline-flex items-center justify-center font-orbitron uppercase rounded-xl transition-all duration-150 select-none ${
                    target.word.length > 20
                      ? 'px-1.5 py-0.5 min-w-[1.65rem] sm:min-w-[2.2rem] h-9 sm:h-11 text-lg sm:text-2xl font-black'
                      : 'px-2.5 py-1 min-w-[2.1rem] sm:min-w-[2.8rem] h-11 sm:h-14 text-2xl sm:text-3xl md:text-4xl font-black'
                  } ${
                    isTyped
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 border-b-3 border-b-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                      : isCurrent
                      ? 'bg-yellow-400/35 text-yellow-200 border-2 border-yellow-300 border-b-4 border-b-yellow-500 shadow-[0_0_20px_rgba(253,224,71,0.75)] scale-110 -translate-y-0.5 animate-pulse font-black'
                      : 'bg-slate-900/80 text-slate-400 border border-slate-700/80 border-b-2 border-b-slate-800'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Vietnamese meaning & Finger Guide Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5">
            <div className="text-sm sm:text-base md:text-lg text-cyan-200 font-game font-black drop-shadow tracking-wide truncate sm:whitespace-normal">
              {target.meaningVi}
            </div>
            {currentChar && (
              <FingerGuideBadge currentChar={currentChar} className="mt-0.5" />
            )}
          </div>
        </div>

        {/* 3D Chunky Audio Pronunciation Button */}
        <button
          onClick={handleSpeak}
          className="btn-3d btn-3d-cyan min-w-[50px] min-h-[50px] w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex-shrink-0 shadow-md"
          title="Nghe phát âm từ này"
          aria-label="Nghe phát âm"
        >
          <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
