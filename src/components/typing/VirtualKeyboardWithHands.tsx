import React, { useEffect, useState } from 'react';
import { getFingerInfo, FingerType } from '../../data/finger-guide';
import { FingerGuideBadge } from '../common/FingerGuideBadge';

export interface TypingKeyFlash {
  char: string;
  correct: boolean;
  nonce: number;
}

interface VirtualKeyboardWithHandsProps {
  /** Ký tự cần gõ tiếp theo — được tô sáng "next-to-press" trên bàn phím và bàn tay. */
  nextChar?: string;
  /** Kết quả lần gõ gần nhất — chớp xanh (đúng) / đỏ (sai) trên đúng phím vừa gõ. */
  lastFlash?: TypingKeyFlash | null;
  /** Bật giao diện nền sáng (Light mode) */
  isLight?: boolean;
  className?: string;
}

const KEY_ROWS: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];

const HOME_ROW_BUMP_KEYS = new Set(['f', 'j']);

const LEFT_FINGERS: FingerType[] = ['pinky', 'ring', 'middle', 'index', 'thumb'];
const RIGHT_FINGERS: FingerType[] = ['thumb', 'index', 'middle', 'ring', 'pinky'];

const FINGER_HEIGHT_CLASS: Record<FingerType, string> = {
  thumb: 'h-5 sm:h-6',
  index: 'h-8 sm:h-10',
  middle: 'h-9 sm:h-11',
  ring: 'h-8 sm:h-10',
  pinky: 'h-6 sm:h-8'
};

export const VirtualKeyboardWithHands: React.FC<VirtualKeyboardWithHandsProps> = ({
  nextChar,
  lastFlash,
  isLight = false,
  className = ''
}) => {
  const [activeFlash, setActiveFlash] = useState<TypingKeyFlash | null>(null);

  useEffect(() => {
    if (!lastFlash) return;
    setActiveFlash(lastFlash);
    const timer = setTimeout(() => setActiveFlash(null), 220);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastFlash?.nonce]);

  const normalizedNext = (nextChar || '').toLowerCase();
  const nextFingerInfo = getFingerInfo(nextChar);

  const renderKey = (char: string, widthClass: string = '') => {
    const isNext = normalizedNext === char;
    const isFlashHit = !!activeFlash && activeFlash.char.toLowerCase() === char;
    const fingerInfo = getFingerInfo(char === ' ' ? ' ' : char);

    let stateClasses = isLight
      ? 'bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
      : 'bg-slate-900/80 border-slate-700/80 text-slate-400';

    if (fingerInfo) {
      stateClasses = `${fingerInfo.bgClass} ${fingerInfo.borderClass} ${fingerInfo.textClass} ${isLight ? 'opacity-90 font-bold' : 'opacity-80'}`;
    }
    if (isNext) {
      stateClasses = isLight
        ? 'bg-sky-200 border-sky-500 text-sky-950 scale-110 shadow-lg ring-2 ring-sky-400/70 font-black animate-pulse opacity-100 z-10'
        : `${fingerInfo?.bgClass || 'bg-cyan-500/30'} ${fingerInfo?.borderClass || 'border-cyan-300'} text-white scale-110 shadow-lg animate-pulse opacity-100 z-10`;
    }
    if (isFlashHit) {
      stateClasses = activeFlash!.correct
        ? 'bg-emerald-500 border-emerald-300 text-white scale-105 opacity-100 z-10 shadow-md'
        : 'bg-rose-600 border-rose-300 text-white scale-95 opacity-100 z-10 shadow-md';
    }

    return (
      <div
        key={char === ' ' ? 'space' : char}
        className={`relative flex items-center justify-center rounded-lg sm:rounded-xl border-2 font-black font-mono text-xs sm:text-base md:text-lg uppercase transition-all duration-150 select-none flex-shrink-0 ${stateClasses} ${widthClass}`}
        style={
          widthClass
            ? undefined
            : { width: 'clamp(26px, 5.5vw, 54px)', height: 'clamp(28px, 5.5vw, 54px)' }
        }
      >
        {char === ' ' ? '' : char}
        {HOME_ROW_BUMP_KEYS.has(char) && (
          <span className={`absolute bottom-1 w-2.5 sm:w-3.5 h-0.5 sm:h-1 rounded-full ${isLight ? 'bg-slate-700' : 'bg-current opacity-80'}`} />
        )}
      </div>
    );
  };

  const renderHand = (side: 'left' | 'right') => {
    const fingers = side === 'left' ? LEFT_FINGERS : RIGHT_FINGERS;
    const isHandActive = !!nextFingerInfo && (nextFingerInfo.hand === side || nextFingerInfo.hand === 'space');

    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-end gap-1 sm:gap-2">
          {fingers.map((f) => {
            const isFingerActive = isHandActive && nextFingerInfo?.finger === f;
            return (
              <span
                key={`${side}-${f}`}
                className={`w-3 sm:w-4 md:w-5 rounded-full transition-all duration-200 ${FINGER_HEIGHT_CLASS[f]} ${
                  isFingerActive
                    ? 'scale-110 -translate-y-1 animate-pulse ring-2 ring-white/60'
                    : isLight
                    ? 'bg-slate-300 opacity-60'
                    : 'bg-slate-700/70 opacity-50'
                }`}
                style={{
                  backgroundColor: isFingerActive ? nextFingerInfo?.dotColorHex : undefined,
                  boxShadow: isFingerActive ? `0 0 14px ${nextFingerInfo?.dotColorHex}` : undefined
                }}
              />
            );
          })}
        </div>
        <div className={`w-16 sm:w-24 md:w-28 h-7 sm:h-9 md:h-10 rounded-t-full border transition-colors ${
          isLight
            ? 'bg-slate-200/90 border-slate-300 shadow-sm'
            : 'bg-slate-800/80 border-slate-700/70'
        }`} />
        <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wide transition-colors ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          {side === 'left' ? 'Tay Trái' : 'Tay Phải'}
        </span>
      </div>
    );
  };

  return (
    <div className={`select-none ${className}`}>
      {/* Bàn phím ảo */}
      <div className={`flex flex-col items-center gap-1.5 sm:gap-2 rounded-2xl p-2.5 sm:p-4 transition-colors ${
        isLight
          ? 'bg-white border-2 border-slate-200 shadow-xl'
          : 'bg-slate-950/70 border border-slate-800/80 shadow-inner'
      }`}>
        {KEY_ROWS.map((row, idx) => (
          <div key={idx} className="flex gap-1 sm:gap-2">
            {row.map((char) => renderKey(char))}
          </div>
        ))}
        <div className="pt-1 w-full flex justify-center">
          {renderKey(' ', 'w-2/3 sm:w-1/2 h-7 sm:h-9')}
        </div>
      </div>

      {/* Hai bàn tay cách điệu, sáng ngón theo phím tiếp theo */}
      <div className="flex items-end justify-center gap-8 sm:gap-16 md:gap-20 mt-3 sm:mt-4">
        {renderHand('left')}
        {renderHand('right')}
      </div>

      {/* Nhãn văn bản gợi ý ngón tay */}
      {nextChar && (
        <div className="flex justify-center mt-2.5">
          <FingerGuideBadge currentChar={nextChar} />
        </div>
      )}
    </div>
  );
};
