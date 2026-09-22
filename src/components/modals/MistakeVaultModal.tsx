import React, { useState, useMemo, useEffect } from 'react';
import { UserProgress, ThemeStyle } from '../../data/progress-types';
import { THEME_CONFIGS } from '../../data/theme-types';
import { WordMistakeRecord, MasteryStatus } from '../../data/mistake-types';
import { VocabWord } from '../../data/types';
import { getMistakeStats } from '../../services/progressStorage';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { soundFx } from '../../game/engine/SoundController';
import { X, Volume2, Flame, Award, BookOpen, Play, CheckCircle2, AlertTriangle, Keyboard, ArrowRight } from 'lucide-react';

interface MistakeVaultModalProps {
  progress: UserProgress;
  onStartBlitz?: (words: VocabWord[]) => void;
  onOpenTypingDojo?: () => void;
  onClose: () => void;
}

export const MistakeVaultModal: React.FC<MistakeVaultModalProps> = ({
  progress,
  onStartBlitz,
  onOpenTypingDojo,
  onClose
}) => {
  const themeStyle: ThemeStyle = progress.themeStyle || 'cosmic_cyan';
  const theme = THEME_CONFIGS[themeStyle] || THEME_CONFIGS.cosmic_cyan;
  const [mainView, setMainView] = useState<'words' | 'keys'>('words');
  const [activeTab, setActiveTab] = useState<MasteryStatus | 'all'>('learning');
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const topMistakeKeys = useMemo(() => {
    const map = progress.typingProgress?.keyMistakeMap || {};
    return Object.entries(map)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count);
  }, [progress.typingProgress?.keyMistakeMap]);

  const mistakeList: WordMistakeRecord[] = useMemo(() => {
    const map = progress.mistakeMap || {};
    return Object.values(map);
  }, [progress.mistakeMap]);

  const stats = useMemo(() => {
    return getMistakeStats(progress);
  }, [progress]);

  const filteredWords = useMemo(() => {
    if (activeTab === 'all') return mistakeList;
    return mistakeList.filter(w => w.masteryStatus === activeTab);
  }, [mistakeList, activeTab]);

  useEffect(() => {
    if (mistakeList.length > 0) {
      speechHelper.preloadWords(mistakeList.map(w => w.word));
    }
  }, [mistakeList]);

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    setPlayingWord(word);
    speechHelper.speak(word, true);
    setTimeout(() => {
      setPlayingWord(prev => (prev === word ? null : prev));
    }, 2000);
  };

  const handleStartBlitzMode = () => {
    if (!onStartBlitz) return;
    soundFx.playClick();

    // Pick top weak words (learning or reviewing)
    const weakList = mistakeList
      .filter(w => w.masteryStatus !== 'mastered')
      .sort((a, b) => (b.typoCount + b.breachCount * 2) - (a.typoCount + a.breachCount * 2))
      .slice(0, 8);

    const blitzVocabList: VocabWord[] = weakList.map(w => ({
      id: w.wordId,
      word: w.word,
      meaningVi: w.meaningVi,
      emoji: w.emoji,
      category: w.category || 'Phục Thù',
      pronunciation: w.pronunciation
    }));

    if (blitzVocabList.length > 0) {
      onStartBlitz(blitzVocabList);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg bg-gradient-to-b ${theme.bgGradient} border-2 sm:border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-6 text-center my-auto flex flex-col max-h-[92dvh] shadow-2xl overflow-hidden`}
        style={{ boxShadow: `0 0 35px ${theme.glowColor}` }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center transition active:scale-95 cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="shrink-0 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold text-xs sm:text-sm font-orbitron uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>Lò Rèn Từ Vựng & Phục Thù</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-orbitron text-white tracking-wide">
            Kho Từ Cần Rèn Luyện
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
            Gõ sạch 3 lần liên tiếp để đưa từ vào trạng thái <strong>Đã Tinh Thông</strong>!
          </p>
        </div>

        {/* Main View Tabs: Từ Hay Sai vs Phím Hay Gõ Sai */}
        <div className="shrink-0 flex items-center gap-2 mb-1">
          <button
            onClick={() => {
              soundFx.playClick();
              setMainView('words');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm transition cursor-pointer ${
              mainView === 'words'
                ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                : 'bg-slate-900/70 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Từ Hay Sai</span>
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setMainView('keys');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm transition cursor-pointer ${
              mainView === 'keys'
                ? 'bg-violet-500/20 border-violet-400 text-violet-300'
                : 'bg-slate-900/70 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Phím Hay Gõ Sai</span>
          </button>
        </div>

        {mainView === 'words' && (
        <>
        {/* Stats Row */}
        <div className="shrink-0 grid grid-cols-3 gap-2 my-2">
          <div
            onClick={() => {
              soundFx.playClick();
              setActiveTab('learning');
            }}
            className={`p-2.5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'learning'
                ? 'bg-orange-950/80 border-orange-500 shadow-md ring-2 ring-orange-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs text-orange-400 font-bold flex items-center justify-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Đang Rèn</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-orbitron text-orange-300 mt-0.5">
              {stats.learning}
            </div>
          </div>

          <div
            onClick={() => {
              soundFx.playClick();
              setActiveTab('reviewing');
            }}
            className={`p-2.5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'reviewing'
                ? 'bg-sky-950/80 border-sky-500 shadow-md ring-2 ring-sky-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs text-sky-400 font-bold flex items-center justify-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ôn Tập</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-orbitron text-sky-300 mt-0.5">
              {stats.reviewing}
            </div>
          </div>

          <div
            onClick={() => {
              soundFx.playClick();
              setActiveTab('mastered');
            }}
            className={`p-2.5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'mastered'
                ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Tinh Thông</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-orbitron text-emerald-300 mt-0.5">
              {stats.mastered}
            </div>
          </div>
        </div>

        {/* Word List (Scrollable Area) */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-2 py-2 pr-1 text-left">
          {filteredWords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-center">
              <span className="text-4xl mb-2">🌟</span>
              <p className="font-bold text-sm sm:text-base text-slate-300">
                {activeTab === 'learning'
                  ? 'Tuyệt vời! Không có từ nào đang bị vấp lỗi.'
                  : activeTab === 'mastered'
                  ? 'Chưa có từ nào tốt nghiệp. Hãy tiếp tục cố gắng nhé!'
                  : 'Không có từ nào trong mục này.'}
              </p>
            </div>
          ) : (
            filteredWords.map((item) => {
              const isPlaying = playingWord === item.word;
              return (
                <div
                  key={item.wordId || item.word}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-2.5 transition ${
                    item.masteryStatus === 'mastered'
                      ? 'bg-emerald-950/30 border-emerald-800/60'
                      : item.masteryStatus === 'reviewing'
                      ? 'bg-sky-950/30 border-sky-800/60'
                      : 'bg-orange-950/30 border-orange-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">{item.emoji}</span>
                    <div className="truncate min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-base sm:text-lg text-white">
                          {item.word}
                        </span>
                        {item.masteryStatus === 'mastered' && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Mastered</span>
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-yellow-300/90 font-medium truncate">
                        {item.meaningVi}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-1">
                        <span>Lỗi gõ: <strong className="text-rose-400">{item.typoCount}</strong></span>
                        <span>Rớt: <strong className="text-rose-400">{item.breachCount}</strong></span>
                        <span>Chuỗi sạch: <strong className="text-emerald-400">{item.consecutiveCleanClears}/3</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleSpeak(item.word, e)}
                    className={`p-2.5 rounded-xl border transition active:scale-95 cursor-pointer flex-shrink-0 ${
                      isPlaying
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border-slate-700'
                    }`}
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
        </>
        )}

        {/* Phím Hay Gõ Sai (Typing Dojo key mistakes) */}
        {mainView === 'keys' && (
          <div className="flex-1 min-h-0 overflow-y-auto space-y-2 py-2 pr-1 text-left">
            {topMistakeKeys.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-center">
                <span className="text-4xl mb-2">⌨️</span>
                <p className="font-bold text-sm sm:text-base text-slate-300">
                  Chưa có dữ liệu phím gõ sai. Hãy luyện tập ở Typing Dojo!
                </p>
              </div>
            ) : (
              topMistakeKeys.map((mk) => {
                const maxCount = topMistakeKeys[0].count || 1;
                const ratio = Math.min(100, Math.round((mk.count / maxCount) * 100));
                return (
                  <div
                    key={mk.key}
                    className="p-3 rounded-2xl border border-violet-800/60 bg-violet-950/20 flex items-center gap-3"
                  >
                    <span className="w-10 h-10 rounded-xl bg-slate-950 border border-violet-500/40 flex items-center justify-center font-mono font-black text-lg text-violet-300 flex-shrink-0">
                      {mk.key === ' ' ? '␣' : mk.key}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-violet-400 to-rose-400 rounded-full"
                          style={{ width: `${ratio}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-rose-300 flex-shrink-0">
                      ×{mk.count}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="shrink-0 pt-3 border-t border-slate-800 flex flex-col gap-2">
          {mainView === 'words' && stats.learning + stats.reviewing > 0 && onStartBlitz && (
            <button
              onClick={handleStartBlitzMode}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 font-orbitron font-black text-base sm:text-lg rounded-2xl shadow-lg border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer tracking-wider"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>LUYỆN TẬP PHỤC THÙ (BLITZ)</span>
            </button>
          )}

          {mainView === 'keys' && onOpenTypingDojo && (
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
                onOpenTypingDojo();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 text-white font-orbitron font-black text-base sm:text-lg rounded-2xl shadow-lg border-b-4 border-violet-800 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer tracking-wider"
            >
              <Keyboard className="w-5 h-5" />
              <span>LUYỆN GÕ Ở TYPING DOJO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-orbitron font-bold text-sm rounded-xl border border-slate-700 transition cursor-pointer"
          >
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};
