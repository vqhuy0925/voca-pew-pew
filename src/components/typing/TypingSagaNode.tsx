import React from 'react';
import { TypingLesson } from '../../data/typing-curriculum';
import { TypingLessonProgress } from '../../data/typing-progress-types';
import { Lock, Check, Sparkles, Star } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';

interface TypingSagaNodeProps {
  lesson: TypingLesson;
  progress?: TypingLessonProgress;
  isUnlocked: boolean;
  isCurrent: boolean;
  onSelect: (lesson: TypingLesson) => void;
  offsetX?: number;
  isLight?: boolean;
}

export const TypingSagaNode: React.FC<TypingSagaNodeProps> = ({
  lesson,
  progress,
  isUnlocked,
  isCurrent,
  onSelect,
  offsetX = 0,
  isLight = false
}) => {
  const isCompleted = !!progress?.isCompleted;
  const bestWpm = progress?.bestWpm || 0;
  const bestAccuracy = progress?.bestAccuracy || 0;

  // Tính số sao đạt được theo tiêu chuẩn WPM / Độ chính xác
  const starCount = React.useMemo(() => {
    if (!isCompleted) return 0;
    if (bestAccuracy >= 95 && bestWpm >= 25) return 3;
    if (bestAccuracy >= 88 || bestWpm >= 18) return 2;
    return 1;
  }, [isCompleted, bestAccuracy, bestWpm]);

  const handleClick = () => {
    if (!isUnlocked) {
      soundFx.playWrong();
      return;
    }
    soundFx.playClick();
    onSelect(lesson);
  };

  // Nội dung trọng tâm hiển thị ở giữa node
  const renderNodeCenter = () => {
    if (!isUnlocked) {
      return (
        <Lock
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
            isLight ? 'text-slate-400' : 'text-slate-500'
          }`}
        />
      );
    }

    if (lesson.keys.length > 0) {
      return (
        <div className="flex flex-col items-center justify-center leading-none">
          <span className="font-orbitron font-black text-xs sm:text-base tracking-wider uppercase drop-shadow-md">
            {lesson.keys.join(' ')}
          </span>
          <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-tight mt-0.5 ${
            isCurrent ? 'text-slate-900/80 font-black' : 'text-white/80'
          }`}>
            Phím
          </span>
        </div>
      );
    }

    if (lesson.rowType === 'review') {
      return <span className="text-xl sm:text-2xl drop-shadow-md">🏆</span>;
    }
    if (lesson.rowType === 'words') {
      return <span className="text-xl sm:text-2xl drop-shadow-md">⚡</span>;
    }
    if (lesson.rowType === 'sentences') {
      return <span className="text-xl sm:text-2xl drop-shadow-md">📜</span>;
    }
    if (lesson.rowType === 'paragraph') {
      return <span className="text-xl sm:text-2xl drop-shadow-md">📖</span>;
    }

    return (
      <span className="font-orbitron font-black text-xs sm:text-base">
        #{lesson.order}
      </span>
    );
  };

  // Node 3D Bevel Styling
  const getNodeColorClass = () => {
    if (!isUnlocked) {
      return isLight
        ? 'bg-slate-200 border-b-4 border-slate-300 text-slate-400 opacity-60 shadow-none'
        : 'bg-slate-900 border-b-4 border-slate-950 text-slate-600 opacity-50 shadow-none';
    }

    if (isCompleted) {
      return isLight
        ? 'bg-gradient-to-b from-emerald-400 to-teal-500 border-b-4 border-emerald-700 text-white shadow-[0_6px_20px_rgba(16,185,129,0.4)]'
        : 'bg-gradient-to-b from-emerald-400 to-emerald-600 border-b-4 border-emerald-800 text-white shadow-[0_8px_25px_rgba(16,185,129,0.5)]';
    }

    if (isCurrent) {
      return 'bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 border-b-4 border-amber-700 text-slate-950 shadow-[0_8px_30px_rgba(245,158,11,0.6)] animate-pulse-glow';
    }

    // Đã mở khoá nhưng chưa hoàn thành
    return isLight
      ? 'bg-gradient-to-b from-sky-400 to-blue-600 border-b-4 border-blue-800 text-white shadow-[0_6px_18px_rgba(56,189,248,0.4)]'
      : 'bg-gradient-to-b from-cyan-500 to-blue-600 border-b-4 border-cyan-800 text-white shadow-[0_8px_25px_rgba(6,182,212,0.45)]';
  };

  return (
    <div
      className="relative flex flex-col items-center my-3.5 sm:my-4 transition-transform duration-300"
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      {/* Current Floating Bouncing Pin */}
      {isCurrent && (
        <div className="absolute -top-11 z-30 animate-bounce pointer-events-none">
          <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 font-game font-black text-xs uppercase px-3 py-1 rounded-xl shadow-[0_4px_18px_rgba(245,158,11,0.8)] flex items-center gap-1.5 border-2 border-white whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
            <span>Luyện Tiếp!</span>
          </div>
          <div className="w-3 h-3 bg-amber-400 rotate-45 mx-auto -mt-2 border-r-2 border-b-2 border-white" />
        </div>
      )}

      {/* Main Node 3D Tactile Button */}
      <button
        onClick={handleClick}
        disabled={!isUnlocked}
        title={lesson.titleVi}
        aria-label={lesson.titleVi}
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center font-game transition-all duration-150 select-none ${
          isUnlocked
            ? 'cursor-pointer hover:scale-108 active:translate-y-1 active:border-b-0 hover:brightness-110'
            : 'cursor-not-allowed'
        } ${getNodeColorClass()} ${
          isCurrent
            ? `ring-4 ring-yellow-300 ring-offset-2 ${isLight ? 'ring-offset-slate-100' : 'ring-offset-slate-950'}`
            : ''
        }`}
      >
        {/* Số thứ tự bài học */}
        {isUnlocked && (
          <span
            className={`text-[9px] sm:text-[10px] font-black uppercase tracking-tight opacity-90 leading-none mb-0.5 ${
              isCurrent ? 'text-slate-950 font-black' : 'text-white'
            }`}
          >
            #{lesson.order}
          </span>
        )}

        {/* Nội dung trung tâm */}
        <div className="flex items-center justify-center">
          {renderNodeCenter()}
        </div>

        {/* Completed Badge Indicator */}
        {isCompleted && (
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg">
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[4]" />
          </div>
        )}

        {/* Sao đạt được dưới chân node (nếu đã xong) */}
        {isCompleted && starCount > 0 && (
          <div className="absolute -bottom-2.5 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-slate-950/90 border border-amber-400/80 shadow-md">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                className={`w-3 h-3 ${
                  s <= starCount
                    ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>
        )}
      </button>

      {/* Lesson title or WPM label underneath */}
      <div className="mt-2 text-center pointer-events-none max-w-[130px]">
        {isCompleted && bestWpm > 0 ? (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black shadow-xs ${
              isLight
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/50'
            }`}
          >
            ⚡ {bestWpm} WPM
          </span>
        ) : (
          <span
            className={`text-[11px] sm:text-xs font-black truncate block leading-tight ${
              isLight
                ? isCurrent
                  ? 'text-amber-800'
                  : isUnlocked
                  ? 'text-slate-800'
                  : 'text-slate-400'
                : isCurrent
                ? 'text-yellow-300'
                : isUnlocked
                ? 'text-slate-200'
                : 'text-slate-600'
            }`}
          >
            {lesson.keys.length > 0 ? `Hàng phím ${lesson.keys.join('')}` : lesson.titleVi}
          </span>
        )}
      </div>
    </div>
  );
};
