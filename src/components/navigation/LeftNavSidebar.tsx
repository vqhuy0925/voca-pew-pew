import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { soundFx } from '../../game/engine/SoundController';
import { THEME_CONFIGS } from '../../data/theme-types';
import {
  Map,
  Flame,
  Keyboard,
  Rocket,
  Trophy,
  Shield,
  User,
  Volume2,
  VolumeX,
  LogOut,
  Smartphone,
  HelpCircle,
  Sparkles,
  BookOpen,
  Sun,
  Moon
} from 'lucide-react';

export interface LeftNavSidebarProps {
  progress: UserProgress;
  activeRoute?: 'saga' | 'dojo' | string;
  onOpenSaga?: () => void;
  onOpenProfileModal?: () => void;
  onOpenArmory?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAstronautCard?: () => void;
  onOpenMistakeVault?: () => void;
  onOpenTypingDojo?: () => void;
  onStartParagraphMode?: () => void;
  onOpenInstallModal?: () => void;
  onOpenLanding?: () => void;
  onLogout?: () => void;
  onOpenMigration?: () => void;
  onToggleSound: () => void;
  showInstallButton?: boolean;
  isLight?: boolean;
  onToggleTheme?: () => void;
}

export const LeftNavSidebar: React.FC<LeftNavSidebarProps> = ({
  progress,
  activeRoute = 'saga',
  onOpenSaga,
  onOpenProfileModal,
  onOpenArmory,
  onOpenLeaderboard,
  onOpenAstronautCard,
  onOpenMistakeVault,
  onOpenTypingDojo,
  onStartParagraphMode,
  onOpenInstallModal,
  onOpenLanding,
  onLogout,
  onOpenMigration,
  onToggleSound,
  showInstallButton = true,
  isLight = false,
  onToggleTheme
}) => {
  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;
  const weakWordsCount = Object.values(progress.mistakeMap || {}).filter(
    w => w.masteryStatus !== 'mastered'
  ).length;

  const handleNavClick = (callback?: () => void) => {
    soundFx.playClick();
    if (callback) callback();
  };

  return (
    <aside
      aria-label="Thanh điều hướng chính"
      className="hidden lg:flex flex-col w-64 2xl:w-72 h-screen sticky top-0 shrink-0 border-r border-slate-800/80 bg-slate-950/95 backdrop-blur-xl select-none z-30 justify-between p-4"
    >
      {/* Top Section: Brand Logo & Navigation Links */}
      <div className="flex flex-col gap-6">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-2.5 px-3 py-2 cursor-pointer group" onClick={() => handleNavClick(onOpenLanding)}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] border-2 border-cyan-300 group-hover:scale-105 transition-transform">
            <span className="text-xl">🚀</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-orbitron font-black text-lg tracking-wider bg-gradient-to-r from-cyan-300 via-blue-200 to-yellow-300 bg-clip-text text-transparent drop-shadow-sm">
              VOCAB PEW
            </h1>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase -mt-0.5">
              Arcade Universe
            </span>
          </div>
        </div>

        {/* Navigation Menu (Starfleet Academy Hierarchy) */}
        <nav className="flex flex-col gap-5" aria-label="Menu các phân khu học viện">
          {/* SECTION 1: KHOA HUẤN LUYỆN (ACADEMY FACULTIES) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-3 mb-1">
              <span className="text-[10px] font-orbitron font-black uppercase tracking-wider text-slate-400">
                KHOA HUẤN LUYỆN
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                ACADEMY
              </span>
            </div>

            {/* 1. Khoa Xạ Thủ Từ Vựng (Vocabulary Pew Pew) */}
            {activeRoute === 'saga' ? (
              <button
                type="button"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400/80 text-cyan-200 font-game font-black text-sm tracking-wide shadow-[0_4px_15px_rgba(6,182,212,0.25)] transition-all cursor-default"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shrink-0">
                  <Map className="w-4 h-4 text-cyan-300 stroke-[2.5]" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-white text-xs font-black truncate">XẠ THỦ TỪ VỰNG</span>
                  <span className="text-[10px] text-cyan-300 font-semibold truncate">Cõi Thiên Hà · CEFR</span>
                </div>
                <span className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-ping" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNavClick(onOpenSaga)}
                className="group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border-2 border-transparent hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-200 font-game font-black text-sm tracking-wide transition-all active:scale-95 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-cyan-400/50 flex items-center justify-center shrink-0 transition-colors">
                  <Map className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform stroke-[2.5]" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs font-black truncate group-hover:text-white transition-colors">XẠ THỦ TỪ VỰNG</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-cyan-300 font-semibold truncate transition-colors">Cõi Thiên Hà · CEFR</span>
                </div>
                <span className="ml-auto text-[9px] font-bold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-400/40 shrink-0">
                  TIẾNG ANH
                </span>
              </button>
            )}

            {/* 2. Khoa Võ Đường Cyber (Typing Dojo) */}
            {activeRoute === 'dojo' ? (
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-violet-600/25 border-2 border-violet-400/90 text-violet-200 font-game font-black text-sm tracking-wide shadow-[0_4px_15px_rgba(139,92,246,0.35)] transition-all cursor-default"
                >
                  <div className="w-8 h-8 rounded-xl bg-violet-500/25 border border-violet-400/60 flex items-center justify-center shrink-0">
                    <Keyboard className="w-4 h-4 text-violet-200 stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-white text-xs font-black truncate">VÕ ĐƯỜNG 10 NGÓN</span>
                    <span className="text-[10px] text-violet-300 font-semibold truncate">Cyber Dojo · 6 Cấp Đai</span>
                  </div>
                  <span className="ml-auto w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)] animate-ping" />
                </button>

                {/* Nút Luyện Đoạn Văn Speed (Khi ở trong Dojo) */}
                {onStartParagraphMode && (
                  <button
                    type="button"
                    onClick={() => handleNavClick(onStartParagraphMode)}
                    className="group flex items-center gap-2.5 px-3 py-1.5 ml-4 rounded-xl border border-violet-500/30 hover:border-violet-400/70 bg-violet-950/40 hover:bg-violet-900/50 text-violet-200 font-game font-black text-[11px] tracking-wide transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-violet-300 group-hover:scale-110 transition-transform shrink-0" />
                    <span>Luyện Đoạn Văn Speed</span>
                    <span className="ml-auto text-[9px] font-bold text-amber-300 bg-amber-500/20 px-1 py-0.2 rounded border border-amber-400/40">
                      THỬ THÁCH
                    </span>
                  </button>
                )}
              </div>
            ) : onOpenTypingDojo ? (
              <button
                type="button"
                onClick={() => handleNavClick(onOpenTypingDojo)}
                className="group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border-2 border-transparent hover:border-violet-500/50 hover:bg-violet-500/10 text-slate-300 hover:text-violet-200 font-game font-black text-sm tracking-wide transition-all active:scale-95 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-violet-400/50 flex items-center justify-center shrink-0 transition-colors">
                  <Keyboard className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform stroke-[2.5]" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs font-black truncate group-hover:text-white transition-colors">VÕ ĐƯỜNG 10 NGÓN</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-violet-300 font-semibold truncate transition-colors">Cyber Dojo · 6 Cấp Đai</span>
                </div>
                <span className="ml-auto text-[9px] font-bold text-violet-300 bg-violet-500/20 px-1.5 py-0.5 rounded border border-violet-400/40 shrink-0">
                  10 NGÓN
                </span>
              </button>
            ) : null}

            {/* 3. Khoa Phonics Lab (Sắp ra mắt / Coming Soon) */}
            <div
              className="flex items-center gap-3 px-3.5 py-2 rounded-2xl border border-dashed border-slate-800 text-slate-600 cursor-not-allowed select-none opacity-60"
              title="Khoa Thí Nghiệm m Thanh & Phonics (Đang hoàn thiện)"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-xs font-bold truncate">PHONICS LAB</span>
                <span className="text-[9px] text-slate-600 truncate">m Chuẩn · Ghép Vần</span>
              </div>
              <span className="ml-auto text-[9px] font-mono text-slate-600 shrink-0">
                SẮP RA MẮT
              </span>
            </div>
          </div>

          {/* SECTION 2: KHÔNG GIAN HỌC VIÊN (CADET HUB) */}
          <div className="flex flex-col gap-1">
            <div className="px-3 mb-1">
              <span className="text-[10px] font-orbitron font-black uppercase tracking-wider text-slate-400">
                KHÔNG GIAN HỌC VIÊN
              </span>
            </div>

            {/* Lò Rèn Phục Thù 🔥 */}
            {onOpenMistakeVault && (
              <button
                type="button"
                onClick={() => handleNavClick(onOpenMistakeVault)}
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl border border-transparent hover:border-orange-500/40 hover:bg-orange-500/10 text-slate-300 hover:text-orange-200 font-game font-black text-xs tracking-wide transition-all active:scale-95 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform shrink-0 stroke-[2.5]" />
                <span className="truncate">Lò Rèn Phục Thù</span>
                {weakWordsCount > 0 && (
                  <span className="ml-auto px-1.5 py-0.2 rounded-full font-orbitron font-black text-[10px] bg-orange-500 text-slate-950 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse shrink-0">
                    {weakWordsCount}
                  </span>
                )}
              </button>
            )}

            {/* Xưởng Nâng Cấp Tàu 🛸 */}
            {onOpenArmory && (
              <button
                type="button"
                onClick={() => handleNavClick(onOpenArmory)}
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl border border-transparent hover:border-purple-500/40 hover:bg-purple-500/10 text-slate-300 hover:text-purple-200 font-game font-black text-xs tracking-wide transition-all active:scale-95 cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform shrink-0 stroke-[2.5]" />
                <span className="truncate">Xưởng Tàu Chiến</span>
              </button>
            )}

            {/* Bảng Xếp Hạng 🏆 */}
            {onOpenLeaderboard && (
              <button
                type="button"
                onClick={() => handleNavClick(onOpenLeaderboard)}
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl border border-transparent hover:border-amber-500/40 hover:bg-amber-500/10 text-slate-300 hover:text-amber-200 font-game font-black text-xs tracking-wide transition-all active:scale-95 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0 stroke-[2.5]" />
                <span className="truncate">Bảng Vinh Danh</span>
              </button>
            )}

            {/* Thẻ Căn Cước Phi Hành Gia 🪪 */}
            {onOpenAstronautCard && (
              <button
                type="button"
                onClick={() => handleNavClick(onOpenAstronautCard)}
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl border border-transparent hover:border-cyan-500/40 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-200 font-game font-black text-xs tracking-wide transition-all active:scale-95 cursor-pointer"
              >
                <Shield className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0 stroke-[2.5]" />
                <span className="truncate">Thẻ Căn Cước ID</span>
              </button>
            )}

            {/* Hồ Sơ & Nhân Vật ⚙️ */}
            {onOpenProfileModal && (
              <button
                type="button"
                onClick={() => handleNavClick(onOpenProfileModal)}
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl border border-transparent hover:border-emerald-500/40 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-200 font-game font-black text-xs tracking-wide transition-all active:scale-95 cursor-pointer"
              >
                <User className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0 stroke-[2.5]" />
                <span className="truncate">Hồ Sơ Của Bạn</span>
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Bottom Section: Utility Controls */}
      <div className="flex flex-col gap-2 pt-4 border-t border-slate-800/80">
        {/* Unregistered Alert Banner Button if no cloud PIN */}
        {!progress.isRegisteredAccount && onOpenMigration && (
          <button
            type="button"
            onClick={() => handleNavClick(onOpenMigration)}
            className="btn-3d btn-3d-amber w-full h-11 px-3 rounded-2xl flex items-center justify-center gap-2 text-slate-950 font-black text-xs tracking-wide shadow-[0_0_15px_rgba(251,191,36,0.5)] border-2 border-amber-300 animate-pulse active:scale-95 cursor-pointer"
          >
            <Shield className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>LƯU MÃ PIN BẢO VỆ</span>
          </button>
        )}

        {/* Audio Toggle & App Install Row */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSound}
            className="flex-1 h-10 px-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-bold transition active:scale-95"
            title={progress.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {progress.soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Âm Thanh: Bật</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Âm Thanh: Tắt</span>
              </>
            )}
          </button>

          {/* Theme Toggle Button (Light/Dark) */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={() => handleNavClick(onToggleTheme)}
              className="h-10 w-10 rounded-xl border border-slate-800 hover:border-amber-400/50 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 flex items-center justify-center transition active:scale-95 shrink-0"
              title={isLight ? 'Chuyển sang Chế độ Tối' : 'Chuyển sang Chế độ Sáng'}
              aria-label="Đổi giao diện Sáng / Tối"
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          )}

          {/* Landing Guide / Help */}
          {onOpenLanding && (
            <button
              type="button"
              onClick={() => handleNavClick(onOpenLanding)}
              className="h-10 w-10 rounded-xl border border-slate-800 hover:border-cyan-500/50 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition active:scale-95 shrink-0"
              title="Bí kíp & Giới thiệu Vocab Pew Pew"
              aria-label="Trợ giúp"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
            </button>
          )}
        </div>

        {/* Install PWA Button if available */}
        {showInstallButton && onOpenInstallModal && (
          <button
            type="button"
            onClick={() => handleNavClick(onOpenInstallModal)}
            className="w-full h-10 px-3 rounded-xl border border-emerald-500/40 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 flex items-center justify-center gap-2 text-xs font-bold transition active:scale-95"
          >
            <Smartphone className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
            <span>Cài Ứng Dụng Ra Màn Hình</span>
          </button>
        )}

        {/* Account Switcher if registered */}
        {progress.isRegisteredAccount && onLogout && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Bạn có chắc muốn đăng xuất khỏi tài khoản @${progress.accountUsername}?`)) {
                handleNavClick(onLogout);
              }
            }}
            className="w-full h-9 px-3 rounded-xl border border-slate-800/60 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 flex items-center justify-center gap-1.5 text-xs font-medium transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đổi Tài Khoản (@{progress.accountUsername})</span>
          </button>
        )}
      </div>
    </aside>
  );
};
