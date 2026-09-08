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

    // ==========================================
    // 6. STARLIGHT PEGASUS (Magical Winged Unicorn Ship)
    // ==========================================
    case 'pegasus': {
      // Stardust Sparkle Trail Thrusters
      [-12, 12].forEach((tx) => {
        ctx.fillStyle = '#f472b6';
        ctx.shadowColor = '#e879f9';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(tx - 4, 16);
        ctx.lineTo(tx, 16 + flameHeight + 4);
        ctx.lineTo(tx + 4, 16);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, 16 + flameHeight * 0.4, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Angelic / Pegasus Feathered Wings
      const wingFlap = Math.sin(now * 0.006) * 3;
      ctx.fillStyle = '#3b0764';
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 16;

      // Left Wing
      ctx.beginPath();
      ctx.moveTo(-8, 2);
      ctx.bezierCurveTo(-24, -14 + wingFlap, -38, -4 + wingFlap, -34, 14 + wingFlap);
      ctx.lineTo(-24, 8);
      ctx.lineTo(-20, 16);
      ctx.lineTo(-10, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Wing
      ctx.beginPath();
      ctx.moveTo(8, 2);
      ctx.bezierCurveTo(24, -14 + wingFlap, 38, -4 + wingFlap, 34, 14 + wingFlap);
      ctx.lineTo(24, 8);
      ctx.lineTo(20, 16);
      ctx.lineTo(10, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Wing Feathers Detail Lines
      ctx.strokeStyle = '#fbcfe8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-12, 4);
      ctx.lineTo(-28, 4 + wingFlap);
      ctx.moveTo(12, 4);
      ctx.lineTo(28, 4 + wingFlap);
      ctx.stroke();

      // Sleek Pearlescent Fuselage
      ctx.fillStyle = '#1e1035';
      ctx.strokeStyle = '#e879f9';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.bezierCurveTo(12, -18, 14, 8, 8, 18);
      ctx.lineTo(-8, 18);
      ctx.bezierCurveTo(-14, 8, -12, -18, 0, -32);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Golden Starlight Unicorn Horn
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.lineTo(3.5, -30);
      ctx.lineTo(-3.5, -30);
      ctx.closePath();
      ctx.fill();

      // Pulsing Star Heart Cockpit Dome
      ctx.fillStyle = '#f472b6';
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(0, -6, 7.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-2, -8, 2.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 7. CELESTIAL SAKURA (Floral Crystal Blossom Ship)
    // ==========================================
    case 'sakura': {
      // Soft Rose Mist Thruster
      ctx.fillStyle = '#fb7185';
      ctx.shadowColor = '#fda4af';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.ellipse(0, 16 + flameHeight * 0.5, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // 5 Floating Rotating Sakura Petal Shields
      const petalAngleOffset = now * 0.002;
      for (let i = 0; i < 5; i++) {
        const pAngle = (Math.PI * 2 * i) / 5 + petalAngleOffset;
        const px = Math.cos(pAngle) * 26;
        const py = Math.sin(pAngle) * 20;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(pAngle + Math.PI / 2);
        ctx.fillStyle = '#fda4af';
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, -9);
        ctx.bezierCurveTo(6, -4, 5, 6, 0, 9);
        ctx.bezierCurveTo(-5, 6, -6, -4, 0, -9);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Blossom Bud Fuselage Hull
      ctx.fillStyle = '#4c0519';
      ctx.strokeStyle = '#fb7185';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(0, -34);
      ctx.bezierCurveTo(18, -12, 16, 12, 6, 18);
      ctx.lineTo(-6, 18);
      ctx.bezierCurveTo(-16, 12, -18, -12, 0, -34);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Rose Gold Inlay Details
      ctx.fillStyle = '#ffe4e6';
      ctx.beginPath();
      ctx.moveTo(0, -26);
      ctx.lineTo(6, -10);
      ctx.lineTo(0, -4);
      ctx.lineTo(-6, -10);
      ctx.closePath();
      ctx.fill();

      // Glowing Sakura Blossom Core
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fb7185';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, -4, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 8. STARLIGHT DOLPHIN (Streamlined Cyan/Magenta Sea Glider)
    // ==========================================
    case 'aurora': {
      // Aqua Plasma Jet Stream
      ctx.fillStyle = '#2dd4bf';
      ctx.shadowColor = '#5eead4';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(-8, 16);
      ctx.lineTo(0, 18 + flameHeight + 4);
      ctx.lineTo(8, 16);
      ctx.closePath();
      ctx.fill();

      // Curved Dolphin Flipper Wings
      ctx.fillStyle = '#0f766e';
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#2dd4bf';
      ctx.shadowBlur = 14;

      // Left Flipper
      ctx.beginPath();
      ctx.moveTo(-10, -2);
      ctx.bezierCurveTo(-24, 4, -34, 16, -26, 22);
      ctx.bezierCurveTo(-20, 18, -14, 10, -10, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Flipper
      ctx.beginPath();
      ctx.moveTo(10, -2);
      ctx.bezierCurveTo(24, 4, 34, 16, 26, 22);
      ctx.bezierCurveTo(20, 18, 14, 10, 10, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Smooth Streamlined Hydro-Fuselage
      ctx.fillStyle = '#042f2e';
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -36); // Dolphin nose
      ctx.bezierCurveTo(14, -18, 16, 6, 8, 16);
      ctx.lineTo(-8, 16);
      ctx.bezierCurveTo(-16, 6, -14, -18, 0, -36);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Teal & Magenta Aurora Side Stripes
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -24);
      ctx.lineTo(-8, 6);
      ctx.moveTo(0, -24);
      ctx.lineTo(8, 6);
      ctx.stroke();

      // Crystal Ocean Visor
      ctx.fillStyle = '#a7f3d0';
      ctx.shadowColor = '#2dd4bf';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.ellipse(0, -10, 7, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 9. ASTRAL BUTTERFLY (Prismatic Neon Butterfly)
    // ==========================================
    case 'butterfly': {
      // Soft Multicolored Fairy Dust Thruster
      const dustAlpha = 0.6 + Math.sin(now * 0.01) * 0.3;
      ctx.fillStyle = `rgba(232, 121, 249, ${dustAlpha})`;
      ctx.shadowColor = '#e879f9';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(0, 18 + flameHeight * 0.4, 8, 0, Math.PI * 2);
      ctx.fill();

      // Butterfly Flapping Motion
      const flapScale = 0.85 + Math.sin(now * 0.008) * 0.15;

      // Double Wing Layers (Upper & Lower Wings)
      ctx.save();
      ctx.scale(flapScale, 1.0);

      // Upper Left Wing
      ctx.fillStyle = '#581c87';
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(-6, -8);
      ctx.bezierCurveTo(-26, -30, -42, -16, -34, 4);
      ctx.lineTo(-6, 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Upper Right Wing
      ctx.beginPath();
      ctx.moveTo(6, -8);
      ctx.bezierCurveTo(26, -30, 42, -16, 34, 4);
      ctx.lineTo(6, 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Lower Left Wing
      ctx.fillStyle = '#3b0764';
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(-6, 4);
      ctx.bezierCurveTo(-30, 8, -34, 26, -14, 22);
      ctx.lineTo(-4, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Lower Right Wing
      ctx.beginPath();
      ctx.moveTo(6, 4);
      ctx.bezierCurveTo(30, 8, 34, 26, 14, 22);
      ctx.lineTo(4, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Wing Gem Eye Patterns
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(-22, -12, 3.5, 0, Math.PI * 2);
      ctx.arc(22, -12, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Slender Butterfly Body Chrysalis
      ctx.fillStyle = '#2e1065';
      ctx.strokeStyle = '#e879f9';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(0, 4, 6, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Antennae
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-2, -12);
      ctx.quadraticCurveTo(-10, -22, -14, -28);
      ctx.moveTo(2, -12);
      ctx.quadraticCurveTo(10, -22, 14, -28);
      ctx.stroke();

      // Antenna Tips
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-14, -28, 2.5, 0, Math.PI * 2);
      ctx.arc(14, -28, 2.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 10. GALAXY KITTY POP (Adorable Space Cat)
    // ==========================================
    case 'kitty': {
      // Heart-Shaped Thruster Flame
      ctx.fillStyle = '#f472b6';
      ctx.shadowColor = '#fda4af';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      const hFlameY = 16 + flameHeight * 0.5;
      ctx.arc(-5, hFlameY, 5, 0, Math.PI * 2);
      ctx.arc(5, hFlameY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Rounded Kitten Paw Wingtips
      [-26, 26].forEach((px) => {
        ctx.fillStyle = '#701a75';
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, 10, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Little Paw Pads
        ctx.fillStyle = '#fbcfe8';
        ctx.beginPath();
        ctx.arc(px, 10, 4, 0, Math.PI * 2);
        ctx.fill();
        [-3, 0, 3].forEach(tox => {
          ctx.beginPath();
          ctx.arc(px + tox * 1.5, 5, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Kitty Fuselage Body
      ctx.fillStyle = '#4a044e';
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.bezierCurveTo(18, -14, 20, 8, 12, 18);
      ctx.lineTo(-12, 18);
      ctx.bezierCurveTo(-20, 8, -18, -14, 0, -30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cute Cat Ears
      ctx.fillStyle = '#db2777';
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2;
      // Left Ear
      ctx.beginPath();
      ctx.moveTo(-14, -18);
      ctx.lineTo(-24, -36);
      ctx.lineTo(-4, -28);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Right Ear
      ctx.beginPath();
      ctx.moveTo(14, -18);
      ctx.lineTo(24, -36);
      ctx.lineTo(4, -28);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Ear Glow
      ctx.fillStyle = '#fdf2f8';
      ctx.beginPath();
      ctx.moveTo(-12, -20);
      ctx.lineTo(-19, -31);
      ctx.lineTo(-6, -26);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(12, -20);
      ctx.lineTo(19, -31);
      ctx.lineTo(6, -26);
      ctx.closePath();
      ctx.fill();

      // Whiskers (Left & Right)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      [-1, 1].forEach(dir => {
        ctx.beginPath();
        ctx.moveTo(dir * 8, -4);
        ctx.lineTo(dir * 22, -8);
        ctx.moveTo(dir * 8, -2);
        ctx.lineTo(dir * 24, -2);
        ctx.moveTo(dir * 8, 0);
        ctx.lineTo(dir * 22, 4);
        ctx.stroke();
      });

      // Cute Glowing Cockpit (Kitty Face)
      ctx.fillStyle = '#fdf4ff';
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(0, -4, 8, 0, Math.PI * 2);
      ctx.fill();

      // Little Heart Nose
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(0, -4, 2.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 11. CYBER MECHA PALADIN (High-Tech Gundam)
    // ==========================================
    case 'mecha': {
      // Quad Cyan Vernier Plasma Jets
      [-18, -8, 8, 18].forEach(tx => {
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(tx - 3, 16);
        ctx.lineTo(tx, 16 + flameHeight + 4);
        ctx.lineTo(tx + 3, 16);
        ctx.closePath();
        ctx.fill();
      });

      // Sharp Angular Gundam Energy Wings
      ctx.fillStyle = '#082f49';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 16;

      // Left Mecha Wing
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.lineTo(-34, -20);
      ctx.lineTo(-38, 12);
      ctx.lineTo(-24, 16);
      ctx.lineTo(-12, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Mecha Wing
      ctx.beginPath();
      ctx.moveTo(10, -10);
      ctx.lineTo(34, -20);
      ctx.lineTo(38, 12);
      ctx.lineTo(24, 16);
      ctx.lineTo(12, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Floating Autonomous Cyber Bits
      const bitFloat = Math.sin(now * 0.008) * 4;
      [-42, 42].forEach((bx, idx) => {
        ctx.save();
        ctx.translate(bx, -6 + (idx === 0 ? bitFloat : -bitFloat));
        ctx.fillStyle = '#0284c7';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(4, 0);
        ctx.lineTo(0, 8);
        ctx.lineTo(-4, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Angular Armored Mecha Fuselage
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -36);
      ctx.lineTo(14, -14);
      ctx.lineTo(16, 16);
      ctx.lineTo(0, 20);
      ctx.lineTo(-16, 16);
      ctx.lineTo(-14, -14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Gold V-Fin Antenna
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(0, -26);
      ctx.lineTo(14, -40);
      ctx.lineTo(4, -30);
      ctx.lineTo(0, -32);
      ctx.lineTo(-4, -30);
      ctx.lineTo(-14, -40);
      ctx.closePath();
      ctx.fill();

      // Mecha Visor Sensor (Neon Cyan)
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 18;
      ctx.fillRect(-6, -14, 12, 4);
      break;
    }

    // ==========================================
    // 12. PHOENIX SOVEREIGN (Immortal Sun Bird)
    // ==========================================
    case 'phoenix': {
      // Roaring Triple Inferno Flame Plumes
      [-16, 0, 16].forEach((tx, idx) => {
        ctx.fillStyle = idx === 1 ? '#fbbf24' : '#ea580c';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.moveTo(tx - 6, 16);
        ctx.lineTo(tx, 18 + flameHeight + (idx === 1 ? 12 : 6));
        ctx.lineTo(tx + 6, 16);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, 18 + flameHeight * 0.4, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rotating Solar Phoenix Halo
      const sunAngle = now * 0.003;
      ctx.save();
      ctx.translate(0, -18);
      ctx.rotate(sunAngle);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 18;
      for (let i = 0; i < 8; i++) {
        const rayAngle = (Math.PI * 2 * i) / 8;
        const rx1 = Math.cos(rayAngle) * 14;
        const ry1 = Math.sin(rayAngle) * 14;
        const rx2 = Math.cos(rayAngle) * 22;
        const ry2 = Math.sin(rayAngle) * 22;
        ctx.beginPath();
        ctx.moveTo(rx1, ry1);
        ctx.lineTo(rx2, ry2);
        ctx.stroke();
      }
      ctx.restore();

      // Grand Multi-Feathered Phoenix Wings
      const pFlap = Math.sin(now * 0.007) * 4;
      ctx.fillStyle = '#431407';
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 20;

      // Left Phoenix Wing
      ctx.beginPath();
      ctx.moveTo(-8, -4);
      ctx.bezierCurveTo(-26, -26 + pFlap, -44, -14 + pFlap, -40, 16 + pFlap);
      ctx.lineTo(-28, 8);
      ctx.lineTo(-22, 18);
      ctx.lineTo(-10, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Phoenix Wing
      ctx.beginPath();
      ctx.moveTo(8, -4);
      ctx.bezierCurveTo(26, -26 + pFlap, 44, -14 + pFlap, 40, 16 + pFlap);
      ctx.lineTo(28, 8);
      ctx.lineTo(22, 18);
      ctx.lineTo(10, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Solar Feathers
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(-32, 6 + pFlap);
      ctx.moveTo(10, 0);
      ctx.lineTo(32, 6 + pFlap);
      ctx.stroke();

      // Sleek Crimson Phoenix Fuselage
      ctx.fillStyle = '#7c2d12';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -38);
      ctx.bezierCurveTo(14, -20, 16, 6, 8, 20);
      ctx.lineTo(-8, 20);
      ctx.bezierCurveTo(-16, 6, -14, -20, 0, -38);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Golden Phoenix Crown Crest
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(0, -46);
      ctx.lineTo(6, -34);
      ctx.lineTo(0, -28);
      ctx.lineTo(-6, -34);
      ctx.closePath();
      ctx.fill();

      // Solar Heart Core
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, -2, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 13. AURORA VALKYRIE (Radiant Ethereal Goddess)
    // ==========================================
    case 'valkyrie': {
      // Ascending Prismatic Aura
      const valkGrad = ctx.createLinearGradient(0, 16, 0, 36);
      valkGrad.addColorStop(0, '#c084fc');
      valkGrad.addColorStop(0.5, '#38bdf8');
      valkGrad.addColorStop(1, '#f472b6');
      ctx.fillStyle = valkGrad;
      ctx.shadowColor = '#e879f9';
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.ellipse(0, 20 + flameHeight * 0.4, 16, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // 6 Holy Photon Wings
      const vFlap = Math.sin(now * 0.005) * 3;
      [-1, 1].forEach(side => {
        // Upper Main Wing
        ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(side * 6, -10);
        ctx.bezierCurveTo(side * 28, -34 + vFlap, side * 46, -18 + vFlap, side * 38, 4 + vFlap);
        ctx.lineTo(side * 20, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Lower Wing
        ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(side * 6, 4);
        ctx.bezierCurveTo(side * 36, 10, side * 38, 28, side * 16, 24);
        ctx.lineTo(side * 6, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // Sacred Diamond Halo rotating above
      ctx.save();
      ctx.translate(0, -24);
      ctx.rotate(now * 0.004);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(10, 0);
      ctx.lineTo(0, 10);
      ctx.lineTo(-10, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // Pearlescent Holy Fuselage
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = '#e0e7ff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -36);
      ctx.bezierCurveTo(12, -18, 14, 10, 8, 20);
      ctx.lineTo(-8, 20);
      ctx.bezierCurveTo(-14, 10, -12, -18, 0, -36);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Crown Jewel & Sacred Heart
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, -4, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 14. CHRONO VOID DRAGON (Cosmic Singularity)
    // ==========================================
    case 'chrono': {
      // Spacetime Relativistic Event Horizon Distortion Ring
      ctx.save();
      ctx.translate(0, 0);
      ctx.rotate(now * 0.003);
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 24;
      ctx.setLineDash([10, 6]);
      ctx.beginPath();
      ctx.ellipse(0, 0, 36, 36, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Deep Dark Matter Thruster Jets
      [-14, 14].forEach(tx => {
        ctx.fillStyle = '#6b21a8';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.moveTo(tx - 6, 18);
        ctx.lineTo(tx, 20 + flameHeight + 8);
        ctx.lineTo(tx + 6, 18);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ede9fe';
        ctx.beginPath();
        ctx.arc(tx, 20 + flameHeight * 0.4, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Obsidian Void Dragon Claws & Wings
      ctx.fillStyle = '#090514';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 22;

      // Left Void Wing
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(-18, -16);
      ctx.lineTo(-42, -4);
      ctx.lineTo(-44, 16);
      ctx.lineTo(-28, 10);
      ctx.lineTo(-20, 22);
      ctx.lineTo(-12, 16);
      ctx.lineTo(0, 24);
      // Right Void Wing
      ctx.lineTo(12, 16);
      ctx.lineTo(20, 22);
      ctx.lineTo(28, 10);
      ctx.lineTo(44, 16);
      ctx.lineTo(42, -4);
      ctx.lineTo(18, -16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Spacetime Nebula Glowing Veins
      ctx.strokeStyle = '#e879f9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(-34, 4);
      ctx.moveTo(0, -8);
      ctx.lineTo(34, 4);
      ctx.stroke();

      // Void Dragon Dual Curved Horns
      ctx.fillStyle = '#3b0764';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;
      // Horn L
      ctx.beginPath();
      ctx.moveTo(-6, -20);
      ctx.lineTo(-18, -42);
      ctx.lineTo(-10, -28);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Horn R
      ctx.beginPath();
      ctx.moveTo(6, -20);
      ctx.lineTo(18, -42);
      ctx.lineTo(10, -28);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Singularity Core Sphere (Pulsing Black Hole)
      const voidPulse = 1 + Math.sin(now * 0.01) * 0.2;
      ctx.fillStyle = '#090514';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(0, 0, 8 * voidPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Glowing Center Point
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 15. T-65B X-WING STARFIGHTER (Red 5)
    // ==========================================
    case 'xwing': {
      // Dual Sublight Ion Engine Exhausts (Red/Pink Plasma)
      [-12, 12].forEach(tx => {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#f87171';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(tx - 4, 18);
        ctx.lineTo(tx, 18 + flameHeight + 6);
        ctx.lineTo(tx + 4, 18);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, 18 + flameHeight * 0.4, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4 S-Foils (X-Wings) in open attack position
      // Upper Left & Upper Right Wings
      ctx.fillStyle = '#475569';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;

      // Left Upper Wing
      ctx.beginPath();
      ctx.moveTo(-6, -6);
      ctx.lineTo(-34, -26);
      ctx.lineTo(-32, -18);
      ctx.lineTo(-8, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Upper Wing
      ctx.beginPath();
      ctx.moveTo(6, -6);
      ctx.lineTo(34, -26);
      ctx.lineTo(32, -18);
      ctx.lineTo(8, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Lower Left Wing
      ctx.beginPath();
      ctx.moveTo(-6, 2);
      ctx.lineTo(-36, 12);
      ctx.lineTo(-34, 18);
      ctx.lineTo(-8, 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Lower Right Wing
      ctx.beginPath();
      ctx.moveTo(6, 2);
      ctx.lineTo(36, 12);
      ctx.lineTo(34, 18);
      ctx.lineTo(8, 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Red 5 Alliance Stripes on Wings
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-30, -24, 4, 12);
      ctx.fillRect(-24, -20, 3, 10);
      ctx.fillRect(26, -24, 4, 12);
      ctx.fillRect(21, -20, 3, 10);

      // 4 Wingtip Laser Cannon Barrels
      ctx.fillStyle = '#64748b';
      [-34, 34].forEach(wx => {
        ctx.fillRect(wx - 1.5, -36, 3, 20);
        ctx.fillRect(wx - 1.5, 4, 3, 18);
        // Flash suppressors
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(wx - 2.5, -38, 5, 2.5);
        ctx.fillRect(wx - 2.5, 2, 5, 2.5);
      });

      // Long T-65 Fuselage Hull
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -42); // Long pointed nose
      ctx.lineTo(8, -16);
      ctx.lineTo(9, 18);
      ctx.lineTo(-9, 18);
      ctx.lineTo(-8, -16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Red Nose Stripe
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(0, -38);
      ctx.lineTo(3, -24);
      ctx.lineTo(-3, -24);
      ctx.closePath();
      ctx.fill();

      // R2-D2 Astromech Droid Behind Cockpit (Animated!)
      const r2Angle = Math.sin(now * 0.004) * 0.4;
      ctx.save();
      ctx.translate(0, 4);
      ctx.rotate(r2Angle);
      // Silver Dome
      ctx.fillStyle = '#e2e8f0';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Blinking Sensor Eye (Red/Cyan)
      ctx.fillStyle = Math.sin(now * 0.01) > 0 ? '#ef4444' : '#00f0ff';
      ctx.beginPath();
      ctx.arc(1, -1, 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Cockpit Canopy (Black Glass with Cyan Highlight)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(5, -8);
      ctx.lineTo(-5, -8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-2, -18, 4, 8);
      break;
    }

    // ==========================================
    // 16. MILLENNIUM FALCON (YT-1300 Light Freighter)
    // ==========================================
    case 'falcon': {
      // Rear Hyperdrive Exhaust Strip (Cyan/Blue Neon Glow)
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.roundRect(-22, 14, 44, 7 + Math.sin(now * 0.02) * 2, 3);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-16, 15, 32, 2.5);

      // Main Asymmetric Saucer Hull
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Front Freight Mandibles / Claws
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      // Left Mandible
      ctx.beginPath();
      ctx.moveTo(-18, -12);
      ctx.lineTo(-14, -36);
      ctx.lineTo(-5, -36);
      ctx.lineTo(-6, -16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Right Mandible
      ctx.beginPath();
      ctx.moveTo(18, -12);
      ctx.lineTo(14, -36);
      ctx.lineTo(5, -36);
      ctx.lineTo(6, -16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Starboard (Right Side) Offset Cockpit Tunnel & Cone
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      // Tunnel
      ctx.fillRect(18, -10, 14, 8);
      ctx.strokeRect(18, -10, 14, 8);
      // Cockpit Cone
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(26, -14);
      ctx.lineTo(34, -28);
      ctx.lineTo(38, -18);
      ctx.lineTo(32, -6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cockpit Window Lattice
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.fillRect(30, -22, 4, 6);

      // Rotating Radar Dish on Left Port
      ctx.save();
      ctx.translate(-14, -8);
      ctx.rotate(now * 0.003);
      ctx.fillStyle = '#64748b';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, 7, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Center Dorsal Quad-Laser Turret
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 4 Turret Barrels
      ctx.fillStyle = '#cbd5e1';
      [-3, 3].forEach(bx => {
        ctx.fillRect(bx - 1, -14, 2, 8);
      });
      break;
    }

    // ==========================================
    // 17. TIE INTERCEPTOR (Imperial Royal Starfighter)
    // ==========================================
    case 'tie': {
      // Twin Emerald Green Ion Thrusters
      [-6, 6].forEach(tx => {
        ctx.fillStyle = '#22c55e';
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(tx - 3, 14);
        ctx.lineTo(tx, 14 + flameHeight + 4);
        ctx.lineTo(tx + 3, 14);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, 14 + flameHeight * 0.4, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Dagger Solar Array Wings (Angled Inward V-Shape)
      [-1, 1].forEach(side => {
        ctx.fillStyle = '#18181b';
        ctx.strokeStyle = '#52525b';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 14;

        // Dagger Wing Outer Edge
        ctx.beginPath();
        ctx.moveTo(side * 16, -6);
        ctx.lineTo(side * 36, -34);
        ctx.lineTo(side * 30, -6);
        ctx.lineTo(side * 38, 26);
        ctx.lineTo(side * 18, 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Solar Grid Lines
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 1.5;
        [-20, -10, 0, 10, 20].forEach(gy => {
          ctx.beginPath();
          ctx.moveTo(side * 20, gy * 0.8);
          ctx.lineTo(side * 34, gy * 1.1);
          ctx.stroke();
        });

        // Wing Pylon Connecting Strut
        ctx.fillStyle = '#3f3f46';
        ctx.fillRect(side > 0 ? 10 : -18, -4, 8, 8);
      });

      // Central Spherical Cockpit Ball
      ctx.fillStyle = '#27272a';
      ctx.strokeStyle = '#71717a';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Imperial Hexagonal Viewport
      ctx.fillStyle = '#09090b';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      // Menacing Red Pilot Eye Center
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      // Twin Chin-Mounted Green Laser Cannons
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 10;
      ctx.fillRect(-5, 9, 3, 5);
      ctx.fillRect(2, 9, 3, 5);
      break;
    }

    // ==========================================
    // 18. NABOO N-1 STARFIGHTER (Royal Yellow & Chrome)
    // ==========================================
    case 'naboo': {
      // Dual J-Type Plasma Engines
      [-18, 18].forEach(tx => {
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(tx - 4, 16);
        ctx.lineTo(tx, 16 + flameHeight + 6);
        ctx.lineTo(tx + 4, 16);
        ctx.closePath();
        ctx.fill();
      });

      // Smooth Golden Wings
      ctx.fillStyle = '#eab308';
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 14;

      // Left Wing & Engine Mount
      ctx.beginPath();
      ctx.moveTo(-6, -8);
      ctx.lineTo(-26, -4);
      ctx.lineTo(-24, 16);
      ctx.lineTo(-6, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Wing & Engine Mount
      ctx.beginPath();
      ctx.moveTo(6, -8);
      ctx.lineTo(26, -4);
      ctx.lineTo(24, 16);
      ctx.lineTo(6, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Chrome Nacelles on Wingtips
      [-18, 18].forEach(nx => {
        const chromeGrad = ctx.createLinearGradient(nx - 4, -20, nx + 4, 14);
        chromeGrad.addColorStop(0, '#ffffff');
        chromeGrad.addColorStop(0.5, '#94a3b8');
        chromeGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = chromeGrad;
        ctx.fillRect(nx - 3, -16, 6, 30);
      });

      // Royal Yellow Fuselage Body
      ctx.fillStyle = '#ca8a04';
      ctx.beginPath();
      ctx.moveTo(0, -38);
      ctx.bezierCurveTo(12, -18, 10, 16, 0, 36); // Pointed tail fin
      ctx.bezierCurveTo(-10, 16, -12, -18, 0, -38);
      ctx.closePath();
      ctx.fill();

      // Specular Chrome Polished Nose Dome
      const noseGrad = ctx.createLinearGradient(0, -42, 0, -16);
      noseGrad.addColorStop(0, '#ffffff');
      noseGrad.addColorStop(0.4, '#cbd5e1');
      noseGrad.addColorStop(1, '#64748b');
      ctx.fillStyle = noseGrad;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.bezierCurveTo(8, -32, 9, -20, 0, -16);
      ctx.bezierCurveTo(-9, -20, -8, -32, 0, -42);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Little Silver Astromech Dome
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(0, -4, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Blue Glass Cockpit
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.ellipse(0, -10, 4, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 19. JEDI MASTER INTERCEPTOR (Eta-2 Kyber Starfighter)
    // ==========================================
    case 'jedi': {
      // Twin Supercharged Ion Thrusters
      [-12, 12].forEach(tx => {
        ctx.fillStyle = '#c084fc';
        ctx.shadowColor = '#e879f9';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.moveTo(tx - 4, 16);
        ctx.lineTo(tx, 18 + flameHeight + 8);
        ctx.lineTo(tx + 4, 16);
        ctx.closePath();
        ctx.fill();
      });

      // Arrowhead S-Foil Wings (Deep Violet & Golden Jedi Trim)
      ctx.fillStyle = '#2e1065';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 18;

      // Left Wing
      ctx.beginPath();
      ctx.moveTo(-6, -14);
      ctx.lineTo(-36, -30);
      ctx.lineTo(-38, 14);
      ctx.lineTo(-22, 16);
      ctx.lineTo(-6, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Wing
      ctx.beginPath();
      ctx.moveTo(6, -14);
      ctx.lineTo(36, -30);
      ctx.lineTo(38, 14);
      ctx.lineTo(22, 16);
      ctx.lineTo(6, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Gold Jedi Order Wing Flaps
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-32, -18, 4, 16);
      ctx.fillRect(28, -18, 4, 16);

      // Sleek Center Fuselage
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = '#e0e7ff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -40);
      ctx.lineTo(12, -14);
      ctx.lineTo(8, 20);
      ctx.lineTo(-8, 20);
      ctx.lineTo(-12, -14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pulsing Kyber Crystal Bubble Canopy
      const kyberScale = 1 + Math.sin(now * 0.01) * 0.15;
      ctx.fillStyle = '#c084fc';
      ctx.shadowColor = '#e879f9';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, -4, 7 * kyberScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -4, 3, 0, Math.PI * 2);
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
        ctx.fillStyle = '#831843';
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(wx - (isLeft ? 6 : 4), -14, 10, 24, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#db2777';
        ctx.fillRect(wx - (isLeft ? 4 : 2), -26, 3, 14);
        ctx.fillRect(wx + (isLeft ? 0 : 2), -26, 3, 14);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(wx - (isLeft ? 4.5 : 2.5), -28, 4, 3);
        ctx.fillRect(wx + (isLeft ? -0.5 : 1.5), -28, 4, 3);
      });
      break;
    }

    // 3. BLOSSOM STARBURST / PHÁO HOA SAO BĂNG
    case 'blaster-starflower': {
      [-22, 22].forEach(wx => {
        ctx.fillStyle = '#4c0519';
        ctx.strokeStyle = '#fb7185';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#fda4af';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(wx, -12, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(wx - 2.5, -28, 5, 16);

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(wx, -30, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // 4. PLASMA TRI-CANNON
    case 'blaster-tri': {
      ctx.fillStyle = '#581c87';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 14;
      ctx.fillRect(-5, -46, 10, 26);
      ctx.strokeRect(-5, -46, 10, 26);

      const pScale = 1 + Math.sin(now * 0.015) * 0.2;
      ctx.fillStyle = '#e879f9';
      ctx.beginPath();
      ctx.arc(0, -32, 5 * pScale, 0, Math.PI * 2);
      ctx.fill();

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

    // 5. LOTUS BLOSSOM MORTAR
    case 'blaster-lotus': {
      [-24, 0, 24].forEach((lx, idx) => {
        const isCenter = idx === 1;
        ctx.fillStyle = '#064e3b';
        ctx.strokeStyle = '#2dd4bf';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#2dd4bf';
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.arc(lx, isCenter ? -36 : -20, isCenter ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#5eead4';
        ctx.beginPath();
        ctx.arc(lx, isCenter ? -42 : -26, isCenter ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // 6. COSMIC STARBURST PRISM CANNONS
    case 'blaster-rainbow': {
      ctx.fillStyle = '#78350f';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 16;
      ctx.fillRect(-6, -48, 12, 28);
      ctx.strokeRect(-6, -48, 12, 28);

      ctx.save();
      ctx.translate(0, -34);
      ctx.rotate(now * 0.005);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(-4, -4, 8, 8);
      ctx.restore();

      [-28, 28].forEach(wx => {
        ctx.fillStyle = '#b45309';
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2;
        ctx.fillRect(wx - 4, -18, 8, 22);
        ctx.strokeRect(wx - 4, -18, 8, 22);

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(wx, -20, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // 7. QUAD HYPER GATLING
    case 'blaster-quad': {
      [-28, -10, 10, 28].forEach((qx, idx) => {
        const isOuter = idx === 0 || idx === 3;
        ctx.fillStyle = '#451a03';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 14;

        const barrelLen = isOuter ? 20 : 26;
        const barrelY = isOuter ? -24 : -44;
        ctx.fillRect(qx - 3, barrelY, 6, barrelLen);
        ctx.strokeRect(qx - 3, barrelY, 6, barrelLen);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(qx - 3.5, barrelY - 2, 7, 3);
      });
      break;
    }

    // 8. VOID SINGULARITY VORTEX
    case 'blaster-void': {
      [-22, 22].forEach(vx => {
        ctx.save();
        ctx.translate(vx, -28);
        ctx.rotate(now * (vx < 0 ? -0.008 : 0.008));
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.ellipse(0, 0, 9, 9, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ede9fe';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      break;
    }

    // 9. SUPERNOVA PENTA-BLASTER
    case 'blaster-penta': {
      // Center Titan Cannon + 4 Flank Pods
      [-30, -16, 0, 16, 30].forEach((px, idx) => {
        const isCenter = idx === 2;
        const isMid = idx === 1 || idx === 3;
        const bLen = isCenter ? 32 : isMid ? 24 : 18;
        const bTop = isCenter ? -52 : isMid ? -40 : -28;

        ctx.fillStyle = '#4c0519';
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 16;
        ctx.fillRect(px - 3, bTop, 6, bLen);
        ctx.strokeRect(px - 3, bTop, 6, bLen);

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#facc15';
        ctx.beginPath();
        ctx.arc(px, bTop, isCenter ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // 10. IMPERIAL TWIN HEAVY BLASTER
    case 'blaster-tie-twin': {
      [-8, 8].forEach(bx => {
        ctx.fillStyle = '#18181b';
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 12;
        ctx.fillRect(bx - 2.5, -24, 5, 16);
        ctx.strokeRect(bx - 2.5, -24, 5, 16);

        // Green Energy Glow Vent
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(bx - 1.5, -26, 3, 4);
      });
      break;
    }

    // 11. T-65 QUAD LASER CANNONS (X-Wing 4-Point Setup)
    case 'blaster-xwing-quad': {
      // 4 Wingtip Long Cannons
      [-34, 34].forEach(wx => {
        // Upper Cannon
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 14;
        ctx.fillRect(wx - 2, -42, 4, 26);
        ctx.strokeRect(wx - 2, -42, 4, 26);

        // Flash Suppressor Tip
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(wx - 3, -44, 6, 3.5);

        // Lower Cannon
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8;
        ctx.fillRect(wx - 2, -4, 4, 20);
        ctx.strokeRect(wx - 2, -4, 4, 20);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(wx - 3, -6, 6, 3);
      });
      break;
    }

    // 12. CORELLIAN QUAD-LASER TURRET (Falcon Heavy Turret)
    case 'blaster-falcon-quad': {
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, -18, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 4 Heavy Barrels
      [-6, -2, 2, 6].forEach((bx, idx) => {
        const isCenter = idx === 1 || idx === 2;
        const bLen = isCenter ? 26 : 22;
        const bTop = isCenter ? -42 : -38;
        ctx.fillStyle = '#475569';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.fillRect(bx - 1.5, bTop, 3, bLen);
        ctx.strokeRect(bx - 1.5, bTop, 3, bLen);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(bx - 2, bTop - 2, 4, 2.5);
      });
      break;
    }

    // 13. PROTON TORPEDO TUBES
    case 'blaster-proton': {
      [-10, 10].forEach(px => {
        ctx.fillStyle = '#451a03';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 14;
        ctx.fillRect(px - 3.5, -34, 7, 20);
        ctx.strokeRect(px - 3.5, -34, 7, 20);

        // Glowing Torpedo Chamber Warhead
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(px, -34, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // 14. KYBER CRYSTAL FOCUS ARRAY
    case 'blaster-kyber': {
      // Center Convergence Dish + 2 Flanks
      [-20, 0, 20].forEach((kx, idx) => {
        const isCenter = idx === 1;
        const kTop = isCenter ? -48 : -26;
        ctx.save();
        ctx.translate(kx, kTop);
        ctx.rotate(now * (idx === 0 ? -0.005 : idx === 2 ? 0.005 : 0));
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#e879f9';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(0, 0, isCenter ? 7 : 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, isCenter ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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

    // 2. LOVE NOVA PULSE (Floating Hearts)
    case 'heart': {
      const orbY = ((now * 0.04) % (h - 20)) + 10;
      const cy = h - orbY;

      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(236, 72, 153, 0.2)');
      grad.addColorStop(1, '#ec4899');
      ctx.strokeStyle = grad;
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 16;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.fillStyle = '#f472b6';
      ctx.shadowColor = '#fda4af';
      ctx.shadowBlur = 16;
      ctx.save();
      ctx.translate(w / 2, cy);
      const hScale = 0.8 + Math.sin(now * 0.01) * 0.15;
      ctx.scale(hScale, hScale);
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(-8, -6, -10, -12, 0, -16);
      ctx.bezierCurveTo(10, -12, 8, -6, 0, 4);
      ctx.fill();
      ctx.restore();
      break;
    }

    // 3. SAKURA PETAL STREAM
    case 'sakura': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(251, 113, 133, 0.2)');
      grad.addColorStop(1, '#fb7185');
      ctx.strokeStyle = grad;
      ctx.shadowColor = '#fb7185';
      ctx.shadowBlur = 16;
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        const py = ((now * 0.05 + i * 25) % (h - 20)) + 10;
        const px = w / 2 + Math.sin(now * 0.005 + i * 2) * 10;
        ctx.fillStyle = '#fda4af';
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.ellipse(px, h - py, 6, 3.5, (now * 0.004) + i, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    // 4. PINK PLASMA PULSE
    case 'plasma': {
      const orbY = (now * 0.05) % (h - 20) + 10;
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

    // 5. DIAMOND CRYSTAL PRISM
    case 'crystal': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
      grad.addColorStop(0.5, '#c084fc');
      grad.addColorStop(1, '#ffffff');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.save();
      ctx.translate(w / 2, 12);
      ctx.rotate(now * 0.005);
      ctx.fillStyle = '#e879f9';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(6, 0);
      ctx.lineTo(0, 8);
      ctx.lineTo(-6, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }

    // 6. CYBER MATRIX GLITCH
    case 'matrix': {
      ctx.strokeStyle = '#10b981';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ecfdf5';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Digital binary pixels
      for (let i = 0; i < 4; i++) {
        const my = (now * 0.06 + i * 20) % (h - 20) + 10;
        const mx = w / 2 + ((i % 2 === 0) ? -6 : 6);
        ctx.fillStyle = '#34d399';
        ctx.fillRect(mx - 2, h - my - 2, 4, 4);
      }
      break;
    }

    // 7. GOLDEN LIGHTNING
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

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(w / 2, 8, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // 8. RUBY MAGMA
    case 'flame': {
      const flameY = (now * 0.06) % (h - 20) + 10;
      const cy = h - flameY;

      ctx.fillStyle = '#f43f5e';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.moveTo(w / 2, cy - 14);
      ctx.bezierCurveTo(w / 2 + 12, cy, w / 2 + 8, cy + 18, w / 2, cy + 24);
      ctx.bezierCurveTo(w / 2 - 8, cy + 18, w / 2 - 12, cy, w / 2, cy - 14);
      ctx.closePath();
      ctx.fill();

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

    // 9. RAINBOW COSMIC
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

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(w / 2, 8, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // 10. VOID NEBULA SINGULARITY
    case 'void': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, '#3b0764');
      grad.addColorStop(0.5, '#8b5cf6');
      grad.addColorStop(1, '#ede9fe');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 22;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      // Rotating Event Horizon Core
      ctx.save();
      ctx.translate(w / 2, 12);
      ctx.rotate(now * 0.008);
      ctx.fillStyle = '#090514';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      break;
    }

    // 11. HOLY CELESTIAL SUNLIGHT
    case 'sunlight': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(251, 191, 36, 0.3)');
      grad.addColorStop(0.6, '#fbbf24');
      grad.addColorStop(1, '#ffffff');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 24;
      ctx.lineWidth = 7.5;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 4-Point Holy Star
      ctx.save();
      ctx.translate(w / 2, 10);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.lineTo(3, -2);
      ctx.lineTo(9, 0);
      ctx.lineTo(3, 2);
      ctx.lineTo(0, 9);
      ctx.lineTo(-3, 2);
      ctx.lineTo(-9, 0);
      ctx.lineTo(-3, -2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }

    // 12. PRISMATIC SUPERNOVA STORM
    case 'supernova': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, '#f43f5e');
      grad.addColorStop(0.2, '#ec4899');
      grad.addColorStop(0.4, '#a855f7');
      grad.addColorStop(0.6, '#38bdf8');
      grad.addColorStop(0.8, '#34d399');
      grad.addColorStop(1, '#ffffff');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#e879f9';
      ctx.shadowBlur = 24;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Rotating Supernova Sparkle
      ctx.save();
      ctx.translate(w / 2, 10);
      ctx.rotate(now * 0.01);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }

    // 13. REBEL RUBY BLASTER BOLT (Star Wars Classic Crimson Plasma)
    case 'rebel_red': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
      grad.addColorStop(0.5, '#ef4444');
      grad.addColorStop(1, '#f87171');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      // Super-hot white plasma core
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Rounded Capsule Head
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(w / 2, 8, 4.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // 14. IMPERIAL EMERALD GREEN BOLT (TIE Fighter Heavy Plasma)
    case 'imperial_green': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(34, 197, 94, 0.2)');
      grad.addColorStop(0.5, '#22c55e');
      grad.addColorStop(1, '#4ade80');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Green Plasma Head
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(w / 2, 8, 4.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // 15. REPUBLIC ION ELECTRIC BLUE
    case 'ion_blue': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.2)');
      grad.addColorStop(0.5, '#00f0ff');
      grad.addColorStop(1, '#38bdf8');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 6.5;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Electric Ion Sparks
      for (let i = 0; i < 3; i++) {
        const sy = (now * 0.05 + i * 18) % (h - 20) + 10;
        const sx = w / 2 + Math.sin(now * 0.01 + i) * 6;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(sx, h - sy, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(w / 2, 8, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // 16. MANDALORIAN BESKAR AMBER
    case 'mando_amber': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(245, 158, 11, 0.2)');
      grad.addColorStop(0.5, '#f59e0b');
      grad.addColorStop(1, '#fbbf24');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(w / 2, 8, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // 17. JEDI KYBER AMETHYST PULSE
    case 'kyber_purple': {
      const grad = ctx.createLinearGradient(w / 2, h - 8, w / 2, 8);
      grad.addColorStop(0, 'rgba(192, 132, 252, 0.2)');
      grad.addColorStop(0.5, '#c084fc');
      grad.addColorStop(1, '#e879f9');

      ctx.strokeStyle = grad;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 22;
      ctx.lineWidth = 7.5;
      ctx.beginPath();
      ctx.moveTo(w / 2, h - 8);
      ctx.lineTo(w / 2, 8);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Rotating Kyber Diamond
      ctx.save();
      ctx.translate(w / 2, 10);
      ctx.rotate(now * 0.008);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#e879f9';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(5, 0);
      ctx.lineTo(0, 7);
      ctx.lineTo(-5, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
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
    case 'blaster-starflower':
      return [
        { x: shipX - 22 * scale, y: shipY - 30 * scale },
        { x: shipX + 22 * scale, y: shipY - 30 * scale }
      ];
    case 'blaster-tri':
    case 'blaster-triple':
      return [
        { x: shipX - 26 * scale, y: shipY - 14 * scale },
        { x: shipX, y: shipY - 48 * scale },
        { x: shipX + 26 * scale, y: shipY - 14 * scale }
      ];
    case 'blaster-lotus':
      return [
        { x: shipX - 24 * scale, y: shipY - 26 * scale },
        { x: shipX, y: shipY - 42 * scale },
        { x: shipX + 24 * scale, y: shipY - 26 * scale }
      ];
    case 'blaster-rainbow':
      return [
        { x: shipX - 28 * scale, y: shipY - 20 * scale },
        { x: shipX, y: shipY - 48 * scale },
        { x: shipX + 28 * scale, y: shipY - 20 * scale }
      ];
    case 'blaster-quad':
      return [
        { x: shipX - 28 * scale, y: shipY - 24 * scale },
        { x: shipX - 10 * scale, y: shipY - 44 * scale },
        { x: shipX + 10 * scale, y: shipY - 44 * scale },
        { x: shipX + 28 * scale, y: shipY - 24 * scale }
      ];
    case 'blaster-void':
      return [
        { x: shipX - 22 * scale, y: shipY - 28 * scale },
        { x: shipX + 22 * scale, y: shipY - 28 * scale }
      ];
    case 'blaster-penta':
      return [
        { x: shipX - 30 * scale, y: shipY - 28 * scale },
        { x: shipX - 16 * scale, y: shipY - 40 * scale },
        { x: shipX, y: shipY - 52 * scale },
        { x: shipX + 16 * scale, y: shipY - 40 * scale },
        { x: shipX + 30 * scale, y: shipY - 28 * scale }
      ];
    case 'blaster-tie-twin':
      return [
        { x: shipX - 8 * scale, y: shipY - 26 * scale },
        { x: shipX + 8 * scale, y: shipY - 26 * scale }
      ];
    case 'blaster-xwing-quad':
      return [
        { x: shipX - 34 * scale, y: shipY - 44 * scale },
        { x: shipX + 34 * scale, y: shipY - 44 * scale },
        { x: shipX - 34 * scale, y: shipY - 6 * scale },
        { x: shipX + 34 * scale, y: shipY - 6 * scale }
      ];
    case 'blaster-falcon-quad':
      return [
        { x: shipX - 6 * scale, y: shipY - 38 * scale },
        { x: shipX - 2 * scale, y: shipY - 42 * scale },
        { x: shipX + 2 * scale, y: shipY - 42 * scale },
        { x: shipX + 6 * scale, y: shipY - 38 * scale }
      ];
    case 'blaster-proton':
      return [
        { x: shipX - 10 * scale, y: shipY - 36 * scale },
        { x: shipX + 10 * scale, y: shipY - 36 * scale }
      ];
    case 'blaster-kyber':
      return [
        { x: shipX - 20 * scale, y: shipY - 26 * scale },
        { x: shipX, y: shipY - 48 * scale },
        { x: shipX + 20 * scale, y: shipY - 26 * scale }
      ];
    default:
      return [{ x: shipX, y: shipY - 30 * scale }];
  }
};


