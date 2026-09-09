import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebaseConfig';

const LOCAL_UID_KEY = 'vocab_pew_pew_local_uid_v1';
const PLAYER_TAG_KEY = 'vocab_pew_pew_player_tag_v1';

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
 * Zero friction for kids (no passwords or emails required).
 */
export const initAuthSession = async (): Promise<string> => {
  const activeAuth = auth;
  if (!isFirebaseConfigured || !activeAuth) {
    return getOrInitLocalUid();
  }

  return new Promise((resolve) => {
    onAuthStateChanged(activeAuth, async (user) => {
      if (user) {
        currentUser = user;
        authInitialized = true;
        resolve(user.uid);
      } else {
        try {
          const cred = await signInAnonymously(activeAuth);
          currentUser = cred.user;
          authInitialized = true;
          resolve(cred.user.uid);
        } catch (err) {
          console.warn('[Auth] Anonymous sign-in failed, using local UID:', err);
          authInitialized = true;
          resolve(getOrInitLocalUid());
        }
      }
    });
  });
};

export const getCurrentUser = (): User | null => currentUser;

export const getCurrentUid = (): string => {
  if (currentUser) return currentUser.uid;
  return getOrInitLocalUid();
};

export const isOnlineAuth = (): boolean => {
  return Boolean(isFirebaseConfigured && currentUser);
};
