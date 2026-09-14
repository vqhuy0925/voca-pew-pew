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
  ShieldAlert
} from 'lucide-react';
import { UserAnalyticsItem } from '../../services/firebase/analyticsAdminService';
import { soundFx } from '../../game/engine/SoundController';

interface UserExplorerProps {
  users: UserAnalyticsItem[];
  loading: boolean;
}

export const UserExplorer: React.FC<UserExplorerProps> = ({ users, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRealmFilter, setSelectedRealmFilter] = useState<string>('ALL');
  const [activeUserDetail, setActiveUserDetail] = useState<UserAnalyticsItem | null>(null);

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
            <option value="ALL">Tất Cả Realm</option>
            <option value="realm-1">Realm 1 (7-8 Tuổi)</option>
            <option value="realm-2">Realm 2 (8-10 Tuổi)</option>
            <option value="realm-3">Realm 3 (10-11 Tuổi)</option>
            <option value="realm-4">Realm 4 (11-13 Tuổi)</option>
            <option value="realm-5">Realm 5 (13-15 Tuổi)</option>
            <option value="realm-6">Realm 6 (15-18 Tuổi)</option>
            <option value="realm-7">Realm 7 (Tech & PO)</option>
            <option value="realm-8">Realm 8 (Adult Daily)</option>
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
                <th className="py-3 px-4">Độ Tuổi</th>
                <th className="py-3 px-4">Realm & Màn Chơi</th>
                <th className="py-3 px-4 text-center">Sao ⭐</th>
                <th className="py-3 px-4 text-center">Tổng XP ⚡</th>
                <th className="py-3 px-4 text-center">Từ Master 🏆</th>
                <th className="py-3 px-4 text-center">Streak 🔥</th>
                <th className="py-3 px-4">Hoạt Động Cuối</th>
                <th className="py-3 px-4 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Đang tải dữ liệu học viên từ Firebase...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    Không tìm thấy học viên nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u.uid}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => {
                      soundFx.playClick();
                      setActiveUserDetail(u);
                    }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-1.5 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
                          {u.avatar || '🚀'}
                        </span>
                        <div>
                          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {u.userName}
                          </div>
                          <div className="font-mono text-[10px] text-slate-500">
                            #{u.playerTag}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-300 font-mono">
                      {u.userAge} tuổi
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-cyan-300 font-semibold">{u.selectedRealmId}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{u.currentLevelId}</div>
                    </td>

                    <td className="py-3 px-4 text-center font-mono font-bold text-amber-300">
                      {u.starsCount}
                    </td>

                    <td className="py-3 px-4 text-center font-mono font-bold text-cyan-300">
                      {u.totalXp.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-purple-300">
                      {u.wordsMastered}
                    </td>

                    <td className="py-3 px-4 text-center font-mono font-bold text-orange-400">
                      {u.streakDays}d
                    </td>

                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {u.lastActiveDate || 'Chưa rõ'}
                    </td>

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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {activeUserDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border-2 border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.3)] p-6 text-white">
            <button
              onClick={() => setActiveUserDetail(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="text-5xl mb-2">{activeUserDetail.avatar}</div>
              <h3 className="text-xl font-black text-white">{activeUserDetail.userName}</h3>
              <div className="font-mono text-xs text-cyan-400">
                Player Tag: #{activeUserDetail.playerTag}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <div className="text-[10px] uppercase font-bold text-slate-400">Độ Tuổi</div>
                <div className="text-lg font-bold text-white">{activeUserDetail.userAge} tuổi</div>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <div className="text-[10px] uppercase font-bold text-slate-400">Chuỗi Ngày Học</div>
                <div className="text-lg font-bold text-orange-400 font-mono">{activeUserDetail.streakDays} ngày 🔥</div>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <div className="text-[10px] uppercase font-bold text-slate-400">Tổng XP Tích Lũy</div>
                <div className="text-lg font-bold text-cyan-300 font-mono">{activeUserDetail.totalXp.toLocaleString()} XP</div>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <div className="text-[10px] uppercase font-bold text-slate-400">Số Sao & Từ Master</div>
                <div className="text-lg font-bold text-amber-300 font-mono">{activeUserDetail.starsCount} ⭐ / {activeUserDetail.wordsMastered} từ</div>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/40 text-xs space-y-1.5 text-slate-300">
              <div><span className="text-slate-500">Realm đang học:</span> <b className="text-cyan-300">{activeUserDetail.selectedRealmId}</b></div>
              <div><span className="text-slate-500">Màn hiện tại:</span> <b className="text-slate-200">{activeUserDetail.currentLevelId}</b></div>
              <div><span className="text-slate-500">Lần cuối học:</span> <b className="text-slate-200">{activeUserDetail.lastActiveDate || 'N/A'}</b></div>
              <div><span className="text-slate-500">Linh thú:</span> <b className="text-slate-200">{activeUserDetail.mascotId || 'cosmo_dog'}</b></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
