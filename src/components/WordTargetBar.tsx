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
        <div className="bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 text-cyan-300 text-[11px] sm:text-sm font-game font-extrabold flex items-center gap-1.5 sm:gap-2 shadow-lg whitespace-nowrap">
          <span>Gõ chữ cái đầu tiên để ngắm bắn 🎯</span>
        </div>
      </div>
    );
  }

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(target.word, true);
  };

  const isSentence = target.word.length > 20;

  return (
    <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none max-w-[94vw] md:max-w-3xl w-full px-2 sm:px-0">
      <div className="bg-slate-950/95 backdrop-blur-xl border-2 border-cyan-400 rounded-2xl sm:rounded-3xl px-3 sm:px-6 py-2 sm:py-3 shadow-[0_4px_30px_rgba(0,240,255,0.4)] flex items-center gap-2.5 sm:gap-4 transition-all">
        {/* Emoji */}
        <span className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0 drop-shadow">{target.emoji}</span>

        <div className="min-w-0 flex-1">
          {/* Letters display */}
          <div className={`flex flex-wrap items-center gap-1 font-game font-black tracking-wide leading-tight ${
            target.word.length > 40
              ? 'text-base sm:text-xl md:text-2xl'
              : target.word.length > 24
              ? 'text-lg sm:text-2xl md:text-3xl'
              : target.word.length > 12
              ? 'text-2xl sm:text-3xl md:text-4xl'
              : 'text-3xl sm:text-5xl'
          }`}>
            {target.word.split('').map((char, index) => {
              const isTyped = index < target.typedIndex;
              const isCurrent = index === target.typedIndex;
              const isSpace = char === ' ';

              if (isSpace) {
                return (
                  <span
                    key={index}
                    className={`inline-block px-1 rounded transition-all ${
                      isCurrent
                        ? 'bg-yellow-400/30 border border-yellow-400 text-yellow-300 animate-pulse text-xs sm:text-sm py-0.5'
                        : isTyped
                        ? 'text-emerald-400/40 w-1.5 sm:w-2'
                        : 'w-1.5 sm:w-2.5'
                    }`}
                  >
                    {isCurrent ? '␣' : ' '}
                  </span>
                );
              }

              return (
                <span
                  key={index}
                  className={`transition-all duration-100 inline-block uppercase drop-shadow-md ${
                    isTyped
                      ? 'text-emerald-400 font-black'
                      : isCurrent
                      ? 'text-yellow-300 bg-yellow-400/25 px-1 rounded-lg border-2 border-yellow-400 animate-pulse'
                      : 'text-slate-400'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Vietnamese meaning */}
          <div className="text-xs sm:text-sm md:text-base text-cyan-200 font-bold mt-1 drop-shadow truncate sm:whitespace-normal">
            {target.meaningVi}
          </div>
        </div>

        {/* Pronounce audio button */}
        <button
          onClick={handleSpeak}
          className="p-2 sm:p-2.5 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/60 text-cyan-300 transition active:scale-95 cursor-pointer flex-shrink-0 shadow-sm"
          title="Nghe phát âm cả câu"
        >
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};
