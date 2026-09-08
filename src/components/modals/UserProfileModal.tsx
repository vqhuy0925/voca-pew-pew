import React, { useState } from 'react';
import { Sparkles, X, Check, Rocket, UserCheck } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';
import { AGE_REALMS, getRealmByAge } from '../../data/learning-path-data';

interface UserProfileModalProps {
  initialName?: string;
  initialAvatar?: string;
  initialAge?: number;
  isFirstTime?: boolean;
  onSave: (name: string, avatar: string, userAge: number) => void;
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

const SUGGESTED_NAMES = ['Bé Bắp', 'Alex', 'Bé Sam', 'Minh Anh', 'Bảo Nam', 'Bé Bon', 'Khánh An', 'Thanh Trúc'];

const AGE_OPTIONS = [
  { age: 7, label: '7 Tuổi (Lớp 2)', icon: '🌱', realmNum: 1 },
  { age: 8, label: '8 Tuổi (Lớp 3)', icon: '🌱', realmNum: 1 },
  { age: 9, label: '9 Tuổi (Lớp 4)', icon: '🚀', realmNum: 2 },
  { age: 10, label: '10 Tuổi (Lớp 4-5)', icon: '🚀', realmNum: 2 },
  { age: 11, label: '11 Tuổi (Lớp 5)', icon: '🛸', realmNum: 3 },
  { age: 12, label: '12 Tuổi (Lớp 6)', icon: '⚡', realmNum: 4 },
  { age: 13, label: '13 Tuổi (Lớp 7)', icon: '⚡', realmNum: 4 },
  { age: 14, label: '14 Tuổi (Lớp 8)', icon: '🔮', realmNum: 5 },
  { age: 15, label: '15 Tuổi (Lớp 9)', icon: '🔮', realmNum: 5 },
  { age: 16, label: '16 Tuổi (Lớp 10)', icon: '👑', realmNum: 6 },
  { age: 17, label: '17 Tuổi (Lớp 11)', icon: '👑', realmNum: 6 },
  { age: 18, label: '18+ Tuổi (Lớp 12 / IELTS)', icon: '👑', realmNum: 6 }
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  initialName = '',
  initialAvatar = '🚀',
  initialAge = 8,
  isFirstTime = false,
  onSave,
  onClose
}) => {
  const [name, setName] = useState<string>(initialName);
  const [avatar, setAvatar] = useState<string>(initialAvatar || '🚀');
  const [age, setAge] = useState<number>(initialAge || 8);
  const [error, setError] = useState<string>('');

  const targetRealm = getRealmByAge(age);

  const handleSelectAvatar = (emoji: string) => {
    soundFx.playClick();
    setAvatar(emoji);
  };

  const handleSelectAge = (selectedAge: number) => {
    soundFx.playClick();
    setAge(selectedAge);
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
      onSave('Phi Hành Gia', avatar, age);
      soundFx.playClick();
      return;
    }
    if (!trimmed) {
      setError('Hãy nhập tên hoặc biệt danh của bạn nhé!');
      return;
    }
    soundFx.playClick();
    onSave(trimmed, avatar, age);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-[#12163b] to-slate-950 border-3 border-cyan-400/80 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,240,255,0.4)] text-center my-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
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
          {isFirstTime ? 'Chào Mừng Đến Với Vocab Pew Pew' : 'Hồ Sơ Học Tập & Đánh Máy'}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white mb-2 tracking-wide">
          {isFirstTime ? 'BẠN TÊN GÌ & BAO NHIÊU TUỔI? 🛸' : 'CẬP NHẬT HỒ SƠ 🌟'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 mb-5">
          Chọn độ tuổi (7-18 tuổi) để hệ thống tự động cá nhân hóa 200 Chương trình học và tốc độ đánh máy phù hợp nhất!
        </p>

        {/* 1. Age Selector */}
        <div className="mb-5 text-left">
          <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-2">
            1. Chọn Độ Tuổi / Khối Lớp của bạn:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {AGE_OPTIONS.map((item) => {
              const isSelected = age === item.age;
              return (
                <button
                  key={item.age}
                  type="button"
                  onClick={() => handleSelectAge(item.age)}
                  className={`p-3 rounded-2xl flex items-center gap-2.5 text-left transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-cyan-500/30 border-cyan-400 scale-[1.02] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-extrabold text-white truncate">{item.label}</div>
                    <div className="text-[11px] text-cyan-300 font-bold">Chương {AGE_REALMS[item.realmNum - 1].startChapter}-{AGE_REALMS[item.realmNum - 1].endChapter}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Target Realm Preview banner */}
          <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/70 to-slate-900 border border-cyan-500/40 flex items-center justify-between text-xs sm:text-sm shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{targetRealm.icon}</span>
              <div className="text-left">
                <div className="font-extrabold text-cyan-300 text-sm">{targetRealm.nameVi} ({targetRealm.ageRange})</div>
                <div className="text-xs text-slate-300 mt-0.5">{targetRealm.wordLengthHint} • Tốc độ mục tiêu: <span className="text-yellow-300 font-bold">{targetRealm.targetWpm}</span></div>
              </div>
            </div>
            <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-xl text-cyan-300 font-extrabold text-xs">
              Chương {targetRealm.startChapter} - {targetRealm.endChapter}
            </div>
          </div>
        </div>

        {/* 2. Avatar Selector */}
        <div className="mb-5 text-left">
          <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-2">
            2. Chọn biểu tượng phi hành gia:
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {AVATAR_OPTIONS.map((item) => {
              const isSelected = avatar === item.emoji;
              return (
                <button
                  key={item.emoji}
                  type="button"
                  onClick={() => handleSelectAvatar(item.emoji)}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-cyan-500/30 border-cyan-400 scale-105 shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                  title={item.label}
                >
                  <span className="text-2xl sm:text-3xl drop-shadow">{item.emoji}</span>
                  <span className="text-xs font-bold text-slate-200 truncate w-full text-center mt-1">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Name Input Form */}
        <form onSubmit={handleSubmit} className="mb-5 text-left">
          <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-2">
            3. Nhập tên hoặc biệt danh của bạn:
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
              className="w-full pl-12 pr-4 py-3 bg-slate-950/80 border-2 border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 rounded-2xl text-white font-game font-bold text-base sm:text-lg placeholder:text-slate-500 placeholder:font-normal outline-none transition shadow-inner"
            />
          </div>

          {error && <p className="text-rose-400 text-xs font-bold mt-2">{error}</p>}

          {/* Quick Name Suggestions */}
          <div className="mt-2.5 flex items-center flex-wrap gap-1.5">
            <span className="text-xs text-slate-400 mr-1">Gợi ý nhanh:</span>
            {SUGGESTED_NAMES.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSelectSuggestion(sug)}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-200 text-xs font-semibold rounded-lg border border-slate-700 hover:border-cyan-400 transition active:scale-95 cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>
        </form>

        {/* Mascot cheer */}
        <div className="flex justify-center mb-5">
          <MascotWidget
            mood="happy"
            customMessage={
              name.trim()
                ? `Chào ${avatar} ${name.trim()} (${age} tuổi)! Cùng chinh phục 200 Chương nhé! 🚀`
                : 'Phi hành đoàn sẵn sàng đồng hành cùng bạn! ✨'
            }
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleSubmit()}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-lg sm:text-xl rounded-2xl border-b-6 border-emerald-600 active:border-b-0 active:translate-y-1.5 shadow-[0_10px_30px_rgba(0,240,255,0.4)] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {isFirstTime ? (
              <>
                <Rocket className="w-6 h-6 stroke-[2.5]" />
                BẮT ĐẦU KHÁM PHÁ (200 CHƯƠNG)!
              </>
            ) : (
              <>
                <Check className="w-6 h-6 stroke-[3]" />
                LƯU HỒ SƠ & TIẾP TỤC
              </>
            )}
          </button>

          {isFirstTime && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onSave('Phi Hành Gia', avatar, age);
              }}
              className="py-1.5 text-xs text-slate-400 hover:text-cyan-300 transition cursor-pointer underline underline-offset-4"
            >
              Để sau (Sử dụng tên mặc định "Phi Hành Gia")
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
