import { Particle, LaserBolt, FloatingText } from '../../data/types';
import { LaserBeamItem } from '../../data/upgrade-types';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  color: string;
}

interface EnhancedLaser extends LaserBolt {
  beamWidth?: number;
  particleType?: 'spark' | 'lightning' | 'plasma' | 'rainbow' | 'flame' | 'heart' | 'sakura' | 'crystal' | 'matrix' | 'void' | 'sunlight' | 'supernova' | 'rebel_red' | 'imperial_green' | 'ion_blue' | 'mando_amber' | 'kyber_purple';
  trailColor?: string;
  coreColor?: string;
}

export class ParticleSystem {
  private stars: Star[] = [];
  private particles: Particle[] = [];
  private lasers: EnhancedLaser[] = [];
  private floatingTexts: FloatingText[] = [];
  private width: number = 800;
  private height: number = 600;
  private isHyperspace: boolean = false;

  constructor(width: number, height: number) {
    this.resize(width, height);
    this.initStars(90);
  }

  public setHyperspace(active: boolean) {
    this.isHyperspace = active;
  }

  public resize(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  private initStars(count: number) {
    this.stars = [];
    const starColors = ['#ffffff', '#aee9ff', '#ffd2ff', '#ffeaa7'];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.8,
        speed: Math.random() * 0.8 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }
  }

  public addLaser(startX: number, startY: number, targetX: number, targetY: number, color: string = '#00f0ff') {
    this.lasers.push({
      id: Math.random().toString(),
      startX,
      startY,
      currentX: startX,
      currentY: startY,
      targetX,
      targetY,
      progress: 0,
      color,
      beamWidth: 3.5,
      particleType: 'spark'
    });
  }

  public addMultiLaser(
    origins: Array<{ x: number; y: number }>,
    targetX: number,
    targetY: number,
    laserItem?: LaserBeamItem
  ) {
    const color = laserItem?.beamColor || '#00f0ff';
    const beamWidth = laserItem?.beamWidth || 4;
    const particleType = laserItem?.particleType || 'spark';
    const trailColor = laserItem?.trailColor || 'rgba(0, 240, 255, 0.4)';
    const coreColor = laserItem?.coreColor || '#ffffff';

    origins.forEach((origin, index) => {
      // Slight spread on target for multi-barrel cannons for super visual appeal
      const offsetTargetX = targetX + (origins.length > 1 ? (index - (origins.length - 1) / 2) * 14 : 0);
      this.lasers.push({
        id: Math.random().toString(),
        startX: origin.x,
        startY: origin.y,
        currentX: origin.x,
        currentY: origin.y,
        targetX: offsetTargetX,
        targetY,
        progress: 0,
        color,
        beamWidth,
        particleType,
        trailColor,
        coreColor
      });
    });

    // Spawn tiny muzzle glow particles at origins
    origins.forEach(origin => {
      this.addMuzzleFlash(origin.x, origin.y, color);
    });
  }

