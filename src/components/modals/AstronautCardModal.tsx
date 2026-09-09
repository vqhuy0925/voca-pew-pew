import React, { useState, useEffect, useRef, useMemo } from 'react';
import { UserProgress } from '../../data/progress-types';
import { LeaderboardEntry } from '../../services/firebase/leaderboardService';
import { THEME_CONFIGS } from '../../data/theme-types';
import {
  AstronautCardData,
  extractCardData,
  renderAstronautCardToCanvas,
  downloadAstronautCard,
  copyAstronautCardToClipboard,
  shareAstronautCard
} from '../../services/shareCardGenerator';
import {
  BADGES,
  getBadgeById,
  getAvailableTitlesForPlayer,
  BadgeItem,
  calculateWordsMastered
} from '../../data/badge-data';
import { updateAstronautShowcase } from '../../services/progressStorage';
import { soundFx } from '../../game/engine/SoundController';
import {
  X,
  Download,
  Copy,
  Share2,
  Award,
  Sparkles,
  Rocket,
  Flame,
  Star,
  Check,
  Zap,
  Shield,
  HeartHandshake,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface AstronautCardModalProps {
  currentProgress: UserProgress;
  targetEntry?: LeaderboardEntry | null;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onClose: () => void;
}

type TabMode = 'CARD' | 'CUSTOMIZE' | 'ALL_BADGES';

export const AstronautCardModal: React.FC<AstronautCardModalProps> = ({
  currentProgress,
  targetEntry,
  onUpdateProgress,
  onClose
}) => {
  const isOwner = !targetEntry || targetEntry.isCurrentUser;
  const cardData = useMemo<AstronautCardData>(() => {
    return isOwner ? extractCardData(currentProgress) : extractCardData(targetEntry);
  }, [isOwner, currentProgress, targetEntry]);

  const [activeTab, setActiveTab] = useState<TabMode>('CARD');
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [cheerNotice, setCheerNotice] = useState<string | null>(null);
  const [selectedBadges, setSelectedBadges] = useState<string[]>(() => {
    return currentProgress.selectedBadgeIds || [];
  });
  const [activeTitle, setActiveTitle] = useState<string>(() => {
    return currentProgress.activeTitle || 'Phi Hành Gia Tập Sự';
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = THEME_CONFIGS[currentProgress.themeStyle || 'galactic_starwars'] || THEME_CONFIGS.galactic_starwars;

  // Redraw canvas card whenever active cardData changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderAstronautCardToCanvas(canvas, cardData);
  }, [cardData, activeTab]);

  // Handle Badge Toggle in Customize Mode
  const handleToggleBadge = (badgeId: string) => {
    soundFx.playClick();
    let updated: string[];
    if (selectedBadges.includes(badgeId)) {
      updated = selectedBadges.filter(id => id !== badgeId);
    } else {
      if (selectedBadges.length >= 3) {
        // Replace oldest or cap at 3
        updated = [...selectedBadges.slice(1), badgeId];
      } else {
        updated = [...selectedBadges, badgeId];
      }
    }
    setSelectedBadges(updated);
    const updatedUser = updateAstronautShowcase(activeTitle, updated);
    onUpdateProgress(() => updatedUser);
  };

  // Handle Title Select
  const handleSelectTitle = (title: string) => {
    soundFx.playClick();
    setActiveTitle(title);
    const updatedUser = updateAstronautShowcase(title, selectedBadges);
    onUpdateProgress(() => updatedUser);
  };

  // 1-Click Download
  const handleDownload = async () => {
    soundFx.playVictory();
    await downloadAstronautCard(isOwner ? currentProgress : targetEntry!);
    setCopiedToast('Đã tải ảnh Thẻ Phi Hành Gia về máy thành công! 🚀');
    setTimeout(() => setCopiedToast(null), 3500);
  };

  // 1-Click Copy
  const handleCopy = async () => {
    soundFx.playClick();
    const res = await copyAstronautCardToClipboard(isOwner ? currentProgress : targetEntry!);
    setCopiedToast(res.message);
    setTimeout(() => setCopiedToast(null), 3500);
  };

  // 1-Click Share
  const handleShare = async () => {
    soundFx.playClick();
    await shareAstronautCard(isOwner ? currentProgress : targetEntry!);
  };

  // Visitor Cheer Reactions
  const handleSendCheer = (type: 'firework' | 'star' | 'clap' | 'flame') => {
    if (type === 'firework') {
      soundFx.playExplosion();
      setCheerNotice('🚀 Bé vừa bắn một chùm pháo hoa chúc mừng bạn ấy!');
    } else if (type === 'star') {
      soundFx.playStarPop(3);
      setCheerNotice('⭐ Đã gửi tặng 1 ngôi sao may mắn tới bạn ấy!');
    } else if (type === 'clap') {
      soundFx.playVictory();
      setCheerNotice('👏 Bé vừa vỗ tay tán thưởng thành tích phi hành đoàn!');
    } else {
      soundFx.playPew();
      setCheerNotice('🔥 Đã tiếp lửa quyết tâm cùng bạn ấy chinh phục vũ trụ!');
    }
    setTimeout(() => setCheerNotice(null), 3000);
  };

  const unlockedBadgeIdSet = useMemo(() => {
    return new Set(currentProgress.unlockedBadgeIds || []);
  }, [currentProgress.unlockedBadgeIds]);

  const availableTitles = useMemo(() => {
    return getAvailableTitlesForPlayer(currentProgress);
  }, [currentProgress]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-gradient-to-b ${theme.bgGradient} border-2 sm:border-3 ${theme.borderAccent} rounded-3xl shadow-2xl overflow-hidden`}
        style={{ boxShadow: `0 0 50px ${theme.glowColor}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-orbitron font-black text-base sm:text-lg text-white flex items-center gap-2">
                <span>{isOwner ? 'THẺ CĂN CƯỚC PHI HÀNH GIA' : `HỒ SƠ: ${cardData.userName}`}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 font-mono">
                  {cardData.playerTag}
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {isOwner ? 'Khoe chiến cơ, danh hiệu & huy hiệu vinh quang với bạn bè' : 'Xem thông số chiến cơ & gửi lời chúc mừng'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Owner mode only) */}
        {isOwner && (
          <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-slate-900/50 border-b border-slate-800/60 overflow-x-auto">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('CARD');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-orbitron font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'CARD'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Thẻ Hologram</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('CUSTOMIZE');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-orbitron font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'CUSTOMIZE'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gắn Huy Hiệu & Danh Hiệu ({selectedBadges.length}/3)</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('ALL_BADGES');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-orbitron font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ALL_BADGES'
                  ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/25'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Kho Huy Hiệu ({unlockedBadgeIdSet.size}/{BADGES.length})</span>
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Notification Toast */}
          {copiedToast && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{copiedToast}</span>
            </div>
          )}

          {cheerNotice && (
            <div className="p-3 bg-amber-500/20 border border-amber-400 text-amber-300 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 animate-bounce" />
              <span>{cheerNotice}</span>
            </div>
          )}

          {/* TAB 1: CARD PREVIEW & SHARING */}
          {activeTab === 'CARD' && (
            <div className="space-y-4">
              {/* Canvas Card Hologram Frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl bg-slate-950/80 group">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto block rounded-2xl"
                  style={{ aspectRatio: '1200 / 675' }}
                />

                {/* Holographic Watermark Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-400/50 text-[10px] font-orbitron font-extrabold text-cyan-300 flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>OFFICIAL CITIZEN ID</span>
                </div>
              </div>

              {/* 1-Click Action Buttons for Owner */}
              {isOwner ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <button
                    onClick={handleDownload}
                    className="py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-orbitron font-black text-xs sm:text-sm rounded-2xl shadow-lg border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>TẢI THẺ VỀ MÁY</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-400 font-game font-bold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
                  >
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>SAO CHÉP ẢNH</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-game font-bold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>CHIA SẺ (ZALO / FB)</span>
                  </button>
                </div>
              ) : (
                /* Visitor Mode: Cheering Interactions */
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300">
                    <HeartHandshake className="w-4 h-4 text-pink-400" />
                    <span>Gửi Tương Tác Cổ Vũ Phi Hành Đoàn (An toàn cho trẻ em)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => handleSendCheer('firework')}
                      className="p-2.5 bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/40 rounded-xl text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>🚀 Bắn Pháo Hoa</span>
                    </button>

                    <button
                      onClick={() => handleSendCheer('star')}
                      className="p-2.5 bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 rounded-xl text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>⭐ Tặng Ngôi Sao</span>
                    </button>

                    <button
                      onClick={() => handleSendCheer('clap')}
                      className="p-2.5 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>👏 Vỗ Tay Cổ Vũ</span>
                    </button>

                    <button
                      onClick={() => handleSendCheer('flame')}
                      className="p-2.5 bg-orange-950/60 hover:bg-orange-900/70 border border-orange-500/40 rounded-xl text-orange-300 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>🔥 Tiếp Thêm Lửa</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CUSTOMIZE TITLE & 3 SHOWCASE BADGES */}
          {activeTab === 'CUSTOMIZE' && (
            <div className="space-y-5">
              {/* Title Selection */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-orbitron font-extrabold text-sm text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>DANH HIỆU ĐƯỢC HIỂN THỊ</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">Chọn 1 danh hiệu mở khóa</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableTitles.map(t => {
                    const isSelected = activeTitle === t;
                    return (
                      <button
                        key={t}
                        onClick={() => handleSelectTitle(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border border-amber-300 shadow-md font-extrabold scale-105'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>🎖️ {t}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3 Badges Selector */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-orbitron font-extrabold text-sm text-cyan-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <span>CHỌN 3 HUY HIỆU ĐEO TRÊN THẺ ({selectedBadges.length}/3)</span>
                    </h3>
                    <p className="text-xs text-slate-400">Bấm vào huy hiệu bạn đã đạt để gắn hoặc tháo khỏi thẻ căn cước</p>
                  </div>
                </div>

                {/* Grid of unlocked badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BADGES.filter(b => unlockedBadgeIdSet.has(b.id)).map(badge => {
                    const isPinned = selectedBadges.includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        onClick={() => handleToggleBadge(badge.id)}
                        className={`p-3 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                          isPinned
                            ? 'bg-cyan-950/70 border-cyan-400 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl flex-shrink-0">{badge.icon}</span>
                          <div className="min-w-0">
                            <div className="font-game font-bold text-xs sm:text-sm text-white truncate">
                              {badge.nameVi}
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1">{badge.descriptionVi}</div>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2 ${
                            isPinned ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-800 border border-slate-700'
                          }`}
                        >
                          {isPinned && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALL BADGES ENCYCLOPEDIA */}
          {activeTab === 'ALL_BADGES' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-orbitron font-extrabold text-slate-400">
                  TIẾN ĐỘ THU THẬP: {unlockedBadgeIdSet.size}/{BADGES.length} HUY HIỆU
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BADGES.map(badge => {
                  const isUnlocked = unlockedBadgeIdSet.has(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-2xl border transition flex items-start gap-3.5 ${
                        isUnlocked
                          ? 'bg-slate-900/90 border-slate-700 shadow-sm'
                          : 'bg-slate-950/50 border-slate-800/60 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                          isUnlocked ? `${badge.borderColor} bg-slate-900 shadow-sm` : 'border-slate-800 bg-slate-900/50 grayscale'
                        }`}
                        style={{ boxShadow: isUnlocked ? `0 0 12px ${badge.glowColor}` : undefined }}
                      >
                        {badge.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className={`font-game font-extrabold text-xs sm:text-sm truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                            {badge.nameVi}
                          </h4>
                          <span
                            className="text-[9px] font-orbitron font-extrabold px-1.5 py-0.5 rounded"
                            style={{ color: badge.color, backgroundColor: `${badge.color}15` }}
                          >
                            {badge.rarity}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{badge.descriptionVi}</p>

                        <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold">
                          <span className="text-amber-400">🎖️ {badge.unlockedTitle}</span>
                          {isUnlocked && (
                            <span className="text-emerald-400 font-extrabold flex items-center gap-0.5 ml-auto">
                              <Check className="w-3 h-3 stroke-[3]" /> Đã Đạt
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
