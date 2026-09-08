import React, { useState, useEffect, useRef } from 'react';
import { UserProgress } from '../../data/progress-types';
import {
  SpaceshipItem,
  BlasterItem,
  LaserBeamItem,
  SPACESHIPS,
  BLASTERS,
  LASER_BEAMS,
  getSpaceshipById,
  getBlasterById,
  getLaserById
} from '../../data/upgrade-types';
import { unlockAndEquipItem, equipItem } from '../../services/progressStorage';
import { soundFx } from '../../game/engine/SoundController';
import { drawSpaceship, drawBlasterPreview, drawLaserPreview, getBlasterMuzzleOrigins } from '../../game/engine/ShipRenderer';
import { Gem, Sparkles, X, Check, Lock, Rocket, Zap, Shield, Play } from 'lucide-react';
import { MascotWidget } from '../mascot/MascotWidget';

interface ArmoryModalProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onClose: () => void;
}

type TabType = 'SHIPS' | 'BLASTERS' | 'LASERS';

// Mini Canvas component for Ship Thumbnails
const ShipThumbnail: React.FC<{ ship: SpaceshipItem; isSelected: boolean }> = ({ ship, isSelected }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSpaceship(ctx, canvas.width / 2, canvas.height / 2 + 6, ship, undefined, 0.85);
      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [ship]);

  return (
    <div
      className={`w-18 h-18 rounded-2xl flex items-center justify-center p-1 border-2 flex-shrink-0 transition ${
        isSelected
          ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
          : 'bg-slate-900/90 border-slate-700'
      }`}
    >
      <canvas ref={canvasRef} width={72} height={72} className="w-full h-full block" />
    </div>
  );
};

// Mini Canvas component for Blaster Thumbnails
const BlasterThumbnail: React.FC<{ blaster: BlasterItem; isSelected: boolean }> = ({ blaster, isSelected }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      drawBlasterPreview(ctx, canvas.width, canvas.height, blaster);
      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [blaster]);

  return (
    <div
      className={`w-18 h-18 rounded-2xl flex items-center justify-center p-1 border-2 flex-shrink-0 transition ${
        isSelected
          ? 'bg-pink-950/80 border-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.4)]'
          : 'bg-slate-900/90 border-slate-700'
      }`}
    >
      <canvas ref={canvasRef} width={72} height={72} className="w-full h-full block" />
    </div>
  );
};

// Mini Canvas component for Laser Thumbnails
const LaserThumbnail: React.FC<{ laser: LaserBeamItem; isSelected: boolean }> = ({ laser, isSelected }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      drawLaserPreview(ctx, canvas.width, canvas.height, laser);
      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [laser]);

  return (
    <div
      className={`w-18 h-18 rounded-2xl flex items-center justify-center p-1 border-2 flex-shrink-0 transition ${
        isSelected
          ? 'bg-amber-950/80 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.4)]'
          : 'bg-slate-900/90 border-slate-700'
      }`}
    >
      <canvas ref={canvasRef} width={72} height={72} className="w-full h-full block" />
    </div>
  );
};

