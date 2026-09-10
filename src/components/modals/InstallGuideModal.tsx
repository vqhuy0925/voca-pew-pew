import React, { useState } from 'react';
import { UserProgress } from '../../data/progress-types';
import { X, Smartphone, Monitor, Download, Share2, PlusSquare, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { THEME_CONFIGS } from '../../data/theme-types';
import { PWAInstallState } from '../../hooks/usePWAInstall';

interface InstallGuideModalProps {
  progress: UserProgress;
  pwaState: PWAInstallState;
  onClose: () => void;
}

type TabType = 'ios' | 'android' | 'desktop';

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  progress,
  pwaState,
  onClose
}) => {
  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;

  // Set default active tab based on detected device
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (pwaState.isIOS) return 'ios';
    if (pwaState.isAndroid) return 'android';
    return 'desktop';
  });

  const [installSuccess, setInstallSuccess] = useState(false);

  const handleNativeInstall = async () => {
    soundFx.playClick();
    const success = await pwaState.promptInstall();
    if (success) {
      soundFx.playChestOpen();
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg bg-gradient-to-b ${theme.bgGradient} border-3 ${theme.borderAccent} rounded-3xl p-5 sm:p-7 text-center my-4 max-h-[92vh] overflow-y-auto shadow-2xl`}
        style={{ boxShadow: `0 0 50px ${theme.glowColor}` }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-3xl border-3 border-cyan-400/80 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-bounce">
          <span className="text-3xl sm:text-4xl">🚀</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black font-orbitron text-yellow-300 tracking-wide uppercase starwars-gold-glow">
          Đưa App Ra Màn Hình Chính
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-4">
          Tạo phím tắt ra màn hình chính — chơi mượt toàn màn hình không có thanh URL!
        </p>

        {/* Native 1-Click Install Button if supported by browser */}
        {pwaState.hasNativePrompt && !installSuccess && (
          <div className="mb-5 p-4 rounded-2xl bg-cyan-950/70 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 animate-pulse">
            <p className="text-xs sm:text-sm text-cyan-200 font-bold mb-2">
              🎉 Trình duyệt của bạn hỗ trợ cài đặt tự động chỉ với 1 chạm!
            </p>
            <button
              onClick={handleNativeInstall}
              className="btn-3d btn-3d-cyan w-full py-3 text-sm sm:text-base font-black font-orbitron tracking-wider flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>CÀI ĐẶT ỨNG DỤNG NGAY</span>
            </button>
          </div>
        )}

        {installSuccess && (
          <div className="mb-5 p-4 rounded-2xl bg-emerald-950/70 border-2 border-emerald-400 text-emerald-300 font-bold text-sm sm:text-base flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span>Đã cài đặt thành công! Mở app từ màn hình chính nhé!</span>
          </div>
        )}

        {/* Device Selection Tabs */}
        <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 mb-5">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('ios');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'ios'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>🍎 iPhone / iPad</span>
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('android');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'android'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>🤖 Android</span>
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('desktop');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'desktop'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>💻 Máy tính PC</span>
          </button>
        </div>

        {/* Tab Contents: Step-by-Step Guides */}
        <div className="text-left space-y-3 mb-5">
          {activeTab === 'ios' && (
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  1
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Mở game bằng trình duyệt <strong className="text-cyan-300">Safari</strong> trên iPhone hoặc iPad.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  2
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Bấm biểu tượng <strong className="text-cyan-300">Chia sẻ</strong>{' '}
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-mono">
                    <Share2 className="w-3.5 h-3.5 inline mr-1" /> Share
                  </span>{' '}
                  (nằm ở thanh dưới trên iPhone hoặc góc trên trên iPad).
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  3
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Cuộn xuống chọn{' '}
                  <strong className="text-yellow-300">
                    <PlusSquare className="w-3.5 h-3.5 inline mr-1" /> Thêm vào MH chính (Add to Home Screen)
                  </strong>{' '}
                  rồi bấm <strong className="text-emerald-400">Thêm (Add)</strong> ở góc trên bên phải!
                </div>
              </div>
            </div>
          )}

          {activeTab === 'android' && (
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  1
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Mở game bằng trình duyệt <strong className="text-cyan-300">Chrome</strong> hoặc Cốc Cốc trên điện thoại/máy tính bảng.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  2
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Bấm vào biểu tượng menu <strong className="text-cyan-300">3 dấu chấm (⋮)</strong> ở góc trên cùng bên phải.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  3
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Chọn{' '}
                  <strong className="text-yellow-300">
                    &quot;Cài đặt ứng dụng&quot; (Install app)
                  </strong>{' '}
                  hoặc{' '}
                  <strong className="text-emerald-400">
                    &quot;Thêm vào Màn hình chính&quot;
                  </strong>.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'desktop' && (
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  1
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Sử dụng trình duyệt <strong className="text-cyan-300">Google Chrome</strong>,{' '}
                  <strong className="text-cyan-300">Microsoft Edge</strong> hoặc Cốc Cốc trên máy tính.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  2
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Nhìn vào góc phải của <strong className="text-cyan-300">thanh nhập địa chỉ web (URL)</strong>, bạn sẽ thấy biểu tượng{' '}
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs">
                    ⊕ Cài đặt
                  </span>{' '}
                  hoặc biểu tượng màn hình máy tính.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-orbitron font-black flex items-center justify-center shrink-0 border border-cyan-400/40">
                  3
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Bấm vào đó và chọn <strong className="text-emerald-400">Cài đặt (Install)</strong>. Game sẽ xuất hiện trên màn hình Desktop và thanh Taskbar của bạn!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Benefits Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-5 text-left">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-cyan-300 mb-1.5 font-orbitron">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>LỢI ÍCH KHI ĐƯA RA MÀN HÌNH CHÍNH</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1">
            <li className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Chơi toàn màn hình không có thanh URL như ứng dụng gốc</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Bật tức thì chỉ với 1 chạm từ màn hình chính</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Lưu cache giúp tải mượt mà ngay cả khi mạng yếu</span>
            </li>
          </ul>
        </div>

        {/* Bottom Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="btn-3d btn-3d-slate w-full py-3 text-sm sm:text-base font-bold rounded-2xl"
        >
          Đã Hiểu, Đóng Lại
        </button>
      </div>
    </div>
  );
};
