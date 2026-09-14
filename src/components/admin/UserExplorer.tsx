import React, { useState } from 'react';
import {
  Users,
  Search,
  Star,
  Zap,
  Flame,
  Award,
  ChevronRight,
  X,
  Compass,
  Calendar,
  ShieldAlert,
  GraduationCap,
  Crown,
  Target,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { UserAnalyticsItem } from '../../services/firebase/analyticsAdminService';
import { soundFx } from '../../game/engine/SoundController';

interface UserExplorerProps {
  users: UserAnalyticsItem[];
  loading: boolean;
}

const REALM_META: Record<string, { rank: string; cefr: string; color: string; icon: string }> = {
  'realm-1': { rank: 'Star Cadet', cefr: 'Pre-A1', color: '#00f0ff', icon: '🌱' },
  'realm-2': { rank: 'Space Scout', cefr: 'A1', color: '#39ff14', icon: '🚀' },
  'realm-3': { rank: 'Astro Ranger', cefr: 'A2', color: '#ff007f', icon: '🛸' },
  'realm-4': { rank: 'Galactic Pioneer', cefr: 'B1', color: '#bf00ff', icon: '⚡' },
  'realm-5': { rank: 'Cosmos Commander', cefr: 'B2', color: '#ffaa00', icon: '🔮' },
  'realm-6': { rank: 'Academic Titan', cefr: 'C1', color: '#00e5ff', icon: '👑' },
  'realm-7': { rank: 'Tech Lead PO', cefr: 'Tech', color: '#ff0055', icon: '💼' },
  'realm-8': { rank: 'Deep Space Citizen', cefr: 'Daily', color: '#7000ff', icon: '💬' }
};

export const UserExplorer: React.FC<UserExplorerProps> = ({ users, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRealmFilter, setSelectedRealmFilter] = useState<string>('ALL');
  const [activeUserDetail, setActiveUserDetail] = useState<UserAnalyticsItem | null>(null);

  const todayStr = new Date().toISOString().slice(0, 10);

  const filteredUsers = users.filter((u) => {
    const matchesRealm = selectedRealmFilter === 'ALL' || u.selectedRealmId === selectedRealmFilter;
    if (!matchesRealm) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (u.userName && u.userName.toLowerCase().includes(q)) ||
      (u.playerTag && u.playerTag.toLowerCase().includes(q)) ||
      (u.uid && u.uid.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">
            Danh Sách Học Viên ({filteredUsers.length} / {users.length})
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Realm filter */}
          <select
            value={selectedRealmFilter}
            onChange={(e) => setSelectedRealmFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-xl py-2 px-3 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">Tất Cả Cấp Bậc & Realm</option>
            <option value="realm-1">R1: Star Cadet (Pre-A1)</option>
            <option value="realm-2">R2: Space Scout (A1)</option>
            <option value="realm-3">R3: Astro Ranger (A2)</option>
            <option value="realm-4">R4: Galactic Pioneer (B1)</option>
            <option value="realm-5">R5: Cosmos Commander (B2)</option>
            <option value="realm-6">R6: Academic Titan (C1)</option>
            <option value="realm-7">R7: Tech Lead PO (Tech English)</option>
            <option value="realm-8">R8: Deep Space Citizen (Adult)</option>
          </select>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc Player Tag..."
              className="w-56 sm:w-64 bg-slate-800 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Học Viên</th>
                <th className="py-3 px-4">Cấp Bậc & CEFR</th>
                <th className="py-3 px-4 text-center">Sao ⭐</th>
                <th className="py-3 px-4 text-center">Tổng XP ⚡</th>
                <th className="py-3 px-4 text-center">Tốt Nghiệp 🎓</th>
                <th className="py-3 px-4 text-center">Legendary 👑</th>
                <th className="py-3 px-4 text-center">Nhiệm Vụ 🎯</th>
                <th className="py-3 px-4 text-center">Streak 🔥</th>
                <th className="py-3 px-4">Hoạt Động Cuối</th>
                <th className="py-3 px-4 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Đang tải dữ liệu học viên từ Firebase...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    Không tìm thấy học viên nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const realmInfo = REALM_META[u.selectedRealmId] || REALM_META['realm-1'];
                  const gradCount = u.graduatedRealmsCount || (u.graduatedRealmIds || []).length;
                  const legCount = u.legendaryUnitsCount || 0;
                  const isDailyQuestDone = u.dailyQuestProgress?.date === todayStr && u.dailyQuestProgress?.claimedReward;

                  return (
                    <tr
                      key={u.uid}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => {
                        soundFx.playClick();
                        setActiveUserDetail(u);
                      }}
                    >
                      {/* Learner info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl p-1.5 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
                            {u.avatar || '🚀'}
                          </span>
                          <div>
                            <div className="font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                              <span>{u.userName}</span>
                              <span className="text-[10px] text-slate-400 font-normal">({u.userAge}t)</span>
                            </div>
                            <div className="font-mono text-[10px] text-slate-500">
                              {u.playerTag.startsWith('#') ? u.playerTag : `#${u.playerTag}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Cosmic Rank & CEFR */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span>{realmInfo.icon}</span>
                          <span className="text-white font-semibold">{realmInfo.rank}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                            {realmInfo.cefr}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {u.selectedRealmId} • {u.currentLevelId}
                        </div>
                      </td>

                      {/* Stars */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-amber-300">
                        {u.starsCount}
                      </td>

                      {/* XP */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-cyan-300">
                        {u.totalXp.toLocaleString()}
                      </td>

                      {/* Graduations */}
                      <td className="py-3 px-4 text-center font-mono">
                        {gradCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[11px]">
                            <GraduationCap className="w-3 h-3" />
                            <span>{gradCount}</span>
                          </span>
                        ) : (
                          <span className="text-slate-600 text-[11px]">-</span>
                        )}
                      </td>

                      {/* Legendary */}
                      <td className="py-3 px-4 text-center font-mono">
                        {legCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-[11px]">
                            <Crown className="w-3 h-3" />
                            <span>{legCount}</span>
                          </span>
                        ) : (
                          <span className="text-slate-600 text-[11px]">-</span>
                        )}
                      </td>

                      {/* Daily Quest Status */}
                      <td className="py-3 px-4 text-center">
                        {isDailyQuestDone ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Xong</span>
                          </span>
                        ) : u.dailyQuestProgress?.date === todayStr ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-[10px]">
                            <Target className="w-3 h-3 text-rose-400" />
                            <span>Đang làm</span>
                          </span>
                        ) : (
                          <span className="text-slate-600 text-[11px]">-</span>
                        )}
                      </td>

                      {/* Streak */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-orange-400">
                        {u.streakDays}d
                      </td>

                      {/* Last active */}
                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {u.lastActiveDate || 'Chưa rõ'}
                      </td>

                      {/* Details button */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFx.playClick();
                            setActiveUserDetail(u);
                          }}
                          className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {activeUserDetail && (() => {
        const activeRealmInfo = REALM_META[activeUserDetail.selectedRealmId] || REALM_META['realm-1'];
        const gradList = activeUserDetail.graduatedRealmIds || [];
        const isDailyDone = activeUserDetail.dailyQuestProgress?.date === todayStr && activeUserDetail.dailyQuestProgress?.claimedReward;
        const dq = activeUserDetail.dailyQuestProgress;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-slate-900 border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.3)] p-6 text-white max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveUserDetail(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Avatar & Cosmic Rank Heading */}
              <div className="text-center mb-5">
                <div className="text-5xl mb-2 drop-shadow-md">{activeUserDetail.avatar}</div>
                <h3 className="text-xl font-black text-white">{activeUserDetail.userName}</h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="font-mono text-xs text-cyan-400">
                    Tag: {activeUserDetail.playerTag.startsWith('#') ? activeUserDetail.playerTag : `#${activeUserDetail.playerTag}`}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                    {activeRealmInfo.cefr} • {activeRealmInfo.rank}
                  </span>
                </div>
              </div>

              {/* KPI Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Độ Tuổi</div>
                  <div className="text-base font-bold text-white mt-0.5">{activeUserDetail.userAge} tuổi</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Streak</div>
                  <div className="text-base font-bold text-orange-400 font-mono mt-0.5">{activeUserDetail.streakDays} ngày 🔥</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Tổng XP</div>
                  <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">{activeUserDetail.totalXp.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Sao ⭐</div>
                  <div className="text-base font-bold text-amber-300 font-mono mt-0.5">{activeUserDetail.starsCount}</div>
                </div>
              </div>

              {/* Graduation & Legendary Card */}
              <div className="p-3.5 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-2xl border border-amber-500/30 mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Bằng Tốt Nghiệp Thiên Hà ({gradList.length})</span>
                  </span>
                  <span className="font-bold text-purple-300 flex items-center gap-1.5">
                    <Crown className="w-4 h-4" />
                    <span>{activeUserDetail.legendaryUnitsCount || 0} Unit Legendary</span>
                  </span>
                </div>
                {gradList.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {gradList.map((rId) => {
                      const rMeta = REALM_META[rId] || { rank: rId, cefr: 'Graduated', icon: '🎓' };
                      return (
                        <span
                          key={rId}
                          className="text-[11px] px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1"
                        >
                          <span>{rMeta.icon}</span>
                          <span className="font-bold">{rMeta.rank}</span>
                          <span className="text-[9px] font-mono opacity-80">({rMeta.cefr})</span>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">Chưa hoàn thành toàn bộ chương của Realm nào.</p>
                )}
              </div>

              {/* Daily Quests Status Card */}
              <div className="p-3.5 bg-slate-800/70 rounded-2xl border border-slate-700/60 mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <Target className="w-4 h-4" />
                    <span>Nhiệm Vụ Hàng Ngày (Hôm Nay)</span>
                  </span>
                  {isDailyDone ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đã Nhận Thưởng</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      Chưa Hoàn Thành
                    </span>
                  )}
                </div>
                {dq?.date === todayStr ? (
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                    <div className="p-2 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Ôn Lỗi Sai</div>
                      <div className="font-mono font-bold text-cyan-300 mt-0.5">{dq.mistakesReviewedCount}/5</div>
                    </div>
                    <div className="p-2 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Đạt 3 Sao</div>
                      <div className="font-mono font-bold text-amber-300 mt-0.5">{dq.threeStarEarnedCount}/1</div>
                    </div>
                    <div className="p-2 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Chơi 2 Màn</div>
                      <div className="font-mono font-bold text-emerald-300 mt-0.5">{dq.levelsPlayedCount}/2</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">Hôm nay chưa bắt đầu làm nhiệm vụ.</p>
                )}
              </div>

              {/* Additional Meta Details */}
              <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/40 text-xs space-y-1.5 text-slate-300">
                <div><span className="text-slate-500">Realm đang học:</span> <b className="text-cyan-300">{activeUserDetail.selectedRealmId}</b> ({activeRealmInfo.rank})</div>
                <div><span className="text-slate-500">Màn hiện tại:</span> <b className="text-slate-200 font-mono">{activeUserDetail.currentLevelId}</b></div>
                <div><span className="text-slate-500">Lần cuối học:</span> <b className="text-slate-200">{activeUserDetail.lastActiveDate || 'N/A'}</b></div>
                <div><span className="text-slate-500">Linh thú & Theme:</span> <b className="text-slate-200">{activeUserDetail.mascotId || 'cosmo_dog'}</b> • <span className="font-mono text-[11px] text-indigo-300">{activeUserDetail.themeStyle || 'cosmic_cyan'}</span></div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
