import React, { useMemo } from 'react';
import { UserProgress, DailyQuestProgress } from '../../data/progress-types';
import { soundFx } from '../../game/engine/SoundController';
import { CoursePillButton } from '../common/CoursePillButton';
import { TYPING_LESSONS } from '../../data/typing-curriculum';
import {
  Flame,
  Zap,
  Gem,
  Heart,
  ChevronRight,
  Gift,
  Target,
  ArrowRight,
  CheckCircle2,
  Keyboard,
  BookOpen
} from 'lucide-react';

export interface RightPlayerSidebarProps {
  progress: UserProgress;
  activeMode?: 'saga' | 'dojo';
  onStartParagraphMode?: () => void;
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
  activeMode = 'saga',
  onStartParagraphMode,
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

  const dojoCompletedCount = useMemo(() => {
    const map = progress.typingProgress?.lessonProgressMap || {};
    return TYPING_LESSONS.filter(l => map[l.id]?.isCompleted).length;
  }, [progress.typingProgress?.lessonProgressMap]);

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
              activeMode={activeMode}
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

      {/* 2. Contextual Focus Card (Saga Mode: Clean Daily Quests | Dojo Mode: Cyber Telemetry) */}
      {activeMode === 'saga' ? (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 flex flex-col gap-3 shadow-sm hover:border-slate-700/80 transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-game font-black text-sm text-amber-300">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>NHIỆM VỤ HÔM NAY</span>
            </div>
            <span className="text-[10px] font-orbitron font-black text-amber-300/90 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30">
              {completedCount}/{totalQuestCount}
            </span>
          </div>

          {/* Quest Progress Bar */}
          <div className="flex flex-col gap-1.5">
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500"
                style={{ width: `${questPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Quest Checklist */}
          <div className="space-y-2 pt-1 text-xs">
            {/* Quest Item 1 */}
            <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-slate-950/40 border border-slate-800/30">
              <span className="text-slate-300 truncate max-w-[180px]">Tiêu diệt 5 từ yếu Lò Rèn</span>
              {isMistakeDone ? (
                <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Xong
                </span>
              ) : (
                <span className="font-orbitron text-[10px] text-amber-300 font-bold">
                  {Math.min(5, questData.mistakesReviewedCount || 0)}/5
                </span>
              )}
            </div>

            {/* Quest Item 2 */}
            <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-slate-950/40 border border-slate-800/30">
              <span className="text-slate-300 truncate max-w-[180px]">Chinh phục 3 sao trong 1 màn</span>
              {isThreeStarDone ? (
                <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[11px]">
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
              className="w-full h-8.5 rounded-xl border border-amber-400/30 hover:border-amber-300/60 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer mt-1"
            >
              <span>{completedCount === totalQuestCount && !questData.claimedReward ? 'Mở Rương Nhận Thưởng 🎁' : 'Chi Tiết Nhiệm Vụ'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        /* Dojo Mode: Cyber Dojo Mastery & Weak Keys */
        <div className="rounded-2xl border border-violet-500/30 bg-slate-900/60 p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-game font-black text-sm text-violet-300">
              <Keyboard className="w-4 h-4 text-violet-400" />
              <span>TIẾN ĐỘ VÕ ĐƯỜNG</span>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30">
              10 Ngón
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-semibold text-slate-300">
              <span>Đã hoàn thành</span>
              <span className="text-violet-300 font-orbitron">{dojoCompletedCount}/{TYPING_LESSONS.length} bài</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((dojoCompletedCount / TYPING_LESSONS.length) * 100)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/60 text-xs">
            <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/40 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">TỐC ĐỘ CAO NHẤT</span>
              <span className="font-orbitron font-black text-sm text-cyan-300">
                {progress.typingProgress?.bestWpmOverall || 0} <span className="text-[10px] font-normal">WPM</span>
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/40 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">CẤP ĐỘ ĐAI</span>
              <span className="font-game font-black text-xs text-amber-300">
                {dojoCompletedCount >= 50 ? 'Đai Đen 🥋' : dojoCompletedCount >= 40 ? 'Đai Đỏ' : dojoCompletedCount >= 30 ? 'Đai Lam' : dojoCompletedCount >= 20 ? 'Đai Lục' : dojoCompletedCount >= 10 ? 'Đai Vàng' : 'Đai Trắng'}
              </span>
            </div>
          </div>

          {/* Weak Keys Heatmap — Hiển thị các phím gõ sai nhiều nhất */}
          {(() => {
            const keyMistakes = Object.entries(progress.typingProgress?.keyMistakeMap || {})
              .filter(([_, count]) => count > 0)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5);

            if (keyMistakes.length > 0) {
              return (
                <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1 text-rose-400">
                      <Target className="w-3 h-3" />
                      PHÍM CẦN LUYỆN THÊM
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">LỖI</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {keyMistakes.map(([key, count]) => (
                      <span
                        key={key}
                        className="px-2 py-0.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 font-mono font-black text-xs flex items-center gap-1"
                      >
                        <span className="uppercase">{key === ' ' ? '␣' : key}</span>
                        <span className="text-[9px] text-rose-400/80 font-bold">×{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div className="pt-1.5 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Độ chính xác rất tốt!</span>
              </div>
            );
          })()}

          {onStartParagraphMode && (
            <button
              type="button"
              onClick={() => handleAction(onStartParagraphMode)}
              className="w-full h-8.5 rounded-xl border border-violet-400/30 hover:border-violet-300/60 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer mt-0.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chế Độ Đoạn Văn Tự Do</span>
              <ChevronRight className="w-3.5 h-3.5 ml-auto" />
            </button>
          )}
        </div>
      )}
    </aside>
  );
};
