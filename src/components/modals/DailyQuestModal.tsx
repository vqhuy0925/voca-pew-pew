import React from 'react';
import { X, Flame, Target, Star, Rocket, CheckCircle2, Gift, Sparkles, ArrowRight } from 'lucide-react';
import { UserProgress, DailyQuestProgress } from '../../data/progress-types';
import { soundFx } from '../../game/engine/SoundController';

interface DailyQuestModalProps {
  progress: UserProgress;
  onClaimDailyReward: () => void;
  onOpenMistakeVault?: () => void;
  onClose: () => void;
}

export const DailyQuestModal: React.FC<DailyQuestModalProps> = ({
  progress,
  onClaimDailyReward,
  onOpenMistakeVault,
  onClose
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

  const isMistakeDone = questData.mistakesReviewedCount >= 5;
  const isThreeStarDone = questData.threeStarEarnedCount >= 1;
  const isPlayDone = questData.levelsPlayedCount >= 2;

  const completedCount = (isMistakeDone ? 1 : 0) + (isThreeStarDone ? 1 : 0) + (isPlayDone ? 1 : 0);
  const isAllCompleted = completedCount === 3;
  const canClaim = isAllCompleted && !questData.claimedReward;

  const handleClaim = () => {
    soundFx.playChestOpen();
    onClaimDailyReward();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md select-none animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#13193a] to-slate-950 border-2 sm:border-3 border-amber-400/80 rounded-3xl p-4 sm:p-6 shadow-[0_0_60px_rgba(245,158,11,0.35)] text-white max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-shrink-0">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/50 rounded-full text-amber-300 text-xs font-black uppercase">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
              Chuỗi {progress.streakDays || 1} Ngày Rực Lửa 🔥
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-orbitron text-yellow-300 mt-1 tracking-wide starwars-gold-glow">
              NHIỆM VỤ HẰNG NGÀY
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700 flex-shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar overview */}
        <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 mb-4 flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-black mb-1.5">
              <span className="text-slate-300">Tiến Độ Hôm Nay</span>
              <span className="text-amber-300">{completedCount}/3 Nhiệm Vụ</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 rounded-full"
                style={{ width: `${(completedCount / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quests List */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-1 py-1">
          {/* Quest 1: Mistake Vault */}
          <div className={`p-3.5 rounded-2xl border transition ${
            isMistakeDone
              ? 'bg-emerald-950/30 border-emerald-500/50'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          } flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-game font-black text-sm text-white flex items-center gap-1.5">
                  Lò Rèn Phục Thù
                  {isMistakeDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                <div className="text-xs text-slate-300 truncate">
                  Tiêu diệt 5 từ yếu trong Lò Rèn
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-black text-amber-300 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                {Math.min(questData.mistakesReviewedCount, 5)}/5
              </span>
              {!isMistakeDone && onOpenMistakeVault && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenMistakeVault();
                  }}
                  className="p-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-xs transition cursor-pointer"
                  title="Đi đến Lò Rèn"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quest 2: 3-Star Hunter */}
          <div className={`p-3.5 rounded-2xl border transition ${
            isThreeStarDone
              ? 'bg-emerald-950/30 border-emerald-500/50'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          } flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 flex-shrink-0">
                <Star className="w-5 h-5 fill-yellow-400" />
              </div>
              <div className="min-w-0">
                <div className="font-game font-black text-sm text-white flex items-center gap-1.5">
                  Thợ Săn 3 Sao
                  {isThreeStarDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                <div className="text-xs text-slate-300 truncate">
                  Đạt 3 sao ở bất kỳ màn nào
                </div>
              </div>
            </div>

            <span className="text-xs font-black text-amber-300 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
              {Math.min(questData.threeStarEarnedCount, 1)}/1
            </span>
          </div>

          {/* Quest 3: 2 Levels Played */}
          <div className={`p-3.5 rounded-2xl border transition ${
            isPlayDone
              ? 'bg-emerald-950/30 border-emerald-500/50'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          } flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex-shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-game font-black text-sm text-white flex items-center gap-1.5">
                  Chiến Binh Không Gian
                  {isPlayDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                <div className="text-xs text-slate-300 truncate">
                  Hoàn thành 2 màn chơi bất kỳ
                </div>
              </div>
            </div>

            <span className="text-xs font-black text-amber-300 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
              {Math.min(questData.levelsPlayedCount, 2)}/2
            </span>
          </div>
        </div>

        {/* Claim / Status Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-400">
            Phần thưởng: <span className="text-cyan-300 font-bold">+20 💎</span> và <span className="text-amber-300 font-bold">+50 ⚡ XP</span>
          </div>

          {questData.claimedReward ? (
            <div className="px-5 py-2.5 bg-emerald-950/60 border border-emerald-500/60 rounded-xl text-emerald-300 font-game font-bold text-xs sm:text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ĐÃ NHẬN THƯỞNG HÔM NAY
            </div>
          ) : canClaim ? (
            <button
              onClick={handleClaim}
              className="py-2.5 px-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-game font-black text-sm rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition flex items-center gap-2 cursor-pointer animate-pulse"
            >
              <Gift className="w-4 h-4" />
              <span>NHẬN THƯỞNG NGAY</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-game font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition cursor-pointer"
            >
              TIẾP TỤC HỌC 🚀
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
