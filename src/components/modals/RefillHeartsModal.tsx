import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { Heart, Gem, Sparkles, X, RotateCcw } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { refillHearts } from '../../services/progressStorage';

import { getRefillHeartsMessages } from '../../services/personaMessageHelper';

import { MascotWidget } from '../mascot/MascotWidget';

interface RefillHeartsModalProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onClose: () => void;
}

export const RefillHeartsModal: React.FC<RefillHeartsModalProps> = ({
  progress,
  onUpdateProgress,
  onClose
}) => {
  const GEM_COST = 20;
  const canAfford = progress.gems >= GEM_COST;
  const messages = getRefillHeartsMessages(
    progress.userAge,
    progress.gender,
    progress.userName
  );

  const handleRefillWithGems = () => {
    if (!canAfford) {
      soundFx.playWrong();
      return;
    }
    soundFx.playGemPickup();
    onUpdateProgress(prev => {
      const withGemsDeducted = { ...prev, gems: prev.gems - GEM_COST };
      return refillHearts(withGemsDeducted);
    });
    onClose();
  };

  const handleFreeRefill = () => {
    soundFx.playGemPickup();
    onUpdateProgress(prev => refillHearts(prev));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-[#18143a] to-slate-950 border-2 sm:border-3 border-rose-400 rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(244,63,94,0.3)] text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-xl sm:rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
          aria-label="Đóng"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Heart Icon */}
        <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto mb-2.5 bg-rose-500/20 rounded-2xl border-2 sm:border-3 border-rose-400 flex items-center justify-center shadow-lg animate-bounce">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500 fill-rose-500" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-game text-white mb-1 tracking-wide starwars-cyan-glow">
          NẠP TRÁI TIM ❤️
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 mb-4 font-game">
          {messages.subtitle}
        </p>

        {/* Options */}
        <div className="space-y-2.5 mb-4">
          {/* Refill with gems */}
          <button
            onClick={handleRefillWithGems}
            disabled={!canAfford}
            className={`w-full p-3 sm:p-3.5 rounded-2xl border-2 flex items-center justify-between transition cursor-pointer ${
              canAfford
                ? 'bg-cyan-500/15 border-cyan-400 hover:bg-cyan-500/25 active:scale-95 shadow-md'
                : 'bg-slate-800/40 border-slate-700 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl sm:text-3xl">💎</div>
              <div className="text-left">
                <div className="font-game font-extrabold text-white text-sm sm:text-base">Hồi phục 5 Trái Tim</div>
                <div className="text-[11px] text-slate-300">Dùng kim cương đã thu thập</div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-cyan-400 text-slate-950 font-game font-extrabold rounded-xl text-xs sm:text-sm flex items-center gap-1">
              <Gem className="w-4 h-4 fill-slate-950" /> {GEM_COST}
            </div>
          </button>

          {/* Free practice refill */}
          <button
            onClick={handleFreeRefill}
            className="w-full p-3 sm:p-3.5 rounded-2xl bg-emerald-500/15 border-2 border-emerald-400 hover:bg-emerald-500/25 flex items-center justify-between transition cursor-pointer active:scale-95 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl sm:text-3xl">✨</div>
              <div className="text-left">
                <div className="font-game font-extrabold text-white text-sm sm:text-base">{messages.freeButtonTitle}</div>
                <div className="text-[11px] text-emerald-300 font-semibold">{messages.freeButtonSubtitle}</div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-emerald-400 text-slate-950 font-game font-extrabold rounded-xl text-xs sm:text-sm flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Miễn phí
            </div>
          </button>
        </div>

        {/* Mascot Tip */}
        <div className="pt-2 border-t border-slate-800/80">
          <MascotWidget
            mascotId={progress.mascotId}
            mood="thinking"
            userAge={progress.userAge}
            gender={progress.gender}
            userName={progress.userName}
            customMessage="Đừng lo lắng! Học tiếng Anh càng luyện nhiều thì gõ càng nhanh và ít mất tim hơn đấy! 🚀💖"
          />
        </div>
      </div>
    </div>
  );
};
