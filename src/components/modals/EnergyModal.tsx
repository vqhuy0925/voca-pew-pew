import React, { useState, useEffect } from 'react';
import { UserProgress, DailyEnergyMode } from '../../data/progress-types';
import {
  DAILY_ENERGY_CAPS,
  refillEnergyWithGems,
  refillEnergyFromReview,
  updateDailyEnergyMode
} from '../../services/progressStorage';
import {
  Zap,
  BatteryCharging,
  Clock,
  Sparkles,
  Gem,
  X,
  Check,
  BookOpen,
  Volume2,
  Coffee,
  Shield
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { THEME_CONFIGS } from '../../data/theme-types';

interface EnergyModalProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onClose: () => void;
}

// Flashcard review sample pool for gentle re-energizing
const REVIEW_WORD_POOL = [
  { word: 'Star', meaningVi: 'Ngôi sao', phonics: '/stɑːr/', emoji: '⭐' },
  { word: 'Planet', meaningVi: 'Hành tinh', phonics: '/ˈplænɪt/', emoji: '🪐' },
  { word: 'Rocket', meaningVi: 'Tên lửa phi thuyền', phonics: '/ˈrɒkɪt/', emoji: '🚀' },
  { word: 'Galaxy', meaningVi: 'Dải thiên hà', phonics: '/ˈɡæləksi/', emoji: '🌌' },
  { word: 'Energy', meaningVi: 'Năng lượng', phonics: '/ˈenədʒi/', emoji: '⚡' },
  { word: 'Shield', meaningVi: 'Lá chắn bảo vệ', phonics: '/ʃiːld/', emoji: '🛡️' },
  { word: 'Victory', meaningVi: 'Chiến thắng', phonics: '/ˈvɪktəri/', emoji: '🏆' },
  { word: 'Universe', meaningVi: 'Vũ trụ bao la', phonics: '/ˈjuːnɪvɜːs/', emoji: '🛸' }
];

