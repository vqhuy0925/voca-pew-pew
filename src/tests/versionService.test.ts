import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isNewerVersion, APP_CURRENT_VERSION } from '../services/versionService';

describe('App Versioning & Proactive Update System', () => {
  it('1. isNewerVersion correctly compares semantic version numbers', () => {
    // Newer major, minor, patch
    assert.equal(isNewerVersion('1.1.0', '1.0.0'), true);
    assert.equal(isNewerVersion('2.0.0', '1.9.9'), true);
    assert.equal(isNewerVersion('1.0.1', '1.0.0'), true);
    assert.equal(isNewerVersion('1.10.0', '1.9.0'), true);

    // Prefix 'v' tolerance
    assert.equal(isNewerVersion('v1.1.0', '1.0.0'), true);
    assert.equal(isNewerVersion('v1.1.0', 'v1.0.0'), true);

    // Equal versions
    assert.equal(isNewerVersion('1.0.0', '1.0.0'), false);
    assert.equal(isNewerVersion('1.1.0', '1.1.0'), false);

    // Older versions
    assert.equal(isNewerVersion('1.0.0', '1.1.0'), false);
    assert.equal(isNewerVersion('0.9.0', '1.0.0'), false);

    // Invalid or empty strings
    assert.equal(isNewerVersion('', '1.0.0'), false);
    assert.equal(isNewerVersion('1.0.0', ''), false);
  });

  it('2. APP_CURRENT_VERSION is valid semver string', () => {
    assert.ok(APP_CURRENT_VERSION);
    assert.ok(/^\d+\.\d+\.\d+/.test(APP_CURRENT_VERSION), `APP_CURRENT_VERSION (${APP_CURRENT_VERSION}) should match semver`);
    assert.equal(APP_CURRENT_VERSION, '1.1.0');
  });
});
