import React, { useState, useEffect } from 'react';
import {
  Shield,
  BookOpen,
  BarChart3,
  Users,
  LogOut,
  X,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Home
} from 'lucide-react';
import { AdminLoginModal } from './AdminLoginModal';
import { VocabManager } from './VocabManager';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { UserExplorer } from './UserExplorer';
import {
  subscribeAdminAuth,
  adminSignOut,
  AdminUserState
} from '../../services/firebase/adminAuthService';
import {
  loadVocabDraft,
  publishVocabSnapshot
} from '../../services/firebase/vocabAdminService';
import {
  fetchUserAnalyticsList,
  computeAnalyticsKpis,
  AnalyticsSummary,
  UserAnalyticsItem
} from '../../services/firebase/analyticsAdminService';
import { getCurrentSnapshotVersion } from '../../services/vocabLoader';
import { AgeRealm } from '../../data/chapters/types';
import { soundFx } from '../../game/engine/SoundController';

type AdminTab = 'VOCAB' | 'ANALYTICS' | 'USERS';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [authState, setAuthState] = useState<AdminUserState>({
    user: null,
    isAuthenticated: false,
    email: null,
    loading: true
  });

  const [activeTab, setActiveTab] = useState<AdminTab>('VOCAB');
  const [realms, setRealms] = useState<AgeRealm[]>([]);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(getCurrentSnapshotVersion());

  // Analytics states
  const [usersList, setUsersList] = useState<UserAnalyticsItem[]>([]);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary>({
    totalUsers: 0,
    dau: 0,
    wau: 0,
    totalStars: 0,
    totalXp: 0,
    totalWordsMastered: 0,
    averageStreak: 0,
    realmDistribution: {},
    mascotDistribution: {},
    themeDistribution: {}
  });
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Publish state
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState<string | null>(null);

  // Auth subscription
  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((state) => {
      setAuthState(state);
    });
    return () => unsubscribe();
  }, []);

  // Load draft & analytics when authenticated
  useEffect(() => {
    if (authState.isAuthenticated && isOpen) {
      loadInitialData();
    }
  }, [authState.isAuthenticated, isOpen]);

  const loadInitialData = async () => {
    setIsLoadingDraft(true);
    setLoadingAnalytics(true);

    try {
      const draftRes = await loadVocabDraft();
      setRealms(draftRes.realms);
    } catch (e) {
      console.error('[Admin] Load draft error:', e);
    } finally {
      setIsLoadingDraft(false);
    }

    try {
      const users = await fetchUserAnalyticsList(100);
      setUsersList(users);
      const kpis = computeAnalyticsKpis(users);
      setAnalyticsSummary(kpis);
    } catch (e) {
      console.error('[Admin] Load analytics error:', e);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleRefreshAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const users = await fetchUserAnalyticsList(100);
      setUsersList(users);
      setAnalyticsSummary(computeAnalyticsKpis(users));
      soundFx.playUpgradeSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handlePublishSnapshot = async () => {
    if (
      !window.confirm(
        'Bạn có chắc chắn muốn PHÁT HÀNH (Publish Snapshot) phiên bản từ vựng mới này cho toàn bộ học sinh?'
      )
    ) {
      return;
    }

    setIsPublishing(true);
    soundFx.playClick();

    try {
      const newVersion = await publishVocabSnapshot(realms, authState.email || 'admin');
      setCurrentVersion(newVersion);
      soundFx.playVictory();
      setPublishSuccessMsg(`Đã phát hành thành công snapshot phiên bản ${newVersion}! 🚀`);
      setTimeout(() => setPublishSuccessMsg(null), 5000);
    } catch (err: any) {
      soundFx.playWrong();
      alert(`Lỗi phát hành snapshot: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSignOut = async () => {
    soundFx.playClick();
    await adminSignOut();
    onClose();
  };

  if (!isOpen) return null;

  // Render Login Modal if not authenticated
  if (!authState.isAuthenticated) {
    return (
      <AdminLoginModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={() => {
          loadInitialData();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 overflow-hidden animate-fade-in font-game">
      {/* Top Admin Header */}
      <header className="h-16 px-4 sm:px-6 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between shrink-0 shadow-lg">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white">Mission Control</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {currentVersion}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Admin: <span className="text-slate-300">{authState.email}</span>
            </div>
          </div>
        </div>

        {/* Center: Tabs */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('VOCAB');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'VOCAB'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Quản Lý Từ Vựng</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('ANALYTICS');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'ANALYTICS'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Thống Kê Analytics</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('USERS');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'USERS'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Danh Sách Học Viên</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-xl bg-slate-800 hover:bg-rose-500/10 transition-colors"
            title="Đăng xuất Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Close back to game */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Vào Game</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-900 border-b border-slate-800 p-2">
        <button
          onClick={() => setActiveTab('VOCAB')}
          className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${
            activeTab === 'VOCAB' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
          }`}
        >
          Từ Vựng
        </button>
        <button
          onClick={() => setActiveTab('ANALYTICS')}
          className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${
            activeTab === 'ANALYTICS' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('USERS')}
          className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${
            activeTab === 'USERS' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
          }`}
        >
          Học Viên
        </button>
      </div>

      {/* Notification Toast */}
      {publishSuccessMsg && (
        <div className="bg-emerald-500/20 border-b border-emerald-500/40 py-2.5 px-4 text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{publishSuccessMsg}</span>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl w-full mx-auto">
        {isLoadingDraft ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-cyan-400 mb-3" />
            <p className="text-sm">Đang tải dữ liệu cấu hình từ Firebase...</p>
          </div>
        ) : (
          <>
            {activeTab === 'VOCAB' && (
              <VocabManager
                realms={realms}
                onChangeRealms={setRealms}
                adminEmail={authState.email || 'admin'}
                onPublishClick={handlePublishSnapshot}
              />
            )}

            {activeTab === 'ANALYTICS' && (
              <AnalyticsDashboard
                summary={analyticsSummary}
                users={usersList}
                loading={loadingAnalytics}
                onRefresh={handleRefreshAnalytics}
              />
            )}

            {activeTab === 'USERS' && (
              <UserExplorer users={usersList} loading={loadingAnalytics} />
            )}
          </>
        )}
      </main>
    </div>
  );
};
