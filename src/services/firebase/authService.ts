import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebaseConfig';

import { isIncognitoSession } from '../incognitoDetector';

const LOCAL_UID_KEY = 'vocab_pew_pew_local_uid_v1';
const PLAYER_TAG_KEY = 'vocab_pew_pew_player_tag_v1';

let incognitoBlocked = false;

export const setIncognitoBlocked = (blocked: boolean): void => {
  incognitoBlocked = blocked;
};

export const isIncognitoBlocked = (): boolean => {
  return incognitoBlocked || isIncognitoSession();
};

/**
 * Generate a friendly, kid-safe astronaut tag: e.g. "#PEW-7429"
 * Excludes ambiguous characters (0, O, 1, I).
 */
export const generatePlayerTag = (): string => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `#PEW-${code}`;
};

/**
 * Get or create local fallback UUID when offline
 */
export const getOrInitLocalUid = (): string => {
  let uid = localStorage.getItem(LOCAL_UID_KEY);
  if (!uid) {
    uid = 'local_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    localStorage.setItem(LOCAL_UID_KEY, uid);
  }
  return uid;
};

/**
 * Get or create persistent playerTag
 */
export const getOrInitPlayerTag = (): string => {
  let tag = localStorage.getItem(PLAYER_TAG_KEY);
  if (!tag) {
    tag = generatePlayerTag();
    localStorage.setItem(PLAYER_TAG_KEY, tag);
  }
  return tag;
};

let currentUser: User | null = null;
let authInitialized = false;

/**
 * Initialize silent anonymous session.
 * - If incognito is detected: skips Firebase completely and returns local fallback UID.
 * - If forceCreate is false: only attaches existing user session (free cache); delays creating new user until needed.
 * - If forceCreate is true: signs in anonymously if not yet signed in.
 */
export const initAuthSession = async (options: { forceCreate?: boolean } = {}): Promise<string> => {
  if (isIncognitoBlocked()) {
    console.info('[Auth] Incognito/Private mode detected. Offline local UID used to protect Firebase.');
    authInitialized = true;
    return getOrInitLocalUid();
  }

  const activeAuth = auth;
  if (!isFirebaseConfigured || !activeAuth) {
    authInitialized = true;
    return getOrInitLocalUid();
  }

  if (currentUser) {
    return currentUser.uid;
  }

  return new Promise((resolve) => {
    let resolved = false;
    const safeResolve = (uid: string) => {
      if (!resolved) {
        resolved = true;
        authInitialized = true;
        resolve(uid);
      }
    };

    // Timeout fallback: resolve to local UID if network takes > 1500ms
    const timer = setTimeout(() => {
      safeResolve(getOrInitLocalUid());
    }, 1500);

    const unsubscribe = onAuthStateChanged(activeAuth, async (user) => {
      clearTimeout(timer);
      unsubscribe();
      if (user) {
        currentUser = user;
        safeResolve(user.uid);
      } else if (options.forceCreate) {
        try {
          const cred = await signInAnonymously(activeAuth);
          currentUser = cred.user;
          safeResolve(cred.user.uid);
        } catch (err) {
          console.warn('[Auth] Anonymous sign-in failed, using local UID:', err);
          safeResolve(getOrInitLocalUid());
        }
      } else {
        // Lazy Auth: do not create ghost user for bounce visitors
        safeResolve(getOrInitLocalUid());
      }
    });
  });
};

/**
 * Ensure active cloud auth session when player performs meaningful action (cleared level / opened leaderboard)
 */
export const ensureCloudAuthSession = async (): Promise<string> => {
  if (isIncognitoBlocked()) {
    return getOrInitLocalUid();
  }
  if (currentUser) {
    return currentUser.uid;
  }
  return initAuthSession({ forceCreate: true });
};

export const getCurrentUser = (): User | null => currentUser;

export const getCurrentUid = (): string => {
  if (currentUser && !isIncognitoBlocked()) return currentUser.uid;
  return getOrInitLocalUid();
};

export const isOnlineAuth = (): boolean => {
  return Boolean(isFirebaseConfigured && currentUser && !isIncognitoBlocked());
};

