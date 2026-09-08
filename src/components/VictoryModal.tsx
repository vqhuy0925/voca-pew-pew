import React, { useEffect } from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../data/upgrade-types';
import { Star, Trophy, RotateCcw, ArrowRight, Volume2, Gem, Sparkles, Map, Rocket, Timer } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';
import { soundFx } from '../game/engine/SoundController';
import { MascotWidget } from './mascot/MascotWidget';

interface VictoryModalProps {
  stats: GameStats;
  level: LevelNode;
  hasNextLevel: boolean;
  difficulty?: DifficultyLevel;
  timeRemaining?: number;
  userName?: string;
  avatar?: string;
  onNextLevel: () => void;
  onRestart: () => void;
  onGoToMap: () => void;
  onOpenArmory?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  level,
  hasNextLevel,
  difficulty = 'NORMAL',
  timeRemaining = 0,
  userName,
  avatar = '🚀',
  onNextLevel,
  onRestart,
  onGoToMap,
  onOpenArmory
}) => {
  // Calculate 1 to 3 Stars
  let stars = 1;
  if (stats.stationHealth >= 80 && stats.accuracy >= 80) {
    stars = 3;
  } else if (stats.stationHealth >= 40) {
    stars = 2;
  }

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.NORMAL;
  const xpAwarded = Math.round(level.xpReward * diffConfig.xpMultiplier);
  const gemAwarded = Math.round(level.gemReward * diffConfig.gemMultiplier + (timeRemaining > 15 ? 10 : 0));

  // Play Star fanfares sequentially on open & preload words
  useEffect(() => {
    soundFx.playVictory();
    if (level.words.length > 0) {
      speechHelper.preloadWords(level.words.map(w => w.word));
    }
    for (let i = 1; i <= stars; i++) {
      setTimeout(() => {
        soundFx.playStarPop(i);
      }, 500 + i * 350);
    }
  }, [stars, level]);

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(word);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#101438] to-slate-950 border-3 border-yellow-400 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(250,204,21,0.35)] text-center my-4 animate-in zoom-in-95 duration-200">
        {/* Trophy Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/20 border-3 border-yellow-400 rounded-full mb-2 shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-bounce">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold font-game text-yellow-300 drop-shadow mb-1">
          HOÀN THÀNH BÀI HỌC! 🎉
        </h2>
        <p className="text-slate-200 text-xs sm:text-sm mb-4">
          {userName ? (
            <>
              Chúc mừng <span className="font-extrabold text-yellow-300">{avatar} {userName}</span> đã bảo vệ thành công <span className="font-extrabold text-cyan-300">{level.titleVi}</span>!
            </>
          ) : (
            <>
              Bé đã hoàn thành xuất sắc <span className="font-extrabold text-cyan-300">{level.titleVi}</span>!
            </>
          )}
        </p>

        {/* 3 Stars Fanfare */}
        <div className="flex justify-center items-center gap-3 mb-4">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`transition-all duration-500 transform ${
                starIndex <= stars
                  ? 'scale-125 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)] animate-pulse'
                  : 'text-slate-700 scale-90'
              }`}
            >
              <Star className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
            </div>
          ))}
        </div>

        {/* Rewards Earned (XP & Gems) with Time & Difficulty Bonus */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="bg-purple-500/15 border-2 border-purple-400/50 rounded-2xl p-3 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <div className="text-left">
              <div className="text-[10px] text-purple-300 uppercase font-extrabold">Kinh Nghiệm</div>
              <div className="text-lg font-extrabold font-game text-white">+{xpAwarded} XP</div>
            </div>
          </div>

          <div className="bg-cyan-500/15 border-2 border-cyan-400/50 rounded-2xl p-3 flex items-center justify-center gap-2">
            <Gem className="w-5 h-5 text-cyan-400 fill-cyan-400 animate-bounce" />
            <div className="text-left">
              <div className="text-[10px] text-cyan-300 uppercase font-extrabold">Kim Cương</div>
              <div className="text-lg font-extrabold font-game text-white">+{gemAwarded} 💎</div>
            </div>
          </div>
        </div>

        {/* Time & Difficulty Badges */}
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <div
            className="px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1"
            style={{ color: diffConfig.color, borderColor: diffConfig.color, backgroundColor: `${diffConfig.color}15` }}
          >
            <span>{diffConfig.emoji} Độ Khó: {diffConfig.titleVi}</span>
          </div>

          {timeRemaining > 0 && (
            <div className="px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-400/50 bg-emerald-500/15 text-emerald-300 flex items-center gap-1">
              <Timer className="w-3.5 h-3.5" /> Thưởng Tốc Độ: +{timeRemaining}s
            </div>
          )}
        </div>

        {/* Word Review Sticker Album */}
        {level.words.length > 0 && (
          <div className="text-left bg-slate-950/80 border-2 border-slate-800 rounded-2xl p-3 mb-4">
            <div className="text-xs uppercase tracking-wider text-cyan-300 font-extrabold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Bảng Ôn Tập Từ Vựng Vừa Học:
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-1">
              {level.words.map((item) => (
                <div
                  key={item.id}
                  onClick={(e) => handleSpeak(item.word, e)}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 cursor-pointer transition active:scale-95 group"
                  title="Bấm để nghe phát âm"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-xl">{item.emoji}</span>
                    <div className="leading-tight">
                      <div className="font-extrabold text-white text-sm group-hover:text-cyan-300">{item.word}</div>
                      <div className="text-[11px] text-cyan-200 font-semibold truncate">{item.meaningVi}</div>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Armory Upgrade Promo CTA */}
        {onOpenArmory && (
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenArmory();
            }}
            className="w-full mb-3 py-2.5 px-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-game font-extrabold text-sm sm:text-base rounded-2xl border-2 border-pink-300 shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Rocket className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span>XƯỞNG NÂNG CẤP: ĐỔI TÀU & TIA LAZE MỚI! 🛠️</span>
          </button>
        )}

        {/* Main Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNextLevel();
              }}
              className="w-full py-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-game font-extrabold text-xl sm:text-2xl rounded-2xl border-b-6 border-emerald-700 active:border-b-0 active:translate-y-1.5 shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>TIẾP TỤC MÀN TIẾP THEO</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                onRestart();
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-game font-bold text-sm sm:text-base rounded-xl border-2 border-slate-700 hover:border-cyan-400 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Chơi Lại
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onGoToMap();
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-game font-bold text-sm sm:text-base rounded-xl border-2 border-slate-700 hover:border-cyan-400 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Map className="w-4 h-4 text-cyan-400" />
              Bản Đồ Bài Học
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