  public addMuzzleFlash(x: number, y: number, color: string) {
    for (let i = 0; i < 4; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1.5,
        color,
        alpha: 1,
        life: 0,
        maxLife: 10
      });
    }
  }

  public addExplosion(x: number, y: number, color: string = '#ff007f', count: number = 24) {
    const palette = [color, '#ffffff', '#ffe600', '#00f0ff', '#f472b6'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 5 + 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 25 + 20
      });
    }
  }

  public addFloatingText(text: string, x: number, y: number, color: string = '#ffe600', size: number = 20) {
    this.floatingTexts.push({
      id: Math.random().toString(),
      text,
      x,
      y,
      vy: -1.5,
      alpha: 1,
      color,
      size
    });
  }

  public update() {
    // Update Stars
    const speedMult = this.isHyperspace ? 24 : 1;
    for (const s of this.stars) {
      s.y += s.speed * speedMult;
      if (s.y > this.height) {
        s.y = this.isHyperspace ? -20 : 0;
        s.x = Math.random() * this.width;
      }
    }

    // Update Lasers
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];
      laser.progress += 0.22; // Very fast crisp laser velocity
      laser.currentX = laser.startX + (laser.targetX - laser.startX) * Math.min(laser.progress, 1);
      laser.currentY = laser.startY + (laser.targetY - laser.startY) * Math.min(laser.progress, 1);

      // Trailing sparks while laser flies
      if (Math.random() < 0.4 && laser.progress < 0.9) {
        this.particles.push({
          x: laser.currentX + (Math.random() - 0.5) * 6,
          y: laser.currentY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.5 + 0.5,
          size: Math.random() * 2.5 + 1,
          color: laser.color,
          alpha: 0.8,
          life: 0,
          maxLife: 12
        });
      }

      if (laser.progress >= 1) {
        this.lasers.splice(i, 1);
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.life++;
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }

    // Update Floating Texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.alpha -= 0.025;
      if (ft.alpha <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // Draw Stars (Normal or Hyperspace Streaks)
    for (const s of this.stars) {
      ctx.save();
      ctx.globalAlpha = this.isHyperspace ? 0.9 : s.alpha;
      ctx.fillStyle = s.color;
      ctx.strokeStyle = s.color;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = this.isHyperspace ? 12 : 0;

      if (this.isHyperspace) {
        // Hyperspace light speed jump streak lines
        ctx.lineWidth = s.size * 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.speed * 32);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Draw Lasers
    for (const laser of this.lasers) {
      ctx.save();
      const bWidth = laser.beamWidth || 3.5;
      const angle = Math.atan2(laser.targetY - laser.startY, laser.targetX - laser.startX);

      if (laser.particleType === 'rainbow') {
        // 1. Dynamic Rainbow Spectrum Beam
        const grad = ctx.createLinearGradient(laser.startX, laser.startY, laser.currentX, laser.currentY);
        grad.addColorStop(0, '#f43f5e');
        grad.addColorStop(0.25, '#fbbf24');
        grad.addColorStop(0.5, '#34d399');
        grad.addColorStop(0.75, '#38bdf8');
        grad.addColorStop(1, '#c084fc');

        ctx.strokeStyle = grad;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 18;
        ctx.lineWidth = bWidth * 1.6;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(1.8, bWidth * 0.45);
        ctx.shadowBlur = 6;
        ctx.stroke();

        // Starburst Tip
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(laser.currentX, laser.currentY, bWidth + 3, 0, Math.PI * 2);
        ctx.fill();

      } else if (laser.particleType === 'plasma') {
        // 2. Pink/Purple Traveling Plasma Energy Orb
        // Glowing Trail
        ctx.strokeStyle = laser.trailColor || 'rgba(244, 114, 182, 0.4)';
        ctx.lineWidth = bWidth * 0.8;
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Outer Plasma Aura
        ctx.fillStyle = '#f472b6';
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.arc(laser.currentX, laser.currentY, bWidth + 5, 0, Math.PI * 2);
        ctx.fill();

        // Inner Supercharged Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(laser.currentX, laser.currentY, bWidth * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting Energy Sparks
        for (let i = 0; i < 2; i++) {
          const sparkAngle = Date.now() * 0.015 + (Math.PI * i);
          const sx = laser.currentX + Math.cos(sparkAngle) * (bWidth + 4);
          const sy = laser.currentY + Math.sin(sparkAngle) * (bWidth + 4);
          ctx.fillStyle = '#fbcfe8';
          ctx.beginPath();
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (laser.particleType === 'lightning') {
        // 3. Crackling Golden Lightning Bolt (Zig-Zag)
        ctx.strokeStyle = '#facc15';
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 18;
        ctx.lineWidth = bWidth * 1.3;

        const dx = laser.currentX - laser.startX;
        const dy = laser.currentY - laser.startY;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(3, Math.floor(dist / 22));

        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        for (let s = 1; s < steps; s++) {
          const t = s / steps;
          const px = laser.startX + dx * t;
          const py = laser.startY + dy * t;
          const jitter = (Math.sin(s * 7 + Date.now() * 0.03) * 7);
          const perpX = -Math.sin(angle) * jitter;
          const perpY = Math.cos(angle) * jitter;
          ctx.lineTo(px + perpX, py + perpY);
        }
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Bright white electric core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 6;
        ctx.stroke();

        // Lightning tip ball
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(laser.currentX, laser.currentY, bWidth + 2, 0, Math.PI * 2);
        ctx.fill();

      } else if (laser.particleType === 'flame') {
        // 4. Ruby Magma Fireball Torpedo
        // Trailing Fire Line
        const fireGrad = ctx.createLinearGradient(laser.startX, laser.startY, laser.currentX, laser.currentY);
        fireGrad.addColorStop(0, 'rgba(239, 68, 68, 0.1)');
        fireGrad.addColorStop(0.6, '#f97316');
        fireGrad.addColorStop(1, '#facc15');

        ctx.strokeStyle = fireGrad;
        ctx.lineWidth = bWidth * 1.5;
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Teardrop / Fireball Head
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(angle + Math.PI / 2);

        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(0, -(bWidth + 7));
        ctx.bezierCurveTo(bWidth + 6, 0, bWidth + 3, bWidth + 8, 0, bWidth + 10);
        ctx.bezierCurveTo(-(bWidth + 3), bWidth + 8, -(bWidth + 6), 0, 0, -(bWidth + 7));
        ctx.closePath();
        ctx.fill();

        // Inner Yellow Core
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, 0, bWidth * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'matrix') {
        // 5. Cyber Matrix Glitch Beam
        ctx.strokeStyle = '#10b981';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 18;
        ctx.lineWidth = bWidth * 1.3;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        ctx.strokeStyle = '#ecfdf5';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Pixel data square at tip
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(angle);
        ctx.fillStyle = '#34d399';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 12;
        ctx.fillRect(-4, -4, 8, 8);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-2, -2, 4, 4);
        ctx.restore();

      } else if (laser.particleType === 'void') {
        // 6. Void Nebula Singularity Vortex
        const voidGrad = ctx.createLinearGradient(laser.startX, laser.startY, laser.currentX, laser.currentY);
        voidGrad.addColorStop(0, '#3b0764');
        voidGrad.addColorStop(0.5, '#8b5cf6');
        voidGrad.addColorStop(1, '#ede9fe');

        ctx.strokeStyle = voidGrad;
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 22;
        ctx.lineWidth = bWidth * 1.6;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Rotating Event Horizon Core
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(Date.now() * 0.015);
        ctx.fillStyle = '#090514';
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(0, 0, bWidth + 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'sunlight') {
        // 7. Holy Celestial Sunlight (Brilliant Divine Gold)
        const sunGrad = ctx.createLinearGradient(laser.startX, laser.startY, laser.currentX, laser.currentY);
        sunGrad.addColorStop(0, 'rgba(251, 191, 36, 0.2)');
        sunGrad.addColorStop(0.6, '#fbbf24');
        sunGrad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = sunGrad;
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 24;
        ctx.lineWidth = bWidth * 1.7;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 4-Point Holy Star at Tip
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#fbbf24';
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

      } else if (laser.particleType === 'supernova') {
        // 8. Prismatic Supernova Storm
        const superGrad = ctx.createLinearGradient(laser.startX, laser.startY, laser.currentX, laser.currentY);
        superGrad.addColorStop(0, '#f43f5e');
        superGrad.addColorStop(0.25, '#ec4899');
        superGrad.addColorStop(0.5, '#a855f7');
        superGrad.addColorStop(0.75, '#38bdf8');
        superGrad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = superGrad;
        ctx.shadowColor = '#e879f9';
        ctx.shadowBlur = 26;
        ctx.lineWidth = bWidth * 1.8;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Sparkle Star at Tip
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(Date.now() * 0.01);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(0, 0, bWidth + 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'heart') {
        // 9. Love Nova Beam with Floating Pulsing Hearts
        ctx.strokeStyle = laser.trailColor || 'rgba(236, 72, 153, 0.4)';
        ctx.lineWidth = bWidth * 1.2;
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Inner Core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Heart Projectile Tip
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = '#f472b6';
        ctx.shadowColor = '#fda4af';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.bezierCurveTo(-8, -6, -10, -12, 0, -16);
        ctx.bezierCurveTo(10, -12, 8, -6, 0, 4);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-2, -8, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'sakura') {
        // 10. Sakura Petal Stream
        ctx.strokeStyle = laser.trailColor || 'rgba(251, 113, 133, 0.4)';
        ctx.lineWidth = bWidth * 1.3;
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Fluttering Petal at the tip
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(angle + Math.PI / 2 + Math.sin(Date.now() * 0.01) * 0.5);
        ctx.fillStyle = '#fda4af';
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(0, -9);
        ctx.bezierCurveTo(6, -4, 5, 6, 0, 9);
        ctx.bezierCurveTo(-5, 6, -6, -4, 0, -9);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'crystal') {
        // 11. Diamond Prism Laser
        ctx.strokeStyle = laser.trailColor || 'rgba(168, 85, 247, 0.4)';
        ctx.lineWidth = bWidth * 1.4;
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // White core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Rotating Crystal Tip
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(Date.now() * 0.01);
        ctx.fillStyle = '#e879f9';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(0, -9);
        ctx.lineTo(7, 0);
        ctx.lineTo(0, 9);
        ctx.lineTo(-7, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'rebel_red') {
        // 13. Rebel Ruby Plasma Bolt (Authentic Star Wars Red Capsule Bolt)
        const boltLen = 28;
        const tailX = laser.currentX - Math.cos(angle) * boltLen;
        const tailY = laser.currentY - Math.sin(angle) * boltLen;

        const boltGrad = ctx.createLinearGradient(tailX, tailY, laser.currentX, laser.currentY);
        boltGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
        boltGrad.addColorStop(0.3, '#dc2626');
        boltGrad.addColorStop(0.8, '#ef4444');
        boltGrad.addColorStop(1, '#fee2e2');

        ctx.strokeStyle = boltGrad;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 22;
        ctx.lineWidth = bWidth * 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Hot White Inner Plasma Core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(1.8, bWidth * 0.45);
        ctx.beginPath();
        ctx.moveTo(laser.currentX - Math.cos(angle) * (boltLen * 0.7), laser.currentY - Math.sin(angle) * (boltLen * 0.7));
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Starburst Tip
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(0, 0, bWidth * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'imperial_green') {
        // 14. Imperial Emerald Plasma Bolt (TIE Fighter Green Bolt)
        const boltLen = 28;
        const tailX = laser.currentX - Math.cos(angle) * boltLen;
        const tailY = laser.currentY - Math.sin(angle) * boltLen;

        const boltGrad = ctx.createLinearGradient(tailX, tailY, laser.currentX, laser.currentY);
        boltGrad.addColorStop(0, 'rgba(34, 197, 94, 0)');
        boltGrad.addColorStop(0.3, '#16a34a');
        boltGrad.addColorStop(0.8, '#22c55e');
        boltGrad.addColorStop(1, '#dcfce7');

        ctx.strokeStyle = boltGrad;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 22;
        ctx.lineWidth = bWidth * 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Hot White Core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(1.8, bWidth * 0.45);
        ctx.beginPath();
        ctx.moveTo(laser.currentX - Math.cos(angle) * (boltLen * 0.7), laser.currentY - Math.sin(angle) * (boltLen * 0.7));
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(0, 0, bWidth * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'ion_blue') {
        // 15. Republic Ion Electric Blue Bolt
        const boltLen = 32;
        const tailX = laser.currentX - Math.cos(angle) * boltLen;
        const tailY = laser.currentY - Math.sin(angle) * boltLen;

        const boltGrad = ctx.createLinearGradient(tailX, tailY, laser.currentX, laser.currentY);
        boltGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        boltGrad.addColorStop(0.4, '#0284c7');
        boltGrad.addColorStop(0.8, '#00f0ff');
        boltGrad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = boltGrad;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 24;
        ctx.lineWidth = bWidth * 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(2, bWidth * 0.5);
        ctx.stroke();

        // Tip Spark
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(0, 0, bWidth * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'mando_amber') {
        // 16. Mandalorian Beskar Amber Bolt
        const boltLen = 30;
        const tailX = laser.currentX - Math.cos(angle) * boltLen;
        const tailY = laser.currentY - Math.sin(angle) * boltLen;

        const boltGrad = ctx.createLinearGradient(tailX, tailY, laser.currentX, laser.currentY);
        boltGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
        boltGrad.addColorStop(0.3, '#d97706');
        boltGrad.addColorStop(0.8, '#f59e0b');
        boltGrad.addColorStop(1, '#fef08a');

        ctx.strokeStyle = boltGrad;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 22;
        ctx.lineWidth = bWidth * 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(1.8, bWidth * 0.45);
        ctx.stroke();

        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(0, 0, bWidth * 0.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (laser.particleType === 'kyber_purple') {
        // 17. Jedi Kyber Amethyst Pulse
        const boltLen = 34;
        const tailX = laser.currentX - Math.cos(angle) * boltLen;
        const tailY = laser.currentY - Math.sin(angle) * boltLen;

        const boltGrad = ctx.createLinearGradient(tailX, tailY, laser.currentX, laser.currentY);
        boltGrad.addColorStop(0, 'rgba(192, 132, 252, 0)');
        boltGrad.addColorStop(0.4, '#9333ea');
        boltGrad.addColorStop(0.8, '#c084fc');
        boltGrad.addColorStop(1, '#fdf4ff');

        ctx.strokeStyle = boltGrad;
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 24;
        ctx.lineWidth = bWidth * 1.7;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(2, bWidth * 0.5);
        ctx.stroke();

        // Kyber Diamond Star at Tip
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(Date.now() * 0.015);
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

      } else {
        // 12. Default Neon Cyan Rail Beam ('spark')
        ctx.strokeStyle = laser.color;
        ctx.shadowColor = laser.color;
        ctx.lineWidth = bWidth;
        ctx.shadowBlur = 16;

        ctx.beginPath();
        ctx.moveTo(laser.startX, laser.startY);
        ctx.lineTo(laser.currentX, laser.currentY);
        ctx.stroke();

        // Inner White Core
        ctx.strokeStyle = laser.coreColor || '#ffffff';
        ctx.lineWidth = Math.max(1.5, bWidth * 0.35);
        ctx.shadowBlur = 4;
        ctx.stroke();

        // Diamond Rail Head
        ctx.save();
        ctx.translate(laser.currentX, laser.currentY);
        ctx.rotate(angle);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = laser.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(bWidth + 4, 0);
        ctx.lineTo(0, bWidth * 0.7);
        ctx.lineTo(-(bWidth + 4), 0);
        ctx.lineTo(0, -bWidth * 0.7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    }

    // Draw Particles
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw Floating Texts
    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, ft.alpha);
      ctx.font = `bold ${ft.size}px Fredoka, sans-serif`;
      ctx.fillStyle = ft.color;
      ctx.shadowColor = ft.color;
      ctx.shadowBlur = 10;
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  public clear() {
    this.particles = [];
    this.lasers = [];
    this.floatingTexts = [];
  }
}

