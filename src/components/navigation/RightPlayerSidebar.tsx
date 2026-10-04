import React from 'react';
import { UserProgress, DailyQuestProgress } from '../../data/progress-types';
import { soundFx } from '../../game/engine/SoundController';
import { CoursePillButton } from '../common/CoursePillButton';
import {
  Flame,
  Zap,
  Gem,
  Heart,
  Trophy,
  ChevronRight,
  Gift,
  Target,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export interface RightPlayerSidebarProps {
  progress: UserProgress;
  onOpenRefillModal?: () => void;
  onOpenEnergyModal?: () => void;
  onOpenDiamondGuide?: () => void;
  onOpenDailyQuests?: () => void;
  onOpenCourseSwitcher?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenMistakeVault?: () => void;
}

export const RightPlayerSidebar: React.FC<RightPlayerSidebarProps> = ({
  progress,
  onOpenRefillModal,
  onOpenEnergyModal,
  onOpenDiamondGuide,
  onOpenDailyQuests,
  onOpenCourseSwitcher,
  onOpenLeaderboard,
  onOpenMistakeVault
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const questData: DailyQuestProgress = progress.dailyQuestProgress?.date === todayStr
    ? progress.dailyQuestProgress
    : {
        date: todayStr,
        mistakesReviewedCount: 0,
        threeStarEarnedCount: 0,
        levelsPlayedCount: 0,
        claimedReward: false
      };

  const isMistakeDone = (questData.mistakesReviewedCount || 0) >= 5;
  const isThreeStarDone = (questData.threeStarEarnedCount || 0) >= 1;
  const isPlayDone = (questData.levelsPlayedCount || 0) >= 2;
  const isTypingDone = !!questData.typingSessionCompleted;

  const totalQuestCount = 4;
  const completedCount = (isMistakeDone ? 1 : 0) + (isThreeStarDone ? 1 : 0) + (isPlayDone ? 1 : 0) + (isTypingDone ? 1 : 0);
  const questPercent = Math.round((completedCount / totalQuestCount) * 100);

  const weakWordsCount = Object.values(progress.mistakeMap || {}).filter(
    w => w.masteryStatus !== 'mastered'
  ).length;

  const handleAction = (callback?: () => void) => {
    soundFx.playClick();
    if (callback) callback();
  };

  return (
    <aside
      aria-label="Bảng tài nguyên và nhiệm vụ người chơi"
      className="hidden xl:flex flex-col w-80 2xl:w-88 h-screen sticky top-0 shrink-0 p-4 gap-4 overflow-y-auto no-scrollbar border-l border-slate-800/80 bg-slate-950/90 backdrop-blur-xl select-none z-30"
    >
      {/* 1. Top Bar: Course Selector & Core Economy Resources */}
      <div className="flex flex-col gap-2.5 pb-3 border-b border-slate-800/80">
        {/* Course Pill */}
        {onOpenCourseSwitcher && (
          <div className="w-full">
            <CoursePillButton
              progress={progress}
              activeMode="saga"
              onClick={onOpenCourseSwitcher}
              className="w-full justify-between"
            />
          </div>
        )}

        {/* Currency Resources Grid */}
        <div className="grid grid-cols-4 gap-1.5 pt-0.5">
          {/* Streak */}
          <button
            type="button"
            onClick={() => handleAction(onOpenDailyQuests)}
            className="btn-3d h-10 flex flex-col items-center justify-center p-1 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 border-b-2 border-b-amber-800 rounded-xl text-amber-300 font-orbitron font-black text-xs transition cursor-pointer"
            title="Chuỗi ngày rực lửa (Bấm để xem nhiệm vụ)"
          >
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-bounce" />
              <span>{progress.streakDays || 1}</span>
            </div>
            <span className="text-[9px] text-amber-400/80 font-mono -mt-0.5">NGÀY</span>
          </button>

          {/* Energy */}
          <button
            type="button"
            onClick={() => handleAction(onOpenEnergyModal)}
            className={`btn-3d h-10 flex flex-col items-center justify-center p-1 rounded-xl font-orbitron font-black text-xs transition border cursor-pointer ${
              progress.energy <= 15
                ? 'bg-rose-500/20 border-rose-400/60 border-b-2 border-b-rose-800 text-rose-300 animate-pulse'
                : 'bg-yellow-500/15 hover:bg-yellow-500/25 border-yellow-400/50 border-b-2 border-b-yellow-800 text-yellow-300'
            }`}
            title="Năng lượng (Bấm để nạp thêm)"
          >
            <div className="flex items-center gap-0.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>{progress.energy}</span>
            </div>
            <span className="text-[9px] text-yellow-400/80 font-mono -mt-0.5">ĐIỆN</span>
          </button>

          {/* Gems */}
          <button
            type="button"
            onClick={() => handleAction(onOpenDiamondGuide)}
            className="btn-3d h-10 flex flex-col items-center justify-center p-1 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 border-b-2 border-b-cyan-800 rounded-xl text-cyan-200 font-orbitron font-black text-xs transition cursor-pointer"
            title="Kim cương (Bấm để xem bí kíp gom kim cương)"
          >
            <div className="flex items-center gap-1">
              <Gem className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-pulse" />
              <span className="truncate max-w-[42px]">{progress.gems}</span>
            </div>
            <span className="text-[9px] text-cyan-400/80 font-mono -mt-0.5">GEMS</span>
          </button>

          {/* Hearts */}
          <button
            type="button"
            onClick={() => handleAction(onOpenRefillModal)}
            className="btn-3d h-10 flex flex-col items-center justify-center p-1 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/50 border-b-2 border-b-rose-800 rounded-xl text-rose-300 font-orbitron font-black text-xs transition cursor-pointer"
            title="Trái tim thử thách (Bấm để hồi máu)"
          >
            <div className="flex items-center gap-0.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{progress.hearts}</span>
            </div>
            <span className="text-[9px] text-rose-400/80 font-mono -mt-0.5">TIM</span>
          </button>
        </div>
      </div>

      {/* 2. Mini Card: Daily Quests (Chuẩn Duolingo Nhiệm Vụ Hằng Ngày) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/85 p-3.5 flex flex-col gap-2.5 shadow-md hover:border-slate-700 transition">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-game font-black text-sm text-amber-300">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>NHIỆM VỤ HÔM NAY</span>
          </div>
          {onOpenDailyQuests && (
            <button
              type="button"
              onClick={() => handleAction(onOpenDailyQuests)}
              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Quest Progress Bar */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-300">
            <span>Tiến độ nhiệm vụ</span>
            <span className="text-amber-300 font-orbitron">{completedCount}/{totalQuestCount}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
              style={{ width: `${questPercent}%` }}
            />
          </div>
        </div>

        {/* 2 Selected Quest Mini Items */}
        <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
          {/* Quest Item 1 */}
          <div className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/40">
            <span className="text-slate-300 truncate max-w-[170px]">Tiêu diệt 5 từ yếu Lò Rèn</span>
            {isMistakeDone ? (
              <span className="text-emerald-400 font-black flex items-center gap-0.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Xong
              </span>
            ) : (
              <span className="font-orbitron text-[10px] text-amber-300 font-bold">
                {Math.min(5, questData.mistakesReviewedCount || 0)}/5
              </span>
            )}
          </div>

          {/* Quest Item 2 */}
          <div className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/40">
            <span className="text-slate-300 truncate max-w-[170px]">Chinh phục 3 sao trong 1 màn</span>
            {isThreeStarDone ? (
              <span className="text-emerald-400 font-black flex items-center gap-0.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Xong
              </span>
            ) : (
              <span className="font-orbitron text-[10px] text-amber-300 font-bold">
                {Math.min(1, questData.threeStarEarnedCount || 0)}/1
              </span>
            )}
          </div>
        </div>

        {/* Open Quests CTA Button */}
        {onOpenDailyQuests && (
          <button
            type="button"
            onClick={() => handleAction(onOpenDailyQuests)}
            className="w-full h-8.5 rounded-xl border border-amber-400/40 hover:border-amber-300 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer mt-0.5"
          >
            <span>{completedCount === totalQuestCount && !questData.claimedReward ? 'Mở Rương Nhận Thưởng 🎁' : 'Chi Tiết Nhiệm Vụ'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 3. Mini Card: Leaderboard Rank Preview (Chuẩn Duolingo Bảng Xếp Hạng) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/85 p-3.5 flex flex-col gap-2.5 shadow-md hover:border-slate-700 transition">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-game font-black text-sm text-yellow-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>BẢNG XẾP HẠNG</span>
          </div>
          <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40">
            Giải Đồng
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Tích lũy XP từ các trận chiến từ vựng để thăng hạng lên giải đấu cao hơn!
        </p>

        {onOpenLeaderboard && (
          <button
            type="button"
            onClick={() => handleAction(onOpenLeaderboard)}
            className="w-full h-8.5 rounded-xl border border-slate-700 hover:border-cyan-400/60 bg-slate-800/80 hover:bg-slate-800 text-cyan-200 font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <span>Tới Bảng Xếp Hạng</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 4. Mini Card: Mistake Vault Alert (Lò Rèn Phục Thù) */}
      {weakWordsCount > 0 ? (
        <div className="rounded-2xl border-2 border-orange-500/50 bg-gradient-to-br from-orange-950/40 via-slate-900/90 to-slate-900 p-3.5 flex flex-col gap-2 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-400/50 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
            </div>
            <div>
              <h4 className="font-game font-black text-xs text-orange-300 uppercase tracking-wide">
                Cảnh Báo Lò Rèn
              </h4>
              <p className="text-[11px] text-slate-300">
                Có <span className="text-orange-400 font-bold">{weakWordsCount} từ yếu</span> cần phục thù
              </p>
            </div>
          </div>

          {onOpenMistakeVault && (
            <button
              type="button"
              onClick={() => handleAction(onOpenMistakeVault)}
              className="btn-3d btn-3d-amber w-full h-8.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-slate-950 font-black text-xs shadow-md mt-1 cursor-pointer"
            >
              <span>Vào Lò Rèn Ôn Tập</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <h4 className="font-game font-black text-xs text-emerald-300">
              Vũ Khí Sẵn Sàng!
            </h4>
            <p className="text-[11px] text-slate-400 truncate">
              Chưa có từ yếu nào cần phục thù
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
