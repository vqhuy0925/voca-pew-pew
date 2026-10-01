import React, { useState, useRef, useEffect } from 'react';
import {
  Rocket,
  Key,
  ShieldCheck,
  User,
  AlertCircle,
  Delete,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  Smile,
  Keyboard
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import {
  registerAccount,
  loginAccount,
  normalizeUsername,
  validateUsername,
  validatePin
} from '../../services/accountService';
import { UserProgress } from '../../data/progress-types';

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: 'register' | 'login';
  onSuccess: (progress: UserProgress, isNewRegistration: boolean) => void;
  onClose?: () => void;
  allowClose?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialTab = 'register',
  onSuccess,
  onClose,
  allowClose = true
}) => {
  const [tab, setTab] = useState<'register' | 'login'>(initialTab);
  const [username, setUsername] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState<string[]>(['', '', '', '']);
  const [activePinTarget, setActivePinTarget] = useState<'pin' | 'confirmPin'>('pin');

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [showVirtualNumPad, setShowVirtualNumPad] = useState<boolean>(false);

  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const confirmPinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setErrorMessage('');
      setPin(['', '', '', '']);
      setConfirmPin(['', '', '', '']);
      setActivePinTarget('pin');
      setShowVirtualNumPad(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const triggerError = (msg: string) => {
    soundFx.playWrong();
    setErrorMessage(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleTabChange = (nextTab: 'register' | 'login') => {
    soundFx.playClick();
    setTab(nextTab);
    setErrorMessage('');
    setPin(['', '', '', '']);
    setConfirmPin(['', '', '', '']);
    setActivePinTarget('pin');
  };

  // Handle standard PIN input changes
  const handlePinChange = (idx: number, val: string, isConfirm: boolean = false) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const targetState = isConfirm ? [...confirmPin] : [...pin];
    const targetSet = isConfirm ? setConfirmPin : setPin;
    const targetRefs = isConfirm ? confirmPinRefs : pinRefs;

    targetState[idx] = digit;
    targetSet(targetState);

    if (digit) {
      soundFx.playClick();
      if (idx < 3) {
        targetRefs[idx + 1].current?.focus();
      } else if (!isConfirm && tab === 'register') {
        // Move to confirm PIN if finished
        setActivePinTarget('confirmPin');
        confirmPinRefs[0].current?.focus();
      }
    }
  };

  // Handle Backspace navigation
  const handlePinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number, isConfirm: boolean = false) => {
    const targetState = isConfirm ? confirmPin : pin;
    const targetRefs = isConfirm ? confirmPinRefs : pinRefs;

    if (e.key === 'Backspace' && !targetState[idx] && idx > 0) {
      targetRefs[idx - 1].current?.focus();
    }
  };

  // Virtual NumPad click handler for touchscreens & iPads
  const handleNumPadPress = (num: string) => {
    soundFx.playClick();
    const isConfirm = tab === 'register' && activePinTarget === 'confirmPin';
    const targetState = isConfirm ? [...confirmPin] : [...pin];
    const targetSet = isConfirm ? setConfirmPin : setPin;
    const targetRefs = isConfirm ? confirmPinRefs : pinRefs;

    const firstEmptyIndex = targetState.findIndex(digit => digit === '');
    if (firstEmptyIndex !== -1) {
      targetState[firstEmptyIndex] = num;
      targetSet(targetState);
      if (firstEmptyIndex < 3) {
        targetRefs[firstEmptyIndex + 1].current?.focus();
      } else if (!isConfirm && tab === 'register') {
        setActivePinTarget('confirmPin');
        confirmPinRefs[0].current?.focus();
      }
    }
  };

  const handleNumPadDelete = () => {
    soundFx.playClick();
    const isConfirm = tab === 'register' && activePinTarget === 'confirmPin';
    const targetState = isConfirm ? [...confirmPin] : [...pin];
    const targetSet = isConfirm ? setConfirmPin : setPin;
    const targetRefs = isConfirm ? confirmPinRefs : pinRefs;

    for (let i = 3; i >= 0; i--) {
      if (targetState[i] !== '') {
        targetState[i] = '';
        targetSet(targetState);
        targetRefs[i].current?.focus();
        return;
      }
    }

    // If confirm was empty, jump back to pin
    if (isConfirm) {
      setActivePinTarget('pin');
      pinRefs[3].current?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading) return;

    setErrorMessage('');

    const normUser = normalizeUsername(username);
    const uVal = validateUsername(normUser);
    if (!uVal.valid) {
      triggerError(uVal.error || 'Tên đăng nhập không hợp lệ');
      return;
    }

    const pinStr = pin.join('');
    const pVal = validatePin(pinStr);
    if (!pVal.valid) {
      triggerError(pVal.error || 'Vui lòng nhập đủ 4 số PIN');
      return;
    }

    if (tab === 'register') {
      const confirmPinStr = confirmPin.join('');
      if (pinStr !== confirmPinStr) {
        triggerError('Mã PIN xác nhận không khớp. Vui lòng nhập lại!');
        return;
      }

      setLoading(true);
      const res = await registerAccount({
        username: normUser,
        pin: pinStr,
        displayName: displayName.trim() || undefined
      });
      setLoading(false);

      if (!res.success || !res.progress) {
        triggerError(res.error || 'Đăng ký không thành công.');
      } else {
        soundFx.playPew();
        onSuccess(res.progress, true);
      }
    } else {
      setLoading(true);
      const res = await loginAccount(normUser, pinStr);
      setLoading(false);

      if (!res.success || !res.progress) {
        triggerError(res.error || 'Đăng nhập không thành công.');
      } else {
        soundFx.playPew();
        onSuccess(res.progress, false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className={`relative w-full max-w-lg bg-slate-900 border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_40px_rgba(0,240,255,0.25)] flex flex-col max-h-[96dvh] overflow-hidden text-slate-100 font-game ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Header Bar */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.5)] border border-cyan-300">
              <Rocket className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-orbitron font-black text-lg sm:text-xl text-cyan-300 tracking-wider">
                TRẠM ĐỊNH DANH PHI HÀNH GIA
              </h2>
              <p className="text-xs text-slate-400">Tài khoản cá nhân • Đăng nhập mọi thiết bị</p>
            </div>
          </div>
          {allowClose && onClose && (
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Tab Selector */}
        <div className="shrink-0 grid grid-cols-2 p-2 bg-slate-950/40 border-b border-slate-800/80 gap-2">
          <button
            type="button"
            onClick={() => handleTabChange('register')}
            className={`py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
              tab === 'register'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            TẠO TÀI KHOẢN MỚI
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('login')}
            className={`py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
              tab === 'login'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Key className="w-4 h-4" />
            ĐÃ CÓ TÀI KHOẢN
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-2.5 animate-pulse">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field: Username */}
            <div>
              <label className="block text-xs font-black text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Tên Đăng Nhập (Username)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="ví dụ: nhimcon, phihanhgia, ruby88"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className="w-full bg-slate-950/80 border-2 border-slate-700 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,240,255,0.3)] rounded-2xl px-4 py-3 text-base text-white placeholder-slate-500 outline-none transition-all font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Viết liền không dấu, từ 3-20 ký tự (dùng để đăng nhập trên các máy khác).
              </p>
            </div>

            {/* Field: Display Name (Register only) */}
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-black text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-amber-400" />
                  Tên Thân Mật Của Bạn (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="ví dụ: Bé Nhím, Gia Huy, Mina"
                  className="w-full bg-slate-950/80 border-2 border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            )}

            {/* Field: PIN (4 digits) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  {tab === 'register' ? 'Thiết Lập Mã PIN 4 Số' : 'Mã PIN 4 Số Của Bạn'}
                </label>
                <span className="text-[11px] text-amber-400 font-bold">Chỉ 4 số • Rất dễ nhớ!</span>
              </div>

              {/* 4 Large PIN boxes */}
              <div
                onClick={() => setActivePinTarget('pin')}
                className={`flex items-center justify-center gap-3 p-3 rounded-2xl bg-slate-950/50 border ${
                  activePinTarget === 'pin' ? 'border-cyan-500/60' : 'border-slate-800'
                }`}
              >
                {pin.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={pinRefs[idx]}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onFocus={() => setActivePinTarget('pin')}
                    onChange={e => handlePinChange(idx, e.target.value, false)}
                    onKeyDown={e => handlePinKeyDown(e, idx, false)}
                    className="w-13 h-14 sm:w-14 sm:h-16 text-center font-orbitron font-black text-2xl bg-slate-900 border-2 border-cyan-400/50 focus:border-cyan-300 rounded-2xl text-cyan-200 outline-none shadow-[0_0_10px_rgba(0,240,255,0.2)] focus:shadow-[0_0_18px_rgba(0,240,255,0.5)] transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Field: Confirm PIN (Register only) */}
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-black text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Nhập Lại Mã PIN 4 Số Để Xác Nhận
                </label>
                <div
                  onClick={() => setActivePinTarget('confirmPin')}
                  className={`flex items-center justify-center gap-3 p-3 rounded-2xl bg-slate-950/50 border ${
                    activePinTarget === 'confirmPin' ? 'border-emerald-500/60' : 'border-slate-800'
                  }`}
                >
                  {confirmPin.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={confirmPinRefs[idx]}
                      type="password"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onFocus={() => setActivePinTarget('confirmPin')}
                      onChange={e => handlePinChange(idx, e.target.value, true)}
                      onKeyDown={e => handlePinKeyDown(e, idx, true)}
                      className="w-13 h-14 sm:w-14 sm:h-16 text-center font-orbitron font-black text-2xl bg-slate-900 border-2 border-emerald-400/50 focus:border-emerald-300 rounded-2xl text-emerald-200 outline-none shadow-[0_0_10px_rgba(52,211,153,0.2)] focus:shadow-[0_0_18px_rgba(52,211,153,0.5)] transition-all"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Virtual Arcade NumPad for iPad & Touch devices (Hidden by default, toggleable) */}
            <div className="pt-1">
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowVirtualNumPad(prev => !prev)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/70 transition-all font-medium active:scale-95"
                >
                  <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{showVirtualNumPad ? 'Ẩn bàn phím số ảo' : 'Mở bàn phím số ảo (Touch / iPad)'}</span>
                </button>
              </div>

              {showVirtualNumPad && (
                <div className="mt-2.5 grid grid-cols-3 gap-2 max-w-xs mx-auto animate-in fade-in duration-200">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleNumPadPress(num)}
                      className="h-11 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 border-b-2 border-slate-950 text-white font-orbitron font-bold text-lg transition-transform"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleNumPadDelete}
                    className="h-11 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-300 font-bold flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNumPadPress('0')}
                    className="h-11 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 border-b-2 border-slate-950 text-white font-orbitron font-bold text-lg transition-transform"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="h-11 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 border border-cyan-400/50 text-slate-950 font-bold flex items-center justify-center active:scale-95 transition-transform shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer Action Button */}
        <div className="shrink-0 p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {tab === 'register' ? (
              <span>Đã có tài khoản? <button type="button" onClick={() => handleTabChange('login')} className="text-cyan-400 font-bold underline ml-1">Đăng nhập</button></span>
            ) : (
              <span>Chưa có tài khoản? <button type="button" onClick={() => handleTabChange('register')} className="text-amber-400 font-bold underline ml-1">Đăng ký mới</button></span>
            )}
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit()}
            className={`px-6 py-3 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition-all shadow-lg ${
              tab === 'register' ? 'btn-3d-cyan' : 'btn-3d-yellow'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span>Đang kết nối trạm vũ trụ...</span>
            ) : tab === 'register' ? (
              <>
                <span>KÍCH HOẠT TÀI KHOẢN</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            ) : (
              <>
                <span>ĐĂNG NHẬP NGAY</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
