import React, { useEffect } from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { DifficultyLevel, DIFFICULTY_CONFIGS } from '../data/upgrade-types';
import { Star, RotateCcw, ArrowRight, Volume2, Gem, Sparkles, Map, Flame } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-[#101438] border-2 border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl text-center my-4">
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

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-black font-game text-white tracking-wide mt-2">
          CHIẾN THẮNG!
        </h2>
        <p className="text-cyan-300 font-bold text-sm mt-0.5">
          {level.titleVi} • Màn {level.levelNumber}
        </p>

        {/* Score & Rewards Summary */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 my-5">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-slate-400 text-xs font-bold uppercase">Điểm số</div>
            <div className="text-xl sm:text-2xl font-black font-game text-cyan-400 mt-1">{stats.score}</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-slate-400 text-xs font-bold uppercase">Kinh nghiệm</div>
            <div className="text-xl sm:text-2xl font-black font-game text-amber-400 mt-1 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-current" />
              <span>+{xpAwarded}</span>
            </div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-slate-400 text-xs font-bold uppercase">Kim cương</div>
            <div className="text-xl sm:text-2xl font-black font-game text-sky-400 mt-1 flex items-center justify-center gap-1">
              <Gem className="w-4 h-4 fill-current" />
              <span>+{gemAwarded}</span>
            </div>
          </div>
        </div>

        {/* Word / Sentence Review Grid */}
        {level.words.length > 0 && (
          <div className="text-left bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 mb-6">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2.5">
              {level.words.some(w => w.word.length > 20) ? 'Câu thoại đã chinh phục (Bấm để luyện nói):' : 'Từ vựng đã chinh phục:'}
            </div>

            <div className={`max-h-44 overflow-y-auto pr-1 ${
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
                        ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'bg-slate-900 border-slate-800 hover:border-cyan-400/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
                      <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                      <div className="truncate leading-tight flex-1 min-w-0">
                        <div className={`font-extrabold text-xs sm:text-sm truncate ${isPlaying ? 'text-cyan-300' : 'text-white'}`}>
                          {item.word}
                        </div>
                        <div className="text-[11px] sm:text-xs text-yellow-300 font-medium truncate">{item.meaningVi}</div>
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 flex-shrink-0 ml-1 ${isPlaying ? 'text-cyan-300 animate-pulse' : 'text-cyan-400'}`} />
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
              className="w-full py-4 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-game font-black text-lg rounded-2xl shadow-lg border-b-4 border-teal-600 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>MÀN TIẾP THEO</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
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

