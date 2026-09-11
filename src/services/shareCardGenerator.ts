import { UserProgress } from '../data/progress-types';
import { LeaderboardEntry } from './firebase/leaderboardService';
import { getSpaceshipById, getBlasterById, getLaserById, RARITY_CONFIGS } from '../data/upgrade-types';
import { drawSpaceship } from '../game/engine/ShipRenderer';
import { getBadgeById, calculateWordsMastered, calculateThreeStarCount, DEFAULT_TITLE } from '../data/badge-data';
import { getRealmById } from '../data/learning-path-data';

export interface AstronautCardData {
  userName: string;
  playerTag: string;
  avatar: string;
  activeTitle?: string;
  selectedRealmId?: string;
  equippedShipId?: string;
  equippedBlasterId?: string;
  equippedLaserId?: string;
  selectedBadgeIds?: string[];
  totalXp: number;
  starsCount: number;
  streakDays: number;
  wordsMastered: number;
}

/**
 * Extract profile card data from either current user progress or a leaderboard entry
 */
export const extractCardData = (source: UserProgress | LeaderboardEntry): AstronautCardData => {
  if ('levelProgressMap' in source) {
    // Current UserProgress
    const progress = source as UserProgress;
    return {
      userName: progress.userName?.trim() || 'Phi Hành Gia',
      playerTag: progress.playerTag || '#PEW-????',
      avatar: progress.avatar || '🚀',
      activeTitle: progress.activeTitle || DEFAULT_TITLE,
      selectedRealmId: progress.selectedRealmId || 'realm-1',
      equippedShipId: progress.equippedShipId || 'ship-scout',
      equippedBlasterId: progress.equippedBlasterId || 'blaster-single',
      equippedLaserId: progress.equippedLaserId || 'laser-cyan',
      selectedBadgeIds: progress.selectedBadgeIds || [],
      totalXp: progress.totalXp || 0,
      starsCount: Object.values(progress.levelProgressMap || {}).reduce((s, l) => s + (l.stars || 0), 0),
      streakDays: progress.streakDays || 1,
      wordsMastered: calculateWordsMastered(progress)
    };
  } else {
    // LeaderboardEntry
    const entry = source as LeaderboardEntry;
    return {
      userName: entry.userName || 'Phi Hành Gia',
      playerTag: entry.playerTag || '#PEW-????',
      avatar: entry.avatar || '🚀',
      activeTitle: entry.activeTitle || DEFAULT_TITLE,
      selectedRealmId: entry.selectedRealmId || 'realm-1',
      equippedShipId: entry.equippedShipId || 'ship-scout',
      equippedBlasterId: entry.equippedBlasterId || 'blaster-single',
      equippedLaserId: entry.equippedLaserId || 'laser-cyan',
      selectedBadgeIds: entry.selectedBadgeIds || [],
      totalXp: entry.totalXp || 0,
      starsCount: entry.starsCount || 0,
      streakDays: entry.streakDays || 1,
      wordsMastered: entry.wordsMastered || 0
    };
  }
};

/**
 * Render the full Holographic Astronaut Citizen ID card onto an HTML5 Canvas
 */
