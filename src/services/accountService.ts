import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase/firebaseConfig';
import { UserProgress } from '../data/progress-types';
import { getOrInitPlayerTag, getCurrentUid } from './firebase/authService';
import { loadUserProgress, saveUserProgress, getInitialUserProgress } from './progressStorage';

export const ACTIVE_SESSION_KEY = 'vocab_pew_pew_active_session_v1';
export const LOCAL_ACCOUNTS_KEY = 'vocab_pew_pew_local_accounts_v1';

export interface PlayerAccount {
  username: string;          // Normalized lowercase (e.g. 'nhimcon')
  displayName: string;       // User-facing name (e.g. 'Bé Nhím')
  pinHash: string;           // SHA-256 hash of salt + pin
  pinSalt: string;           // Random salt string
  uid: string;               // Stable unique player ID linked to users/{uid}
  playerTag: string;         // e.g. '#PEW-7429'
  createdAt: string;         // ISO timestamp
  lastLoginAt: string;       // ISO timestamp
}

export interface AccountSession {
  username: string;
  displayName: string;
  uid: string;
  playerTag: string;
  lastActive: number;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  session?: AccountSession;
  progress?: UserProgress;
}

/**
 * Normalize username: lowercase, trimmed, alphanumeric and underscores only
 */
export const normalizeUsername = (raw: string): string => {
  return raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove Vietnamese diacritics
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9_]/g, '');
};

/**
 * Validate username formatting
 */
export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  const normalized = normalizeUsername(username);
  if (!normalized) {
    return { valid: false, error: 'Vui lòng nhập Tên đăng nhập.' };
  }
  if (normalized.length < 3) {
    return { valid: false, error: 'Tên đăng nhập cần ít nhất 3 ký tự.' };
  }
  if (normalized.length > 20) {
    return { valid: false, error: 'Tên đăng nhập không được quá 20 ký tự.' };
  }
  if (!/^[a-z0-9_]+$/.test(normalized)) {
    return { valid: false, error: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới.' };
  }
  return { valid: true };
};

/**
 * Validate 4-digit PIN
 */
export const validatePin = (pin: string): { valid: boolean; error?: string } => {
  const trimmed = pin.trim();
  if (!trimmed) {
    return { valid: false, error: 'Vui lòng nhập Mã PIN 4 số.' };
  }
  if (!/^\d{4}$/.test(trimmed)) {
    return { valid: false, error: 'Mã PIN phải gồm đúng 4 chữ số (0-9).' };
  }
  return { valid: true };
};

/**
 * Generate random cryptographic salt
 */
export const generateSalt = (): string => {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
};

/**
 * Hash PIN using SHA-256 with Salt
 */
export const hashPin = async (pin: string, salt: string): Promise<string> => {
  const text = `${salt}:${pin}:vocab_pew_pew_secure`;
  if (typeof crypto !== 'undefined' && crypto.subtle && crypto.subtle.digest) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback simple 32-bit FNV-like hash for environments without Web Crypto
  let h1 = 0xdeadbeef ^ text.length;
  let h2 = 0x41c64e6d ^ text.length;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
};

/**
 * Local accounts registry for offline-first support
 */
const getLocalAccounts = (): Record<string, PlayerAccount> => {
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveLocalAccounts = (accounts: Record<string, PlayerAccount>): void => {
  try {
    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.warn('[AccountService] Failed to cache local accounts:', err);
  }
};

/**
 * Get active session from localStorage
 */
export const getActiveAccountSession = (): AccountSession | null => {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Set active session into localStorage
 */
export const setActiveAccountSession = (session: AccountSession | null): void => {
  try {
    if (session) {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  } catch (err) {
    console.warn('[AccountService] Failed to write active session:', err);
  }
};

/**
 * Check if username is available
 */
export const checkUsernameAvailable = async (rawUsername: string): Promise<{ available: boolean; error?: string }> => {
  const val = validateUsername(rawUsername);
  if (!val.valid) {
    return { available: false, error: val.error };
  }

  const username = normalizeUsername(rawUsername);

  // Check local offline cache first
  const localAccounts = getLocalAccounts();
  if (localAccounts[username]) {
    return { available: false, error: 'Tên đăng nhập này đã được sử dụng.' };
  }

  // Check Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'player_accounts', username);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { available: false, error: 'Tên đăng nhập này đã được sử dụng.' };
      }
    } catch (err) {
      console.warn('[AccountService] Firestore check failed, trusting local cache:', err);
    }
  }

  return { available: true };
};

