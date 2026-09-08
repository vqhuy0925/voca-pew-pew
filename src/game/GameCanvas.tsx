import React, { useEffect, useRef } from 'react';
import { EnemyItem, GameStats, GameState, VocabTheme } from '../data/types';
import { ParticleSystem } from './engine/ParticleSystem';
import { EnemySpawner } from './engine/EnemySpawner';
import { InputHandler } from './engine/InputHandler';
import { CollisionEngine } from './engine/CollisionEngine';
import { soundFx } from './engine/SoundController';

interface GameCanvasProps {
  gameState: GameState;
  selectedTheme: VocabTheme;
  stats: GameStats;
  onStatsUpdate: (updater: (prev: GameStats) => GameStats) => void;
  onGameOver: () => void;
  onVictory: () => void;
  onTargetChange: (target: EnemyItem | null) => void;
  onRegisterInputHandler?: (handler: (char: string) => void) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  selectedTheme,
  stats,
  onStatsUpdate,
  onGameOver,
  onVictory,
  onTargetChange,
  onRegisterInputHandler
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleSysRef = useRef<ParticleSystem | null>(null);
  const spawnerRef = useRef<EnemySpawner | null>(null);
  const inputHandlerRef = useRef<InputHandler | null>(null);
  const collisionEngineRef = useRef<CollisionEngine | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const statsRef = useRef(stats);
  statsRef.current = stats;

  // Initialize Game Systems
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.parentElement?.clientWidth || window.innerWidth;
    const h = canvas.parentElement?.clientHeight || window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particleSys = new ParticleSystem(w, h);
    const spawner = new EnemySpawner(w, h);
    const inputHandler = new InputHandler();
    const collisionEngine = new CollisionEngine();
    collisionEngine.setDefenseLineY(h - 100);

    particleSysRef.current = particleSys;
    spawnerRef.current = spawner;
    inputHandlerRef.current = inputHandler;
    collisionEngineRef.current = collisionEngine;

