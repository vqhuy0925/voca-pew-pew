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
  thumb: 'h-5',
  index: 'h-8',
  middle: 'h-9',
  ring: 'h-8',
  pinky: 'h-6'
};

export const VirtualKeyboardWithHands: React.FC<VirtualKeyboardWithHandsProps> = ({
  nextChar,
  lastFlash,
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

    let stateClasses = 'bg-slate-900/80 border-slate-700/80 text-slate-400';
    if (fingerInfo) {
      stateClasses = `${fingerInfo.bgClass} ${fingerInfo.borderClass} ${fingerInfo.textClass} opacity-80`;
    }
    if (isNext) {
      stateClasses = `${fingerInfo?.bgClass || 'bg-cyan-500/30'} ${fingerInfo?.borderClass || 'border-cyan-300'} text-white scale-110 shadow-lg animate-pulse opacity-100`;
    }
    if (isFlashHit) {
      stateClasses = activeFlash!.correct
        ? 'bg-emerald-500/85 border-emerald-300 text-white scale-105 opacity-100'
        : 'bg-rose-600/85 border-rose-300 text-white scale-95 opacity-100';
    }

    return (
      <div
        key={char === ' ' ? 'space' : char}
        className={`relative flex items-center justify-center rounded-lg border-2 font-black font-mono text-xs sm:text-sm uppercase transition-all duration-150 select-none flex-shrink-0 ${stateClasses} ${widthClass}`}
        style={
          widthClass
            ? undefined
            : { width: 'clamp(24px, 7.4vw, 42px)', height: 'clamp(24px, 7.4vw, 42px)' }
        }
      >
        {char === ' ' ? '' : char}
        {HOME_ROW_BUMP_KEYS.has(char) && (
          <span className="absolute bottom-1 w-2.5 h-0.5 rounded-full bg-current opacity-80" />
        )}
      </div>
    );
  };

  const renderHand = (side: 'left' | 'right') => {
    const fingers = side === 'left' ? LEFT_FINGERS : RIGHT_FINGERS;
    const isHandActive = !!nextFingerInfo && (nextFingerInfo.hand === side || nextFingerInfo.hand === 'space');

    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-end gap-1 sm:gap-1.5">
          {fingers.map((f) => {
            const isFingerActive = isHandActive && nextFingerInfo?.finger === f;
            return (
              <span
                key={`${side}-${f}`}
                className={`w-3 sm:w-3.5 rounded-full transition-all duration-200 ${FINGER_HEIGHT_CLASS[f]} ${
                  isFingerActive ? 'scale-110 -translate-y-1 animate-pulse' : 'bg-slate-700/70 opacity-50'
                }`}
                style={{
                  backgroundColor: isFingerActive ? nextFingerInfo?.dotColorHex : undefined,
                  boxShadow: isFingerActive ? `0 0 10px ${nextFingerInfo?.dotColorHex}` : undefined
                }}
              />
            );
          })}
        </div>
        <div className="w-16 sm:w-20 h-7 sm:h-8 rounded-t-full bg-slate-800/80 border border-slate-700/70" />
        <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wide">
          {side === 'left' ? 'Tay Trái' : 'Tay Phải'}
        </span>
      </div>
    );
  };

  return (
    <div className={`select-none ${className}`}>
      {/* Bàn phím ảo */}
      <div className="flex flex-col items-center gap-1 sm:gap-1.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-2 sm:p-3 shadow-inner">
        {KEY_ROWS.map((row, idx) => (
          <div key={idx} className="flex gap-1 sm:gap-1.5">
            {row.map((char) => renderKey(char))}
          </div>
        ))}
        <div className="pt-0.5 w-full flex justify-center">
          {renderKey(' ', 'w-2/3 sm:w-1/2 h-6 sm:h-7')}
        </div>
      </div>

      {/* Hai bàn tay cách điệu, sáng ngón theo phím tiếp theo */}
      <div className="flex items-end justify-center gap-8 sm:gap-14 mt-2.5">
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
