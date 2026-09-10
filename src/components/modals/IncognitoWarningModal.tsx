import React, { useState } from 'react';
import { EyeOff, AlertTriangle, Copy, Check, Gamepad2, ShieldAlert } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';

interface IncognitoWarningModalProps {
  isOpen: boolean;
  onContinueOffline: () => void;
  browserName?: string;
}

export const IncognitoWarningModal: React.FC<IncognitoWarningModalProps> = ({
  isOpen,
  onContinueOffline,
  browserName
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    soundFx.playClick();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API fails
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOfflinePlay = () => {
    soundFx.playClick();
    onContinueOffline();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#1a1435] to-slate-950 border-3 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(251,191,36,0.35)] text-center animate-in zoom-in-95 duration-200">
        
        {/* Floating Top Badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5 border-2 border-amber-300">
          <EyeOff className="w-3.5 h-3.5" />
          <span>Chế Độ Ẩn Danh (Private Mode)</span>
        </div>

        {/* Icon Animation */}
        <div className="w-20 h-20 mx-auto mt-2 mb-4 bg-amber-500/20 rounded-full border-3 border-amber-400/80 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)] animate-pulse">
          <ShieldAlert className="w-10 h-10 text-amber-400" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide mb-2">
          Phi Hành Gia Ơi! 🕵️‍♂️🚀
        </h2>
        <p className="text-amber-200/90 text-sm sm:text-base font-semibold mb-5 leading-relaxed">
          Bạn đang mở game trong <span className="text-amber-400 font-bold">trình duyệt ẩn danh</span> {browserName ? `(${browserName})` : ''}.
        </p>

        {/* Warning Explanations */}
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 text-left space-y-3 mb-6 shadow-inner">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-200 leading-snug">
              <strong className="text-rose-300">Mất dữ liệu khi đóng tab:</strong> Điểm số, sao, kim cương và cấp độ của bé sẽ biến mất hoàn toàn khi tắt tab ẩn danh.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-200 leading-snug">
              <strong className="text-amber-300">Không lưu Bảng Xếp Hạng:</strong> Hệ thống ngắt kết nối đám mây để tránh tạo tài khoản rác làm quá tải máy chủ.
            </p>
          </div>
          <div className="flex items-start gap-3 border-t border-slate-800 pt-2.5">
            <span className="text-base leading-none shrink-0">💡</span>
            <p className="text-xs sm:text-sm text-cyan-200 leading-snug font-medium">
              <strong>Khuyên dùng:</strong> Hãy mở game trên <span className="text-cyan-400 font-bold">tab trình duyệt thường</span> để tiến trình học được lưu mãi mãi!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCopyLink}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 active:scale-[0.98] text-slate-950 font-black text-base shadow-[0_5px_20px_rgba(245,158,11,0.4)] transition flex items-center justify-center gap-2 border-2 border-yellow-200"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-emerald-950 stroke-[3]" />
                <span>Đã sao chép link! Mở tab thường dán vào nhé 🚀</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 stroke-[2.5]" />
                <span>Sao Chép Link Để Mở Tab Thường</span>
              </>
            )}
          </button>

          <button
            onClick={handleOfflinePlay}
            className="w-full py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:scale-[0.98] text-slate-300 hover:text-white font-bold text-sm border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <Gamepad2 className="w-4 h-4 text-slate-400" />
            <span>Vẫn Chơi Thử (Chế Độ Offline - Không Lưu)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
