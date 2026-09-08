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
  const [isOpen, setIsOpen] = useState<boolean>(true); // Default open for kids on touch/iPad

  const handleKey = (char: string) => {
    soundFx.playClick();
    onKeyPress(char);
  };

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center select-none">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-1.5 flex items-center gap-1.5 px-4 py-1 bg-slate-900/90 hover:bg-slate-800 border-2 border-slate-700 rounded-full text-xs font-game font-bold text-slate-300 backdrop-blur-md transition shadow-md cursor-pointer"
      >
        <KeyboardIcon className="w-4 h-4 text-cyan-400" />
        <span>{isOpen ? 'Ẩn bàn phím' : 'Bàn phím ảo cho bé (iPad)'}</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {/* Keyboard Matrix */}
      {isOpen && (
        <div className="bg-slate-950/95 backdrop-blur-xl border-3 border-cyan-400/40 p-2 sm:p-3 rounded-3xl shadow-2xl flex flex-col gap-1.5 max-w-lg w-[96vw] sm:w-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
          {ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map((char) => {
                const isSuggested = suggestedChar?.toLowerCase() === char;
                const isVowel = VOWELS.has(char);

                return (
                  <button
                    key={char}
                    onClick={() => handleKey(char)}
                    className={`w-8 sm:w-10 h-10 sm:h-12 font-game font-bold uppercase rounded-xl sm:rounded-2xl border-b-4 active:border-b-0 active:translate-y-1 transition-all duration-100 flex items-center justify-center text-sm sm:text-base cursor-pointer shadow-md ${
                      isSuggested
                        ? 'bg-yellow-400 border-yellow-600 text-slate-950 scale-110 shadow-[0_0_12px_rgba(250,204,21,0.8)] animate-pulse'
                        : isVowel
                        ? 'bg-gradient-to-b from-pink-500 to-rose-600 border-rose-800 text-white hover:brightness-110'
                        : 'bg-gradient-to-b from-slate-700 to-slate-800 border-slate-900 text-white hover:bg-slate-600'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
