import { EnemyItem, VocabWord } from '../../data/types';
import { soundFx } from './SoundController';
import { speechHelper } from './SpeechHelper';

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

  public handleKeyPress(key: string, enemies: EnemyItem[]): InputResult {
    const char = key.toLowerCase();
    // Only accept alphabet letters
    if (!/^[a-z]$/.test(char)) {
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

    // 2. If no target locked, pick the best candidate matching the first letter
    if (!currentTarget) {
      // Find enemies whose first letter matches and sort by highest Y (closest to bottom/ground)
      const matchingEnemies = enemies
        .filter(e => e.word.charAt(0) === char)
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
      const expectedChar = currentTarget.word.charAt(currentTarget.typedIndex);

      if (char === expectedChar) {
        // Correct character typed!
        currentTarget.typedIndex++;
        soundFx.playPew();

        // Calculate laser target position (approximate center of the typed character)
        const charWidth = 24;
        const targetX = currentTarget.x + 40 + (currentTarget.typedIndex - 0.5) * charWidth;
        const targetY = currentTarget.y + 24;

        // Check if word is fully typed
        if (currentTarget.typedIndex >= currentTarget.word.length) {
          soundFx.playExplosion();
          speechHelper.speak(currentTarget.word);
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