    // Load words for selected theme
    spawner.loadWords(selectedTheme.words);

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const nw = canvas.parentElement.clientWidth;
      const nh = canvas.parentElement.clientHeight;
      canvas.width = nw;
      canvas.height = nh;
      particleSys.resize(nw, nh);
      spawner.setDimensions(nw, nh);
      collisionEngine.setDefenseLineY(nh - 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedTheme]);

  // Handle Input processing function
  const processInput = (char: string) => {
    if (gameState !== 'PLAYING') return;
    const spawner = spawnerRef.current;
    const inputHandler = inputHandlerRef.current;
    const particleSys = particleSysRef.current;
    const canvas = canvasRef.current;
    if (!spawner || !inputHandler || !particleSys || !canvas) return;

    const enemies = spawner.getEnemies();
    const result = inputHandler.handleKeyPress(char, enemies);

    onTargetChange(result.targetEnemy);

    onStatsUpdate(prev => {
      const totalKeystrokes = prev.totalKeystrokes + 1;
      let correctKeystrokes = prev.correctKeystrokes;
      let combo = prev.combo;
      let score = prev.score;
      let wordsDefeated = prev.wordsDefeated;
      const clearedWordsList = [...prev.clearedWordsList];

      if (result.hitLetter) {
        correctKeystrokes++;
        combo++;
        const comboBonus = Math.min(combo, 10) * 10;
        score += 10 + comboBonus;

        if (combo % 5 === 0) {
          soundFx.playCombo(Math.floor(combo / 5));
          particleSys.addFloatingText(`COMBO x${combo}! 🔥`, canvas.width / 2, canvas.height * 0.35, '#ff007f', 28);
        }

        // Shoot laser from spaceship
        const shipX = canvas.width / 2;
        const shipY = canvas.height - 80;
        if (result.laserTargetPos) {
          particleSys.addLaser(shipX, shipY, result.laserTargetPos.x, result.laserTargetPos.y, '#00f0ff');
        }

        // If whole word is defeated
        if (result.defeatedEnemy) {
          wordsDefeated++;
          score += 100;
          particleSys.addExplosion(result.defeatedEnemy.x + result.defeatedEnemy.width / 2, result.defeatedEnemy.y + 25, result.defeatedEnemy.color, 32);
          particleSys.addFloatingText(`+${100 + comboBonus} ${result.defeatedEnemy.emoji}`, result.defeatedEnemy.x + result.defeatedEnemy.width / 2, result.defeatedEnemy.y, '#39ff14', 22);

          // Find full vocab item to add to review list
          const vocabMatch = selectedTheme.words.find(w => w.word.toLowerCase() === result.defeatedEnemy?.word.toLowerCase());
          if (vocabMatch && !clearedWordsList.some(w => w.id === vocabMatch.id)) {
            clearedWordsList.push(vocabMatch);
          }

          spawner.removeEnemy(result.defeatedEnemy.id);
          onTargetChange(null);
        }
      } else if (result.isWrong) {
        combo = 0; // Reset combo on mistake
      }

      const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
      const maxCombo = Math.max(prev.maxCombo, combo);

      return {
        ...prev,
        score,
        combo,
        maxCombo,
        wordsDefeated,
        totalKeystrokes,
        correctKeystrokes,
        accuracy,
        clearedWordsList
      };
    });
  };

  // Register input handler for virtual keyboard
  useEffect(() => {
    if (onRegisterInputHandler) {
      onRegisterInputHandler(processInput);
    }
  }, [onRegisterInputHandler, gameState]);

  // Physical Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore functional keys
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        processInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, selectedTheme]);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'PLAYING') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    lastTimeRef.current = performance.now();

    const loop = (time: number) => {
      const deltaTime = Math.min(time - lastTimeRef.current, 100);
      lastTimeRef.current = time;

      const spawner = spawnerRef.current;
      const particleSys = particleSysRef.current;
      const collisionEngine = collisionEngineRef.current;

      if (spawner && particleSys && collisionEngine) {
        // 1. Update Spawner & Enemies
        const enemies = spawner.update(deltaTime);

        // 2. Check Victory condition (no remaining words in queue and screen)
        if (spawner.getRemainingWordsCount() === 0) {
          soundFx.playVictory();
          onVictory();
          return;
        }

        // 3. Check Defense Breach
        const breach = collisionEngine.checkDefenseBreach(enemies);
        if (breach.breachedEnemies.length > 0) {
          for (const breached of breach.breachedEnemies) {
            spawner.removeEnemy(breached.id);
            particleSys.addExplosion(breached.x + breached.width / 2, canvas.height - 100, '#ff0055', 20);
            particleSys.addFloatingText('-20 HP 💥', breached.x + breached.width / 2, canvas.height - 120, '#ff0055', 20);
          }

          onStatsUpdate(prev => {
            const nextHealth = Math.max(0, prev.stationHealth - breach.damageTaken);
            if (nextHealth <= 0) {
              soundFx.playGameOver();
              onGameOver();
            }
            return {
              ...prev,
              stationHealth: nextHealth,
              combo: 0
            };
          });
        }

        // 4. Update Particles & FX
        particleSys.update();

        // 5. RENDER FRAME
        renderGame(ctx, canvas.width, canvas.height, enemies, particleSys);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, onGameOver, onVictory]);

  // Main Drawing Function
  const renderGame = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    enemies: EnemyItem[],
    particleSys: ParticleSystem
  ) => {
    // Clear Screen with deep space gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#060714');
    bgGrad.addColorStop(1, '#0e112a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw Particles & Stars
    particleSys.draw(ctx);

    // Draw Defense Shield Line (Bottom barrier)
    const defenseY = h - 100;
    ctx.save();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 15;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.moveTo(20, defenseY);
    ctx.lineTo(w - 20, defenseY);
    ctx.stroke();

    // Defense Line Label
    ctx.font = 'bold 12px Fredoka, sans-serif';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
    ctx.textAlign = 'right';
    ctx.fillText('SHIELD DEFENSE LINE', w - 30, defenseY - 8);
    ctx.restore();

    // Draw Floating Enemies (Words)
    for (const enemy of enemies) {
      drawEnemy(ctx, enemy);
    }

    // Draw Player Spaceship Turret at Bottom Center
    drawPlayerShip(ctx, w / 2, h - 60);
  };

  const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: EnemyItem) => {
    ctx.save();

    // Shake offset on mistake/hit
    let offsetX = 0;
    if (enemy.shakeTime > 0) {
      offsetX = (Math.random() - 0.5) * 8;
    }

    const x = enemy.x + offsetX;
    const y = enemy.y;
    const width = enemy.width;
    const height = enemy.height;
    const radius = 16;

    // Outer Glow / Highlight if targeted
    if (enemy.isTargeted) {
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 24;
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3.5;
    } else {
      ctx.shadowColor = enemy.color;
      ctx.shadowBlur = 10;
      ctx.strokeStyle = enemy.color;
      ctx.lineWidth = 2;
    }

    // Badge Background Box
    ctx.fillStyle = enemy.isTargeted ? 'rgba(18, 20, 56, 0.95)' : 'rgba(10, 12, 34, 0.85)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
    ctx.stroke();

    // Draw Target Lock Crosshair Indicator if targeted
    if (enemy.isTargeted) {
      ctx.save();
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      // Little triangle pointer above
      ctx.moveTo(x + width / 2, y - 6);
      ctx.lineTo(x + width / 2 - 8, y - 16);
      ctx.lineTo(x + width / 2 + 8, y - 16);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Draw Emoji
    ctx.font = '24px serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(enemy.emoji, x + 12, y + height / 2 - 4);

    // Draw Word Letters (Split into typed and untyped)
    const letterStartX = x + 44;
    ctx.font = 'bold 26px Fredoka, sans-serif';
    ctx.textBaseline = 'middle';

    let currentX = letterStartX;
    for (let i = 0; i < enemy.word.length; i++) {
      const char = enemy.word[i];
      const isTyped = i < enemy.typedIndex;
      const isCurrentChar = i === enemy.typedIndex && enemy.isTargeted;

      if (isTyped) {
        // Correctly typed -> Glow Green
        ctx.fillStyle = '#39ff14';
        ctx.shadowColor = '#39ff14';
        ctx.shadowBlur = 10;
      } else if (isCurrentChar) {
        // Next character to type -> Bright Yellow with underline
        ctx.fillStyle = '#ffe600';
        ctx.shadowColor = '#ffe600';
        ctx.shadowBlur = 14;
      } else {
        // Remaining characters -> White
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
      }

      ctx.fillText(char, currentX, y + 22);

      // Underline active char
      if (isCurrentChar) {
        ctx.strokeStyle = '#ffe600';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(currentX - 1, y + 34);
        ctx.lineTo(currentX + 16, y + 34);
        ctx.stroke();
      }

      currentX += ctx.measureText(char).width + 3;
    }

    // Vietnamese Meaning Pill (Sub-label)
    ctx.font = '500 12px Fredoka, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
    ctx.fillText(`(${enemy.meaningVi})`, x + 44, y + 42);

    ctx.restore();
  };

  const drawPlayerShip = (ctx: CanvasRenderingContext2D, shipX: number, shipY: number) => {
    ctx.save();
    ctx.translate(shipX, shipY);

    // Thruster Flame Glow
    const flameHeight = 15 + Math.sin(Date.now() * 0.02) * 5;
    ctx.fillStyle = '#ff9900';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(-10, 20);
    ctx.lineTo(0, 20 + flameHeight);
    ctx.lineTo(10, 20);
    ctx.closePath();
    ctx.fill();

    // Spaceship Hull
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.moveTo(0, -28);      // Nose
    ctx.lineTo(24, 18);      // Right wing
    ctx.lineTo(12, 14);
    ctx.lineTo(0, 20);       // Back center
    ctx.lineTo(-12, 14);
    ctx.lineTo(-24, 18);     // Left wing
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cockpit Cockpit Glass
    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(0, -4, 6, 0, Math.PI * 2);
    ctx.fill();

    // Dual Laser Cannons
    ctx.fillStyle = '#ff007f';
    ctx.fillRect(-22, -6, 4, 12);
    ctx.fillRect(18, -6, 4, 12);

    ctx.restore();
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-space-dark select-none">
      <canvas ref={canvasRef} className="w-full h-full block cursor-default" />
    </div>
  );
};
