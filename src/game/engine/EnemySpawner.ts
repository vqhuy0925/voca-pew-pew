import { VocabWord, EnemyItem } from '../../data/types';

export class EnemySpawner {
  private wordsQueue: VocabWord[] = [];
  private enemies: EnemyItem[] = [];
  private spawnTimer: number = 0;
  private spawnInterval: number = 2200; // ms between spawns
  private baseSpeed: number = 0.6;      // Gentle fall speed for 7-year-olds
  private canvasWidth: number = 800;
  private canvasHeight: number = 600;

  constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  public setDimensions(w: number, h: number) {
    this.canvasWidth = w;
    this.canvasHeight = h;
  }

  public loadWords(words: VocabWord[]) {
    // Shuffle words for varied gameplay
    this.wordsQueue = [...words].sort(() => Math.random() - 0.5);
    this.enemies = [];
    this.spawnTimer = 1000; // Spawn first enemy quickly
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

  public update(deltaTime: number): EnemyItem[] {
    this.spawnTimer -= deltaTime;

    // Spawn new word if queue has words and screen isn't overloaded (max 3-4 active words)
    if (this.spawnTimer <= 0 && this.wordsQueue.length > 0 && this.enemies.length < 3) {
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

    const colors = ['#00f0ff', '#39ff14', '#ffe600', '#ff007f', '#a388ee'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    // Calculate approximate width based on word length
    const estimatedWidth = Math.max(120, vocab.word.length * 28 + 60);
    const minX = 40;
    const maxX = Math.max(minX + 20, this.canvasWidth - estimatedWidth - 40);

    // Try finding an X position that doesn't closely overlap top enemies
    let bestX = minX + Math.random() * (maxX - minX);
    const topEnemies = this.enemies.filter(e => e.y < 150);
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
      id: `${vocab.id}-${Date.now()}`,
      word: vocab.word.toLowerCase(),
      meaningVi: vocab.meaningVi,
      emoji: vocab.emoji,
      typedIndex: 0,
      x: bestX,
      y: -40,
      speed: this.baseSpeed + Math.random() * 0.25,
      width: estimatedWidth,
      height: 54,
      color: chosenColor,
      isTargeted: false,
      shakeTime: 0
    };

    this.enemies.push(enemy);
  }

  public clear() {
    this.wordsQueue = [];
    this.enemies = [];
  }
}
