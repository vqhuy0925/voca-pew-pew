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
  particleType?: 'spark' | 'lightning' | 'plasma' | 'rainbow' | 'flame' | 'heart' | 'sakura' | 'crystal';
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

  constructor(width: number, height: number) {
    this.resize(width, height);
    this.initStars(80);
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
    for (const s of this.stars) {
      s.y += s.speed;
      if (s.y > this.height) {
        s.y = 0;
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
      if (Math.random() < 0.35 && laser.progress < 0.9) {
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
    // Draw Stars
    for (const s of this.stars) {
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
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
      } else if (laser.particleType === 'heart') {
        // 5. Love Nova Beam with Floating Pulsing Hearts
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
        // 6. Sakura Petal Stream
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
        // 7. Diamond Prism Laser
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

      } else {
        // 5. Default Neon Cyan Rail Beam ('spark')
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

