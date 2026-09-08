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
  User,
  Palette,
  Heart
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';
import { AGE_REALMS, getRealmByAge, getRealmById } from '../../data/learning-path-data';
import { UserGender, ThemeStyle, MascotId } from '../../data/progress-types';
import {
  THEME_CONFIGS,
  MASCOT_CONFIGS,
  AVATAR_LIST,
  SUGGESTED_NAMES_BY_GENDER
} from '../../data/theme-types';

interface UserProfileModalProps {
  initialName?: string;
  initialAvatar?: string;
  initialAge?: number;
  initialRealmId?: string;
  initialGender?: UserGender;
  initialTheme?: ThemeStyle;
  initialMascotId?: MascotId;
  isFirstTime?: boolean;
  onSave: (
    name: string,
    avatar: string,
    userAge: number,
    realmId?: string,
    gender?: UserGender,
    themeStyle?: ThemeStyle,
    mascotId?: MascotId
  ) => void;
  onClose?: () => void;
}

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

const QUICK_AVATARS_BY_GENDER: Record<UserGender, string[]> = {
  girl: ['🦄', '🌸', '🐱', '🧚‍♀️', '👑', '💖', '🎀'],
  boy: ['🚀', '⚡', '🤖', '🦁', '🦖', '🐶', '🏎️'],
  neutral: ['🌟', '🪐', '🛸', '🐼', '🎨', '🌈', '🍀']
};

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  initialName = '',
  initialAvatar = '🚀',
  initialAge = 8,
  initialRealmId,
  initialGender = 'neutral',
  initialTheme = 'cosmic_cyan',
  initialMascotId = 'cosmo_dog',
  isFirstTime = false,
  onSave,
  onClose
}) => {
  // Step state for first-time wizard: 1 = Name & Identity, 2 = Age & Goal, 3 = Realm Recommendation
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>(initialName);
  const [avatar, setAvatar] = useState<string>(initialAvatar || '🚀');
  const [gender, setGender] = useState<UserGender>(initialGender);
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>(initialTheme);
  const [mascotId, setMascotId] = useState<MascotId>(initialMascotId);
  const [avatarFilter, setAvatarFilter] = useState<'all' | 'girl' | 'boy' | 'neutral'>('all');
  const [showAvatarPicker, setShowAvatarPicker] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [age, setAge] = useState<number>(initialAge || 8);
  const [selectedRealmId, setSelectedRealmId] = useState<string>(() => {
    if (initialRealmId) return initialRealmId;
    return getRealmByAge(initialAge || 8).id;
  });
  const [isChangingRealm, setIsChangingRealm] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const currentTheme = THEME_CONFIGS[themeStyle] || THEME_CONFIGS.cosmic_cyan;
  const currentMascot = MASCOT_CONFIGS[mascotId] || MASCOT_CONFIGS.cosmo_dog;
  const currentRecommendedRealm = getRealmByAge(age);
  const activeChosenRealm = getRealmById(selectedRealmId) || currentRecommendedRealm;
  const quickAvatars = QUICK_AVATARS_BY_GENDER[gender] || QUICK_AVATARS_BY_GENDER.neutral;

  const handleSelectGender = (selectedGender: UserGender) => {
    soundFx.playClick();
    setGender(selectedGender);
    // Suggest suitable theme and default avatar if changing for first time
    if (selectedGender === 'girl') {
      setThemeStyle('sweet_sakura');
      setMascotId('luna_cat');
      setAvatarFilter('girl');
      if (avatar === '🚀' || avatar === '🤖' || !initialName) {
        setAvatar('🦄');
      }
    } else if (selectedGender === 'boy') {
      setThemeStyle('cosmic_cyan');
      setMascotId('cosmo_dog');
      setAvatarFilter('boy');
      if (avatar === '🦄' || avatar === '🌸' || !initialName) {
        setAvatar('🚀');
      }
    } else {
      setThemeStyle('galaxy_purple');
      setMascotId('stella_unicorn');
      setAvatarFilter('neutral');
      if (!initialName) {
        setAvatar('🌟');
      }
    }
  };

  const handleSelectAvatar = (emoji: string) => {
    soundFx.playClick();
    setAvatar(emoji);
  };

  const handleSelectTheme = (themeKey: ThemeStyle) => {
    soundFx.playClick();
    setThemeStyle(themeKey);
  };

  const handleSelectMascot = (mId: MascotId) => {
    soundFx.playClick();
    setMascotId(mId);
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
    const defaultFallbackName = gender === 'girl' ? 'Công Chúa Ngân Hà' : gender === 'boy' ? 'Phi Hành Gia' : 'Nhà Thám Hiểm';
    const finalName = name.trim() || (isFirstTime ? defaultFallbackName : 'Học Viên');
    soundFx.playClick();
    onSave(finalName, avatar, age, selectedRealmId, gender, themeStyle, mascotId);
  };

  const filteredAvatars = avatarFilter === 'all'
    ? AVATAR_LIST
    : AVATAR_LIST.filter(a => a.category === avatarFilter);

  const suggestedNames = SUGGESTED_NAMES_BY_GENDER[gender] || SUGGESTED_NAMES_BY_GENDER.neutral;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl bg-gradient-to-b ${currentTheme.bgGradient} border-3 ${currentTheme.borderAccent} rounded-3xl p-5 sm:p-7 text-center my-6 max-h-[92vh] overflow-y-auto`}
        style={{ boxShadow: `0 0 50px ${currentTheme.glowColor}` }}
      >
        {/* Close Button (Only for returning users) */}
        {!isFirstTime && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer z-20 border border-slate-700"
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
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-10 bg-pink-400' : 'w-4 bg-slate-700'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-10 bg-pink-400' : 'w-4 bg-slate-700'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 3 ? 'w-10 bg-pink-400' : 'w-4 bg-slate-700'}`} />
            </div>

            {/* Top Step Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white text-xs sm:text-sm font-bold mb-3 shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>
                Bước {step} / 3: {step === 1 ? 'Chọn Phong Cách & Tên Của Bạn' : step === 2 ? 'Độ Tuổi & Mục Tiêu' : 'Đề Xuất Lộ Trình'}
              </span>
            </div>

            {/* ================= STEP 1: GENDER, NAME, AVATAR (MINIMALIST & CLEAN) ================= */}
            {step === 1 && (
              <div className="animate-in fade-in duration-300 space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-game text-white mb-1 tracking-wide">
                    CHÀO MỪNG BẠN! ✨
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Chọn phong cách để tự động thiết lập giao diện và bạn đồng hành nhé!
                  </p>
                </div>

                {/* 1. HERO PERSONA SELECTOR (Auto-sets Theme, Mascot & Default Avatar) */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                  {/* Girl */}
                  <button
                    type="button"
                    onClick={() => handleSelectGender('girl')}
                    className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer border-2 ${
                      gender === 'girl'
                        ? 'bg-pink-500/25 border-pink-400 scale-[1.03] shadow-[0_0_20px_rgba(244,114,182,0.5)] ring-2 ring-pink-400/50'
                        : 'bg-slate-900/70 border-slate-700/80 hover:border-pink-400/50 hover:bg-slate-900'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl drop-shadow mb-1">👧💖</span>
                    <span className="font-game font-black text-xs sm:text-sm text-pink-200">
                      Bé Gái
                    </span>
                    <span className="text-[10px] text-pink-300/70 mt-0.5 hidden sm:block">
                      Dễ thương & Luna 🐱
                    </span>
                  </button>

                  {/* Boy */}
                  <button
                    type="button"
                    onClick={() => handleSelectGender('boy')}
                    className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer border-2 ${
                      gender === 'boy'
                        ? 'bg-cyan-500/25 border-cyan-400 scale-[1.03] shadow-[0_0_20px_rgba(0,240,255,0.5)] ring-2 ring-cyan-400/50'
                        : 'bg-slate-900/70 border-slate-700/80 hover:border-cyan-400/50 hover:bg-slate-900'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl drop-shadow mb-1">👦⚡</span>
                    <span className="font-game font-black text-xs sm:text-sm text-cyan-200">
                      Bé Trai
                    </span>
                    <span className="text-[10px] text-cyan-300/70 mt-0.5 hidden sm:block">
                      Năng động & Cosmo 🐶
                    </span>
                  </button>

                  {/* Explorer / Neutral */}
                  <button
                    type="button"
                    onClick={() => handleSelectGender('neutral')}
                    className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer border-2 ${
                      gender === 'neutral'
                        ? 'bg-purple-500/25 border-purple-400 scale-[1.03] shadow-[0_0_20px_rgba(192,132,252,0.5)] ring-2 ring-purple-400/50'
                        : 'bg-slate-900/70 border-slate-700/80 hover:border-purple-400/50 hover:bg-slate-900'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl drop-shadow mb-1">🌟🪐</span>
                    <span className="font-game font-black text-xs sm:text-sm text-purple-200">
                      Tự Do
                    </span>
                    <span className="text-[10px] text-purple-300/70 mt-0.5 hidden sm:block">
                      Vũ trụ & Stella 🦄
                    </span>
                  </button>
                </div>

                {/* 2. UNIFIED NAME & AVATAR BOX */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-3">
                  {/* Name Input with Avatar Trigger */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-cyan-300 mb-1.5 flex items-center justify-between">
                      <span>Tên hoặc biệt danh của bạn:</span>
                      <span className="text-[11px] text-slate-400 font-normal">Tối đa 24 ký tự</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {/* Avatar Bubble Button */}
                      <button
                        type="button"
                        onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                        className="relative w-12 h-12 rounded-2xl bg-slate-900 border-2 border-cyan-400/60 hover:border-cyan-300 flex items-center justify-center text-2xl shadow-inner transition hover:scale-105 cursor-pointer flex-shrink-0 group"
                        title="Bấm để đổi biểu tượng đại diện"
                      >
                        <span className="drop-shadow">{avatar}</span>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[9px] text-slate-950 font-black flex items-center justify-center border border-slate-950">
                          ✎
                        </span>
                      </button>

                      {/* Input */}
                      <div className="flex-1">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError('');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleStep1Next();
                            }
                          }}
                          placeholder={
                            gender === 'girl'
                              ? 'Ví dụ: Bảo Ngọc, Hà My, Sarah...'
                              : gender === 'boy'
                              ? 'Ví dụ: Minh Khang, Alex, Gia Huy...'
                              : 'Ví dụ: Sunny, Sky, Bé Bắp...'
                          }
                          maxLength={24}
                          autoFocus
                          className="w-full px-3.5 py-2.5 bg-slate-900/90 border-2 border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 rounded-xl text-white font-game font-bold text-base placeholder:text-slate-500 placeholder:font-normal outline-none transition"
                        />
                      </div>
                    </div>

                    {error && <p className="text-rose-400 text-xs font-bold mt-1.5">{error}</p>}
                  </div>

                  {/* Quick Avatar Row */}
                  <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
                    <span className="text-[11px] font-bold text-slate-400 flex-shrink-0 mr-1">Biểu tượng:</span>
                    {quickAvatars.map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => handleSelectAvatar(em)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg transition cursor-pointer border flex-shrink-0 ${
                          avatar === em
                            ? 'bg-cyan-500/30 border-cyan-400 scale-110 shadow-sm'
                            : 'bg-slate-900 border-slate-700/80 hover:border-slate-500'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                      className={`px-2 py-1 rounded-xl text-[10px] font-bold border transition flex-shrink-0 cursor-pointer ${
                        showAvatarPicker
                          ? 'bg-purple-600 border-purple-400 text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      {showAvatarPicker ? 'Đóng ✕' : '+ Thêm'}
                    </button>
                  </div>

                  {/* Expanded Avatar Picker Grid (Only when clicked '+ Thêm') */}
                  {showAvatarPicker && (
                    <div className="p-2.5 bg-slate-900/95 rounded-xl border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-purple-300">Tất cả biểu tượng:</span>
                        <div className="flex gap-1 text-[10px] font-bold">
                          {(['all', 'girl', 'boy', 'neutral'] as const).map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setAvatarFilter(cat)}
                              className={`px-2 py-0.5 rounded-lg transition ${
                                avatarFilter === cat
                                  ? 'bg-purple-600 text-white'
                                  : 'text-slate-400 hover:text-white bg-slate-950/60'
                              }`}
                            >
                              {cat === 'all' ? 'Tất cả' : cat === 'girl' ? 'Nữ 💖' : cat === 'boy' ? 'Nam ⚡' : 'Vũ trụ 🌟'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 max-h-32 overflow-y-auto p-1 bg-slate-950/80 rounded-lg border border-slate-800">
                        {filteredAvatars.map((item) => (
                          <button
                            key={item.emoji}
                            type="button"
                            onClick={() => {
                              handleSelectAvatar(item.emoji);
                              setShowAvatarPicker(false);
                            }}
                            className={`p-1.5 rounded-lg flex items-center justify-center text-xl transition cursor-pointer border ${
                              avatar === item.emoji
                                ? 'bg-purple-500/40 border-purple-400 scale-110 shadow-sm'
                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
                            }`}
                            title={item.label}
                          >
                            {item.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Name Suggestions */}
                  <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
                    <span className="text-[11px] font-bold text-slate-400 mr-1">Gợi ý tên:</span>
                    {suggestedNames.slice(0, 6).map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => handleSelectSuggestion(sug)}
                        className="px-2.5 py-0.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-semibold rounded-lg border border-slate-700/80 hover:border-cyan-400/80 transition active:scale-95 cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. OPTIONAL ADVANCED CUSTOMIZATION (THEME & MASCOT) */}
                <div className="text-left">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full py-2 px-3 bg-slate-950/50 hover:bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-300 flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-pink-400" />
                      <span>
                        Tùy chỉnh thêm màu sắc & bạn đồng hành ({currentTheme.nameEn} • {currentMascot.name})
                      </span>
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  </button>

                  {showAdvanced && (
                    <div className="mt-2.5 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-200">
                      {/* Theme Palette */}
                      <div>
                        <span className="text-[11px] font-extrabold uppercase text-cyan-300 block mb-1.5">
                          Tông màu giao diện:
                        </span>
                        <div className="grid grid-cols-5 gap-1.5">
                          {(Object.keys(THEME_CONFIGS) as ThemeStyle[]).map((tKey) => {
                            const t = THEME_CONFIGS[tKey];
                            const isSelected = themeStyle === tKey;
                            return (
                              <button
                                key={tKey}
                                type="button"
                                onClick={() => handleSelectTheme(tKey)}
                                className={`p-1.5 rounded-xl flex flex-col items-center justify-center transition cursor-pointer border ${
                                  isSelected
                                    ? `${t.cardBg} ${t.borderAccent} shadow-sm ring-1 ring-white/40`
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                                }`}
                              >
                                <span className="text-lg">{t.icon}</span>
                                <span className={`text-[10px] font-bold mt-0.5 truncate w-full text-center ${isSelected ? t.textColor : 'text-slate-300'}`}>
                                  {t.nameEn}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mascot Companion */}
                      <div>
                        <span className="text-[11px] font-extrabold uppercase text-amber-300 block mb-1.5">
                          Bạn đồng hành:
                        </span>
                        <div className="grid grid-cols-5 gap-1.5">
                          {(Object.keys(MASCOT_CONFIGS) as MascotId[]).map((mKey) => {
                            const m = MASCOT_CONFIGS[mKey];
                            const isSelected = mascotId === mKey;
                            return (
                              <button
                                key={mKey}
                                type="button"
                                onClick={() => handleSelectMascot(mKey)}
                                className={`p-1.5 rounded-xl flex flex-col items-center justify-center transition cursor-pointer border ${
                                  isSelected
                                    ? 'bg-amber-500/25 border-amber-400 text-white font-bold shadow-sm'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-amber-400/50'
                                }`}
                              >
                                <span className="text-lg">{m.icon}</span>
                                <span className="text-[10px] font-bold mt-0.5 truncate w-full text-center">{m.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Compact Mascot Cheer */}
                <div className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <span className="text-xl flex-shrink-0">{currentMascot.icon}</span>
                  <span className="truncate">
                    <strong className="text-white">{currentMascot.name}:</strong> "{name.trim() ? `Rất vui được đồng hành cùng bạn ${name.trim()}!` : currentMascot.greeting}"
                  </span>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className={`w-full py-3.5 bg-gradient-to-r ${currentTheme.buttonGradient} text-slate-950 font-game font-black text-base sm:text-lg rounded-2xl border-b-6 ${currentTheme.buttonBorder} active:border-b-0 active:translate-y-1.5 transition flex items-center justify-center gap-2 cursor-pointer`}
                  style={{ boxShadow: `0 10px 30px ${currentTheme.glowColor}` }}
                >
                  <span>TIẾP TỤC BƯỚC 2</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            )}

            {/* ================= STEP 2: AGE & LEARNING GOAL ================= */}
            {step === 2 && (
              <div className="animate-in fade-in duration-300 space-y-4">
                {/* Personalized Greeting */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 text-left">
                  <span className="text-4xl">{avatar}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-game font-extrabold text-white">
                      Chào mừng, <span className={currentTheme.textColor}>{name.trim() || 'Phi Hành Gia'}</span>! 🎉
                    </h3>
                    <p className="text-xs text-slate-300">
                      Hãy chọn độ tuổi để nhận đề xuất lộ trình từ vựng chuẩn xác nhất nhé:
                    </p>
                  </div>
                </div>

                {/* Age Options Grid */}
                <div className="text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[44vh] overflow-y-auto pr-1">
                    {AGE_OPTIONS.map((item) => {
                      const isSelected = age === item.age;
                      return (
                        <button
                          key={item.age}
                          type="button"
                          onClick={() => handleSelectAge(item.age)}
                          className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer border-2 ${
                            isSelected
                              ? 'bg-purple-500/30 border-purple-400 scale-[1.02] shadow-[0_0_15px_rgba(192,132,252,0.4)]'
                              : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
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
                <div className="flex items-center gap-3 pt-2">
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
                    className={`flex-1 py-3.5 bg-gradient-to-r ${currentTheme.buttonGradient} text-slate-950 font-game font-black text-base sm:text-lg rounded-2xl border-b-6 ${currentTheme.buttonBorder} active:border-b-0 active:translate-y-1.5 transition flex items-center justify-center gap-2 cursor-pointer`}
                    style={{ boxShadow: `0 10px 30px ${currentTheme.glowColor}` }}
                  >
                    <span>XEM ĐỀ XUẤT LỘ TRÌNH</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: REALM RECOMMENDATION & CONFIRMATION ================= */}
            {step === 3 && (
              <div className="animate-in fade-in duration-300 space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-game text-white mb-1 tracking-wide">
                    LỘ TRÌNH THIÊN HÀ DÀNH CHO BẠN 🌌
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Hệ thống đã chọn Cõi phù hợp với độ tuổi của bạn. Bạn có thể bấm để tùy chỉnh thêm nếu thích!
                  </p>
                </div>

                {/* Active Recommended Realm Card */}
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-950/90 via-[#16123a]/90 to-slate-950/90 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.3)] text-left relative overflow-hidden">
                  <div className="flex items-center gap-3.5">
                    <span className="text-4xl sm:text-5xl drop-shadow">{activeChosenRealm.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase border border-cyan-400/40">
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

                  <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Quy mô bài học:</span>
                      <span className="text-white font-bold">Chương {activeChosenRealm.startChapter} - {activeChosenRealm.endChapter} ({activeChosenRealm.units.length} chương)</span>
                    </div>
                    <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Tốc độ mục tiêu:</span>
                      <span className="text-yellow-300 font-bold">{activeChosenRealm.targetWpm}</span>
                    </div>
                  </div>
                </div>

                {/* Switch Realm Expander */}
                <div className="text-left">
                  <button
                    type="button"
                    onClick={() => setIsChangingRealm(!isChangingRealm)}
                    className="w-full py-2 px-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-cyan-300 flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{isChangingRealm ? 'Thu gọn danh sách Cõi' : 'Hoặc tự chọn Cõi khác (Tổng 8 Cõi)'}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isChangingRealm ? 'rotate-180' : ''}`} />
                  </button>

                  {isChangingRealm && (
                    <div className="mt-2 space-y-1.5 max-h-40 overflow-y-auto pr-1 animate-in fade-in duration-200">
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

                {/* Summary Profile Pill */}
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{avatar}</span>
                    <div>
                      <div className="text-white font-black">{name.trim()}</div>
                      <div className="text-slate-400">{gender === 'girl' ? 'Bé Gái 💖' : gender === 'boy' ? 'Bé Trai ⚡' : 'Tự Do 🌟'} • Đồng hành: {currentMascot.name} {currentMascot.icon}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 font-bold">
                      {currentTheme.nameVi}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
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
                    className={`flex-1 py-3.5 bg-gradient-to-r ${currentTheme.buttonGradient} text-slate-950 font-game font-black text-base sm:text-lg rounded-2xl border-b-6 ${currentTheme.buttonBorder} active:border-b-0 active:translate-y-1.5 transition flex items-center justify-center gap-2 cursor-pointer`}
                    style={{ boxShadow: `0 10px 30px ${currentTheme.glowColor}` }}
                  >
                    <Rocket className="w-5 h-5 stroke-[2.5]" />
                    <span>BẮT ĐẦU HÀNH TRÌNH!</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ----------------- RETURNING USER: EDIT PROFILE, GENDER, THEME & REALM ----------------- */
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white text-xs sm:text-sm font-bold mb-1 shadow-sm">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Hồ Sơ & Tùy Chỉnh Giao Diện</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-game text-white tracking-wide">
              CẬP NHẬT HỒ SƠ 🌟
            </h2>

            {/* 1. GENDER / PERSONA SELECTOR */}
            <div className="text-left">
              <label className="block text-xs font-black uppercase tracking-wider text-pink-300 mb-1.5">
                1. Phong cách nhân vật:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectGender('girl')}
                  className={`p-2.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer border ${
                    gender === 'girl'
                      ? 'bg-pink-500/30 border-pink-400 text-pink-200 shadow-md ring-1 ring-pink-400/50'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-xl">👧💖</span>
                  <span>Bé Gái / Nữ</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGender('boy')}
                  className={`p-2.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer border ${
                    gender === 'boy'
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400/50'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-xl">👦⚡</span>
                  <span>Bé Trai / Nam</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGender('neutral')}
                  className={`p-2.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer border ${
                    gender === 'neutral'
                      ? 'bg-purple-500/30 border-purple-400 text-purple-200 shadow-md ring-1 ring-purple-400/50'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-xl">🌟🪐</span>
                  <span>Tự Do / Vũ Trụ</span>
                </button>
              </div>
            </div>

            {/* 2. THEME COLOR PALETTE */}
            <div className="text-left">
              <label className="block text-xs font-black uppercase tracking-wider text-cyan-300 mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span>2. Tông màu giao diện:</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(Object.keys(THEME_CONFIGS) as ThemeStyle[]).map((tKey) => {
                  const t = THEME_CONFIGS[tKey];
                  const isSelected = themeStyle === tKey;
                  return (
                    <button
                      key={tKey}
                      type="button"
                      onClick={() => handleSelectTheme(tKey)}
                      className={`p-2 rounded-xl flex flex-col items-center justify-center transition cursor-pointer border-2 ${
                        isSelected
                          ? `${t.cardBg} ${t.borderAccent} ring-1 ring-white/40`
                          : 'bg-slate-900/80 border-slate-700 text-slate-400'
                      }`}
                      style={isSelected ? { boxShadow: `0 0 10px ${t.glowColor}` } : undefined}
                    >
                      <span className="text-xl">{t.icon}</span>
                      <span className="text-[10px] font-extrabold truncate w-full text-center mt-0.5">
                        {t.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. MASCOT COMPANION */}
            <div className="text-left">
              <label className="block text-xs font-black uppercase tracking-wider text-amber-300 mb-1.5">
                3. Bạn đồng hành Cosmo:
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(Object.keys(MASCOT_CONFIGS) as MascotId[]).map((mKey) => {
                  const m = MASCOT_CONFIGS[mKey];
                  const isSelected = mascotId === mKey;
                  return (
                    <button
                      key={mKey}
                      type="button"
                      onClick={() => handleSelectMascot(mKey)}
                      className={`p-2 rounded-xl flex flex-col items-center justify-center transition cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-500/30 border-amber-400 text-white font-bold shadow-md'
                          : 'bg-slate-900/80 border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-xl">{m.icon}</span>
                      <span className="text-[10px] font-bold mt-0.5 truncate w-full text-center">{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. AVATAR SELECTOR */}
            <div className="text-left">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-purple-300">
                  4. Biểu tượng avatar:
                </label>
                <div className="flex gap-1 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setAvatarFilter('all')}
                    className={`px-1.5 py-0.5 rounded ${avatarFilter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
                  >
                    Tất cả
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarFilter('girl')}
                    className={`px-1.5 py-0.5 rounded ${avatarFilter === 'girl' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
                  >
                    Nữ 💖
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarFilter('boy')}
                    className={`px-1.5 py-0.5 rounded ${avatarFilter === 'boy' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
                  >
                    Nam ⚡
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarFilter('neutral')}
                    className={`px-1.5 py-0.5 rounded ${avatarFilter === 'neutral' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
                  >
                    Vũ trụ 🌟
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-950/60 rounded-xl border border-slate-800">
                {filteredAvatars.map((item) => {
                  const isSelected = avatar === item.emoji;
                  return (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => handleSelectAvatar(item.emoji)}
                      className={`p-1.5 rounded-lg flex items-center justify-center transition cursor-pointer border ${
                        isSelected
                          ? 'bg-purple-500/40 border-purple-400 scale-105 shadow-sm'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-xl drop-shadow">{item.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. NAME INPUT */}
            <div className="text-left">
              <label className="block text-xs font-black uppercase tracking-wider text-cyan-300 mb-1.5">
                5. Tên của bạn:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Nhập tên của bạn..."
                maxLength={24}
                className="w-full px-4 py-2.5 bg-slate-950/90 border-2 border-slate-700 focus:border-cyan-400 rounded-xl text-white font-game font-bold text-base outline-none transition"
              />
              {error && <p className="text-rose-400 text-xs font-bold mt-1">{error}</p>}
            </div>

            {/* 6. AGE & REALM */}
            <div className="text-left">
              <label className="block text-xs font-black uppercase tracking-wider text-cyan-300 mb-1.5">
                6. Độ tuổi / Mục tiêu học:
              </label>
              <div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto pr-1">
                {AGE_OPTIONS.map((item) => {
                  const isSelected = age === item.age;
                  return (
                    <button
                      key={item.age}
                      type="button"
                      onClick={() => handleSelectAge(item.age)}
                      className={`p-2 rounded-xl flex items-center gap-2 text-left transition cursor-pointer border ${
                        isSelected
                          ? 'bg-purple-500/30 border-purple-400 text-white font-bold'
                          : 'bg-slate-900/70 border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Realm Card */}
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-left">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeChosenRealm.icon}</span>
                <div>
                  <div className="text-[11px] text-slate-400 font-bold">Cõi đang chọn:</div>
                  <div className="font-extrabold text-cyan-300 text-xs">{activeChosenRealm.nameVi} ({activeChosenRealm.ageRange})</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChangingRealm(!isChangingRealm)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-slate-700 transition cursor-pointer"
              >
                Đổi Cõi ➔
              </button>
            </div>

            {isChangingRealm && (
              <div className="space-y-1 max-h-28 overflow-y-auto pr-1 text-left">
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
                      className={`w-full p-2 rounded-xl text-left transition flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? 'bg-cyan-500/25 border-cyan-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-lg">{realm.icon}</span>
                        <span className="text-xs font-bold text-white truncate">{realm.nameVi}</span>
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
              className={`w-full py-3.5 bg-gradient-to-r ${currentTheme.buttonGradient} text-slate-950 font-game font-black text-lg rounded-2xl border-b-6 ${currentTheme.buttonBorder} active:border-b-0 active:translate-y-1.5 transition flex items-center justify-center gap-2 cursor-pointer mt-2`}
              style={{ boxShadow: `0 10px 30px ${currentTheme.glowColor}` }}
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
