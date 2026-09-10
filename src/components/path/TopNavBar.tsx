import React, { useState, useEffect } from 'react';
import { UserProgress } from '../../data/progress-types';
import { Flame, Gem, Heart, Volume2, VolumeX, Rocket, Zap, Cloud, CloudOff, RefreshCw, Trophy, Shield } from 'lucide-react';
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
  onOpenAstronautCard?: () => void;
  onOpenDiamondGuide?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  progress,
  onUpdateProgress,
  onOpenRefillModal,
  onOpenEnergyModal,
  onOpenProfileModal,
  onOpenArmory,
  onOpenLeaderboard,
  onOpenAstronautCard,
  onOpenDiamondGuide
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
            className={`flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:${theme.borderAccent} transition cursor-pointer active:scale-95 group shadow-sm`}
            title="Đổi tên, phong cách, màu sắc & bạn đồng hành"
          >
            <div className="relative">
              <span className="text-2xl sm:text-3xl drop-shadow">{progress.avatar || '🚀'}</span>
              <span className="absolute -bottom-1 -right-1 text-xs">{genderBadge}</span>
            </div>
            <div className="text-left hidden sm:flex items-center gap-2">
              <span className={`font-game font-black text-base sm:text-lg text-white group-hover:${theme.textColor} transition truncate max-w-[150px]`}>
                {displayName}
              </span>
              {syncStatus === 'synced' && <span title="Đã đồng bộ đám mây"><Cloud className="w-4 h-4 text-emerald-400" /></span>}
              {syncStatus === 'syncing' && <span title="Đang đồng bộ..."><RefreshCw className="w-4 h-4 text-amber-400 animate-spin" /></span>}
              {syncStatus === 'offline' && <span title="Chế độ ngoại tuyến"><CloudOff className="w-4 h-4 text-slate-500" /></span>}
              {syncStatus === 'error' && <span title="Lỗi đồng bộ mây"><CloudOff className="w-4 h-4 text-rose-400" /></span>}
            </div>
          </button>
        </div>

        {/* Center/Right: Resource Status Pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          {/* Armory Shop Button */}
          {onOpenArmory && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenArmory();
              }}
              className="btn-3d px-3 py-2 sm:px-4 sm:py-2.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/50 border-b-3 border-b-purple-800 rounded-2xl text-purple-200 font-orbitron font-black text-xs sm:text-sm md:text-base transition shadow-sm hover:border-purple-300"
              title="Xưởng Nâng Cấp Tàu & Vũ Khí"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-1 sm:mr-1.5" />
              <span className="hidden sm:inline">Xưởng</span>
            </button>
          )}

          {/* Leaderboard Button 🏆 */}
          {onOpenLeaderboard && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenLeaderboard();
              }}
              className="btn-3d px-3 py-2 sm:px-4 sm:py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 border-b-3 border-b-amber-800 rounded-2xl text-amber-200 font-orbitron font-black text-xs sm:text-sm md:text-base transition shadow-sm hover:border-amber-300"
              title="Bảng Xếp Hạng Vũ Trụ"
            >
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mr-1 animate-pulse" />
              <span className="hidden sm:inline">BXH</span>
            </button>
          )}

          {/* Astronaut Citizen ID Card Button 🪪 */}
          {onOpenAstronautCard && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenAstronautCard();
              }}
              className="btn-3d px-3 py-2 sm:px-4 sm:py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 border-b-3 border-b-cyan-800 rounded-2xl text-cyan-200 font-orbitron font-black text-xs sm:text-sm md:text-base transition shadow-sm hover:border-cyan-300"
              title="Thẻ Căn Cước Phi Hành Gia"
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-1" />
              <span className="hidden sm:inline">Thẻ ID</span>
            </button>
          )}

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-amber-500/10 border border-amber-400/30 border-b-2 border-b-amber-900/50 rounded-2xl text-amber-300 font-orbitron font-black text-xs sm:text-sm md:text-base"
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
            className={`btn-3d flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl font-orbitron font-black text-xs sm:text-sm md:text-base transition border ${
              progress.energy <= 15
                ? 'bg-rose-500/20 border-rose-400/60 border-b-3 border-b-rose-800 text-rose-300 hover:bg-rose-500/30 animate-pulse'
                : 'bg-yellow-500/15 hover:bg-yellow-500/25 border-yellow-400/50 border-b-3 border-b-yellow-800 text-yellow-300'
            }`}
            title="Năng lượng học tập hôm nay (Bấm để xem/nạp)"
          >
            <Zap className={`w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 ${progress.energy <= 15 ? 'animate-bounce' : ''}`} />
            <span>{`${progress.energy}⚡`}</span>
          </button>

          {/* Gems */}
          <button
            onClick={() => {
              soundFx.playClick();
              if (onOpenDiamondGuide) onOpenDiamondGuide();
            }}
            className="btn-3d flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 border-b-3 border-b-cyan-800 rounded-2xl text-cyan-200 font-orbitron font-black text-xs sm:text-sm md:text-base transition cursor-pointer"
            title="Kim cương (Bấm để xem bí kíp kiếm kim cương 💎)"
          >
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 fill-cyan-400 animate-pulse" />
            <span>{progress.gems}</span>
          </button>

          {/* Hearts */}
          <button
            onClick={() => {
              soundFx.playClick();
              if (onOpenRefillModal) onOpenRefillModal();
            }}
            className="btn-3d flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/50 border-b-3 border-b-rose-800 rounded-2xl text-rose-300 font-orbitron font-black text-xs sm:text-sm md:text-base transition"
            title="Mạng chơi (Bấm để nạp thêm)"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500" />
            <span>{progress.hearts}/{progress.maxHearts}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="btn-3d btn-3d-slate min-w-[48px] min-h-[48px] p-2.5 rounded-2xl border-slate-700 hover:border-slate-500 text-slate-300 shadow-sm"
            title={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            aria-label={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-cyan-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-rose-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

