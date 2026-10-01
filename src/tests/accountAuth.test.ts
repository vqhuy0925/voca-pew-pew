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
  migrateLegacyProgress,
  logoutAccount,
  getActiveAccountSession,
  hasLegacyUnregisteredProgress,
  LOCAL_ACCOUNTS_KEY,
  ACTIVE_SESSION_KEY
} from '../services/accountService';
import { getInitialUserProgress, saveUserProgress, loadUserProgress } from '../services/progressStorage';

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
});
