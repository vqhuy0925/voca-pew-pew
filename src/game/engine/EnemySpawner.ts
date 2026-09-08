import { VocabWord, EnemyItem } from '../../data/types';
import { LevelNode } from '../../data/progress-types';

export class EnemySpawner {
  private wordsQueue: VocabWord[] = [];
  private totalLevelWordsCount: number = 0;
  private enemies: EnemyItem[] = [];
  private spawnTimer: number = 0;
  private spawnInterval: number = 2300;
  private baseSpeed: number = 0.6;
  private canvasWidth: number = 800;
  private canvasHeight: number = 600;
  private isBossLevel: boolean = false;

  constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  public setDimensions(w: number, h: number) {
    this.canvasWidth = w;
    this.canvasHeight = h;
  }

  public loadLevel(level: LevelNode) {
    this.isBossLevel = level.type === 'BOSS_BATTLE';
    this.spawnInterval = level.spawnInterval || 2200;
    this.baseSpeed = (level.speedMultiplier || 0.6) * 1.0;

    // Duplicate words slightly if word list is short (to provide 6-8 enemies per standard level)
    let words = [...level.words];
    if (words.length > 0 && words.length < 6) {
      words = [...words, ...words].slice(0, 7);
    }

    // Shuffle words
    this.wordsQueue = words.sort(() => Math.random() - 0.5);
    this.totalLevelWordsCount = this.wordsQueue.length;
    this.enemies = [];
    this.spawnTimer = 800; // Spawn first enemy quickly
  }

  public getEnemies(): EnemyItem[] {
    return this.enemies;
  }

  public removeEnemy(id: string) {
    this.enemies = this.enemies.filter(e => e.id !== id);
  }

  public getRemainingWordsCount(): number {
    return this.wordsQueue.length + this.enemies.length;
  }

  public getTotalWordsCount(): number {
    return this.totalLevelWordsCount;
  }

  public update(deltaTime: number): EnemyItem[] {
    this.spawnTimer -= deltaTime;

    // Max 2-3 active enemies at a time for child-friendly focus
    const maxActive = this.isBossLevel ? 3 : 2;

    if (this.spawnTimer <= 0 && this.wordsQueue.length > 0 && this.enemies.length < maxActive) {
      this.spawnWord();
      this.spawnTimer = this.spawnInterval;
    }

    // Update positions and shake effects
    for (const enemy of this.enemies) {
      enemy.y += enemy.speed;
      if (enemy.shakeTime > 0) {
        enemy.shakeTime -= deltaTime;
      }
    }

    return this.enemies;
  }

  private spawnWord() {
    const vocab = this.wordsQueue.shift();
    if (!vocab) return;

    const colors = ['#38bdf8', '#4ade80', '#facc15', '#f472b6', '#c084fc', '#fb923c'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const estimatedWidth = Math.max(130, vocab.word.length * 28 + 65);
    const minX = 30;
    const maxX = Math.max(minX + 20, this.canvasWidth - estimatedWidth - 30);

    let bestX = minX + Math.random() * (maxX - minX);
    const topEnemies = this.enemies.filter(e => e.y < 160);
    if (topEnemies.length > 0) {
      for (let attempt = 0; attempt < 5; attempt++) {
        const candidateX = minX + Math.random() * (maxX - minX);
        const hasOverlap = topEnemies.some(e => Math.abs(e.x - candidateX) < 140);
        if (!hasOverlap) {
          bestX = candidateX;
          break;
        }
      }
    }

    const enemy: EnemyItem = {
      id: `${vocab.id}-${Date.now()}-${Math.random()}`,
      word: vocab.word.toLowerCase(),
      meaningVi: vocab.meaningVi,
      emoji: vocab.emoji,
      typedIndex: 0,
      x: bestX,
      y: -50,
      speed: this.baseSpeed + Math.random() * 0.15,
      width: estimatedWidth,
      height: 56,
      color: chosenColor,
      isTargeted: false,
      shakeTime: 0
    };

    this.enemies.push(enemy);
  }

  public clear() {
    this.wordsQueue = [];
    this.enemies = [];
    this.totalLevelWordsCount = 0;
  }
}