export const renderAstronautCardToCanvas = (
  canvas: HTMLCanvasElement,
  data: AstronautCardData
): void => {
  const width = 1200;
  const height = 675;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Deep Space Cosmic Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#030712');
  bgGrad.addColorStop(0.45, '#090d1f');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Cosmic Nebula Glows
  // Cyan glow top-left
  const cyanGlow = ctx.createRadialGradient(250, 180, 20, 250, 180, 420);
  cyanGlow.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
  cyanGlow.addColorStop(0.6, 'rgba(6, 182, 212, 0.05)');
  cyanGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(0, 0, width, height);

  // Purple glow bottom-right
  const purpleGlow = ctx.createRadialGradient(950, 480, 20, 950, 480, 450);
  purpleGlow.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
  purpleGlow.addColorStop(0.6, 'rgba(168, 85, 247, 0.05)');
  purpleGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = purpleGlow;
  ctx.fillRect(0, 0, width, height);

  // 3. Starlight Sparkles (deterministic distribution)
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 90; i++) {
    const sx = (i * 137.5) % (width - 40) + 20;
    const sy = (i * 293.7) % (height - 40) + 20;
    const sRad = ((i % 4) + 1) * 0.7;
    const alpha = 0.25 + ((i % 5) * 0.15);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // 4. Outer Holographic ID Card Border Frame
  const margin = 28;
  const cardW = width - margin * 2;
  const cardH = height - margin * 2;
  const radius = 26;

  // Card Outer Glow
  ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
  ctx.shadowBlur = 24;
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(margin, margin, cardW, cardH, radius);
  ctx.stroke();

  // Inner subtle border
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(margin + 8, margin + 8, cardW - 16, cardH - 16, radius - 6);
  ctx.stroke();

  // Corner Sci-Fi Tech Accents
  const bracketSize = 22;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3.5;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(margin + 16, margin + 16 + bracketSize);
  ctx.lineTo(margin + 16, margin + 16);
  ctx.lineTo(margin + 16 + bracketSize, margin + 16);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(width - margin - 16 - bracketSize, margin + 16);
  ctx.lineTo(width - margin - 16, margin + 16);
  ctx.lineTo(width - margin - 16, margin + 16 + bracketSize);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(margin + 16, height - margin - 16 - bracketSize);
  ctx.lineTo(margin + 16, height - margin - 16);
  ctx.lineTo(margin + 16 + bracketSize, height - margin - 16);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(width - margin - 16 - bracketSize, height - margin - 16);
  ctx.lineTo(width - margin - 16, height - margin - 16);
  ctx.lineTo(width - margin - 16, height - margin - 16 - bracketSize);
  ctx.stroke();

  // 5. Header Bar
  const headerY = margin + 20;
  ctx.font = '900 18px "Orbitron", system-ui, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.textAlign = 'left';
  ctx.fillText('⚡ THẺ CĂN CƯỚC PHI HÀNH GIA', margin + 32, headerY + 16);

  ctx.font = 'bold 16px "Orbitron", monospace';
  ctx.fillStyle = '#facc15';
  ctx.textAlign = 'right';
  ctx.fillText(data.playerTag, width - margin - 32, headerY + 16);

  // Horizontal separator line under header
  const sepGrad = ctx.createLinearGradient(margin + 32, 0, width - margin - 32, 0);
  sepGrad.addColorStop(0, 'rgba(56, 189, 248, 0.8)');
  sepGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.7)');
  sepGrad.addColorStop(1, 'rgba(168, 85, 247, 0.8)');
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(margin + 32, headerY + 28);
  ctx.lineTo(width - margin - 32, headerY + 28);
  ctx.stroke();

  // 6. Left Column: Hangar Bay & Spaceship Showcase
  const hangarX = margin + 32;
  const hangarY = headerY + 44;
  const hangarW = 380;
  const hangarH = 490;

  // Hangar Bay Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(hangarX, hangarY, hangarW, hangarH, 20);
  ctx.fill();
  ctx.stroke();

  // Hologram grid pad circle
  const padCenterX = hangarX + hangarW / 2;
  const padCenterY = hangarY + 185;
  ctx.save();
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
  ctx.lineWidth = 1.5;
  for (let r = 35; r <= 135; r += 32) {
    ctx.beginPath();
    ctx.arc(padCenterX, padCenterY, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Render Spaceship Model
  const shipItem = getSpaceshipById(data.equippedShipId || 'ship-scout');
  const blasterItem = getBlasterById(data.equippedBlasterId || 'blaster-single');
  const laserItem = getLaserById(data.equippedLaserId || 'laser-cyan');
  const shipRarity = RARITY_CONFIGS[shipItem.rarity] || RARITY_CONFIGS.COMMON;

  // Draw ship centered on pad
  drawSpaceship(ctx, padCenterX, padCenterY - 15, shipItem, blasterItem, 1.45);

  // Laser Beam FX beneath ship
  ctx.save();
  const beamGrad = ctx.createLinearGradient(padCenterX, padCenterY + 55, padCenterX, padCenterY + 115);
  beamGrad.addColorStop(0, laserItem.coreColor || '#ffffff');
  beamGrad.addColorStop(0.5, laserItem.beamColor || '#00f0ff');
  beamGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = beamGrad;
  ctx.shadowColor = laserItem.trailColor || laserItem.beamColor || '#00f0ff';
  ctx.shadowBlur = 18;
  ctx.fillRect(padCenterX - 3, padCenterY + 55, 6, 60);
  ctx.restore();

  // Ship Title & Equipment Info
  ctx.textAlign = 'center';
  ctx.font = '900 24px "Orbitron", system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${shipItem.icon} ${shipItem.nameVi.toUpperCase()}`, padCenterX, hangarY + 345);

  // Ship Rarity Badge
  ctx.font = 'bold 15px "Orbitron", sans-serif';
  ctx.fillStyle = shipRarity.color;
  ctx.fillText(shipRarity.badge, padCenterX, hangarY + 375);

  // Weapons display
  ctx.font = 'bold 16px system-ui, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(`Vũ Khí: ${blasterItem.nameVi} • ${laserItem.nameVi}`, padCenterX, hangarY + 425);

  // 7. Right Column: Player Profile, Big Stats, and Badges
  const rightX = hangarX + hangarW + 28;
  const rightY = hangarY;
  const rightW = width - rightX - margin - 32;

  // Profile Header Row (Avatar, Name, Tag, Title)
  const avatarCenterX = rightX + 55;
  const avatarCenterY = rightY + 55;

  // Avatar Glowing Ring
  ctx.save();
  ctx.shadowColor = 'rgba(250, 204, 21, 0.7)';
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Avatar Emoji
  ctx.font = '54px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data.avatar || '🚀', avatarCenterX, avatarCenterY);

  // Name
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.font = '900 34px "Orbitron", system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(data.userName, rightX + 125, rightY + 48);

  // Active Title (Bold & Clear)
  const titleText = `🎖️ ${data.activeTitle || DEFAULT_TITLE}`;
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillStyle = '#fde047';
  ctx.fillText(titleText, rightX + 125, rightY + 84);

  // 8. Big 4 Stats Grid (2x2 Cards)
  const statsY = rightY + 118;
  const statBoxW = (rightW - 16) / 2;
  const statBoxH = 82;

  const statItems = [
    { label: 'TỪ VỰNG NẮM VỮNG', value: `${data.wordsMastered}`, icon: '📚', color: '#4ade80' },
    { label: 'TỔNG SAO CHIẾN CƠ', value: `${data.starsCount} ⭐`, icon: '⭐', color: '#facc15' },
    { label: 'CHUỖI HỌC LIÊN TỤC', value: `${data.streakDays} NGÀY`, icon: '🔥', color: '#fb923c' },
    { label: 'KINH NGHIỆM TÍCH LUỸ', value: `${data.totalXp.toLocaleString()} XP`, icon: '⚡', color: '#38bdf8' }
  ];

  statItems.forEach((st, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const sx = rightX + col * (statBoxW + 16);
    const sy = statsY + row * (statBoxH + 12);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(sx, sy, statBoxW, statBoxH, 14);
    ctx.fill();
    ctx.stroke();

    // Stat Label (Clean & readable)
    ctx.textAlign = 'left';
    ctx.font = 'bold 14px "Orbitron", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(st.label, sx + 18, sy + 28);

    // Stat Value (Big & Punchy)
    ctx.font = '900 28px "Orbitron", system-ui, sans-serif';
    ctx.fillStyle = st.color;
    ctx.fillText(st.value, sx + 18, sy + 64);
  });

  // 9. Featured Showcase Badges Section (3 Badge Slots)
  const badgesY = statsY + 188;
  ctx.textAlign = 'left';
  ctx.font = 'bold 16px "Orbitron", sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('HUY HIỆU NỔI BẬT', rightX, badgesY + 16);

  const badgeSlotW = (rightW - 24) / 3;
  const badgeSlotH = 125;
  const badgeCardY = badgesY + 28;

  const selectedBadges = (data.selectedBadgeIds || []).slice(0, 3);
  // Ensure exactly 3 slots rendered
  for (let slotIdx = 0; slotIdx < 3; slotIdx++) {
    const badgeId = selectedBadges[slotIdx];
    const badge = badgeId ? getBadgeById(badgeId) : null;
    const bx = rightX + slotIdx * (badgeSlotW + 12);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = badge ? badge.color : 'rgba(100, 116, 139, 0.3)';
    ctx.lineWidth = badge ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(bx, badgeCardY, badgeSlotW, badgeSlotH, 16);
    ctx.fill();
    ctx.stroke();

    if (badge) {
      // Glow around badge slot
      ctx.save();
      ctx.shadowColor = badge.glowColor;
      ctx.shadowBlur = 12;
      ctx.font = '40px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(badge.icon, bx + badgeSlotW / 2, badgeCardY + 48);
      ctx.restore();

      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(badge.nameVi, bx + badgeSlotW / 2, badgeCardY + 80);

      ctx.font = 'bold 13px "Orbitron", sans-serif';
      ctx.fillStyle = badge.color;
      ctx.fillText(badge.rarity, bx + badgeSlotW / 2, badgeCardY + 104);
    } else {
      ctx.font = '32px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#475569';
      ctx.fillText('🛡️', bx + badgeSlotW / 2, badgeCardY + 54);

      ctx.font = 'italic 13px system-ui, sans-serif';
      ctx.fillText('Trống', bx + badgeSlotW / 2, badgeCardY + 88);
    }
  }

  // 10. Card Footer
  const footerY = height - margin - 20;
  ctx.font = '900 14px "Orbitron", sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.textAlign = 'left';
  ctx.fillText('⚡ VOCAB PEW PEW • CHIẾN CƠ HỌC TỪ VỰNG KHÔNG GIAN', margin + 32, footerY);
};

/**
 * Generate a PNG Blob from astronaut profile data
 */
export const generateAstronautCardBlob = async (
  source: UserProgress | LeaderboardEntry
): Promise<Blob> => {
  const data = extractCardData(source);
  const canvas = document.createElement('canvas');
  renderAstronautCardToCanvas(canvas, data);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate canvas image blob'));
    }, 'image/png');
  });
};