export const EnergyModal: React.FC<EnergyModalProps> = ({
  progress,
  onUpdateProgress,
  onClose
}) => {
  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;
  const [activeTab, setActiveTab] = useState<'status' | 'review' | 'settings'>('status');

  // Review flashcards state
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [reviewedCount, setReviewedCount] = useState<number>(0);
  const [reviewCompleted, setReviewCompleted] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Time until midnight countdown
  const [timeToMidnight, setTimeToMidnight] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diffMs = midnight.getTime() - now.getTime();

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeToMidnight(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const energyPercent = Math.min(
    100,
    Math.round((progress.energy / (progress.maxEnergy || 100)) * 100)
  );

  // Flashcard audio pronunciation
  const handleSpeakCurrentReview = () => {
    const item = REVIEW_WORD_POOL[reviewIndex % REVIEW_WORD_POOL.length];
    soundFx.playClick();
    setIsPlayingAudio(true);
    speechHelper.speak(item.word, true);
    setTimeout(() => setIsPlayingAudio(false), 1500);
  };

  // User confirmed word recall in review
  const handleNextReviewCard = () => {
    soundFx.playHit();
    const newCount = reviewedCount + 1;
    setReviewedCount(newCount);

    if (newCount >= 3) {
      // Award +15 energy!
      soundFx.playEnergyCharge();
      onUpdateProgress(prev => refillEnergyFromReview(prev, 15));
      setReviewCompleted(true);
    } else {
      setReviewIndex(prev => prev + 1);
    }
  };

  // Gem Refill Options
  const handleRefillPartial = () => {
    if (progress.gems < 10) {
      soundFx.playWrong();
      return;
    }
    soundFx.playEnergyCharge();
    onUpdateProgress(prev => refillEnergyWithGems(prev, 10, 35));
  };

  const handleRefillFull = () => {
    if (progress.gems < 20) {
      soundFx.playWrong();
      return;
    }
    soundFx.playEnergyCharge();
    onUpdateProgress(prev => refillEnergyWithGems(prev, 20, prev.maxEnergy));
  };

  const handleSelectPlan = (mode: DailyEnergyMode) => {
    soundFx.playClick();
    onUpdateProgress(prev => updateDailyEnergyMode(prev, mode));
  };

  const currentReviewWord = REVIEW_WORD_POOL[reviewIndex % REVIEW_WORD_POOL.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg bg-gradient-to-b ${theme.bgGradient} border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-7 text-center my-4 max-h-[94vh] overflow-y-auto shadow-2xl`}
        style={{ boxShadow: `0 0 45px ${theme.glowColor}` }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer z-20 border border-slate-700 shadow"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Icon */}
        <div className="w-16 h-16 mx-auto mb-3 bg-yellow-500/20 rounded-2xl border-2 border-yellow-400/80 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)]">
          <Zap className="w-9 h-9 text-yellow-300 fill-yellow-400 animate-pulse" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-game text-white tracking-wide">
          TRẠM NĂNG LƯỢNG ⚡
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
          Cân bằng học tập lành mạnh giúp bảo vệ mắt và ghi nhớ từ vựng lâu hơn!
        </p>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 mt-4 mb-5">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('status');
            }}
            className={`py-2 px-2 rounded-xl font-game font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'status'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BatteryCharging className="w-4 h-4" />
            <span>Năng Lượng</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('review');
            }}
            className={`py-2 px-2 rounded-xl font-game font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'review'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Ôn Tập +⚡</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('settings');
            }}
            className={`py-2 px-2 rounded-xl font-game font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Mục Tiêu</span>
          </button>
        </div>

        {/* TAB 1: STATUS & RECHARGE */}
        {activeTab === 'status' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Battery Reactor Card */}
            <div className="p-4 rounded-3xl bg-slate-950/90 border border-slate-800 text-left space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Bình Năng Lượng Phi Thuyền:
                </span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400/40">
                  {`${progress.energy} / ${progress.maxEnergy} ⚡ (${energyPercent}%)`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-5 bg-slate-900 rounded-full border border-slate-700 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    energyPercent > 50
                      ? 'bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-400 shadow-[0_0_12px_rgba(250,204,21,0.5)]'
                      : energyPercent > 20
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'bg-gradient-to-r from-rose-500 to-red-600 animate-pulse'
                  }`}
                  style={{ width: `${energyPercent}%` }}
                />
              </div>

              {/* Midnight Auto Reset Timer */}
              <div className="flex items-center justify-between pt-1 text-xs text-slate-300 border-t border-slate-900">
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <Clock className="w-4 h-4" />
                  <span>Tự động nạp đầy lúc 00:00:</span>
                </div>
                <span className="font-mono font-bold text-yellow-300 text-sm bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                  {timeToMidnight}
                </span>
              </div>
            </div>

            {/* Rest Advice Widget */}
            <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center gap-3 text-left">
              <span className="text-3xl">🥤</span>
              <div className="text-xs sm:text-sm text-slate-200">
                {progress.energy <= 10 ? (
                  <span>
                    <strong className="text-rose-400">Năng lượng sắp cạn!</strong> Hãy thư giãn mắt 15 phút, vươn vai hoặc làm vài câu ôn tập nhẹ nhàng bên dưới nhé!
                  </span>
                ) : (
                  <span>
                    Bạn đang học rất tốt! Mỗi bài học tiêu hao <strong>10⚡</strong> (Trùm cuối: <strong>15⚡</strong>).
                  </span>
                )}
              </div>
            </div>

            {/* Instant Gem Boosters */}
            <div className="space-y-2 pt-1 text-left">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Nạp Nhanh Bằng Kim Cương 💎:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* 10 Gems for 35 Energy */}
                <button
                  type="button"
                  onClick={handleRefillPartial}
                  disabled={progress.gems < 10 || progress.energy >= progress.maxEnergy}
                  className={`p-3 rounded-2xl border flex items-center justify-between transition ${
                    progress.gems >= 10 && progress.energy < progress.maxEnergy
                      ? 'bg-yellow-500/15 border-yellow-400/50 hover:bg-yellow-500/25 active:scale-95 cursor-pointer text-white shadow-sm'
                      : 'bg-slate-900/40 border-slate-800 opacity-50 cursor-not-allowed text-slate-400'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-game font-bold text-sm text-yellow-300">+35 Năng Lượng ⚡</div>
                    <div className="text-[11px] text-slate-400">Thêm ~3-4 màn chơi</div>
                  </div>
                  <div className="px-2.5 py-1.5 bg-cyan-500 text-slate-950 font-game font-extrabold rounded-xl text-xs flex items-center gap-1">
                    <Gem className="w-3.5 h-3.5 fill-slate-950" /> 10
                  </div>
                </button>

                {/* 20 Gems for Full Refill */}
                <button
                  type="button"
                  onClick={handleRefillFull}
                  disabled={progress.gems < 20 || progress.energy >= progress.maxEnergy}
                  className={`p-3 rounded-2xl border flex items-center justify-between transition ${
                    progress.gems >= 20 && progress.energy < progress.maxEnergy
                      ? 'bg-emerald-500/15 border-emerald-400/50 hover:bg-emerald-500/25 active:scale-95 cursor-pointer text-white shadow-sm'
                      : 'bg-slate-900/40 border-slate-800 opacity-50 cursor-not-allowed text-slate-400'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-game font-bold text-sm text-emerald-300">Đầy Bình 100% 🔋</div>
                    <div className="text-[11px] text-slate-400">Nạp đầy ngay lập tức</div>
                  </div>
                  <div className="px-2.5 py-1.5 bg-cyan-500 text-slate-950 font-game font-extrabold rounded-xl text-xs flex items-center gap-1">
                    <Gem className="w-3.5 h-3.5 fill-slate-950" /> 20
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHILL VOCAB REVIEW (RECHARGE WITHOUT SPEED STRESS) */}
        {activeTab === 'review' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-left">
            <div className="p-3 bg-emerald-500/15 border border-emerald-400/40 rounded-2xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="text-xs text-emerald-200">
                Ôn tập nhẹ nhàng không tính giờ! Nghe và ghi nhớ <strong>3 từ</strong> để nhận ngay <strong>+15 Năng Lượng ⚡</strong>.
              </div>
            </div>

            {!reviewCompleted ? (
              <div className="p-5 rounded-3xl bg-slate-950/90 border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] text-center space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Tiến độ ôn tập:</span>
                  <span className="font-bold text-emerald-300">{reviewedCount} / 3 từ</span>
                </div>

                <div className="text-5xl drop-shadow mb-1 animate-bounce">
                  {currentReviewWord.emoji}
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-game font-black text-white">
                    {currentReviewWord.word}
                  </h3>
                  <div className="text-xs text-cyan-300 font-mono mt-0.5">
                    {currentReviewWord.phonics}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-yellow-300 mt-2">
                    {currentReviewWord.meaningVi}
                  </div>
                </div>

                {/* Pronounce Button */}
                <button
                  type="button"
                  onClick={handleSpeakCurrentReview}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-400/40 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mx-auto cursor-pointer transition active:scale-95"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-yellow-400 animate-pulse' : ''}`} />
                  <span>Nghe Phát Âm Chuẩn</span>
                </button>

                {/* Confirm Word Button */}
                <button
                  type="button"
                  onClick={handleNextReviewCard}
                  className="w-full py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-game font-black text-base rounded-2xl shadow-lg border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>ĐÃ GHI NHỚ • TIẾP TỤC</span>
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-slate-950/90 border-2 border-emerald-400 text-center space-y-3 shadow-xl">
                <div className="text-4xl">🎉⚡</div>
                <h3 className="text-xl font-game font-black text-emerald-300">
                  XUẤT SẮC! +15 NĂNG LƯỢNG!
                </h3>
                <p className="text-xs sm:text-sm text-slate-200">
                  Bạn đã hoàn thành bài ôn tập từ vựng ngắn. Năng lượng đã được nạp thêm vào phi thuyền.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReviewedCount(0);
                    setReviewCompleted(false);
                    setReviewIndex(prev => prev + 1);
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition cursor-pointer"
                >
                  Ôn Tập Thêm 3 Từ Nữa ➔
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DAILY PLAN & PARENT LIMITS */}
        {activeTab === 'settings' && (
          <div className="space-y-3.5 animate-in fade-in duration-200 text-left">
            <div>
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">
                Chọn Chế Độ Học Hằng Ngày (Phụ Huynh & Học Viên):
              </span>
              <p className="text-xs text-slate-400 mb-3">
                Đặt giới hạn năng lượng để phân bổ thời gian học hợp lý mỗi ngày:
              </p>
            </div>

            <div className="space-y-2">
              {(['relaxed', 'balanced', 'intense'] as DailyEnergyMode[]).map((mKey) => {
                const cfg = DAILY_ENERGY_CAPS[mKey];
                const isSelected = progress.dailyEnergyMode === mKey;

                return (
                  <button
                    key={mKey}
                    type="button"
                    onClick={() => handleSelectPlan(mKey)}
                    className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl">{cfg.icon}</span>
                      <div>
                        <div className={`font-game font-bold text-sm sm:text-base ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                          {cfg.label} ({cfg.maxEnergy}⚡)
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {cfg.subLabel}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Close / Continue Button */}
        <button
          type="button"
          onClick={onClose}
          className={`w-full py-3.5 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-game font-black text-base sm:text-lg rounded-2xl border-b-6 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-5`}
        >
          <span>QUAY LẠI HÀNH TRÌNH 🚀</span>
        </button>
      </div>
    </div>
  );
};
