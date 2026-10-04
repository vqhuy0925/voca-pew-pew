import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { soundFx } from '../../game/engine/SoundController';
import { CoursePillButton } from '../common/CoursePillButton';
import {
  Map,
  Flame,
  Keyboard,
  Rocket,
  Trophy,
  User,
  Zap,
  Gem,
  Heart,
  Volume2,
  VolumeX,
  Shield,
  Cloud,
  CloudOff,
  RefreshCw
} from 'lucide-react';
import { THEME_CONFIGS } from '../../data/theme-types';
import { SyncStatus } from '../../services/firebase/cloudSyncService';

export interface MobileNavBarProps {
  progress: UserProgress;
  syncStatus?: SyncStatus;
  activeRoute?: 'saga' | 'dojo' | string;
  onOpenSaga?: () => void;
  onOpenProfileModal?: () => void;
  onOpenCourseSwitcher?: () => void;
  onOpenEnergyModal?: () => void;
  onOpenRefillModal?: () => void;
  onOpenDiamondGuide?: () => void;
  onOpenDailyQuests?: () => void;
  onOpenMistakeVault?: () => void;
  onOpenTypingDojo?: () => void;
  onStartParagraphMode?: () => void;
  onOpenArmory?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAstronautCard?: () => void;
  onToggleSound?: () => void;
  isLight?: boolean;
  onToggleTheme?: () => void;
}

