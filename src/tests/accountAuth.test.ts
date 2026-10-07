import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Polyfill localStorage for Node environment
const store: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  key: (index: number) => Object.keys(store)[index] || null,
  length: 0
};

import {
  normalizeUsername,
  validateUsername,
  validatePin,
  hashPin,
  generateSalt,
  registerAccount,
  loginAccount,
  recoverProgressByPlayerTag,
  isPlayerTagClaimedByOther,
  migrateLegacyProgress,
  logoutAccount,
  getActiveAccountSession,
  hasLegacyUnregisteredProgress,
  LOCAL_ACCOUNTS_KEY,
  ACTIVE_SESSION_KEY
} from '../services/accountService';
import { getInitialUserProgress, saveUserProgress, loadUserProgress } from '../services/progressStorage';
import { resolveSyncUid } from '../services/firebase/cloudSyncService';

describe('Player Account & PIN Authentication System', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('normalizeUsername', () => {
    it('normalizes uppercase, spaces, and Vietnamese diacritics', () => {
      assert.equal(normalizeUsername('  Bé Nhím  '), 'benhim');
      assert.equal(normalizeUsername('PHIHÀNHGIA_01'), 'phihanhgia_01');
      assert.equal(normalizeUsername('Đoàn Phương'), 'doanphuong');
      assert.equal(normalizeUsername('Astronaut 2026!'), 'astronaut2026');
    });
  });

  describe('validateUsername', () => {
    it('rejects empty or whitespace-only usernames', () => {
      const res = validateUsername('   ');
      assert.equal(res.valid, false);
      assert.match(res.error || '', /Tên đăng nhập/);
    });

    it('rejects usernames under 3 characters', () => {
      const res = validateUsername('ab');
      assert.equal(res.valid, false);
      assert.match(res.error || '', /ít nhất 3 ký tự/);
    });

    it('rejects usernames over 20 characters', () => {
      const res = validateUsername('this_username_is_way_too_long_for_a_kid');
      assert.equal(res.valid, false);
      assert.match(res.error || '', /quá 20 ký tự/);
    });

    it('accepts valid usernames', () => {
      assert.equal(validateUsername('nhimcon').valid, true);
      assert.equal(validateUsername('phi_hanh_gia').valid, true);
      assert.equal(validateUsername('huy123').valid, true);
    });
  });

  describe('validatePin', () => {
    it('rejects empty or invalid pin length', () => {
      assert.equal(validatePin('').valid, false);
      assert.equal(validatePin('12').valid, false);
      assert.equal(validatePin('12345').valid, false);
      assert.equal(validatePin('abcd').valid, false);
    });

    it('accepts valid 4-digit PINs', () => {
      assert.equal(validatePin('1234').valid, true);
      assert.equal(validatePin('0000').valid, true);
      assert.equal(validatePin('9999').valid, true);
    });
  });

  describe('hashPin & Salt', () => {
    it('generates consistent hash for identical pin and salt', async () => {
      const salt = generateSalt();
      const hash1 = await hashPin('1234', salt);
      const hash2 = await hashPin('1234', salt);
      assert.equal(hash1, hash2);
      assert.ok(hash1.length >= 16);
    });

    it('generates different hashes for different PINs', async () => {
      const salt = generateSalt();
      const hash1 = await hashPin('1234', salt);
      const hash2 = await hashPin('4321', salt);
      assert.notEqual(hash1, hash2);
    });

    it('generates different hashes for different salts', async () => {
      const hash1 = await hashPin('1234', 'salt_alpha');
      const hash2 = await hashPin('1234', 'salt_beta');
      assert.notEqual(hash1, hash2);
    });
  });

  describe('Registration & Login Lifecycle', () => {
    it('registers a new account and creates active session', async () => {
      const res = await registerAccount({
        username: 'nhimcon',
        pin: '1234',
        displayName: 'Bé Nhím'
      });

      assert.equal(res.success, true);
      assert.ok(res.session);
      assert.equal(res.session?.username, 'nhimcon');
      assert.equal(res.session?.displayName, 'Bé Nhím');

      // Check active session stored
      const session = getActiveAccountSession();
      assert.equal(session?.username, 'nhimcon');

      // Check progress saved with account info
      const progress = loadUserProgress();
      assert.equal(progress.accountUsername, 'nhimcon');
      assert.equal(progress.isRegisteredAccount, true);
    });

    it('prevents registering duplicate usernames', async () => {
      await registerAccount({
        username: 'huy123',
        pin: '1234'
      });

      const duplicate = await registerAccount({
        username: 'Huy123', // case insensitive check
        pin: '5678'
      });

      assert.equal(duplicate.success, false);
      assert.match(duplicate.error || '', /đã được sử dụng/);
    });

    it('logs in successfully with correct username and PIN', async () => {
      await registerAccount({
        username: 'astroranger',
        pin: '2026',
        displayName: 'Chiến Binh Sao'
      });

      logoutAccount();
      assert.equal(getActiveAccountSession(), null);

      const loginRes = await loginAccount('astroranger', '2026');
      assert.equal(loginRes.success, true);
      assert.equal(loginRes.session?.username, 'astroranger');
      assert.equal(loginRes.session?.displayName, 'Chiến Binh Sao');

      const activeSession = getActiveAccountSession();
      assert.equal(activeSession?.username, 'astroranger');
    });

    it('rejects login with wrong PIN', async () => {
      await registerAccount({
        username: 'astroranger',
        pin: '2026'
      });

      const wrongPinRes = await loginAccount('astroranger', '9999');
      assert.equal(wrongPinRes.success, false);
      assert.match(wrongPinRes.error || '', /không chính xác/);
    });

    it('rejects login with non-existent username', async () => {
      const noUserRes = await loginAccount('unknown_user', '1234');
      assert.equal(noUserRes.success, false);
      assert.match(noUserRes.error || '', /không tồn tại/);
    });
  });

  describe('Legacy Progress Migration', () => {
    it('migrates existing local game progress without losing data', async () => {
      // Simulate existing player who played without account
      const legacy = getInitialUserProgress();
      legacy.userName = 'Bé Bắp';
      legacy.gems = 85;
      legacy.totalXp = 450;
      legacy.unlockedUpgradeIds = ['ship-scout', 'blaster-single', 'laser-cyan', 'ship-interceptor'];
      legacy.equippedShipId = 'ship-interceptor';
      legacy.isRegisteredAccount = false;
      legacy.accountUsername = undefined;

      // Migrate
      const res = await migrateLegacyProgress('bebap', '8888', legacy);
      assert.equal(res.success, true);

      // Verify all progress is retained
      const saved = loadUserProgress();
      assert.equal(saved.gems, 85);
      assert.equal(saved.totalXp, 450);
      assert.equal(saved.equippedShipId, 'ship-interceptor');
      assert.equal(saved.accountUsername, 'bebap');
      assert.equal(saved.isRegisteredAccount, true);
    });

    it('detects legacy unregistered progress correctly', () => {
      const brandNew = getInitialUserProgress();
      brandNew.userName = '';
      brandNew.gems = 15;
      brandNew.totalXp = 0;
      brandNew.isRegisteredAccount = false;
      brandNew.accountUsername = undefined;

      // Brand new user with 0 stats -> no legacy progress to migrate
      assert.equal(hasLegacyUnregisteredProgress(brandNew), false);

      // User with gameplay achievements -> needs migration
      const existingUser = {
        ...brandNew,
        userName: 'Bé Na',
        gems: 30,
        totalXp: 120
      };
      assert.equal(hasLegacyUnregisteredProgress(existingUser), true);

      // Already registered user -> does NOT need migration
      const registeredUser = {
        ...existingUser,
        accountUsername: 'bena',
        isRegisteredAccount: true
      };
      assert.equal(hasLegacyUnregisteredProgress(registeredUser), false);
    });
  });

  describe('Cross-Browser Login & UID Protection', () => {
    it('resolveSyncUid prioritizes account session UID and never uses anonymous browser UID for logged-in users', async () => {
      // 1. User registers account on Browser 1
      const progress = getInitialUserProgress();
      progress.gems = 500;
      progress.totalXp = 3000;
      const regRes = await registerAccount({
        username: 'cosmicpilot',
        pin: '2026',
        displayName: 'Cosmic Pilot',
        currentProgress: progress
      });
      assert.equal(regRes.success, true);
      const originalUid = regRes.session?.uid;
      assert.ok(originalUid);

      // Verify resolveSyncUid picks the account UID
      const activeSessionUid = resolveSyncUid(regRes.progress!);
      assert.equal(activeSessionUid, originalUid);

      // 2. Simulate opening Browser 2:
      // Browser 2 local UID is different (e.g. anonymous or new local UID)
      const browser2LocalProgress = getInitialUserProgress();
      browser2LocalProgress.cloudUid = 'local_browser2_random_uid';
      browser2LocalProgress.playerTag = '#PEW-RAND';

      // 3. User logs in on Browser 2
      const loginRes = await loginAccount('cosmicpilot', '2026');
      assert.equal(loginRes.success, true);
      assert.equal(loginRes.session?.uid, originalUid);

      // Verify Browser 2's sync UID points to original account UID, NOT Browser 2's random local/anonymous UID!
      const syncUidOnBrowser2 = resolveSyncUid(loginRes.progress!);
      assert.equal(syncUidOnBrowser2, originalUid);
      assert.notEqual(syncUidOnBrowser2, 'local_browser2_random_uid');
    });

    it('login merges achievements non-destructively without resetting to 0', async () => {
      // User with 702 stars and 1500 gems
      const richProgress = getInitialUserProgress();
      richProgress.gems = 1529;
      richProgress.totalXp = 19748;
      richProgress.userName = 'viet nam';
      richProgress.unlockedUpgradeIds = ['ship-scout', 'blaster-single', 'laser-cyan', 'ship-dragon'];

      await registerAccount({
        username: 'vuhuyhoang_test',
        pin: '1234',
        displayName: 'vuhuyhoang',
        currentProgress: richProgress
      });

      // Now simulate a fresh browser session (e.g. Browser B) where progress is 0
      localStorage.removeItem('vocab_pew_pew_user_progress_v2');
      const emptyLocal = getInitialUserProgress();
      saveUserProgress(emptyLocal);

      // User logs in on Browser B
      const loginRes = await loginAccount('vuhuyhoang_test', '1234');
      assert.equal(loginRes.success, true);

      // Verify achievements were restored from account cache and NOT wiped out by 0
      assert.equal(loginRes.progress?.gems, 1529);
      assert.equal(loginRes.progress?.totalXp, 19748);
      assert.ok(loginRes.progress?.unlockedUpgradeIds.includes('ship-dragon'));
    });
  });

  describe('Anti-Hijacking & PlayerTag Ownership Lock', () => {
    it('isPlayerTagClaimedByOther detects tags registered by other users', async () => {
      const p1 = getInitialUserProgress();
      p1.playerTag = '#PEW-ALICE';

      await registerAccount({
        username: 'alice_pilot',
        pin: '1111',
        displayName: 'Alice',
        currentProgress: p1
      });

      // Checking from Bob's perspective: tag is claimed!
      const isClaimedByOther = await isPlayerTagClaimedByOther('#PEW-ALICE', 'bob_pilot');
      assert.equal(isClaimedByOther, true);

      // Checking from Alice's own perspective: tag is hers, not claimed by other!
      const isClaimedByAlice = await isPlayerTagClaimedByOther('#PEW-ALICE', 'alice_pilot');
      assert.equal(isClaimedByAlice, false);

      // Checking an unclaimed random tag
      const isUnclaimed = await isPlayerTagClaimedByOther('#PEW-FREE9', 'bob_pilot');
      assert.equal(isUnclaimed, false);
    });

    it('registerAccount rejects playerTagToLink if the tag is already claimed by another user', async () => {
      const p1 = getInitialUserProgress();
      p1.playerTag = '#PEW-ROYAL';

      await registerAccount({
        username: 'royal_king',
        pin: '9999',
        displayName: 'King',
        currentProgress: p1
      });

      // Hacker tries to register and steal #PEW-ROYAL
      const hackRes = await registerAccount({
        username: 'sneaky_hacker',
        pin: '0000',
        playerTagToLink: '#PEW-ROYAL'
      });

      assert.equal(hackRes.success, false);
      assert.match(hackRes.error || '', /đã được liên kết với một tài khoản chính thức khác/);
    });

    it('registerAccount automatically generates a new tag when shared device already has another account tag', async () => {
      const p1 = getInitialUserProgress();
      p1.playerTag = '#PEW-SHARED';

      await registerAccount({
        username: 'student_one',
        pin: '1234',
        displayName: 'Student One',
        currentProgress: p1
      });

      // Student Two sits at the same computer where progress.playerTag is still #PEW-SHARED
      const p2 = getInitialUserProgress();
      p2.playerTag = '#PEW-SHARED';

      const resTwo = await registerAccount({
        username: 'student_two',
        pin: '5678',
        displayName: 'Student Two',
        currentProgress: p2
      });

      assert.equal(resTwo.success, true);
      // Student Two must NOT inherit #PEW-SHARED
      assert.notEqual(resTwo.session?.playerTag, '#PEW-SHARED');
      assert.match(resTwo.session?.playerTag || '', /^#PEW-/);
    });

    it('recoverProgressByPlayerTag rejects recovery if target tag belongs to another user', async () => {
      const p1 = getInitialUserProgress();
      p1.playerTag = '#PEW-SECURE';

      await registerAccount({
        username: 'secure_owner',
        pin: '4321',
        displayName: 'Owner',
        currentProgress: p1
      });

      // Another user registers legitimately
      await registerAccount({
        username: 'other_user',
        pin: '8888',
        displayName: 'Other'
      });

      // Other user tries to recover secure_owner's tag
      const recRes = await recoverProgressByPlayerTag('other_user', '#PEW-SECURE');
      assert.equal(recRes.success, false);
      assert.match(recRes.message, /đã được liên kết với một tài khoản chính thức khác/);
    });
  });
});

