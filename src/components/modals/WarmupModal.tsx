import React, { useEffect } from 'react';
import { LevelNode } from '../../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../../data/upgrade-types';
import { Volume2, Play, X } from 'lucide-react';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { soundFx } from '../../game/engine/SoundController';

interface WarmupModalProps {
  level: LevelNode;
  selectedDifficulty?: DifficultyLevel;
  onSelectDifficulty?: (diff: DifficultyLevel) => void;
  onOpenArmory?: () => void;
  equippedShipId?: string;
  onStartGame: () => void;
  onClose: () => void;
}

export const WarmupModal: React.FC<WarmupModalProps> = ({
  level,
  selectedDifficulty = 'NORMAL',
  onSelectDifficulty,
  onStartGame,
  onClose
}) => {
  useEffect(() => {
    if (level.words.length > 0) {
      speechHelper.preloadWords(level.words.map(w => w.word));
    }
  }, [level]);

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(word);
  };

  const handleStart = () => {
    soundFx.playClick();
    onStartGame();
  };

  const difficulties: DifficultyLevel[] = ['EASY', 'NORMAL', 'HEROIC'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-[#101438] border-2 border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl text-center my-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-left mb-5">
          <div className="text-xs sm:text-sm font-black text-cyan-400 uppercase tracking-wide">
            Màn {level.levelNumber}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-game text-white mt-0.5">
            {level.titleVi}
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Bấm vào từng từ vựng để nghe phát âm trước khi bắt đầu
          </p>
        </div>

        {/* Words Grid Flashcards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {level.words.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleSpeak(item.word, e)}
              className="relative p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-400/80 cursor-pointer transition active:scale-95 flex flex-col items-center group text-center"
            >
              <span className="text-3xl sm:text-4xl mb-1.5">{item.emoji}</span>
              <div className="font-game font-extrabold text-lg sm:text-xl text-white group-hover:text-cyan-300 leading-tight">
                {item.word}
              </div>
              <div className="text-xs sm:text-sm font-bold text-yellow-300 mt-1">
                {item.meaningVi}
              </div>

              {/* Sound icon */}
              <div className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-slate-800 text-slate-400 group-hover:text-cyan-300 transition">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center justify-between gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
          {difficulties.map((diff) => {
            const cfg = DIFFICULTY_CONFIGS[diff];
            const isSelected = selectedDifficulty === diff;

            return (
              <button
                key={diff}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  if (onSelectDifficulty) onSelectDifficulty(diff);
                }}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs sm:text-sm font-game font-extrabold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800 text-white shadow-sm ring-1 ring-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                style={{
                  color: isSelected ? cfg.color : undefined
                }}
              >
                <span>{cfg.emoji}</span>
                <span>{cfg.titleVi}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button: Start Game */}
        <button
          onClick={handleStart}
          className="w-full py-4 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-game font-black text-lg sm:text-xl rounded-2xl shadow-lg border-b-4 border-teal-600 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>BẮT ĐẦU CHƠI</span>
        </button>
      </div>
    </div>
  );
};

