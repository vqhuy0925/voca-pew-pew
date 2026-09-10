import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const lastInputTimeRef = useRef<{ char: string; time: number }>({ char: '', time: 0 });

  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Mission Timer Refs
  const diffConfig = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.NORMAL;
  const totalSeconds = diffConfig.timeLimitSeconds;
  const timeRemainingRef = useRef<number>(totalSeconds);
  const lastTickSecondRef = useRef<number>(totalSeconds);

  // Detect touch device
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  // Helper to focus input for native mobile keyboard
  const focusInput = useCallback(() => {
    if (hiddenInputRef.current) {
      try {
        hiddenInputRef.current.focus({ preventScroll: true });
        setIsInputFocused(true);
      } catch (err) {
        // Ignore focus errors
      }
    }
  }, []);

  // Initialize Game Systems
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getDimensions = () => {
      const parent = canvas.parentElement;
      const vv = window.visualViewport;
      const w = parent?.clientWidth || (vv ? vv.width : window.innerWidth);
      const h = parent?.clientHeight || (vv ? vv.height : window.innerHeight);
      return { w, h };
    };

    const { w, h } = getDimensions();
    canvas.width = w;
    canvas.height = h;

    const particleSys = new ParticleSystem(w, h);
    const spawner = new EnemySpawner(w, h);
    const inputHandler = new InputHandler();
    const collisionEngine = new CollisionEngine();
    const isMobile = w < 640;
    collisionEngine.setDefenseLineY(h - (isMobile ? 80 : 100));

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

    // Star Wars Hyperspace Drop into Battle
    particleSys.setHyperspace(true);
    soundFx.playHyperdriveJump();
    particleSys.addFloatingText('🚀 HYPERDRIVE // WARP SPEED!', canvas.width / 2, canvas.height * 0.35, '#00f0ff', 24);
    const hyperspaceTimer = setTimeout(() => {
      particleSys.setHyperspace(false);
    }, 750);

    // Dynamic Viewport & Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const { w: nw, h: nh } = getDimensions();
      canvas.width = nw;
      canvas.height = nh;
      particleSys.resize(nw, nh);
      spawner.setDimensions(nw, nh);
      const isMob = nw < 640;
      collisionEngine.setDefenseLineY(nh - (isMob ? 80 : 100));
    };

    window.addEventListener('resize', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      clearTimeout(hyperspaceTimer);
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
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
        const isMobile = canvas.width < 640;
        const shipX = canvas.width / 2;
        const shipY = canvas.height - (isMobile ? 45 : 60);
        const origins = getBlasterMuzzleOrigins(shipX, shipY, equippedBlaster, isMobile ? 0.9 : 1.0);

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

  // Safe wrapper to prevent duplicate triggers across keydown + input events
  const safeProcessInput = (char: string) => {
    if (!char) return;
    const lower = char.toLowerCase();
    const now = performance.now();
    if (lastInputTimeRef.current.char === lower && now - lastInputTimeRef.current.time < 35) {
      return;
    }
    lastInputTimeRef.current = { char: lower, time: now };
    processInput(char);
  };

  // Focus hidden input whenever playing
  useEffect(() => {
    if (gameState === 'PLAYING') {
      focusInput();
      const timer = setTimeout(focusInput, 80);
      return () => clearTimeout(timer);
    }
  }, [gameState, focusInput]);

  // Register input handler for virtual keyboard / external triggers
  useEffect(() => {
    if (onRegisterInputHandler) {
      onRegisterInputHandler(safeProcessInput);
    }
  }, [onRegisterInputHandler, gameState, equippedBlaster, equippedLaser]);

  // Physical & Native Mobile Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === ' ' || e.code === 'Space' || (e.key.length === 1 && /^[a-zA-Z0-9 '\-.,?!]$/.test(e.key))) {
        e.preventDefault();
        safeProcessInput(e.key === ' ' || e.code === 'Space' ? ' ' : e.key);
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
        safeProcessInput(val[i]);
      }
      e.target.value = '';
    }
  };

  const handleHiddenInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const val = target.value;
    if (val) {
      for (let i = 0; i < val.length; i++) {
        safeProcessInput(val[i]);
      }
      target.value = '';
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
        // 0. Update Mission Timer (Only if time limit exists)
        if (totalSeconds > 0) {
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
        }

        // 1. Update Spawner & Enemies
        const enemies = spawner.update(deltaTime);

        // 2. Check Victory condition (with Star Wars Hyperspace Jump effect)
        if (spawner.getRemainingWordsCount() === 0) {
          particleSys.setHyperspace(true);
          soundFx.playHyperdriveJump();
          setTimeout(() => {
            onVictory();
          }, 450);
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
    const isMobile = w < 640;
    const defenseY = h - (isMobile ? 80 : 100);
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
    ctx.font = 'bold 14px Orbitron, Fredoka, sans-serif';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
    ctx.textAlign = 'right';
    ctx.fillText('🛡️ PHÒNG TUYẾN', w - 24, defenseY - 8);
    ctx.restore();

    // Draw Floating Enemies (Words)
    for (const enemy of enemies) {
      drawEnemy(ctx, enemy);
    }

    // Draw Dynamic Player Spaceship Turret at Bottom Center
    drawSpaceship(ctx, w / 2, h - (isMobile ? 45 : 60), equippedShip, equippedBlaster, isMobile ? 0.9 : 1.0);
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

    // Star Wars Trench Run / Targeting Computer Reticle HUD when locked-on
    if (enemy.isTargeted) {
      ctx.save();
      const reticleColor = equippedLaser.beamColor || '#00f0ff';
      ctx.strokeStyle = reticleColor;
      ctx.fillStyle = reticleColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = reticleColor;
      ctx.shadowBlur = 14;

      const pad = 6;
      const bracketLen = 14;

      // Top-Left bracket
      ctx.beginPath();
      ctx.moveTo(x - pad, y - pad + bracketLen);
      ctx.lineTo(x - pad, y - pad);
      ctx.lineTo(x - pad + bracketLen, y - pad);
      ctx.stroke();

      // Top-Right bracket
      ctx.beginPath();
      ctx.moveTo(x + width + pad - bracketLen, y - pad);
      ctx.lineTo(x + width + pad, y - pad);
      ctx.lineTo(x + width + pad, y - pad + bracketLen);
      ctx.stroke();

      // Bottom-Left bracket
      ctx.beginPath();
      ctx.moveTo(x - pad, y + height + pad - bracketLen);
      ctx.lineTo(x - pad, y + height + pad);
      ctx.lineTo(x - pad + bracketLen, y + height + pad);
      ctx.stroke();

      // Bottom-Right bracket
      ctx.beginPath();
      ctx.moveTo(x + width + pad - bracketLen, y + height + pad);
      ctx.lineTo(x + width + pad, y + height + pad);
      ctx.lineTo(x + width + pad, y + height + pad - bracketLen);
      ctx.stroke();

      // Lock-On Pointer Triangle & Telemetry Badge above
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y - 6);
      ctx.lineTo(x + width / 2 - 8, y - 18);
      ctx.lineTo(x + width / 2 + 8, y - 18);
      ctx.closePath();
      ctx.fill();

      // Telemetry Text
      ctx.font = 'bold 12px Orbitron, monospace, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ LOCK', x + width / 2, y - 22);

      ctx.restore();
    }

    // Draw Emoji
    const isSentence = enemy.word.length > 18;
    const emojiSize = isSentence ? 32 : 36;
    const paddingLeft = 14;
    const emojiSpace = emojiSize + 10;
    const letterStartX = x + paddingLeft + emojiSpace;
    const maxTextWidth = Math.max(90, width - (paddingLeft + emojiSpace + 16));

    ctx.font = `${emojiSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(enemy.emoji, x + paddingLeft, y + height / 2 - 2);

    // Dynamic Font Auto-Fitting to guarantee text never overflows pill
    let fontSize = isSentence ? (enemy.word.length > 35 ? 18 : 22) : (enemy.word.length > 10 ? 26 : 30);
    let letterSpacing = isSentence ? 1.0 : 2.0;

    ctx.font = `bold ${fontSize}px Fredoka, system-ui, sans-serif`;
    let totalTextWidth = 0;
    for (let i = 0; i < enemy.word.length; i++) {
      const c = enemy.word[i];
      const cw = c === ' ' ? Math.max(5, fontSize * 0.35) : ctx.measureText(c).width;
      totalTextWidth += cw + letterSpacing;
    }

    while (totalTextWidth > maxTextWidth && fontSize > 13) {
      fontSize -= 0.5;
      letterSpacing = fontSize < 15 ? 0.5 : 1.0;
      ctx.font = `bold ${fontSize}px Fredoka, system-ui, sans-serif`;
      totalTextWidth = 0;
      for (let i = 0; i < enemy.word.length; i++) {
        const c = enemy.word[i];
        const cw = c === ' ' ? Math.max(5, fontSize * 0.35) : ctx.measureText(c).width;
        totalTextWidth += cw + letterSpacing;
      }
    }

    // Draw Letters
    ctx.font = `bold ${fontSize}px Fredoka, system-ui, sans-serif`;
    ctx.textBaseline = 'middle';

    const wordCenterY = y + (isSentence ? 28 : 29);
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
      const charWidth = char === ' ' ? Math.max(5, fontSize * 0.35) : ctx.measureText(displayChar).width;

      if (char === ' ') {
        if (isCurrentChar) {
          ctx.fillStyle = 'rgba(250, 204, 21, 0.5)';
          ctx.fillRect(currentX, wordCenterY - 10, Math.max(6, charWidth + 2), 20);
        }
      } else {
        ctx.fillText(char, currentX, wordCenterY);
      }

      // Underline active char
      if (isCurrentChar) {
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(currentX - 1, wordCenterY + fontSize * 0.55 + 2);
        ctx.lineTo(currentX + charWidth + 1, wordCenterY + fontSize * 0.55 + 2);
        ctx.stroke();
      }

      currentX += charWidth + letterSpacing;
    }

    // Vietnamese Meaning Subtext (Auto-fitted, bold & clear)
    let meaningFontSize = isSentence ? 14 : 16;
    ctx.font = `bold ${meaningFontSize}px Fredoka, system-ui, sans-serif`;
    while (ctx.measureText(enemy.meaningVi).width > maxTextWidth && meaningFontSize > 11) {
      meaningFontSize -= 0.5;
      ctx.font = `bold ${meaningFontSize}px Fredoka, system-ui, sans-serif`;
    }

    ctx.fillStyle = '#bae6fd';
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
    ctx.fillText(enemy.meaningVi, letterStartX, y + (isSentence ? 60 : 58));

    ctx.restore();
  };

  return (
    <div
      onClick={focusInput}
      onTouchStart={focusInput}
      onTouchEnd={focusInput}
      className="relative w-full h-full overflow-hidden bg-space-dark select-none touch-none"
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
        enterKeyHint="go"
        tabIndex={0}
        aria-label="Nhập từ vựng"
        onChange={handleHiddenInputChange}
        onInput={handleHiddenInput}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        className="fixed opacity-0 pointer-events-auto"
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '24px',
          opacity: 0.01,
          zIndex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          caretColor: 'transparent',
          color: 'transparent'
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full block cursor-default" />

      {/* Floating helper button when keyboard focus is lost on mobile touch devices */}
      {gameState === 'PLAYING' && isTouchDevice && !isInputFocused && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            focusInput();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            focusInput();
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2 bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 font-game font-extrabold text-xs sm:text-sm rounded-full shadow-[0_0_20px_rgba(0,240,255,0.6)] border-2 border-white flex items-center gap-2 animate-bounce cursor-pointer active:scale-95"
        >
          <span>⌨️ Chạm vào đây để mở bàn phím</span>
        </button>
      )}
    </div>
  );
};

export default GameCanvas;

