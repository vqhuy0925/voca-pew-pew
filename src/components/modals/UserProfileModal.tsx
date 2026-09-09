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
  Edit3,
  Layers,
  Smile,
  Copy
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';
import { AGE_REALMS, getRealmByAge, getRealmById } from '../../data/learning-path-data';
import { UserGender, ThemeStyle, MascotId, DailyEnergyMode } from '../../data/progress-types';
import { DAILY_ENERGY_CAPS } from '../../services/progressStorage';
import {
  THEME_CONFIGS,
  MASCOT_CONFIGS,
  AVATAR_LIST
} from '../../data/theme-types';
import {
  getAgeAdaptivePersonaLabels,
  getAgeAdaptiveSuggestedNames,
  getPersonaAddressing
} from '../../services/personaMessageHelper';
import { Zap } from 'lucide-react';

interface UserProfileModalProps {
  initialName?: string;
  initialAvatar?: string;
  initialAge?: number;
  initialRealmId?: string;
  initialGender?: UserGender;
  initialTheme?: ThemeStyle;
  initialMascotId?: MascotId;
  initialDailyEnergyMode?: DailyEnergyMode;
  initialPlayerTag?: string;
  isFirstTime?: boolean;
  onSave: (
    name: string,
    avatar: string,
    userAge: number,
    realmId?: string,
    gender?: UserGender,
    themeStyle?: ThemeStyle,
    mascotId?: MascotId,
    dailyEnergyMode?: DailyEnergyMode
  ) => void;
  onClose?: () => void;
}