export const ArmoryModal: React.FC<ArmoryModalProps> = ({
  progress,
  onUpdateProgress,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('SHIPS');
  const [previewShipId, setPreviewShipId] = useState<string>(progress.equippedShipId || 'ship-scout');
  const [previewBlasterId, setPreviewBlasterId] = useState<string>(progress.equippedBlasterId || 'blaster-single');
  const [previewLaserId, setPreviewLaserId] = useState<string>(progress.equippedLaserId || 'laser-cyan');
  const [isTestFiring, setIsTestFiring] = useState<boolean>(false);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const testLasersRef = useRef<Array<{ x: number; y: number; vy: number; alpha: number; color: string; width: number; particleType: string }>>([]);

  const activeShip = getSpaceshipById(previewShipId);
  const activeBlaster = getBlasterById(previewBlasterId);
  const activeLaser = getLaserById(previewLaserId);

  // Live Canvas Preview of Ship & Lasers
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Starfield dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      for (let i = 0; i < 20; i++) {
        const sx = (i * 37 + Date.now() * 0.02) % canvas.width;
        const sy = (i * 29) % canvas.height;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Draw Test Lasers
      const lasers = testLasersRef.current;
      for (let i = lasers.length - 1; i >= 0; i--) {
        const l = lasers[i];
        l.y += l.vy;
        l.alpha -= 0.02;

        ctx.save();
        ctx.globalAlpha = Math.max(0, l.alpha);

        if (l.particleType === 'rainbow') {
          const grad = ctx.createLinearGradient(l.x, l.y + 24, l.x, l.y);
          grad.addColorStop(0, '#f43f5e');
          grad.addColorStop(0.3, '#fbbf24');
          grad.addColorStop(0.7, '#38bdf8');
          grad.addColorStop(1, '#c084fc');
          ctx.strokeStyle = grad;
          ctx.shadowColor = '#38bdf8';
        } else if (l.particleType === 'lightning') {
          ctx.strokeStyle = '#facc15';
          ctx.shadowColor = '#fef08a';
        } else if (l.particleType === 'plasma') {
          ctx.strokeStyle = '#f472b6';
          ctx.shadowColor = '#f472b6';
        } else if (l.particleType === 'flame') {
          ctx.strokeStyle = '#f97316';
          ctx.shadowColor = '#f43f5e';
        } else {
          ctx.strokeStyle = l.color;
          ctx.shadowColor = l.color;
        }

        ctx.shadowBlur = 14;
        ctx.lineWidth = l.width;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y + 24);
        ctx.lineTo(l.x, l.y);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Tip Flare
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.width * 0.7 + 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        if (l.y < 0 || l.alpha <= 0) {
          lasers.splice(i, 1);
        }
      }

      // Draw Ship at Bottom Center using rich renderer
      const shipX = canvas.width / 2;
      const shipY = canvas.height - 45;
      drawSpaceship(ctx, shipX, shipY, activeShip, activeBlaster, 1.25);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeShip, activeBlaster, activeLaser]);

  const handleTestFire = () => {
    soundFx.playCustomLaser(activeBlaster.fireSound);
    setIsTestFiring(true);
    setTimeout(() => setIsTestFiring(false), 300);

    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const shipX = canvas.width / 2;
    const shipY = canvas.height - 45;

    // Spawn test projectiles for each barrel offset
    const origins = getBlasterMuzzleOrigins(shipX, shipY, activeBlaster, 1.25);
    origins.forEach(origin => {
      testLasersRef.current.push({
        x: origin.x,
        y: origin.y,
        vy: -7,
        alpha: 1,
        color: activeLaser.beamColor,
        width: activeLaser.beamWidth,
        particleType: activeLaser.particleType
      });
    });
  };

  const handleUnlockOrEquip = (
    itemId: string,
    itemType: 'ship' | 'blaster' | 'laser',
    priceGems: number
  ) => {
    const isUnlocked = progress.unlockedUpgradeIds.includes(itemId);

    if (isUnlocked) {
      soundFx.playClick();
      onUpdateProgress(prev => equipItem(prev, itemId, itemType));
    } else {
      if (progress.gems >= priceGems) {
        soundFx.playUpgradeSuccess();
        soundFx.playGemPickup();
        onUpdateProgress(prev => unlockAndEquipItem(prev, itemId, itemType, priceGems));
      } else {
        soundFx.playWrong();
      }
    }

    if (itemType === 'ship') setPreviewShipId(itemId);
    if (itemType === 'blaster') setPreviewBlasterId(itemId);
    if (itemType === 'laser') setPreviewLaserId(itemId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-[#101438] to-slate-950 border-3 border-cyan-400 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(0,240,255,0.35)] my-4 text-white">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Gems Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pr-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-xs sm:text-sm font-extrabold uppercase">
              <Rocket className="w-4 h-4" /> Xưởng Chế Tạo Ngân Hà
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-game text-yellow-300 mt-1">
              TỦ ĐỒ CHƠI & VŨ KHÍ 🛠️
            </h2>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-2 border-cyan-400 rounded-2xl shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Gem className="w-5 h-5 text-cyan-400 fill-cyan-400 animate-bounce" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Kim Cương</div>
              <div className="text-lg font-extrabold font-game text-white">{progress.gems} 💎</div>
            </div>
          </div>
        </div>

        {/* Live Interactive Preview Box */}
        <div className="relative bg-slate-950/85 border-2 border-slate-800 rounded-3xl p-3.5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
          <div className="relative w-48 h-32 bg-slate-900/95 rounded-2xl border-2 border-cyan-400/40 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
            <canvas ref={previewCanvasRef} width={192} height={128} className="w-full h-full block" />
            <div className="absolute top-2 left-2 text-[10px] font-extrabold text-cyan-300 bg-slate-950/90 px-2 py-0.5 rounded-md border border-cyan-400/50">
              MÔ HÌNH 3D TRỰC QUAN
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="text-xs text-cyan-400 font-extrabold uppercase flex items-center gap-1.5 justify-center sm:justify-start">
              <span>{activeShip.icon} {activeShip.nameVi}</span> • <span>{activeBlaster.nameVi}</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">{activeShip.perkDescription}</div>
            <div className="text-xs text-amber-300 mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tia Đạn: <strong>{activeLaser.nameVi}</strong> ({activeLaser.description})</span>
            </div>
          </div>

          <button
            onClick={handleTestFire}
            className={`px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold font-game text-sm rounded-2xl shadow-md border-b-4 border-rose-700 active:border-b-0 active:translate-y-1 transition flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
              isTestFiring ? 'scale-95 brightness-125' : ''
            }`}
          >
            <Play className="w-4 h-4 fill-white" />
            BẮN THỬ!
          </button>
        </div>

        {/* 3 Categories Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('SHIPS');
            }}
            className={`py-2.5 px-2 rounded-2xl font-game font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer border-2 ${
              activeTab === 'SHIPS'
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-102'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>TÀU VŨ TRỤ ({SPACESHIPS.length})</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('BLASTERS');
            }}
            className={`py-2.5 px-2 rounded-2xl font-game font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer border-2 ${
              activeTab === 'BLASTERS'
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-102'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>SÚNG BẮN ({BLASTERS.length})</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('LASERS');
            }}
            className={`py-2.5 px-2 rounded-2xl font-game font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer border-2 ${
              activeTab === 'LASERS'
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-102'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>TIA LAZE ({LASER_BEAMS.length})</span>
          </button>
        </div>

        {/* Tab 1: Spaceships with Live Mini-Canvases for each model! */}
        {activeTab === 'SHIPS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {SPACESHIPS.map((ship) => {
              const isUnlocked = progress.unlockedUpgradeIds.includes(ship.id);
              const isEquipped = progress.equippedShipId === ship.id;
              const isPreviewing = previewShipId === ship.id;
              const canAfford = progress.gems >= ship.priceGems;

              return (
                <div
                  key={ship.id}
                  onClick={() => setPreviewShipId(ship.id)}
                  className={`p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    isEquipped
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : isPreviewing
                      ? 'bg-slate-900 border-cyan-500/80 ring-2 ring-cyan-400/40'
                      : isUnlocked
                      ? 'bg-slate-900/80 border-slate-700 hover:border-cyan-500'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <ShipThumbnail ship={ship} isSelected={isPreviewing || isEquipped} />
                    <div>
                      <div className="font-extrabold font-game text-base text-white flex items-center gap-2">
                        {ship.nameVi}
                        {isEquipped && (
                          <span className="px-2 py-0.5 bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[10px] rounded-full">
                            Đang Dùng
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 leading-tight">{ship.perkDescription}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-300">
                      {ship.priceGems === 0 ? 'Miễn Phí' : `${ship.priceGems} 💎`}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlockOrEquip(ship.id, 'ship', ship.priceGems);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-game font-bold text-xs transition flex items-center gap-1 cursor-pointer ${
                        isEquipped
                          ? 'bg-emerald-500 text-slate-950 cursor-default'
                          : isUnlocked
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 active:scale-95'
                          : canAfford
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-md active:scale-95'
                          : 'bg-slate-800 text-slate-400 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> ĐÃ TRANG BỊ
                        </>
                      ) : isUnlocked ? (
                        'TRANG BỊ'
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" /> MỞ KHÓA ({ship.priceGems} 💎)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Blasters */}
        {activeTab === 'BLASTERS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {BLASTERS.map((blaster) => {
              const isUnlocked = progress.unlockedUpgradeIds.includes(blaster.id);
              const isEquipped = progress.equippedBlasterId === blaster.id;
              const isPreviewing = previewBlasterId === blaster.id;
              const canAfford = progress.gems >= blaster.priceGems;

              return (
                <div
                  key={blaster.id}
                  onClick={() => setPreviewBlasterId(blaster.id)}
                  className={`p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    isEquipped
                      ? 'bg-pink-950/60 border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.3)]'
                      : isPreviewing
                      ? 'bg-slate-900 border-pink-500/80 ring-2 ring-pink-400/40'
                      : isUnlocked
                      ? 'bg-slate-900/80 border-slate-700 hover:border-pink-500'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <BlasterThumbnail blaster={blaster} isSelected={isPreviewing || isEquipped} />
                    <div>
                      <div className="font-extrabold font-game text-base text-white flex items-center gap-2">
                        {blaster.nameVi}
                        {isEquipped && (
                          <span className="px-2 py-0.5 bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[10px] rounded-full">
                            Đang Dùng
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 leading-tight">{blaster.description}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-300">
                      {blaster.priceGems === 0 ? 'Miễn Phí' : `${blaster.priceGems} 💎`}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlockOrEquip(blaster.id, 'blaster', blaster.priceGems);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-game font-bold text-xs transition flex items-center gap-1 cursor-pointer ${
                        isEquipped
                          ? 'bg-emerald-500 text-slate-950 cursor-default'
                          : isUnlocked
                          ? 'bg-pink-500 hover:bg-pink-400 text-white active:scale-95'
                          : canAfford
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-md active:scale-95'
                          : 'bg-slate-800 text-slate-400 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> ĐÃ TRANG BỊ
                        </>
                      ) : isUnlocked ? (
                        'TRANG BỊ'
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" /> MỞ KHÓA ({blaster.priceGems} 💎)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Lasers */}
        {activeTab === 'LASERS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {LASER_BEAMS.map((laser) => {
              const isUnlocked = progress.unlockedUpgradeIds.includes(laser.id);
              const isEquipped = progress.equippedLaserId === laser.id;
              const isPreviewing = previewLaserId === laser.id;
              const canAfford = progress.gems >= laser.priceGems;

              return (
                <div
                  key={laser.id}
                  onClick={() => setPreviewLaserId(laser.id)}
                  className={`p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    isEquipped
                      ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : isPreviewing
                      ? 'bg-slate-900 border-amber-500/80 ring-2 ring-amber-400/40'
                      : isUnlocked
                      ? 'bg-slate-900/80 border-slate-700 hover:border-amber-500'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <LaserThumbnail laser={laser} isSelected={isPreviewing || isEquipped} />
                    <div>
                      <div className="font-extrabold font-game text-base text-white flex items-center gap-2">
                        {laser.nameVi}
                        {isEquipped && (
                          <span className="px-2 py-0.5 bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[10px] rounded-full">
                            Đang Dùng
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 leading-tight">{laser.description}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-300">
                      {laser.priceGems === 0 ? 'Miễn Phí' : `${laser.priceGems} 💎`}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlockOrEquip(laser.id, 'laser', laser.priceGems);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-game font-bold text-xs transition flex items-center gap-1 cursor-pointer ${
                        isEquipped
                          ? 'bg-emerald-500 text-slate-950 cursor-default'
                          : isUnlocked
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-95'
                          : canAfford
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-md active:scale-95'
                          : 'bg-slate-800 text-slate-400 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> ĐÃ TRANG BỊ
                        </>
                      ) : isUnlocked ? (
                        'TRANG BỊ'
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" /> MỞ KHÓA ({laser.priceGems} 💎)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Mascot Tip */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <MascotWidget
            mood="happy"
            customMessage="Chăm chỉ học thêm nhiều từ vựng để mở khóa trọn bộ siêu tàu vũ trụ nhé! 🚀"
          />

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="py-3 px-6 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-game font-extrabold text-base rounded-2xl shadow-lg border-b-4 border-emerald-600 active:border-b-0 active:translate-y-1 transition cursor-pointer flex-shrink-0"
          >
            XONG RỒI! 🎮
          </button>
        </div>
      </div>
    </div>
  );
};