/**
 * Register a new player account (Username + 4-digit PIN)
 */
export const registerAccount = async (params: {
  username: string;
  pin: string;
  displayName?: string;
  currentProgress?: UserProgress;
}): Promise<AuthResult> => {
  const usernameVal = validateUsername(params.username);
  if (!usernameVal.valid) {
    return { success: false, error: usernameVal.error };
  }

  const pinVal = validatePin(params.pin);
  if (!pinVal.valid) {
    return { success: false, error: pinVal.error };
  }

  const username = normalizeUsername(params.username);
  const avail = await checkUsernameAvailable(username);
  if (!avail.available) {
    return { success: false, error: avail.error || 'Tên đăng nhập đã tồn tại.' };
  }

  const salt = generateSalt();
  const pinHash = await hashPin(params.pin.trim(), salt);
  const now = new Date().toISOString();

  // Create or preserve existing progress
  const baseProgress = params.currentProgress || loadUserProgress() || getInitialUserProgress();
  const playerTag = baseProgress.playerTag || getOrInitPlayerTag();
  const uid = (baseProgress.cloudUid && !baseProgress.cloudUid.startsWith('local_'))
    ? baseProgress.cloudUid
    : `usr_${username}_${Math.random().toString(36).substring(2, 8)}`;

  const displayName = (params.displayName && params.displayName.trim()) || baseProgress.userName || username;

  const account: PlayerAccount = {
    username,
    displayName,
    pinHash,
    pinSalt: salt,
    uid,
    playerTag,
    createdAt: now,
    lastLoginAt: now
  };

  // 1. Save to local account registry
  const localAccounts = getLocalAccounts();
  localAccounts[username] = account;
  saveLocalAccounts(localAccounts);

  // 2. Prepare updated progress
  const updatedProgress: UserProgress = {
    ...baseProgress,
    userName: displayName,
    accountUsername: username,
    isRegisteredAccount: true,
    cloudUid: uid,
    playerTag
  };

  // Save progress locally
  saveUserProgress(updatedProgress);

  // 3. Save to Cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      const accountDocRef = doc(db, 'player_accounts', username);
      await setDoc(accountDocRef, {
        ...account,
        updatedAt: serverTimestamp()
      });

      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, {
        uid,
        playerTag,
        accountUsername: username,
        userName: displayName,
        avatar: updatedProgress.avatar,
        gender: updatedProgress.gender,
        userAge: updatedProgress.userAge,
        themeStyle: updatedProgress.themeStyle,
        mascotId: updatedProgress.mascotId,
        selectedRealmId: updatedProgress.selectedRealmId,
        currentLevelId: updatedProgress.currentLevelId,
        totalXp: updatedProgress.totalXp,
        weeklyXp: updatedProgress.weeklyXp,
        gems: updatedProgress.gems,
        streakDays: updatedProgress.streakDays,
        equippedShipId: updatedProgress.equippedShipId,
        equippedBlasterId: updatedProgress.equippedBlasterId,
        equippedLaserId: updatedProgress.equippedLaserId,
        unlockedUpgradeIds: updatedProgress.unlockedUpgradeIds,
        activeTitle: updatedProgress.activeTitle,
        unlockedBadgeIds: updatedProgress.unlockedBadgeIds,
        selectedBadgeIds: updatedProgress.selectedBadgeIds,
        levelProgressMap: updatedProgress.levelProgressMap,
        mistakeMap: updatedProgress.mistakeMap || {},
        typingProgress: updatedProgress.typingProgress || null,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('[AccountService] Cloud save failed during registration, local copy safe:', err);
    }
  }

  // 4. Set active session
  const session: AccountSession = {
    username,
    displayName,
    uid,
    playerTag,
    lastActive: Date.now()
  };
  setActiveAccountSession(session);

  return {
    success: true,
    session,
    progress: updatedProgress
  };
};

/**
 * Login player using Username + 4-digit PIN
 */
