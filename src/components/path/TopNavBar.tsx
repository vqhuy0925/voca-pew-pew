import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { Flame, Gem, Heart, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';

interface TopNavBarProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenRefillModal?: () => void;
  onOpenProfileModal?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  progress,
  onUpdateProgress,
  onOpenRefillModal,
  onOpenProfileModal
}) => {
  const toggleSound = () => {
    const isMuted = soundFx.toggleMute();
    speechHelper.setEnabled(!isMuted);
    onUpdateProgress(p => ({ ...p, soundEnabled: !isMuted }));
  };

  const displayName = progress.userName?.trim() || 'Phi Hành Gia';

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b-2 border-slate-800 px-3 sm:px-4 py-2.5 shadow-md select-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* App Logo & Player Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xl sm:text-2xl shadow-md border-2 border-white/40 transform hover:rotate-6 transition flex-shrink-0">
            🚀
          </div>
          <div className="hidden md:block">
            <h1 className="font-game font-extrabold text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-400 to-yellow-300 leading-tight">
              VOCAB PEW PEW
            </h1>
            <span className="text-xs text-cyan-300 font-semibold">Space Adventure</span>
          </div>

          {/* Player Profile Chip */}
          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700/90 border-2 border-cyan-400/50 hover:border-cyan-300 rounded-2xl text-cyan-200 font-game font-bold text-sm shadow-sm transition active:scale-95 cursor-pointer max-w-[130px] sm:max-w-[170px]"
            title="Hồ sơ phi hành gia (Bấm để đổi tên & biểu tượng)"
          >
            <span className="text-base sm:text-lg">{progress.avatar || '🚀'}</span>
            <span className="truncate">{displayName}</span>
          </button>
        </div>

        {/* Stats Pill Badges (Streak, Gems, Hearts, XP) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/15 border-2 border-amber-400/60 rounded-2xl text-amber-300 font-game font-bold text-base shadow-sm"
            title="Chuỗi ngày học liên tiếp"
          >
            <Flame className="w-5 h-5 text-orange-400 fill-orange-400 animate-pulse" />
            <span>{progress.streakDays}</span>
          </div>

          {/* Gems */}
          <div
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500/15 border-2 border-cyan-400/60 rounded-2xl text-cyan-200 font-game font-bold text-base shadow-sm"
            title="Kim cương thưởng"
          >
            <Gem className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            <span>{progress.gems}</span>
          </div>

          {/* Hearts (Life system) */}
          <button
            onClick={onOpenRefillModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 border-2 border-rose-400/60 rounded-2xl text-rose-300 font-game font-bold text-base shadow-sm transition active:scale-95 cursor-pointer"
            title="Trái tim mạng chơi (Bấm để nạp)"
          >
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
            <span>{progress.hearts}/{progress.maxHearts}</span>
          </button>

          {/* Total XP Badge */}
          <div
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-500/15 border-2 border-purple-400/60 rounded-2xl text-purple-200 font-game font-bold text-base shadow-sm"
            title="Tổng điểm kinh nghiệm"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>{progress.totalXp} XP</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition active:scale-95 shadow-sm"
            title={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
