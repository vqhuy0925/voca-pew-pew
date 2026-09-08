import React, { useEffect } from 'react';
import { LevelNode } from '../../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS, getSpaceshipById } from '../../data/upgrade-types';
import { Volume2, Play, Sparkles, X, Rocket, Shield } from 'lucide-react';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';

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
  onOpenArmory,
  equippedShipId = 'ship-scout',
  onStartGame,
  onClose
}) => {
  // Preload vocabulary audio on open
  useEffect(() => {
    if (level.words.length > 0) {
      speechHelper.preloadWords(level.words.map(w => w.word));
    }
  }, [level]);

  const currentShip = getSpaceshipById(equippedShipId);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#101438] to-slate-950 border-3 border-cyan-400/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-center my-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-xs sm:text-sm font-bold mb-2">
          <Sparkles className="w-4 h-4" /> Màn {level.levelNumber} • {level.titleVi}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white mb-1 tracking-wide">
          LÀM QUEN TỪ VỰNG 📖
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 mb-4">
          Bé bấm vào từng thẻ để nghe phát âm trước khi xuất kích!
        </p>

        {/* Words Grid Flashcards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {level.words.map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleSpeak(item.word, e)}
              className="relative p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700/95 border-2 border-slate-700 hover:border-cyan-400 cursor-pointer transition transform hover:scale-103 active:scale-95 shadow-md flex flex-col items-center group"
            >
              <span className="text-4xl mb-1">{item.emoji}</span>
              <div className="font-game font-extrabold text-xl sm:text-2xl text-white group-hover:text-cyan-300 leading-tight">
                {item.word}
              </div>
              <div className="text-xs text-cyan-300 font-semibold">
                {item.pronunciation || ''}
              </div>
              <div className="text-sm font-bold text-amber-300 mt-0.5">
                {item.meaningVi}
              </div>

              {/* Sound icon */}
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-cyan-500/20 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Difficulty Level Selector */}
        <div className="bg-slate-950/80 border-2 border-slate-800 rounded-2xl p-3 mb-4 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-extrabold text-cyan-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Chọn Mức Độ Thử Thách:
            </span>
            {onOpenArmory && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenArmory();
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-yellow-300 hover:text-yellow-200 transition cursor-pointer"
              >
                <span>{currentShip.icon} Đổi Tàu/Súng</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
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
                  className={`p-2 rounded-xl border-2 transition cursor-pointer flex flex-col items-center justify-center text-center ${
                    isSelected
                      ? 'bg-slate-900 shadow-md scale-102 font-extrabold'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                  style={{
                    borderColor: isSelected ? cfg.color : undefined,
                    color: isSelected ? cfg.color : undefined
                  }}
                >
                  <span className="text-lg mb-0.5">{cfg.emoji}</span>
                  <span className="text-xs font-game leading-tight">{cfg.titleVi}</span>
                  <span className="text-[10px] mt-0.5 opacity-80">
                    {diff === 'HEROIC' ? '🔥 x2 Thưởng' : diff === 'NORMAL' ? '⭐ Chuẩn' : '🌱 Chậm'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button: Start Game */}
        <button
          onClick={handleStart}
          className="w-full py-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-2xl rounded-2xl border-b-6 border-emerald-600 active:border-b-0 active:translate-y-1.5 shadow-[0_10px_30px_rgba(0,240,255,0.4)] transition flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Play className="w-6 h-6 fill-slate-950" />
          BẮT ĐẦU CHIẾN ĐẤU! 🚀
        </button>
      </div>
    </div>
  );
};

