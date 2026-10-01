import React, { useState, useEffect } from 'react';
import { Rocket, Sparkles, RefreshCw, X } from 'lucide-react';
import { onAppUpdateAvailable, applyAppUpdate } from '../../services/serviceWorkerRegistration';
import { soundFx } from '../../game/engine/SoundController';

interface UpdateNotificationBannerProps {
  className?: string;
  hideInBattle?: boolean;
}

export const UpdateNotificationBanner: React.FC<UpdateNotificationBannerProps> = ({
  className = '',
  hideInBattle = false
}) => {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAppUpdateAvailable(() => {
      setHasUpdate(true);
      setIsDismissed(false);
    });
    return unsubscribe;
  }, []);

  if (!hasUpdate || isDismissed || hideInBattle) {
    return null;
  }

  const handleUpdate = () => {
    try {
      soundFx.playClick();
    } catch {
      // Sound fallback
    }
    setIsUpdating(true);
    // Give 200ms for click feedback animation
    setTimeout(() => {
      applyAppUpdate();
    }, 200);
  };

  const handleDismiss = () => {
    try {
      soundFx.playClick();
    } catch {
      // Sound fallback
    }
    setIsDismissed(true);
  };

  return (
    <div
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-lg animate-in slide-in-from-top-4 duration-300 ${className}`}
    >
      <div className="relative flex items-center justify-between gap-3 px-4 py-3 bg-gray-900/95 border-2 border-cyan-400/80 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.45)] backdrop-blur-md text-white select-none">
        {/* Glow accent */}
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-sm -z-10" />

        {/* Left: Icon & Description */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center flex-shrink-0">
            <Rocket className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-cyan-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span>Bản Cập Nhật Mới!</span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-300 truncate">
              Vũ trụ vừa thêm tính năng & sửa lỗi mới.
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg border border-cyan-300/40 flex items-center gap-1.5 transition-all min-h-[44px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>{isUpdating ? 'Đang nạp...' : 'Nâng cấp'}</span>
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Đóng thông báo"
            className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
