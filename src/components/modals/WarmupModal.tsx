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
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl text-center my-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-left mb-4">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
            Màn {level.levelNumber}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-game text-white">
            {level.titleVi}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Bấm vào từ để nghe phát âm trước khi chơi
          </p>
        </div>

        {/* Words Grid Flashcards */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {level.words.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleSpeak(item.word, e)}
              className="relative p-3 rounded-2xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-400/80 cursor-pointer transition active:scale-95 flex flex-col items-center group text-center"
            >
              <span className="text-3xl mb-1">{item.emoji}</span>
              <div className="font-game font-extrabold text-lg text-white group-hover:text-cyan-300 leading-tight">
                {item.word}
              </div>
              <div className="text-xs font-semibold text-yellow-400 mt-0.5">
                {item.meaningVi}
              </div>

              {/* Sound icon */}
              <div className="absolute top-2 right-2 p-1 rounded-md bg-slate-800 text-slate-400 group-hover:text-cyan-300 transition">
                <Volume2 className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center justify-between gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800 mb-5">
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
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-game font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-slate-800 text-white shadow-sm'
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
          className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-game font-extrabold text-lg rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>BẮT ĐẦU CHƠI</span>
        </button>
      </div>
    </div>
  );
};

