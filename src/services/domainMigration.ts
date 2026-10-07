// Cross-domain progress migration bridge between legacy Vercel domain and custom domain (vocabpewpew.com)
// Uses Compact Payload encoding so that progress can travel seamlessly via URL query parameter without URI Too Long limits!

import { ALL_LEVELS } from '../data/learning-path-data';

export const TARGET_DOMAIN = 'www.vocabpewpew.com';
export const MIGRATION_PARAM = 'migrate_sync';

export interface CompactPayload {
  v: number;               // Version
  u?: string;              // userName
  a?: string;              // avatar
  g?: number;              // gems
  x?: number;              // totalXp
  s?: number;              // streakDays
  c?: string;              // currentLevelId
  p?: string;              // playerTag
  uid?: string;            // cloudUid
  eq?: [string, string, string]; // [ship, blaster, laser]
  up?: string[];           // unlockedUpgradeIds
  // Completed levels: levelId -> [stars, highScore]
  lvl?: Record<string, [number, number]>;
  // Typing lessons: lessonId -> [wpm, accuracy]
  tp?: Record<string, [number, number]>;
}

/**
 * Compact full 80KB progress into a tiny ~1KB payload that easily fits in URLs
 */
export function compressUserProgress(rawJson: string): string | null {
  try {
    const full = JSON.parse(rawJson);
    if (!full || typeof full !== 'object') return null;

    const completedLevels: Record<string, [number, number]> = {};
    if (full.levelProgressMap && typeof full.levelProgressMap === 'object') {
      for (const [id, lp] of Object.entries(full.levelProgressMap)) {
        const item = lp as { isCompleted?: boolean; stars?: number; highScore?: number };
        if (item && (item.isCompleted || (item.stars && item.stars > 0))) {
          completedLevels[id] = [item.stars || 0, item.highScore || 0];
        }
      }
    }

    const typingCompleted: Record<string, [number, number]> = {};
    if (full.typingProgress?.completedLessonIds && Array.isArray(full.typingProgress.completedLessonIds)) {
      for (const lid of full.typingProgress.completedLessonIds) {
        const res = full.typingProgress.lessonResults?.[lid];
        typingCompleted[lid] = [res?.wpm || 0, res?.accuracy || 0];
      }
    }

    const compact: CompactPayload = {
      v: 2,
      u: full.userName || undefined,
      a: full.avatar || undefined,
      g: typeof full.gems === 'number' ? full.gems : undefined,
      x: typeof full.totalXp === 'number' ? full.totalXp : undefined,
      s: typeof full.streakDays === 'number' ? full.streakDays : undefined,
      c: full.currentLevelId || undefined,
      p: full.playerTag || undefined,
      uid: full.cloudUid || undefined,
      eq: [full.equippedShipId || 'ship-scout', full.equippedBlasterId || 'blaster-single', full.equippedLaserId || 'laser-cyan'],
      up: Array.isArray(full.unlockedUpgradeIds) ? full.unlockedUpgradeIds : undefined,
      lvl: Object.keys(completedLevels).length > 0 ? completedLevels : undefined,
      tp: Object.keys(typingCompleted).length > 0 ? typingCompleted : undefined
    };

    return btoa(unescape(encodeURIComponent(JSON.stringify(compact))));
  } catch (err) {
    console.error('[DomainMigration] Failed to compress progress:', err);
    return null;
  }
}

/**
 * Decompress compact payload back into full UserProgress format and save to localStorage
 */
