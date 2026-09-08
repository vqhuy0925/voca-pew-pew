import { SpaceshipItem, BlasterItem, LaserBeamItem } from '../../data/upgrade-types';

export const drawSpaceship = (
  ctx: CanvasRenderingContext2D,
  shipX: number,
  shipY: number,
  ship: SpaceshipItem,
  blaster?: BlasterItem,
  scale: number = 1.0
) => {
  ctx.save();
  ctx.translate(shipX, shipY);
  ctx.scale(scale, scale);

  const now = Date.now();
  const flameHeight = 14 + Math.sin(now * 0.02) * 6;

  switch (ship.modelType) {
    // ==========================================
    // 1. STAR SCOUT (Classic Cute Rocket)
    // ==========================================
    case 'scout': {
      // Thruster Flame
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(-10, 16);
      ctx.lineTo(0, 16 + flameHeight + 4);
      ctx.lineTo(10, 16);
      ctx.closePath();
      ctx.fill();

      // Inner Hot Flame
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-5, 16);
      ctx.lineTo(0, 16 + flameHeight * 0.6);
      ctx.lineTo(5, 16);
      ctx.closePath();
      ctx.fill();

      // Side Fins
      ctx.fillStyle = '#0284c7';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;

      // Left Fin
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(-28, 18);
      ctx.lineTo(-12, 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Fin
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(28, 18);
      ctx.lineTo(12, 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Fuselage Body
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.bezierCurveTo(16, -18, 18, 10, 12, 16);
      ctx.lineTo(-12, 16);
      ctx.bezierCurveTo(-18, 10, -16, -18, 0, -32);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cute Cyan Stripes
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(-8, 6, 16, 3.5);

      // Bubble Cockpit Dome
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, -6, 9, 0, Math.PI * 2);
      ctx.fill();

      // Glass Highlight Sparkle
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-3, -9, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 2. THUNDER BOLT (Angular Razor Stealth Jet)
    // ==========================================
    case 'thunder': {
      // Dual Electric Jet Flames
      [-14, 14].forEach(tx => {
        ctx.fillStyle = '#facc15';
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(tx - 6, 16);
        ctx.lineTo(tx, 16 + flameHeight + 6);
        ctx.lineTo(tx + 6, 16);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(tx - 3, 16);
        ctx.lineTo(tx, 16 + flameHeight * 0.5);
        ctx.lineTo(tx + 3, 16);
        ctx.closePath();
        ctx.fill();
      });

      // Animated Lightning Arcs across wingtips
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(-32, 8);
      ctx.lineTo(-24 + (Math.random() - 0.5) * 6, 0);
      ctx.lineTo(0, -18);
      ctx.lineTo(24 + (Math.random() - 0.5) * 6, 0);
      ctx.lineTo(32, 8);
      ctx.stroke();

      // Sharp W-Wing Fuselage
      ctx.fillStyle = '#1c1917';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.moveTo(0, -36); // Needle nose
      ctx.lineTo(12, -10);
      ctx.lineTo(34, 10); // Wingtip right
      ctx.lineTo(26, 18);
      ctx.lineTo(14, 12);
      ctx.lineTo(8, 20); // Center notch
      ctx.lineTo(0, 14);
      ctx.lineTo(-8, 20);
      ctx.lineTo(-14, 12);
      ctx.lineTo(-26, 18);
      ctx.lineTo(-34, 10); // Wingtip left
      ctx.lineTo(-12, -10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Golden Edge Plates
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.moveTo(0, -28);
      ctx.lineTo(6, -8);
      ctx.lineTo(0, -2);
      ctx.lineTo(-6, -8);
      ctx.closePath();
      ctx.fill();

      // Angular Golden Cockpit Visor
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(7, -4);
      ctx.lineTo(0, 2);
      ctx.lineTo(-7, -4);
      ctx.closePath();
      ctx.fill();
      break;
    }

    // ==========================================
    // 3. NEON UFO (Alien Cyber Saucer)
    // ==========================================
    case 'ufo': {
      // Anti-Gravity Tractor Beam / Glow underneath
      ctx.fillStyle = 'rgba(52, 211, 153, 0.45)';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.ellipse(0, 12, 26, 8 + Math.sin(now * 0.01) * 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Saucer Outer Disk Rim
      ctx.fillStyle = '#064e3b';
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.ellipse(0, 3, 34, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Saucer Inner Deck Ring
      ctx.fillStyle = '#047857';
      ctx.beginPath();
      ctx.ellipse(0, 1, 24, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // 6 Rotating Neon Perimeter Lights
      const lightCount = 6;
      const angleOffset = now * 0.003;
      for (let i = 0; i < lightCount; i++) {
        const angle = (Math.PI * 2 * i) / lightCount + angleOffset;
        const lx = Math.cos(angle) * 28;
        const ly = 3 + Math.sin(angle) * 9;
        ctx.fillStyle = i % 2 === 0 ? '#34d399' : '#fef08a';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(lx, ly, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Top Glass Bubble Dome
      ctx.fillStyle = 'rgba(110, 231, 183, 0.9)';
      ctx.strokeStyle = '#a7f3d0';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, -3, 13, Math.PI, 0);
      ctx.fill();
      ctx.stroke();

      // Little Alien Antenna on Top
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(0, -25);
      ctx.stroke();

      // Glowing Antenna Beacon Orb
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(0, -27, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 4. DRAGON BLAZE (Crimson Fire Mech Dragon)
    // ==========================================
    case 'dragon': {
      // Roaring Twin Inferno Fire Trails
      [-14, 14].forEach(tx => {
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.moveTo(tx - 7, 16);
        ctx.lineTo(tx, 18 + flameHeight + 10);
        ctx.lineTo(tx + 7, 16);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.moveTo(tx - 4, 16);
        ctx.lineTo(tx, 18 + flameHeight * 0.6);
        ctx.lineTo(tx + 4, 16);
        ctx.closePath();
        ctx.fill();
      });

      // Dragon Wings with Serrated Claws
      ctx.fillStyle = '#4c0519';
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.moveTo(0, -20);
      // Right Wing
      ctx.lineTo(16, -14);
      ctx.lineTo(36, -6);
      ctx.lineTo(38, 14);
      ctx.lineTo(24, 8);
      ctx.lineTo(18, 18);
      ctx.lineTo(10, 14);
      ctx.lineTo(0, 22);
      // Left Wing
      ctx.lineTo(-10, 14);
      ctx.lineTo(-18, 18);
      ctx.lineTo(-24, 8);
      ctx.lineTo(-38, 14);
      ctx.lineTo(-36, -6);
      ctx.lineTo(-16, -14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Lava Veins in Wings
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(28, 4);
      ctx.moveTo(0, -6);
      ctx.lineTo(-28, 4);
      ctx.stroke();

      // Dragon Head / Horns
      ctx.fillStyle = '#881337';
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;

      // Horn Left
      ctx.beginPath();
      ctx.moveTo(-6, -18);
      ctx.lineTo(-16, -34);
      ctx.lineTo(-8, -24);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Horn Right
      ctx.beginPath();
      ctx.moveTo(6, -18);
      ctx.lineTo(16, -34);
      ctx.lineTo(8, -24);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Center Dragon Snout
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.lineTo(8, -14);
      ctx.lineTo(0, -4);
      ctx.lineTo(-8, -14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Fiery Dragon Eyes
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 12;
      ctx.fillRect(-5, -18, 3, 3);
      ctx.fillRect(2, -18, 3, 3);
      break;
    }

    // ==========================================
    // 5. SOLAR AEGIS (Royal Golden Flagship)
    // ==========================================
    case 'aegis': {
      // Triple Cosmic Thruster Exhausts
      [-16, 0, 16].forEach((tx, idx) => {
        ctx.fillStyle = idx === 1 ? '#fbbf24' : '#c084fc';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.moveTo(tx - 5, 18);
        ctx.lineTo(tx, 18 + flameHeight + (idx === 1 ? 8 : 2));
        ctx.lineTo(tx + 5, 18);
        ctx.closePath();
        ctx.fill();
      });

      // Rotating Golden Royal Solar Halo Crown
      const haloAngle = now * 0.002;
      ctx.save();
      ctx.translate(0, -18);
      ctx.rotate(haloAngle);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 16;
      ctx.strokeRect(-12, -12, 24, 24);
      ctx.restore();

      // 4 Floating Orbiting Diamond Power Crystals
      for (let i = 0; i < 4; i++) {
        const pAngle = (Math.PI * 2 * i) / 4 - now * 0.003;
        const cx = Math.cos(pAngle) * 36;
        const cy = Math.sin(pAngle) * 14;
        ctx.fillStyle = '#f472b6';
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 4);
        ctx.lineTo(cx + 4, cy);
        ctx.lineTo(cx, cy + 4);
        ctx.lineTo(cx - 4, cy);
        ctx.closePath();
        ctx.fill();
      }

      // Royal Tiered Armor Hull
      ctx.fillStyle = '#311042';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.moveTo(0, -38);
      ctx.lineTo(14, -18);
      ctx.lineTo(36, -4);
      ctx.lineTo(34, 16);
      ctx.lineTo(20, 12);
      ctx.lineTo(12, 22);
      ctx.lineTo(0, 16);
      ctx.lineTo(-12, 22);
      ctx.lineTo(-20, 12);
      ctx.lineTo(-34, 16);
      ctx.lineTo(-36, -4);
      ctx.lineTo(-14, -18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Golden Royal Crest Plates
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.lineTo(10, -16);
      ctx.lineTo(0, -8);
      ctx.lineTo(-10, -16);
      ctx.closePath();
      ctx.fill();

      // Heart Prism Core (Pulsing Diamond)
      const coreScale = 1 + Math.sin(now * 0.008) * 0.15;
      ctx.fillStyle = '#f472b6';
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, 0, 7 * coreScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  // ==========================================
  // Ultra-Distinct Mounted Blaster Cannons
  // ==========================================
  if (blaster) {
    drawMountedBlaster(ctx, blaster);
  }

  ctx.restore();
};

export const drawMountedBlaster = (ctx: CanvasRenderingContext2D, blaster: BlasterItem) => {
  ctx.save();
  const now = Date.now();

  switch (blaster.id) {
    // 1. STANDARD SINGLE RAILGUN
    case 'blaster-single': {
      // Long reinforced railgun barrel with glowing thermal vents
      ctx.fillStyle = '#0284c7';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fillRect(-4, -44, 8, 22);
      ctx.strokeRect(-4, -44, 8, 22);

      // Cyan Energy Accelerator Coils
      ctx.fillStyle = '#00f0ff';
      [-38, -32, -26].forEach(cy => {
        ctx.fillRect(-6, cy, 12, 3);
      });

      // Muzzle Flange
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-5, -46, 10, 3.5);
      break;
    }

    // 2. DUAL ROTARY GATLING CANNONS
    case 'blaster-dual': {
      // Mounted on both wingtips
      [-28, 28].forEach(wx => {
        const isLeft = wx < 0;
        // Gatling Heavy Pod
        ctx.fillStyle = '#831843';
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(wx - (isLeft ? 6 : 4), -14, 10, 24, 4);
        ctx.fill();
        ctx.stroke();

        // Twin Barrels with muzzle tips
        ctx.fillStyle = '#db2777';
        ctx.fillRect(wx - (isLeft ? 4 : 2), -26, 3, 14);
        ctx.fillRect(wx + (isLeft ? 0 : 2), -26, 3, 14);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(wx - (isLeft ? 4.5 : 2.5), -28, 4, 3);
        ctx.fillRect(wx + (isLeft ? -0.5 : 1.5), -28, 4, 3);
      });
      break;
    }

    // 3. PLASMA TRI-CANNON
    case 'blaster-tri': {
      // Center Main Accelerator + 2 Outriggers
      // Center Heavy Plasma Core
      ctx.fillStyle = '#581c87';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 14;
      ctx.fillRect(-5, -46, 10, 26);
      ctx.strokeRect(-5, -46, 10, 26);

      // Pulsing Center Plasma Sphere Chamber
      const pScale = 1 + Math.sin(now * 0.015) * 0.2;
      ctx.fillStyle = '#e879f9';
      ctx.beginPath();
      ctx.arc(0, -32, 5 * pScale, 0, Math.PI * 2);
      ctx.fill();

      // Left and Right Angled Outrigger Cannons
      [-26, 26].forEach((ox, idx) => {
        const angle = idx === 0 ? -0.15 : 0.15;
        ctx.save();
        ctx.translate(ox, -2);
        ctx.rotate(angle);
        ctx.fillStyle = '#7e22ce';
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1.5;
        ctx.fillRect(-3.5, -24, 7, 18);
        ctx.strokeRect(-3.5, -24, 7, 18);

        ctx.fillStyle = '#f0abfc';
        ctx.beginPath();
        ctx.arc(0, -25, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      break;
    }

    // 4. COSMIC STARBURST PRISM CANNONS
    case 'blaster-rainbow': {
      // Golden Prism Main Cannon + Twin Star Outriggers
      ctx.fillStyle = '#78350f';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 16;
      ctx.fillRect(-6, -48, 12, 28);
      ctx.strokeRect(-6, -48, 12, 28);

      // Rotating Golden Prism Crystal on Center
      ctx.save();
      ctx.translate(0, -34);
      ctx.rotate(now * 0.005);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(-4, -4, 8, 8);
      ctx.restore();

      // Dual Gilded Wing Barrels with Prism Crystals
      [-28, 28].forEach(wx => {
        ctx.fillStyle = '#b45309';
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2;
        ctx.fillRect(wx - 4, -18, 8, 22);
        ctx.strokeRect(wx - 4, -18, 8, 22);

        // Golden Star Tips
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(wx, -20, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }
  }

  ctx.restore();
};

// ==========================================
// Standalone Blaster Card Preview Renderer
// ==========================================
export const drawBlasterPreview = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  blaster: BlasterItem
) => {
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(w / 2, h / 2 + 12);
  drawMountedBlaster(ctx, blaster);
  ctx.restore();
};

// ==========================================
// Standalone Laser Card Preview Renderer
// ==========================================
export const drawLaserPreview = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  laser: LaserBeamItem
) => {
  ctx.clearRect(0, 0, w, h);
  const now = Date.now();

  ctx.save();

  switch (laser.particleType) {
    // 1. NEON CYAN LASER
    case 'spark': {
      const grad = ctx.createLinearGradient(w / 2, h - 10, w / 2, 10);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.2)');
      grad.addColorStop(1, '#00f0ff');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 16;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Diamond Head
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(w / 2, 4);
      ctx.lineTo(w / 2 + 5, 12);
      ctx.lineTo(w / 2, 20);
      ctx.lineTo(w / 2 - 5, 12);
      ctx.closePath();
      ctx.fill();
      break;
    }

    // 2. PINK PLASMA PULSE (Pulsing Energy Orbs)
    case 'plasma': {
      const orbY = (now * 0.05) % (h - 20) + 10;
      // Main Plasma Sphere
      const pScale = 1 + Math.sin(now * 0.02) * 0.15;
      ctx.fillStyle = '#f472b6';
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(w / 2, h - orbY, 9 * pScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(w / 2, h - orbY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting Satellites
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 * i) / 3 + now * 0.008;
        const sx = w / 2 + Math.cos(angle) * 16;
        const sy = h - orbY + Math.sin(angle) * 8;
        ctx.fillStyle = '#fbcfe8';
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    // 3. GOLDEN LIGHTNING (Zig-Zag Electric Arcs)
    case 'lightning': {
      ctx.strokeStyle = '#facc15';
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 3.5;

      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2 - 8, h * 0.65);
      ctx.lineTo(w / 2 + 8, h * 0.35);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      // Electric spark cross
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(w / 2, 8, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // 4. RUBY MAGMA (Blazing Fireball Rocket)
    case 'flame': {
      const flameY = (now * 0.06) % (h - 20) + 10;
      const cy = h - flameY;

      // Outer Fire Glow
      ctx.fillStyle = '#f43f5e';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.moveTo(w / 2, cy - 14);
      ctx.bezierCurveTo(w / 2 + 12, cy, w / 2 + 8, cy + 18, w / 2, cy + 24);
      ctx.bezierCurveTo(w / 2 - 8, cy + 18, w / 2 - 12, cy, w / 2, cy - 14);
      ctx.closePath();
      ctx.fill();

      // Inner Lava Core
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(w / 2, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(w / 2, cy - 2, 2.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // 5. RAINBOW COSMIC (Dynamic Color-Shifting Wave)
    case 'rainbow': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, '#f43f5e');
      grad.addColorStop(0.25, '#fbbf24');
      grad.addColorStop(0.5, '#34d399');
      grad.addColorStop(0.75, '#38bdf8');
      grad.addColorStop(1, '#c084fc');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sparkling star on top
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(w / 2, 8, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
};

export const getBlasterMuzzleOrigins = (
  shipX: number,
  shipY: number,
  blaster: BlasterItem,
  scale: number = 1.0
): Array<{ x: number; y: number }> => {
  switch (blaster.id) {
    case 'blaster-single':
      return [{ x: shipX, y: shipY - 46 * scale }];
    case 'blaster-dual':
      return [
        { x: shipX - 26 * scale, y: shipY - 26 * scale },
        { x: shipX + 26 * scale, y: shipY - 26 * scale }
      ];
    case 'blaster-triple':
      return [
        { x: shipX - 26 * scale, y: shipY - 14 * scale },
        { x: shipX, y: shipY - 48 * scale },
        { x: shipX + 26 * scale, y: shipY - 14 * scale }
      ];
    case 'blaster-quad':
      return [
        { x: shipX - 28 * scale, y: shipY - 20 * scale },
        { x: shipX - 10 * scale, y: shipY - 44 * scale },
        { x: shipX + 10 * scale, y: shipY - 44 * scale },
        { x: shipX + 28 * scale, y: shipY - 20 * scale }
      ];
    default:
      return [{ x: shipX, y: shipY - 30 * scale }];
  }
};

