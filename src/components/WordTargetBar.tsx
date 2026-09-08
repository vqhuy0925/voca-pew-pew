import React from 'react';
import { EnemyItem } from '../data/types';
import { Volume2, Sparkles } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';
import { soundFx } from '../game/engine/SoundController';

interface WordTargetBarProps {
  target: EnemyItem | null;
}

export const WordTargetBar: React.FC<WordTargetBarProps> = ({ target }) => {
  if (!target) {
    return (
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
        <div className="bg-slate-900/85 backdrop-blur-md border-2 border-cyan-400/40 rounded-full px-5 py-2 text-cyan-300 text-xs sm:text-sm font-game font-bold flex items-center gap-2 shadow-lg animate-pulse">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Gõ chữ cái đầu tiên của từ đang rơi để bắn! 🎯</span>
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
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none">
      <div className="bg-slate-900/95 backdrop-blur-xl border-3 border-cyan-400 rounded-3xl px-6 py-3.5 shadow-[0_0_35px_rgba(0,240,255,0.4)] flex items-center gap-4 transition-all transform scale-105">
        {/* Emoji Card */}
        <div className="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-cyan-400/50 flex items-center justify-center text-3xl shadow-md">
          {target.emoji}
        </div>

        <div>
          {/* Letters display */}
          <div className="flex items-center gap-1.5 font-game text-3xl sm:text-4xl font-bold tracking-wider">
            {target.word.split('').map((char, index) => {
              const isTyped = index < target.typedIndex;
              const isCurrent = index === target.typedIndex;

              return (
                <span
                  key={index}
                  className={`transition-all duration-150 inline-block ${
                    isTyped
                      ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                      : isCurrent
                      ? 'text-yellow-300 bg-yellow-400/25 px-2 py-0.5 rounded-xl border-2 border-yellow-400 animate-bounce scale-110'
                      : 'text-slate-300'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Vietnamese meaning */}
          <div className="text-xs sm:text-sm text-cyan-300 font-medium mt-0.5">
            Nghĩa: <span className="text-white font-bold">{target.meaningVi}</span>
          </div>
        </div>

        {/* Pronounce audio button */}
        <button
          onClick={handleSpeak}
          className="p-3 bg-cyan-500/20 hover:bg-cyan-500/40 border-2 border-cyan-400 rounded-2xl text-cyan-300 transition active:scale-95 shadow-md cursor-pointer"
          title="Nghe phát âm"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