export function decompressAndRestoreProgress(compactB64: string): boolean {
  try {
    const jsonStr = decodeURIComponent(escape(atob(compactB64)));
    const compact: CompactPayload = JSON.parse(jsonStr);
    if (!compact || compact.v !== 2) return false;

    // Check existing progress to avoid overwriting higher stats
    const existingRaw = localStorage.getItem('vocab_pew_pew_user_progress_v2');
    const existing = existingRaw ? JSON.parse(existingRaw) : {};

    // Restore level progress map
    const levelMap = existing.levelProgressMap || {};
    if (compact.lvl) {
      for (const [id, [stars, highScore]] of Object.entries(compact.lvl)) {
        levelMap[id] = {
          levelId: id,
          isUnlocked: true,
          isCompleted: true,
          stars: Math.max(stars, levelMap[id]?.stars || 0),
          highScore: Math.max(highScore, levelMap[id]?.highScore || 0)
        };
      }

      // Reconcile sequence: any completed level unlocks the consecutive level
      ALL_LEVELS.forEach((lvl, idx) => {
        if (levelMap[lvl.id]?.isCompleted && idx < ALL_LEVELS.length - 1) {
          const nextLvl = ALL_LEVELS[idx + 1];
          if (!levelMap[nextLvl.id]) {
            levelMap[nextLvl.id] = {
              levelId: nextLvl.id,
              isUnlocked: true,
              isCompleted: false,
              stars: 0,
              highScore: 0
            };
          } else {
            levelMap[nextLvl.id].isUnlocked = true;
          }
        }
      });
    }

    if (compact.c) {
      if (!levelMap[compact.c]) {
        levelMap[compact.c] = {
          levelId: compact.c,
          isUnlocked: true,
          isCompleted: false,
          stars: 0,
          highScore: 0
        };
      } else {
        levelMap[compact.c].isUnlocked = true;
      }
    }

    // Restore typing progress
    const typing = existing.typingProgress || {
      currentLessonId: 'lesson-home-1',
      unlockedLessonIds: ['lesson-home-1'],
      completedLessonIds: [],
      lessonResults: {},
      totalPracticeMinutes: 0
    };

    if (compact.tp) {
      for (const [lid, [wpm, acc]] of Object.entries(compact.tp)) {
        if (!typing.completedLessonIds.includes(lid)) {
          typing.completedLessonIds.push(lid);
        }
        typing.lessonResults[lid] = {
          lessonId: lid,
          wpm,
          accuracy: acc,
          stars: 3,
          completedAt: new Date().toISOString()
        };
      }
    }

    const merged = {
      ...existing,
      userName: compact.u || existing.userName || '',
      avatar: compact.a || existing.avatar || '🚀',
      gems: Math.max(compact.g ?? 0, existing.gems ?? 15),
      totalXp: Math.max(compact.x ?? 0, existing.totalXp ?? 0),
      streakDays: Math.max(compact.s ?? 1, existing.streakDays ?? 1),
      currentLevelId: compact.c || existing.currentLevelId || 'lvl-1-1',
      playerTag: compact.p || existing.playerTag,
      cloudUid: compact.uid || existing.cloudUid,
      equippedShipId: compact.eq?.[0] || existing.equippedShipId || 'ship-scout',
      equippedBlasterId: compact.eq?.[1] || existing.equippedBlasterId || 'blaster-single',
      equippedLaserId: compact.eq?.[2] || existing.equippedLaserId || 'laser-cyan',
      unlockedUpgradeIds: Array.from(new Set([...(compact.up || []), ...(existing.unlockedUpgradeIds || [])])),
      levelProgressMap: levelMap,
      typingProgress: typing
    };

    localStorage.setItem('vocab_pew_pew_user_progress_v2', JSON.stringify(merged));
    if (compact.p) localStorage.setItem('vocab_pew_pew_player_tag_v1', compact.p);
    if (compact.uid) localStorage.setItem('vocab_pew_pew_local_uid_v1', compact.uid);

    console.log('[DomainMigration] Successfully restored progress with gems:', merged.gems);
    return true;
  } catch (err) {
    console.error('[DomainMigration] Failed to decompress progress:', err);
    return false;
  }
}

/**
 * Handle incoming migration parameter on destination domain (vocabpewpew.com)
 */
export function handleIncomingMigration(): boolean {
  if (typeof window === 'undefined') return false;

  const url = new URL(window.location.href);
  const rawPayload = url.searchParams.get(MIGRATION_PARAM);
  if (!rawPayload) return false;

  const success = decompressAndRestoreProgress(rawPayload);

  // Clean URL parameter without page reload
  url.searchParams.delete(MIGRATION_PARAM);
  window.history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);

  return success;
}

/**
 * Check if running on legacy domain (voca-pew-pew.vercel.app).
 * If so, compresses progress into compact URL parameter (< 2KB) and redirects cleanly.
 */
export function checkAndRedirectLegacyDomain(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname.toLowerCase();
  const isLegacyDomain =
    hostname.includes('vercel.app') &&
    !hostname.includes('localhost') &&
    !hostname.includes('vocabpewpew.com');

  if (!isLegacyDomain) {
    return false;
  }

  console.log('[DomainMigration] Detected legacy domain! Compressing progress for URL migration...');

  try {
    const rawProgress = localStorage.getItem('vocab_pew_pew_user_progress_v2') ||
                        localStorage.getItem('vocab_pew_pew_user_progress_v1');

    const targetUrl = new URL(`https://${TARGET_DOMAIN}${window.location.pathname}${window.location.hash}`);

    if (rawProgress) {
      const compactB64 = compressUserProgress(rawProgress);
      if (compactB64) {
        targetUrl.searchParams.set(MIGRATION_PARAM, compactB64);
      }
    }

    console.log('[DomainMigration] Redirecting with compact payload...');
    window.location.replace(targetUrl.toString());
    return true;
  } catch (err) {
    console.error('[DomainMigration] Error in legacy redirect:', err);
    window.location.replace(`https://${TARGET_DOMAIN}${window.location.pathname}${window.location.hash}`);
    return true;
  }
}