/**
 * Generate Data URL string for image preview
 */
export const generateAstronautCardDataUrl = (
  source: UserProgress | LeaderboardEntry
): string => {
  const data = extractCardData(source);
  const canvas = document.createElement('canvas');
  renderAstronautCardToCanvas(canvas, data);
  return canvas.toDataURL('image/png');
};

/**
 * Download astronaut card PNG image directly
 */
export const downloadAstronautCard = async (
  source: UserProgress | LeaderboardEntry
): Promise<void> => {
  const data = extractCardData(source);
  const blob = await generateAstronautCardBlob(source);
  const url = URL.createObjectURL(blob);

  const cleanTag = data.playerTag.replace(/[^a-zA-Z0-9_-]/g, '');
  const link = document.createElement('a');
  link.download = `astronaut-id-${cleanTag || 'pew'}.png`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copy astronaut card PNG image directly to system clipboard
 */
export const copyAstronautCardToClipboard = async (
  source: UserProgress | LeaderboardEntry
): Promise<{ success: boolean; message: string }> => {
  try {
    const blob = await generateAstronautCardBlob(source);
    if (navigator.clipboard && window.ClipboardItem) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      return {
        success: true,
        message: 'Đã sao chép ảnh thẻ phi hành gia! Bạn có thể dán ngay vào Zalo hoặc Messenger.'
      };
    } else {
      // Fallback to download if ClipboardItem not supported
      await downloadAstronautCard(source);
      return {
        success: true,
        message: 'Trình duyệt không hỗ trợ dán ảnh trực tiếp, ảnh đã được tải về máy bạn!'
      };
    }
  } catch (err) {
    console.warn('Clipboard write failed, downloading instead:', err);
    await downloadAstronautCard(source);
    return {
      success: true,
      message: 'Ảnh thẻ đã được tải về máy của bé!'
    };
  }
};

/**
 * Share card via Native Web Share API (mobile/tablet/desktop)
 */
export const shareAstronautCard = async (
  source: UserProgress | LeaderboardEntry
): Promise<{ shared: boolean; method: 'native' | 'download' }> => {
  const data = extractCardData(source);
  try {
    const blob = await generateAstronautCardBlob(source);
    const cleanTag = data.playerTag.replace(/[^a-zA-Z0-9_-]/g, '');
    const file = new File([blob], `astronaut-id-${cleanTag || 'pew'}.png`, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Thẻ Phi Hành Gia ${data.userName} (${data.playerTag})`,
        text: `Xem thành tích phi hành đoàn của ${data.userName} trên Vocab Pew Pew! Bắn hạ từ vựng, chinh phục thiên hà!`,
        files: [file]
      });
      return { shared: true, method: 'native' };
    }
  } catch (err) {
    // User cancelled share or share failed
    if ((err as Error).name === 'AbortError') {
      return { shared: false, method: 'native' };
    }
  }

  // Fallback to download
  await downloadAstronautCard(source);
  return { shared: true, method: 'download' };
};
