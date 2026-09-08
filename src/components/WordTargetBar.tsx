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
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
        <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/30 rounded-full px-4 py-1.5 text-cyan-300 text-xs font-game font-bold flex items-center gap-1.5 shadow-md">
          <span>Gõ chữ cái đầu tiên để ngắm bắn 🎯</span>
        </div>
      </div>
    );
  }

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(target.word);
  };

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none">
      <div className="bg-slate-950/90 backdrop-blur-xl border-2 border-cyan-400/80 rounded-2xl px-5 py-2.5 shadow-[0_4px_25px_rgba(0,240,255,0.3)] flex items-center gap-3.5 transition-all">
        {/* Emoji */}
        <span className="text-3xl sm:text-4xl flex-shrink-0">{target.emoji}</span>

        <div>
          {/* Letters display */}
          <div className="flex items-center gap-1 font-game text-3xl sm:text-4xl font-extrabold tracking-wider leading-none">
            {target.word.split('').map((char, index) => {
              const isTyped = index < target.typedIndex;
              const isCurrent = index === target.typedIndex;

              return (
                <span
                  key={index}
                  className={`transition-all duration-100 inline-block uppercase ${
                    isTyped
                      ? 'text-emerald-400 font-extrabold'
                      : isCurrent
                      ? 'text-yellow-300 bg-yellow-400/20 px-1 rounded border border-yellow-400/80 animate-pulse'
                      : 'text-slate-300'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Vietnamese meaning */}
          <div className="text-xs sm:text-sm text-cyan-200 font-semibold mt-1">
            {target.meaningVi}
          </div>
        </div>

        {/* Pronounce audio button */}
        <button
          onClick={handleSpeak}
          className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/60 text-cyan-300 transition active:scale-95 cursor-pointer ml-1"
          title="Nghe phát âm"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
