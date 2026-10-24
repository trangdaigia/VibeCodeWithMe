import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  MASTER_ADMIN_EMAIL,
  ALL_GATED_TABS,
  isMasterAdminEmail,
  resolveAccountRoleType,
  canUserAccessTab,
  getUnlockedGatedTabs,
  encodePermissionsIntoAchievementIds,
  decodePermissionsFromUserDoc,
  grantFullAccessToUser,
  revokeUserToRoadmapOnly,
  toggleUserModulePermission,
  submitUserAccessRequest,
  validatePublicRegistration,
  AccessControlledUser,
} from './accessControlLogic';

describe('accessControlLogic - Strict Master Admin & Granular User Tab Gating', () => {
  it('identifies ONLY daigia170904@gmail.com as Master Admin', () => {
    assert.equal(isMasterAdminEmail('daigia170904@gmail.com'), true);
    assert.equal(isMasterAdminEmail('  DAIGIA170904@GMAIL.COM '), true);
    assert.equal(isMasterAdminEmail('other.admin@gmail.com'), false);
    assert.equal(isMasterAdminEmail('hoangnam.nguyen@gmail.com'), false);
    assert.equal(isMasterAdminEmail(null), false);
    assert.equal(resolveAccountRoleType('daigia170904@gmail.com'), 'admin');
    assert.equal(resolveAccountRoleType('anyone@gmail.com'), 'user');
  });

  it('allows unapproved users and guests ONLY on the roadmap (path) tab by default', () => {
    const unapprovedUser = {
      email: 'newlearner@gmail.com',
      accessApproved: false,
      allowedTabs: ['path'],
    };

    assert.equal(canUserAccessTab(null, 'path'), true);
    assert.equal(canUserAccessTab(unapprovedUser, 'path'), true);

    for (const tab of ALL_GATED_TABS) {
      assert.equal(canUserAccessTab(null, tab), false, `Guest must not access ${tab}`);
      assert.equal(
        canUserAccessTab(unapprovedUser, tab),
        false,
        `Unapproved user must not access ${tab}`
      );
    }

    assert.equal(canUserAccessTab(unapprovedUser, 'admin'), false);
  });

  it('allows Master Admin (daigia170904@gmail.com) unrestricted access to all tabs including admin', () => {
    const adminUser = {
      email: MASTER_ADMIN_EMAIL,
      accessApproved: false,
      allowedTabs: [],
    };

    assert.equal(canUserAccessTab(adminUser, 'path'), true);
    assert.equal(canUserAccessTab(adminUser, 'admin'), true);
    for (const tab of ALL_GATED_TABS) {
      assert.equal(canUserAccessTab(adminUser, tab), true);
    }
  });

  it('supports granular per-tab permissions and full access approval for standard users', () => {
    const baseUser: AccessControlledUser = {
      uid: 'u_test_1',
      email: 'student1@gmail.com',
      displayName: 'Học viên 1',
      role: 'student',
      accessApproved: false,
      allowedTabs: ['path'],
      unlockedAchievementIds: ['first-lesson'],
    };

    // Toggle only 'video' and 'academic'
    const withVideo = toggleUserModulePermission(baseUser, 'video');
    const withVideoAndExam = toggleUserModulePermission(withVideo, 'academic');

    assert.equal(canUserAccessTab(withVideoAndExam, 'path'), true);
    assert.equal(canUserAccessTab(withVideoAndExam, 'video'), true);
    assert.equal(canUserAccessTab(withVideoAndExam, 'academic'), true);
    assert.equal(canUserAccessTab(withVideoAndExam, 'studio'), false);
    assert.equal(canUserAccessTab(withVideoAndExam, 'admin'), false);

    // Grant full access
    const fullApproved = grantFullAccessToUser(withVideoAndExam);
    assert.equal(fullApproved.accessApproved, true);
    for (const tab of ALL_GATED_TABS) {
      assert.equal(canUserAccessTab(fullApproved, tab), true);
    }
    assert.equal(canUserAccessTab(fullApproved, 'admin'), false);

    // Revoke back to roadmap-only
    const revoked = revokeUserToRoadmapOnly(fullApproved);
    assert.equal(revoked.accessApproved, false);
    assert.equal(canUserAccessTab(revoked, 'path'), true);
    assert.equal(canUserAccessTab(revoked, 'video'), false);
    assert.equal(getUnlockedGatedTabs(revoked).length, 0);
  });

  it('losslessly encodes and decodes permissions via unlockedAchievementIds for Firestore sync', () => {
    const encoded = encodePermissionsIntoAchievementIds(
      ['first-lesson', 'streak-3'],
      false,
      ['path', 'video', 'vault'],
      'pending'
    );

    const decoded = decodePermissionsFromUserDoc({
      email: 'learner@gmail.com',
      unlockedAchievementIds: encoded,
    });

    assert.equal(decoded.accessApproved, false);
    assert.deepEqual(decoded.allowedTabs, ['path', 'video', 'vault']);
    assert.equal(decoded.accessRequestStatus, 'pending');
    assert.deepEqual(decoded.cleanAchievementIds, ['first-lesson', 'streak-3']);
  });

  it('handles user access request submission and registration validation accurately', () => {
    const user: AccessControlledUser = {
      uid: 'u_req',
      email: 'applicant@gmail.com',
      displayName: 'Nguyễn Minh',
      role: 'student',
    };

    const requested = submitUserAccessRequest(user, ['video', 'academic'], 'Em cần ôn thi IELTS');
    assert.equal(requested.accessRequestStatus, 'pending');
    assert.deepEqual(requested.requestedTabs, ['video', 'academic']);
    assert.equal(requested.accessRequestNote, 'Em cần ôn thi IELTS');

    assert.equal(
      validatePublicRegistration({
        displayName: 'Nguyễn Minh',
        email: MASTER_ADMIN_EMAIL,
        password: 'password123',
        confirmPassword: 'password123',
      }).valid,
      false
    );

    assert.equal(
      validatePublicRegistration({
        displayName: 'Nguyễn Minh',
        email: 'nguyenminh@gmail.com',
        password: 'password123',
        confirmPassword: 'password123',
      }).valid,
      true
    );
  });
});