export const MobileTopBar: React.FC<MobileNavBarProps> = ({
  progress,
  syncStatus = 'offline',
  activeRoute = 'saga',
  onOpenProfileModal,
  onOpenCourseSwitcher,
  onOpenEnergyModal,
  onOpenRefillModal,
  onOpenDiamondGuide,
  onOpenDailyQuests,
  onToggleSound,
  isLight = false,
  onToggleTheme
}) => {
  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;
  const defaultFallbackName = progress.gender === 'girl' ? 'Công Chúa Nhỏ' : progress.gender === 'boy' ? 'Phi Hành Gia' : 'Nhà Thám Hiểm';
  const displayName = progress.userName?.trim() || defaultFallbackName;
  const genderBadge = progress.gender === 'girl' ? '💖' : progress.gender === 'boy' ? '⚡' : '🌟';

  const handleAction = (callback?: () => void) => {
    soundFx.playClick();
    if (callback) callback();
  };

  return (
    <header
      className={`lg:hidden sticky top-0 z-40 w-full backdrop-blur-xl border-b px-2.5 sm:px-4 py-2 select-none shadow-md transition-all ${
        isLight
          ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-slate-200/50'
          : 'bg-slate-950/95 border-slate-800/80 text-white shadow-black/50'
      }`}
      style={{
        paddingTop: 'max(0.5rem, env(safe-area-inset-top, 0px))',
        paddingLeft: 'max(0.625rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.625rem, env(safe-area-inset-right, 0px))'
      }}
    >
      <div className="flex items-center justify-between w-full gap-1.5 min-w-0">
        {/* Left: Avatar & Course Switcher */}
        <div className="flex items-center gap-1.5 shrink-0 min-w-0">
          <button
            type="button"
            onClick={() => handleAction(onOpenProfileModal)}
            className={`h-9 flex items-center gap-1.5 px-2 rounded-xl border font-game font-black text-xs transition active:scale-95 cursor-pointer shrink-0 ${
              isLight
                ? 'border-slate-300 bg-white text-slate-800 shadow-xs'
                : 'border-slate-700/80 bg-slate-900/90 text-white'
            }`}
            title="Hồ sơ người chơi"
          >
            <div className="relative flex items-center justify-center">
              <span className="text-base drop-shadow leading-none">{progress.avatar || '🚀'}</span>
              <span className="absolute -bottom-1 -right-1 text-[8px] leading-none">{genderBadge}</span>
            </div>
            <span className="truncate max-w-[65px] xs:max-w-[85px] sm:max-w-[120px] text-xs">
              {displayName}
            </span>
            {syncStatus === 'synced' && <Cloud className="w-3 h-3 text-emerald-400 shrink-0" />}
            {syncStatus === 'syncing' && <RefreshCw className="w-3 h-3 text-amber-400 animate-spin shrink-0" />}
          </button>

          {onOpenCourseSwitcher && (
            <CoursePillButton
              progress={progress}
              activeMode={activeRoute === 'dojo' ? 'dojo' : 'saga'}
              isLight={isLight}
              onClick={onOpenCourseSwitcher}
            />
          )}
        </div>

        {/* Right: Economy Pills & Utilities */}
        <div className="flex items-center gap-1 shrink-0 overflow-x-auto no-scrollbar py-0.5">
          {/* Streak */}
          <button
            type="button"
            onClick={() => handleAction(onOpenDailyQuests)}
            className={`btn-3d h-9 flex items-center justify-center gap-1 px-1.5 sm:px-2 rounded-xl font-orbitron font-black text-xs shrink-0 cursor-pointer ${
              isLight
                ? 'bg-amber-100 border border-amber-300 border-b-2 border-b-amber-400 text-amber-800'
                : 'bg-amber-500/15 border border-amber-400/40 border-b-2 border-b-amber-800 text-amber-300'
            }`}
            title="Chuỗi ngày"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-bounce shrink-0" />
            <span>{progress.streakDays || 1}</span>
          </button>

          {/* Energy */}
          <button
            type="button"
            onClick={() => handleAction(onOpenEnergyModal)}
            className={`btn-3d h-9 flex items-center justify-center gap-1 px-1.5 sm:px-2 rounded-xl font-orbitron font-black text-xs border shrink-0 cursor-pointer ${
              progress.energy <= 15
                ? 'bg-rose-500/20 border-rose-400/60 border-b-2 border-b-rose-800 text-rose-300 animate-pulse'
                : isLight
                ? 'bg-yellow-100 border-yellow-300 border-b-2 border-b-yellow-400 text-yellow-800'
                : 'bg-yellow-500/15 border-yellow-400/50 border-b-2 border-b-yellow-800 text-yellow-300'
            }`}
            title="Năng lượng"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
            <span>{progress.energy}⚡</span>
          </button>

          {/* Gems */}
          <button
            type="button"
            onClick={() => handleAction(onOpenDiamondGuide)}
            className={`btn-3d h-9 flex items-center justify-center gap-1 px-1.5 sm:px-2 rounded-xl font-orbitron font-black text-xs shrink-0 cursor-pointer ${
              isLight
                ? 'bg-cyan-100 border border-cyan-300 border-b-2 border-b-cyan-400 text-cyan-900'
                : 'bg-cyan-500/15 border border-cyan-400/50 border-b-2 border-b-cyan-800 text-cyan-200'
            }`}
            title="Kim cương"
          >
            <Gem className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-pulse shrink-0" />
            <span>{progress.gems}</span>
          </button>

          {/* Hearts */}
          <button
            type="button"
            onClick={() => handleAction(onOpenRefillModal)}
            className={`btn-3d h-9 flex items-center justify-center gap-1 px-1.5 sm:px-2 rounded-xl font-orbitron font-black text-xs shrink-0 cursor-pointer ${
              isLight
                ? 'bg-rose-100 border border-rose-300 border-b-2 border-b-rose-400 text-rose-800'
                : 'bg-rose-500/15 border border-rose-400/50 border-b-2 border-b-rose-800 text-rose-300'
            }`}
            title="Tim"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
            <span>{progress.hearts}</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className={`btn-3d h-9 w-9 flex items-center justify-center rounded-xl shrink-0 p-0 cursor-pointer ${
              isLight
                ? 'btn-3d-slate bg-white border-slate-300 text-slate-700'
                : 'btn-3d-slate bg-slate-900 border-slate-700 text-slate-300'
            }`}
            title={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-500 shrink-0" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export const MobileBottomBar: React.FC<MobileNavBarProps> = ({
  progress,
  activeRoute = 'saga',
  onOpenSaga,
  onOpenMistakeVault,
  onOpenTypingDojo,
  onOpenArmory,
  onOpenLeaderboard,
  onOpenProfileModal,
  isLight = false
}) => {
  const weakWordsCount = Object.values(progress.mistakeMap || {}).filter(
    w => w.masteryStatus !== 'mastered'
  ).length;

  const handleAction = (callback?: () => void) => {
    soundFx.playClick();
    if (callback) callback();
  };

  const isDojo = activeRoute === 'dojo';

  return (
    <nav
      aria-label="Thanh điều hướng dưới màn hình"
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t px-2 py-1.5 flex items-center justify-around select-none ${
        isLight
          ? 'bg-white/95 border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] text-slate-700'
          : 'bg-slate-950/95 border-slate-800/80 shadow-[0_-4px_25px_rgba(0,0,0,0.5)] text-slate-400'
      }`}
      style={{
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))'
      }}
    >
      {/* 1. Học / Bản đồ Vũ Trụ */}
      {isDojo ? (
        <button
          type="button"
          onClick={() => handleAction(onOpenSaga)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition active:scale-95 cursor-pointer min-w-[52px] ${
            isLight ? 'text-slate-500 hover:text-cyan-700' : 'text-slate-400 hover:text-cyan-300'
          }`}
          title="Quay lại Bản Đồ Vũ Trụ"
        >
          <Map className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-game font-black tracking-tight mt-0.5">Bản Đồ</span>
        </button>
      ) : (
        <button
          type="button"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-cyan-400 transition cursor-default min-w-[52px]"
        >
          <div className="relative">
            <Map className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
          <span className="text-[10px] font-game font-black tracking-tight mt-0.5">Bản Đồ</span>
        </button>
      )}

      {/* 2. Lò Rèn 🔥 */}
      {onOpenMistakeVault && (
        <button
          type="button"
          onClick={() => handleAction(onOpenMistakeVault)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition active:scale-95 cursor-pointer min-w-[52px] ${
            isLight ? 'text-slate-500 hover:text-orange-600' : 'text-slate-400 hover:text-orange-300'
          }`}
        >
          <div className="relative">
            <Flame className="w-5 h-5 text-orange-500 stroke-[2.5]" />
            {weakWordsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full font-black text-[9px] bg-orange-500 text-slate-950 animate-pulse">
                {weakWordsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-game font-black tracking-tight mt-0.5">Lò Rèn</span>
        </button>
      )}

      {/* 3. Typing Dojo ⌨️ */}
      {isDojo ? (
        <button
          type="button"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-violet-400 transition cursor-default min-w-[52px]"
        >
          <div className="relative">
            <Keyboard className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400" />
          </div>
          <span className="text-[10px] font-game font-black tracking-tight mt-0.5">Dojo</span>
        </button>
      ) : onOpenTypingDojo ? (
        <button
          type="button"
          onClick={() => handleAction(onOpenTypingDojo)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition active:scale-95 cursor-pointer min-w-[52px] ${
            isLight ? 'text-slate-500 hover:text-violet-600' : 'text-slate-400 hover:text-violet-300'
          }`}
        >
          <Keyboard className="w-5 h-5 text-violet-400 stroke-[2.5]" />
          <span className="text-[10px] font-game font-black tracking-tight mt-0.5">Dojo</span>
        </button>
      ) : null}

      {/* 4. Xưởng Tàu 🛸 */}
      {onOpenArmory && (
        <button
          type="button"
          onClick={() => handleAction(onOpenArmory)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition active:scale-95 cursor-pointer min-w-[52px] ${
            isLight ? 'text-slate-500 hover:text-purple-600' : 'text-slate-400 hover:text-purple-300'
          }`}
        >
          <Rocket className="w-5 h-5 text-purple-400 stroke-[2.5]" />
          <span className="text-[10px] font-game font-black tracking-tight mt-0.5">Xưởng</span>
        </button>
      )}

      {/* 5. Bảng Xếp Hạng 🏆 */}
      {onOpenLeaderboard && (
        <button
          type="button"
          onClick={() => handleAction(onOpenLeaderboard)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition active:scale-95 cursor-pointer min-w-[52px] ${
            isLight ? 'text-slate-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-300'
          }`}
        >
          <Trophy className="w-5 h-5 text-amber-400 stroke-[2.5]" />
          <span className="text-[10px] font-game font-black tracking-tight mt-0.5">BXH</span>
        </button>
      )}

      {/* 6. Hồ Sơ ⚙️ */}
      {onOpenProfileModal && (
        <button
          type="button"
          onClick={() => handleAction(onOpenProfileModal)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition active:scale-95 cursor-pointer min-w-[52px] ${
            isLight ? 'text-slate-500 hover:text-emerald-600' : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          <User className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
          <span className="text-[10px] font-game font-black tracking-tight mt-0.5">Hồ Sơ</span>
        </button>
      )}
    </nav>
  );
};
