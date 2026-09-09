import React, { useEffect } from 'react';
import { GameStats } from '../data/types';
import { LevelNode, UserGender, ThemeStyle, MascotId, UserProgress } from '../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../data/upgrade-types';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../data/theme-types';
import { Star, RotateCcw, ArrowRight, Volume2, Gem, Sparkles, Map, Flame, CheckCircle2, Award, Zap, Trophy, Shield } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';
import { soundFx } from '../game/engine/SoundController';
import { MascotWidget } from './mascot/MascotWidget';
import { calculateLevelClearRewards, ClearRewardBreakdown } from '../services/progressStorage';

interface VictoryModalProps {
  stats: GameStats;
  level: LevelNode;
  progress: UserProgress;
  hasNextLevel: boolean;
  difficulty?: DifficultyLevel;
  timeRemaining?: number;
  userName?: string;
  avatar?: string;
  gender?: UserGender;
  themeStyle?: ThemeStyle;
  mascotId?: MascotId;
  rewardBreakdown?: ClearRewardBreakdown;
  onNextLevel: () => void;
  onRestart: () => void;
  onGoToMap: () => void;
  onOpenArmory?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAstronautCard?: () => void;
  onOpenDiamondGuide?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  level,
  progress,
  hasNextLevel,
  difficulty = 'NORMAL',
  userName,
  avatar = '🚀',
  gender = 'neutral',
  themeStyle = 'cosmic_cyan',
  mascotId = 'cosmo_dog',
  rewardBreakdown,
  onNextLevel,
  onRestart,
  onGoToMap,
  onOpenLeaderboard,
  onOpenAstronautCard,
  onOpenDiamondGuide
}) => {
  const theme = THEME_CONFIGS[themeStyle] || THEME_CONFIGS.cosmic_cyan;
  const mascot = MASCOT_CONFIGS[mascotId] || MASCOT_CONFIGS.cosmo_dog;

  const reward = rewardBreakdown || calculateLevelClearRewards(
    progress,
    level,
    stats.stationHealth,
    stats.accuracy,
    difficulty
  );

  const stars = reward.starsEarned;
  const xpAwarded = reward.totalXpEarned;
  const gemAwarded = reward.totalGemsEarned;

  useEffect(() => {
    soundFx.playVictory();
    if (level.words.length > 0) {
      speechHelper.preloadWords(level.words.map(w => w.word));
    }
    for (let i = 1; i <= stars; i++) {
      setTimeout(() => {
        soundFx.playStarPop(i);
      }, 400 + i * 300);
    }
    if (gemAwarded > 0) {
      setTimeout(() => {
        soundFx.playGemPickup();
      }, 400 + stars * 300 + 200);
    }
  }, [stars, level, gemAwarded]);

  const [playingId, setPlayingId] = React.useState<string | null>(null);

  const handleSpeak = (itemId: string, word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    setPlayingId(itemId);
    speechHelper.speak(word, true);
    setTimeout(() => {
      setPlayingId(prev => (prev === itemId ? null : prev));
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg bg-gradient-to-b ${theme.bgGradient} border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-7 text-center my-4 max-h-[92vh] overflow-y-auto`}
        style={{ boxShadow: `0 0 40px ${theme.glowColor}` }}
      >
        {/* 3 Stars Fanfare */}
        <div className="flex justify-center items-center gap-3 my-2">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`transition-all duration-300 transform ${
                starIndex <= stars
                  ? 'scale-110 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]'
                  : 'text-slate-800 scale-90'
              }`}
            >
              <Star className="w-12 h-12 fill-current stroke-[1.5]" />
            </div>
          ))}
        </div>

        {/* Title & Learner Badge */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-2xl">{avatar}</span>
          <h2 className="text-3xl sm:text-4xl font-black font-orbitron text-white tracking-widest starwars-gold-glow">
            CHIẾN THẮNG!
          </h2>
          <span className="text-2xl">{gender === 'girl' ? '🌸' : gender === 'boy' ? '⚡' : '✨'}</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
          <span className={`${theme.textColor} font-bold text-sm`}>
            {level.titleVi} • Màn {level.levelNumber}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold border border-yellow-400/30">
            <Zap className="w-3 h-3 fill-yellow-400" />
            <span>{progress.energy}⚡ còn lại</span>
          </span>
        </div>

        {/* Mascot Cheering Widget */}
        <div className="flex justify-center my-3">
          <MascotWidget
            mascotId={mascotId}
            mood="celebrating"
            userAge={progress.userAge}
            gender={gender}
            userName={userName}
          />
        </div>

        {/* Score & Rewards Summary */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 my-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-slate-400 text-xs font-bold uppercase font-orbitron">Điểm số</div>
            <div className={`text-xl sm:text-2xl font-black font-orbitron ${theme.textColor} mt-1 tracking-wide`}>{stats.score}</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-slate-400 text-xs font-bold uppercase font-orbitron">Kinh nghiệm</div>
            <div className="text-xl sm:text-2xl font-black font-orbitron text-amber-400 mt-1 flex items-center justify-center gap-1 tracking-wide">
              <Flame className="w-4 h-4 fill-current" />
              <span>+{xpAwarded}</span>
            </div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-slate-400 text-xs font-bold uppercase font-orbitron">Kim cương</div>
            <div className="text-xl sm:text-2xl font-black font-orbitron text-sky-400 mt-1 flex items-center justify-center gap-1 tracking-wide">
              <Gem className="w-4 h-4 fill-current" />
              <span>+{gemAwarded}</span>
            </div>
          </div>
        </div>

        {/* Diamond Reward Breakdown Box */}
        <div className="bg-sky-950/40 border border-sky-500/40 rounded-2xl p-3.5 mb-4 text-left">
          <div className="text-xs text-sky-300 font-extrabold uppercase flex items-center justify-between gap-1.5 mb-2.5">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Chi Tiết Thưởng Kim Cương:
            </div>
            {onOpenDiamondGuide && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenDiamondGuide();
                }}
                className="text-[11px] text-cyan-300 hover:text-cyan-100 font-bold flex items-center gap-1 cursor-pointer bg-cyan-500/20 px-2 py-0.5 rounded-lg border border-cyan-400/40"
              >
                <span>💡 Bí kíp 💎</span>
              </button>
            )}
          </div>
          <div className="space-y-1.5 text-xs text-slate-200">
            {reward.starBonusGems > 0 && (
              <div className="flex justify-between items-center bg-slate-900/60 px-2.5 py-1.5 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>Đạt {stars} Sao xuất sắc:</span>
                </span>
                <span className="font-orbitron font-extrabold text-yellow-300">+{reward.starBonusGems} 💎</span>
              </div>
            )}
            {reward.isFirstClear && (reward.firstClearBonusGems || reward.baseGems) > 0 && (
              <div className="flex justify-between items-center bg-slate-900/60 px-2.5 py-1.5 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Mở khóa màn chơi mới:</span>
                </span>
                <span className="font-orbitron font-extrabold text-sky-300">+{reward.firstClearBonusGems || reward.baseGems} 💎</span>
              </div>
            )}
            {reward.accuracyBonusGems > 0 && (
              <div className="flex justify-between items-center bg-slate-900/60 px-2.5 py-1.5 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>Xạ thủ chuẩn xác ({stats.accuracy}%):</span>
                </span>
                <span className="font-orbitron font-extrabold text-emerald-300">+{reward.accuracyBonusGems} 💎</span>
              </div>
            )}
            {reward.heroicBonusGems > 0 && (
              <div className="flex justify-between items-center bg-slate-900/60 px-2.5 py-1.5 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <span>🔥</span>
                  <span>Thử thách Heroic:</span>
                </span>
                <span className="font-orbitron font-extrabold text-rose-300">+{reward.heroicBonusGems} 💎</span>
              </div>
            )}
          </div>
        </div>

        {/* Leaderboard Rank Boost Banner */}
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-2.5 mb-4 flex items-center justify-between gap-2 text-left">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 flex-shrink-0">
              <Trophy className="w-4 h-4 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-amber-300 truncate">
                +{xpAwarded} XP đã cộng vào Bảng Xếp Hạng!
              </div>
              <div className="text-[11px] text-slate-300">
                Tuần này: <span className="font-orbitron font-bold text-amber-400">{(progress.weeklyXp || 0) + xpAwarded} XP</span>
              </div>
            </div>
          </div>
          {onOpenLeaderboard && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenLeaderboard();
              }}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              Xem BXH 🏆
            </button>
          )}
        </div>

        {/* Word / Sentence Review Grid */}
        {level.words.length > 0 && (
          <div className="text-left bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 mb-5">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2.5">
              {level.words.some(w => w.word.length > 20) ? 'Câu thoại đã chinh phục (Bấm để luyện nói):' : 'Từ vựng đã chinh phục:'}
            </div>

            <div className={`max-h-40 overflow-y-auto pr-1 ${
              level.words.some(w => w.word.length > 20) ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-2 gap-2.5'
            }`}>
              {level.words.map((item) => {
                const isPlaying = playingId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleSpeak(item.id, item.word, e)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition text-left gap-2 ${
                      isPlaying
                        ? `${theme.cardBg} ${theme.borderAccent} shadow-md`
                        : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
                      <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                      <div className="truncate leading-tight flex-1 min-w-0">
                        <div className={`font-extrabold text-xs sm:text-sm truncate ${isPlaying ? theme.textColor : 'text-white'}`}>
                          {item.word}
                        </div>
                        <div className="text-[11px] sm:text-xs text-yellow-300 font-medium truncate">{item.meaningVi}</div>
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 flex-shrink-0 ml-1 ${isPlaying ? theme.textColor : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNextLevel();
              }}
              className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-orbitron font-black text-lg rounded-2xl shadow-lg border-b-4 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer tracking-wider`}
            >
              <span>MÀN TIẾP THEO</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          )}

          {onOpenAstronautCard && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenAstronautCard();
              }}
              className="w-full py-3 px-4 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 font-orbitron font-extrabold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
              title="Xuất ảnh Thẻ Căn Cước Phi Hành Gia để khoe bạn bè và phụ huynh"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>KHOE THẺ PHI HÀNH GIA 🚀</span>
            </button>
          )}

          <div className="flex gap-2.5">
            <button
              onClick={() => {
                soundFx.playClick();
                onRestart();
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-game font-bold text-sm sm:text-base rounded-2xl border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Chơi Lại
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onGoToMap();
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-game font-bold text-sm sm:text-base rounded-2xl border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Map className="w-4 h-4 text-cyan-400" />
              Bản Đồ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

