import React, { useEffect } from 'react';
import { LevelNode, ThemeStyle } from '../../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../../data/upgrade-types';
import { THEME_CONFIGS } from '../../data/theme-types';
import { Volume2, Play, X } from 'lucide-react';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { soundFx } from '../../game/engine/SoundController';

interface WarmupModalProps {
  level: LevelNode;
  themeStyle?: ThemeStyle;
  selectedDifficulty?: DifficultyLevel;
  onSelectDifficulty?: (diff: DifficultyLevel) => void;
  onOpenArmory?: () => void;
  equippedShipId?: string;
  onStartGame: () => void;
  onClose: () => void;
}

export const WarmupModal: React.FC<WarmupModalProps> = ({
  level,
  themeStyle = 'cosmic_cyan',
  selectedDifficulty = 'NORMAL',
  onSelectDifficulty,
  onStartGame,
  onClose
}) => {
  const theme = THEME_CONFIGS[themeStyle] || THEME_CONFIGS.cosmic_cyan;
  const [playingId, setPlayingId] = React.useState<string | null>(null);

  useEffect(() => {
    if (level.words.length > 0) {
      speechHelper.preloadWords(level.words.map(w => w.word));
    }
  }, [level]);

  const handleSpeak = (itemId: string, word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    setPlayingId(itemId);
    speechHelper.speak(word, true);
    setTimeout(() => {
      setPlayingId(prev => (prev === itemId ? null : prev));
    }, 2500);
  };

  const handleStart = () => {
    soundFx.playClick();
    onStartGame();
  };

  const difficulties: DifficultyLevel[] = ['EASY', 'NORMAL', 'HEROIC'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg bg-gradient-to-b ${theme.bgGradient} border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-7 text-center my-4 max-h-[92vh] overflow-y-auto`}
        style={{ boxShadow: `0 0 35px ${theme.glowColor}` }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-left mb-5">
          <div className={`text-xs sm:text-sm font-black ${theme.textColor} uppercase tracking-wide`}>
            Màn {level.levelNumber}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-game text-white mt-0.5">
            {level.titleVi}
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {level.words.some(w => w.word.length > 20)
              ? 'Bấm vào từng câu để nghe phát âm chuẩn & luyện nói (Shadowing) trước khi bắt đầu 🎙️'
              : 'Bấm vào từng từ vựng để nghe phát âm trước khi bắt đầu'}
          </p>
        </div>

        {/* Words / Sentences Grid Flashcards */}
        <div className={`mb-6 max-h-72 overflow-y-auto pr-1 ${
          level.words.some(w => w.word.length > 20)
            ? 'grid grid-cols-1 gap-2.5'
            : 'grid grid-cols-2 gap-3'
        }`}>
          {level.words.map((item) => {
            const isLong = item.word.length > 20;
            const isPlaying = playingId === item.id;

            return (
              <button
                key={item.id}
                onClick={(e) => handleSpeak(item.id, item.word, e)}
                className={`relative p-3.5 rounded-2xl border cursor-pointer transition active:scale-95 flex group ${
                  isPlaying
                    ? `${theme.cardBg} ${theme.borderAccent} ring-2 ring-white/30 shadow-md`
                    : 'bg-slate-950/80 hover:bg-slate-800/90 border-slate-800 hover:border-slate-600'
                } ${
                  isLong ? 'flex-row items-center text-left gap-3.5' : 'flex-col items-center text-center'
                }`}
              >
                <span className={`flex-shrink-0 drop-shadow ${isLong ? 'text-3xl sm:text-4xl' : 'text-3xl sm:text-4xl mb-1.5'} ${isPlaying ? 'scale-110' : ''} transition-transform`}>
                  {item.emoji}
                </span>

                <div className="flex-1 min-w-0">
                  <div className={`font-game font-bold ${isLong ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} text-white group-hover:text-cyan-300 truncate`}>
                    {item.word}
                  </div>
                  <div className="text-xs sm:text-sm text-yellow-300 font-medium truncate mt-0.5">
                    {item.meaningVi}
                  </div>
                </div>

                {/* Sound icon */}
                <div className={`p-1.5 rounded-full ${isPlaying ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'} ml-auto self-center`}>
                  <Volume2 className="w-4 h-4" />
                </div>
              </button>
            );
          })}
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
          className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-game font-black text-lg sm:text-xl rounded-2xl shadow-lg border-b-4 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer`}
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>BẮT ĐẦU CHƠI</span>
        </button>
      </div>
    </div>
  );
};
