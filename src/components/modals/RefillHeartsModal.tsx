import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { Heart, Gem, Sparkles, X, RotateCcw } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { refillHearts } from '../../services/progressStorage';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-[#18143a] to-slate-950 border-3 border-rose-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.3)] text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heart Icon */}
        <div className="w-20 h-20 mx-auto mb-4 bg-rose-500/20 rounded-full border-3 border-rose-400 flex items-center justify-center shadow-lg animate-bounce">
          <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-game text-white mb-1">
          NẠP TRÁI TIM ❤️
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Trái tim giúp bé không bị ngắt quãng khi đang bảo vệ trạm không gian!
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {/* Refill with gems */}
          <button
            onClick={handleRefillWithGems}
            disabled={!canAfford}
            className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition ${
              canAfford
                ? 'bg-cyan-500/15 border-cyan-400 hover:bg-cyan-500/25 cursor-pointer active:scale-95'
                : 'bg-slate-800/40 border-slate-700 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">💎</div>
              <div className="text-left">
                <div className="font-game font-bold text-white text-base">Hồi phục 5 Trái Tim</div>
                <div className="text-xs text-slate-400">Dùng kim cương đã thu thập</div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-cyan-400 text-slate-950 font-game font-bold rounded-xl text-sm flex items-center gap-1">
              <Gem className="w-4 h-4 fill-slate-950" /> {GEM_COST}
            </div>
          </button>

          {/* Free Kid practice refill */}
          <button
            onClick={handleFreeRefill}
            className="w-full p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-400 hover:bg-emerald-500/25 flex items-center justify-between transition cursor-pointer active:scale-95"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">✨</div>
              <div className="text-left">
                <div className="font-game font-bold text-white text-base">Nạp Miễn Phí Cho Bé</div>
                <div className="text-xs text-emerald-300 font-medium">Bé tiếp tục học vui vẻ!</div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-emerald-400 text-slate-950 font-game font-bold rounded-xl text-sm flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Miễn phí
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
