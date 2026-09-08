import { EnemyItem, VocabWord } from '../../data/types';
import { soundFx } from './SoundController';

export interface InputResult {
  hitLetter: boolean;
  defeatedEnemy: EnemyItem | null;
  targetEnemy: EnemyItem | null;
  laserTargetPos: { x: number; y: number } | null;
  isWrong: boolean;
}

export class InputHandler {
  private targetEnemyId: string | null = null;

  public getTargetId(): string | null {
    return this.targetEnemyId;
  }

  public setTargetId(id: string | null) {
    this.targetEnemyId = id;
  }

  private isIgnorablePunctuation(c: string): boolean {
    return c === '\'' || c === ',' || c === '.' || c === '?' || c === '!' || c === '-' || c === '"' || c === ':';
  }

  public handleKeyPress(key: string, enemies: EnemyItem[]): InputResult {
    let char = key.toLowerCase();
    if (key === ' ' || key === 'Space' || key === 'Spacebar') {
      char = ' ';
    }

    // Only accept alphabet letters, numbers, spaces, and common sentence chars
    if (!/^[a-z0-9 '\-.,?!]$/.test(char)) {
      return {
        hitLetter: false,
        defeatedEnemy: null,
        targetEnemy: null,
        laserTargetPos: null,
        isWrong: false
      };
    }

    let currentTarget: EnemyItem | undefined;

    // 1. If we already have a locked target, verify it still exists
    if (this.targetEnemyId) {
      currentTarget = enemies.find(e => e.id === this.targetEnemyId);
      if (!currentTarget) {
        this.targetEnemyId = null;
      }
    }

    // 2. If no target locked, pick the best candidate matching the first letter (or first non-space char)
    if (!currentTarget) {
      const matchingEnemies = enemies
        .filter(e => {
          const firstChar = e.word.trim().charAt(0).toLowerCase();
          return firstChar === char;
        })
        .sort((a, b) => b.y - a.y);

      if (matchingEnemies.length > 0) {
        currentTarget = matchingEnemies[0];
        this.targetEnemyId = currentTarget.id;
      }
    }

    // Update target flags on all enemies
    enemies.forEach(e => {
      e.isTargeted = e.id === this.targetEnemyId;
    });

    // 3. Process key press against the target
    if (currentTarget) {
      const word = currentTarget.word.toLowerCase();
      let currIdx = currentTarget.typedIndex;
      let matched = false;

      // Check direct match
      if (currIdx < word.length && char === word[currIdx]) {
        currIdx++;
        matched = true;
      } else if (currIdx < word.length) {
        // Smart skip: If current char is space or punctuation, and user typed the subsequent character
        let lookaheadIdx = currIdx;
        while (lookaheadIdx < word.length && (word[lookaheadIdx] === ' ' || this.isIgnorablePunctuation(word[lookaheadIdx]))) {
          lookaheadIdx++;
        }
        if (lookaheadIdx < word.length && char === word[lookaheadIdx]) {
          currIdx = lookaheadIdx + 1;
          matched = true;
        }
      }

      // Auto-advance past any trailing punctuation at the end of the sentence
      while (currIdx < word.length && this.isIgnorablePunctuation(word[currIdx])) {
        // If trailing punctuation like "." or "?" or "!", advance automatically
        if (currIdx === word.length - 1 || word.slice(currIdx).split('').every(c => this.isIgnorablePunctuation(c) || c === ' ')) {
          currIdx = word.length;
          break;
        }
        break;
      }

      if (matched) {
        currentTarget.typedIndex = currIdx;
        soundFx.playPew();

        // Calculate laser target position
        const charScale = word.length > 25 ? 12 : word.length > 15 ? 16 : 22;
        const targetX = currentTarget.x + 58 + Math.min(currentTarget.width - 65, Math.max(10, (currentTarget.typedIndex - 0.5) * charScale));
        const targetY = currentTarget.y + 28;

        // Check if word/sentence is fully typed
        if (currentTarget.typedIndex >= word.length) {
          soundFx.playExplosion();
          this.targetEnemyId = null;

          return {
            hitLetter: true,
            defeatedEnemy: currentTarget,
            targetEnemy: currentTarget,
            laserTargetPos: { x: targetX, y: targetY },
            isWrong: false
          };
        }

        return {
          hitLetter: true,
          defeatedEnemy: null,
          targetEnemy: currentTarget,
          laserTargetPos: { x: targetX, y: targetY },
          isWrong: false
        };
      } else {
        // Wrong letter typed
        soundFx.playWrong();
        currentTarget.shakeTime = 200; // Shake effect
        return {
          hitLetter: false,
          defeatedEnemy: null,
          targetEnemy: currentTarget,
          laserTargetPos: null,
          isWrong: true
        };
      }
    } else {
      // Pressed a key with no matching enemy on screen
      soundFx.playWrong();
      return {
        hitLetter: false,
        defeatedEnemy: null,
        targetEnemy: null,
        laserTargetPos: null,
        isWrong: true
      };
    }
  }

  public reset() {
    this.targetEnemyId = null;
  }
}
