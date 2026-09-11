import React, { useState, useEffect, useMemo } from 'react';
import { UserProgress } from '../../data/progress-types';
import { THEME_CONFIGS } from '../../data/theme-types';
import { AGE_REALMS, getRealmById } from '../../data/learning-path-data';
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
  Crown,
  Medal,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface LeaderboardModalProps {
  progress: UserProgress;
  onSelectPlayer?: (entry: LeaderboardEntry) => void;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  progress,
  onSelectPlayer,
  onClose
}) => {
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

  // Strict Top 8 Capping: Top 3 on Podium, Ranks 4 to 8 in List
  const top8Entries = useMemo(() => entries.slice(0, 8), [entries]);
  const top1 = top8Entries[0];
  const top2 = top8Entries[1];
  const top3 = top8Entries[2];
  const restEntries = top8Entries.slice(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-gradient-to-b ${theme.bgGradient} border-2 sm:border-3 ${theme.borderAccent} rounded-3xl shadow-2xl overflow-hidden`}
        style={{ boxShadow: `0 0 45px ${theme.glowColor}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-800/80 bg-slate-950/60 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-md">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black font-orbitron text-yellow-300 tracking-wider flex items-center gap-1.5 starwars-gold-glow">
                <span>BẢNG XẾP HẠNG TOP 8</span>
                <span className="text-sm">🏆</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300 font-bold">
                Top 8 phi hành gia dẫn đầu bảng vàng vũ trụ
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
            title="Đóng bảng xếp hạng"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Navigation Tabs (Concise & Punchy) */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2 bg-slate-950/40 border-b border-slate-800/60 overflow-x-auto scrollbar-none">
          <button
            onClick={() => handleTabChange('weekly')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-orbitron font-extrabold text-xs sm:text-sm transition cursor-pointer border ${
              activeTab === 'weekly'
                ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Chiến Thần Tuần</span>
          </button>

          <button
            onClick={() => handleTabChange('global')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-orbitron font-extrabold text-xs sm:text-sm transition cursor-pointer border ${
              activeTab === 'global'
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Toàn Vũ Trụ</span>
          </button>

          <button
            onClick={() => handleTabChange('realm')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-orbitron font-extrabold text-xs sm:text-sm transition cursor-pointer border ${
              activeTab === 'realm'
                ? 'bg-purple-500/25 border-purple-400 text-purple-300 shadow-md shadow-purple-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="text-xs">🪐</span>
            <span>Cùng Cấp Độ</span>
          </button>
        </div>

        {/* Realm Selector Chips (Only visible in Realm tab) */}
        {activeTab === 'realm' && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto scrollbar-none">
            <span className="text-xs font-bold text-slate-400 flex-shrink-0">Cõi:</span>
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

        {/* Main Content: Podium + Clean Top 8 List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="font-orbitron font-bold text-sm tracking-wider">
                Đang quét tín hiệu bảng xếp hạng vũ trụ...
              </span>
            </div>
          ) : (
            <>
              {/* Top 3 Podium (Clean & Punchy) */}
              {top1 && (
                <div className="pt-3 pb-1 px-1 flex items-end justify-center gap-2 sm:gap-3">
                  {/* Top 2: Silver 🥈 */}
                  {top2 && (
                    <div
                      onClick={() => {
                        soundFx.playClick();
                        onSelectPlayer?.(top2);
                      }}
                      className="flex-1 max-w-[140px] sm:max-w-[160px] flex flex-col items-center cursor-pointer group transition-transform hover:scale-105 active:scale-95"
                      title="Bấm để xem hồ sơ xạ thủ"
                    >
                      <div className="relative mb-1">
                        <div className="text-3xl sm:text-4xl drop-shadow-md group-hover:scale-110 transition">{top2.avatar}</div>
                        <span className="absolute -bottom-1 -right-1 text-base">🥈</span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-200 truncate w-full text-center group-hover:text-cyan-300 transition mb-1">
                        {top2.userName}
                      </div>

                      <div className="w-full bg-gradient-to-t from-slate-900 to-slate-800 border-t-2 border-slate-400/60 rounded-t-2xl pt-2 pb-2.5 px-1 text-center shadow-lg h-20 sm:h-22 flex flex-col justify-between">
                        <div className="font-orbitron font-black text-slate-300 text-xs sm:text-sm flex items-center justify-center gap-1">
                          <Medal className="w-3.5 h-3.5 text-slate-300" />
                          <span>#2</span>
                        </div>
                        <div className="font-orbitron font-extrabold text-amber-300 text-xs sm:text-sm">
                          {activeTab === 'weekly' ? `${top2.weeklyXp.toLocaleString()} XP` : `${top2.totalXp.toLocaleString()} XP`}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top 1: Gold 🥇 (Center, Tallest) */}
                  <div
                    onClick={() => {
                      soundFx.playClick();
                      onSelectPlayer?.(top1);
                    }}
                    className="flex-1 max-w-[150px] sm:max-w-[180px] flex flex-col items-center z-10 cursor-pointer group transition-transform hover:scale-105 active:scale-95"
                    title="Bấm để xem hồ sơ quán quân"
                  >
                    <div className="relative mb-1">
                      <Crown className="w-5 h-5 text-yellow-400 absolute -top-4 left-1/2 -translate-x-1/2 animate-bounce" />
                      <div className="text-4xl sm:text-5xl drop-shadow-[0_0_15px_rgba(250,204,21,0.7)] group-hover:scale-110 transition">
                        {top1.avatar}
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-lg">🥇</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-yellow-300 truncate w-full text-center group-hover:text-yellow-200 transition mb-1">
                      {top1.userName}
                    </div>

                    <div className="w-full bg-gradient-to-t from-amber-950/70 to-amber-900/40 border-t-3 border-amber-400 rounded-t-2xl pt-2.5 pb-2.5 px-1 text-center shadow-xl shadow-amber-500/20 h-28 sm:h-30 flex flex-col justify-between">
                      <div className="font-orbitron font-black text-yellow-300 text-xs sm:text-sm flex items-center justify-center gap-1 drop-shadow">
                        <Trophy className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span>#1 QUÁN QUÂN</span>
                      </div>
                      <div className="font-orbitron font-black text-yellow-400 text-sm sm:text-base">
                        {activeTab === 'weekly' ? `${top1.weeklyXp.toLocaleString()} XP` : `${top1.totalXp.toLocaleString()} XP`}
                      </div>
                    </div>
                  </div>

                  {/* Top 3: Bronze 🥉 */}
                  {top3 && (
                    <div
                      onClick={() => {
                        soundFx.playClick();
                        onSelectPlayer?.(top3);
                      }}
                      className="flex-1 max-w-[140px] sm:max-w-[160px] flex flex-col items-center cursor-pointer group transition-transform hover:scale-105 active:scale-95"
                      title="Bấm để xem hồ sơ xạ thủ"
                    >
                      <div className="relative mb-1">
                        <div className="text-3xl sm:text-4xl drop-shadow-md group-hover:scale-110 transition">{top3.avatar}</div>
                        <span className="absolute -bottom-1 -right-1 text-base">🥉</span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-200 truncate w-full text-center group-hover:text-cyan-300 transition mb-1">
                        {top3.userName}
                      </div>

                      <div className="w-full bg-gradient-to-t from-slate-900 to-amber-950/30 border-t-2 border-amber-700/60 rounded-t-2xl pt-2 pb-2.5 px-1 text-center shadow-lg h-16 sm:h-18 flex flex-col justify-between">
                        <div className="font-orbitron font-black text-amber-600 text-xs sm:text-sm flex items-center justify-center gap-1">
                          <Medal className="w-3.5 h-3.5 text-amber-600" />
                          <span>#3</span>
                        </div>
                        <div className="font-orbitron font-extrabold text-amber-300 text-xs sm:text-sm">
                          {activeTab === 'weekly' ? `${top3.weeklyXp.toLocaleString()} XP` : `${top3.totalXp.toLocaleString()} XP`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Ranks 4 to 8 List (Strict Top 8 Cap - Clean Rows) */}
              <div className="space-y-1.5 pt-1">
                {restEntries.map((entry) => {
                  const isUser = entry.isCurrentUser;
                  const xpValue = activeTab === 'weekly' ? entry.weeklyXp : entry.totalXp;

                  return (
                    <div
                      key={entry.uid}
                      onClick={() => {
                        soundFx.playClick();
                        onSelectPlayer?.(entry);
                      }}
                      className={`flex items-center justify-between py-2 px-3 sm:px-3.5 rounded-2xl border transition cursor-pointer active:scale-[0.99] ${
                        isUser
                          ? 'bg-cyan-500/15 border-cyan-400/80 shadow-md shadow-cyan-500/20 hover:bg-cyan-500/25'
                          : 'bg-slate-950/60 hover:bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
                      }`}
                      title="Bấm để xem hồ sơ xạ thủ"
                    >
                      {/* Left: Rank & Avatar & Name */}
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-orbitron font-black text-xs sm:text-sm flex items-center justify-center flex-shrink-0 ${
                            isUser
                              ? 'bg-cyan-500 text-slate-950 shadow-sm'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          #{entry.rank}
                        </div>

                        <span className="text-2xl sm:text-3xl flex-shrink-0">{entry.avatar}</span>

                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`font-game font-extrabold text-xs sm:text-sm truncate ${
                              isUser ? 'text-cyan-300' : 'text-white'
                            }`}
                          >
                            {entry.userName}
                          </span>
                          {isUser && (
                            <span className="px-1.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-orbitron font-black text-[9px]">
                              BẠN
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: XP Score */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Zap className={`w-3.5 h-3.5 ${activeTab === 'weekly' ? 'text-amber-400 fill-amber-400' : 'text-cyan-400 fill-cyan-400'}`} />
                        <span
                          className={`font-orbitron font-black text-xs sm:text-sm ${
                            activeTab === 'weekly' ? 'text-amber-400' : 'text-cyan-400'
                          }`}
                        >
                          {xpValue.toLocaleString()} XP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Sticky Bottom Bar: User's Standing */}
        <div className="px-4 py-2.5 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl sm:text-3xl flex-shrink-0">{progress.avatar || '🚀'}</span>
            <div className="min-w-0">
              <div className="font-game font-extrabold text-xs sm:text-sm text-white truncate">
                {progress.userName || 'Phi Hành Gia'}
              </div>
              <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 mt-0.5">
                {userEntry ? (
                  <span className="text-cyan-300 font-extrabold">
                    Thứ hạng: #{userEntry.rank}
                  </span>
                ) : (
                  <span>Chưa xếp hạng</span>
                )}
                <span>•</span>
                <span>{progress.streakDays || 1} 🔥</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-right">
              <div className="text-[10px] text-slate-400 font-black uppercase font-orbitron">
                {activeTab === 'weekly' ? 'XP Tuần' : 'Tổng XP'}
              </div>
              <div className="font-orbitron font-black text-xs sm:text-sm text-amber-400">
                {activeTab === 'weekly'
                  ? `${(progress.weeklyXp || 0).toLocaleString()} XP`
                  : `${(progress.totalXp || 0).toLocaleString()} XP`}
              </div>
            </div>

            {onSelectPlayer && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  if (userEntry) onSelectPlayer(userEntry);
                }}
                className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-orbitron font-black text-xs rounded-xl shadow-md transition active:scale-95 flex items-center gap-1 cursor-pointer"
                title="Mở Thẻ Căn Cước Phi Hành Gia của bạn"
              >
                <span>THẺ 🚀</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
