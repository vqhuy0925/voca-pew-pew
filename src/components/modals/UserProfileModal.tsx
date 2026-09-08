import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Check,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Compass,
  CheckCircle2,
  ChevronDown,
  User
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';
import { AGE_REALMS, getRealmByAge, getRealmById } from '../../data/learning-path-data';

interface UserProfileModalProps {
  initialName?: string;
  initialAvatar?: string;
  initialAge?: number;
  initialRealmId?: string;
  isFirstTime?: boolean;
  onSave: (name: string, avatar: string, userAge: number, realmId?: string) => void;
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

const SUGGESTED_NAMES = ['Bé Bắp', 'Minh Anh', 'Alex', 'David', 'Bảo Nam', 'Khánh An', 'Sarah', 'Huy Vũ'];

const AGE_OPTIONS = [
  { age: 8, label: '7 - 8 Tuổi (Lớp 2 - 3)', icon: '🌱', realmNum: 1, desc: 'Từ 3-5 chữ, ngữ âm cơ bản' },
  { age: 10, label: '9 - 10 Tuổi (Lớp 4 - 5)', icon: '🚀', realmNum: 2, desc: 'Từ ghép, mẫu câu đơn giản' },
  { age: 11, label: '11 Tuổi (Lớp 5 - Chuyển Cấp)', icon: '🛸', realmNum: 3, desc: 'Mở rộng từ vựng & phản xạ' },
  { age: 13, label: '12 - 13 Tuổi (Lớp 6 - 7)', icon: '⚡', realmNum: 4, desc: 'Ngữ pháp A2, câu ghép' },
  { age: 15, label: '14 - 15 Tuổi (Lớp 8 - 9)', icon: '🔮', realmNum: 5, desc: 'Tiền B1, chủ đề xã hội' },
  { age: 17, label: '16 - 18+ Tuổi (Lớp 10 - 12 / IELTS)', icon: '👑', realmNum: 6, desc: 'Học thuật B2, luận điểm' },
  { age: 19, label: 'Người Lớn: Tech & PO Agile', icon: '💼', realmNum: 7, desc: 'Giao tiếp dev, PO, họp sprint' },
  { age: 20, label: 'Người Lớn: Đời Sống & Công Sở', icon: '💬', realmNum: 8, desc: 'Giao tiếp hàng ngày, du lịch' }
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  initialName = '',
  initialAvatar = '🚀',
  initialAge = 8,
  initialRealmId,
  isFirstTime = false,
  onSave,
  onClose
}) => {
  // Step state for first-time wizard: 1 = Name, 2 = Age, 3 = Realm Recommendation
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>(initialName);
  const [avatar, setAvatar] = useState<string>(initialAvatar || '🚀');
  const [age, setAge] = useState<number>(initialAge || 8);
  const [selectedRealmId, setSelectedRealmId] = useState<string>(() => {
    if (initialRealmId) return initialRealmId;
    return getRealmByAge(initialAge || 8).id;
  });
  const [isChangingRealm, setIsChangingRealm] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const currentRecommendedRealm = getRealmByAge(age);
  const activeChosenRealm = getRealmById(selectedRealmId) || currentRecommendedRealm;

  const handleSelectAvatar = (emoji: string) => {
    soundFx.playClick();
    setAvatar(emoji);
  };

  const handleSelectAge = (selectedAge: number) => {
    soundFx.playClick();
    setAge(selectedAge);
    const recRealm = getRealmByAge(selectedAge);
    setSelectedRealmId(recRealm.id);
  };

  const handleSelectSuggestion = (suggestedName: string) => {
    soundFx.playClick();
    setName(suggestedName);
    setError('');
  };

  // Step 1 -> Step 2
  const handleStep1Next = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Hãy nhập tên hoặc biệt danh của bạn nhé!');
      return;
    }
    setError('');
    soundFx.playClick();
    setStep(2);
  };

  // Step 2 -> Step 3
  const handleStep2Next = () => {
    soundFx.playClick();
    setStep(3);
  };

  // Final Submit
  const handleFinalSubmit = () => {
    const finalName = name.trim() || (isFirstTime ? 'Phi Hành Gia' : 'Học Viên');
    soundFx.playClick();
    onSave(finalName, avatar, age, selectedRealmId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-[#12163b] to-slate-950 border-3 border-cyan-400/80 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,240,255,0.4)] text-center my-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button (Only for returning users) */}
        {!isFirstTime && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ----------------- FIRST TIME ONBOARDING WIZARD ----------------- */}
        {isFirstTime ? (
          <div>
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-10 bg-cyan-400' : 'w-4 bg-cyan-800'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-10 bg-cyan-400' : 'w-4 bg-cyan-800'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 3 ? 'w-10 bg-cyan-400' : 'w-4 bg-cyan-800'}`} />
            </div>

            {/* Top Step Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-xs sm:text-sm font-bold mb-3 shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Bước {step} / 3: {step === 1 ? 'Tên Bạn Là Gì?' : step === 2 ? 'Độ Tuổi & Nhu Cầu' : 'Đề Xuất Lộ Trình'}</span>
            </div>

            {/* ================= STEP 1: NAME & AVATAR ================= */}
            {step === 1 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white mb-2 tracking-wide">
                  CHÀO MỪNG PHI HÀNH GIA! 🛸
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mb-5">
                  Hãy nhập tên hoặc biệt danh để Cosmo và phi hành đoàn cùng đồng hành nhé!
                </p>

                {/* Avatar Selection */}
                <div className="mb-5 text-left">
                  <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-2">
                    1. Chọn biểu tượng phi hành gia:
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
                          <span className="text-[11px] font-bold text-slate-200 truncate w-full text-center mt-1">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name Input */}
                <form onSubmit={handleStep1Next} className="mb-5 text-left">
                  <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-2">
                    2. Nhập tên của bạn:
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
                      placeholder="Ví dụ: Bé Bắp, Minh Anh, Alex..."
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
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-200 text-xs font-semibold rounded-lg border border-slate-700 hover:border-cyan-400 transition active:scale-95 cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>

                  {/* Mascot cheer */}
                  <div className="flex justify-center mt-4">
                    <MascotWidget
                      mood="happy"
                      customMessage={
                        name.trim()
                          ? `Chào ${avatar} ${name.trim()}! Hãy nhấn Tiếp Tục để khám phá lộ trình nhé! ✨`
                          : 'Cosmo sẵn sàng đồng hành cùng bạn trên mọi nẻo đường không gian! 🛸'
                      }
                    />
                  </div>
                </form>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-lg rounded-2xl border-b-6 border-emerald-600 active:border-b-0 active:translate-y-1.5 shadow-[0_10px_30px_rgba(0,240,255,0.4)] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>TIẾP TỤC</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            )}

            {/* ================= STEP 2: GREETING & AGE SELECTION ================= */}
            {step === 2 && (
              <div className="animate-in fade-in duration-300">
                {/* Personalized Greeting */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 mb-4 flex items-center gap-3 text-left">
                  <span className="text-4xl">{avatar}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-game font-extrabold text-white">
                      Chào bạn, <span className="text-cyan-300">{name.trim() || 'Phi Hành Gia'}</span>! 🎉
                    </h3>
                    <p className="text-xs text-slate-300">
                      Rất vui được gặp bạn! Hãy chọn độ tuổi để nhận đề xuất lộ trình phù hợp nhất nhé:
                    </p>
                  </div>
                </div>

                {/* Age Options */}
                <div className="mb-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[42vh] overflow-y-auto pr-1">
                    {AGE_OPTIONS.map((item) => {
                      const isSelected = age === item.age;
                      return (
                        <button
                          key={item.age}
                          type="button"
                          onClick={() => handleSelectAge(item.age)}
                          className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer border-2 ${
                            isSelected
                              ? 'bg-cyan-500/30 border-cyan-400 scale-[1.02] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                              : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs sm:text-sm font-extrabold truncate ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                              {item.label}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setStep(1);
                    }}
                    className="px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-game font-bold text-sm rounded-2xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStep2Next}
                    className="flex-1 py-3.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-base sm:text-lg rounded-2xl border-b-6 border-emerald-600 active:border-b-0 active:translate-y-1.5 shadow-[0_10px_30px_rgba(0,240,255,0.4)] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>XEM ĐỀ XUẤT LỘ TRÌNH</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: REALM RECOMMENDATION & CUSTOMIZE ================= */}
            {step === 3 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl sm:text-2xl font-extrabold font-game text-white mb-1.5 tracking-wide">
                  LỘ TRÌNH DÀNH RIÊNG CHO BẠN 🌌
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mb-4">
                  Dựa trên độ tuổi của bạn, chúng mình đã chọn ra Cõi phù hợp nhất. Bạn có thể chọn lại nếu muốn!
                </p>

                {/* Highlighted Recommended / Active Realm Card */}
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-[#10194a]/90 to-slate-900 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.3)] text-left mb-4 relative overflow-hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <span className="text-4xl sm:text-5xl drop-shadow">{activeChosenRealm.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-extrabold uppercase border border-cyan-400/40">
                            Cõi {activeChosenRealm.realmNumber} • ĐỀ XUẤT
                          </span>
                          <span className="text-xs text-slate-300 font-bold">
                            {activeChosenRealm.ageRange}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-game font-black text-white mt-1">
                          {activeChosenRealm.nameVi}
                        </h3>
                        <div className="text-xs text-cyan-300 font-medium mt-0.5">
                          {activeChosenRealm.gradeLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-cyan-500/30 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950/60 p-2 rounded-xl border border-cyan-500/20">
                      <span className="text-slate-400 block text-[11px]">Quy mô bài học:</span>
                      <span className="text-white font-bold">Chương {activeChosenRealm.startChapter} - {activeChosenRealm.endChapter} ({activeChosenRealm.units.length} chương)</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-xl border border-cyan-500/20">
                      <span className="text-slate-400 block text-[11px]">Tốc độ mục tiêu:</span>
                      <span className="text-yellow-300 font-bold">{activeChosenRealm.targetWpm}</span>
                    </div>
                  </div>
                </div>

                {/* Switch Realm Expander */}
                <div className="mb-5 text-left">
                  <button
                    type="button"
                    onClick={() => setIsChangingRealm(!isChangingRealm)}
                    className="w-full py-2 px-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-bold text-cyan-300 flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{isChangingRealm ? 'Thu gọn danh sách' : 'Hoặc tự chọn Cõi khác (Tổng 8 Cõi)'}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isChangingRealm ? 'rotate-180' : ''}`} />
                  </button>

                  {isChangingRealm && (
                    <div className="mt-2 space-y-1.5 max-h-44 overflow-y-auto pr-1 animate-in fade-in duration-200">
                      {AGE_REALMS.map((realm) => {
                        const isSelected = realm.id === selectedRealmId;
                        return (
                          <button
                            key={realm.id}
                            type="button"
                            onClick={() => {
                              soundFx.playClick();
                              setSelectedRealmId(realm.id);
                            }}
                            className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer border ${
                              isSelected
                                ? 'bg-cyan-500/25 border-cyan-400 text-white font-bold'
                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-xl">{realm.icon}</span>
                              <div className="truncate">
                                <div className="text-xs font-bold text-white truncate">{realm.nameVi}</div>
                                <div className="text-[10px] text-slate-400">{realm.gradeLabel} • {realm.ageRange}</div>
                              </div>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setStep(2);
                    }}
                    className="px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-game font-bold text-sm rounded-2xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="flex-1 py-3.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-base sm:text-lg rounded-2xl border-b-6 border-emerald-600 active:border-b-0 active:translate-y-1.5 shadow-[0_10px_30px_rgba(0,240,255,0.4)] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Rocket className="w-5 h-5 stroke-[2.5]" />
                    <span>BẮT ĐẦU HÀNH TRÌNH!</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ----------------- RETURNING USER: EDIT PROFILE & REALM ----------------- */
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-xs sm:text-sm font-bold mb-3 shadow-sm">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Hồ Sơ & Cài Đặt Học Tập</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white mb-2 tracking-wide">
              CẬP NHẬT HỒ SƠ 🌟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-5">
              Chỉnh sửa thông tin cá nhân và lộ trình học tập của bạn
            </p>

            {/* Avatar Selector */}
            <div className="mb-5 text-left">
              <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-2">
                1. Biểu tượng phi hành gia:
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {AVATAR_OPTIONS.map((item) => {
                  const isSelected = avatar === item.emoji;
                  return (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => handleSelectAvatar(item.emoji)}
                      className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-cyan-500/30 border-cyan-400 scale-105 shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                          : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                      }`}
                      title={item.label}
                    >
                      <span className="text-2xl sm:text-3xl drop-shadow">{item.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-5 text-left">
              <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-2">
                2. Tên của bạn:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập tên của bạn..."
                  maxLength={24}
                  className="w-full px-4 py-3 bg-slate-950/80 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl text-white font-game font-bold text-base outline-none transition"
                />
              </div>
              {error && <p className="text-rose-400 text-xs font-bold mt-1.5">{error}</p>}
            </div>

            {/* Age & Goal selector */}
            <div className="mb-5 text-left">
              <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-2">
                3. Độ tuổi / Mục tiêu học:
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                {AGE_OPTIONS.map((item) => {
                  const isSelected = age === item.age;
                  return (
                    <button
                      key={item.age}
                      type="button"
                      onClick={() => handleSelectAge(item.age)}
                      className={`p-2.5 rounded-xl flex items-center gap-2 text-left transition cursor-pointer border ${
                        isSelected
                          ? 'bg-cyan-500/30 border-cyan-400 text-white font-bold shadow-md'
                          : 'bg-slate-800/70 border-slate-700 hover:border-slate-500 text-slate-300'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-xs truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Realm Card */}
            <div className="mb-5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeChosenRealm.icon}</span>
                <div>
                  <div className="text-xs text-slate-400 font-bold">Cõi đang chọn:</div>
                  <div className="font-extrabold text-cyan-300 text-sm">{activeChosenRealm.nameVi}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChangingRealm(!isChangingRealm)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-slate-700 transition cursor-pointer"
              >
                Đổi Cõi ➔
              </button>
            </div>

            {isChangingRealm && (
              <div className="mb-5 space-y-1.5 max-h-40 overflow-y-auto pr-1 text-left">
                {AGE_REALMS.map((realm) => {
                  const isSelected = realm.id === selectedRealmId;
                  return (
                    <button
                      key={realm.id}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedRealmId(realm.id);
                        setIsChangingRealm(false);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? 'bg-cyan-500/25 border-cyan-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-xl">{realm.icon}</span>
                        <span className="text-xs font-bold text-white truncate">{realm.nameVi} ({realm.ageRange})</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Save Button */}
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-lg rounded-2xl border-b-6 border-emerald-600 active:border-b-0 active:translate-y-1.5 shadow-[0_10px_30px_rgba(0,240,255,0.4)] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>LƯU HỒ SƠ & TIẾP TỤC</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
