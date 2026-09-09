import React, { useState, useEffect, useMemo } from 'react';
import { UserProgress } from '../../data/progress-types';
import { THEME_CONFIGS } from '../../data/theme-types';
import { AGE_REALMS, getRealmById } from '../../data/learning-path-data';
import { getSpaceshipById } from '../../data/upgrade-types';
import {
  fetchGlobalLeaderboard,
  fetchRealmLeaderboard,
  fetchWeeklyLeaderboard,
  LeaderboardEntry,
  LeaderboardCategory
} from '../../services/firebase/leaderboardService';
import { soundFx } from '../../game/engine/SoundController';
import {
  Trophy,
  X,
  Globe2,
  Zap,
  Flame,
  Star,
  Rocket,
  Crown,
  Medal,
  RefreshCw,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface LeaderboardModalProps {
  progress: UserProgress;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ progress, onClose }) => {
  const [activeTab, setActiveTab] = useState<LeaderboardCategory>('weekly');
  const [selectedRealmId, setSelectedRealmId] = useState<string>(progress.selectedRealmId || 'realm-1');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = THEME_CONFIGS[progress.themeStyle || 'cosmic_cyan'] || THEME_CONFIGS.cosmic_cyan;

  // Load leaderboard data whenever active tab or selected realm changes
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const loadData = async () => {
      let data: LeaderboardEntry[] = [];
      if (activeTab === 'global') {
        data = await fetchGlobalLeaderboard(50, progress);
      } else if (activeTab === 'realm') {
        data = await fetchRealmLeaderboard(selectedRealmId, 50, progress);
      } else {
        data = await fetchWeeklyLeaderboard(50, progress);
      }

      if (!isCancelled) {
        setEntries(data);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [activeTab, selectedRealmId, progress]);

  const handleTabChange = (tab: LeaderboardCategory) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  const currentRealm = useMemo(() => getRealmById(selectedRealmId), [selectedRealmId]);
  const userEntry = useMemo(() => entries.find(e => e.isCurrentUser), [entries]);

  // Top 3 for Podium
  const top1 = entries[0];
  const top2 = entries[1];
  const top3 = entries[2];
  const restEntries = entries.slice(3);

  const getShipDisplay = (shipId?: string) => {
    if (!shipId) return { icon: '🚀', nameVi: 'Tân Thủ' };
    const ship = getSpaceshipById(shipId);
    return ship ? { icon: ship.icon, nameVi: ship.nameVi } : { icon: '🚀', nameVi: 'Tân Thủ' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-gradient-to-b ${theme.bgGradient} border-2 sm:border-3 ${theme.borderAccent} rounded-3xl shadow-2xl overflow-hidden`}
        style={{ boxShadow: `0 0 45px ${theme.glowColor}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-md">
              <Trophy className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-orbitron text-white tracking-wider flex items-center gap-2">
                <span>BẢNG XẾP HẠNG VŨ TRỤ</span>
                <span className="text-sm">🏆</span>
              </h2>
              <p className="text-xs text-slate-400 font-bold">
                Thi đua học tập & rèn luyện cùng các phi hành gia nhí
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-400 hover:text-white transition active:scale-95 cursor-pointer"
            title="Đóng bảng xếp hạng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2 bg-slate-950/40 border-b border-slate-800/60 overflow-x-auto scrollbar-none">
          <button
            onClick={() => handleTabChange('weekly')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-orbitron font-extrabold text-xs sm:text-sm transition cursor-pointer border ${
              activeTab === 'weekly'
                ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Chiến Thần Tuần</span>
          </button>

          <button
            onClick={() => handleTabChange('global')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-orbitron font-extrabold text-xs sm:text-sm transition cursor-pointer border ${
              activeTab === 'global'
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>Toàn Vũ Trụ</span>
          </button>

          <button
            onClick={() => handleTabChange('realm')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-orbitron font-extrabold text-xs sm:text-sm transition cursor-pointer border ${
              activeTab === 'realm'
                ? 'bg-purple-500/25 border-purple-400 text-purple-300 shadow-md shadow-purple-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="text-sm">🪐</span>
            <span>Cùng Cấp Độ</span>
          </button>
        </div>

        {/* Realm Selector Chips (Only visible in Realm tab) */}
        {activeTab === 'realm' && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto scrollbar-none">
            <span className="text-xs font-bold text-slate-400 flex-shrink-0 flex items-center gap-1">
              <span>Cõi:</span>
            </span>
            {AGE_REALMS.map((r) => {
              const isSelected = r.id === selectedRealmId;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedRealmId(r.id);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{r.icon}</span>
                  <span>{r.nameVi}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Content: Podium + Scrollable Rank List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="font-orbitron font-bold text-sm tracking-wider">
                Đang quét tín hiệu bảng xếp hạng vũ trụ...
              </span>
            </div>
          ) : (
            <>
              {/* Top 3 Podium */}
              {top1 && (
                <div className="pt-4 pb-2 px-2 flex items-end justify-center gap-2 sm:gap-4">
                  {/* Top 2: Silver 🥈 */}
                  {top2 && (
                    <div className="flex-1 max-w-[150px] sm:max-w-[170px] flex flex-col items-center">
                      <div className="relative mb-1">
                        <div className="text-3xl sm:text-4xl drop-shadow-md">{top2.avatar}</div>
                        <span className="absolute -bottom-1 -right-1 text-base">🥈</span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-200 truncate w-full text-center">
                        {top2.userName}
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 font-bold mb-1">
                        {top2.playerTag}
                      </div>

                      <div className="w-full bg-gradient-to-t from-slate-900 to-slate-800 border-t-2 border-slate-400/60 rounded-t-2xl pt-2 pb-3 px-1 text-center shadow-lg h-24 sm:h-28 flex flex-col justify-between">
                        <div className="font-orbitron font-black text-slate-300 text-sm sm:text-base flex items-center justify-center gap-1">
                          <Medal className="w-4 h-4 text-slate-300" />
                          <span>#2</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {getShipDisplay(top2.equippedShipId).icon} {getShipDisplay(top2.equippedShipId).nameVi}
                        </div>
                        <div className="font-orbitron font-extrabold text-amber-300 text-xs sm:text-sm">
                          {activeTab === 'weekly' ? `${top2.weeklyXp}⚡ XP` : `${top2.totalXp} XP`}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top 1: Gold 🥇 (Center, Tallest) */}
                  <div className="flex-1 max-w-[160px] sm:max-w-[190px] flex flex-col items-center z-10">
                    <div className="relative mb-1">
                      <Crown className="w-6 h-6 text-yellow-400 absolute -top-5 left-1/2 -translate-x-1/2 animate-bounce" />
                      <div className="text-4xl sm:text-5xl drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]">
                        {top1.avatar}
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-lg">🥇</span>
                    </div>
                    <div className="font-bold text-sm sm:text-base text-yellow-300 truncate w-full text-center">
                      {top1.userName}
                    </div>
                    <div className="text-xs font-mono text-yellow-400/80 font-bold mb-1">
                      {top1.playerTag}
                    </div>

                    <div className="w-full bg-gradient-to-t from-amber-950/70 to-amber-900/40 border-t-3 border-amber-400 rounded-t-2xl pt-3 pb-3 px-1 text-center shadow-xl shadow-amber-500/20 h-32 sm:h-36 flex flex-col justify-between">
                      <div className="font-orbitron font-black text-yellow-300 text-base sm:text-lg flex items-center justify-center gap-1 drop-shadow">
                        <Trophy className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>#1 QUÁN QUÂN</span>
                      </div>
                      <div className="text-xs text-amber-200/90 truncate flex items-center justify-center gap-1 font-bold">
                        <span>{getShipDisplay(top1.equippedShipId).icon}</span>
                        <span>{getShipDisplay(top1.equippedShipId).nameVi}</span>
                      </div>
                      <div className="font-orbitron font-black text-yellow-400 text-sm sm:text-base">
                        {activeTab === 'weekly' ? `${top1.weeklyXp}⚡ XP` : `${top1.totalXp} XP`}
                      </div>
                    </div>
                  </div>

                  {/* Top 3: Bronze 🥉 */}
                  {top3 && (
                    <div className="flex-1 max-w-[150px] sm:max-w-[170px] flex flex-col items-center">
                      <div className="relative mb-1">
                        <div className="text-3xl sm:text-4xl drop-shadow-md">{top3.avatar}</div>
                        <span className="absolute -bottom-1 -right-1 text-base">🥉</span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-200 truncate w-full text-center">
                        {top3.userName}
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 font-bold mb-1">
                        {top3.playerTag}
                      </div>

                      <div className="w-full bg-gradient-to-t from-slate-900 to-amber-950/30 border-t-2 border-amber-700/60 rounded-t-2xl pt-2 pb-3 px-1 text-center shadow-lg h-20 sm:h-24 flex flex-col justify-between">
                        <div className="font-orbitron font-black text-amber-600 text-sm sm:text-base flex items-center justify-center gap-1">
                          <Medal className="w-4 h-4 text-amber-600" />
                          <span>#3</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {getShipDisplay(top3.equippedShipId).icon} {getShipDisplay(top3.equippedShipId).nameVi}
                        </div>
                        <div className="font-orbitron font-extrabold text-amber-300 text-xs sm:text-sm">
                          {activeTab === 'weekly' ? `${top3.weeklyXp}⚡ XP` : `${top3.totalXp} XP`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Ranks 4 to 50 List */}
              <div className="space-y-1.5 pt-2">
                {restEntries.map((entry) => {
                  const ship = getShipDisplay(entry.equippedShipId);
                  const isUser = entry.isCurrentUser;

                  return (
                    <div
                      key={entry.uid}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition ${
                        isUser
                          ? 'bg-cyan-500/15 border-cyan-400/80 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-950/60 hover:bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {/* Left: Rank & Avatar & Details */}
                      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                        {/* Rank Badge */}
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-orbitron font-black text-xs sm:text-sm flex items-center justify-center flex-shrink-0 ${
                            isUser
                              ? 'bg-cyan-500 text-slate-950 shadow-sm'
                              : 'bg-slate-900 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {entry.rank}
                        </div>

                        {/* Avatar */}
                        <div className="text-2xl sm:text-3xl flex-shrink-0">{entry.avatar}</div>

                        {/* Name + PlayerTag + Ship */}
                        <div className="min-w-0 truncate">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-game font-extrabold text-xs sm:text-sm truncate ${
                                isUser ? 'text-cyan-300' : 'text-white'
                              }`}
                            >
                              {entry.userName}
                            </span>
                            {isUser && (
                              <span className="px-1.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-orbitron font-extrabold text-[9px]">
                                BẠN
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold truncate">
                            <span className="font-mono text-cyan-400">{entry.playerTag}</span>
                            <span>•</span>
                            <span className="truncate">
                              {ship.icon} {ship.nameVi}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Scores & Streak */}
                      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 text-right">
                        {/* Streak */}
                        <div
                          className="hidden sm:flex items-center gap-1 text-xs text-amber-300 font-orbitron font-bold"
                          title="Chuỗi ngày học liên tiếp"
                        >
                          <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                          <span>{entry.streakDays}</span>
                        </div>

                        {/* Stars */}
                        <div
                          className="hidden sm:flex items-center gap-1 text-xs text-yellow-300 font-orbitron font-bold"
                          title="Tổng số sao"
                        >
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span>{entry.starsCount}</span>
                        </div>

                        {/* Main Metric (Weekly XP or Total XP) */}
                        <div className="text-right">
                          <div
                            className={`font-orbitron font-black text-xs sm:text-sm ${
                              activeTab === 'weekly' ? 'text-amber-400' : 'text-cyan-400'
                            }`}
                          >
                            {activeTab === 'weekly' ? `${entry.weeklyXp} XP` : `${entry.totalXp} XP`}
                          </div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase">
                            {activeTab === 'weekly' ? 'Tuần này' : 'Toàn năng'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Sticky Bottom Bar: User's Standing */}
        <div className="px-4 py-3 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl sm:text-3xl">{progress.avatar || '🚀'}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-game font-extrabold text-xs sm:text-sm text-white truncate">
                  {progress.userName || 'Phi Hành Gia'}
                </span>
                <span className="font-mono text-[11px] text-cyan-400 font-bold">
                  {progress.playerTag || '#PEW'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                {userEntry ? (
                  <span className="text-cyan-300 font-extrabold">
                    Thứ hạng hiện tại: #{userEntry.rank}
                  </span>
                ) : (
                  <span>Chưa có dữ liệu</span>
                )}
                <span>•</span>
                <span>{progress.streakDays || 1} 🔥</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">
                {activeTab === 'weekly' ? 'XP Tuần Này' : 'Tổng XP'}
              </div>
              <div className="font-orbitron font-black text-xs sm:text-sm text-amber-400">
                {activeTab === 'weekly' ? `${progress.weeklyXp || 0} XP` : `${progress.totalXp || 0} XP`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
