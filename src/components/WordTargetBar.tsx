import React from 'react';
import { EnemyItem } from '../data/types';
import { Volume2 } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';
import { soundFx } from '../game/engine/SoundController';

interface WordTargetBarProps {
  target: EnemyItem | null;
}

export const WordTargetBar: React.FC<WordTargetBarProps> = ({ target }) => {
  if (!target) {
    return (
      <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none max-w-[92vw]">
        <div className="bg-slate-950/90 backdrop-blur-md border-2 border-cyan-500/50 border-b-4 border-b-cyan-700 rounded-2xl px-4 py-2 text-cyan-200 text-xs sm:text-sm font-game font-extrabold flex items-center gap-2 shadow-[0_4px_20px_rgba(0,240,255,0.25)] whitespace-nowrap">
          <span className="text-base">🎯</span>
          <span>Gõ chữ cái đầu tiên để ngắm bắn mục tiêu!</span>
        </div>
      </div>
    );
  }

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(target.word, true);
  };

  return (
    <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none max-w-[95vw] md:max-w-3xl w-full px-2 sm:px-0">
      <div className="bg-slate-950/95 backdrop-blur-xl border-2 sm:border-3 border-cyan-400/80 rounded-2xl sm:rounded-3xl p-3 sm:px-5 sm:py-3.5 shadow-[0_8px_35px_rgba(0,240,255,0.35)] flex items-center gap-3 sm:gap-4 transition-all">
        {/* Animated Emoji Badge */}
        <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/40 shadow-inner">
          <span className="text-3xl sm:text-4xl drop-shadow-md transform hover:scale-110 transition-transform">
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
                    className={`inline-flex items-center justify-center px-1.5 h-8 sm:h-10 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-yellow-400/30 border-2 border-yellow-400 text-yellow-300 animate-pulse text-xs sm:text-sm'
                        : isTyped
                        ? 'text-emerald-400/40 w-2 sm:w-3'
                        : 'w-2 sm:w-3'
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
                      ? 'px-1.5 py-0.5 min-w-[1.5rem] h-8 text-base sm:text-xl font-bold'
                      : 'px-2 py-1 min-w-[1.85rem] sm:min-w-[2.4rem] h-9 sm:h-11 text-xl sm:text-2xl md:text-3xl font-black'
                  } ${
                    isTyped
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 border-b-3 border-b-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                      : isCurrent
                      ? 'bg-yellow-400/35 text-yellow-200 border-2 border-yellow-300 border-b-4 border-b-yellow-500 shadow-[0_0_18px_rgba(253,224,71,0.7)] scale-110 -translate-y-0.5 animate-pulse font-black'
                      : 'bg-slate-900/80 text-slate-400 border border-slate-700/80 border-b-2 border-b-slate-800'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Vietnamese meaning with high readability */}
          <div className="text-xs sm:text-sm md:text-base text-cyan-200 font-game font-extrabold mt-1.5 drop-shadow tracking-wide truncate sm:whitespace-normal">
            {target.meaningVi}
          </div>
        </div>

        {/* 3D Chunky Audio Pronunciation Button */}
        <button
          onClick={handleSpeak}
          className="btn-3d btn-3d-cyan min-w-[48px] min-h-[48px] w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex-shrink-0 shadow-md"
          title="Nghe phát âm từ này"
          aria-label="Nghe phát âm"
        >
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
