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
        <div className="bg-slate-950/95 backdrop-blur-md border-2 sm:border-3 border-cyan-400/70 border-b-4 border-b-cyan-600 rounded-2xl px-6 py-3 text-cyan-200 text-base sm:text-lg md:text-xl font-game font-black flex items-center gap-3 shadow-[0_4px_25px_rgba(0,240,255,0.35)] whitespace-nowrap">
          <span className="text-2xl sm:text-3xl">🎯</span>
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
      <div className="bg-slate-950/95 backdrop-blur-xl border-2 sm:border-3 border-cyan-400/80 rounded-2xl sm:rounded-3xl p-3.5 sm:px-6 sm:py-4.5 shadow-[0_8px_35px_rgba(0,240,255,0.35)] flex items-center gap-3.5 sm:gap-5 transition-all">
        {/* Animated Emoji Badge */}
        <div className="relative flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/40 shadow-inner">
          <span className="text-4xl sm:text-5xl drop-shadow-md transform hover:scale-110 transition-transform">
            {target.emoji}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {/* Tactile Letter Tiles */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 leading-none">
            {target.word.split('').map((char, index) => {
              const isTyped = index < target.typedIndex;
              const isCurrent = index === target.typedIndex;
              const isSpace = char === ' ';

              if (isSpace) {
                return (
                  <span
                    key={index}
                    className={`inline-flex items-center justify-center px-2.5 rounded-xl transition-all ${
                      target.word.length > 20 ? 'h-10 sm:h-13' : 'h-12 sm:h-16'
                    } ${
                      isCurrent
                        ? 'bg-yellow-400/30 border-2 border-yellow-400 text-yellow-300 animate-pulse text-base sm:text-lg font-black'
                        : isTyped
                        ? 'text-emerald-400/40 w-3 sm:w-4'
                        : 'w-3 sm:w-4'
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
                      ? 'px-2 py-0.5 min-w-[1.9rem] sm:min-w-[2.5rem] h-10 sm:h-13 text-xl sm:text-3xl font-black'
                      : 'px-3 py-1 min-w-[2.4rem] sm:min-w-[3.2rem] h-12 sm:h-16 text-3xl sm:text-4xl md:text-5xl font-black'
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
            <div className="text-base sm:text-lg md:text-xl text-cyan-200 font-game font-black drop-shadow tracking-wide truncate sm:whitespace-normal">
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
          className="btn-3d btn-3d-cyan min-w-[54px] min-h-[54px] w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex-shrink-0 shadow-md"
          title="Nghe phát âm từ này"
          aria-label="Nghe phát âm"
        >
          <Volume2 className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
