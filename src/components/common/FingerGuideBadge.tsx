import React from 'react';
import { getFingerInfo, HandSide, FingerType } from '../../data/finger-guide';

interface FingerGuideBadgeProps {
  currentChar?: string;
  className?: string;
}

export const FingerGuideBadge: React.FC<FingerGuideBadgeProps> = ({ currentChar, className = '' }) => {
  const fingerInfo = getFingerInfo(currentChar);

  if (!fingerInfo) return null;

  // Finger order from left to right on left hand: pinky, ring, middle, index, thumb
  // Finger order from left to right on right hand: thumb, index, middle, ring, pinky
  const leftFingers: FingerType[] = ['pinky', 'ring', 'middle', 'index', 'thumb'];
  const rightFingers: FingerType[] = ['thumb', 'index', 'middle', 'ring', 'pinky'];

  const isLeftHandActive = fingerInfo.hand === 'left' || fingerInfo.hand === 'space';
  const isRightHandActive = fingerInfo.hand === 'right' || fingerInfo.hand === 'space';

  return (
    <div
      className={`inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-200 shadow-md ${fingerInfo.bgClass} ${fingerInfo.borderClass} ${className}`}
    >
      {/* Visual Mini Hands Indicator */}
      <div className="flex items-center gap-2 flex-shrink-0 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800/80">
        {/* Left Hand Icon */}
        <div className="flex flex-col items-center">
          <div className="flex items-end gap-0.5 h-4">
            {leftFingers.map((f, i) => {
              const isFingerActive = isLeftHandActive && (fingerInfo.finger === f);
              const heightClass =
                f === 'thumb' ? 'h-2 w-1.5' :
                f === 'index' ? 'h-3.5 w-1.5' :
                f === 'middle' ? 'h-4 w-1.5' :
                f === 'ring' ? 'h-3.5 w-1.5' : 'h-2.5 w-1.5';

              return (
                <span
                  key={`left-${f}-${i}`}
                  className={`rounded-t-sm transition-all duration-200 ${heightClass} ${
                    isFingerActive
                      ? 'scale-110 -translate-y-0.5 animate-pulse'
                      : 'opacity-35 bg-slate-600'
                  }`}
                  style={{
                    backgroundColor: isFingerActive ? fingerInfo.dotColorHex : undefined,
                    boxShadow: isFingerActive ? `0 0 8px ${fingerInfo.dotColorHex}` : undefined
                  }}
                  title={`Tay trái - ${f}`}
                />
              );
            })}
          </div>
          <span className="text-xs font-black text-slate-300 mt-0.5 leading-none">Trái</span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-5 bg-slate-700/60" />

        {/* Right Hand Icon */}
        <div className="flex flex-col items-center">
          <div className="flex items-end gap-0.5 h-4">
            {rightFingers.map((f, i) => {
              const isFingerActive = isRightHandActive && (fingerInfo.finger === f);
              const heightClass =
                f === 'thumb' ? 'h-2 w-1.5' :
                f === 'index' ? 'h-3.5 w-1.5' :
                f === 'middle' ? 'h-4 w-1.5' :
                f === 'ring' ? 'h-3.5 w-1.5' : 'h-2.5 w-1.5';

              return (
                <span
                  key={`right-${f}-${i}`}
                  className={`rounded-t-sm transition-all duration-200 ${heightClass} ${
                    isFingerActive
                      ? 'scale-110 -translate-y-0.5 animate-pulse'
                      : 'opacity-35 bg-slate-600'
                  }`}
                  style={{
                    backgroundColor: isFingerActive ? fingerInfo.dotColorHex : undefined,
                    boxShadow: isFingerActive ? `0 0 8px ${fingerInfo.dotColorHex}` : undefined
                  }}
                  title={`Tay phải - ${f}`}
                />
              );
            })}
          </div>
          <span className="text-xs font-black text-slate-300 mt-0.5 leading-none">Phải</span>
        </div>
      </div>

      {/* Text Label */}
      <div className="flex items-center gap-1.5 text-sm sm:text-base md:text-lg font-game font-black whitespace-nowrap">
        <span className={`${fingerInfo.textClass} font-black`}>
          <span className="sm:hidden">{fingerInfo.hand === 'left' ? 'Trái' : fingerInfo.hand === 'right' ? 'Phải' : '2 Tay'} • {fingerInfo.shortFingerVi}</span>
          <span className="hidden sm:inline">{fingerInfo.handLabelVi} • {fingerInfo.fingerLabelVi}</span>
        </span>
        {fingerInfo.homeKeyBadge && (
          <span className="hidden md:inline-block px-2 py-0.5 text-xs sm:text-sm rounded bg-slate-900/90 text-slate-200 border border-slate-700 font-mono font-black">
            {fingerInfo.homeKeyBadge}
          </span>
        )}
      </div>
    </div>
  );
};
