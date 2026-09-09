import React, { useState, useEffect } from 'react';
import { UserProgress } from '../../data/progress-types';
import { Flame, Gem, Heart, Volume2, VolumeX, Rocket, Zap, Cloud, CloudOff, RefreshCw, Trophy } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../../data/theme-types';
import { subscribeSyncStatus, SyncStatus } from '../../services/firebase/cloudSyncService';

interface TopNavBarProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenRefillModal?: () => void;
  onOpenEnergyModal?: () => void;
  onOpenProfileModal?: () => void;
  onOpenArmory?: () => void;
  onOpenLeaderboard?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  progress,
  onUpdateProgress,
  onOpenRefillModal,
  onOpenEnergyModal,
  onOpenProfileModal,
  onOpenArmory,
  onOpenLeaderboard
}) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('offline');

  useEffect(() => {
    return subscribeSyncStatus((status) => {
      setSyncStatus(status);
    });
  }, []);

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
              <div className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                <span>{mascot.icon} {mascot.name}</span>
                <span>•</span>
                <span className="font-mono text-cyan-400 font-bold">{progress.playerTag || '#PEW'}</span>
                {syncStatus === 'synced' && <span title="Đã đồng bộ đám mây"><Cloud className="w-3.5 h-3.5 text-emerald-400" /></span>}
                {syncStatus === 'syncing' && <span title="Đang đồng bộ..."><RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" /></span>}
                {syncStatus === 'offline' && <span title="Chế độ ngoại tuyến"><CloudOff className="w-3.5 h-3.5 text-slate-500" /></span>}
                {syncStatus === 'error' && <span title="Lỗi đồng bộ mây"><CloudOff className="w-3.5 h-3.5 text-rose-400" /></span>}
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
              className="flex items-center gap-2 px-3.5 py-2 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/40 rounded-2xl text-purple-300 font-orbitron font-extrabold text-xs sm:text-sm md:text-base transition active:scale-95 cursor-pointer shadow-sm hover:border-purple-300"
              title="Xưởng Nâng Cấp Tàu & Vũ Khí"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="hidden sm:inline">Xưởng Tàu</span>
            </button>
          )}

          {/* Leaderboard Button 🏆 */}
          {onOpenLeaderboard && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenLeaderboard();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 hover:border-amber-300 rounded-2xl text-amber-300 font-orbitron font-extrabold text-xs sm:text-sm md:text-base transition active:scale-95 cursor-pointer shadow-sm"
              title="Bảng Xếp Hạng Vũ Trụ (Thi đua học tập)"
            >
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">BXH</span>
            </button>
          )}

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 border border-amber-400/30 rounded-2xl text-amber-300 font-orbitron font-extrabold text-xs sm:text-sm md:text-base"
            title="Chuỗi ngày học liên tiếp"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-orange-400" />
            <span>{progress.streakDays}</span>
          </div>

          {/* Energy Reactor Pill ⚡ */}
          <button
            onClick={() => {
              soundFx.playClick();
              if (onOpenEnergyModal) onOpenEnergyModal();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-orbitron font-extrabold text-xs sm:text-sm md:text-base transition active:scale-95 cursor-pointer border ${
              progress.energy <= 15
                ? 'bg-rose-500/15 border-rose-400/50 text-rose-300 hover:bg-rose-500/25 animate-pulse'
                : 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-400/30 text-yellow-300 hover:border-yellow-400/50'
            }`}
            title="Năng lượng học tập hôm nay (Bấm để xem/nạp)"
          >
            <Zap className={`w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 ${progress.energy <= 15 ? 'animate-bounce' : ''}`} />
            <span>{`${progress.energy}⚡`}</span>
          </button>

          {/* Gems */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl text-cyan-200 font-orbitron font-extrabold text-xs sm:text-sm md:text-base"
            title="Kim cương"
          >
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 fill-cyan-400" />
            <span>{progress.gems}</span>
          </div>

          {/* Hearts */}
          <button
            onClick={onOpenRefillModal}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 rounded-2xl text-rose-300 font-orbitron font-extrabold text-xs sm:text-sm md:text-base transition active:scale-95 cursor-pointer hover:border-rose-400/50"
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

