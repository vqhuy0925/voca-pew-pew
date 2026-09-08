import React, { useEffect, useState } from 'react';
import { LevelNode, UserProgress } from '../../data/progress-types';
import { Gem, Sparkles, Check } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { completeLevelProgress } from '../../services/progressStorage';

interface ChestRewardModalProps {
  level: LevelNode;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onClose: () => void;
}

export const ChestRewardModal: React.FC<ChestRewardModalProps> = ({
  level,
  progress,
  onUpdateProgress,
  onClose
}) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    soundFx.playChestOpen();
    setIsOpened(true);

    // Give reward immediately
    onUpdateProgress(prev =>
      completeLevelProgress(prev, level.id, 3, 100, level.xpReward, level.gemReward)
    );
  }, [level]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-[#18143a] to-slate-950 border-3 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(251,191,36,0.35)] text-center animate-in zoom-in-95 duration-200">
        {/* Chest Icon */}
        <div className="w-24 h-24 mx-auto mb-4 bg-amber-400/20 rounded-full border-3 border-amber-400 flex items-center justify-center text-5xl shadow-lg animate-bounce">
          {isOpened ? '🎁✨' : '📦'}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-game text-yellow-300 mb-1">
          CHÚC MỪNG BÉ! 🎉
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Bé đã mở khóa thành công <span className="text-amber-300 font-bold">{level.titleVi}</span>!
        </p>

        {/* Rewards Box */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400/50 flex flex-col items-center">
            <Gem className="w-8 h-8 text-cyan-400 fill-cyan-400 mb-1 animate-pulse" />
            <div className="text-xs text-cyan-300 font-bold uppercase">Kim Cương</div>
            <div className="text-2xl font-game font-bold text-white">+{level.gemReward}</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-500/15 border-2 border-purple-400/50 flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-purple-400 fill-purple-400 mb-1" />
            <div className="text-xs text-purple-300 font-bold uppercase">Kinh Nghiệm</div>
            <div className="text-2xl font-game font-bold text-white">+{level.xpReward} XP</div>
          </div>
        </div>

        {/* Collect Action */}
        <button
          onClick={() => {
            soundFx.playGemPickup();
            onClose();
          }}
          className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-game font-bold text-xl rounded-2xl border-b-6 border-amber-600 active:border-b-0 active:translate-y-1.5 shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-6 h-6 stroke-[3]" />
          NHẬN THƯỞNG NGAY
        </button>
      </div>
    </div>
  );
};
