import React, { useState } from 'react';
import { X, Check, Compass, Sparkles, BookOpen, Keyboard, Lock, ArrowRight, Zap, Target, Star, ChevronRight } from 'lucide-react';
import { UserProgress } from '../../data/progress-types';
import { AGE_REALMS } from '../../data/learning-path-data';
import { AgeRealm } from '../../data/chapters/types';
import { ALL_COURSES, CourseId, getRealmProgressStats, getTypingDojoProgressStats } from '../../data/courses-config';
import { soundFx } from '../../game/engine/SoundController';

interface CourseSwitcherModalProps {
  progress: UserProgress;
  activeMode: 'saga' | 'dojo';
  currentRealmId: string;
  onSelectCourse: (courseId: CourseId, realmId?: string) => void;
  onClose: () => void;
}

export const CourseSwitcherModal: React.FC<CourseSwitcherModalProps> = ({
  progress,
  activeMode,
  currentRealmId,
  onSelectCourse,
  onClose
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'english' | 'typing'>('all');
  const typingStats = getTypingDojoProgressStats(progress);

  const handleSelectRealm = (realm: AgeRealm) => {
    soundFx.playClick();
    onSelectCourse('course_english', realm.id);
    onClose();
  };

  const handleSelectTyping = () => {
    soundFx.playClick();
    onSelectCourse('course_typing');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-[#101438] to-slate-950 border-2 sm:border-3 border-cyan-400 rounded-3xl p-3.5 sm:p-5 shadow-[0_0_50px_rgba(0,240,255,0.35)] text-white max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header (3-Zone Zone 1: Shrink-0) */}
        <div className="flex items-center justify-between gap-2.5 mb-3 flex-shrink-0 border-b border-slate-800 pb-3">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-[11px] sm:text-xs font-extrabold uppercase">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Trung Tâm Học Tập Đa Môn
            </div>
            <h2 className="text-lg sm:text-2xl font-black font-orbitron text-yellow-300 mt-1 tracking-wide starwars-gold-glow truncate">
              CHỌN KHÓA HỌC & BỘ MÔN 🚀
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700 flex-shrink-0"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Body (3-Zone Zone 2: Scrollable Flex-1) */}
        <div className="overflow-y-auto no-scrollbar space-y-4 flex-1 pr-0.5 py-1">
          
          {/* SECTION 1: TIẾNG ANH VŨ TRỤ (VOCAB PEW PEW) */}
          <div className="rounded-2xl border-2 border-cyan-500/40 bg-slate-900/90 p-3 sm:p-4 shadow-md">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl">🚀</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-game font-black text-sm sm:text-base text-cyan-200">
                      Tiếng Anh Vũ Trụ
                    </h3>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 uppercase">
                      Môn Chính
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Học từ vựng, phát âm chuẩn và bảo vệ trạm không gian
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-Realms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {AGE_REALMS.map((realm) => {
                const stats = getRealmProgressStats(realm.id, progress);
                const isSelected = activeMode === 'saga' && realm.id === currentRealmId;

                return (
                  <button
                    key={realm.id}
                    type="button"
                    onClick={() => handleSelectRealm(realm)}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-left transition-all duration-200 cursor-pointer border-2 relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/20 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.35)] scale-[1.01]'
                        : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-850'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl drop-shadow">{realm.icon}</span>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[11px] font-black uppercase text-cyan-400">
                                Cõi {realm.realmNumber}
                              </span>
                              {realm.cefrLevel && (
                                <span className="text-[9px] font-black text-amber-300 bg-amber-500/20 px-1 rounded border border-amber-400/40">
                                  {realm.cefrLevel}
                                </span>
                              )}
                              <span className="text-[9px] font-black text-slate-300 bg-slate-800 px-1 rounded border border-slate-700">
                                {realm.ageRange}
                              </span>
                            </div>
                            <div className="font-game font-black text-xs sm:text-sm text-white mt-0.5">
                              {realm.nameVi}
                            </div>
                          </div>
                        </div>

                        {isSelected ? (
                          <span className="p-1 rounded-full bg-cyan-400 text-slate-950 flex-shrink-0 shadow-sm">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 flex-shrink-0" />
                        )}
                      </div>

                      {/* Mini Progress Bar */}
                      <div className="mt-2.5">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                          <span>{stats.completedCount}/{stats.totalLevels} màn</span>
                          <span className="text-cyan-300 font-orbitron">{stats.percent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all"
                            style={{ width: `${stats.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: VÕ ĐƯỜNG TYPING (TYPING DOJO) */}
          <div className={`rounded-2xl border-2 p-3 sm:p-4 shadow-md transition-all ${
            activeMode === 'dojo'
              ? 'border-purple-400 bg-gradient-to-r from-purple-950/40 to-indigo-950/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
              : 'border-purple-500/40 bg-slate-900/90 hover:border-purple-400/70'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-3xl drop-shadow">⌨️</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-game font-black text-sm sm:text-base text-purple-200">
                      Võ Đường Typing (Typing Dojo)
                    </h3>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-400/40 uppercase">
                      10 Ngón
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Luyện gõ bàn phím chuẩn công nghệ, tốc độ WPM & phím tiếng Việt
                  </p>

                  {/* Typing Stats Pill */}
                  <div className="flex items-center gap-2.5 mt-2 flex-wrap text-xs">
                    <span className="inline-flex items-center gap-1 font-orbitron font-bold text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded-md border border-violet-500/40">
                      <Zap className="w-3 h-3 text-violet-400" />
                      {typingStats.bestWpm} WPM
                    </span>
                    <span className="inline-flex items-center gap-1 font-orbitron font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/40">
                      <Target className="w-3 h-3 text-emerald-400" />
                      {typingStats.completedCount}/{typingStats.totalLessons} bài
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSelectTyping}
                className={`btn-3d flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-game font-black text-xs sm:text-sm shrink-0 active:scale-95 ${
                  activeMode === 'dojo'
                    ? 'btn-3d-cyan bg-cyan-400 text-slate-950 border-b-3 border-cyan-700'
                    : 'btn-3d-purple bg-purple-600 hover:bg-purple-500 text-white border-b-3 border-purple-900'
                }`}
              >
                {activeMode === 'dojo' ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>ĐANG HỌC</span>
                  </>
                ) : (
                  <>
                    <span>VÀO VÕ ĐƯỜNG</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SECTION 3: MÔN HỌC SẮP RA MẮT (COMING SOON) */}
          <div className="pt-1">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Sắp Ra Mắt Trong Vũ Trụ
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Math Pew Pew */}
              <div className="p-3 rounded-2xl border border-slate-800 bg-slate-950/50 flex items-start gap-3 opacity-75 hover:opacity-100 transition-opacity">
                <span className="text-2xl sm:text-3xl">🔢</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-game font-black text-xs sm:text-sm text-amber-300">
                      Toán Không Gian
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      Sắp có
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Phép tính nhanh cộng trừ nhân chia bắn phá thiên thạch
                  </p>
                </div>
                <Lock className="w-4 h-4 text-slate-500 shrink-0 self-center" />
              </div>

              {/* Chess Galaxy */}
              <div className="p-3 rounded-2xl border border-slate-800 bg-slate-950/50 flex items-start gap-3 opacity-75 hover:opacity-100 transition-opacity">
                <span className="text-2xl sm:text-3xl">♟️</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-game font-black text-xs sm:text-sm text-pink-300">
                      Chiến Thuật Cờ Vua
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 border border-pink-400/30">
                      Sắp có
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Giải câu đố thế cờ chiếu tướng & tư duy chiến lược
                  </p>
                </div>
                <Lock className="w-4 h-4 text-slate-500 shrink-0 self-center" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer (3-Zone Zone 3: Shrink-0) */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 flex-shrink-0">
          <span className="truncate">
            🚀 Mọi điểm số, Kim cương 💎 & Chuỗi ngày 🔥 đều được tích lũy chung!
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition shrink-0 ml-2"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
