import React, { useEffect } from 'react';
import { Award, Sparkles, Rocket, Trophy, ArrowRight, CheckCircle } from 'lucide-react';
import { AgeRealm } from '../../data/chapters/types';
import { UserProgress } from '../../data/progress-types';
import { soundFx } from '../../game/engine/SoundController';

interface GraduationModalProps {
  realm: AgeRealm;
  nextRealm?: AgeRealm;
  progress: UserProgress;
  onAdvanceToNextRealm: (nextRealmId: string) => void;
  onClose: () => void;
}

export const GraduationModal: React.FC<GraduationModalProps> = ({
  realm,
  nextRealm,
  progress,
  onAdvanceToNextRealm,
  onClose
}) => {
  useEffect(() => {
    soundFx.playVictory();
  }, []);

  const handleAdvance = () => {
    soundFx.playClick();
    if (nextRealm) {
      onAdvanceToNextRealm(nextRealm.id);
    } else {
      onClose();
    }
  };

  const todayStr = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-xl select-none animate-in fade-in zoom-in-95 duration-300">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-[#151a4a] to-slate-950 border-3 border-amber-400/90 rounded-3xl p-5 sm:p-7 shadow-[0_0_80px_rgba(245,158,11,0.45)] text-white max-h-[95vh] flex flex-col items-center text-center overflow-y-auto">
        
        {/* Luminous Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border-2 border-amber-400/60 rounded-full text-amber-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulse mb-3">
          <Trophy className="w-4 h-4 text-amber-400" />
          LỄ TỐT NGHIỆP THIÊN HÀ 🎓
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-orbitron text-yellow-300 tracking-wide starwars-gold-glow mb-1">
          XUẤT SẮC TỐT NGHIỆP!
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-4 font-bold">
          Chúc mừng <span className="text-cyan-300 font-black">{progress.userName || 'Phi Hành Gia'}</span> đã hoàn thành xuất sắc toàn bộ {realm.endChapter - realm.startChapter + 1} Chương của <span className="text-amber-300 font-black">{realm.nameVi}</span>!
        </p>

        {/* Certificate Card (Bằng Phi Hành Gia) */}
        <div className="w-full bg-gradient-to-b from-amber-500/10 via-slate-900/90 to-amber-950/20 border-2 border-amber-400/60 rounded-2xl p-4 sm:p-5 relative shadow-inner mb-5">
          <div className="absolute top-2 left-2 text-amber-400/30 text-xs">⭐</div>
          <div className="absolute top-2 right-2 text-amber-400/30 text-xs">⭐</div>
          <div className="absolute bottom-2 left-2 text-amber-400/30 text-xs">⭐</div>
          <div className="absolute bottom-2 right-2 text-amber-400/30 text-xs">⭐</div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl drop-shadow">{progress.avatar || '🚀'}</span>
            <div className="text-left">
              <div className="text-xs text-amber-300/80 font-bold uppercase tracking-wider">
                CHỨNG NHẬN HOÀN THÀNH CẤP ĐỘ
              </div>
              <div className="font-game font-black text-lg sm:text-xl text-white">
                {progress.userName || 'Phi Hành Gia Xuất Chúng'}
              </div>
            </div>
          </div>

          <div className="my-3 py-2 px-3 bg-slate-950/60 rounded-xl border border-amber-400/30 flex items-center justify-around text-center">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-black">Cấp Độ Đạt Được</div>
              <div className="text-xs sm:text-sm font-black text-amber-300">{realm.cefrLevel || 'Chuẩn Quốc Tế'}</div>
            </div>
            <div className="w-[1px] h-6 bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-black">Danh Hiệu Mới</div>
              <div className="text-xs sm:text-sm font-black text-cyan-300">{realm.name} Master</div>
            </div>
            <div className="w-[1px] h-6 bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-black">Ngày Cấp</div>
              <div className="text-xs sm:text-sm font-black text-emerald-400">{todayStr}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-300 font-black">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Đã mở khóa Danh hiệu & Cánh cổng Thiên hà mới!
          </div>
        </div>

        {/* Action Next Step */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          {nextRealm ? (
            <button
              onClick={handleAdvance}
              className="flex-1 py-3.5 px-5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-game font-black text-sm sm:text-base rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>TIẾP TỤC LÊN CÕI {nextRealm.realmNumber}: {nextRealm.nameVi}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-game font-black text-sm sm:text-base rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>HOÀN TẤT & KHÁM PHÁ THÊM</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-game font-bold text-xs sm:text-sm rounded-2xl border border-slate-700 transition cursor-pointer"
          >
            ĐỂ SAU ✕
          </button>
        </div>

      </div>
    </div>
  );
};
