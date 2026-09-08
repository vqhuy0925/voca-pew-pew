import { EnemyItem } from '../../data/types';
import { soundFx } from './SoundController';

export interface BreachResult {
  breachedEnemies: EnemyItem[];
  damageTaken: number;
}

export class CollisionEngine {
  private defenseLineY: number = 520;

  public setDefenseLineY(y: number) {
    this.defenseLineY = y;
  }

  public checkDefenseBreach(enemies: EnemyItem[]): BreachResult {
    const breachedEnemies: EnemyItem[] = [];
    let damageTaken = 0;

    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      if (enemy.y + enemy.height >= this.defenseLineY) {
        breachedEnemies.push(enemy);
        damageTaken += 20; // 20 damage per breach
        soundFx.playExplosion();
      }
    }

    return {
      breachedEnemies,
      damageTaken
    };
  }
}
