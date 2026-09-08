import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { Flame, Gem, Heart, Volume2, VolumeX, Rocket } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';

interface TopNavBarProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenRefillModal?: () => void;
  onOpenProfileModal?: () => void;
  onOpenArmory?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  progress,
  onUpdateProgress,
  onOpenRefillModal,
  onOpenProfileModal,
  onOpenArmory
}) => {
  const toggleSound = () => {
    const isMuted = soundFx.toggleMute();
    speechHelper.setEnabled(!isMuted);
    onUpdateProgress(p => ({ ...p, soundEnabled: !isMuted }));
  };

  const displayName = progress.userName?.trim() || 'Phi Hành Gia';

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-3 sm:px-6 py-2.5 shadow-sm select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400 transition cursor-pointer active:scale-95 group"
            title="Đổi tên & nhân vật"
          >
            <span className="text-xl sm:text-2xl">{progress.avatar || '🚀'}</span>
            <div className="text-left hidden sm:block">
              <div className="font-game font-extrabold text-xs text-white group-hover:text-cyan-300 transition truncate max-w-[110px]">
                {displayName}
              </div>
              <div className="text-[10px] text-cyan-400 font-semibold">
                {progress.userAge ? `${progress.userAge} tuổi` : 'Học viên'}
              </div>
            </div>
          </button>
        </div>

        {/* Center/Right: Resource Status Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Armory Shop Button */}
          {onOpenArmory && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenArmory();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/40 rounded-xl text-purple-300 font-game font-bold text-xs sm:text-sm transition active:scale-95 cursor-pointer"
              title="Xưởng Nâng Cấp Tàu & Vũ Khí"
            >
              <Rocket className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">Xưởng Tàu</span>
            </button>
          )}

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 border border-amber-400/30 rounded-xl text-amber-300 font-game font-bold text-xs sm:text-sm"
            title="Chuỗi ngày học liên tiếp"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>{progress.streakDays}</span>
          </div>

          {/* Gems */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-cyan-200 font-game font-bold text-xs sm:text-sm"
            title="Kim cương"
          >
            <Gem className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>{progress.gems}</span>
          </div>

          {/* Hearts */}
          <button
            onClick={onOpenRefillModal}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 rounded-xl text-rose-300 font-game font-bold text-xs sm:text-sm transition active:scale-95 cursor-pointer"
            title="Mạng chơi (Bấm để nạp thêm)"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{progress.hearts}/{progress.maxHearts}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
            title={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

