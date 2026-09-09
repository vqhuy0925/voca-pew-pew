import React from 'react';
import { UserProgress } from '../../data/progress-types';
import { Gem, Star, Rocket, Target, Flame, Sparkles, X, Check, Trophy } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../../data/theme-types';

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
  const mascot = MASCOT_CONFIGS[progress.mascotId || 'cosmo_dog'] || MASCOT_CONFIGS.cosmo_dog;

  const handleOpenArmory = () => {
    soundFx.playClick();
    onClose();
    if (onOpenArmory) {
      onOpenArmory();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg bg-gradient-to-b ${theme.bgGradient} border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-7 text-center my-4 max-h-[92vh] overflow-y-auto shadow-2xl`}
        style={{ boxShadow: `0 0 50px ${theme.glowColor}` }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Diamond Icon & Title */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 bg-cyan-500/20 rounded-full border-3 border-cyan-400 flex items-center justify-center shadow-lg animate-bounce">
          <Gem className="w-9 h-9 sm:w-11 sm:h-11 text-cyan-400 fill-cyan-400" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-orbitron text-yellow-300 tracking-wide uppercase starwars-gold-glow">
          Bí Kíp Săn Kim Cương 💎
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-4">
          Tích lũy thật nhiều kim cương để nâng cấp phi thuyền & đạn laze cực ngầu!
        </p>

        {/* Current Balance Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400/60 mb-5 shadow-inner">
          <span className="text-xs text-cyan-300 font-bold uppercase font-orbitron">Túi Đồ Hiện Tại:</span>
          <span className="text-lg font-black font-orbitron text-white flex items-center gap-1">
            <Gem className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            {progress.gems} 💎
          </span>
        </div>

        {/* Section 1: How to earn diamonds */}
        <div className="text-left space-y-2.5 mb-5">
          <div className="text-xs uppercase font-extrabold tracking-wider text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> 4 Cách Kiếm Kim Cương Siêu Dễ:
          </div>

          {/* 1. Star Rewards */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-300 flex-shrink-0 mt-0.5">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-extrabold text-white flex items-center justify-between">
                <span>1. Đạt Sao Mỗi Màn Chơi</span>
                <span className="text-yellow-300 font-orbitron font-black">+1 đến +3 💎</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                Mỗi sao ⭐ bạn đạt được đều mang về 1 💎 (kể cả khi <strong>chơi lại</strong> để ôn từ vựng!).
              </div>
            </div>
          </div>

          {/* 2. First Clear Bonus */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 flex-shrink-0 mt-0.5">
              <Rocket className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-extrabold text-white flex items-center justify-between">
                <span>2. Khám Phá Màn Mới</span>
                <span className="text-cyan-300 font-orbitron font-black">+2 đến +15 💎</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                Vượt ải lần đầu (+2 💎), diệt Boss (+8 💎), mở Rương báu (+15 💎) trên bản đồ hành tinh.
              </div>
            </div>
          </div>

          {/* 3. High Accuracy Bonus */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 flex-shrink-0 mt-0.5">
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-extrabold text-white flex items-center justify-between">
                <span>3. Xạ Thủ Chuẩn Xác (≥90%)</span>
                <span className="text-emerald-300 font-orbitron font-black">+1 💎 Thưởng</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                Bắn đúng chính xác các chữ cái và ít gõ nhầm để nhận thêm kim cương danh giá.
              </div>
            </div>
          </div>

          {/* 4. Streak Daily Bonus */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-300 flex-shrink-0 mt-0.5">
              <Flame className="w-5 h-5 fill-orange-400 text-orange-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-extrabold text-white flex items-center justify-between">
                <span>4. Chuỗi Ngày Học (Streak)</span>
                <span className="text-orange-300 font-orbitron font-black">Tới +50 💎</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                Đăng nhập học đều đặn mỗi ngày (mốc 3, 7, 14, 30 ngày) nhận rương kim cương siêu to!
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: How to spend diamonds */}
        <div className="bg-purple-950/40 border border-purple-500/40 rounded-2xl p-3.5 mb-5 text-left">
          <div className="text-xs uppercase font-extrabold tracking-wider text-purple-300 flex items-center gap-1.5 mb-2">
            <Trophy className="w-4 h-4" /> Dùng Kim Cương Để Làm Gì?
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-900/80 rounded-xl border border-purple-500/30">
              <div className="text-xl mb-1">🚀</div>
              <div className="font-bold text-white">Mua Tàu Mới</div>
              <div className="text-[10px] text-slate-400">Nhiều giáp & tốc độ</div>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-purple-500/30">
              <div className="text-xl mb-1">⚡</div>
              <div className="font-bold text-white">Đạn Laze Vip</div>
              <div className="text-[10px] text-slate-400">Bắn siêu mạnh</div>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-xl border border-purple-500/30">
              <div className="text-xl mb-1">❤️</div>
              <div className="font-bold text-white">Nạp Trái Tim</div>
              <div className="text-[10px] text-slate-400">Tiếp tục cuộc chơi</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {onOpenArmory && (
            <button
              onClick={handleOpenArmory}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-game font-extrabold text-sm sm:text-base border-b-4 border-purple-900 active:border-b-0 active:translate-y-1 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>Đến Xưởng Tàu</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-game font-extrabold text-sm sm:text-base border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Đã Hiểu! 🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
};
