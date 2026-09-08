import React, { useEffect, useRef } from 'react';
import { EnemyItem, GameStats, GameState } from '../data/types';
import { LevelNode } from '../data/progress-types';
import {
  DifficultyLevel,
  SpaceshipItem,
  BlasterItem,
  LaserBeamItem,
  DIFFICULTY_CONFIGS,
  getSpaceshipById,
  getBlasterById,
  getLaserById
} from '../data/upgrade-types';
import { ParticleSystem } from './engine/ParticleSystem';
import { EnemySpawner } from './engine/EnemySpawner';
import { InputHandler } from './engine/InputHandler';
import { CollisionEngine } from './engine/CollisionEngine';
import { soundFx } from './engine/SoundController';
import { speechHelper } from './engine/SpeechHelper';
import { drawSpaceship, getBlasterMuzzleOrigins } from './engine/ShipRenderer';

interface GameCanvasProps {
  gameState: GameState;
  level: LevelNode;
  stats: GameStats;
  difficulty?: DifficultyLevel;
  equippedShip?: SpaceshipItem;
  equippedBlaster?: BlasterItem;
  equippedLaser?: LaserBeamItem;
  onStatsUpdate: (updater: (prev: GameStats) => GameStats) => void;
  onGameOver: () => void;
  onVictory: () => void;
  onTargetChange: (target: EnemyItem | null) => void;
  onTotalWordsSet?: (count: number) => void;
  onSuggestCharChange?: (char?: string) => void;
  onRegisterInputHandler?: (handler: (char: string) => void) => void;
  onTimerUpdate?: (remainingSeconds: number, totalSeconds: number) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  level,
  stats,
  difficulty = 'NORMAL',
  equippedShip = getSpaceshipById('ship-scout'),
  equippedBlaster = getBlasterById('blaster-single'),
  equippedLaser = getLaserById('laser-cyan'),
  onStatsUpdate,
  onGameOver,
  onVictory,
  onTargetChange,
  onTotalWordsSet,
  onSuggestCharChange,
  onRegisterInputHandler,
  onTimerUpdate
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const particleSysRef = useRef<ParticleSystem | null>(null);
  const spawnerRef = useRef<EnemySpawner | null>(null);
  const inputHandlerRef = useRef<InputHandler | null>(null);
  const collisionEngineRef = useRef<CollisionEngine | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const lastSpokenEnemyIdRef = useRef<string | null>(null);

  // Mission Timer Refs
  const diffConfig = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.NORMAL;
  const totalSeconds = diffConfig.timeLimitSeconds;
  const timeRemainingRef = useRef<number>(totalSeconds);
  const lastTickSecondRef = useRef<number>(totalSeconds);

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

    // Reset Timer
    timeRemainingRef.current = totalSeconds;
    lastTickSecondRef.current = totalSeconds;
    if (onTimerUpdate) {
      onTimerUpdate(totalSeconds, totalSeconds);
    }

