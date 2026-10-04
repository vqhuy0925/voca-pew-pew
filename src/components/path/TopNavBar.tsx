import React, { useState, useEffect } from 'react';
import { UserProgress } from '../../data/progress-types';
import { Flame, Gem, Heart, Volume2, VolumeX, Rocket, Zap, Cloud, CloudOff, RefreshCw, Trophy, Shield, Smartphone, HelpCircle, Keyboard, Sun, Moon, LogOut, Key, UserCheck } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../../data/theme-types';
import { subscribeSyncStatus, SyncStatus } from '../../services/firebase/cloudSyncService';
import { CoursePillButton } from '../common/CoursePillButton';

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
  onOpenInstallModal?: () => void;
  onOpenLanding?: () => void;
  onOpenMistakeVault?: () => void;
  onOpenDailyQuests?: () => void;
  onOpenTypingDojo?: () => void;
  onOpenCourseSwitcher?: () => void;
  onOpenAuth?: (tab: 'register' | 'login') => void;
  onLogout?: () => void;
  onOpenMigration?: () => void;
  showInstallButton?: boolean;
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
  onOpenDiamondGuide,
  onOpenInstallModal,
  onOpenLanding,
  onOpenMistakeVault,
  onOpenDailyQuests,
  onOpenTypingDojo,
  onOpenCourseSwitcher,
  onOpenAuth,
  onLogout,
  onOpenMigration,
  showInstallButton = true
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
  const weakWordsCount = Object.values(progress.mistakeMap || {}).filter(w => w.masteryStatus !== 'mastered').length;

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-slate-800/80 px-3 sm:px-6 py-2 sm:py-3 select-none bg-slate-950/90 shadow-md text-white transition-all"
      style={{
        paddingTop: 'max(0.65rem, env(safe-area-inset-top, 0px))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))'
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-1.5 sm:gap-2">
        {/* Tier 1: Player Profile, Course Switcher & Core Economy Stats / Utilities */}
        <div className="flex items-center justify-between w-full gap-1.5 sm:gap-2 min-w-0">
          {/* Left: Avatar & Course Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
            {/* Brand Logo & Profile */}
            <button
              onClick={onOpenProfileModal}
              className={`h-9 sm:h-10 flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl border transition cursor-pointer active:scale-95 group shadow-sm shrink-0 whitespace-nowrap bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:${theme.borderAccent}`}
              title="Đổi tên, phong cách, màu sắc & bạn đồng hành"
            >
              <div className="relative flex items-center justify-center">
                <span className="text-base sm:text-2xl drop-shadow leading-none">{progress.avatar || '🚀'}</span>
                <span className="absolute -bottom-1 -right-1 text-[9px] sm:text-[10px] leading-none">{genderBadge}</span>
              </div>
              <div className="text-left flex items-center gap-1 sm:gap-1.5">
                <div className="flex flex-col">
                  <span className={`font-game font-black text-xs sm:text-sm transition truncate max-w-[70px] sm:max-w-[120px] 2xl:max-w-[160px] text-white group-hover:${theme.textColor}`}>
                    {displayName}
                  </span>
                  {progress.accountUsername && (
                    <span className="text-[9px] sm:text-[10px] text-cyan-400/80 font-mono -mt-0.5 truncate max-w-[70px] sm:max-w-[120px]">
                      @{progress.accountUsername}
                    </span>
                  )}
                </div>
                {syncStatus === 'synced' && <span title="Đã đồng bộ đám mây"><Cloud className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /></span>}
                {syncStatus === 'syncing' && <span title="Đang đồng bộ..."><RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-spin" /></span>}
                {syncStatus === 'offline' && <span title="Chế độ ngoại tuyến"><CloudOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500" /></span>}
                {syncStatus === 'error' && <span title="Lỗi đồng bộ mây"><CloudOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" /></span>}
              </div>
            </button>

            {/* Duolingo-style Course Switcher Pill */}
            {onOpenCourseSwitcher && (
              <CoursePillButton
                progress={progress}
                activeMode="saga"
                onClick={onOpenCourseSwitcher}
              />
            )}
          </div>

          {/* Right: Core Economy Stats & Utilities */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 overflow-x-auto no-scrollbar py-0.5">
            {/* Daily Streak & Daily Quests */}
            <button
              onClick={() => {
                soundFx.playClick();
                if (onOpenDailyQuests) onOpenDailyQuests();
              }}
              className="btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 border-b-2 sm:border-b-3 border-b-amber-800 rounded-xl sm:rounded-2xl text-amber-300 font-orbitron font-black text-xs sm:text-sm shrink-0 whitespace-nowrap cursor-pointer"
              title="Chuỗi ngày & Nhiệm vụ hôm nay (Bấm để xem)"
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 fill-orange-400 animate-bounce shrink-0" />
              <span>{progress.streakDays || 1}</span>
              <span className="hidden xl:inline text-xs">Ngày</span>
            </button>

            {/* Energy Reactor Pill ⚡ */}
            <button
              onClick={() => {
                soundFx.playClick();
                if (onOpenEnergyModal) onOpenEnergyModal();
              }}
              className={`btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 rounded-xl sm:rounded-2xl font-orbitron font-black text-xs sm:text-sm transition border shrink-0 whitespace-nowrap ${
                progress.energy <= 15
                  ? 'bg-rose-500/20 border-rose-400/60 border-b-2 sm:border-b-3 border-b-rose-800 text-rose-300 hover:bg-rose-500/30 animate-pulse'
                  : 'bg-yellow-500/15 hover:bg-yellow-500/25 border-yellow-400/50 border-b-2 sm:border-b-3 border-b-yellow-800 text-yellow-300'
              }`}
              title="Năng lượng hôm nay (Bấm để xem/nạp)"
            >
              <Zap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 shrink-0 ${progress.energy <= 15 ? 'animate-bounce' : ''}`} />
              <span>{`${progress.energy}⚡`}</span>
            </button>

            {/* Gems */}
            <button
              onClick={() => {
                soundFx.playClick();
                if (onOpenDiamondGuide) onOpenDiamondGuide();
              }}
              className="btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 border-b-2 sm:border-b-3 border-b-cyan-800 rounded-xl sm:rounded-2xl text-cyan-200 font-orbitron font-black text-xs sm:text-sm transition cursor-pointer shrink-0 whitespace-nowrap"
              title="Kim cương (Bấm để xem bí kíp)"
            >
              <Gem className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 fill-cyan-400 animate-pulse shrink-0" />
              <span>{progress.gems}</span>
            </button>

            {/* Hearts */}
            <button
              onClick={() => {
                soundFx.playClick();
                if (onOpenRefillModal) onOpenRefillModal();
              }}
              className="btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/50 border-b-2 sm:border-b-3 border-b-rose-800 rounded-xl sm:rounded-2xl text-rose-300 font-orbitron font-black text-xs sm:text-sm transition shrink-0 whitespace-nowrap"
              title="Trái tim thử thách (Bấm để nạp thêm)"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500 shrink-0" />
              <span>{progress.hearts}/{progress.maxHearts}</span>
            </button>

            {/* Visual Divider */}
            <div className="hidden sm:block h-5 w-px bg-slate-800/90 mx-0.5 shrink-0" />

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="btn-3d btn-3d-slate h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center border-slate-700 hover:border-slate-500 text-slate-300 rounded-xl sm:rounded-2xl shadow-sm shrink-0 p-0"
              title={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              aria-label={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {progress.soundEnabled ? (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0" />
              )}
            </button>

            {/* Account Management: Logout/Switch Account or Save Legacy Account */}
            {progress.isRegisteredAccount && onLogout ? (
              <button
                onClick={() => {
                  soundFx.playClick();
                  if (window.confirm(`Bạn có chắc muốn đăng xuất khỏi tài khoản @${progress.accountUsername}?`)) {
                    onLogout();
                  }
                }}
                className="btn-3d btn-3d-slate h-9 sm:h-10 px-2 sm:px-2.5 flex items-center justify-center gap-1.5 border-slate-700 hover:border-rose-500/50 text-slate-300 hover:text-rose-400 rounded-xl sm:rounded-2xl shadow-sm shrink-0 text-xs font-bold"
                title={`Đăng xuất khỏi @${progress.accountUsername}`}
                aria-label="Đăng xuất"
              >
                <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="hidden md:inline text-slate-400">Đổi TK</span>
              </button>
            ) : onOpenMigration ? (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenMigration();
                }}
                className="btn-3d btn-3d-amber h-9 sm:h-10 px-2.5 sm:px-3.5 flex items-center justify-center gap-1.5 rounded-xl sm:rounded-2xl shadow-[0_0_15px_rgba(251,191,36,0.5)] border-2 border-amber-300 shrink-0 text-xs sm:text-sm font-black text-slate-950 animate-pulse active:scale-95"
                title="Đặt mã PIN để bảo vệ tài khoản và chơi trên mọi thiết bị"
              >
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 shrink-0 stroke-[2.5]" />
                <span className="text-slate-950 font-black whitespace-nowrap text-xs sm:text-sm">LƯU TK</span>
              </button>
            ) : null}

            {/* Info / Landing Introduction Button */}
            {onOpenLanding && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenLanding();
                }}
                className="btn-3d btn-3d-slate h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 rounded-xl sm:rounded-2xl shadow-sm shrink-0 p-0"
                title="Giới thiệu về Vocab Pew Pew"
                aria-label="Giới thiệu về Vocab Pew Pew"
              >
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* Tier 2: Dedicated Navigation Tab Bar (Core Game Hubs) */}
        <div className="w-full pt-1 sm:pt-1.5 border-t border-slate-800/60">
          <nav
            aria-label="Điều hướng các sảnh trò chơi"
            className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 md:gap-3 w-full overflow-x-auto no-scrollbar py-0.5"
          >
            {/* Mistake Vault / Lò Rèn Từ Vựng 🔥 */}
            {onOpenMistakeVault && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenMistakeVault();
                }}
                className="btn-3d h-9 sm:h-10 relative flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-400/50 border-b-2 sm:border-b-3 border-b-orange-800 rounded-xl sm:rounded-2xl text-orange-200 font-orbitron font-black text-xs sm:text-sm transition shadow-sm hover:border-orange-300 shrink-0 whitespace-nowrap active:scale-95"
                title="Lò Rèn Từ Vựng & Phục Thù Từ Sai"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 shrink-0" />
                <span>Lò Rèn</span>
                {weakWordsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-black text-[10px] leading-tight ml-0.5 bg-orange-500 text-slate-950 animate-pulse">
                    {weakWordsCount}
                  </span>
                )}
              </button>
            )}

            {/* Typing Dojo Quick Switch ⌨️ */}
            {onOpenTypingDojo && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenTypingDojo();
                }}
                className="btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-400/50 border-b-2 sm:border-b-3 border-b-violet-800 rounded-xl sm:rounded-2xl text-violet-200 font-orbitron font-black text-xs sm:text-sm transition shadow-sm hover:border-violet-300 shrink-0 whitespace-nowrap active:scale-95"
                title="Luyện Gõ 10 Ngón (Typing Dojo)"
              >
                <Keyboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-300 shrink-0" />
                <span>Dojo</span>
              </button>
            )}

            {/* Armory Shop Button 🚀 */}
            {onOpenArmory && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenArmory();
                }}
                className="btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/50 border-b-2 sm:border-b-3 border-b-purple-800 rounded-xl sm:rounded-2xl text-purple-200 font-orbitron font-black text-xs sm:text-sm transition shadow-sm hover:border-purple-300 shrink-0 whitespace-nowrap active:scale-95"
                title="Xưởng Nâng Cấp Tàu & Vũ Khí"
              >
                <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
                <span>Xưởng</span>
              </button>
            )}

            {/* Leaderboard Button 🏆 */}
            {onOpenLeaderboard && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenLeaderboard();
                }}
                className="btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 border-b-2 sm:border-b-3 border-b-amber-800 rounded-xl sm:rounded-2xl text-amber-200 font-orbitron font-black text-xs sm:text-sm transition shadow-sm hover:border-amber-300 shrink-0 whitespace-nowrap active:scale-95"
                title="Bảng Xếp Hạng Vũ Trụ"
              >
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 animate-pulse" />
                <span>BXH</span>
              </button>
            )}

            {/* Astronaut Citizen ID Card Button 🪪 */}
            {onOpenAstronautCard && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenAstronautCard();
                }}
                className="btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 border-b-2 sm:border-b-3 border-b-cyan-800 rounded-xl sm:rounded-2xl text-cyan-200 font-orbitron font-black text-xs sm:text-sm transition shadow-sm hover:border-cyan-300 shrink-0 whitespace-nowrap active:scale-95"
                title="Thẻ Căn Cước Phi Hành Gia"
              >
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                <span>Thẻ ID</span>
              </button>
            )}

            {/* Install / Add Shortcut Button 📲 */}
            {showInstallButton && onOpenInstallModal && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenInstallModal();
                }}
                className="btn-3d h-9 sm:h-10 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 border-b-2 sm:border-b-3 border-b-emerald-800 rounded-xl sm:rounded-2xl text-emerald-200 font-orbitron font-black text-xs sm:text-sm transition shadow-sm hover:border-emerald-300 shrink-0 whitespace-nowrap active:scale-95"
                title="Đưa ứng dụng ra màn hình chính để học toàn màn hình"
              >
                <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 animate-pulse" />
                <span>Cài App</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

