import React, { useState } from 'react';
import { Keyboard as KeyboardIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { soundFx } from '../game/engine/SoundController';

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
  suggestedChar?: string;
}

const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  suggestedChar
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleKey = (char: string) => {
    soundFx.playClick();
    onKeyPress(char);
  };

  return (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center select-none">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-1 flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 hover:bg-slate-900 border border-slate-700/70 hover:border-cyan-400 rounded-full text-[11px] font-game font-bold text-slate-300 backdrop-blur-md transition shadow cursor-pointer"
      >
        <KeyboardIcon className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isOpen ? 'Ẩn phím ảo' : 'Mở phím ảo'}</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Keyboard Matrix */}
      {isOpen && (
        <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800 p-2 rounded-2xl shadow-xl flex flex-col gap-1 max-w-lg w-[96vw] sm:w-auto">
          {ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1">
              {row.map((char) => {
                const isSuggested = suggestedChar?.toLowerCase() === char;
                const isVowel = VOWELS.has(char);

                return (
                  <button
                    key={char}
                    onClick={() => handleKey(char)}
                    className={`w-8 sm:w-10 md:w-11 h-9 sm:h-11 md:h-12 font-game font-extrabold uppercase rounded-lg border-b-2 active:border-b-0 active:translate-y-0.5 transition-all duration-75 flex items-center justify-center text-sm sm:text-base cursor-pointer ${
                      isSuggested
                        ? 'bg-yellow-400 border-yellow-600 text-slate-950 scale-105 shadow-md animate-pulse'
                        : isVowel
                        ? 'bg-gradient-to-b from-rose-600 to-rose-700 border-rose-900 text-white'
                        : 'bg-slate-800 border-slate-950 text-slate-100 hover:bg-slate-700'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Row 4: Spacebar */}
          <div className="flex justify-center mt-0.5">
            <button
              onClick={() => handleKey(' ')}
              className={`w-48 sm:w-64 md:w-80 h-8 sm:h-9 md:h-10 font-game font-extrabold uppercase rounded-lg border-b-2 active:border-b-0 active:translate-y-0.5 transition-all duration-75 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer ${
                suggestedChar === ' '
                  ? 'bg-yellow-400 border-yellow-600 text-slate-950 scale-102 shadow-md animate-pulse'
                  : 'bg-slate-800/95 border-slate-950 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>␣</span>
              <span>DẤU CÁCH (SPACE)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
