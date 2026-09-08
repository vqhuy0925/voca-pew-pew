import React from 'react';
import { X, Check, Compass, Sparkles } from 'lucide-react';
import { AGE_REALMS } from '../../data/learning-path-data';
import { AgeRealm } from '../../data/chapters/types';
import { UserProgress } from '../../data/progress-types';
import { soundFx } from '../../game/engine/SoundController';

interface RealmSelectModalProps {
  currentRealmId: string;
  progress: UserProgress;
  onSelectRealm: (realmId: string) => void;
  onClose: () => void;
}

export const RealmSelectModal: React.FC<RealmSelectModalProps> = ({
  currentRealmId,
  progress,
  onSelectRealm,
  onClose
}) => {
  const handleSelect = (realm: AgeRealm) => {
    soundFx.playClick();
    onSelectRealm(realm.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-[#12163b] to-slate-950 border-2 border-cyan-400/70 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,240,255,0.3)] my-6 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-xs font-extrabold uppercase mb-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Chọn Cõi Thiên Hà Học Tập</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-white tracking-wide">
            ĐỔI LỘ TRÌNH HỌC TẬP 🌌
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Chọn cõi phù hợp với độ tuổi hoặc mục tiêu giao tiếp của bạn
          </p>
        </div>

        {/* Realms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1 flex-1 py-1">
          {AGE_REALMS.map((realm) => {
            const isSelected = realm.id === currentRealmId;
            const rTotal = realm.units.reduce((acc, u) => acc + u.levels.length, 0);
            const rDone = realm.units.flatMap(u => u.levels).filter(
              l => progress.levelProgressMap[l.id]?.isCompleted
            ).length;
            const rPct = rTotal > 0 ? Math.round((rDone / rTotal) * 100) : 0;

            return (
              <button
                key={realm.id}
                type="button"
                onClick={() => handleSelect(realm)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border-2 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/20 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.35)] scale-[1.01]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl drop-shadow">{realm.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                            Cõi {realm.realmNumber}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                            {realm.ageRange}
                          </span>
                        </div>
                        <div className="font-game font-extrabold text-base sm:text-lg text-white mt-0.5">
                          {realm.nameVi}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="p-1 rounded-full bg-cyan-400 text-slate-950 flex-shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-300 mt-2 font-medium">
                    {realm.gradeLabel} • Chương {realm.startChapter}-{realm.endChapter}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${rPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-cyan-300">
                    {rDone}/{rTotal} ({rPct}%)
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-game font-bold text-sm rounded-xl transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