export const loginAccount = async (rawUsername: string, rawPin: string): Promise<AuthResult> => {
  const usernameVal = validateUsername(rawUsername);
  if (!usernameVal.valid) {
    return { success: false, error: usernameVal.error };
  }

  const pinVal = validatePin(rawPin);
  if (!pinVal.valid) {
    return { success: false, error: pinVal.error };
  }

  const username = normalizeUsername(rawUsername);
  const pin = rawPin.trim();

  let targetAccount: PlayerAccount | null = null;

  // 1. Try fetching from Firestore first if configured
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'player_accounts', username);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        targetAccount = snap.data() as PlayerAccount;
      }
    } catch (err) {
      console.warn('[AccountService] Firestore login fetch failed:', err);
    }
  }

  // 2. Check local accounts if not found in cloud (offline support)
  if (!targetAccount) {
    const localAccounts = getLocalAccounts();
    if (localAccounts[username]) {
      targetAccount = localAccounts[username];
    }
  }

  if (!targetAccount) {
    return {
      success: false,
      error: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại Tên đăng nhập hoặc Đăng ký mới.'
    };
  }

  // 3. Verify PIN Hash
  const computedHash = await hashPin(pin, targetAccount.pinSalt);
  if (computedHash !== targetAccount.pinHash) {
    return {
      success: false,
      error: 'Mã PIN 4 số không chính xác. Vui lòng thử lại!'
    };
  }

  // 4. PIN is correct! Update lastLoginAt
  targetAccount.lastLoginAt = new Date().toISOString();
  const localAccounts = getLocalAccounts();
  localAccounts[username] = targetAccount;
  saveLocalAccounts(localAccounts);

  // 5. Pull full player progress from Firestore
  let restoredProgress: UserProgress | null = null;
  if (isFirebaseConfigured && db) {
    try {
      const userDocRef = doc(db, 'users', targetAccount.uid);
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const cloudData = snap.data() as Partial<UserProgress>;
        const currentLocal = loadUserProgress();
        restoredProgress = {
          ...currentLocal,
          ...cloudData,
          userName: targetAccount.displayName || cloudData.userName || currentLocal.userName,
          accountUsername: username,
          isRegisteredAccount: true,
          cloudUid: targetAccount.uid,
          playerTag: targetAccount.playerTag || currentLocal.playerTag
        } as UserProgress;
      }
    } catch (err) {
      console.warn('[AccountService] Could not pull remote progress, using local cache:', err);
    }
  }

  if (!restoredProgress) {
    const localProgress = loadUserProgress();
    restoredProgress = {
      ...localProgress,
      userName: targetAccount.displayName,
      accountUsername: username,
      isRegisteredAccount: true,
      cloudUid: targetAccount.uid,
      playerTag: targetAccount.playerTag
    };
  }

  // Save to active localStorage progress
  saveUserProgress(restoredProgress);

  // 6. Set active session
  const session: AccountSession = {
    username,
    displayName: targetAccount.displayName,
    uid: targetAccount.uid,
    playerTag: targetAccount.playerTag,
    lastActive: Date.now()
  };
  setActiveAccountSession(session);

  return {
    success: true,
    session,
    progress: restoredProgress
  };
};

/**
 * Migration helper for existing local players who have game progress but no registered username/PIN
 */
export const migrateLegacyProgress = async (
  username: string,
  pin: string,
  currentProgress: UserProgress
): Promise<AuthResult> => {
  return registerAccount({
    username,
    pin,
    displayName: currentProgress.userName || username,
    currentProgress
  });
};

/**
 * Log out active session
 */
export const logoutAccount = (): void => {
  setActiveAccountSession(null);
};

/**
 * Detect whether the current browser has existing gameplay progress that needs migration
 */
export const hasLegacyUnregisteredProgress = (progress: UserProgress): boolean => {
  if (progress.isRegisteredAccount || progress.accountUsername) {
    return false;
  }
  const hasStars = Object.values(progress.levelProgressMap || {}).some(l => (l.stars || 0) > 0 || l.isCompleted);
  const hasGems = (progress.gems || 0) > 15;
  const hasXp = (progress.totalXp || 0) > 0;
  const hasName = Boolean(progress.userName && progress.userName.trim());

  return hasStars || hasGems || hasXp || hasName;
};
