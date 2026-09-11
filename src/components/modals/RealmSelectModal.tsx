import React from 'react';
import { X, Check, Compass, Sparkles } from 'lucide-react';
import { AGE_REALMS } from '../../data/learning-path-data';
import { AgeRealm } from '../../data/chapters/types';
import { UserProgress } from '../../data/progress-types';
import { soundFx } from '../../game/engine/SoundController';
import { MascotWidget } from '../mascot/MascotWidget';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-[#12163b] to-slate-950 border-2 sm:border-3 border-cyan-400 rounded-3xl p-3.5 sm:p-5 shadow-[0_0_50px_rgba(0,240,255,0.35)] text-white max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-2.5 mb-2.5 flex-shrink-0">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-[11px] sm:text-xs font-extrabold uppercase">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Chọn Cõi Thiên Hà
            </div>
            <h2 className="text-lg sm:text-2xl font-black font-orbitron text-yellow-300 mt-0.5 tracking-wide starwars-gold-glow truncate">
              ĐỔI LỘ TRÌNH HỌC TẬP 🌌
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700 flex-shrink-0"
              aria-label="Đóng"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Realms Grid in scrollable container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto pr-1 flex-1 py-1">
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
                className={`p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer border-2 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/20 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.35)] scale-[1.01]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl drop-shadow">{realm.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                            Cõi {realm.realmNumber}
                          </span>
                          <span className="text-[11px] font-black text-slate-300 bg-slate-800 px-1.5 py-0.2 rounded-md border border-slate-700">
                            {realm.ageRange}
                          </span>
                        </div>
                        <div className="font-game font-black text-sm sm:text-base text-white mt-0.5">
                          {realm.nameVi}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="p-1 rounded-full bg-cyan-400 text-slate-950 flex-shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] sm:text-xs text-slate-300 mt-1.5 font-bold">
                    {realm.gradeLabel} • Chương {realm.startChapter}-{realm.endChapter}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2.5">
                  <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${rPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-cyan-300">
                    {rDone}/{rTotal} ({rPct}%)
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2.5 flex-shrink-0">
          <div className="min-w-0 flex-1 overflow-hidden">
            <MascotWidget
              mascotId={progress.mascotId}
              mood="happy"
              userAge={progress.userAge}
              gender={progress.gender}
              userName={progress.userName}
              customMessage="Bạn có thể chuyển đổi giữa các Cõi thiên hà bất cứ lúc nào mà không bị mất tiến độ đâu nhé! 🪐✨"
            />
          </div>

          <button
            onClick={onClose}
            className="py-2 sm:py-2.5 px-4 sm:px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 font-game font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-slate-700 transition cursor-pointer flex-shrink-0"
          >
            ĐÓNG ✕
          </button>
        </div>
      </div>
    </div>
  );
};
