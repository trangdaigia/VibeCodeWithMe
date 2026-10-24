import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  isUserBootstrappedAdmin,
  canUserAccessFeature,
  sanitizeUserProfileData
} from './rbac.ts';

describe('RBAC & Firestore Payload Sanitization', () => {
  it('identifies bootstrapped admin email accurately', () => {
    assert.equal(isUserBootstrappedAdmin('daigia170904@gmail.com'), true);
    assert.equal(isUserBootstrappedAdmin('DAIGIA170904@GMAIL.COM '), true);
    assert.equal(isUserBootstrappedAdmin('student@example.com'), false);
    assert.equal(isUserBootstrappedAdmin(null), false);
  });

  it('enforces hierarchical RBAC feature permissions across student, teacher, and admin', () => {
    assert.equal(canUserAccessFeature('student', 'learn'), true);
    assert.equal(canUserAccessFeature('student', 'review_students'), false);
    assert.equal(canUserAccessFeature('student', 'manage_roles'), false);

    assert.equal(canUserAccessFeature('teacher', 'learn'), true);
    assert.equal(canUserAccessFeature('teacher', 'review_students'), true);
    assert.equal(canUserAccessFeature('teacher', 'manage_roles'), false);

    assert.equal(canUserAccessFeature('admin', 'learn'), true);
    assert.equal(canUserAccessFeature('admin', 'review_students'), true);
    assert.equal(canUserAccessFeature('admin', 'manage_roles'), true);
  });

  it('prevents non-admin role escalation and bounds numeric/list fields for Firestore rules', () => {
    const sanitized = sanitizeUserProfileData({
      uid: 'user_123',
      email: 'learner@example.com',
      displayName: '   Nguyen Van A   ',
      requestedRole: 'admin',
      isCallerAdmin: false,
      xp: -500,
      dailyXpGoal: 2,
      voiceSpeed: 5.0,
      completedLessonIds: Array.from({ length: 150 }, (_, i) => `lesson-${i}`)
    });

    assert.equal(sanitized.role, 'student');
    assert.equal(sanitized.displayName, 'Nguyen Van A');
    assert.equal(sanitized.xp, 0);
    assert.equal(sanitized.dailyXpGoal, 10);
    assert.equal(sanitized.voiceSpeed, 2.0);
    assert.equal(sanitized.completedLessonIds.length, 100);
  });

  it('allows admin to assign teacher or admin roles', () => {
    const teacherProfile = sanitizeUserProfileData({
      uid: 'user_456',
      email: 'daigia170904@gmail.com',
      requestedRole: 'teacher',
      isCallerAdmin: true
    });
    assert.equal(teacherProfile.role, 'teacher');
  });
});
