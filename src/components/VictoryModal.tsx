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
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 my-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 sm:p-3.5">
            <div className="text-slate-300 text-xs sm:text-sm font-black uppercase font-orbitron">Điểm số</div>
            <div className={`text-2xl sm:text-3xl font-black font-orbitron ${theme.textColor} mt-1 tracking-wide`}>{stats.score}</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 sm:p-3.5">
            <div className="text-slate-300 text-xs sm:text-sm font-black uppercase font-orbitron">Kinh nghiệm</div>
            <div className="text-2xl sm:text-3xl font-black font-orbitron text-amber-400 mt-1 flex items-center justify-center gap-1 tracking-wide">
              <Flame className="w-5 h-5 fill-current" />
              <span>+{xpAwarded}</span>
            </div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 sm:p-3.5">
            <div className="text-slate-300 text-xs sm:text-sm font-black uppercase font-orbitron">Kim cương</div>
            <div className="text-2xl sm:text-3xl font-black font-orbitron text-sky-400 mt-1 flex items-center justify-center gap-1 tracking-wide">
              <Gem className="w-5 h-5 fill-current" />
              <span>+{gemAwarded}</span>
            </div>
          </div>
        </div>

        {/* Diamond Reward Breakdown Box */}
        <div className="bg-sky-950/40 border border-sky-500/40 rounded-2xl p-3 sm:p-4 mb-4 text-left">
          <div className="text-xs sm:text-sm text-sky-300 font-black uppercase flex items-center justify-between gap-1.5 mb-2.5">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Thưởng Kim Cương
            </div>
            {onOpenDiamondGuide && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenDiamondGuide();
                }}
                className="text-xs text-cyan-300 hover:text-cyan-100 font-black flex items-center gap-1 cursor-pointer bg-cyan-500/20 px-2.5 py-1 rounded-xl border border-cyan-400/40"
              >
                <span>💡 Bí kíp 💎</span>
              </button>
            )}
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-slate-100 font-bold">
            {reward.starBonusGems > 0 && (
              <div className="flex justify-between items-center bg-slate-900/70 px-3 py-2 rounded-xl">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>Đạt {stars} Sao xuất sắc:</span>
                </span>
                <span className="font-orbitron font-black text-yellow-300">+{reward.starBonusGems} 💎</span>
              </div>
            )}
            {reward.isFirstClear && (reward.firstClearBonusGems || reward.baseGems) > 0 && (
              <div className="flex justify-between items-center bg-slate-900/70 px-3 py-2 rounded-xl">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Mở khóa màn mới:</span>
                </span>
                <span className="font-orbitron font-black text-sky-300">+{reward.firstClearBonusGems || reward.baseGems} 💎</span>
              </div>
            )}
            {reward.accuracyBonusGems > 0 && (
              <div className="flex justify-between items-center bg-slate-900/70 px-3 py-2 rounded-xl">
                <span className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>Chuẩn xác ({stats.accuracy}%):</span>
                </span>
                <span className="font-orbitron font-black text-emerald-300">+{reward.accuracyBonusGems} 💎</span>
              </div>
            )}
            {reward.heroicBonusGems > 0 && (
              <div className="flex justify-between items-center bg-slate-900/70 px-3 py-2 rounded-xl">
                <span className="flex items-center gap-2">
                  <span>🔥</span>
                  <span>Thử thách Heroic:</span>
                </span>
                <span className="font-orbitron font-black text-rose-300">+{reward.heroicBonusGems} 💎</span>
              </div>
            )}
          </div>
        </div>

        {/* Leaderboard Rank Boost Banner - Concise */}
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-3 mb-4 flex items-center justify-between gap-2.5 text-left">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 flex-shrink-0">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-black text-amber-300 truncate">
                +{xpAwarded} XP Bảng Xếp Hạng!
              </div>
              <div className="text-xs text-slate-300 font-bold">
                Tuần này: <span className="font-orbitron font-black text-amber-400">{(progress.weeklyXp || 0) + xpAwarded} XP</span>
              </div>
            </div>
          </div>
          {onOpenLeaderboard && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenLeaderboard();
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs sm:text-sm font-black transition active:scale-95 cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              Xem BXH 🏆
            </button>
          )}
        </div>

        {/* Word / Sentence Review Grid */}
        {level.words.length > 0 && (
          <div className="text-left bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 mb-5">
            <div className="text-xs sm:text-sm uppercase tracking-wider text-cyan-300 font-black mb-2.5">
              Từ vựng đã chinh phục:
            </div>

            <div className={`max-h-40 overflow-y-auto pr-1 ${
              level.words.some(w => w.word.length > 20) ? 'grid grid-cols-1 gap-2.5' : 'grid grid-cols-2 gap-2.5'
            }`}>
              {level.words.map((item) => {
                const isPlaying = playingId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleSpeak(item.id, item.word, e)}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition text-left gap-2.5 ${
                      isPlaying
                        ? `${theme.cardBg} ${theme.borderAccent} shadow-md`
                        : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">{item.emoji}</span>
                      <div className="truncate leading-tight flex-1 min-w-0">
                        <div className={`font-black text-sm sm:text-base truncate ${isPlaying ? theme.textColor : 'text-white'}`}>
                          {item.word}
                        </div>
                        <div className="text-xs sm:text-sm text-yellow-300 font-bold truncate mt-0.5">{item.meaningVi}</div>
                      </div>
                    </div>
                    <Volume2 className={`w-5 h-5 flex-shrink-0 ml-1 ${isPlaying ? theme.textColor : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="flex flex-col gap-3">
          {hasNextLevel && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNextLevel();
              }}
              className={`w-full py-4.5 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-orbitron font-black text-xl sm:text-2xl rounded-2xl shadow-lg border-b-4 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2.5 cursor-pointer tracking-wider`}
            >
              <span>MÀN TIẾP THEO</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          )}

          {onOpenAstronautCard && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenAstronautCard();
              }}
              className="w-full py-3.5 px-4 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 font-orbitron font-black text-sm sm:text-base rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
              title="Xem thẻ phi hành gia"
            >
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>THẺ PHI HÀNH GIA 🚀</span>
            </button>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => {
                soundFx.playClick();
                onRestart();
              }}
              className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-orbitron font-black text-base sm:text-lg rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              CHƠI LẠI
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onGoToMap();
              }}
              className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-orbitron font-black text-base sm:text-lg rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Map className="w-5 h-5 text-cyan-400" />
              BẢN ĐỒ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

