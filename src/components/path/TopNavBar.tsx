import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { Flame, Gem, Heart, Volume2, VolumeX, Rocket, Palette } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../../data/theme-types';

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

  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;
  const mascot = MASCOT_CONFIGS[progress.mascotId || 'cosmo_dog'] || MASCOT_CONFIGS.cosmo_dog;
  const defaultFallbackName = progress.gender === 'girl' ? 'Công Chúa Nhỏ' : progress.gender === 'boy' ? 'Phi Hành Gia' : 'Nhà Thám Hiểm';
  const displayName = progress.userName?.trim() || defaultFallbackName;

  const genderBadge = progress.gender === 'girl' ? '💖' : progress.gender === 'boy' ? '⚡' : '🌟';

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3 shadow-md select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Brand Logo & Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfileModal}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:${theme.borderAccent} transition cursor-pointer active:scale-95 group shadow-sm`}
            title="Đổi tên, phong cách, màu sắc & bạn đồng hành"
          >
            <div className="relative">
              <span className="text-2xl sm:text-3xl drop-shadow">{progress.avatar || '🚀'}</span>
              <span className="absolute -bottom-1 -right-1 text-xs">{genderBadge}</span>
            </div>
            <div className="text-left hidden sm:block">
              <div className={`font-game font-extrabold text-sm sm:text-base text-white group-hover:${theme.textColor} transition truncate max-w-[130px]`}>
                {displayName}
              </div>
              <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                <span>{mascot.icon} {mascot.name}</span>
                <span>•</span>
                <span>{progress.userAge ? `${progress.userAge} tuổi` : 'Học viên'}</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center/Right: Resource Status Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Armory Shop Button */}
          {onOpenArmory && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenArmory();
              }}
              className="flex items-center gap-2 px-3.5 py-2 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/40 rounded-2xl text-purple-300 font-game font-extrabold text-xs sm:text-sm md:text-base transition active:scale-95 cursor-pointer shadow-sm hover:border-purple-300"
              title="Xưởng Nâng Cấp Tàu & Vũ Khí"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="hidden sm:inline">Xưởng Tàu</span>
            </button>
          )}

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 border border-amber-400/30 rounded-2xl text-amber-300 font-game font-extrabold text-xs sm:text-sm md:text-base"
            title="Chuỗi ngày học liên tiếp"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-orange-400" />
            <span>{progress.streakDays}</span>
          </div>

          {/* Gems */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl text-cyan-200 font-game font-extrabold text-xs sm:text-sm md:text-base"
            title="Kim cương"
          >
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 fill-cyan-400" />
            <span>{progress.gems}</span>
          </div>

          {/* Hearts */}
          <button
            onClick={onOpenRefillModal}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 rounded-2xl text-rose-300 font-game font-extrabold text-xs sm:text-sm md:text-base transition active:scale-95 cursor-pointer hover:border-rose-400/50"
            title="Mạng chơi (Bấm để nạp thêm)"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500" />
            <span>{progress.hearts}/{progress.maxHearts}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
            title={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

