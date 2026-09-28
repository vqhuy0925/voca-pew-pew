import React, { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle2,
  RotateCcw,
  Save,
  Eye,
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';
import {
  getBrandingConfig,
  saveBrandingConfig,
  resetBrandingConfig,
  BrandingConfig,
  DEFAULT_BRANDING_CONFIG
} from '../../services/brandingService';
import { soundFx } from '../../game/engine/SoundController';

interface BrandingManagerProps {
  adminEmail?: string | null;
}

export const BrandingManager: React.FC<BrandingManagerProps> = ({ adminEmail }) => {
  const [config, setConfig] = useState<BrandingConfig>(() => getBrandingConfig());
  const [partnerMessage, setPartnerMessage] = useState(config.partnerMessage);
  const [partnerSubtext, setPartnerSubtext] = useState(config.partnerSubtext);
  const [showPartnerBanner, setShowPartnerBanner] = useState(config.showPartnerBanner);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const initial = getBrandingConfig();
    setConfig(initial);
    setPartnerMessage(initial.partnerMessage);
    setPartnerSubtext(initial.partnerSubtext);
    setShowPartnerBanner(initial.showPartnerBanner);
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    soundFx.playClick();

    try {
      const updated = await saveBrandingConfig(
        {
          partnerMessage: partnerMessage.trim() || DEFAULT_BRANDING_CONFIG.partnerMessage,
          partnerSubtext: partnerSubtext.trim(),
          showPartnerBanner,
        },
        adminEmail || 'admin'
      );

      setConfig(updated);
      setPartnerMessage(updated.partnerMessage);
      setPartnerSubtext(updated.partnerSubtext);
      soundFx.playVictory();
      setSaveSuccessMsg('Đã lưu cấu hình đơn vị đồng hành thành công! 🚀');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err: any) {
      soundFx.playWrong();
      alert(`Lỗi khi lưu cấu hình: ${err?.message || 'Không thể kết nối'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        'Bạn có chắc chắn muốn khôi phục về cấu hình mặc định (Đoàn phường Phước Thới)?'
      )
    ) {
      return;
    }

    soundFx.playClick();
    setIsSaving(true);
    try {
      const def = await resetBrandingConfig(adminEmail || 'admin');
      setConfig(def);
      setPartnerMessage(def.partnerMessage);
      setPartnerSubtext(def.partnerSubtext);
      setShowPartnerBanner(def.showPartnerBanner);
      soundFx.playVictory();
      setSaveSuccessMsg('Đã khôi phục về cấu hình Đoàn phường Phước Thới!');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err: any) {
      soundFx.playWrong();
      alert(`Lỗi khôi phục: ${err?.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 max-w-5xl mx-auto font-game">
      {/* Header Info Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-cyan-950/80 border border-blue-500/30 shadow-lg">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/40 shrink-0 mt-0.5">
            <Building2 className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>Cấu Hình Nhận Diện & Đơn Vị Đồng Hành</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">
                School & Union Partnership
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Tùy biến thông điệp cơ quan, đơn vị bảo trợ hoặc Đoàn Thanh niên đồng hành giới thiệu ứng dụng vào trường học.
              Dữ liệu được đồng bộ qua Cloud Firestore và lưu bộ đệm LocalStorage tức thì.
            </p>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-sm flex items-center gap-2.5 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-bold">{saveSuccessMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Settings (7 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-5">
          <div className="p-4 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4 shadow-md">
            {/* Field 1: Partner Message */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                <span>Dòng Chữ Đơn Vị Đồng Hành (Partner Message)</span>
                <span className="text-[11px] text-cyan-400 font-normal">Hiển thị nổi bật</span>
              </label>
              <input
                type="text"
                value={partnerMessage}
                onChange={(e) => setPartnerMessage(e.target.value)}
                placeholder="VD: Được đồng phát triển bởi Đoàn phường Phước Thới"
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition shadow-inner font-medium"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Ví dụ: &quot;Được đồng phát triển bởi Đoàn phường Phước Thới&quot; hoặc tên trường học.</span>
              </p>
            </div>

            {/* Field 2: Partner Subtext / Purpose */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                <span>Phụ Đề / Mục Đích Giáo Dục (Subtext)</span>
                <span className="text-[11px] text-slate-400 font-normal">Không bắt buộc</span>
              </label>
              <textarea
                value={partnerSubtext}
                onChange={(e) => setPartnerSubtext(e.target.value)}
                rows={2}
                placeholder="VD: Đồng hành cùng học sinh nâng cao năng lực ngoại ngữ và tin học ứng dụng"
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition shadow-inner font-medium resize-none"
              />
            </div>

            {/* Field 3: Show Banner Toggle */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Hiển Thị Biểu Ngữ Đối Tác</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Bật để hiển thị huy hiệu ở đầu trang chủ và chân trang
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPartnerBanner}
                  onChange={(e) => setShowPartnerBanner(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-3d btn-3d-cyan flex-1 py-3 px-5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Đang Lưu...' : 'Lưu Cấu Hình'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
              title="Khôi phục mặc định Đoàn phường Phước Thới"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Khôi Phục Mặc Định</span>
            </button>
          </div>
        </form>

        {/* Right Column: Live Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider pb-2 border-b border-slate-800">
              <Eye className="w-4 h-4" />
              <span>Xem Trước Thực Tế (Live Preview)</span>
            </div>

            {/* Preview 1: Header/Hero Partner Badge */}
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400 font-semibold">1. Biểu ngữ nổi bật tại Hero:</div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-center">
                {showPartnerBanner && partnerMessage ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/50 text-blue-200 text-xs font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse">
                    <span className="text-base leading-none">🏛️</span>
                    <span className="truncate max-w-[240px] sm:max-w-xs">{partnerMessage}</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic py-2">
                    Biểu ngữ đang tắt (Không hiển thị)
                  </div>
                )}
              </div>
            </div>

            {/* Preview 2: Footer Branding */}
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400 font-semibold">2. Dòng chân trang (Footer):</div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-300">
                  <span>🚀 Vocab Pew Pew — Ứng Dụng Luyện Gõ Từ Vựng</span>
                </div>
                {partnerMessage && (
                  <div className="text-cyan-400 font-medium">
                    • {partnerMessage}
                  </div>
                )}
                {partnerSubtext && (
                  <div className="text-slate-500 text-[10px]">
                    {partnerSubtext}
                  </div>
                )}
              </div>
            </div>

            {/* Quick tips */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-200 leading-snug space-y-1">
              <div className="font-bold text-blue-300 flex items-center gap-1">
                <span>💡 Ghi chú giới thiệu trường học</span>
              </div>
              <div>
                Nội dung này được thiết kế trang trọng, phù hợp để trình chiếu trên máy chiếu trường học, màn hình tương tác thông minh và phòng máy tính thực hành.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
