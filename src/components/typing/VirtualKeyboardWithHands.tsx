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

const FINGER_LABELS: Record<FingerType, string> = {
  pinky: 'Út',
  ring: 'Áp Út',
  middle: 'Giữa',
  index: 'Trỏ',
  thumb: 'Cái'
};

const FINGER_HEIGHT_CLASS: Record<FingerType, string> = {
  thumb: 'h-4 sm:h-5 w-4 sm:w-5',
  index: 'h-7 sm:h-8 w-4 sm:w-5',
  middle: 'h-8 sm:h-9.5 w-4 sm:w-5',
  ring: 'h-7 sm:h-8 w-4 sm:w-5',
  pinky: 'h-5 sm:h-6 w-3.5 sm:w-4.5'
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
  }, [lastFlash?.nonce]);

  const normalizedNext = (nextChar || '').toLowerCase();
  const nextFingerInfo = getFingerInfo(nextChar);

  const renderKey = (char: string, widthClass: string = '') => {
    const isNext = normalizedNext === char;
    const isFlashHit = !!activeFlash && activeFlash.char.toLowerCase() === char;
    const fingerInfo = getFingerInfo(char === ' ' ? ' ' : char);

    let stateClasses = isLight
      ? 'bg-white border-sky-200 border-b-sky-300 text-slate-900 shadow-xs hover:border-sky-400'
      : 'bg-slate-900/90 border-slate-700/80 border-b-slate-950 text-slate-200 shadow-sm hover:border-slate-600';

    if (fingerInfo) {
      stateClasses = `${fingerInfo.bgClass} ${fingerInfo.borderClass} ${fingerInfo.textClass} ${
        isLight ? 'opacity-95 font-black border-b-sky-400/80' : 'opacity-90 font-black border-b-black/60'
      }`;
    }

    if (isNext) {
      stateClasses = isLight
        ? 'bg-amber-300 border-amber-500 border-b-amber-700 text-amber-950 scale-110 -translate-y-1 shadow-[0_6px_20px_rgba(245,158,11,0.5)] ring-3 ring-amber-400 font-black animate-pulse opacity-100 z-20'
        : 'bg-gradient-to-b from-cyan-400 to-teal-500 border-cyan-200 border-b-cyan-800 text-slate-950 scale-110 -translate-y-1 shadow-[0_0_25px_rgba(0,240,255,0.9)] ring-3 ring-cyan-300 font-black animate-pulse opacity-100 z-20';
    }

    if (isFlashHit) {
      stateClasses = activeFlash!.correct
        ? 'bg-emerald-500 border-emerald-300 border-b-emerald-800 text-white scale-105 opacity-100 z-20 shadow-[0_0_18px_rgba(16,185,129,0.8)]'
        : 'bg-rose-600 border-rose-300 border-b-rose-900 text-white scale-95 opacity-100 z-20 shadow-[0_0_18px_rgba(244,63,94,0.8)] animate-shake';
    }

    return (
      <div
        key={char === ' ' ? 'space' : char}
        className={`relative flex items-center justify-center rounded-xl border-2 border-b-4 font-black font-mono text-xs sm:text-base md:text-lg uppercase transition-all duration-100 select-none flex-shrink-0 cursor-default ${stateClasses} ${widthClass}`}
        style={
          widthClass
            ? undefined
            : { width: 'clamp(27px, 5.2vw, 52px)', height: 'clamp(32px, 5.2vw, 52px)' }
        }
      >
        {char === ' ' ? '' : char}

        {/* Home Row Bump Indicator (Gờ nổi phím F và J) */}
        {HOME_ROW_BUMP_KEYS.has(char) && (
          <span
            className={`absolute bottom-1 w-3 sm:w-4 h-1 rounded-full ${
              isLight
                ? 'bg-amber-600 shadow-[0_0_4px_rgba(217,119,6,0.6)]'
                : 'bg-cyan-300 shadow-[0_0_6px_rgba(6,182,212,0.9)]'
            }`}
            title="Gờ nổi phím tổ ấm"
          />
        )}
      </div>
    );
  };

  // Render Cyber Glove (Găng Tay Không Gian)
  const renderHand = (side: 'left' | 'right') => {
    const fingers = side === 'left' ? LEFT_FINGERS : RIGHT_FINGERS;
    const isHandActive = !!nextFingerInfo && (nextFingerInfo.hand === side || nextFingerInfo.hand === 'space');

    return (
      <div className="flex flex-col items-center gap-1">
        {/* Dãy 5 ngón tay với khớp phát sáng */}
        <div className="flex items-end gap-1.5 sm:gap-2 px-2 py-1 rounded-t-2xl">
          {fingers.map((f) => {
            const isFingerActive = isHandActive && nextFingerInfo?.finger === f;
            const fingerName = FINGER_LABELS[f];

            return (
              <div
                key={`${side}-${f}`}
                className={`relative flex flex-col items-center transition-all duration-200 ${
                  isFingerActive ? '-translate-y-2 scale-110 z-10' : ''
                }`}
              >
                {/* Nhãn tên ngón khi đang active */}
                {isFingerActive && (
                  <span
                    className="absolute -top-6 text-[9px] sm:text-[10px] font-black uppercase tracking-tight px-1.5 py-0.2 rounded-md shadow-md whitespace-nowrap animate-bounce"
                    style={{
                      backgroundColor: nextFingerInfo?.dotColorHex || '#00f0ff',
                      color: '#0f172a'
                    }}
                  >
                    {fingerName}
                  </span>
                )}

                {/* Khối đốt ngón tay */}
                <span
                  className={`rounded-full border-2 transition-all duration-200 ${FINGER_HEIGHT_CLASS[f]} ${
                    isFingerActive
                      ? 'border-white animate-pulse shadow-lg ring-2 ring-white/80'
                      : isLight
                      ? 'bg-white border-sky-200 shadow-xs'
                      : 'bg-slate-800/90 border-slate-700/80 opacity-50'
                  }`}
                  style={{
                    backgroundColor: isFingerActive ? nextFingerInfo?.dotColorHex : undefined,
                    boxShadow: isFingerActive ? `0 0 16px ${nextFingerInfo?.dotColorHex}` : undefined
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Lòng găng tay (Cyber Glove Palm Base) */}
        <div
          className={`relative w-20 sm:w-28 md:w-32 h-6 sm:h-7 rounded-t-2xl border-2 transition-colors flex items-center justify-center overflow-hidden ${
            isLight
              ? 'bg-white border-sky-200 shadow-sm'
              : 'bg-slate-900/90 border-slate-700/80 shadow-inner'
          }`}
        >
          {/* Vạch năng lượng chạy giữa lòng bàn tay */}
          <div
            className={`w-10 sm:w-16 h-1 rounded-full ${
              isHandActive
                ? (isLight ? 'bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]' : 'bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]')
                : isLight
                ? 'bg-sky-100'
                : 'bg-slate-800'
            }`}
          />
        </div>

        {/* Nhãn tay Trái / Phải */}
        <span
          className={`text-[10px] sm:text-xs font-black uppercase tracking-wider mt-0.5 transition-colors ${
            isHandActive
              ? (isLight ? 'text-cyan-800 font-extrabold' : 'text-cyan-300 font-extrabold')
              : isLight
              ? 'text-slate-500'
              : 'text-slate-500'
          }`}
        >
          {side === 'left' ? '🖐️ Tay Trái' : 'Tay Phải 🖐️'}
        </span>
      </div>
    );
  };

  return (
    <div className={`select-none ${className}`}>
      {/* 1. Bàn phím ảo Tactile 3D Keycaps */}
      <div
        className={`flex flex-col items-center gap-1.5 sm:gap-2 rounded-3xl p-3 sm:p-5 transition-all shadow-xl ${
          isLight
            ? 'dojo-card-light'
            : 'dojo-card-dark'
        }`}
      >
        {KEY_ROWS.map((row, idx) => (
          <div key={idx} className="flex gap-1 sm:gap-1.5">
            {row.map((char) => renderKey(char))}
          </div>
        ))}
        {/* Phím Spacebar */}
        <div className="pt-1 w-full flex justify-center">
          {renderKey(' ', 'w-2/3 sm:w-1/2 h-8 sm:h-10')}
        </div>
      </div>

      {/* 2. Cyber Gloves — Hai Găng Tay Không Gian */}
      <div className="flex items-end justify-center gap-10 sm:gap-20 md:gap-24 mt-2 sm:mt-3">
        {renderHand('left')}
        {renderHand('right')}
      </div>

      {/* 3. Nhãn văn bản gợi ý ngón tay */}
      {nextChar && (
        <div className="flex justify-center mt-2">
          <FingerGuideBadge currentChar={nextChar} />
        </div>
      )}
    </div>
  );
};
