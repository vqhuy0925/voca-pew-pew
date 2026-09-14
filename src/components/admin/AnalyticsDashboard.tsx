import React from 'react';
import {
  Users,
  TrendingUp,
  Award,
  Flame,
  Star,
  Zap,
  Sparkles,
  RefreshCw,
  BarChart3,
  Compass,
  Palette,
  GraduationCap,
  Crown,
  Target
} from 'lucide-react';
import { AnalyticsSummary, UserAnalyticsItem } from '../../services/firebase/analyticsAdminService';
import { soundFx } from '../../game/engine/SoundController';

interface AnalyticsDashboardProps {
  summary: AnalyticsSummary;
  users: UserAnalyticsItem[];
  loading: boolean;
  onRefresh: () => void;
}

const REALM_LABELS: Record<string, { name: string; cefr: string; color: string; icon: string }> = {
  'realm-1': { name: 'R1: Star Cadet • Tân Binh Sao', cefr: 'Pre-A1', color: '#00f0ff', icon: '🌱' },
  'realm-2': { name: 'R2: Space Scout • Trinh Sát Thiên Hà', cefr: 'A1', color: '#39ff14', icon: '🚀' },
  'realm-3': { name: 'R3: Astro Ranger • Chiến Binh Sao', cefr: 'A2', color: '#ff007f', icon: '🛸' },
  'realm-4': { name: 'R4: Galactic Pioneer • Tiên Phong Vũ Trụ', cefr: 'B1', color: '#bf00ff', icon: '⚡' },
  'realm-5': { name: 'R5: Cosmos Commander • Chỉ Huy Không Gian', cefr: 'B2', color: '#ffaa00', icon: '🔮' },
  'realm-6': { name: 'R6: Academic Titan • Tinh Anh Học Thuật', cefr: 'C1', color: '#00e5ff', icon: '👑' },
  'realm-7': { name: 'R7: Tech Lead & PO • Giao Tiếp Agile/Scrum', cefr: 'Tech', color: '#ff0055', icon: '💼' },
  'realm-8': { name: 'R8: Deep Space Citizen • Tiếng Anh Đời Sống', cefr: 'Daily', color: '#7000ff', icon: '💬' }
};

const MASCOT_LABELS: Record<string, { name: string; icon: string }> = {
  'cosmo_dog': { name: 'Cosmo Dog', icon: '🐶' },
  'luna_cat': { name: 'Luna Cat', icon: '🐱' },
  'stella_unicorn': { name: 'Stella Unicorn', icon: '🦄' },
  'pixel_robot': { name: 'Pixel Robot', icon: '🤖' },
  'spark_fox': { name: 'Spark Fox', icon: '🦊' }
};

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  summary,
  users,
  loading,
  onRefresh
}) => {
  const total = Math.max(summary.totalUsers, 1);

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">
            Trung Tâm Thống Kê & Phân Tích Học Tập CEFR
          </h2>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onRefresh();
          }}
          disabled={loading}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-cyan-300 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Đang cập nhật...' : 'Làm Mới Số Liệu'}</span>
        </button>
      </div>

      {/* KPI Cards Grid - 3x3 for rich insights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
        {/* Total Users */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tổng Học Viên</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {summary.totalUsers}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Đã đồng bộ Cloud Firestore</div>
        </div>

        {/* DAU */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Hôm Nay (DAU)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
            {summary.dau}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Hoạt động trong 24h</div>
        </div>

        {/* WAU */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tuần Này (WAU)</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-300 font-mono">
            {summary.wau}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Hoạt động trong 7 ngày</div>
        </div>

        {/* Total Diplomas Graduated */}
        <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
              <span>Bằng Tốt Nghiệp</span>
            </span>
            <GraduationCap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
            {summary.totalGraduations} <span className="text-xs font-normal text-slate-400">bằng</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Realm đã tốt nghiệp toàn hệ thống</div>
        </div>

        {/* Total Legendary Units */}
        <div className="p-4 bg-slate-900/80 border border-purple-500/30 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-purple-300 flex items-center gap-1">
              <span>Unit Legendary</span>
            </span>
            <Crown className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300 font-mono">
            {summary.totalLegendaryUnits} <span className="text-xs font-normal text-slate-400">units</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Chinh phục Heroic 3⭐ tối thượng</div>
        </div>

        {/* Daily Quests Completed Today */}
        <div className="p-4 bg-slate-900/80 border border-rose-500/30 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-rose-300 flex items-center gap-1">
              <span>Nhiệm Vụ Ngày Hôm Nay</span>
            </span>
            <Target className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-300 font-mono">
            {summary.dailyQuestsCompletedToday} <span className="text-xs font-normal text-slate-400">bạn</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Đã hoàn thành 3/3 quest & nhận thưởng</div>
        </div>

        {/* Mastered Words */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Từ Đã Master</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
            {summary.totalWordsMastered}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Toàn bộ 8 Realms</div>
        </div>

        {/* Total Stars */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tổng Sao ⭐</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
            {summary.totalStars}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Sao tích lũy</div>
        </div>

        {/* Average Streak */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Streak TB 🔥</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-orange-300 font-mono">
            {summary.averageStreak} <span className="text-xs font-normal text-slate-400">ngày</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Chuỗi duy trì liên tục</div>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Realm Distribution Funnel (7 cols) */}
        <div className="lg:col-span-7 p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">
                Phân Bổ Học Viên Theo 8 Age Realm
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {summary.totalUsers} học viên
            </span>
          </div>

          <div className="space-y-3">
            {Object.entries(REALM_LABELS).map(([realmId, info]) => {
              const count = summary.realmDistribution[realmId] || 0;
              const percent = Math.round((count / total) * 100);

              return (
                <div key={realmId} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 truncate">
                      <span>{info.icon}</span>
                      <span className="text-slate-300 font-medium truncate">
                        {info.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {info.cefr}
                      </span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                      <b className="text-white">{count}</b> ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(percent, count > 0 ? 3 : 0)}%`,
                        backgroundColor: info.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Mascot & Theme breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mascot preference */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Linh Thú Đồng Hành Ưa Chuộng
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(MASCOT_LABELS).map(([mId, info]) => {
                const count = summary.mascotDistribution[mId] || 0;
                const percent = Math.round((count / total) * 100);

                return (
                  <div
                    key={mId}
                    className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{info.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{info.name}</div>
                        <div className="text-[10px] text-slate-400">{percent}% người chọn</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health and activity insight */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950/50 border border-indigo-500/30 rounded-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Ghi Chú Hoạt Động Hệ Thống</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dữ liệu được tự động tổng hợp từ Firestore collection <code className="text-cyan-300 font-mono">users</code>.
              Học sinh chơi game sẽ tự động đẩy tiến độ mới nhất với cơ chế chống spam debounce 1.5 giây.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
