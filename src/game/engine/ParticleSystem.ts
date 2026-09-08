import { Particle, LaserBolt, FloatingText } from '../../data/types';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  color: string;
}

export class ParticleSystem {
  private stars: Star[] = [];
  private particles: Particle[] = [];
  private lasers: LaserBolt[] = [];
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
      color
    });
  }

  public addExplosion(x: number, y: number, color: string = '#ff007f', count: number = 24) {
    const palette = [color, '#ffffff', '#ffe600', '#00f0ff'];
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
      laser.progress += 0.18; // Fast laser velocity
      laser.currentX = laser.startX + (laser.targetX - laser.startX) * Math.min(laser.progress, 1);
      laser.currentY = laser.startY + (laser.targetY - laser.startY) * Math.min(laser.progress, 1);

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
      ctx.strokeStyle = laser.color;
      ctx.lineWidth = 3;
      ctx.shadowColor = laser.color;
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(laser.startX, laser.startY);
      ctx.lineTo(laser.currentX, laser.currentY);
      ctx.stroke();

      // Laser tip glow
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(laser.currentX, laser.currentY, 4, 0, Math.PI * 2);
      ctx.fill();
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
