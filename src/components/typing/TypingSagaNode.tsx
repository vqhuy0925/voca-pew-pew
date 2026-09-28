import React from 'react';
import { TypingLesson } from '../../data/typing-curriculum';
import { TypingLessonProgress } from '../../data/typing-progress-types';
import { Lock, Check, Sparkles } from 'lucide-react';
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

  const handleClick = () => {
    if (!isUnlocked) {
      soundFx.playWrong();
      return;
    }
    soundFx.playClick();
    onSelect(lesson);
  };

  // Label text inside node (key focus or icon)
  const renderNodeCenter = () => {
    if (!isUnlocked) {
      return <Lock className={`w-5 h-5 sm:w-6 sm:h-6 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />;
    }

    if (lesson.keys.length > 0) {
      return (
        <span className="font-orbitron font-black text-xs sm:text-sm tracking-wider uppercase drop-shadow-sm">
          {lesson.keys.join(' ')}
        </span>
      );
    }

    if (lesson.rowType === 'review') {
      return <span className="text-lg sm:text-xl drop-shadow-sm">🏆</span>;
    }
    if (lesson.rowType === 'words') {
      return <span className="text-lg sm:text-xl drop-shadow-sm">✍️</span>;
    }
    if (lesson.rowType === 'sentences') {
      return <span className="text-lg sm:text-xl drop-shadow-sm">📝</span>;
    }
    if (lesson.rowType === 'paragraph') {
      return <span className="text-lg sm:text-xl drop-shadow-sm">📖</span>;
    }

    return (
      <span className="font-orbitron font-black text-xs sm:text-sm">
        #{lesson.order}
      </span>
    );
  };

  // Node background styling
  const getNodeColorClass = () => {
    if (!isUnlocked) {
      return isLight
        ? 'bg-slate-200 border-b-4 border-slate-300 text-slate-400 opacity-60 shadow-none'
        : 'bg-slate-900 border-b-4 border-slate-950 text-slate-600 opacity-50 shadow-none';
    }

    if (isCompleted) {
      return 'bg-gradient-to-b from-emerald-400 to-teal-600 border-b-4 border-emerald-800 text-white shadow-[0_6px_20px_rgba(16,185,129,0.35)]';
    }

    if (isCurrent) {
      return 'bg-gradient-to-b from-sky-400 via-cyan-400 to-teal-400 border-b-4 border-cyan-800 text-slate-950 shadow-[0_8px_25px_rgba(6,182,212,0.5)]';
    }

    // Unlocked but not completed yet
    return isLight
      ? 'bg-gradient-to-b from-violet-500 to-indigo-600 border-b-4 border-violet-800 text-white shadow-[0_6px_15px_rgba(139,92,246,0.3)]'
      : 'bg-gradient-to-b from-violet-600 to-indigo-700 border-b-4 border-violet-950 text-white shadow-[0_6px_20px_rgba(124,58,237,0.4)]';
  };

  return (
    <div
      className="relative flex flex-col items-center my-3.5 sm:my-4 transition-transform duration-300"
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      {/* Current Floating Bouncing Pin */}
      {isCurrent && (
        <div className="absolute -top-10 z-20 animate-bounce pointer-events-none">
          <div className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-slate-950 font-game font-black text-[11px] sm:text-xs uppercase px-3 py-1 rounded-xl shadow-[0_4px_16px_rgba(0,240,255,0.7)] flex items-center gap-1 border border-white/80 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span>Luyện Tập</span>
          </div>
          <div className="w-2.5 h-2.5 bg-teal-300 rotate-45 mx-auto -mt-1.5 border-r border-b border-white/80" />
        </div>
      )}

      {/* Main Node Button */}
      <button
        onClick={handleClick}
        disabled={!isUnlocked}
        title={lesson.titleVi}
        aria-label={lesson.titleVi}
        className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center font-game transition-all duration-150 select-none ${
          isUnlocked
            ? 'cursor-pointer hover:scale-108 active:translate-y-1 active:border-b-0 hover:brightness-110'
            : 'cursor-not-allowed'
        } ${getNodeColorClass()} ${
          isCurrent
            ? `ring-4 ring-cyan-400 ring-offset-2 ${isLight ? 'ring-offset-slate-100' : 'ring-offset-slate-950'}`
            : ''
        }`}
      >
        {/* Top small lesson order indicator */}
        {isUnlocked && (
          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-tighter opacity-80 leading-none mb-0.5 ${
            isCurrent ? 'text-slate-900 font-extrabold' : 'text-white/90'
          }`}>
            #{lesson.order}
          </span>
        )}

        {/* Center Content */}
        <div className="flex items-center justify-center">
          {renderNodeCenter()}
        </div>

        {/* Completed Badge Indicator */}
        {isCompleted && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[3.5]" />
          </div>
        )}
      </button>

      {/* Lesson title or WPM label underneath */}
      <div className="mt-1.5 text-center pointer-events-none max-w-[120px]">
        {isCompleted && progress?.bestWpm ? (
          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black shadow-xs ${
            isLight
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }`}>
            {progress.bestWpm} WPM
          </span>
        ) : (
          <span className={`text-[10px] sm:text-xs font-bold truncate block ${
            isLight
              ? (isCurrent ? 'text-violet-700 font-black' : isUnlocked ? 'text-slate-700' : 'text-slate-400')
              : (isCurrent ? 'text-cyan-300 font-black' : isUnlocked ? 'text-slate-300' : 'text-slate-600')
          }`}>
            {lesson.keys.length > 0 ? `Phím ${lesson.keys.join('')}` : lesson.title}
          </span>
        )}
      </div>
    </div>
  );
};
