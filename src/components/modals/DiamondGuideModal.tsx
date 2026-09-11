import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { Gem, Star, Rocket, Target, Flame, Sparkles, X, Check, Trophy } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { THEME_CONFIGS } from '../../data/theme-types';
import { MascotWidget } from '../mascot/MascotWidget';

interface DiamondGuideModalProps {
  progress: UserProgress;
  onClose: () => void;
  onOpenArmory?: () => void;
}

export const DiamondGuideModal: React.FC<DiamondGuideModalProps> = ({
  progress,
  onClose,
  onOpenArmory
}) => {
  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;

  const handleOpenArmory = () => {
    soundFx.playClick();
    onClose();
    if (onOpenArmory) {
      onOpenArmory();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl bg-gradient-to-b ${theme.bgGradient} border-2 sm:border-3 ${theme.borderAccent} rounded-3xl p-3.5 sm:p-5 text-white max-h-[92vh] flex flex-col overflow-hidden shadow-2xl`}
        style={{ boxShadow: `0 0 50px ${theme.glowColor}` }}
      >
        {/* Header: Left Title & Right Diamond Balance + Close */}
        <div className="flex items-center justify-between gap-2.5 mb-2.5 flex-shrink-0">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-[11px] sm:text-xs font-extrabold uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Hướng Dẫn Tích Lũy
            </div>
            <h2 className="text-lg sm:text-2xl font-black font-orbitron text-yellow-300 mt-0.5 tracking-wide starwars-gold-glow truncate">
              BÍ KÍP SĂN KIM CƯƠNG 💎
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Current Balance Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border-2 border-cyan-400/80 rounded-xl sm:rounded-2xl shadow-[0_0_12px_rgba(0,240,255,0.25)]">
              <Gem className="w-4 h-4 text-cyan-400 fill-cyan-400 animate-bounce" />
              <div className="text-right leading-tight">
                <div className="text-[9px] text-cyan-300 font-bold uppercase font-orbitron">Túi Đồ</div>
                <div className="text-sm sm:text-base font-extrabold font-orbitron text-white">{progress.gems} 💎</div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700 flex-shrink-0"
              title="Đóng"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
          {/* Section 1: How to earn diamonds */}
          <div className="space-y-2">
            <div className="text-xs uppercase font-extrabold tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 4 Cách Kiếm Kim Cương Siêu Nhanh:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* 1. Star Rewards */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-300 flex-shrink-0 mt-0.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-extrabold text-white flex items-center justify-between">
                    <span>1. Đạt Sao Mỗi Màn</span>
                    <span className="text-yellow-300 font-orbitron font-black text-xs">+1 đến +3 💎</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    Mỗi sao ⭐ đạt được đều thưởng 1 💎 (kể cả khi <strong>chơi lại</strong> để ôn từ!).
                  </div>
                </div>
              </div>

              {/* 2. First Clear Bonus */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 flex-shrink-0 mt-0.5">
                  <Rocket className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-extrabold text-white flex items-center justify-between">
                    <span>2. Khám Phá Màn Mới</span>
                    <span className="text-cyan-300 font-orbitron font-black text-xs">+2 đến +15 💎</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    Vượt ải lần đầu (+2 💎), Boss (+8 💎), mở Rương báu (+15 💎) trên bản đồ.
                  </div>
                </div>
              </div>

              {/* 3. High Accuracy Bonus */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-extrabold text-white flex items-center justify-between">
                    <span>3. Xạ Thủ Chuẩn Xác (≥90%)</span>
                    <span className="text-emerald-300 font-orbitron font-black text-xs">+1 💎 Thưởng</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    Bắn đúng chữ cái liên tục và ít gõ nhầm để nhận thêm kim cương danh giá.
                  </div>
                </div>
              </div>

              {/* 4. Streak Daily Bonus */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-orange-500/20 text-orange-300 flex-shrink-0 mt-0.5">
                  <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-extrabold text-white flex items-center justify-between">
                    <span>4. Chuỗi Ngày Học (Streak)</span>
                    <span className="text-orange-300 font-orbitron font-black text-xs">Tới +50 💎</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    Đăng nhập học đều đặn mỗi ngày (mốc 3, 7, 14, 30 ngày) nhận rương thưởng lớn!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: How to spend diamonds */}
          <div className="bg-purple-950/40 border border-purple-500/40 rounded-2xl p-2.5 sm:p-3 text-left">
            <div className="text-xs uppercase font-extrabold tracking-wider text-purple-300 flex items-center gap-1.5 mb-2">
              <Trophy className="w-3.5 h-3.5" /> Dùng Kim Cương Để Làm Gì?
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-900/80 rounded-xl border border-purple-500/30">
                <div className="text-lg mb-0.5">🚀</div>
                <div className="font-bold text-white text-xs">Mua Tàu Mới</div>
                <div className="text-[10px] text-slate-400">Nhiều giáp & tốc độ</div>
              </div>
              <div className="p-2 bg-slate-900/80 rounded-xl border border-purple-500/30">
                <div className="text-lg mb-0.5">⚡</div>
                <div className="font-bold text-white text-xs">Đạn Laze Vip</div>
                <div className="text-[10px] text-slate-400">Bắn siêu mạnh</div>
              </div>
              <div className="p-2 bg-slate-900/80 rounded-xl border border-purple-500/30">
                <div className="text-lg mb-0.5">❤️</div>
                <div className="font-bold text-white text-xs">Nạp Trái Tim</div>
                <div className="text-[10px] text-slate-400">Tiếp tục cuộc chơi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar with Mascot & Actions */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2.5 flex-shrink-0">
          <div className="min-w-0 flex-1 overflow-hidden">
            <MascotWidget
              mascotId={progress.mascotId}
              mood="happy"
              userAge={progress.userAge}
              gender={progress.gender}
              userName={progress.userName}
              customMessage="Cứ mỗi màn ôn lại đạt 3 sao là có thêm 3 kim cương, tha hồ mở khoá tàu thần thoại nhé! 🚀💎"
            />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {onOpenArmory && (
              <button
                onClick={handleOpenArmory}
                className="py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-game font-extrabold text-xs sm:text-sm border-b-4 border-purple-900 active:border-b-0 active:translate-y-1 transition shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Đến Xưởng Tàu</span>
              </button>
            )}

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-xs sm:text-sm border-b-4 border-emerald-600 active:border-b-0 active:translate-y-1 transition shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Đã Hiểu! 🎮</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