const AGE_OPTIONS = [
  { age: 8, label: '7 - 8 Tuổi', sub: 'Lớp 2 - 3', icon: '🌱' },
  { age: 10, label: '9 - 10 Tuổi', sub: 'Lớp 4 - 5', icon: '🚀' },
  { age: 11, label: '11 Tuổi', sub: 'Lớp 5 • Chuyển Cấp', icon: '🛸' },
  { age: 13, label: '12 - 13 Tuổi', sub: 'Lớp 6 - 7', icon: '⚡' },
  { age: 15, label: '14 - 15 Tuổi', sub: 'Lớp 8 - 9', icon: '🔮' },
  { age: 17, label: '16 - 18+ Tuổi', sub: 'Lớp 10 - 12 • IELTS', icon: '👑' },
  { age: 19, label: 'Tech & PO Agile', sub: 'Tiếng Anh Công Nghệ', icon: '💼' },
  { age: 20, label: 'Giao Tiếp & Đời Sống', sub: 'Tiếng Anh Đi Làm / Du Lịch', icon: '💬' }
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
  initialDailyEnergyMode = 'balanced',
  initialPlayerTag = '#PEW',
  isFirstTime = false,
  onSave,
  onClose
}) => {
  const [copiedTag, setCopiedTag] = useState<boolean>(false);
  // Wizard steps for first-time user (1: Name & Gender, 2: Age, 3: Confirm)
  const [step, setStep] = useState<number>(1);

  // Tab for returning user: 'learning' (Hồ sơ & Lộ trình) | 'energy' (Mục tiêu học) | 'appearance' (Màu sắc & Thú cưng)
  const [activeTab, setActiveTab] = useState<'learning' | 'energy' | 'appearance'>('learning');

  const [name, setName] = useState<string>(initialName);
  const [avatar, setAvatar] = useState<string>(initialAvatar || '🚀');
  const [gender, setGender] = useState<UserGender>(initialGender);
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>(initialTheme);
  const [mascotId, setMascotId] = useState<MascotId>(initialMascotId);
  const [dailyEnergyMode, setDailyEnergyMode] = useState<DailyEnergyMode>(initialDailyEnergyMode);
  const [avatarFilter, setAvatarFilter] = useState<'all' | 'girl' | 'boy' | 'neutral'>('all');
  const [showAvatarPicker, setShowAvatarPicker] = useState<boolean>(false);
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

  const personaLabels = getAgeAdaptivePersonaLabels(age);
  const suggestedNames = getAgeAdaptiveSuggestedNames(age, gender);
  const addressing = getPersonaAddressing(age, gender, name);

  const handleSelectGender = (selectedGender: UserGender) => {
    soundFx.playClick();
    setGender(selectedGender);
    // Suggest suitable theme and default avatar
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
    setShowAvatarPicker(false);
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
    const defaultFallbackName = addressing.name;
    const finalName = name.trim() || (isFirstTime ? defaultFallbackName : 'Học Viên');
    soundFx.playClick();
    onSave(finalName, avatar, age, selectedRealmId, gender, themeStyle, mascotId, dailyEnergyMode);
  };

  const filteredAvatars = avatarFilter === 'all'
    ? AVATAR_LIST
    : AVATAR_LIST.filter(a => a.category === avatarFilter);

  const namePlaceholder = age <= 11
    ? (gender === 'girl' ? 'Bé Bắp, Bảo Ngọc, Hà My...' : gender === 'boy' ? 'Minh Khang, Bảo Nam, Gia Huy...' : 'Sunny, Sky, Bé Đậu...')
    : age <= 17
    ? (gender === 'girl' ? 'Khánh Linh, Bảo Ngọc, Sarah...' : gender === 'boy' ? 'Minh Khang, Alex, David...' : 'Sunny, Sky, Alex...')
    : (gender === 'girl' ? 'Thu Trang, Thanh Hằng, Lan Anh...' : gender === 'boy' ? 'Huy Vũ, Minh Tuấn, Hoàng Nam...' : 'Huy Vũ, Alex, Chris...');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md select-none overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-xl bg-gradient-to-b ${currentTheme.bgGradient} border-2 sm:border-3 ${currentTheme.borderAccent} rounded-3xl p-5 sm:p-7 text-center my-4 max-h-[94vh] overflow-y-auto shadow-2xl`}
        style={{ boxShadow: `0 0 50px ${currentTheme.glowColor}` }}
      >
        {/* Close Button (Only for returning users) */}
        {!isFirstTime && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer z-20 border border-slate-700 shadow-md"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ----------------- FIRST TIME ONBOARDING WIZARD ----------------- */}
        {isFirstTime ? (
          <div className="space-y-4">
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-10 bg-cyan-400' : 'w-3 bg-slate-700'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-10 bg-cyan-400' : 'w-3 bg-slate-700'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${step === 3 ? 'w-10 bg-cyan-400' : 'w-3 bg-slate-700'}`} />
            </div>

            {/* Top Step Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Bước {step}/3: {step === 1 ? 'Tên & Nhân Vật' : step === 2 ? 'Độ Tuổi Học' : 'Lộ Trình Thiên Hà'}</span>
            </div>

            {/* STEP 1: GENDER, NAME, AVATAR */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-2xl sm:text-3xl font-black font-game text-white tracking-wide">
                  CHÀO MỪNG BẠN! ✨
                </h2>

                {/* Gender Selector */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectGender('girl')}
                    className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition cursor-pointer border-2 ${
                      gender === 'girl'
                        ? 'bg-pink-500/25 border-pink-400 scale-[1.02] shadow-[0_0_15px_rgba(244,114,182,0.4)]'
                        : 'bg-slate-900/80 border-slate-700 hover:border-pink-400/50'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl mb-1">👧💖</span>
                    <span className="font-game font-black text-sm text-pink-200">{personaLabels.girl}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGender('boy')}
                    className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition cursor-pointer border-2 ${
                      gender === 'boy'
                        ? 'bg-cyan-500/25 border-cyan-400 scale-[1.02] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                        : 'bg-slate-900/80 border-slate-700 hover:border-cyan-400/50'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl mb-1">👦⚡</span>
                    <span className="font-game font-black text-sm text-cyan-200">{personaLabels.boy}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGender('neutral')}
                    className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition cursor-pointer border-2 ${
                      gender === 'neutral'
                        ? 'bg-purple-500/25 border-purple-400 scale-[1.02] shadow-[0_0_15px_rgba(192,132,252,0.4)]'
                        : 'bg-slate-900/80 border-slate-700 hover:border-purple-400/50'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl mb-1">🌟🪐</span>
                    <span className="font-game font-black text-sm text-purple-200">{personaLabels.neutral}</span>
                  </button>
                </div>

                {/* Name & Avatar Card */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Big Avatar Button */}
                    <button
                      type="button"
                      onClick={() => setShowAvatarPicker(true)}
                      className="relative w-16 h-16 rounded-2xl bg-slate-900 border-2 border-cyan-400/80 hover:border-cyan-300 flex items-center justify-center text-3xl shadow-inner transition hover:scale-105 cursor-pointer flex-shrink-0"
                      title="Bấm để đổi avatar"
                    >
                      <span>{avatar}</span>
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 text-xs font-black flex items-center justify-center border border-slate-950">
                        <Edit3 className="w-3 h-3" />
                      </span>
                    </button>

                    {/* Name Input */}
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Tên hoặc Biệt Danh của bạn:
                      </label>
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
                        placeholder={namePlaceholder}
                        maxLength={24}
                        autoFocus
                        className="w-full px-3.5 py-2.5 bg-slate-900 border-2 border-slate-700 focus:border-cyan-400 rounded-xl text-white font-game font-bold text-base sm:text-lg placeholder:text-slate-500 placeholder:font-normal outline-none transition"
                      />
                    </div>
                  </div>

                  {error && <p className="text-rose-400 text-xs font-bold">{error}</p>}

                  {/* Quick Avatar Row */}
                  <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                    <span className="text-xs font-bold text-slate-400 flex-shrink-0">Biểu tượng:</span>
                    {quickAvatars.map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => handleSelectAvatar(em)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition cursor-pointer border flex-shrink-0 ${
                          avatar === em
                            ? 'bg-cyan-500/30 border-cyan-400 scale-110 shadow-sm'
                            : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setShowAvatarPicker(true)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-cyan-300 hover:text-white flex-shrink-0 cursor-pointer"
                    >
                      + Tất Cả
                    </button>
                  </div>

                  {/* Suggested Names */}
                  <div className="flex items-center flex-wrap gap-1.5 pt-1">
                    <span className="text-xs font-bold text-slate-400 mr-1">Gợi ý:</span>
                    {suggestedNames.slice(0, 5).map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => handleSelectSuggestion(sug)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold rounded-lg border border-slate-700/80 transition cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mascot Widget Compact */}
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-center">
                  <MascotWidget
                    mascotId={mascotId}
                    mood="happy"
                    userAge={age}
                    gender={gender}
                    userName={name.trim()}
                    className="justify-center"
                  />
                </div>

                {/* Next Step */}
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className={`w-full py-3.5 bg-gradient-to-r ${currentTheme.buttonGradient} text-slate-950 font-game font-black text-base sm:text-lg rounded-2xl border-b-6 ${currentTheme.buttonBorder} active:border-b-0 active:translate-y-1.5 transition flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <span>TIẾP TỤC: CHỌN ĐỘ TUỔI</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            )}

            {/* STEP 2: AGE SELECTION */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 text-left">
                  <span className="text-4xl">{avatar}</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-game font-black text-white">
                      Chào mừng, <span className={currentTheme.textColor}>{name.trim() || 'Bạn'}</span>! 🎉
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Chọn độ tuổi hoặc mục tiêu để nhận lộ trình chuẩn:
                    </p>
                  </div>
                </div>

                {/* Age Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[48vh] overflow-y-auto pr-1 text-left">
                  {AGE_OPTIONS.map((item) => {
                    const isSelected = age === item.age;
                    return (
                      <button
                        key={item.age}
                        type="button"
                        onClick={() => handleSelectAge(item.age)}
                        className={`p-3 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer border-2 ${
                          isSelected
                            ? 'bg-cyan-500/25 border-cyan-400 scale-[1.01] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm sm:text-base font-black truncate ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                            {item.label}
                          </div>
                          <div className="text-xs text-slate-400 truncate mt-0.5">
                            {item.sub}
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setStep(1);
                    }}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-2xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStep2Next}
                    className={`flex-1 py-3.5 bg-gradient-to-r ${currentTheme.buttonGradient} text-slate-950 font-game font-black text-base sm:text-lg rounded-2xl border-b-6 ${currentTheme.buttonBorder} active:border-b-0 active:translate-y-1.5 transition flex items-center justify-center gap-2 cursor-pointer`}
                  >
                    <span>XEM LỘ TRÌNH ĐỀ XUẤT</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REALM CONFIRMATION */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-xl sm:text-2xl font-black font-game text-white tracking-wide">
                  LỘ TRÌNH THIÊN HÀ DÀNH CHO BẠN 🌌
                </h2>

                {/* Recommended Realm Card */}
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/90 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.3)] text-left">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl sm:text-5xl drop-shadow">{activeChosenRealm.icon}</span>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase border border-cyan-400/40">
                        Cõi {activeChosenRealm.realmNumber} • ĐỀ XUẤT
                      </span>
                      <h3 className="text-lg sm:text-xl font-game font-black text-white mt-1">
                        {activeChosenRealm.nameVi}
                      </h3>
                      <div className="text-xs sm:text-sm text-cyan-300 font-bold">
                        {activeChosenRealm.gradeLabel} • {activeChosenRealm.ageRange}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Quy mô:</span>
                      <span className="text-white font-bold">{activeChosenRealm.units.length} Chương học</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Tốc độ mục tiêu:</span>
                      <span className="text-yellow-300 font-bold">{activeChosenRealm.targetWpm}</span>
                    </div>
                  </div>
                </div>

                {/* Profile Preview Pill */}
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between text-left text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{avatar}</span>
                    <div>
                      <div className="text-white font-black">{name.trim() || addressing.name}</div>
                      <div className="text-slate-400">Đồng hành: {currentMascot.name} {currentMascot.icon}</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-white/10 text-cyan-300 font-bold">
                    {currentTheme.nameVi}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setStep(2);
                    }}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-2xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className={`flex-1 py-3.5 bg-gradient-to-r ${currentTheme.buttonGradient} text-slate-950 font-game font-black text-base sm:text-lg rounded-2xl border-b-6 ${currentTheme.buttonBorder} active:border-b-0 active:translate-y-1.5 transition flex items-center justify-center gap-2 cursor-pointer`}
                  >
                    <Rocket className="w-5 h-5 stroke-[2.5]" />
                    <span>BẮT ĐẦU HỌC NGAY!</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ================= RETURNING USER: CLEAN & MODERN PROFILE CARD ================= */
          <div className="space-y-4">
            {/* Top Modal Title */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5 text-left">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-game text-white tracking-wide">
                    HỒ SƠ CỦA BẠN 🌟
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">Tùy chỉnh thông tin & giao diện học tập</p>
                </div>
              </div>
            </div>

            {/* HERO PROFILE SUMMARY CARD */}
            <div className="p-4 rounded-3xl bg-slate-950/80 border border-slate-800 text-left space-y-3.5 shadow-md">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Big Avatar Button */}
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(true)}
                  className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-slate-900 border-2 border-cyan-400/80 hover:border-cyan-300 flex items-center justify-center text-3xl sm:text-4xl shadow-inner transition hover:scale-105 cursor-pointer flex-shrink-0 group"
                  title="Bấm để đổi Avatar"
                >
                  <span className="drop-shadow">{avatar}</span>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 text-xs font-black flex items-center justify-center border-2 border-slate-950 shadow">
                    <Edit3 className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* Name Input */}
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Tên hiển thị:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Nhập tên hoặc biệt danh..."
                    maxLength={24}
                    className="w-full px-3.5 py-2 sm:py-2.5 bg-slate-900 border-2 border-slate-700 focus:border-cyan-400 rounded-xl text-white font-game font-bold text-base sm:text-lg placeholder:text-slate-500 outline-none transition"
                  />
                  {error && <p className="text-rose-400 text-xs font-bold mt-1">{error}</p>}
                </div>
              </div>

              {/* Style / Gender Pills */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-900">
                <span className="text-xs font-bold text-slate-400 flex-shrink-0">Phong cách:</span>
                <div className="grid grid-cols-3 gap-1.5 flex-1">
                  <button
                    type="button"
                    onClick={() => handleSelectGender('girl')}
                    className={`py-1.5 px-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer border flex items-center justify-center gap-1.5 ${
                      gender === 'girl'
                        ? 'bg-pink-500/30 border-pink-400 text-pink-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>👧💖</span>
                    <span>{personaLabels.girl}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGender('boy')}
                    className={`py-1.5 px-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer border flex items-center justify-center gap-1.5 ${
                      gender === 'boy'
                        ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>👦⚡</span>
                    <span>{personaLabels.boy}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGender('neutral')}
                    className={`py-1.5 px-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer border flex items-center justify-center gap-1.5 ${
                      gender === 'neutral'
                        ? 'bg-purple-500/30 border-purple-400 text-purple-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>🌟🪐</span>
                    <span>{personaLabels.neutral}</span>
                  </button>
                </div>
              </div>

              {/* Astronaut Tag Pill with Copy */}
              <div className="flex items-center justify-between p-2.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-400 font-semibold">Mã Phi Hành Gia:</span>
                  <span className="font-mono font-black text-cyan-400 tracking-wider text-sm">{initialPlayerTag || '#PEW'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    if (initialPlayerTag) {
                      navigator.clipboard?.writeText(initialPlayerTag);
                      setCopiedTag(true);
                      setTimeout(() => setCopiedTag(false), 2000);
                    }
                  }}
                  className="px-2.5 py-1 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                  title="Sao chép mã để kết bạn hoặc khoe với bạn bè"
                >
                  {copiedTag ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTag ? 'Đã chép!' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            {/* TAB SELECTOR: (1) Lộ Trình Học | (2) Năng Lượng & Mục Tiêu | (3) Giao Diện */}
            <div className="grid grid-cols-3 p-1 bg-slate-950/90 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('learning');
                }}
                className={`py-2 px-2 rounded-xl font-game font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'learning'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Lộ Trình</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('energy');
                }}
                className={`py-2 px-2 rounded-xl font-game font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'energy'
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Năng Lượng ⚡</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('appearance');
                }}
                className={`py-2 px-2 rounded-xl font-game font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'appearance'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Giao Diện</span>
              </button>
            </div>

            {/* ================= TAB 2: DAILY ENERGY GOAL ================= */}
            {activeTab === 'energy' && (
              <div className="space-y-3 text-left animate-in fade-in duration-200">
                <div>
                  <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider block mb-1">
                    Mục Tiêu Năng Lượng & Giới Hạn Học Mỗi Ngày ⚡:
                  </span>
                  <p className="text-xs text-slate-400">
                    Phụ huynh & học viên có thể tùy chọn khối lượng học phù hợp để tránh mỏi mắt:
                  </p>
                </div>

                <div className="space-y-2">
                  {(['relaxed', 'balanced', 'intense'] as DailyEnergyMode[]).map((mKey) => {
                    const cfg = DAILY_ENERGY_CAPS[mKey];
                    const isSelected = dailyEnergyMode === mKey;

                    return (
                      <button
                        key={mKey}
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setDailyEnergyMode(mKey);
                        }}
                        className={`w-full p-3 rounded-2xl flex items-center justify-between transition cursor-pointer border-2 ${
                          isSelected
                            ? 'bg-yellow-500/20 border-yellow-400 text-white shadow-md'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl sm:text-3xl">{cfg.icon}</span>
                          <div>
                            <div className={`font-game font-bold text-sm sm:text-base ${isSelected ? 'text-yellow-300' : 'text-white'}`}>
                              {cfg.label} ({cfg.maxEnergy}⚡)
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {cfg.subLabel}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ================= TAB 1: LEARNING AGE & REALM ================= */}
            {activeTab === 'learning' && (
              <div className="space-y-3 text-left animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    Chọn độ tuổi & lớp học:
                  </span>
                  <span className="text-xs text-slate-400">Tự động chọn Cõi tối ưu</span>
                </div>

                {/* Age Options Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[30vh] overflow-y-auto pr-1">
                  {AGE_OPTIONS.map((item) => {
                    const isSelected = age === item.age;
                    return (
                      <button
                        key={item.age}
                        type="button"
                        onClick={() => handleSelectAge(item.age)}
                        className={`p-3 rounded-2xl flex items-center gap-3 text-left transition cursor-pointer border-2 ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm sm:text-base font-black truncate ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                            {item.label}
                          </div>
                          <div className="text-xs text-slate-400 truncate mt-0.5">
                            {item.sub}
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Current Selected Realm Card */}
                <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeChosenRealm.icon}</span>
                    <div>
                      <div className="text-xs text-slate-400 font-bold">Cõi đang học:</div>
                      <div className="text-sm sm:text-base font-black text-cyan-300">
                        {activeChosenRealm.nameVi} ({activeChosenRealm.ageRange})
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsChangingRealm(!isChangingRealm)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-slate-700 transition cursor-pointer"
                  >
                    {isChangingRealm ? 'Đóng ✕' : 'Đổi Cõi ➔'}
                  </button>
                </div>

                {/* Optional Realm Override List */}
                {isChangingRealm && (
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 animate-in fade-in duration-200">
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
                              : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="text-xl">{realm.icon}</span>
                            <span className="text-xs sm:text-sm font-bold text-white truncate">{realm.nameVi}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 2: APPEARANCE & MASCOT ================= */}
            {activeTab === 'appearance' && (
              <div className="space-y-4 text-left animate-in fade-in duration-200">
                {/* Theme Palette */}
                <div>
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-2">
                    Tông màu giao diện:
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {(Object.keys(THEME_CONFIGS) as ThemeStyle[]).map((tKey) => {
                      const t = THEME_CONFIGS[tKey];
                      const isSelected = themeStyle === tKey;
                      return (
                        <button
                          key={tKey}
                          type="button"
                          onClick={() => handleSelectTheme(tKey)}
                          className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition cursor-pointer border-2 ${
                            isSelected
                              ? `${t.cardBg} ${t.borderAccent} ring-2 ring-white/40 scale-105 shadow-md`
                              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <span className="text-2xl">{t.icon}</span>
                          <span className={`text-xs font-bold truncate w-full text-center mt-1 ${isSelected ? t.textColor : 'text-slate-300'}`}>
                            {t.nameEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mascot Companion */}
                <div>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                    Bạn đồng hành Cosmo:
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {(Object.keys(MASCOT_CONFIGS) as MascotId[]).map((mKey) => {
                      const m = MASCOT_CONFIGS[mKey];
                      const isSelected = mascotId === mKey;
                      return (
                        <button
                          key={mKey}
                          type="button"
                          onClick={() => handleSelectMascot(mKey)}
                          className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition cursor-pointer border-2 ${
                            isSelected
                              ? 'bg-amber-500/30 border-amber-400 text-white font-bold scale-105 shadow-md'
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-400/40'
                          }`}
                        >
                          <span className="text-2xl">{m.icon}</span>
                          <span className="text-xs font-bold truncate w-full text-center mt-1">{m.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Mascot Cheer Preview */}
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <span className="text-3xl">{currentMascot.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-amber-300">{currentMascot.name} • {currentMascot.speciesVi}</div>
                    <div className="text-xs text-slate-300 truncate mt-0.5">"{currentMascot.greeting}"</div>
                  </div>
                </div>
              </div>
            )}

            {/* SAVE BUTTON */}
            <button
              type="button"
              onClick={handleFinalSubmit}
              className={`w-full py-3.5 sm:py-4 bg-gradient-to-r ${currentTheme.buttonGradient} text-slate-950 font-game font-black text-base sm:text-lg rounded-2xl border-b-6 ${currentTheme.buttonBorder} active:border-b-0 active:translate-y-1.5 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-3`}
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>LƯU HỒ SƠ & BẮT ĐẦU</span>
            </button>
          </div>
        )}

        {/* ================= AVATAR SELECTOR MODAL DIALOG ================= */}
        {showAvatarPicker && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-150">
            <div className="relative w-full max-w-md bg-slate-950 border-2 border-purple-400 rounded-3xl p-5 text-left space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Smile className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-black font-game text-white">CHỌN BIỂU TƯỢNG AVATAR</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(false)}
                  className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1.5 text-xs font-bold">
                {(['all', 'girl', 'boy', 'neutral'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setAvatarFilter(cat)}
                    className={`flex-1 py-1.5 rounded-xl transition cursor-pointer text-center ${
                      avatarFilter === cat
                        ? 'bg-purple-600 text-white font-black shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'Tất cả' : cat === 'girl' ? 'Nữ 💖' : cat === 'boy' ? 'Nam ⚡' : 'Vũ trụ 🌟'}
                  </button>
                ))}
              </div>

              {/* Emoji Grid */}
              <div className="grid grid-cols-5 gap-2.5 max-h-56 overflow-y-auto p-1.5 bg-slate-900/60 rounded-2xl border border-slate-800">
                {filteredAvatars.map((item) => {
                  const isSelected = avatar === item.emoji;
                  return (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => handleSelectAvatar(item.emoji)}
                      className={`h-14 rounded-2xl flex flex-col items-center justify-center transition cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-purple-500/40 border-purple-400 scale-105 shadow-md ring-2 ring-purple-400/50'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                      }`}
                      title={item.label}
                    >
                      <span className="text-2xl drop-shadow">{item.emoji}</span>
                      <span className="text-[10px] text-slate-400 truncate w-full text-center mt-0.5 px-0.5">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Close / Confirm */}
              <button
                type="button"
                onClick={() => setShowAvatarPicker(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition cursor-pointer text-center"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
