import React from 'react';
import { EnemyItem } from '../data/types';
import { Volume2, Crosshair } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';

interface WordTargetBarProps {
  target: EnemyItem | null;
}

export const WordTargetBar: React.FC<WordTargetBarProps> = ({ target }) => {
  if (!target) {
    return (
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-space-card/75 backdrop-blur-md border border-cyan-500/30 rounded-full px-5 py-2 text-cyan-300/80 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-lg animate-pulse">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span>Gõ chữ cái đầu tiên của từ đang rơi để bắn!</span>
        </div>
      </div>
    );
  }

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechHelper.speak(target.word);
  };

  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <div className="bg-slate-900/90 backdrop-blur-lg border-2 border-cyan-400 rounded-2xl px-6 py-3 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center gap-4 transition-all transform scale-105">
        <span className="text-3xl">{target.emoji}</span>

        <div>
          {/* Letters */}
          <div className="flex items-center gap-1 font-game text-2xl sm:text-3xl font-bold tracking-wider">
            {target.word.split('').map((char, index) => {
              const isTyped = index < target.typedIndex;
              const isCurrent = index === target.typedIndex;

              return (
                <span
                  key={index}
                  className={`transition-all duration-150 ${
                    isTyped
                      ? 'text-emerald-400 underline decoration-emerald-400'
                      : isCurrent
                      ? 'text-yellow-300 bg-yellow-400/20 px-1.5 py-0.5 rounded-lg ring-2 ring-yellow-400 animate-bounce'
                      : 'text-slate-300'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Vietnamese Subtext */}
          <div className="text-xs sm:text-sm text-cyan-300/90 font-medium">
            Nghĩa: <span className="text-white font-semibold">{target.meaningVi}</span>
          </div>
        </div>

        {/* Audio Listen button */}
        <button
          onClick={handleSpeak}
          className="p-2.5 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 rounded-xl text-cyan-300 transition active:scale-95"
          title="Nghe phát âm"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
