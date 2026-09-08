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
        <div className="bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 rounded-full px-5 py-2 text-cyan-300 text-xs sm:text-sm font-game font-extrabold flex items-center gap-2 shadow-lg">
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
      <div className="bg-slate-950/95 backdrop-blur-xl border-2 border-cyan-400 rounded-3xl px-6 py-3 shadow-[0_4px_30px_rgba(0,240,255,0.4)] flex items-center gap-4 transition-all">
        {/* Emoji */}
        <span className="text-4xl sm:text-5xl flex-shrink-0 drop-shadow">{target.emoji}</span>

        <div>
          {/* Letters display */}
          <div className="flex items-center gap-1.5 font-game text-3xl sm:text-5xl font-black tracking-wider leading-none">
            {target.word.split('').map((char, index) => {
              const isTyped = index < target.typedIndex;
              const isCurrent = index === target.typedIndex;

              return (
                <span
                  key={index}
                  className={`transition-all duration-100 inline-block uppercase drop-shadow-md ${
                    isTyped
                      ? 'text-emerald-400 font-black'
                      : isCurrent
                      ? 'text-yellow-300 bg-yellow-400/20 px-1.5 rounded-lg border-2 border-yellow-400 animate-pulse'
                      : 'text-slate-400'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Vietnamese meaning */}
          <div className="text-sm sm:text-base text-cyan-200 font-bold mt-1.5 drop-shadow">
            {target.meaningVi}
          </div>
        </div>

        {/* Pronounce audio button */}
        <button
          onClick={handleSpeak}
          className="p-2.5 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/60 text-cyan-300 transition active:scale-95 cursor-pointer ml-1 shadow-sm"
          title="Nghe phát âm"
        >
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};
