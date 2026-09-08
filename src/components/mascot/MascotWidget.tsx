import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export type MascotMood = 'happy' | 'cheering' | 'thinking' | 'celebrating' | 'oopsie';

interface MascotWidgetProps {
  mood?: MascotMood;
  customMessage?: string;
  combo?: number;
  className?: string;
}

const CHEER_MESSAGES = [
  'Đỉnh quá bé ơi! 🌟',
  'Bắn siêu chuẩn! 🚀',
  'Cố lên nào bạn nhỏ! ✨',
  'Tuyệt vời ông mặt trời! ☀️',
  'Siêu sao vũ trụ! 🛸'
];

export const MascotWidget: React.FC<MascotWidgetProps> = ({
  mood = 'happy',
  customMessage,
  combo = 0,
  className = ''
}) => {
  const [bubbleText, setBubbleText] = useState<string>('Chào bé! Cùng học nhé! 🚀');
  const [isWiggling, setIsWiggling] = useState<boolean>(false);

  useEffect(() => {
    if (customMessage) {
      setBubbleText(customMessage);
      triggerWiggle();
      return;
    }

    if (combo > 2) {
      const msg = CHEER_MESSAGES[Math.floor(Math.random() * CHEER_MESSAGES.length)];
      setBubbleText(`${msg} (x${combo})`);
      triggerWiggle();
    } else if (mood === 'oopsie') {
      setBubbleText('Không sao, bé cố lên nhé! ❤️');
      triggerWiggle();
    } else if (mood === 'celebrating') {
      setBubbleText('Hoan hô! Bé xuất sắc quá! 🎉');
      triggerWiggle();
    }
  }, [mood, customMessage, combo]);

  const triggerWiggle = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 800);
  };

  const getMascotAvatar = () => {
    switch (mood) {
      case 'cheering':
      case 'celebrating':
        return '🐶🎉';
      case 'oopsie':
        return '🐶🥺';
      case 'thinking':
        return '🐶🧐';
      default:
        return '🐶🚀';
    }
  };

  return (
    <div className={`relative flex items-center gap-2 select-none ${className}`}>
      {/* Speech Bubble */}
      <div className="relative bg-white text-slate-900 px-4 py-2 rounded-2xl rounded-bl-none text-sm sm:text-base font-extrabold shadow-lg border-2 border-amber-300 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-1.5">
          {mood === 'celebrating' && <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />}
          {mood === 'oopsie' && <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />}
          <span>{bubbleText}</span>
        </div>
      </div>

      {/* Mascot Avatar Icon */}
      <div
        onClick={triggerWiggle}
        className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-2xl sm:text-3xl cursor-pointer transition transform hover:scale-110 active:scale-95 ${
          isWiggling ? 'animate-bounce' : 'animate-float'
        }`}
        title="Cosmo - Bạn đồng hành vũ trụ"
      >
        {getMascotAvatar()}
      </div>
    </div>
  );
};
