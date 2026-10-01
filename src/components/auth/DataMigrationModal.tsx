import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Key,
  User,
  Star,
  Award,
  AlertCircle,
  Delete,
  CheckCircle2,
  ArrowRight,
  Rocket
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { UserProgress } from '../../data/progress-types';
import {
  migrateLegacyProgress,
  normalizeUsername,
  validateUsername,
  validatePin
} from '../../services/accountService';
import { calculateTotalStars, calculateCompletedLevelsCount } from '../../services/firebase/cloudSyncService';

interface DataMigrationModalProps {
  isOpen: boolean;
  currentProgress: UserProgress;
  onSuccess: (updatedProgress: UserProgress) => void;
  onSkip?: () => void;
}

export const DataMigrationModal: React.FC<DataMigrationModalProps> = ({
  isOpen,
  currentProgress,
  onSuccess,
  onSkip
}) => {
  const [username, setUsername] = useState<string>(() => {
    return normalizeUsername(currentProgress.userName || 'phihanhgia');
  });
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState<string[]>(['', '', '', '']);
  const [activePinTarget, setActivePinTarget] = useState<'pin' | 'confirmPin'>('pin');

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isSuccessCelebrate, setIsSuccessCelebrate] = useState<boolean>(false);

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
      setUsername(normalizeUsername(currentProgress.userName || 'phihanhgia'));
      setPin(['', '', '', '']);
      setConfirmPin(['', '', '', '']);
      setActivePinTarget('pin');
      setErrorMessage('');
      setIsSuccessCelebrate(false);
    }
  }, [isOpen, currentProgress.userName]);

  if (!isOpen) return null;

  const totalStars = calculateTotalStars(currentProgress);
  const completedCount = calculateCompletedLevelsCount(currentProgress);
  const gemsCount = currentProgress.gems || 0;

  const triggerError = (msg: string) => {
    soundFx.playWrong();
    setErrorMessage(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

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
      } else if (!isConfirm) {
        setActivePinTarget('confirmPin');
        confirmPinRefs[0].current?.focus();
      }
    }
  };

  const handlePinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number, isConfirm: boolean = false) => {
    const targetState = isConfirm ? confirmPin : pin;
    const targetRefs = isConfirm ? confirmPinRefs : pinRefs;

    if (e.key === 'Backspace' && !targetState[idx] && idx > 0) {
      targetRefs[idx - 1].current?.focus();
    }
  };

  const handleNumPadPress = (num: string) => {
    soundFx.playClick();
    const isConfirm = activePinTarget === 'confirmPin';
    const targetState = isConfirm ? [...confirmPin] : [...pin];
    const targetSet = isConfirm ? setConfirmPin : setPin;
    const targetRefs = isConfirm ? confirmPinRefs : pinRefs;

    const firstEmptyIndex = targetState.findIndex(digit => digit === '');
    if (firstEmptyIndex !== -1) {
      targetState[firstEmptyIndex] = num;
      targetSet(targetState);
      if (firstEmptyIndex < 3) {
        targetRefs[firstEmptyIndex + 1].current?.focus();
      } else if (!isConfirm) {
        setActivePinTarget('confirmPin');
        confirmPinRefs[0].current?.focus();
      }
    }
  };

  const handleNumPadDelete = () => {
    soundFx.playClick();
    const isConfirm = activePinTarget === 'confirmPin';
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

    if (isConfirm) {
      setActivePinTarget('pin');
      pinRefs[3].current?.focus();
    }
  };

  const handleMigrate = async (e?: React.FormEvent) => {
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

    const confirmPinStr = confirmPin.join('');
    if (pinStr !== confirmPinStr) {
      triggerError('Mã PIN xác nhận không khớp. Vui lòng nhập lại!');
      return;
    }

    setLoading(true);
    const res = await migrateLegacyProgress(normUser, pinStr, currentProgress);
    setLoading(false);

    if (!res.success || !res.progress) {
      triggerError(res.error || 'Nâng cấp tài khoản thất bại. Vui lòng thử lại.');
    } else {
      soundFx.playFanfare();
      setIsSuccessCelebrate(true);
      setTimeout(() => {
        onSuccess(res.progress!);
      }, 1600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <div
        className={`relative w-full max-w-lg bg-slate-900 border-2 border-amber-400/60 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.3)] flex flex-col max-h-[96dvh] overflow-hidden text-slate-100 font-game ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Header Bar */}
        <div className="shrink-0 p-5 border-b border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.5)] border border-amber-300 shrink-0">
            <ShieldCheck className="w-7 h-7 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="font-orbitron font-black text-lg sm:text-xl text-amber-300 tracking-wider">
              BẢO VỆ TIẾN TRÌNH CỦA BẠN!
            </h2>
            <p className="text-xs text-slate-300">
              Nâng cấp tài khoản • Đồng bộ đám mây • Chơi trên mọi máy
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Achievement Summary Cards */}
          <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-3.5 space-y-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Thành tích hiện tại của bạn:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-center">
                <div className="text-xl sm:text-2xl font-orbitron font-black text-amber-400 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {totalStars}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Sao Ngân Hà</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-center">
                <div className="text-xl sm:text-2xl font-orbitron font-black text-cyan-400">
                  💎 {gemsCount}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Kim Cương</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-purple-500/30 text-center">
                <div className="text-xl sm:text-2xl font-orbitron font-black text-purple-400">
                  🚀 {completedCount}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Màn Đã Qua</div>
              </div>
            </div>
            <p className="text-[11px] text-amber-200/90 leading-relaxed font-medium">
              💡 Để không bị mất dữ liệu khi đổi trình duyệt hoặc chuyển sang iPad/máy khác, hãy đặt <span className="font-bold text-white">Tên đăng nhập</span> và <span className="font-bold text-white">Mã PIN 4 số</span> ngay bây giờ!
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-2.5 animate-pulse">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleMigrate} className="space-y-4">
            {/* Field: Username */}
            <div>
              <label className="block text-xs font-black text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Tên Đăng Nhập (Username)
              </label>
              <input
                type="text"
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="ví dụ: benhim, astronaut123"
                autoCapitalize="none"
                autoCorrect="off"
                className="w-full bg-slate-950/80 border-2 border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3 text-base text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Gợi ý: Dùng tên này để đăng nhập lại trên điện thoại hoặc máy khác.
              </p>
            </div>

            {/* Field: PIN (4 digits) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  Đặt Mã PIN 4 Số
                </label>
                <span className="text-[11px] text-slate-400 font-bold">Chỉ 4 số dễ nhớ</span>
              </div>
              <div
                onClick={() => setActivePinTarget('pin')}
                className={`flex items-center justify-center gap-3 p-3 rounded-2xl bg-slate-950/50 border ${
                  activePinTarget === 'pin' ? 'border-amber-500/60' : 'border-slate-800'
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
                    className="w-13 h-14 sm:w-14 sm:h-16 text-center font-orbitron font-black text-2xl bg-slate-900 border-2 border-amber-400/50 focus:border-amber-300 rounded-2xl text-amber-200 outline-none shadow-[0_0_10px_rgba(251,191,36,0.2)] focus:shadow-[0_0_18px_rgba(251,191,36,0.5)] transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Field: Confirm PIN */}
            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Nhập Lại Mã PIN 4 Số
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

            {/* Virtual NumPad */}
            <div className="pt-2">
              <div className="text-[11px] text-center text-slate-400 mb-2 font-medium">
                ⌨️ Bàn phím số cảm ứng (Touch / iPad)
              </div>
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleNumPadPress(num)}
                    className="h-12 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 border-b-2 border-slate-950 text-white font-orbitron font-bold text-lg transition-transform"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleNumPadDelete}
                  className="h-12 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-300 font-bold flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Delete className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNumPadPress('0')}
                  className="h-12 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 border-b-2 border-slate-950 text-white font-orbitron font-bold text-lg transition-transform"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => handleMigrate()}
                  className="h-12 rounded-xl bg-amber-500 hover:bg-amber-400 border border-amber-300 text-slate-950 font-bold flex items-center justify-center active:scale-95 transition-transform shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="shrink-0 p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
          {onSkip ? (
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              Để sau (Chỉ chơi trên máy này)
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            disabled={loading || isSuccessCelebrate}
            onClick={() => handleMigrate()}
            className={`px-6 py-3 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition-all shadow-lg btn-3d-yellow ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSuccessCelebrate ? (
              <span className="flex items-center gap-1.5 text-slate-950">
                <CheckCircle2 className="w-5 h-5" />
                ĐÃ BẢO VỆ THÀNH CÔNG!
              </span>
            ) : loading ? (
              <span>Đang lưu trữ dữ liệu...</span>
            ) : (
              <>
                <span>LƯU & KÍCH HOẠT TÀI KHOẢN</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
