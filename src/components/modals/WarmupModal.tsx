import React, { useEffect } from 'react';
import { LevelNode } from '../../data/progress-types';
import { Volume2, Play, Sparkles, X } from 'lucide-react';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';

interface WarmupModalProps {
  level: LevelNode;
  onStartGame: () => void;
  onClose: () => void;
}

export const WarmupModal: React.FC<WarmupModalProps> = ({
  level,
  onStartGame,
  onClose
}) => {
  // Preload vocabulary audio on open (no auto-play, plays when child taps cards)
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#101438] to-slate-950 border-3 border-cyan-400/60 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-center my-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-sm font-bold mb-2">
          <Sparkles className="w-4 h-4" /> Màn {level.levelNumber} • {level.titleVi}
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-game text-white mb-1.5 tracking-wide">
          LÀM QUEN TỪ VỰNG 📖
        </h2>
        <p className="text-sm sm:text-base text-slate-200 mb-5">
          Bé hãy bấm vào từng thẻ để nghe phát âm chuẩn trước khi bắt đầu nhé!
        </p>

        {/* Words Grid Flashcards */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          {level.words.map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleSpeak(item.word, e)}
              className="relative p-4 rounded-3xl bg-slate-800/90 hover:bg-slate-700/95 border-2 border-slate-700 hover:border-cyan-400 cursor-pointer transition transform hover:scale-105 active:scale-95 shadow-lg flex flex-col items-center group"
            >
              <span className="text-5xl mb-2">{item.emoji}</span>
              <div className="font-game font-extrabold text-2xl sm:text-3xl text-white group-hover:text-cyan-300 leading-tight">
                {item.word}
              </div>
              <div className="text-sm text-cyan-300 font-semibold mt-0.5">
                {item.pronunciation || ''}
              </div>
              <div className="text-base font-bold text-amber-300 mt-1">
                {item.meaningVi}
              </div>

              {/* Little sound icon badge */}
              <div className="absolute top-2.5 right-2.5 p-2 rounded-full bg-cyan-500/25 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition">
                <Volume2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Mascot cheer */}
        <div className="flex justify-center mb-6">
          <MascotWidget mood="happy" customMessage="Bé đã nhớ hết từ chưa? Cùng bắn nào! 🚀" />
        </div>

        {/* Action Button: Start Game */}
        <button
          onClick={handleStart}
          className="w-full py-4.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-2xl rounded-2xl border-b-6 border-emerald-600 active:border-b-0 active:translate-y-1.5 shadow-[0_10px_30px_rgba(0,240,255,0.4)] transition flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Play className="w-7 h-7 fill-slate-950" />
          BẮT ĐẦU CHIẾN ĐẤU!
        </button>
      </div>
    </div>
  );
};