    // Load level data with difficulty speed multiplier
    spawner.loadLevel(level, diffConfig.speedMultiplier);
    speechHelper.preloadWords(level.words.map(w => w.word));
    if (onTotalWordsSet) {
      onTotalWordsSet(spawner.getTotalWordsCount());
    }

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
  }, [level, difficulty]);

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

    // Speak word on lock-on if not yet spoken
    if (result.targetEnemy && result.targetEnemy.id !== lastSpokenEnemyIdRef.current) {
      lastSpokenEnemyIdRef.current = result.targetEnemy.id;
      speechHelper.speak(result.targetEnemy.word);
    }

    // Update suggested next char for keyboard hint
    if (onSuggestCharChange) {
      if (result.targetEnemy && result.targetEnemy.typedIndex < result.targetEnemy.word.length) {
        onSuggestCharChange(result.targetEnemy.word[result.targetEnemy.typedIndex]);
      } else {
        onSuggestCharChange(undefined);
      }
    }

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

        if (combo % 3 === 0) {
          soundFx.playCombo(Math.floor(combo / 3));
          particleSys.addFloatingText(`COMBO x${combo}! 🔥`, canvas.width / 2, canvas.height * 0.35, '#ff007f', 36);
        }

        // Custom Laser sound
        soundFx.playCustomLaser(equippedBlaster.fireSound);

        // Calculate laser firing origins based on equipped blaster
        const shipX = canvas.width / 2;
        const shipY = canvas.height - 60;
        const origins = getBlasterMuzzleOrigins(shipX, shipY, equippedBlaster, 1.0);

        if (result.laserTargetPos) {
          particleSys.addMultiLaser(origins, result.laserTargetPos.x, result.laserTargetPos.y, equippedLaser);
        }

        // If whole word is defeated
        if (result.defeatedEnemy) {
          wordsDefeated++;
          score += 100;
          soundFx.playExplosion();
          particleSys.addExplosion(
            result.defeatedEnemy.x + result.defeatedEnemy.width / 2,
            result.defeatedEnemy.y + 25,
            equippedLaser.beamColor || result.defeatedEnemy.color,
            36
          );
          particleSys.addFloatingText(
            `+${100 + comboBonus} ${result.defeatedEnemy.emoji}`,
            result.defeatedEnemy.x + result.defeatedEnemy.width / 2,
            result.defeatedEnemy.y,
            '#39ff14',
            28
          );

          // Find full vocab item to add to review list
          const vocabMatch = level.words.find(w => w.word.toLowerCase() === result.defeatedEnemy?.word.toLowerCase());
          if (vocabMatch && !clearedWordsList.some(w => w.id === vocabMatch.id)) {
            clearedWordsList.push(vocabMatch);
          }

          spawner.removeEnemy(result.defeatedEnemy.id);
          onTargetChange(null);
          if (onSuggestCharChange) onSuggestCharChange(undefined);
        }
      } else if (result.isWrong) {
        combo = 0;
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

  // Focus hidden input whenever playing
  useEffect(() => {
    if (gameState === 'PLAYING') {
      const timer = setTimeout(() => {
        hiddenInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Register input handler for virtual keyboard
  useEffect(() => {
    if (onRegisterInputHandler) {
      onRegisterInputHandler(processInput);
    }
  }, [onRegisterInputHandler, gameState, equippedBlaster, equippedLaser]);

  // Physical & Native Mobile Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === ' ' || e.code === 'Space' || (e.key.length === 1 && /^[a-zA-Z0-9 '\-.,?!]$/.test(e.key))) {
        e.preventDefault();
        processInput(e.key === ' ' || e.code === 'Space' ? ' ' : e.key);
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, level, equippedBlaster, equippedLaser]);

  const handleHiddenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      for (let i = 0; i < val.length; i++) {
        processInput(val[i]);
      }
      e.target.value = '';
    }
  };

  const handleCanvasContainerClick = () => {
    if (gameState === 'PLAYING') {
      hiddenInputRef.current?.focus();
    }
  };

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
        // 0. Update Mission Timer
        timeRemainingRef.current = Math.max(0, timeRemainingRef.current - deltaTime / 1000);
        const currentSec = Math.ceil(timeRemainingRef.current);

        if (currentSec !== lastTickSecondRef.current) {
          lastTickSecondRef.current = currentSec;
          if (onTimerUpdate) {
            onTimerUpdate(currentSec, totalSeconds);
          }
          if (currentSec <= 5 && currentSec > 0) {
            soundFx.playTickTock(true);
            particleSys.addFloatingText(`⏱️ ${currentSec}s!`, canvas.width / 2, canvas.height * 0.25, '#f43f5e', 32);
          }
        }

        // Time Out Check
        if (timeRemainingRef.current <= 0) {
          soundFx.playGameOver();
          particleSys.addFloatingText('HẾT GIỜ! ⏰', canvas.width / 2, canvas.height * 0.4, '#f43f5e', 40);
          onGameOver();
          return;
        }

        // 1. Update Spawner & Enemies
        const enemies = spawner.update(deltaTime);

        // 2. Check Victory condition
        if (spawner.getRemainingWordsCount() === 0) {
          onVictory();
          return;
        }

        // 3. Check Defense Breach
        const breach = collisionEngine.checkDefenseBreach(enemies);
        if (breach.breachedEnemies.length > 0) {
          for (const breached of breach.breachedEnemies) {
            spawner.removeEnemy(breached.id);
            soundFx.playHeartLost();
            particleSys.addExplosion(breached.x + breached.width / 2, canvas.height - 100, '#ff0055', 24);
            particleSys.addFloatingText('-1 ❤️', breached.x + breached.width / 2, canvas.height - 120, '#ff0055', 28);
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
  }, [gameState, onGameOver, onVictory, totalSeconds]);

  // Main Drawing Function with Dynamic Ship Skins & Custom Visuals
  const renderGame = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    enemies: EnemyItem[],
    particleSys: ParticleSystem
  ) => {
    // Rich warm galaxy gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0a0d2a');
    bgGrad.addColorStop(0.5, '#12173f');
    bgGrad.addColorStop(1, '#080a1c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw Particles & Floating Stars
    particleSys.draw(ctx);

    // Draw Defense Shield Line (Clean glowing dash)
    const defenseY = h - 100;
    ctx.save();
    ctx.strokeStyle = equippedShip.glowColor || '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = equippedShip.glowColor || '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.moveTo(16, defenseY);
    ctx.lineTo(w - 16, defenseY);
    ctx.stroke();

    // Defense Line Label (Subtle & clean)
    ctx.font = 'bold 12px Fredoka, sans-serif';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
    ctx.textAlign = 'right';
    ctx.fillText('🛡️ PHÒNG TUYẾN', w - 24, defenseY - 8);
    ctx.restore();

    // Draw Floating Enemies (Words)
    for (const enemy of enemies) {
      drawEnemy(ctx, enemy);
    }

    // Draw Dynamic Player Spaceship Turret at Bottom Center
    drawSpaceship(ctx, w / 2, h - 60, equippedShip, equippedBlaster);
  };


  const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: EnemyItem) => {
    ctx.save();

    let offsetX = 0;
    if (enemy.shakeTime > 0) {
      offsetX = (Math.random() - 0.5) * 8;
    }

    const x = enemy.x + offsetX;
    const y = enemy.y;
    const width = enemy.width;
    const height = enemy.height;
    const radius = 24;

    // Glowing Pill Card
    if (enemy.isTargeted) {
      ctx.shadowColor = equippedLaser.beamColor || '#00f0ff';
      ctx.shadowBlur = 28;
      ctx.strokeStyle = equippedLaser.beamColor || '#00f0ff';
      ctx.lineWidth = 4.5;
    } else {
      ctx.shadowColor = enemy.color;
      ctx.shadowBlur = 14;
      ctx.strokeStyle = enemy.color;
      ctx.lineWidth = 3;
    }

    // Badge Background Box (Dark high-contrast slate)
    ctx.fillStyle = enemy.isTargeted ? 'rgba(15, 23, 62, 0.96)' : 'rgba(11, 15, 42, 0.90)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
    ctx.stroke();

    // Target pointer triangle above if locked-on
    if (enemy.isTargeted) {
      ctx.save();
      ctx.fillStyle = equippedLaser.beamColor || '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y - 8);
      ctx.lineTo(x + width / 2 - 10, y - 20);
      ctx.lineTo(x + width / 2 + 10, y - 20);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Draw Emoji
    ctx.font = '32px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(enemy.emoji, x + 14, y + height / 2 - 2);

    // Draw Word / Sentence Letters (Split into typed and untyped)
    const letterStartX = x + 58;
    const isSentence = enemy.word.length > 18;
    const fontSize = enemy.word.length > 40 ? 16 : enemy.word.length > 26 ? 18 : enemy.word.length > 15 ? 21 : enemy.word.length > 7 ? 25 : 30;
    ctx.font = `bold ${fontSize}px Fredoka, system-ui, sans-serif`;
    ctx.textBaseline = 'middle';

    let currentX = letterStartX;
    for (let i = 0; i < enemy.word.length; i++) {
      const char = enemy.word[i];
      const isTyped = i < enemy.typedIndex;
      const isCurrentChar = i === enemy.typedIndex && enemy.isTargeted;

      if (isTyped) {
        ctx.fillStyle = '#4ade80';
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 14;
      } else if (isCurrentChar) {
        ctx.fillStyle = '#facc15';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 20;
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
      }

      const displayChar = char;
      const charWidth = char === ' ' ? Math.max(6, fontSize * 0.35) : ctx.measureText(displayChar).width;

      if (char === ' ') {
        if (isCurrentChar) {
          ctx.fillStyle = 'rgba(250, 204, 21, 0.5)';
          ctx.fillRect(currentX, y + (isSentence ? 12 : 14), Math.max(8, charWidth + 2), isSentence ? 20 : 22);
        }
      } else {
        ctx.fillText(char, currentX, y + (isSentence ? 24 : 25));
      }

      // Underline active char
      if (isCurrentChar) {
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(currentX - 1, y + (isSentence ? 38 : 42));
        ctx.lineTo(currentX + charWidth + 1, y + (isSentence ? 38 : 42));
        ctx.stroke();
      }

      currentX += charWidth + (isSentence ? 1.5 : 3.5);
    }

    // Vietnamese Meaning Subtext
    const meaningFontSize = isSentence ? 13 : 15;
    ctx.font = `bold ${meaningFontSize}px Fredoka, system-ui, sans-serif`;
    ctx.fillStyle = '#bae6fd';
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
    ctx.fillText(`(${enemy.meaningVi})`, x + 58, y + (isSentence ? 54 : 51));

    ctx.restore();
  };

  return (
    <div
      onClick={handleCanvasContainerClick}
      onTouchStart={handleCanvasContainerClick}
      className="relative w-full h-full overflow-hidden bg-space-dark select-none"
    >
      {/* Invisible input element to capture native mobile & iPad keyboard input */}
      <input
        ref={hiddenInputRef}
        type="text"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        inputMode="text"
        onChange={handleHiddenInputChange}
        tabIndex={-1}
        aria-label="Nhập từ vựng"
        className="fixed top-2 left-2 opacity-0 pointer-events-none w-1 h-1 z-0 border-0 p-0 m-0"
        style={{
          opacity: 0,
          position: 'fixed',
          top: '10px',
          left: '10px',
          width: '1px',
          height: '1px',
          pointerEvents: 'none',
          border: 'none',
          outline: 'none',
          background: 'transparent'
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full block cursor-default" />
    </div>
  );
};

export default GameCanvas;

