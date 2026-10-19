import React, { useState, useEffect } from 'react';
import { Rocket, Sparkles, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import { onAppUpdateAvailable, applyAppUpdate } from '../../services/serviceWorkerRegistration';
import { onVersionUpdateAvailable, VersionInfo, APP_CURRENT_VERSION } from '../../services/versionService';
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
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Listen to Service Worker updates
    const unsubscribeSW = onAppUpdateAvailable(() => {
      setHasUpdate(true);
      setIsDismissed(false);
    });

    // 2. Listen to version HTTP check updates
    const unsubscribeVersion = onVersionUpdateAvailable((info) => {
      setVersionInfo(info);
      setHasUpdate(true);
      setIsDismissed(false);
    });

    return () => {
      unsubscribeSW();
      unsubscribeVersion();
    };
  }, []);

  if (!hasUpdate || isDismissed || hideInBattle) {
    return null;
  }

  const handleUpdate = () => {
    try {
      soundFx.playUpgradeSuccess();
    } catch {
      // Sound fallback
    }
    setIsUpdating(true);
    // Give 250ms for tactile feedback animation
    setTimeout(() => {
      applyAppUpdate();
    }, 250);
  };

  const handleDismiss = () => {
    try {
      soundFx.playClick();
    } catch {
      // Sound fallback
    }
    setIsDismissed(true);
  };

  const targetVersion = versionInfo?.version ? `v${versionInfo.version}` : 'Mới';

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-lg animate-in slide-in-from-top-4 duration-300 ${className}`}
    >
      <div className="relative flex flex-col gap-2.5 p-4 bg-slate-900/95 border-2 border-cyan-400 rounded-3xl shadow-[0_0_35px_rgba(6,182,212,0.5)] backdrop-blur-md text-white select-none">
        {/* Glow accent */}
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-cyan-500/30 via-indigo-500/25 to-purple-500/30 rounded-3xl blur-md -z-10" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shrink-0 shadow-inner">
              <Rocket className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-cyan-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Đã Có Bản Cập Nhật {targetVersion}!</span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">
                {versionInfo?.releaseNotes || 'Vừa phát hành tính năng & tối ưu trải nghiệm mới.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Đóng thông báo"
            className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Để sau"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Features highlight if available */}
        {versionInfo?.features && versionInfo.features.length > 0 && (
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 space-y-1">
            {versionInfo.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
          <span className="text-[10px] text-slate-400 font-bold">
            Hiện tại: v{APP_CURRENT_VERSION} ➔ Đề xuất: {targetVersion}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDismiss}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white font-bold transition cursor-pointer"
            >
              Để sau
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              disabled={isUpdating}
              className="btn-3d btn-3d-cyan px-4 py-2 text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-950 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>{isUpdating ? 'Đang nạp...' : 'Cập Nhật Ngay 🚀'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
