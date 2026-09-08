import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { MascotId, UserGender } from '../../data/progress-types';
import { MASCOT_CONFIGS } from '../../data/theme-types';
import { getMascotDynamicContent } from '../../services/personaMessageHelper';

export type MascotMood = 'happy' | 'cheering' | 'thinking' | 'celebrating' | 'oopsie';

interface MascotWidgetProps {
  mascotId?: MascotId;
  mood?: MascotMood;
  customMessage?: string;
  combo?: number;
  userAge?: number;
  gender?: UserGender;
  userName?: string;
  className?: string;
}

export const MascotWidget: React.FC<MascotWidgetProps> = ({
  mascotId = 'cosmo_dog',
  mood = 'happy',
  customMessage,
  combo = 0,
  userAge,
  gender,
  userName,
  className = ''
}) => {
  const mascot = MASCOT_CONFIGS[mascotId] || MASCOT_CONFIGS.cosmo_dog;
  const [bubbleText, setBubbleText] = useState<string>(() =>
    customMessage || getMascotDynamicContent(mascotId, mood, userAge, gender, userName, combo)
  );
  const [isWiggling, setIsWiggling] = useState<boolean>(false);

  useEffect(() => {
    if (customMessage) {
      setBubbleText(customMessage);
      triggerWiggle();
      return;
    }

    const dynamicMsg = getMascotDynamicContent(mascotId, mood, userAge, gender, userName, combo);
    setBubbleText(dynamicMsg);
    triggerWiggle();
  }, [mood, customMessage, combo, mascotId, userAge, gender, userName]);

  const triggerWiggle = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 800);
  };

  const getMascotAvatar = () => {
    switch (mood) {
      case 'cheering':
      case 'celebrating':
        return mascot.avatarCheer;
      case 'oopsie':
        return mascot.avatarOopsie;
      case 'thinking':
        return mascot.avatarThinking;
      default:
        return mascot.avatarBase;
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
        title={`${mascot.name} - ${mascot.speciesVi}`}
      >
        {getMascotAvatar()}
      </div>
    </div>
  );
};

