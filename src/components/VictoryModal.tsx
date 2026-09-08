import React, { useEffect } from 'react';
import { GameStats } from '../data/types';
import { LevelNode } from '../data/progress-types';
import { Star, Trophy, RotateCcw, ArrowRight, Volume2, Gem, Sparkles, Map } from 'lucide-react';
import { speechHelper } from '../game/engine/SpeechHelper';
import { soundFx } from '../game/engine/SoundController';
import { MascotWidget } from './mascot/MascotWidget';

interface VictoryModalProps {
  stats: GameStats;
  level: LevelNode;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onRestart: () => void;
  onGoToMap: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  level,
  hasNextLevel,
  onNextLevel,
  onRestart,
  onGoToMap
}) => {
  // Calculate 1 to 3 Stars
  let stars = 1;
  if (stats.stationHealth >= 80 && stats.accuracy >= 80) {
    stars = 3;
  } else if (stats.stationHealth >= 40) {
    stars = 2;
  }

  // Play Star fanfares sequentially on open
  useEffect(() => {
    soundFx.playVictory();
    for (let i = 1; i <= stars; i++) {
      setTimeout(() => {
        soundFx.playStarPop(i);
      }, 500 + i * 350);
    }
  }, [stars]);

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(word);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#101438] to-slate-950 border-3 border-yellow-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(250,204,21,0.35)] text-center my-6 animate-in zoom-in-95 duration-200">
        {/* Trophy Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/20 border-3 border-yellow-400 rounded-full mb-3 shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-bounce">
          <Trophy className="w-10 h-10 text-yellow-300" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-game text-yellow-300 drop-shadow mb-1">
          HOÀN THÀNH BÀI HỌC! 🎉
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mb-4">
          Bé đã hoàn thành xuất sắc <span className="font-bold text-cyan-300">{level.titleVi}</span>!
        </p>

        {/* 3 Stars Fanfare */}
        <div className="flex justify-center items-center gap-3 mb-5">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`transition-all duration-500 transform ${
                starIndex <= stars
                  ? 'scale-125 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)] animate-pulse'
                  : 'text-slate-700 scale-90'
              }`}
            >
              <Star className="w-10 h-10 fill-current" />
            </div>
          ))}
        </div>

        {/* Rewards Earned (XP & Gems) */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-purple-500/15 border-2 border-purple-400/50 rounded-2xl p-3 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <div className="text-left">
              <div className="text-[10px] text-purple-300 uppercase font-bold">Kinh Nghiệm</div>
              <div className="text-lg font-bold font-game text-white">+{level.xpReward} XP</div>
            </div>
          </div>

          <div className="bg-cyan-500/15 border-2 border-cyan-400/50 rounded-2xl p-3 flex items-center justify-center gap-2">
            <Gem className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            <div className="text-left">
              <div className="text-[10px] text-cyan-300 uppercase font-bold">Kim Cương</div>
              <div className="text-lg font-bold font-game text-white">+{level.gemReward} 💎</div>
            </div>
          </div>
        </div>

        {/* Word Review Sticker Album */}
        {level.words.length > 0 && (
          <div className="text-left bg-slate-950/80 border-2 border-slate-800 rounded-2xl p-3.5 mb-6">
            <div className="text-xs uppercase tracking-wider text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Bảng Ôn Tập Từ Vựng Vừa Học:
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
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
                      <div className="font-bold text-white text-sm group-hover:text-cyan-300">{item.word}</div>
                      <div className="text-[10px] text-slate-400 truncate">{item.meaningVi}</div>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mascot cheer */}
        <div className="flex justify-center mb-5">
          <MascotWidget mood="celebrating" customMessage="Bé giỏi nhất ngân hà luôn! ⭐" />
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNextLevel();
              }}
              className="w-full py-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-game font-bold text-xl rounded-2xl border-b-6 border-emerald-700 active:border-b-0 active:translate-y-1.5 shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
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
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-game font-bold rounded-xl border-2 border-slate-700 hover:border-cyan-400 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Chơi Lại
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onGoToMap();
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-game font-bold rounded-xl border-2 border-slate-700 hover:border-cyan-400 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
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
