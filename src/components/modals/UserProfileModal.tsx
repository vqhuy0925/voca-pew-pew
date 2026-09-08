import React, { useState } from 'react';
import { Sparkles, X, Check, Rocket } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';

interface UserProfileModalProps {
  initialName?: string;
  initialAvatar?: string;
  isFirstTime?: boolean;
  onSave: (name: string, avatar: string) => void;
  onClose?: () => void;
}

const AVATAR_OPTIONS = [
  { emoji: '🚀', label: 'Tên Lửa' },
  { emoji: '🐱', label: 'Mèo Vũ Trụ' },
  { emoji: '🐶', label: 'Cún Cứu Hộ' },
  { emoji: '🤖', label: 'Robot' },
  { emoji: '🦄', label: 'Kỳ Lân' },
  { emoji: '🦁', label: 'Sư Tử' },
  { emoji: '🦊', label: 'Cáo Con' },
  { emoji: '⭐', label: 'Ngôi Sao' }
];

const SUGGESTED_NAMES = ['Bé Bắp', 'Alex', 'Bé Sam', 'Minh Anh', 'Bảo Nam', 'Bé Bon'];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  initialName = '',
  initialAvatar = '🚀',
  isFirstTime = false,
  onSave,
  onClose
}) => {
  const [name, setName] = useState<string>(initialName);
  const [avatar, setAvatar] = useState<string>(initialAvatar || '🚀');
  const [error, setError] = useState<string>('');

  const handleSelectAvatar = (emoji: string) => {
    soundFx.playClick();
    setAvatar(emoji);
  };

  const handleSelectSuggestion = (suggestedName: string) => {
    soundFx.playClick();
    setName(suggestedName);
    setError('');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed && isFirstTime) {
      // Default friendly name if child left it blank
      onSave('Phi Hành Gia', avatar);
      soundFx.playClick();
      return;
    }
    if (!trimmed) {
      setError('Bé hãy nhập tên hoặc biệt danh nhé!');
      return;
    }
    soundFx.playClick();
    onSave(trimmed, avatar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#12163b] to-slate-950 border-3 border-cyan-400/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.4)] text-center my-6">
        {/* Close Button (only if not forced first-time setup or user wants to close) */}
        {!isFirstTime && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-sm font-bold mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          {isFirstTime ? 'Chào Mừng Đến Với Vocab Pew Pew' : 'Hồ Sơ Phi Hành Gia'}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white mb-2 tracking-wide">
          {isFirstTime ? 'BẠN TÊN LÀ GÌ NÈ? 🛸' : 'CHỈNH SỬA HỒ SƠ 🌟'}
        </h2>
        <p className="text-sm sm:text-base text-slate-200 mb-6">
          {isFirstTime
            ? 'Hãy chọn một biểu tượng dễ thương và nhập tên của bé để phi thuyền bắt đầu hành trình nhé!'
            : 'Thay đổi tên và biểu tượng hiển thị của bé trong game.'}
        </p>

        {/* Avatar Selector */}
        <div className="mb-6 text-left">
          <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2.5">
            1. Chọn biểu tượng của bạn:
          </label>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {AVATAR_OPTIONS.map((item) => {
              const isSelected = avatar === item.emoji;
              return (
                <button
                  key={item.emoji}
                  type="button"
                  onClick={() => handleSelectAvatar(item.emoji)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-cyan-500/30 border-cyan-400 scale-105 shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                  title={item.label}
                >
                  <span className="text-3xl sm:text-4xl mb-1">{item.emoji}</span>
                  <span className="text-[11px] font-semibold text-slate-300 truncate w-full text-center">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="mb-6 text-left">
          <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
            2. Nhập tên hoặc biệt danh của bé:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
              <span className="text-xl">{avatar}</span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ví dụ: Bé Bắp, Minh An, Alex..."
              maxLength={24}
              autoFocus
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/80 border-2 border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 rounded-2xl text-white font-game font-bold text-lg sm:text-xl placeholder:text-slate-500 placeholder:font-normal outline-none transition shadow-inner"
            />
          </div>

          {error && <p className="text-rose-400 text-xs font-bold mt-2">{error}</p>}

          {/* Quick Name Suggestions */}
          <div className="mt-3 flex items-center flex-wrap gap-1.5">
            <span className="text-xs text-slate-400 mr-1">Gợi ý nhanh:</span>
            {SUGGESTED_NAMES.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSelectSuggestion(sug)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-200 text-xs font-semibold rounded-lg border border-slate-700 hover:border-cyan-400 transition active:scale-95 cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>
        </form>

        {/* Mascot cheer */}
        <div className="flex justify-center mb-6">
          <MascotWidget
            mood="happy"
            customMessage={
              name.trim()
                ? `Chào ${avatar} ${name.trim()}! Cùng bay vào vũ trụ nhé! 🚀`
                : 'Phi hành đoàn sẵn sàng chào đón bé! ✨'
            }
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => handleSubmit()}
            className="w-full py-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-xl sm:text-2xl rounded-2xl border-b-6 border-emerald-600 active:border-b-0 active:translate-y-1.5 shadow-[0_10px_30px_rgba(0,240,255,0.4)] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {isFirstTime ? (
              <>
                <Rocket className="w-6 h-6 stroke-[2.5]" />
                BẮT ĐẦU KHÁM PHÁ!
              </>
            ) : (
              <>
                <Check className="w-6 h-6 stroke-[3]" />
                LƯU HỒ SƠ
              </>
            )}
          </button>

          {isFirstTime && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onSave('Phi Hành Gia', avatar);
              }}
              className="py-2 text-xs text-slate-400 hover:text-cyan-300 transition cursor-pointer underline underline-offset-4"
            >
              Để sau (Sử dụng tên mặc định "Phi Hành Gia")
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
