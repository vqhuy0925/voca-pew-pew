import React, { useEffect } from 'react';
import { GameStats } from '../data/types';
import { LevelNode, UserGender, ThemeStyle, MascotId, UserProgress } from '../data/progress-types';
import { DifficultyLevel } from '../data/upgrade-types';
import { THEME_CONFIGS, MASCOT_CONFIGS } from '../data/theme-types';
import { Star, RotateCcw, ArrowRight, Volume2, Gem, Map, Flame } from 'lucide-react';
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
  gender = 'neutral',
  themeStyle = 'cosmic_cyan',
  mascotId = 'cosmo_dog',
  rewardBreakdown,
  onNextLevel,
  onRestart,
  onGoToMap,
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
      }, 350 + i * 250);
    }
    if (gemAwarded > 0) {
      setTimeout(() => {
        soundFx.playGemPickup();
      }, 350 + stars * 250 + 200);
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
        className={`relative w-full max-w-md bg-gradient-to-b ${theme.bgGradient} border-2 sm:border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-6 text-center my-auto max-h-[92vh] overflow-y-auto shadow-2xl`}
        style={{ boxShadow: `0 0 35px ${theme.glowColor}` }}
      >
        {/* 3 Stars Fanfare */}
        <div className="flex justify-center items-center gap-3 pt-1 pb-2">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`transition-all duration-300 transform ${
                starIndex <= stars
                  ? 'scale-110 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]'
                  : 'text-slate-800 scale-90 opacity-40'
              }`}
            >
              <Star className="w-11 h-11 sm:w-12 sm:h-12 fill-current stroke-[1.5]" />
            </div>
          ))}
        </div>

        {/* Victory Title & Level Name */}
        <h2 className="text-3xl sm:text-4xl font-black font-orbitron text-white tracking-widest starwars-gold-glow">
          CHIẾN THẮNG!
        </h2>
        <p className={`${theme.textColor} font-bold text-sm sm:text-base mt-0.5`}>
          Màn {level.levelNumber}: {level.titleVi}
        </p>

        {/* Mascot Cheering Widget (Concise & Punchy) */}
        <div className="flex justify-center my-3">
          <MascotWidget
            mascotId={mascotId}
            mood="celebrating"
            userAge={progress.userAge}
            gender={gender}
            userName={userName}
          />
        </div>

        {/* Essential Stats Summary (Score, XP, Gems) */}
        <div className="grid grid-cols-3 gap-2.5 my-3.5">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center">
            <span className="text-slate-400 text-xs sm:text-sm font-black uppercase font-orbitron">Điểm số</span>
            <span className={`text-xl sm:text-2xl font-black font-orbitron ${theme.textColor} mt-0.5 tracking-wide`}>
              {stats.score.toLocaleString()}
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center">
            <span className="text-slate-400 text-xs sm:text-sm font-black uppercase font-orbitron">Kinh nghiệm</span>
            <span className="text-xl sm:text-2xl font-black font-orbitron text-amber-400 mt-0.5 flex items-center justify-center gap-1 tracking-wide">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span>+{xpAwarded}</span>
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center">
            <span className="text-slate-400 text-xs sm:text-sm font-black uppercase font-orbitron">Kim cương</span>
            <span className="text-xl sm:text-2xl font-black font-orbitron text-sky-400 mt-0.5 flex items-center justify-center gap-1 tracking-wide">
              <Gem className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span>+{gemAwarded}</span>
            </span>
          </div>
        </div>

        {/* Conquered Words Review (Sleek, Compact List) */}
        {level.words.length > 0 && (
          <div className="text-left bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3 mb-4">
            <div className="flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-wider text-cyan-300 mb-2 px-0.5">
              <span>Từ vựng đã chinh phục ({level.words.length})</span>
              <span className="text-xs text-slate-400 font-semibold normal-case flex items-center gap-1">
                <span>Chạm nghe</span>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 inline" />
              </span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-0.5">
              {level.words.map((item) => {
                const isPlaying = playingId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleSpeak(item.id, item.word, e)}
                    className={`w-full flex items-center justify-between py-2 px-3 rounded-xl border cursor-pointer transition text-left gap-2 ${
                      isPlaying
                        ? `${theme.cardBg} ${theme.borderAccent} shadow-md`
                        : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700 active:scale-[0.99]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
                      <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                      <div className="truncate leading-snug flex-1 min-w-0">
                        <span className={`font-black text-sm sm:text-base ${isPlaying ? theme.textColor : 'text-white'}`}>
                          {item.word}
                        </span>
                        <span className="text-xs sm:text-sm text-yellow-300/90 font-medium ml-2">
                          — {item.meaningVi}
                        </span>
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 flex-shrink-0 ${isPlaying ? theme.textColor : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Streamlined Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-0.5">
          {hasNextLevel ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onNextLevel();
              }}
              className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-orbitron font-black text-lg sm:text-xl rounded-2xl shadow-lg border-b-4 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2.5 cursor-pointer tracking-wider`}
            >
              <span>MÀN TIẾP THEO</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                onRestart();
              }}
              className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} text-slate-950 font-orbitron font-black text-lg sm:text-xl rounded-2xl shadow-lg border-b-4 ${theme.buttonBorder} active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2.5 cursor-pointer tracking-wider`}
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
              <span>CHƠI LẠI</span>
            </button>
          )}

          <div className="flex gap-2.5">
            {hasNextLevel && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onRestart();
                }}
                className="flex-1 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-orbitron font-bold text-sm sm:text-base rounded-xl border border-slate-700/80 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>CHƠI LẠI</span>
              </button>
            )}

            <button
              onClick={() => {
                soundFx.playClick();
                onGoToMap();
              }}
              className="flex-1 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-orbitron font-bold text-sm sm:text-base rounded-xl border border-slate-700/80 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Map className="w-4 h-4 text-cyan-400" />
              <span>BẢN ĐỒ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

