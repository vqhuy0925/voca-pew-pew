import React, { useState } from 'react';
import { Keyboard as KeyboardIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
}

const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-1 flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 rounded-full text-xs text-slate-300 backdrop-blur-md transition shadow-md"
      >
        <KeyboardIcon className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isOpen ? 'Ẩn bàn phím ảo' : 'Bàn phím ảo (iPad)'}</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Keyboard Matrix */}
      {isOpen && (
        <div className="bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 p-2.5 rounded-2xl shadow-2xl flex flex-col gap-1.5 max-w-lg w-[95vw] sm:w-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
          {ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map((char) => (
                <button
                  key={char}
                  onClick={() => onKeyPress(char)}
                  className="w-8 sm:w-10 h-10 sm:h-11 bg-slate-800 hover:bg-cyan-600 active:bg-cyan-400 active:scale-95 text-white font-game font-bold uppercase rounded-lg border border-slate-700 hover:border-cyan-400 transition shadow flex items-center justify-center text-sm sm:text-base"
                >
                  {char}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
