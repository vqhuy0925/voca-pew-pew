import React, { useEffect } from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../data/upgrade-types';
import { Star, RotateCcw, ArrowRight, Volume2, Gem, Sparkles, Map } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';
import { soundFx } from '../game/engine/SoundController';

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
  onGoToMap
}) => {
  let stars = 1;
  if (stats.stationHealth >= 80 && stats.accuracy >= 80) {
    stars = 3;
  } else if (stats.stationHealth >= 40) {
    stars = 2;
  }

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.NORMAL;
  const xpAwarded = Math.round(level.xpReward * diffConfig.xpMultiplier);
  const gemAwarded = Math.round(level.gemReward * diffConfig.gemMultiplier + (timeRemaining > 15 ? 10 : 0));

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
  }, [stars, level]);

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(word);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl text-center my-4">
        {/* 3 Stars Fanfare */}
        <div className="flex justify-center items-center gap-2.5 my-2">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`transition-all duration-300 transform ${
                starIndex <= stars
                  ? 'scale-110 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]'
                  : 'text-slate-800 scale-90'
              }`}
            >
              <Star className="w-9 h-9 sm:w-11 sm:h-11 fill-current" />
            </div>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white mt-2">
          XUẤT SẮC! 🎉
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mb-4">
          Hoàn thành <span className="font-extrabold text-cyan-300">{level.titleVi}</span>
        </p>

        {/* Rewards Earned (XP & Gems) */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-400/30 rounded-xl text-purple-300 font-game font-bold text-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>+{xpAwarded} XP</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-cyan-200 font-game font-bold text-sm">
            <Gem className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>+{gemAwarded} 💎</span>
          </div>
        </div>

        {/* Word Review Minimal Grid */}
        {level.words.length > 0 && (
          <div className="text-left bg-slate-950/70 border border-slate-800 rounded-2xl p-3 mb-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">
              Từ vựng đã học:
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-28 overflow-y-auto pr-1">
              {level.words.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleSpeak(item.word, e)}
                  className="flex items-center justify-between p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 cursor-pointer transition text-left"
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="text-lg">{item.emoji}</span>
                    <div className="truncate leading-tight">
                      <div className="font-bold text-white text-xs">{item.word}</div>
                      <div className="text-[10px] text-yellow-300 truncate">{item.meaningVi}</div>
                    </div>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="flex flex-col gap-2">
          {hasNextLevel && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNextLevel();
              }}
              className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-game font-extrabold text-base rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>MÀN TIẾP THEO</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                onRestart();
              }}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-game font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition flex items-center justify-center gap-1 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Chơi Lại
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onGoToMap();
              }}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-game font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition flex items-center justify-center gap-1 cursor-pointer active:scale-95"
            >
              <Map className="w-3.5 h-3.5 text-cyan-400" />
              Bản Đồ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

