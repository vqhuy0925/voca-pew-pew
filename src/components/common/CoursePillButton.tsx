import React from 'react';
import { ChevronDown } from 'lucide-react';
import { UserProgress } from '../../data/progress-types';
import { getRealmById } from '../../data/learning-path-data';
import { soundFx } from '../../game/engine/SoundController';

interface CoursePillButtonProps {
  progress: UserProgress;
  activeMode: 'saga' | 'dojo';
  onClick: () => void;
  className?: string;
  isLight?: boolean;
}

export const CoursePillButton: React.FC<CoursePillButtonProps> = ({
  progress,
  activeMode,
  onClick,
  className = '',
  isLight = false
}) => {
  const currentRealm = getRealmById(progress.selectedRealmId || 'realm-1');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    onClick();
  };

  const isDojo = activeMode === 'dojo';

  return (
    <button
      onClick={handleClick}
      type="button"
      title="Bấm để đổi môn học hoặc cõi thiên hà (Chuẩn Duolingo)"
      aria-label="Đổi môn học"
      className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer active:scale-95 shadow-sm shrink-0 whitespace-nowrap ${
        isLight
          ? isDojo
            ? 'bg-violet-50 hover:bg-violet-100 border-violet-300 text-violet-950 shadow-violet-200/50'
            : 'bg-cyan-50 hover:bg-cyan-100 border-cyan-300 text-cyan-950 shadow-cyan-200/50'
          : isDojo
          ? 'bg-purple-950/70 hover:bg-purple-900/80 border-purple-500/60 hover:border-purple-400 text-purple-200 shadow-purple-500/20'
          : 'bg-slate-900/90 hover:bg-slate-800/95 border-cyan-500/50 hover:border-cyan-400 text-cyan-200 shadow-cyan-500/20'
      } ${className}`}
    >
      {/* Course Icon */}
      <span className="text-base sm:text-xl drop-shadow leading-none">
        {isDojo ? '⌨️' : (currentRealm.icon || '🚀')}
      </span>

      {/* Course Text */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1">
          <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider ${
            isLight
              ? isDojo ? 'text-violet-700' : 'text-cyan-700'
              : isDojo ? 'text-purple-300' : 'text-cyan-400'
          }`}>
            {isDojo ? 'Bộ Môn' : `Cõi ${currentRealm.realmNumber}`}
          </span>
          {!isDojo && currentRealm.cefrLevel && (
            <span className={`hidden md:inline text-[9px] font-black px-1 rounded ${
              isLight ? 'bg-amber-200 text-amber-900' : 'bg-amber-500/25 text-amber-300 border border-amber-400/40'
            }`}>
              {currentRealm.cefrLevel}
            </span>
          )}
        </div>
        <span className={`font-game font-black text-xs sm:text-sm truncate max-w-[110px] sm:max-w-[160px] md:max-w-[200px] ${
          isLight ? 'text-slate-900' : 'text-white group-hover:text-cyan-200'
        }`}>
          {isDojo ? 'Typing Dojo' : `Tiếng Anh (${currentRealm.ageRange})`}
        </span>
      </div>

      {/* Down Chevron */}
      <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-0.5 ml-0.5 ${
        isLight
          ? isDojo ? 'text-violet-600' : 'text-cyan-700'
          : isDojo ? 'text-purple-400' : 'text-cyan-400'
      }`} />
    </button>
  );
};
