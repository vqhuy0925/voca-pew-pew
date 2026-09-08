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
        <div className="bg-slate-900/90 backdrop-blur-md border-2 border-cyan-400/50 rounded-full px-6 py-2.5 text-cyan-200 text-sm sm:text-base font-game font-bold flex items-center gap-2.5 shadow-xl animate-pulse">
          <Sparkles className="w-5 h-5 text-cyan-300" />
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
      <div className="bg-slate-950/95 backdrop-blur-xl border-4 border-cyan-400 rounded-3xl px-6 py-4 shadow-[0_0_40px_rgba(0,240,255,0.45)] flex items-center gap-4 transition-all transform scale-105">
        {/* Emoji Card */}
        <div className="w-14 h-14 rounded-2xl bg-slate-800/90 border-2 border-cyan-400/60 flex items-center justify-center text-4xl shadow-md flex-shrink-0">
          {target.emoji}
        </div>

        <div>
          {/* Letters display */}
          <div className="flex items-center gap-2 font-game text-4xl sm:text-5xl font-extrabold tracking-wider">
            {target.word.split('').map((char, index) => {
              const isTyped = index < target.typedIndex;
              const isCurrent = index === target.typedIndex;

              return (
                <span
                  key={index}
                  className={`transition-all duration-150 inline-block uppercase ${
                    isTyped
                      ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]'
                      : isCurrent
                      ? 'text-yellow-300 bg-yellow-400/30 px-2.5 py-0.5 rounded-xl border-2 border-yellow-400 animate-bounce scale-110 shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                      : 'text-white'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Vietnamese meaning */}
          <div className="text-sm sm:text-base text-cyan-200 font-semibold mt-1 flex items-center gap-1.5">
            <span>Nghĩa:</span>
            <span className="text-yellow-300 font-bold text-base sm:text-lg">{target.meaningVi}</span>
          </div>
        </div>

        {/* Pronounce audio button */}
        <button
          onClick={handleSpeak}
          className="p-3.5 bg-cyan-500/25 hover:bg-cyan-500/45 border-2 border-cyan-400 rounded-2xl text-cyan-200 transition active:scale-95 shadow-md cursor-pointer ml-1"
          title="Nghe phát âm"
        >
          <Volume2 className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
